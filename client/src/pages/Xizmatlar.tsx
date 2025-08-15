import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  MessageCircle, 
  Bot, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Shield,
  Smartphone,
  TrendingUp
} from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const services = [
  {
    icon: Globe,
    title: "Web Saytlar",
    subtitle: "Zamonaviy va SEO-optimallashgan",
    description: "Tezkor, SEO-optimallashgan, mobilga mos web saytlar. Next.js, Tailwind CSS, headless CMS va zamonaviy texnologiyalar bilan.",
    features: [
      "SEO optimizatsiya (Google Top 10)",
      "Mobil-friendly responsive dizayn", 
      "Tez yuklash (3 soniyadan kam)",
      "CMS va admin panel",
      "SSL sertifikat va xavfsizlik",
      "Google Analytics integratsiya",
      "Ijtimoiy tarmoqlar integratsiya",
      "Contact form va feedback tizimi"
    ],
    pricing: {
      from: "2,000,000",
      average: "3,500,000",
      premium: "6,000,000"
    },
    timeline: "2-6 hafta",
    technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Vercel"],
    color: "primary",
    popular: false
  },
  {
    icon: MessageCircle,
    title: "Telegram Botlar",
    subtitle: "Savdo va mijozlar uchun",
    description: "Savdo, so'rovlar, to'lov tizimi, CRM bog'lanish. To'liq avtomatik boshqaruv va hisobot tizimi.",
    features: [
      "To'lov tizimi (Click, Payme, Uzcard)",
      "CRM va baza integratsiya",
      "Avtomatik buyurtma jarayoni",
      "Mahsulot katalogi va qidiruv",
      "Mijozlar bilan chat",
      "Hisobot va analytics",
      "Admin panel va boshqaruv",
      "Backup va ma'lumot himoyasi"
    ],
    pricing: {
      from: "1,500,000", 
      average: "2,500,000",
      premium: "4,000,000"
    },
    timeline: "1-3 hafta", 
    technologies: ["Node.js", "Telegram Bot API", "MongoDB", "Payment APIs"],
    color: "secondary",
    popular: true
  },
  {
    icon: Bot,
    title: "AI Chatbotlar", 
    subtitle: "24/7 mijozlar xizmati",
    description: "AI asosida qo'llab-quvvatlash, FAQ avtomatlashtirish, lead qualification va mijozlar bilan professional aloqa.",
    features: [
      "24/7 avtomatik javob berish",
      "Natural language processing",
      "Lead generation va qualification", 
      "Multi-platform (web, Telegram, WhatsApp)",
      "Mijozlar ma'lumotlarini saqlash",
      "Conversation analytics",
      "Custom training va o'rgatish",
      "Human handover funktsiasi"
    ],
    pricing: {
      from: "3,000,000",
      average: "5,000,000", 
      premium: "8,000,000"
    },
    timeline: "2-4 hafta",
    technologies: ["OpenAI GPT", "React", "WebSocket", "Python", "NLP"],
    color: "accent",
    popular: false
  },
  {
    icon: Zap,
    title: "Biznes Avtomatlashtirish",
    subtitle: "Workflow va integratsiya",
    description: "Zapier/Make, Google Sheets/CRM integratsiya, workflow dizayn. Biznes jarayonlarini to'liq avtomatlashtirish.",
    features: [
      "Workflow avtomatlashtirish",
      "API integratsiya (CRM, ERP)",
      "Data sinxronizatsiya",
      "Avtomatik hisobot tizimi",
      "Email marketing avtomatlashtirish",
      "Inventory management",
      "Task management integratsiya",
      "Real-time monitoring"
    ],
    pricing: {
      from: "1,000,000",
      average: "2,000,000",
      premium: "4,000,000"
    },
    timeline: "1-2 hafta",
    technologies: ["Zapier", "Make", "Google APIs", "REST APIs", "Webhooks"],
    color: "primary",
    popular: false
  }
];

