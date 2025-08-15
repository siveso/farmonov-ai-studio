import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Bobur Karimov",
    position: "Restoran egasi",
    company: "Osh Markazi",
    content: "Akram bizning restoran uchun Telegram bot yasadi. Endi buyurtmalarni olish 3 barobar tezlashdi va xodimlar boshqa ishlar bilan band bo'lishdi. Juda ham professional!",
    rating: 5,
    avatar: "BK"
  },
  {
    id: 2,
    name: "Dilnoza Rahimova",
    position: "Marketing Director",
    company: "Fashion House UZ",
    content: "E-commerce saytimiz SEO optimizatsiyasidan keyin Google'da birinchi sahifaga chiqdi. Savdo 2.5 barobar oshdi. Akramning ishi sifatli va tezkor!",
    rating: 5,
    avatar: "DR"
  },
  {
    id: 3,
    name: "Sardor Nazarov",
    position: "IT Manager",
    company: "LogisticPro",
    content: "CRM va WhatsApp API ni bog'lash kerak edi. Akram 2 haftada tayyor qildi. Endi mijozlar bilan aloqa avtomatik, hamma ma'lumot bir joyda saqlanadr.",
    rating: 5,
    avatar: "SN"
  },
  {
    id: 4,
    name: "Malika Tosheva",
    position: "Biznes egasi",
    company: "Beauty Salon Chain",
    content: "Uchinchi salon ochganimda yangi booking tizim kerak edi. Akram mobil-friendly sayt va Telegram bot qildi. Mijozlar endi online band qilishadi, juda qulay!",
    rating: 5,
    avatar: "MT"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Mijozlar <span className="text-gradient">Fikrlari</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Bizning mijozlarimiz loyihalar natijasidan qanchalik mamnun 
            ekanliklarini o'qing va bizning professional yondashuvimizni ko'ring.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-gradient p-6">
              <CardContent className="p-0">
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-border/50">
          <h3 className="text-2xl font-bold mb-2 text-foreground">
            Sizning loyihangiz ham muvaffaqiyatli bo'lsin!
          </h3>
          <p className="text-muted-foreground mb-4">
            Bepul konsultatsiya olish va loyihangizni muhokama qilish uchun bog'laning.
          </p>
          <div className="text-sm text-muted-foreground">
            ⭐ 4.9/5 mijozlar reytingi | 💼 100+ muvaffaqiyatli loyiha | ⚡ Tez bajarish
          </div>
        </div>
      </div>
    </section>
  );
}