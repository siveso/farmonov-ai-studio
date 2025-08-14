import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight, TrendingUp, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "To'liq onlayn savdo platformasi mahalliy biznes uchun",
    image: "/placeholder.svg",
    results: {
      traffic: "+250%",
      sales: "+180%",
      time: "45 kun"
    },
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Telegram API"],
    category: "Web Sayt",
    link: "/case-studies/ecommerce-platform"
  },
  {
    id: 2,
    title: "Restaurant Telegram Bot",
    description: "Avtomatik buyurtma va to'lov tizimi restoran uchun",
    image: "/placeholder.svg",
    results: {
      orders: "+300%",
      efficiency: "+200%",
      time: "20 kun"
    },
    technologies: ["Node.js", "Telegram Bot API", "Click/Payme", "MongoDB"],
    category: "Telegram Bot",
    link: "/case-studies/restaurant-bot"
  },
  {
    id: 3,
    title: "AI Customer Support",
    description: "24/7 mijozlar bilan ishlash uchun AI chatbot",
    image: "/placeholder.svg",
    results: {
      support: "+400%",
      satisfaction: "95%",
      time: "30 kun"
    },
    technologies: ["OpenAI GPT", "React", "WebSocket", "Express"],
    category: "AI Chatbot",
    link: "/case-studies/ai-support"
  }
];

export default function PortfolioSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Mijozlarimiz uchun amalga oshirgan loyihalar va ularning natijalari.
            Har bir loyiha biznesingiz uchun yangi imkoniyatlar ochadi.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className="card-gradient overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary/30">
                  {project.category.slice(0, 2)}
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={project.link}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Results */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
                  {Object.entries(project.results).map(([key, value], idx) => (
                    <div key={key} className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        {idx === 0 && <TrendingUp className="h-3 w-3 text-primary" />}
                        {idx === 1 && <Users className="h-3 w-3 text-secondary" />}
                        {idx === 2 && <Clock className="h-3 w-3 text-accent" />}
                      </div>
                      <div className="text-sm font-semibold text-foreground">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Texnologiyalar:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link to={project.link} className="block mt-4">
                  <Button variant="outline" className="w-full">
                    Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/portfolio">
            <Button className="btn-hero">
              Barcha Loyihalarni Ko'rish
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}