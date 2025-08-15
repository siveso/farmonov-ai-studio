import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageCircle, Bot, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

// Icon mapping for dynamic services
const iconMap: { [key: string]: any } = {
  Globe,
  MessageCircle, 
  Bot,
  Zap
};

export default function ServicesSection() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-300 rounded mx-auto w-48"></div>
              <div className="h-4 bg-gray-300 rounded mx-auto w-96"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-gradient">Xizmatlar</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Hozircha xizmatlar ma'lumotlari yuklanmagan.
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {services.map((service) => {
            const IconComponent = iconMap[service.icon || "Globe"] || Globe;
            const pricing = service.pricing as any;
            return (
              <Card key={service.id} className="card-gradient p-6 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-${service.color || 'primary'}/10`}>
                    <IconComponent className={`h-6 w-6 text-${service.color || 'primary'}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                  {service.subtitle && (
                    <p className="text-sm text-primary font-medium">{service.subtitle}</p>
                  )}
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features?.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        {pricing?.from || "Narx"}
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