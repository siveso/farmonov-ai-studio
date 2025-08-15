import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Globe,
  Bot,
  Zap
} from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Aloqa() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessType: "",
    serviceType: "",
    budget: "",
    message: "",
    timeline: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Muvaffaqiyatli yuborildi!",
          description: result.message || "Rahmat! 24 soat ichida aloqaga chiqamiz.",
        });
        
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          businessType: "",
          serviceType: "",
          budget: "",
          message: "",
          timeline: ""
        });
      } else {
        throw new Error(result.error || "Xatolik yuz berdi");
      }
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: error instanceof Error ? error.message : "Iltimos qaytadan urinib ko'ring",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Aloqa | Akram Farmonov - Bepul Konsultatsiya</title>
        <meta 
          name="description" 
          content="Bepul konsultatsiya olish va loyihangizni muhokama qilish uchun bog'laning. Web sayt, Telegram bot, chatbot va avtomatlashtirish xizmatlari." 
        />
        <meta name="keywords" content="aloqa, konsultatsiya, web sayt buyurtma, telegram bot, Tashkent, O'zbekiston" />
        <link rel="canonical" href="https://akramfarmonov.uz/aloqa" />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-20 lg:py-24 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Aloqa va <span className="text-accent">Konsultatsiya</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                G'oyangizni amaliy yechimga aylantiraylik. Bepul 20 daqiqalik 
                konsultatsiyani bron qiling va loyihangiz haqida gaplashaylik.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>24 soat ichida javob</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Bepul konsultatsiya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Aniq narx va muddat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="card-gradient p-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Loyiha haqida ma'lumot bering
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Qanchalik ko'p ma'lumot bersangiz, shunchalik aniq taklif tayyorlay olamiz.
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ismingiz *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Ismingizni kiriting"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon raqam *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+998 90 123 45 67"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="email@example.com"
                        />
                      </div>

                      {/* Business Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessType">Biznes turi</Label>
                          <Select onValueChange={(value) => handleInputChange("businessType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Biznes turini tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ecommerce">E-commerce / Onlayn savdo</SelectItem>
                              <SelectItem value="restaurant">Restoran / Kafe</SelectItem>
                              <SelectItem value="beauty">Go'zallik salon</SelectItem>
                              <SelectItem value="education">Ta'lim / Kurslar</SelectItem>
                              <SelectItem value="medical">Tibbiyot / Klinika</SelectItem>
                              <SelectItem value="construction">Qurilish</SelectItem>
                              <SelectItem value="logistics">Logistika</SelectItem>
                              <SelectItem value="other">Boshqa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="serviceType">Kerakli xizmat *</Label>
                          <Select onValueChange={(value) => handleInputChange("serviceType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Xizmat turini tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Web sayt</SelectItem>
                              <SelectItem value="telegram-bot">Telegram bot</SelectItem>
                              <SelectItem value="ai-chatbot">AI Chatbot</SelectItem>
                              <SelectItem value="automation">Biznes avtomatlashtirish</SelectItem>
                              <SelectItem value="multiple">Bir nechta xizmat</SelectItem>
                              <SelectItem value="consultation">Faqat konsultatsiya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="budget">Taxminiy byudjet</Label>
                          <Select onValueChange={(value) => handleInputChange("budget", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Byudjetni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2m">1-2 million UZS</SelectItem>
                              <SelectItem value="2-5m">2-5 million UZS</SelectItem>
                              <SelectItem value="5-10m">5-10 million UZS</SelectItem>
                              <SelectItem value="10m+">10 million+ UZS</SelectItem>
                              <SelectItem value="discuss">Muhokama qilamiz</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timeline">Loyiha muddati</Label>
                          <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Muddat tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Tezkor (1-2 hafta)</SelectItem>
                              <SelectItem value="normal">Oddiy (1 oy)</SelectItem>
                              <SelectItem value="flexible">Moslashuvchan (2+ oy)</SelectItem>
                              <SelectItem value="discuss">Muhokama qilamiz</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Loyiha haqida batafsil *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Loyihangiz haqida batafsil yozing. Qanday maqsadingiz bor? Qanday muammoni hal qilmoqchisiz? Qanday funksiyalar kerak?"
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="btn-hero w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {/* Contact Cards */}
                <Card className="card-gradient p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                      To'g'ridan-to'g'ri aloqa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <a 
                      href="mailto:akram@farmonov.uz"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Email</div>
                        <div className="text-sm text-muted-foreground">akram@farmonov.uz</div>
                      </div>
                    </a>

                    <a 
                      href="tel:+998901234567"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Telefon</div>
                        <div className="text-sm text-muted-foreground">+998 90 123 45 67</div>
                      </div>
                    </a>

                    <a 
                      href="https://t.me/akramfarmonov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Telegram</div>
                        <div className="text-sm text-muted-foreground">@akramfarmonov</div>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                {/* Working Hours */}
                <Card className="card-gradient p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                      Ish vaqti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Dushanbadan Jumagacha</div>
                          <div className="text-sm text-muted-foreground">09:00 - 18:00</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Joylashuv</div>
                          <div className="text-sm text-muted-foreground">Tashkent, O'zbekiston</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Services */}
                <Card className="card-gradient p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                      Tezkor xizmatlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Web saytlar - 2 haftadan</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-secondary" />
                      <span className="text-sm text-muted-foreground">Telegram botlar - 1 haftadan</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Bot className="h-5 w-5 text-accent" />
                      <span className="text-sm text-muted-foreground">AI Chatbotlar - 2 haftadan</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Avtomatlashtirish - 1 haftadan</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}