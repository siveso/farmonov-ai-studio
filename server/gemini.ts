import { GoogleGenAI } from "@google/genai";
import { storage } from "./storage";
import type { InsertPost } from "@shared/schema";
import { format } from "date-fns";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

interface BlogPostIdea {
  title: string;
  category: string;
  tags: string[];
  keywords: string[];
  difficulty: "boshlang'ich" | "o'rta" | "ilg'or";
  targetAudience: string;
}

// Blog topics focused on Uzbek market and business automation
const blogTopicCategories = {
  "Web Development": [
    "JavaScript asoslari va amaliy loyihalar",
    "React.js bilan zamonaviy web saytlar",
    "Next.js Performance optimizatsiya",
    "TypeScript va kod sifati",
    "API va Backend development",
    "Database dizayni va optimizatsiya",
    "SEO va web saytlar tezligi",
    "Responsive dizayn va UX/UI"
  ],
  "Telegram Botlar": [
    "Telegram bot yaratish: 0 dan boshlab",
    "To'lov tizimlari integratsiyasi",
    "CRM va bot bog'lash",
    "Avtomatik savdo botlari",
    "Mijozlar bilan muloqot botlari",
    "Bot orqali marketing va reklama",
    "Telegram bot xavfsizligi",
    "Bot analytics va hisobotlar"
  ],
  "AI va Chatbotlar": [
    "ChatGPT va biznes uchun foydalanish",
    "AI chatbot yaratish va sozlash",
    "OpenAI API bilan ishlash",
    "AI content generation",
    "Chatbot va mijozlar xizmati",
    "AI tools biznes uchun",
    "Machine Learning asoslari",
    "AI va avtomatlashtirish"
  ],
  "Biznes Avtomatlashtirish": [
    "CRM tizimlari va integratsiya",
    "Biznes jarayonlarni avtomatlashtirish",
    "Email marketing avtomatizatsiyasi",
    "Savdo funnel va avtomatik follow-up",
    "Hisobot va analytics avtomatizatsiya",
    "Inventar boshqaruvi tizimlari",
    "HR va jamoaviy ishlar avtomatizatsiya",
    "Moliyaviy hisobotlar avtomatizatsiya"
  ],
  "Startup va Tadbirkorlik": [
    "Startup g'oyasini texnologiya bilan amalga oshirish",
    "MVP (Minimum Viable Product) yaratish",
    "Digital marketing strategiyalari",
    "Online biznes modellari",
    "E-commerce platformalari",
    "SaaS biznes yaratish",
    "Investorlar bilan ishlash",
    "Biznes scaling va o'sish"
  ]
};

export class GeminiBlogGenerator {
  private topics: BlogPostIdea[];

  constructor() {
    this.topics = this.generateBlogTopics();
  }

  private generateBlogTopics(): BlogPostIdea[] {
    const topics: BlogPostIdea[] = [];
    
    Object.entries(blogTopicCategories).forEach(([category, topicList]) => {
      topicList.forEach(topic => {
        topics.push({
          title: topic,
          category,
          tags: this.generateTagsForTopic(topic),
          keywords: this.generateKeywordsForTopic(topic),
          difficulty: this.getDifficultyLevel(topic),
          targetAudience: this.getTargetAudience(category)
        });
      });
    });

    return topics;
  }

  private generateTagsForTopic(topic: string): string[] {
    const commonTags = ["web development", "programming", "tutorial", "o'zbek tili"];
    const specificTags: { [key: string]: string[] } = {
      "javascript": ["JavaScript", "Frontend", "ES6", "Node.js"],
      "react": ["React", "JSX", "Components", "Hooks"],
      "telegram": ["Telegram Bot", "Bot Development", "API", "Automation"],
      "ai": ["AI", "ChatGPT", "Machine Learning", "Automation"],
      "biznes": ["Business", "Startup", "Entrepreneurship", "Growth"],
      "seo": ["SEO", "Google", "Traffic", "Marketing"]
    };

    const topicLower = topic.toLowerCase();
    let tags = [...commonTags];

    Object.entries(specificTags).forEach(([key, values]) => {
      if (topicLower.includes(key)) {
        tags.push(...values);
      }
    });

    return tags.slice(0, 6);
  }

