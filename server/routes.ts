import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPostSchema, insertProjectSchema, insertServiceSchema, 
  insertLeadSchema, insertAnalyticsSchema, insertUserSchema 
} from "@shared/schema";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

// Rate limiting configurations
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many API requests from this IP, please try again later."
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact submissions per hour
  message: "Too many contact submissions from this IP, please try again later."
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth attempts per windowMs
  message: "Too many authentication attempts from this IP, please try again later."
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Trust proxy for rate limiting in Replit environment
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://va.vercel-scripts.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: ["'self'", "https://va.vercel-scripts.com"],
      },
    },
  }));
  
  app.use(cors({
    origin: process.env.NODE_ENV === "production" 
      ? ["https://akramfarmonov.uz", "https://www.akramfarmonov.uz"]
      : ["http://localhost:5000", "http://127.0.0.1:5000"],
    credentials: true
  }));
  
  app.use(compression());
  app.use(morgan("combined"));

  // Apply rate limiting to all API routes
  app.use("/api", apiLimiter);

  // Analytics middleware - track page views
  app.use(async (req, res, next) => {
    if (!req.path.startsWith("/api") && req.method === "GET") {
      try {
        const userAgent = req.get("User-Agent") || "unknown";
        const device = userAgent.toLowerCase().includes("mobile") ? "mobile" : 
                     userAgent.toLowerCase().includes("tablet") ? "tablet" : "desktop";
        
        await storage.createAnalytics({
          path: req.path,
          userAgent,
          referer: req.get("Referer"),
          ip: req.ip,
          device
        });
      } catch (error) {
        console.error("Analytics tracking error:", error);
      }
    }
    next();
  });

  // Authentication helper
  const requireAuth = async (req: any, res: any, next: any) => {
    const password = req.headers.authorization?.replace("Bearer ", "");
    
    if (!password) {
      return res.status(401).json({ error: "Authorization required" });
    }

    // Check if it's the admin password from environment or default
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const isValid = await bcrypt.compare(password, adminPassword) || password === adminPassword;
    
    if (!isValid) {
      return res.status(401).json({ error: "Invalid authorization" });
    }

    next();
  };

  // Public Routes

  // Posts endpoints (public read, auth write)
  app.get("/api/posts", async (req, res) => {
    try {
      const { category, limit, offset, published } = req.query;
      const posts = await storage.getPosts({
        category: category as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
        published: published !== undefined ? published === "true" : true
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      // Increment views for published posts
      if (post.published) {
        await storage.incrementPostViews(post.id);
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Projects endpoints (public read, auth write)
  app.get("/api/projects", async (req, res) => {
    try {
      const { category, featured, published } = req.query;
      const projects = await storage.getProjects({
        category: category as string,
        featured: featured !== undefined ? featured === "true" : undefined,
        published: published !== undefined ? published === "true" : true
      });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:slug", async (req, res) => {
    try {
      const project = await storage.getProjectBySlug(req.params.slug);
      if (!project || !project.published) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Services endpoints (public read, auth write)
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices({ active: true });
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Contact form endpoint (rate limited)
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      // Send notifications asynchronously
      Promise.all([
        // Send Telegram notification
        import("./telegram").then(({ telegramNotifier }) => 
          telegramNotifier.sendLeadNotification({
            leadId: lead.id,
            name: lead.name,
            email: lead.email || undefined,
            phone: lead.phone || undefined,
            businessType: lead.businessType || undefined,
            serviceType: lead.serviceType || undefined,
            budget: lead.budget || undefined,
            timeline: lead.timeline || undefined,
            message: lead.message || undefined,
            source: lead.source || "contact_form",
            createdAt: lead.createdAt
          })
        ),
        // Send email confirmation and admin notification
        import("./email").then(({ emailService }) =>
          Promise.all([
            emailService.sendContactConfirmation({
              name: lead.name,
              email: lead.email || undefined,
              phone: lead.phone || undefined,
              businessType: lead.businessType || undefined,
              serviceType: lead.serviceType || undefined,
              budget: lead.budget || undefined,
              timeline: lead.timeline || undefined,
              message: lead.message || undefined,
              leadId: lead.id
            }),
            emailService.sendAdminNotification({
              name: lead.name,
              email: lead.email || undefined,
              phone: lead.phone || undefined,
              businessType: lead.businessType || undefined,
              serviceType: lead.serviceType || undefined,
              budget: lead.budget || undefined,
              timeline: lead.timeline || undefined,
              message: lead.message || undefined,
              leadId: lead.id
            })
          ])
        )
      ]).catch(error => {
        console.error("Notification sending failed:", error);
      });
      
      res.status(201).json({ 
        message: "Aloqa ma'lumotlari muvaffaqiyatli yuborildi! 24 soat ichida javob beramiz.",
        id: lead.id 
      });
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid form data", details: error.message });
      }
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Admin Authentication
  app.post("/api/auth/login", authLimiter, async (req, res) => {
    try {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ error: "Password required" });
      }

      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
      const isValid = await bcrypt.compare(password, adminPassword) || password === adminPassword;
      
      if (!isValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      res.json({ 
        message: "Authentication successful",
        token: password // In a real app, use JWT tokens
      });
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  // Protected Admin Routes
  
  // Posts management
  app.post("/api/admin/posts", requireAuth, async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid post data", details: error.message });
      }
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.put("/api/admin/posts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const postData = insertPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(id, postData);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid post data", details: error.message });
      }
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/admin/posts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePost(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Projects management
  app.get("/api/admin/projects", requireAuth, async (req, res) => {
    try {
      const projects = await storage.getProjects({}); // Get all projects including unpublished
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/admin/projects", requireAuth, async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid project data", details: error.message });
      }
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid project data", details: error.message });
      }
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Services management
  app.get("/api/admin/services", requireAuth, async (req, res) => {
    try {
      const services = await storage.getServices({}); // Get all services including inactive
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.post("/api/admin/services", requireAuth, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid service data", details: error.message });
      }
      res.status(500).json({ error: "Failed to create service" });
    }
  });

  app.put("/api/admin/services/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, serviceData);
      
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid service data", details: error.message });
      }
      res.status(500).json({ error: "Failed to update service" });
    }
  });

  app.delete("/api/admin/services/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteService(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  // Leads management
  app.get("/api/admin/leads", requireAuth, async (req, res) => {
    try {
      const { status, priority, limit } = req.query;
      const leads = await storage.getLeads({
        status: status as string,
        priority: priority as string,
        limit: limit ? parseInt(limit as string) : undefined
      });
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.put("/api/admin/leads/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const leadData = insertLeadSchema.partial().parse(req.body);
      const lead = await storage.updateLead(id, leadData);
      
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      
      res.json(lead);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid lead data", details: error.message });
      }
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/admin/leads/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteLead(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Lead not found" });
      }
      
      res.json({ message: "Lead deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Analytics endpoints
  app.get("/api/admin/analytics", requireAuth, async (req, res) => {
    try {
      const { path, limit, dateFrom, dateTo } = req.query;
      const analytics = await storage.getAnalytics({
        path: path as string,
        limit: limit ? parseInt(limit as string) : 100,
        dateFrom: dateFrom ? new Date(dateFrom as string) : undefined,
        dateTo: dateTo ? new Date(dateTo as string) : undefined
      });
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Sitemap endpoint
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = process.env.NODE_ENV === "production" 
        ? "https://akramfarmonov.uz" 
        : `http://localhost:5000`;
      
      const posts = await storage.getPosts({ published: true });
      const projects = await storage.getProjects({ published: true });
      
      const staticPages = [
        { url: "/", priority: "1.0", changefreq: "weekly" },
        { url: "/xizmatlar", priority: "0.9", changefreq: "monthly" },
        { url: "/portfolio", priority: "0.9", changefreq: "weekly" },
        { url: "/blog", priority: "0.8", changefreq: "daily" },
        { url: "/haqida", priority: "0.7", changefreq: "monthly" },
        { url: "/aloqa", priority: "0.8", changefreq: "monthly" },
      ];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      // Add static pages
      staticPages.forEach(page => {
        sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`;
      });

      // Add blog posts
      posts.forEach(post => {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.publishedAt || post.createdAt}</lastmod>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>`;
      });

      // Add projects
      projects.forEach(project => {
        sitemap += `
  <url>
    <loc>${baseUrl}/portfolio/${project.slug}</loc>
    <lastmod>${project.updatedAt}</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>`;
      });

      sitemap += `
</urlset>`;

      res.set("Content-Type", "application/xml");
      res.send(sitemap);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate sitemap" });
    }
  });

  // Blog generation endpoint
  app.post("/api/admin/generate-posts", requireAuth, async (req, res) => {
    try {
      const { count = 3 } = req.body;
      
      // Import and use Gemini blog generator
      const { GeminiBlogGenerator } = await import("./gemini");
      const blogGenerator = new GeminiBlogGenerator();
      
      const generatedPosts = [];
      for (let i = 0; i < count; i++) {
        try {
          const post = await blogGenerator.generateBlogPost();
          const savedPost = await storage.createPost(post);
          generatedPosts.push(savedPost);
        } catch (error) {
          console.error(`Failed to generate post ${i + 1}:`, error);
        }
      }
      
      res.json({ 
        message: `${generatedPosts.length} maqola muvaffaqiyatli yaratildi`,
        posts: generatedPosts
      });
    } catch (error) {
      console.error("Blog generation error:", error);
      res.status(500).json({ error: "Blog maqolalarini yaratishda xatolik yuz berdi" });
    }
  });

  // RSS feed endpoint
  app.get("/rss.xml", async (req, res) => {
    try {
      const baseUrl = process.env.NODE_ENV === "production" 
        ? "https://akramfarmonov.uz" 
        : `http://localhost:5000`;
      
      const posts = await storage.getPosts({ published: true, limit: 20 });
      
      let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Akram Farmonov Blog</title>
    <description>Web development, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish bo'yicha maqolalar</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>uz</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

      posts.forEach(post => {
        rss += `
    <item>
      <title>${post.title}</title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
      <author>Akram Farmonov</author>
      <category>${post.category}</category>
    </item>`;
      });

      rss += `
  </channel>
</rss>`;

      res.set("Content-Type", "application/xml");
      res.send(rss);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate RSS feed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
