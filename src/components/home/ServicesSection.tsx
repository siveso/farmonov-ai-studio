import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageCircle, Bot, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    title: "Web Saytlar",
    description: "Tezkor, SEO-optimallashgan, mobilga mos. Next.js, Tailwind, headless CMS.",
    features: [
      "SEO optimizatsiya",
      "Mobil-friendly dizayn",
      "Tez yuklash",
      "CMS integratsiya"
    ],
    priceFrom: "2,000,000",
    color: "primary"
  },
  {
    icon: MessageCircle,
    title: "Telegram Botlar",
    description: "Savdo, so'rovlar, to'lov, CRM bog'lanish. Oson boshqaruv.",
    features: [
      "To'lov tizimi",
      "CRM integratsiya",
      "Avtomatik javoblar",
      "Analytics"
    ],
    priceFrom: "1,500,000",
    color: "secondary"
  },
  {
    icon: Bot,
    title: "AI Chatbotlar",
    description: "AI asosida qo'llab-quvvatlash, FAQ avtomatlashtirish, lead qualification.",
    features: [
      "24/7 qo'llab-quvvatlash",
      "Natural language",
      "Lead generation",
      "Multi-platform"
    ],
    priceFrom: "3,000,000",
    color: "accent"
  },
  {
    icon: Zap,
    title: "Biznes Avtomatlashtirish",
    description: "Zapier/Make, Google Sheets/CRM integratsiya, workflow dizayn.",
    features: [
      "Workflow avtomatlashtirish",
      "API integratsiya",
      "Data sinxronizatsiya",
      "Hisobot tizimi"
    ],
    priceFrom: "1,000,000",
    color: "primary"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient">Xizmatlar</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Biznesingizni rivojlantirish uchun zamonaviy texnologiyalar va 
            professional yondashuv bilan ishlaymiz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="card-gradient p-6 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-${service.color}/10`}>
                    <IconComponent className={`h-6 w-6 text-${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        {service.priceFrom.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground ml-1">UZS dan</span>
                    </div>
                    <Link to="/aloqa">
                      <Button variant="outline" size="sm">
                        Buyurtma
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/xizmatlar">
            <Button className="btn-hero">
              Barcha Xizmatlarni Ko'rish
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}