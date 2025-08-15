import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink, 
  Github, 
  TrendingUp, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Globe,
  MessageCircle,
  Bot,
  Zap
} from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const projects = [
  {
    id: 1,
    title: "TashkentMarket E-commerce",
    description: "To'liq onlayn savdo platformasi mahalliy biznes uchun. Zamonaviy dizayn, tez yuklash va SEO optimizatsiya.",
    category: "Web Sayt",
    image: "/placeholder.svg",
    featured: true,
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    results: {
      traffic: "+250% trafik o'sishi",
      sales: "+180% savdo o'sishi", 
      performance: "98/100 PageSpeed",
      timeline: "45 kun"
    },
    features: [
      "Responsive dizayn va mobil optimizatsiya",
      "SEO optimizatsiya va Google top 3",
      "To'lov tizimi (Click, Payme, Uzcard)",
      "Admin panel va inventory management",
      "Real-time analytics va hisobotlar",
      "Multi-language support (UZ, RU, EN)"
    ],
    client: "TashkentMarket LLC",
    year: "2024",
    caseStudyLink: "/case-studies/tashkentmarket",
    liveLink: "https://tashkentmarket.uz",
    color: "primary"
  },
  {
    id: 2,
    title: "OshMarkazi Restaurant Bot",
    description: "Avtomatik buyurtma va to'lov tizimi restoran uchun. Mijozlar uchun oson va tezkor xizmat.",
    category: "Telegram Bot", 
    image: "/placeholder.svg",
    featured: true,
    technologies: ["Node.js", "Telegram Bot API", "MongoDB", "Click API"],
    results: {
      orders: "+300% buyurtmalar",
      efficiency: "+200% samaradorlik",
      satisfaction: "95% mijoz memnuniyati",
      timeline: "20 kun"
    },
    features: [
      "Avtomatik buyurtma olish tizimi",
      "To'lov integratsiya (Click, Payme)",
      "Real-time buyurtma kuzatuv",
      "Mijozlar bilan chat va feedback",
      "Hisobot va analytics dashboard",
      "Staff management va notifications"
    ],
    client: "Osh Markazi Restaurant",
    year: "2024",
    caseStudyLink: "/case-studies/osh-markazi-bot",
    telegramLink: "https://t.me/oshmarkazibot",
    color: "secondary"
  },
  {
    id: 3,
    title: "BeautySpace AI Support",
    description: "24/7 mijozlar bilan ishlash uchun AI chatbot. Natural language processing va lead generation.",
    category: "AI Chatbot",
    image: "/placeholder.svg", 
    featured: true,
    technologies: ["OpenAI GPT-4", "React", "WebSocket", "Python"],
    results: {
      support: "+400% qo'llab-quvvatlash",
      leads: "+250% yangi mijozlar",
      satisfaction: "95% memnuniyat",
      timeline: "30 kun"
    },
    features: [
      "24/7 avtomatik mijozlar xizmati",
      "Natural language understanding",
      "Appointment booking integration",
      "Lead qualification va follow-up",
      "Multi-platform support",
      "Conversation analytics"
    ],
    client: "BeautySpace Salon Chain",
    year: "2024",
    caseStudyLink: "/case-studies/beautyspace-ai",
    demoLink: "https://demo.beautyspace.uz",
    color: "accent"
  },
  {
    id: 4,
    title: "LogisticPro CRM Integration", 
    description: "CRM va WhatsApp API bog'lanish. Avtomatik workflow va mijozlar bilan aloqa tizimi.",
    category: "Avtomatlashtirish",
    image: "/placeholder.svg",
    featured: false,
    technologies: ["Zapier", "WhatsApp API", "Google Sheets", "CRM APIs"],
    results: {
      automation: "+300% avtomatlashtirish",
      efficiency: "+150% samaradorlik", 
      time: "80% vaqt tejash",
      timeline: "14 kun"
    },
    features: [
      "WhatsApp va CRM avtomatik sinxronizatsiya",
      "Lead tracking va follow-up",
      "Automated reporting",
      "Task management integration",
      "Real-time notifications",
      "Data backup va security"
    ],
    client: "LogisticPro LLC",
    year: "2024",
    caseStudyLink: "/case-studies/logistic-automation",
    color: "primary"
  },
  {
    id: 5,
    title: "EduCenter Online Platform",
    description: "Ta'lim markazi uchun onlayn o'qitish platformasi. Video darslar, testlar va sertifikatlar.",
    category: "Web Sayt",
    image: "/placeholder.svg",
    featured: false,
    technologies: ["Next.js", "Supabase", "Stripe", "Video.js"],
    results: {
      students: "+500 talabalar",
      completion: "85% kurs yakunlash",
      revenue: "+200% daromad",
      timeline: "60 kun"
    },
    features: [
      "Video streaming va progress tracking",
      "Interactive quizzes va testlar", 
      "Certificate generation",
      "Payment integration",
      "Student dashboard",
      "Instructor panel"
    ],
    client: "EduCenter Academy",
    year: "2023",
    caseStudyLink: "/case-studies/educenter",
    liveLink: "https://educenter.uz",
    color: "secondary"
  },
  {
    id: 6,
    title: "MedClinic Appointment Bot",
    description: "Tibbiy klinika uchun avtomatik navbat berish tizimi. Shifokorlar jadvali va SMS xabarnomalar.",
    category: "Telegram Bot",
    image: "/placeholder.svg", 
    featured: false,
    technologies: ["Node.js", "PostgreSQL", "SMS API", "Calendar API"],
    results: {
      appointments: "+400% navbatlar",
      noshow: "-50% kelmovchilik",
      satisfaction: "92% memnuniyat", 
      timeline: "25 kun"
    },
    features: [
      "Avtomatik navbat berish tizimi",
      "Shifokorlar jadvali integratsiya",
      "SMS va Telegram xabarnomalar",
      "Appointment reminder system",
      "Patient history tracking",
      "Analytics dashboard"
    ],
    client: "MedClinic Network",
    year: "2023",
    caseStudyLink: "/case-studies/medclinic-bot",
    telegramLink: "https://t.me/medclinicbot",
    color: "accent"
  }
];