const faqs = [
  {
    question: "Loyihani bajarish qancha vaqt oladi?",
    answer: "Oddiy Telegram bot 1-2 hafta, web sayt 2-6 hafta, murakkab AI chatbot 2-4 hafta davom etadi. Aniq muddat loyiha murakkabligiga bog'liq."
  },
  {
    question: "To'lov qanday amalga oshiriladi?",
    answer: "50% oldindan to'lov, 50% loyiha tugaganidan keyin. Katta loyihalarda bosqichma-bosqich to'lov mumkin. Click, Payme, Uzcard qabul qilamiz."
  },
  {
    question: "Qo'llab-quvvatlash xizmati bormi?",
    answer: "Ha, barcha loyihalar uchun 3 oy bepul qo'llab-quvvatlash. Keyin oyiga 300,000 UZS ga texnik yordam va yangilanishlar."
  },
  {
    question: "Source code va huquqlar kimnikimi?",
    answer: "To'liq to'lovdan keyin barcha kodlar va huquqlar mijozga tegishli. GitHub repository ga kirish va barcha dokumentatsiya beriladi."
  }
];

export default function Xizmatlar() {
  return (
    <>
      <Helmet>
        <title>Xizmatlar | Web sayt, Telegram bot, AI Chatbot va Avtomatlashtirish</title>
        <meta 
          name="description" 
          content="Web sayt, Telegram bot, AI chatbot va biznes avtomatlashtirish xizmatlari. Tezkor ishga tushirish, aniq natijalar, to'liq qo'llab-quvvatlash. Narxlar va muddat." 
        />
        <meta name="keywords" content="web sayt narxi, telegram bot yaratish, AI chatbot, biznes avtomatlashtirish, O'zbekiston" />
        <link rel="canonical" href="https://akramfarmonov.uz/xizmatlar" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "provider": {
              "@type": "Person",
              "name": "Akram Farmonov"
            },
            "areaServed": "UZ",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Web Development Services",
              "itemListElement": services.map(service => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description
                }
              }))
            }
          })}
        </script>
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-20 lg:py-24 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Professional <span className="text-accent">Xizmatlar</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Biznesingizni rivojlantirish uchun zamonaviy texnologiyalar va 
                professional yondashuv. Aniq natijalar va sifatli ishlash kafolati.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="card-gradient p-6 relative overflow-hidden">
                    {service.popular && (
                      <Badge className="absolute top-6 right-6 bg-accent text-accent-foreground">
                        Mashhur
                      </Badge>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 rounded-xl bg-${service.color}/10 flex items-center justify-center`}>
                          <IconComponent className={`h-8 w-8 text-${service.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold">
                            {service.title}
                          </CardTitle>
                          <p className="text-muted-foreground">{service.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Xususiyatlar:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-foreground">Narx:</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Oddiy:</span>
                            <span className="font-semibold">{parseInt(service.pricing.from).toLocaleString()} UZS dan</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">O'rtacha:</span>
                            <span className="font-semibold">{parseInt(service.pricing.average).toLocaleString()} UZS</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Premium:</span>
                            <span className="font-semibold">{parseInt(service.pricing.premium).toLocaleString()} UZS gacha</span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline & Technologies */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Muddat: {service.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span className="text-primary text-xs">3 oy kafolat</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Texnologiyalar:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Link to="/aloqa">
                        <Button className="btn-hero w-full">
                          Buyurtma Berish
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className="text-gradient">Tez-tez so'raladigan savollar</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Eng ko'p so'raladigan savollarga javoblar
                </p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="card-gradient">
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 lg:p-12 rounded-2xl border border-border/50">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  Loyihangizni boshlashga tayyormisiz?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Bepul konsultatsiya olish va loyihangizni muhokama qilish uchun bog'laning. 
                  Professional yondashuv va sifatli natija kafolati.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                  <Link to="/aloqa">
                    <Button className="btn-hero">
                      Bepul Konsultatsiya
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button className="btn-secondary-hero">
                      Portfolio Ko'rish
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>100+ muvaffaqiyatli loyiha</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>3 oy kafolat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>24 soat ichida javob</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}