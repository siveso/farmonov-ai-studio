import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MessageCircle, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-muted/30 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-gradient">Akram Farmonov</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Web saytlar, Telegram botlar, chatbotlar va biznes avtomatlashtirish — 
              O'zbek bizneslari uchun tezkor va ishonchli yechimlar.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/xizmatlar" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Xizmatlar
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Xizmatlar</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">Web saytlar</li>
              <li className="text-muted-foreground text-sm">Telegram botlar</li>
              <li className="text-muted-foreground text-sm">AI Chatbotlar</li>
              <li className="text-muted-foreground text-sm">Biznes avtomatlashtirish</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Bog'lanish</h3>
            <div className="space-y-3">
              <a href="mailto:akram@farmonov.uz" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="h-4 w-4" />
                <span>akram@farmonov.uz</span>
              </a>
              <a href="tel:+998901234567" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="h-4 w-4" />
                <span>+998 99 644 84 44</span>
              </a>
              <a href="https://t.me/akramfarmonov" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <MessageCircle className="h-4 w-4" />
                <span>@akramfarmonov</span>
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-2 pt-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com/in/akramfarmonov" target="_blank" rel="me noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/akramfarmonov" target="_blank" rel="me noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Akram Farmonov. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Maxfiylik siyosati
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}