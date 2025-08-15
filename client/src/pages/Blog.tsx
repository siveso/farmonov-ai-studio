import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  TrendingUp,
  BookOpen,
  Code,
  Bot,
  Zap,
  Globe,
  Tag
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const blogPosts = [
  {
    id: 1,
    title: "2024-yilda O'zbekistonda e-commerce: Trends va imkoniyatlar",
    excerpt: "O'zbek bozoridagi onlayn savdo tendentsiyalari, SEO strategiyalari va mijozlarni jalb qilish usullari haqida to'liq qo'llanma.",
    content: "E-commerce sohasida 2024-yil juda katta o'zgarishlar olib keldi...",
    author: "Akram Farmonov",
    publishedAt: "2024-01-15",
    readTime: "8 daqiqa",
    category: "E-commerce",
    tags: ["ecommerce", "seo", "trends", "uzbekistan"],
    featured: true,
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "Telegram bot yaratish: To'liq boshlang'ich qo'llanma",
    excerpt: "Noldan boshlab professional Telegram bot yaratish, to'lov tizimi qo'shish va mijozlar bilan ishlash haqida amaliy qo'llanma.",
    content: "Telegram botlari zamonaviy biznes uchun ajralmas qismga aylandi...",
    author: "Akram Farmonov", 
    publishedAt: "2024-01-10",
    readTime: "12 daqiqa",
    category: "Telegram",
    tags: ["telegram", "bot", "development", "business"],
    featured: true,
    views: 980,
    likes: 67
  },
  {
    id: 3,
    title: "AI chatbotlar: Biznesingiz uchun 24/7 mijozlar xizmati",
    excerpt: "Sun'iy intellekt chatbotlari qanday qilib mijozlar xizmatini yaxshilaydi va biznes samaradorligini oshiradi.",
    content: "AI chatbotlari biznes dunyosida inqilob yaratmoqda...",
    author: "Akram Farmonov",
    publishedAt: "2024-01-08",
    readTime: "6 daqiqa", 
    category: "AI",
    tags: ["ai", "chatbot", "automation", "customer-service"],
    featured: true,
    views: 756,
    likes: 45
  },
  {
    id: 4,
    title: "SEO optimizatsiya: O'zbek saytlari uchun praktik maslahatlar",
    excerpt: "Google'da yuqori o'rinlarga chiqish uchun SEO strategiyalari va O'zbek auditoriyasi uchun maxsus yondashuvlar.",
    content: "SEO optimi­zatsiya zamonaviy biznes uchun muhim...",
    author: "Akram Farmonov",
    publishedAt: "2024-01-05",
    readTime: "10 daqiqa",
    category: "SEO",
    tags: ["seo", "google", "optimization", "marketing"],
    featured: false,
    views: 645,
    likes: 38
  },
  {
    id: 5,
    title: "Next.js va React: Zamonaviy web development",
    excerpt: "Tezkor va SEO-friendly web saytlar yaratish uchun Next.js framework dan qanday foydalanish kerak.",
    content: "Next.js zamonaviy web development uchun eng yaxshi tanlov...",
    author: "Akram Farmonov",
    publishedAt: "2024-01-03",
    readTime: "7 daqiqa",
    category: "Development",
    tags: ["nextjs", "react", "web development", "frontend"],
    featured: false,
    views: 523,
    likes: 29
  },
  {
    id: 6,
    title: "Biznes avtomatlashtirish: Vaqt va pul tejash usullari",
    excerpt: "Zapier, Make va boshqa vositalar orqali biznes jarayonlarini qanday avtomatlashtirish mumkin.",
    content: "Biznes avtomatlashtirish zamonaviy kompaniyalar uchun zarurat...",
    author: "Akram Farmonov",
    publishedAt: "2024-01-01",
    readTime: "9 daqiqa",
    category: "Automation", 
    tags: ["automation", "zapier", "workflow", "productivity"],
    featured: false,
    views: 467,
    likes: 25
  }
];

const categories = [
  { name: "Barchasi", count: blogPosts.length, icon: BookOpen },
  { name: "E-commerce", count: blogPosts.filter(p => p.category === "E-commerce").length, icon: Globe },
  { name: "Telegram", count: blogPosts.filter(p => p.category === "Telegram").length, icon: Bot },
  { name: "AI", count: blogPosts.filter(p => p.category === "AI").length, icon: Bot },
  { name: "SEO", count: blogPosts.filter(p => p.category === "SEO").length, icon: TrendingUp },
  { name: "Development", count: blogPosts.filter(p => p.category === "Development").length, icon: Code },
  { name: "Automation", count: blogPosts.filter(p => p.category === "Automation").length, icon: Zap }
];

