import { 
  users, posts, projects, services, leads, analytics,
  type User, type InsertUser,
  type Post, type InsertPost,
  type Project, type InsertProject,
  type Service, type InsertService,
  type Lead, type InsertLead,
  type Analytics, type InsertAnalytics
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Post operations
  getPosts(filters?: { published?: boolean; category?: string; limit?: number; offset?: number }): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  incrementPostViews(id: number): Promise<void>;
  
  // Project operations
  getProjects(filters?: { published?: boolean; category?: string; featured?: boolean }): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Service operations
  getServices(filters?: { active?: boolean }): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Lead operations
  getLeads(filters?: { status?: string; priority?: string; limit?: number }): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  
  // Analytics operations
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalytics(filters?: { path?: string; limit?: number; dateFrom?: Date; dateTo?: Date }): Promise<Analytics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private projects: Map<number, Project>;
  private services: Map<number, Service>;
  private leads: Map<number, Lead>;
  private analytics: Map<number, Analytics>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.projects = new Map();
    this.services = new Map();
    this.leads = new Map();
    this.analytics = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create admin user
    const adminUser: User = {
      id: this.currentId++,
      username: "admin",
      password: "$2b$10$rEMd8cGjL8QxGg7EZGfG5eKHsXqQl8xoKH9Qj8XxGg7EZGfG5eKHsX", // hashed "admin123"
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Add sample services
    const sampleServices: InsertService[] = [
      {
        title: "Web Saytlar",
        subtitle: "Zamonaviy va SEO-optimallashgan",
        description: "Tezkor, SEO-optimallashgan, mobilga mos web saytlar. Next.js, Tailwind CSS, headless CMS va zamonaviy texnologiyalar bilan.",
        features: [
          "SEO optimizatsiya (Google Top 10)",
          "Mobil-friendly responsive dizayn",
          "Tez yuklash (3 soniyadan kam)",
          "CMS va admin panel",
          "SSL sertifikat va xavfsizlik",
          "Google Analytics integratsiya"
        ],
        pricing: { from: "2,000,000", average: "3,500,000", premium: "6,000,000" },
        timeline: "2-6 hafta",
        technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Vercel"],
        icon: "Globe",
        color: "primary",
        popular: false,
        active: true,
        order: 1
      },
      {
        title: "Telegram Botlar",
        subtitle: "Savdo va mijozlar uchun",
        description: "Savdo, so'rovlar, to'lov tizimi, CRM bog'lanish. To'liq avtomatik boshqaruv va hisobot tizimi.",
        features: [
          "To'lov tizimi (Click, Payme, Uzcard)",
          "CRM va baza integratsiya",
          "Avtomatik buyurtma jarayoni",
          "Mahsulot katalogi va qidiruv",
          "Mijozlar bilan chat",
          "Hisobot va analytics"
        ],
        pricing: { from: "1,500,000", average: "2,500,000", premium: "4,000,000" },
        timeline: "1-3 hafta",
        technologies: ["Node.js", "Telegram Bot API", "MongoDB", "Payment APIs"],
        icon: "MessageCircle",
        color: "secondary",
        popular: true,
        active: true,
        order: 2
      }
    ];

    sampleServices.forEach(service => {
      const newService: Service = {
        ...service,
        id: this.currentId++,
        createdAt: new Date(),
        updatedAt: new Date(),
        technologies: service.technologies || null,
        features: service.features || null,
        subtitle: service.subtitle || null,
        pricing: service.pricing || null,
        timeline: service.timeline || null,
        icon: service.icon || null,
        color: service.color || null,
        popular: service.popular || null,
        active: service.active || null,
        order: service.order || null
      };
      this.services.set(newService.id, newService);
    });

    // Add sample blog post
    const samplePost: InsertPost = {
      title: "Telegram Bot Yaratish: Biznesingiz Uchun To'liq Qo'llanma",
      slug: "telegram-bot-yaratish-biznesingiz-uchun-toliq-qollanma",
      excerpt: "Noldan boshlab professional Telegram bot yaratish, to'lov tizimi qo'shish va mijozlar bilan ishlash haqida amaliy qo'llanma.",
      content: `# Telegram Bot Yaratish: Biznesingiz Uchun To'liq Qo'llanma

Telegram botlari zamonaviy biznes uchun ajralmas qismga aylandi. Ushbu qo'llanmada siz noldan boshlab professional bot yaratishni o'rganasiz.

## Bot Yaratishning Asosiy Bosqichlari

### 1. BotFather orqali bot yaratish
- Telegram'da @BotFather ni toping
- /newbot buyrug'ini yuboring  
- Bot nomini va username ni belgilang
- API tokenni saqlang

### 2. Dasturlash tili tanlash
Eng mashhur tanlovlar:
- **Node.js** - JavaScript/TypeScript
- **Python** - aiogram, python-telegram-bot
- **PHP** - Telegram Bot SDK

### 3. Asosiy funksiyalar

#### Buyruqlar va javoblar
\`\`\`javascript
bot.command('start', (ctx) => {
  ctx.reply('Xush kelibsiz! Bizning botimizga marhamat!');
});
\`\`\`

#### Inline klaviatura
\`\`\`javascript
const keyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Mahsulotlar', callback_data: 'products' }],
      [{ text: 'Aloqa', callback_data: 'contact' }]
    ]
  }
};
\`\`\`

## To'lov Tizimi Integratsiyasi

### Click va Payme
- Merchant hisobini oching
- API kalitlarini oling
- Webhook URLlarini sozlang

### Xavfsizlik
- SSL sertifikatini o'rnating
- Ma'lumotlarni shifrlang
- Tranzaksiya loglarini yuritng

## Mijozlar Bazasi

### Ma'lumotlar Saqlash
- SQLite yoki PostgreSQL
- Redis (kesh uchun)
- Fayllar tizimi

### GDPR va Maxfiylik
- Foydalanuvchi roziligini oling
- Ma'lumotlarni o'chirish imkoniyati
- Shaffof maxfiylik siyosati

## Bot Monitoring va Analytics

### Asosiy Metrikalar
- Faol foydalanuvchilar soni
- Buyruqlar statistikasi
- Konversiya darajasi
- Xato holatlari

### Monitoring Tools
- Grafana + Prometheus
- ELK Stack
- Custom dashboard

## Biznes Uchun Foydali Funksiyalar

### 1. Avtomatik Buyurtma
- Mahsulot katalogi
- Savat funksiyasi
- To'lov jarayoni
- Yetkazib berish

### 2. CRM Integratsiya
- Mijozlar ma'lumotlari
- Buyurtmalar tarixi
- Marketing kampaniyalari

### 3. Xodimlar Uchun Admin Panel
- Buyurtmalar boshqaruvi
- Statistika ko'rish
- Mijozlar bilan muloqot

## Xulosa

Telegram bot - bu biznesingizni avtomatlashtirish va mijozlar bilan samarali muloqot qurish uchun kuchli vosita. To'g'ri strategiya va texnik yechimlar bilan siz o'z biznesingizni keyingi bosqichga olib chiqishingiz mumkin.

---
*Bu maqola Akram Farmonov tomonidan tayyorlandi. Professional Telegram bot yaratish xizmatlari uchun biz bilan bog'laning.*`,
      category: "Telegram",
      tags: ["telegram", "bot", "development", "business"],
      author: "Akram Farmonov",
      published: true,
      publishedAt: new Date("2024-01-15"),
      readTime: 8,
      seoTitle: "Telegram Bot Yaratish - Professional Qo'llanma",
      seoDescription: "Biznes uchun Telegram bot yaratish bo'yicha to'liq qo'llanma. API, to'lov tizimi, CRM integratsiya."
    };

    const newPost: Post = {
      ...samplePost,
      id: this.currentId++,
      author: samplePost.author || "Akram Farmonov",
      views: 156,
      likes: 23,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      excerpt: samplePost.excerpt || null,
      tags: samplePost.tags || null,
      featuredImage: samplePost.featuredImage || null,
      published: samplePost.published || null,
      publishedAt: samplePost.publishedAt || null,
      readTime: samplePost.readTime || null,
      seoTitle: samplePost.seoTitle || null,
      seoDescription: samplePost.seoDescription || null
    };
    this.posts.set(newPost.id, newPost);
    console.log("Sample post created:", newPost.title);
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentId++,
      role: insertUser.role || "user",
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  // Post operations
  async getPosts(filters?: { published?: boolean; category?: string; limit?: number; offset?: number }): Promise<Post[]> {
    let posts = Array.from(this.posts.values());
    
    if (filters?.published !== undefined) {
      posts = posts.filter(post => post.published === filters.published);
    }
    if (filters?.category) {
      posts = posts.filter(post => post.category === filters.category);
    }
    
    posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    if (filters?.offset) {
      posts = posts.slice(filters.offset);
    }
    if (filters?.limit) {
      posts = posts.slice(0, filters.limit);
    }
    
    return posts;
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return Array.from(this.posts.values()).find(post => post.slug === slug);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const post: Post = {
      ...insertPost,
      id: this.currentId++,
      author: insertPost.author || "Akram Farmonov",
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      excerpt: insertPost.excerpt || null,
      tags: insertPost.tags || null,
      featuredImage: insertPost.featuredImage || null,
      published: insertPost.published || null,
      publishedAt: insertPost.publishedAt || null,
      readTime: insertPost.readTime || null,
      seoTitle: insertPost.seoTitle || null,
      seoDescription: insertPost.seoDescription || null
    };
    this.posts.set(post.id, post);
    return post;
  }

  async updatePost(id: number, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost: Post = {
      ...post,
      ...updateData,
      updatedAt: new Date()
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }

  async incrementPostViews(id: number): Promise<void> {
    const post = this.posts.get(id);
    if (post) {
      post.views = (post.views || 0) + 1;
      post.updatedAt = new Date();
      this.posts.set(id, post);
    }
  }

  // Project operations
  async getProjects(filters?: { published?: boolean; category?: string; featured?: boolean }): Promise<Project[]> {
    let projects = Array.from(this.projects.values());
    
    if (filters?.published !== undefined) {
      projects = projects.filter(project => project.published === filters.published);
    }
    if (filters?.category) {
      projects = projects.filter(project => project.category === filters.category);
    }
    if (filters?.featured !== undefined) {
      projects = projects.filter(project => project.featured === filters.featured);
    }
    
    return projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(project => project.slug === slug);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = {
      ...insertProject,
      id: this.currentId++,
      createdAt: new Date(),
      updatedAt: new Date(),
      shortDescription: insertProject.shortDescription || null,
      technologies: insertProject.technologies || null,
      features: insertProject.features || null,
      results: insertProject.results || null,
      images: insertProject.images || null,
      client: insertProject.client || null,
      year: insertProject.year || null,
      duration: insertProject.duration || null,
      featured: insertProject.featured || null,
      liveUrl: insertProject.liveUrl || null,
      caseStudyUrl: insertProject.caseStudyUrl || null,
      githubUrl: insertProject.githubUrl || null,
      telegramUrl: insertProject.telegramUrl || null,
      testimonial: insertProject.testimonial || null,
      published: insertProject.published || null
    };
    this.projects.set(project.id, project);
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = {
      ...project,
      ...updateData,
      updatedAt: new Date()
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Service operations
  async getServices(filters?: { active?: boolean }): Promise<Service[]> {
    let services = Array.from(this.services.values());
    
    if (filters?.active !== undefined) {
      services = services.filter(service => service.active === filters.active);
    }
    
    return services.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const service: Service = {
      ...insertService,
      id: this.currentId++,
      createdAt: new Date(),
      updatedAt: new Date(),
      subtitle: insertService.subtitle || null,
      features: insertService.features || null,
      pricing: insertService.pricing || null,
      timeline: insertService.timeline || null,
      technologies: insertService.technologies || null,
      icon: insertService.icon || null,
      color: insertService.color || null,
      popular: insertService.popular || null,
      active: insertService.active || null,
      order: insertService.order || null
    };
    this.services.set(service.id, service);
    return service;
  }

  async updateService(id: number, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    
    const updatedService: Service = {
      ...service,
      ...updateData,
      updatedAt: new Date()
    };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Lead operations
  async getLeads(filters?: { status?: string; priority?: string; limit?: number }): Promise<Lead[]> {
    let leads = Array.from(this.leads.values());
    
    if (filters?.status) {
      leads = leads.filter(lead => lead.status === filters.status);
    }
    if (filters?.priority) {
      leads = leads.filter(lead => lead.priority === filters.priority);
    }
    
    leads = leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    if (filters?.limit) {
      leads = leads.slice(0, filters.limit);
    }
    
    return leads;
  }

  async getLead(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const lead: Lead = {
      ...insertLead,
      id: this.currentId++,
      status: "new",
      priority: "medium",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: insertLead.email || null,
      phone: insertLead.phone || null,
      businessType: insertLead.businessType || null,
      serviceType: insertLead.serviceType || null,
      budget: insertLead.budget || null,
      timeline: insertLead.timeline || null,
      message: insertLead.message || null,
      source: insertLead.source || null,
      notes: insertLead.notes || null,
      followUpDate: insertLead.followUpDate || null,
      convertedAt: insertLead.convertedAt || null
    };
    this.leads.set(lead.id, lead);
    return lead;
  }

  async updateLead(id: number, updateData: Partial<InsertLead>): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;
    
    const updatedLead: Lead = {
      ...lead,
      ...updateData,
      updatedAt: new Date()
    };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async deleteLead(id: number): Promise<boolean> {
    return this.leads.delete(id);
  }

  // Analytics operations
  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const analytics: Analytics = {
      ...insertAnalytics,
      id: this.currentId++,
      timestamp: new Date(),
      userAgent: insertAnalytics.userAgent || null,
      referer: insertAnalytics.referer || null,
      ip: insertAnalytics.ip || null,
      country: insertAnalytics.country || null,
      device: insertAnalytics.device || null
    };
    this.analytics.set(analytics.id, analytics);
    return analytics;
  }

  async getAnalytics(filters?: { path?: string; limit?: number; dateFrom?: Date; dateTo?: Date }): Promise<Analytics[]> {
    let analytics = Array.from(this.analytics.values());
    
    if (filters?.path) {
      analytics = analytics.filter(item => item.path === filters.path);
    }
    if (filters?.dateFrom) {
      analytics = analytics.filter(item => new Date(item.timestamp) >= filters.dateFrom!);
    }
    if (filters?.dateTo) {
      analytics = analytics.filter(item => new Date(item.timestamp) <= filters.dateTo!);
    }
    
    analytics = analytics.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    if (filters?.limit) {
      analytics = analytics.slice(0, filters.limit);
    }
    
    return analytics;
  }
}

export const storage = new MemStorage();
