import express, { type Request, Response, Application } from "express";
import { createServer } from "http";
import { storage } from "./storage.js";
import { emailService } from "./email.js";
import { blogGenerator } from "./gemini.js";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

export async function registerRoutes(app: Application) {
  // Trust proxy for rate limiting
  app.set('trust proxy', 1);
  
  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"]
      }
    }
  }));
  
  app.use(cors());
  app.use(compression());
  app.use('/api', limiter);

  // Services endpoints
  app.get("/api/services", async (req: Request, res: Response) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Posts endpoints
  app.get("/api/posts", async (req: Request, res: Response) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Contact endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, message, phone } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      // Store the lead
      const lead = await storage.createLead({
        name,
        email,
        message,
        phone: phone || null
      });

      // Send email confirmation
      await emailService.sendContactConfirmation({
        name,
        email,
        message,
        phone,
        leadId: lead.id
      });

      res.json({ success: true, leadId: lead.id });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  // Admin authentication endpoint
  app.post("/api/auth/admin", async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      
      // Simple password check - in production, use proper authentication
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
      
      if (password === adminPassword) {
        res.json({ success: true, token: "admin-token" });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Error in admin auth:", error);
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  // Admin posts endpoints
  app.get("/api/admin/posts", async (req: Request, res: Response) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching admin posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/admin/posts", async (req: Request, res: Response) => {
    try {
      const { title, content, excerpt, slug, tags, status } = req.body;
      
      const postId = await storage.createPost({
        title,
        content,
        excerpt,
        slug,
        category: "general",
        tags: tags || [],
        published: status === "published"
      });

      res.json({ success: true, postId });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.put("/api/admin/posts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, content, excerpt, slug, tags, status } = req.body;
      
      await storage.updatePost(parseInt(id), {
        title,
        content,
        excerpt,
        slug,
        category: "general",
        tags: tags || [],
        published: status === "published"
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/admin/posts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await storage.deletePost(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Admin leads endpoints
  app.get("/api/admin/leads", async (req: Request, res: Response) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.delete("/api/admin/leads/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await storage.deleteLead(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Generate posts endpoint
  app.post("/api/admin/generate-posts", async (req: Request, res: Response) => {
    try {
      const { count = 1 } = req.body;
      
      for (let i = 0; i < count; i++) {
        try {
          const blogPost = await blogGenerator.generateBlogPost();
          await storage.createPost(blogPost);
        } catch (error) {
          console.error(`Error generating post ${i + 1}:`, error);
        }
      }

      res.json({ success: true, message: `Generated ${count} posts` });
    } catch (error) {
      console.error("Error generating posts:", error);
      res.status(500).json({ error: "Failed to generate posts" });
    }
  });

  // Chatbot endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history = [] } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      // Create conversation context
      const context = `Sen Akram Farmonov'ning professional web developer va AI consultant sifatida ishlaydigan virtual yordamchisissan. Akram Farmonov Toshkent, O'zbekistonda yashaydigan tajribali web developer bo'lib, quyidagi xizmatlar bilan shug'ullanadi:

1. Web saytlar yaratish (React, Node.js, TypeScript)
2. Telegram botlar yaratish
3. AI chatbotlar va avtomatlashtirish
4. E-commerce yechimlari
5. Business process avtomatlashtirish

Sening vazifang:
- Mijozlarni Akram bilan bog'lash
- Uning xizmatlar haqida ma'lumot berish  
- Texnik savollarга yordam berish
- Loyiha takliflarini qabul qilish
- Do'stona va professional munosabat

Har doim o'zbek tilida javob ber va Akram'ning professional faoliyatiga oid savollarni javobla.`;

      const conversationHistory = history.map((msg: any) => 
        `${msg.role === 'user' ? 'Foydalanuvchi' : 'Yordamchi'}: ${msg.content}`
      ).join('\n');

      const fullPrompt = `${context}

Oldingi suhbat:
${conversationHistory}

Foydalanuvchi: ${message}

Yordamchi:`;

      // Create a new AI instance for chatbot
      const ai = new (await import("@google/genai")).GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" 
      });

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: fullPrompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });

      const botResponse = response.text || "Kechirasiz, javob berishda muammo yuz berdi.";

      res.json({ 
        success: true, 
        response: botResponse.trim(),
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error("Error in chatbot:", error);
      res.status(500).json({ 
        error: "Chatbot xizmatida muammo yuz berdi",
        fallback: "Salom! Men Akram Farmonov'ning virtual yordamchisiman. Afsuski, hozir texnik muammo tufayli to'liq javob bera olmayapman. Iltimos, to'g'ridan-to'g'ri Akram bilan bog'laning: +998 91 123 45 67"
      });
    }
  });

  // Create HTTP server
  const server = createServer(app);
  
  return server;
}