  private generateKeywordsForTopic(topic: string): string[] {
    const uzbekKeywords = [
      "dasturlash o'rganish",
      "web sayt yaratish",
      "telegram bot",
      "biznes avtomatlashtirish",
      "startup g'oyalari",
      "online biznes",
      "digital marketing",
      "texnologiya yangiliklari"
    ];

    return uzbekKeywords.slice(0, 4);
  }

  private getDifficultyLevel(topic: string): "boshlang'ich" | "o'rta" | "ilg'or" {
    const beginnerTopics = ["asoslari", "0 dan boshlab", "kirish", "nima"];
    const advancedTopics = ["optimizatsiya", "xavfsizlik", "ilg'or", "professional"];
    
    const topicLower = topic.toLowerCase();
    
    if (beginnerTopics.some(keyword => topicLower.includes(keyword))) {
      return "boshlang'ich";
    }
    if (advancedTopics.some(keyword => topicLower.includes(keyword))) {
      return "ilg'or";
    }
    return "o'rta";
  }

  private getTargetAudience(category: string): string {
    const audiences: { [key: string]: string } = {
      "Web Development": "Web dasturchilar va texnologiya ishqibozlari",
      "Telegram Botlar": "Biznes egalari va avtomatlashtirish qidiruvchilar",
      "AI va Chatbotlar": "Tadbirkorlar va zamonaviy texnologiya foydalanuvchilari", 
      "Biznes Avtomatlashtirish": "SMB egalari va biznes jarayonlarni yaxshilash istovchilar",
      "Startup va Tadbirkorlik": "Yoshlar va startup asoschilari"
    };

    return audiences[category] || "Umumiy auditoriya";
  }

