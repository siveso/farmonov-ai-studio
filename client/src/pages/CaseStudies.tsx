import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  ExternalLink,
  Calendar,
  Globe,
  MessageCircle,
  Bot,
  Zap
} from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const caseStudies = [
  {
    id: 1,
    title: "TashkentMarket E-commerce Success Story",
    subtitle: "To'liq onlayn savdo platformasi yaratish va optimizatsiya",
    client: "TashkentMarket LLC",
    industry: "E-commerce / Retail",
    duration: "45 kun",
    year: "2024",
    category: "Web Sayt",
    featured: true,
    challenge: "TashkentMarket mahalliy biznesi uchun zamonaviy, tezkor va SEO-optimizatsiya qilingan e-commerce platforma kerak edi. Eski sayt sekin yuklandi, mobil qurilmalarda yomon ishladi va Google'da past o'rinda edi.",
    solution: "Next.js va TypeScript yordamida zamonaviy e-commerce platforma yaratdik. Stripe va mahalliy to'lov tizimlari integratsiya qildik. SEO optimizatsiya va performance tuning amalga oshirdik.",
    results: [
      { metric: "Trafik o'sishi", value: "250%", description: "3 oy ichida organik trafik" },
      { metric: "Savdo o'sishi", value: "180%", description: "Oylik savdo hajmi" },
      { metric: "Konversiya", value: "4.2%", description: "Tashrif → Xarid" },
      { metric: "PageSpeed", value: "98/100", description: "Google metrikasi" },
      { metric: "Yuklash vaqti", value: "1.2s", description: "O'rtacha sahifa yuklash" },
      { metric: "Mobil UX", value: "95/100", description: "Mobil foydalanuvchi tajribasi" }
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Vercel"],
    timeline: [
      { phase: "Tahlil va rejalashtirish", days: "5 kun", status: "completed" },
      { phase: "UI/UX dizayn", days: "8 kun", status: "completed" },
      { phase: "Frontend development", days: "15 kun", status: "completed" },
      { phase: "Backend va API", days: "10 kun", status: "completed" },
      { phase: "To'lov integratsiya", days: "4 kun", status: "completed" },
      { phase: "Test va deploy", days: "3 kun", status: "completed" }
    ],
    features: [
      "Responsive va mobile-first dizayn",
      "SEO optimizatsiya va strukturalashgan ma'lumotlar",
      "Multi-payment gateway (Stripe, Click, Payme)",
      "Real-time inventory management",
      "Advanced search va filter tizimi",
      "Admin dashboard va analytics",
      "Avtomatik email marketing",
      "Multi-language support"
    ],
    testimonial: {
      text: "Akram bilan ishlash juda professional va samarali bo'ldi. Bizning kutganimizdan ham yaxshi natija oldi. Savdo hajmimiz 180% ga oshdi!",
      author: "Aziz Karimov",
      position: "TashkentMarket CEO"
    },
    images: ["/placeholder.svg"],
    liveUrl: "https://tashkentmarket.uz",
    color: "primary"
  },
  {
    id: 2,
    title: "OshMarkazi Restaurant Bot Automation",
    subtitle: "Avtomatik buyurtma va to'lov tizimi yaratish",
    client: "Osh Markazi Restaurant",
    industry: "Restaurant / Food Service",
    duration: "20 kun", 
    year: "2024",
    category: "Telegram Bot",
    featured: true,
    challenge: "Restaurant kuniga ko'p buyurtma oladi, lekin telefon orqali buyurtma olish sekin va xatolarga olib kelardi. Mijozlar uchun noqulay, xodimlar uchun ko'p ish yukı.",
    solution: "Telegram bot orqali avtomatik buyurtma tizimi yaratdik. Menyu, narxlar, to'lov va yetkazib berish - barchasi avtomatik. Real-time tracking va SMS xabarnomalar qo'shdik.",
    results: [
      { metric: "Buyurtmalar", value: "300%", description: "Kunlik buyurtma soni" },
      { metric: "Samaradorlik", value: "200%", description: "Xodimlar samaradorligi" },
      { metric: "Mijoz memnuniyati", value: "95%", description: "Feedback asosida" },
      { metric: "O'rtacha check", value: "+45%", description: "Buyurtma qiymati" },
      { metric: "Javob vaqti", value: "< 30s", description: "Buyurtma tasdiqlash" },
      { metric: "Xatoliklar", value: "-80%", description: "Buyurtma xatoliklari" }
    ],
    technologies: ["Node.js", "Telegram Bot API", "MongoDB", "Click API", "SMS Gateway"],
    timeline: [
      { phase: "Bot architecture", days: "3 kun", status: "completed" },
      { phase: "Menu va database", days: "4 kun", status: "completed" },
      { phase: "Buyurtma logic", days: "6 kun", status: "completed" },
      { phase: "To'lov integratsiya", days: "4 kun", status: "completed" },
      { phase: "Admin panel", days: "2 kun", status: "completed" },
      { phase: "Test va launch", days: "1 kun", status: "completed" }
    ],
    features: [
      "Interaktiv menyu va narxlar",
      "Avtomatik buyurtma qabul qilish",
      "Click va Payme to'lov integratsiya",
      "Real-time buyurtma tracking",
      "SMS va bot orqali xabarnomalar",
      "Lokatsiya va yetkazib berish",
      "Admin dashboard va statistika",
      "Mijozlar feedback tizimi"
    ],
    testimonial: {
      text: "Bot bizning ishlash usulimizni butunlay o'zgartirdi. Endi mijozlar 24/7 buyurtma bera oladi va biz hech qanday buyurtmani yo'qotmaymiz.",
      author: "Madina Saidova",
      position: "Marketing direktor"
    },
    images: ["/placeholder.svg"],
    telegramUrl: "https://t.me/oshmarkazibot",
    color: "secondary"
  },
  {
    id: 3,
    title: "BeautySpace AI Customer Support",
    subtitle: "24/7 AI chatbot va mijozlar xizmati avtomatlashtirish",
    client: "BeautySpace Salon Network",
    industry: "Beauty & Wellness",
    duration: "30 kun",
    year: "2024", 
    category: "AI Chatbot",
    featured: true,
    challenge: "Salon tarmog'ida mijozlar ko'p savol beradi, navbat olishda muammolar, 24/7 qo'llab-quvvatlash yo'q. Xodimlar ko'p vaqtni telefon javoblariga sarflaydi.",
    solution: "OpenAI GPT-4 asosida smart chatbot yaratdik. Natural language processing, avtomatik navbat berish, FAQ javoblash va lead generation funksiyalari qo'shdik.",
    results: [
      { metric: "Qo'llab-quvvatlash", value: "400%", description: "24/7 availability" },
      { metric: "Yangi mijozlar", value: "250%", description: "Lead generation" },
      { metric: "Javob aniqligi", value: "95%", description: "AI chatbot performance" },
      { metric: "Xodim vaqti", value: "-70%", description: "Phone support workload" },
      { metric: "Booking conversion", value: "85%", description: "Chat → Appointment" },
      { metric: "Mijoz satisfaction", value: "92%", description: "Chat experience rating" }
    ],
    technologies: ["OpenAI GPT-4", "React", "WebSocket", "Python", "PostgreSQL", "Webhook"],
    timeline: [
      { phase: "AI model training", days: "8 kun", status: "completed" },
      { phase: "Chatbot interface", days: "7 kun", status: "completed" },
      { phase: "Appointment system", days: "6 kun", status: "completed" },
      { phase: "CRM integratsiya", days: "5 kun", status: "completed" },
      { phase: "Multi-platform deploy", days: "3 kun", status: "completed" },
      { phase: "Testing va optimization", days: "1 kun", status: "completed" }
    ],
    features: [
      "Natural language understanding",
      "24/7 avtomatik mijoz qo'llab-quvvatlash",
      "Avtomatik navbat berish tizimi",
      "CRM va calendar integratsiya",
      "Multi-channel support (web, Telegram, WhatsApp)",
      "Lead scoring va qualification",
      "Conversation analytics",
      "Admin dashboard va reporting"
    ],
    testimonial: {
      text: "AI chatbot bizning mijoz xizmatini yangi darajaga olib chiqdi. Mijozlar har vaqt javob olib, navbat olishlari mumkin.",
      author: "Jasur Abdullayev",
      position: "IT direktor"
    },
    images: ["/placeholder.svg"],
    demoUrl: "https://demo.beautyspace.uz",
    color: "accent"
  }
];

export default function CaseStudies() {
  const featuredCases = caseStudies.filter(cs => cs.featured);

  return (
    <>
      <Helmet>
        <title>Case Studies | Akram Farmonov - Real Natijalar va Success Stories</title>
        <meta 
          name="description" 
          content="Akram Farmonov loyihalarining batafsil tahlili va real natijalari. E-commerce, Telegram bot, AI chatbot case studies va success stories." 
        />
        <meta name="keywords" content="case study, success story, loyiha tahlili, web development natijalar, telegram bot case study" />
        <link rel="canonical" href="https://akramfarmonov.uz/case-studies" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Case Studies - Akram Farmonov",
            "description": "Muvaffaqiyatli web development, bot va AI loyihalari case studies",
            "author": {
              "@type": "Person",
              "name": "Akram Farmonov"
            },
            "hasPart": featuredCases.map(cs => ({
              "@type": "Article",
              "headline": cs.title,
              "description": cs.subtitle,
              "datePublished": `${cs.year}-01-01`,
              "author": {
                "@type": "Person",
                "name": "Akram Farmonov"
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
                Case Studies va <span className="text-accent">Success Stories</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Real loyihalar, real natijalar va mijozlarimizning muvaffaqiyat hikojalari. 
                Har bir case study biznesingiz uchun ilhom manbai bo'lishi mumkin.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-accent" />
                  <span>Aniq natijalar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span>O'sish ko'rsatkichlari</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span>Mijozlar memnuniyati</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
        <section className="py-16 lg:py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {featuredCases.map((caseStudy, index) => {
                const categoryIcon = {
                  "Web Sayt": Globe,
                  "Telegram Bot": MessageCircle,
                  "AI Chatbot": Bot,
                  "Avtomatlashtirish": Zap
                }[caseStudy.category] || Globe;
                
                const IconComponent = categoryIcon;

                return (
                  <div key={caseStudy.id} className={`${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row gap-12 items-center`}>
                    {/* Content */}
                    <div className="lg:w-1/2 space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg bg-${caseStudy.color}/10 flex items-center justify-center`}>
                          <IconComponent className={`h-6 w-6 text-${caseStudy.color}`} />
                        </div>
                        <div>
                          <Badge variant="secondary">{caseStudy.category}</Badge>
                          <p className="text-sm text-muted-foreground">{caseStudy.year}</p>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-3xl font-bold mb-2">{caseStudy.title}</h2>
                        <p className="text-xl text-muted-foreground mb-4">{caseStudy.subtitle}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{caseStudy.client}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{caseStudy.duration}</span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Muammo:</h3>
                          <p className="text-muted-foreground">{caseStudy.challenge}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Yechim:</h3>
                          <p className="text-muted-foreground">{caseStudy.solution}</p>
                        </div>
                      </div>

                      {/* Key Results Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {caseStudy.results.slice(0, 4).map((result, idx) => (
                          <div key={idx} className="text-center p-4 bg-muted/50 rounded-lg">
                            <div className={`text-2xl font-bold text-${caseStudy.color}`}>{result.value}</div>
                            <div className="text-sm font-medium">{result.metric}</div>
                            <div className="text-xs text-muted-foreground">{result.description}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-3">
                        <Link to={`/case-studies/${caseStudy.id}`}>
                          <Button className="btn-hero">
                            To'liq Case Study
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        {(caseStudy.liveUrl || caseStudy.telegramUrl || caseStudy.demoUrl) && (
                          <Button variant="outline" asChild>
                            <a 
                              href={caseStudy.liveUrl || caseStudy.telegramUrl || caseStudy.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Ko'rish
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Visual */}
                    <div className="lg:w-1/2">
                      <Card className="card-gradient p-8">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-6">
                          <IconComponent className="h-24 w-24 text-primary/20" />
                        </div>
                        
                        {/* Testimonial */}
                        <blockquote className="text-center">
                          <p className="text-muted-foreground mb-4">"{caseStudy.testimonial.text}"</p>
                          <footer>
                            <cite className="font-semibold text-foreground">{caseStudy.testimonial.author}</cite>
                            <p className="text-sm text-muted-foreground">{caseStudy.testimonial.position}</p>
                          </footer>
                        </blockquote>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 lg:p-12 rounded-2xl border border-border/50">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  Sizning Success Storyingizni Yaratamizmi?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Yuqoridagi natijalar haqiqiy mijozlarimizniki. Sizning biznesingiz ham 
                  shunday muvaffaqiyatli bo'lishi mumkin.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/aloqa">
                    <Button className="btn-hero">
                      Bepul Konsultatsiya
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button className="btn-secondary-hero">
                      Boshqa Loyihalar
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