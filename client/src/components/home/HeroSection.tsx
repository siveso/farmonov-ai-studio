import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Bot, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-float">
            <Zap className="h-4 w-4" />
            <span>O'zbek bizneslari uchun yuqori sifatli yechimlar</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-gradient">Akram Farmonov</span>
            <br />
            <span className="text-foreground">
              Web saytlar, Telegram botlar, chatbotlar va biznes avtomatlashtirish
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            O'zbek bizneslari uchun tezkor, xavfsiz va SEO-friendly yechimlar. 
            Telegram botlar, CRM integratsiya, avtomatlashtirish va AI chatbotlar — 
            barchasi bir joyda.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Web Saytlar</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-secondary/10 rounded-lg">
                <Bot className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground">30+</div>
              <div className="text-sm text-muted-foreground">Telegram Botlar</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-accent/10 rounded-lg">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">20+</div>
              <div className="text-sm text-muted-foreground">Avtomatlashtirish</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Mijozlar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}