const categories = ["Barchasi", "Web Sayt", "Telegram Bot", "AI Chatbot", "Avtomatlashtirish"];

export default function Portfolio() {
  const featuredProjects = projects.filter(p => p.featured);
  const allProjects = projects;

  return (
    <>
      <Helmet>
        <title>Portfolio | Akram Farmonov - Muvaffaqiyatli Loyihalar va Case Studies</title>
        <meta 
          name="description" 
          content="Akram Farmonov tomonidan amalga oshirilgan web saytlar, Telegram botlar, AI chatbotlar va avtomatlashtirish loyihalari. Real natijalar va mijozlar memnuniyati." 
        />
        <meta name="keywords" content="portfolio, web sayt loyihalari, telegram bot misollari, case study, O'zbekiston" />
        <link rel="canonical" href="https://akramfarmonov.uz/portfolio" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Akram Farmonov Portfolio",
            "description": "Web development, Telegram bot va AI chatbot loyihalari portfolio",
            "author": {
              "@type": "Person", 
              "name": "Akram Farmonov"
            },
            "workExample": featuredProjects.map(project => ({
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "category": project.category,
              "dateCreated": project.year
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
                Portfolio va <span className="text-accent">Loyihalar</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Mijozlarimiz uchun amalga oshirgan loyihalar va ularning real natijalari. 
                Har bir loyiha biznesingiz uchun yangi imkoniyatlar ochadi.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span>100+ muvaffaqiyatli loyiha</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span>50+ baxtli mijozlar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent fill-current" />
                  <span>4.9/5 o'rtacha reyting</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 lg:py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <span className="text-gradient">Taniqli Loyihalar</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Eng muvaffaqiyatli va ta'sirli loyihalarimizdan bir nechtasi
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {featuredProjects.map((project) => {
                const categoryIcon = {
                  "Web Sayt": Globe,
                  "Telegram Bot": MessageCircle,
                  "AI Chatbot": Bot,
                  "Avtomatlashtirish": Zap
                }[project.category] || Globe;
                
                const IconComponent = categoryIcon;

                return (
                  <Card key={project.id} className="card-gradient overflow-hidden group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300"></div>
                      <IconComponent className="h-16 w-16 text-primary/40 relative z-10" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-4">
                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(project.results).slice(0, 4).map(([key, value], idx) => (
                          <div key={key} className="text-center p-2 bg-muted/50 rounded-lg">
                            <div className="text-sm font-semibold text-foreground">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Texnologiyalar:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link to={project.caseStudyLink} className="flex-1">
                          <Button variant="outline" className="w-full">
                            Case Study
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        {(project.liveLink || project.telegramLink || project.demoLink) && (
                          <Button variant="ghost" size="icon" asChild>
                            <a 
                              href={project.liveLink || project.telegramLink || project.demoLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Projects */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <span className="text-gradient">Barcha Loyihalar</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Kategoriya bo'yicha loyihalarni ko'rib chiqing va batafsil ma'lumot oling
              </p>
            </div>

            <Tabs defaultValue="Barchasi" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-sm">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(category === "Barchasi" ? allProjects : allProjects.filter(p => p.category === category))
                      .map((project) => {
                        const categoryIcon = {
                          "Web Sayt": Globe,
                          "Telegram Bot": MessageCircle, 
                          "AI Chatbot": Bot,
                          "Avtomatlashtirish": Zap
                        }[project.category] || Globe;
                        
                        const IconComponent = categoryIcon;

                        return (
                          <Card key={project.id} className="card-gradient group hover:scale-105">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className={`w-10 h-10 rounded-lg bg-${project.color}/10 flex items-center justify-center`}>
                                  <IconComponent className={`h-5 w-5 text-${project.color}`} />
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {project.year}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {project.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>
                            </CardHeader>

                            <CardContent className="pt-0 space-y-3">
                              {/* Key Results */}
                              <div className="space-y-1">
                                {Object.entries(project.results).slice(0, 2).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground capitalize">{key}:</span>
                                    <span className="font-medium text-foreground">{value}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Client */}
                              <div className="text-sm">
                                <span className="text-muted-foreground">Mijoz: </span>
                                <span className="font-medium text-foreground">{project.client}</span>
                              </div>

                              <div className="flex space-x-2 pt-2">
                                <Link to={project.caseStudyLink} className="flex-1">
                                  <Button variant="outline" size="sm" className="w-full">
                                    Batafsil
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                  </Button>
                                </Link>
                                {(project.liveLink || project.telegramLink || project.demoLink) && (
                                  <Button variant="ghost" size="sm" asChild>
                                    <a 
                                      href={project.liveLink || project.telegramLink || project.demoLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 lg:p-12 rounded-2xl border border-border/50">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  Sizning loyihangiz ham muvaffaqiyatli bo'lsin!
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Bepul konsultatsiya olish va loyihangizni muhokama qilish uchun bog'laning. 
                  Proven natijalar va professional yondashuv.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/aloqa">
                    <Button className="btn-hero">
                      Loyiha Boshlash
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/xizmatlar">
                    <Button className="btn-secondary-hero">
                      Xizmatlar Ko'rish
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}