const popularTags = [
  "web development", "telegram bot", "seo", "ai", "automation", 
  "ecommerce", "nextjs", "react", "business", "optimization"
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>Blog | Akram Farmonov - Web Development, AI va Biznes Avtomatlashtirish</title>
        <meta 
          name="description" 
          content="Web development, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish bo'yicha foydali maqolalar. Amaliy maslahatlar va trendlar." 
        />
        <meta name="keywords" content="blog, web development, telegram bot, ai chatbot, seo, avtomatlashtirish, o'zbekiston" />
        <link rel="canonical" href="https://akramfarmonov.uz/blog" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Akram Farmonov Blog",
            "description": "Web development, AI va biznes avtomatlashtirish bo'yicha blog",
            "url": "https://akramfarmonov.uz/blog",
            "author": {
              "@type": "Person",
              "name": "Akram Farmonov"
            },
            "blogPost": featuredPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.publishedAt,
              "author": {
                "@type": "Person",
                "name": post.author
              }
            }))
          })}
        </script>
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-20 lg:py-24 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Blog va <span className="text-accent">Maqolalar</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Web development, AI texnologiyalari va biznes avtomatlashtirish bo'yicha 
                foydali maqolalar va amaliy maslahatlar.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <span>Haftalik yangi maqolalar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span>Amaliy maslahatlar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-accent" />
                  <span>Texnologik yangilikar</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Featured */}
        <section className="py-16 lg:py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Maqolalar va mavzular bo'yicha qidirish..."
                  className="pl-10 py-3 text-lg"
                />
              </div>
            </div>

            {/* Featured Posts */}
            <div className="mb-16">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
                <span className="text-gradient">Mashhur Maqolalar</span>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => {
                  const categoryIcon = {
                    "E-commerce": Globe,
                    "Telegram": Bot,
                    "AI": Bot,
                    "SEO": TrendingUp,
                    "Development": Code,
                    "Automation": Zap
                  }[post.category] || BookOpen;
                  
                  const IconComponent = categoryIcon;

                  return (
                    <Card key={post.id} className="card-gradient group hover:scale-105">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                          <Link to={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardHeader>

                      <CardContent className="pt-0 space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.publishedAt).toLocaleDateString('uz-UZ')}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>{post.views} ko'rish</span>
                            <span>{post.likes} ♥</span>
                          </div>
                        </div>

                        <Link to={`/blog/${post.id}`}>
                          <Button variant="outline" className="w-full">
                            O'qish
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* All Posts with Categories */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <span className="text-gradient">Barcha Maqolalar</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Kategoriya bo'yicha maqolalarni ko'rib chiqing va o'zingizga kerakli ma'lumotni toping
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Categories */}
                <Card className="card-gradient p-6">
                  <CardTitle className="text-lg mb-4">Kategoriyalar</CardTitle>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Button
                          key={category.name}
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          <span className="flex-1">{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </Card>

                {/* Popular Tags */}
                <Card className="card-gradient p-6">
                  <CardTitle className="text-lg mb-4">Mashhur Teglar</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Newsletter */}
                <Card className="card-gradient p-6">
                  <CardTitle className="text-lg mb-2">Obuna Bo'ling</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">
                    Yangi maqolalar haqida birinchilardan xabar oling
                  </p>
                  <div className="space-y-2">
                    <Input placeholder="Email manzilingiz" type="email" />
                    <Button className="w-full btn-hero">
                      Obuna Bo'lish
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Posts Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentPosts.map((post) => {
                    const categoryIcon = {
                      "E-commerce": Globe,
                      "Telegram": Bot,
                      "AI": Bot,
                      "SEO": TrendingUp,
                      "Development": Code,
                      "Automation": Zap
                    }[post.category] || BookOpen;
                    
                    const IconComponent = categoryIcon;

                    return (
                      <Card key={post.id} className="card-gradient group hover:scale-105">
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                          
                          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                            <Link to={`/blog/${post.id}`}>
                              {post.title}
                            </Link>
                          </CardTitle>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        </CardHeader>

                        <CardContent className="pt-0 space-y-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(post.publishedAt).toLocaleDateString('uz-UZ')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex space-x-3 text-xs text-muted-foreground">
                              <span>{post.views} ko'rish</span>
                              <span>{post.likes} ♥</span>
                            </div>
                            <Link to={`/blog/${post.id}`}>
                              <Button variant="ghost" size="sm">
                                O'qish
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <Button className="btn-hero">
                    Ko'proq Yuklash
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}