  public async generateBlogPost(topicIdea?: BlogPostIdea): Promise<InsertPost> {
    if (!topicIdea) {
      topicIdea = this.topics[Math.floor(Math.random() * this.topics.length)];
    }

    const prompt = this.createBlogPrompt(topicIdea);
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const content = response.text;
      if (!content) {
        throw new Error("Empty response from Gemini");
      }

      const parsedContent = this.parseGeneratedContent(content);
      const slug = this.generateSlug(parsedContent.title);
      
      return {
        title: parsedContent.title,
        slug,
        excerpt: parsedContent.excerpt,
        content: parsedContent.content,
        category: topicIdea.category,
        tags: topicIdea.tags,
        author: "Akram Farmonov",
        published: false, // Set to false for moderation
        seoTitle: parsedContent.seoTitle,
        seoDescription: parsedContent.seoDescription,
        readTime: this.calculateReadTime(parsedContent.content)
      };
    } catch (error) {
      console.error("Gemini blog generation error:", error);
      throw new Error(`Blog generation failed: ${error}`);
    }
  }

  private createBlogPrompt(idea: BlogPostIdea): string {
    return `Sen professional web developer va biznes konsultanti Akram Farmonovsiz. O'zbek tilidagi blog uchun quyidagi mavzu bo'yicha to'liq maqola yozing:

MAVZU: ${idea.title}
KATEGORIYA: ${idea.category}  
QIYINLIK DARAJASI: ${idea.difficulty}
MAQSADLI AUDITORIYA: ${idea.targetAudience}

TALABLAR:
1. Maqola faqat o'zbek tilida bo'lsin
2. Amaliy maslahatlar va real misollar bering
3. Step-by-step qo'llanma formatida yozing
4. O'zbek biznes muhitiga mos misollar keltiring
5. Code snippet va texnik tafsilotlar qo'shing (agar kerak bo'lsa)
6. Maqola uzunligi 1500-2500 so'z orasida bo'lsin
7. SEO uchun optimallashtirilgan bo'lsin

FORMATGA RIOYA QILING:
---TITLE---
[Maqola sarlavhasi]

---EXCERPT---  
[Qisqa tavsif 150-200 so'z]

---SEO_TITLE---
[SEO uchun optimallashtirilgan sarlavha 60 belgidan kam]

---SEO_DESCRIPTION---
[Meta description 160 belgidan kam]

---CONTENT---
[To'liq maqola matni Markdown formatida]

Maqolani yozishda quyidagi uslubni ishlatng:
- Sodda va tushunarli til
- Amaliy fokus
- O'zbek auditoriyasiga mos misollar
- Professional lekin do'stona ohang
- Harakat chaqiruvi bilan tugating

Maqola oxirida Akram Farmonov haqida qisqa ma'lumot va uning xizmatlariga havola qo'shing.`;
  }

  private parseGeneratedContent(content: string): {
    title: string;
    excerpt: string;
    content: string;
    seoTitle: string;
    seoDescription: string;
  } {
    const sections = {
      title: this.extractSection(content, "TITLE"),
      excerpt: this.extractSection(content, "EXCERPT"),
      seoTitle: this.extractSection(content, "SEO_TITLE"),
      seoDescription: this.extractSection(content, "SEO_DESCRIPTION"),
      content: this.extractSection(content, "CONTENT")
    };

    // Fallbacks if sections not found
    if (!sections.title) {
      sections.title = "Yangi Blog Maqolasi";
    }
    if (!sections.excerpt) {
      sections.excerpt = sections.content.substring(0, 200) + "...";
    }
    if (!sections.seoTitle) {
      sections.seoTitle = sections.title;
    }
    if (!sections.seoDescription) {
      sections.seoDescription = sections.excerpt.substring(0, 160);
    }

    return sections;
  }

  private extractSection(content: string, sectionName: string): string {
    const regex = new RegExp(`---${sectionName}---\\s*([\\s\\S]*?)(?=---[A-Z_]+---|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  }

  private generateSlug(title: string): string {
    const uzbekMapping: { [key: string]: string } = {
      'ş': 'sh', 'ç': 'ch', 'ğ': 'gh', 'ü': 'u', 'ö': 'o',
      'ň': 'ng', 'ž': 'zh', 'ý': 'y', 'ä': 'a', 'ë': 'e',
      'ı': 'i', 'ć': 'c', 'đ': 'd', 'ñ': 'n', 'õ': 'o'
    };

    let slug = title.toLowerCase();
    
    // Replace Uzbek characters
    Object.entries(uzbekMapping).forEach(([uzb, eng]) => {
      slug = slug.replace(new RegExp(uzb, 'g'), eng);
    });

    // Replace spaces and special characters
    slug = slug
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return slug || 'blog-post';
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  public async scheduleDailyPosts(): Promise<void> {
    try {
      const postsToday = await storage.getPosts({
        published: true,
        // Filter for today's posts - simplified for demo
      });

      const targetPostsPerDay = 10;
      const postsNeeded = Math.max(0, targetPostsPerDay - postsToday.length);

      console.log(`Generating ${postsNeeded} blog posts for today...`);

      for (let i = 0; i < postsNeeded; i++) {
        try {
          const randomTopic = this.topics[Math.floor(Math.random() * this.topics.length)];
          const blogPost = await this.generateBlogPost(randomTopic);
          
          const createdPost = await storage.createPost(blogPost);
          console.log(`Generated blog post: ${createdPost.title}`);
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`Failed to generate blog post ${i + 1}:`, error);
        }
      }
    } catch (error) {
      console.error("Daily blog post scheduling error:", error);
    }
  }

  public async generateSamplePosts(): Promise<void> {
    const sampleTopics = [
      {
        title: "Telegram Bot Yaratish: Biznes Uchun To'liq Qo'llanma",
        category: "Telegram Botlar", 
        tags: ["telegram bot", "biznes", "automation", "api"],
        keywords: ["telegram bot yaratish", "biznes bot"],
        difficulty: "o'rta" as const,
        targetAudience: "Biznes egalari"
      },
      {
        title: "React.js bilan Zamonaviy Web Sayt Yaratish",
        category: "Web Development",
        tags: ["react", "javascript", "web development", "frontend"],
        keywords: ["react web sayt", "javascript"],
        difficulty: "boshlang'ich" as const,
        targetAudience: "Dasturchilar"
      }
    ];

    for (const topic of sampleTopics) {
      try {
        const blogPost = await this.generateBlogPost(topic);
        blogPost.published = true;
        blogPost.publishedAt = new Date();
        
        await storage.createPost(blogPost);
        console.log(`Sample post created: ${blogPost.title}`);
      } catch (error) {
        console.error(`Failed to create sample post:`, error);
      }
    }
  }
}

export const blogGenerator = new GeminiBlogGenerator();