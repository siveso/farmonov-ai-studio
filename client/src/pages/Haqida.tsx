import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Download,
  Award,
  Users,
  Globe,
  Code2,
  Bot,
  Zap,
  TrendingUp,
  BookOpen,
  Clock,
  MapPin,
  Mail,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

const skills = [
  { name: "Web Development", level: 95, icon: Globe, color: "primary" },
  { name: "React / Next.js", level: 90, icon: Code2, color: "secondary" },
  { name: "Telegram Bot API", level: 85, icon: Bot, color: "accent" },
  { name: "AI / ChatGPT Integration", level: 80, icon: Bot, color: "primary" },
  { name: "Business Automation", level: 88, icon: Zap, color: "secondary" },
  { name: "SEO Optimization", level: 82, icon: TrendingUp, color: "accent" }
];

const achievements = [
  {
    icon: Users,
    number: "100+",
    label: "Baxtli mijozlar",
    description: "2022-yildan beri 100 dan ortiq mijoz bilan muvaffaqiyatli ishlash"
  },
  {
    icon: Code2,
    number: "150+",
    label: "Loyihalar",
    description: "Web saytlar, botlar va avtomatlashtirish tizimlari yaratish"
  },
  {
    icon: Award,
    number: "4.9/5",
    label: "Mijozlar reytingi",
    description: "Yuqori sifat va professional yondashuv bilan ishlash"
  },
  {
    icon: Clock,
    number: "24h",
    label: "Javob muddati",
    description: "Tezkor aloqa va professional konsultatsiya"
  }
];

const experience = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    company: "Freelance & Consulting",
    description: "AI chatbotlar, Telegram botlar va enterprise web solution­lar yaratish. OpenAI GPT integratsiya va kompleks avtomatlashtirish tizimlari.",
    technologies: ["Next.js", "OpenAI", "Telegram API", "PostgreSQL", "Supabase"]
  },
  {
    year: "2023",
    title: "Web Developer & Bot Specialist",
    company: "Various Clients",
    description: "E-commerce platformalar, restoran uchun bot­lar va CRM integratsiya loyihalari. SEO optimizatsiya va performance tuning.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "SEO"]
  },
  {
    year: "2022",
    title: "Junior Developer",
    company: "Local IT Company",
    description: "Web development asoslarini o'rganish va birinchi kommertsiya loyihalar­ida ishtirok etish. Frontend va backend texnologiyalarni o'zlashtirish.",
    technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"]
  }
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services", 
    year: "2024",
    credentialId: "AWS-SA-2024-001"
  },
  {
    name: "Google Analytics Certified",
    issuer: "Google",
    year: "2023", 
    credentialId: "GA-CERT-2023-15"
  },
  {
    name: "Telegram Bot API Expert",
    issuer: "Telegram",
    year: "2023",
    credentialId: "TG-BOT-2023-89"
  }
];

export default function Haqida() {
  return (
    <>
      <Helmet>
        <title>Haqida | Akram Farmonov - Professional Web Developer va Bot Specialist</title>
        <meta 
          name="description" 
          content="Akram Farmonov haqida batafsil ma'lumot. 3+ yillik tajriba, 100+ muvaffaqiyatli loyiha, web development, Telegram bot va AI chatbot mutaxassisi." 
        />
        <meta name="keywords" content="akram farmonov, web developer, telegram bot, cv, resume, tajriba, o'zbekiston" />
        <link rel="canonical" href="https://akramfarmonov.uz/haqida" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Akram Farmonov",
            "jobTitle": "Web Developer & Telegram Bot Specialist", 
            "description": "3+ yillik tajribaga ega web developer, Telegram bot va AI chatbot mutaxassisi",
            "url": "https://akramfarmonov.uz/haqida",
            "email": "akram@farmonov.uz",
            "telephone": "+998901234567",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "UZ",
              "addressRegion": "Tashkent"
            },
            "knowsAbout": [
              "Web Development",
              "React",
              "Next.js", 
              "Telegram Bot Development",
              "AI Chatbots",
              "Business Automation",
              "SEO Optimization"
            ],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Tashkent University of Information Technologies"
            },
            "hasCredential": certifications.map(cert => ({
              "@type": "EducationalOccupationalCredential",
              "name": cert.name,
              "credentialCategory": "Certificate",
              "recognizedBy": {
                "@type": "Organization",
                "name": cert.issuer
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
                Men <span className="text-accent">Akram Farmonov</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                O'zbek bizneslariga amaliy web va avtomatlashtirish yechimlari yarataman. 
                Maqsadim — natija va soddalik. 3+ yillik tajriba, 100+ muvaffaqiyatli loyiha.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>Tashkent, O'zbekiston</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>3+ yil tajriba</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>100+ loyiha</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 lg:py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Bio */}
                <Card className="card-gradient p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Mening hikoyam
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Salom! Men Akram Farmonov — web developer, Telegram bot va AI chatbot mutaxassisiman. 
                      2022-yildan beri O'zbek bizneslari uchun zamonaviy texnologik yechimlar yaratib kelaman.
                    </p>
                    <p>
                      Mening asosiy maqsadim — murakkab texnologik yechimlarni oddiy va foydali mahsulotlarga 
                      aylantirishdir. Har bir loyihada mijozning biznes maqsadlariga erishishga e'tibor beraman, 
                      nafaqat texnik tomonini, balki natijani ham hisobga olaman.
                    </p>
                    <p>
                      Men web development (React, Next.js), Telegram bot yaratish, AI chatbotlar va 
                      biznes avtomatlashtirish bo'yicha chuqur bilimga egaman. Har doim yangi texnologiyalarni 
                      o'rganib boraman va O'zbek bozoriga mos yechimlar yaratishga intilamga.
                    </p>
                    <p>
                      Professional faoliyatim davomida 100 dan ortiq loyihani muvaffaqiyatli yakunladim va 
                      mijozlarimning 95% dan ortig'i natijadan to'liq memnun qoldi. Bu men uchun eng katta yutuq!
                    </p>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="card-gradient p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Texnik Ko'nikmalar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-6">
                    {skills.map((skill) => {
                      const IconComponent = skill.icon;
                      return (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-lg bg-${skill.color}/10 flex items-center justify-center`}>
                                <IconComponent className={`h-4 w-4 text-${skill.color}`} />
                              </div>
                              <span className="font-medium text-foreground">{skill.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="card-gradient p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Ish Tajribasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-6">
                    {experience.map((exp, index) => (
                      <div key={index} className="relative">
                        {index !== experience.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-px bg-border"></div>
                        )}
                        <div className="flex space-x-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-primary">{exp.year}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                            <p className="text-muted-foreground mb-3 leading-relaxed">{exp.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Stats */}
                <Card className="card-gradient p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                      Natijalar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    {achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-2xl font-bold text-foreground">{achievement.number}</div>
                          <div className="text-sm font-medium text-foreground">{achievement.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{achievement.description}</div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="card-gradient p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                      Aloqa Ma'lumotlari
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <a 
                      href="mailto:akram@farmonov.uz"
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">akram@farmonov.uz</span>
                    </a>
                    <a 
                      href="https://t.me/akramfarmonov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">@akramfarmonov</span>
                    </a>
                    <div className="flex items-center space-x-3 p-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">Tashkent, O'zbekiston</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="card-gradient p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                      Sertifikatlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm font-medium text-foreground">{cert.name}</div>
                        <div className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</div>
                        <div className="text-xs text-muted-foreground">ID: {cert.credentialId}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* CV Download */}
                <Card className="card-gradient p-6">
                  <CardContent className="pt-6 text-center">
                    <Button className="btn-hero w-full">
                      <Download className="mr-2 h-4 w-4" />
                      CV Yuklab Olish
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF formatida to'liq CV
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 lg:p-12 rounded-2xl border border-border/50">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  Birgalikda loyiha ustida ishlaymizmi?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Professional yondashuv, sifatli natija va mijozlar memnuniyati — 
                  mening asosiy tamoyillarim. Keling, loyihangizni muhokama qilaylik!
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/aloqa">
                    <Button className="btn-hero">
                      Aloqaga Chiqish
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button className="btn-secondary-hero">
                      Portfolio Ko'rish
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