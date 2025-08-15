import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  Clock, 
  DollarSign, 
  Shield, 
  Headphones, 
  Code,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const faqCategories = [
  {
    title: "Umumiy Savollar",
    icon: HelpCircle,
    color: "primary",
    faqs: [
      {
        question: "Akram Farmonov kim va nima bilan shug'ullanadi?",
        answer: "Men Akram Farmonov - professional web developer, Telegram bot va AI chatbot mutaxassisiman. 2022-yildan beri O'zbek bizneslari uchun zamonaviy web saytlar, avtomatlashtirish tizimlari va digital yechimlar yaratib kelaman. Mening maqsadim - murakkab texnologiyalarni oddiy va foydali biznes yechimlarga aylantirishdir."
      },
      {
        question: "Qanday xizmatlar taklif qilasiz?",
        answer: "Asosiy xizmatlarim: 1) Web saytlar yaratish (korporativ, e-commerce, landing page) 2) Telegram botlar (savdo, mijozlar xizmati, avtomatlashtirish) 3) AI chatbotlar (24/7 qo'llab-quvvatlash, lead generation) 4) Biznes avtomatlashtirish (CRM integratsiya, workflow optimization) 5) SEO optimizatsiya va digital marketing yechimlar."
      },
      {
        question: "Sizning asosiy afzalliklaringiz nima?",
        answer: "1) O'zbek bozoriga chuqur tushunish 2) Tezkor ishlash va muddatni saqlash 3) Zamonaviy texnologiyalar (Next.js, AI, modern APIs) 4) SEO va performance optimizatsiya 5) 24/7 qo'llab-quvvatlash 6) Shaffof narxlar va aniq natijalar 7) 100+ muvaffaqiyatli loyiha tajribasi."
      },
      {
        question: "Qanday mijozlar bilan ishlaysiz?",
        answer: "Har xil o'lchamdagi bizneslar bilan ishlayman: startuplar, kichik va o'rta biznes, yirik kompaniyalar. Asosan O'zbek bozoridagi mijozlarga e'tibor beraman: restoran, savdo, ta'lim, tibbiyot, xizmat ko'rsatish sohalari. Har bir loyihaga individual yondasham va mijoz ehtiyojiga mos yechim taklif qilaman."
      }
    ]
  },
  {
    title: "Muddat va Jarayon",
    icon: Clock,
    color: "secondary", 
    faqs: [
      {
        question: "Loyiha qancha vaqt davom etadi?",
        answer: "Loyiha murakkabligiga qarab: Landing page - 3-7 kun, Oddiy korporativ sayt - 10-15 kun, E-commerce - 30-45 kun, Telegram bot - 7-20 kun, AI chatbot - 15-30 kun, CRM avtomatlashtirish - 10-25 kun. Aniq muddat texnik talablar va funksiyalar soni bilan belgilanadi."
      },
      {
        question: "Loyiha jarayoni qanday o'tadi?",
        answer: "1) Bepul konsultatsiya va talablarni aniqlash 2) Taklif va narxni kelishish 3) 50% oldindan to'lov 4) Dizayn maketi yaratish va tasdiqlash 5) Development bosqichi (haftalik demo) 6) Test va tekshirish 7) Launch va deploy 8) Qolgan 50% to'lov 9) 1 oy bepul qo'llab-quvvatlash."
      },
      {
        question: "Loyiha davomida qanday aloqa bo'ladi?",
        answer: "Doimiy aloqada bo'lamiz: Telegram orqali kunlik yangiliklar, haftalik video call va demo, Google Drive orqali fayllar almashish, Trello/Notion'da vazifalar tracking. Har qanday vaqtda savol berishingiz va fikr-mulohaza bildirishingiz mumkin."
      },
      {
        question: "Muddatni uzaytirish mumkinmi?",
        answer: "Albatta, lekin qo'shimcha funktsiya qo'shish yoki texnik talablar o'zgarishi holatida. Bunday holda yangi muddat va narx kelishiladi. Odatda mijozlarning 90% loyiha vaqtida yoki ertaroq tugatiladi."
      }
    ]
  },
  {
    title: "Narx va To'lov",
    icon: DollarSign,
    color: "accent",
    faqs: [
      {
        question: "Xizmatlar narxi qancha?",
        answer: "Landing page: 1,000,000-3,000,000 UZS, Korporativ sayt: 2,000,000-5,000,000 UZS, E-commerce: 5,000,000-15,000,000 UZS, Telegram bot: 1,500,000-4,000,000 UZS, AI chatbot: 3,000,000-8,000,000 UZS, Avtomatlashtirish: 1,000,000-6,000,000 UZS. Aniq narx loyiha murakkabligiga qarab belgilanadi."
      },
      {
        question: "To'lov qanday amalga oshiriladi?",
        answer: "Ikki bosqichda to'lov: 50% loyiha boshida (design tasdiqlangandan so'ng), 50% loyiha tugagandan so'ng. To'lov usullari: naqd, bank o'tkazmasi, Click, Payme, Uzcard. Kichik loyihalar uchun (1-2 mln UZS gacha) to'liq oldindan to'lov ham mumkin."
      },
      {
        question: "Qo'shimcha xarajatlar bormi?",
        answer: "Asosiy narxga kiritilgan: dizayn, development, testing, deploy, 1 oy qo'llab-quvvatlash. Qo'shimcha: domain (.uz - 200,000 UZS/yil), hosting (300,000-1,000,000 UZS/yil), premium plugin/service lar (agar kerak bo'lsa), logo dizayn (agar yo'q bo'lsa - 500,000 UZS)."
      },
      {
        question: "Chegirma yoki to'lov rejasi bormi?",
        answer: "Ha: Ko'p loyiha (2+) - 10% chegirma, Startup/NGO - 15% chegirma, To'lov rejasi - 3-6 oyga bo'lib to'lash (5% qo'shimcha foiz bilan), Referral bonus - yangi mijoz olib kelgan uchun 200,000 UZS bonus."
      }
    ]
  },
  {
    title: "Texnik Savollar",
    icon: Code,
    color: "primary",
    faqs: [
      {
        question: "Qanday texnologiyalardan foydalanasiz?",
        answer: "Frontend: Next.js, React, TypeScript, Tailwind CSS. Backend: Node.js, Python, PostgreSQL, MongoDB. Hosting: Vercel, Netlify, VPS. Bot development: Telegram Bot API, Node.js, webhooks. AI: OpenAI GPT, custom training. CRM: Zapier, Make, custom API integrations."
      },
      {
        question: "Sayt tezligi va SEO qanday ta'minlanadi?",
        answer: "Performance: Code splitting, image optimization, CDN, lazy loading. SEO: meta tags, structured data, sitemap, clean URLs, mobile optimization, Core Web Vitals optimization. Natija: 90+ PageSpeed Score, top 5 Google ranking (competitive keywords uchun)."
      },
      {
        question: "Xavfsizlik qanday ta'minlanadi?",
        answer: "SSL sertifikat, ma'lumotlar shifrlash, SQL injection himoyasi, XSS protection, CSRF tokens, regular security updates, backup avtomatlashtirish, two-factor authentication qo'llab-quvvatlash, GDPR/privacy compliance."
      },
      {
        question: "Mobil moslashuv qanday?",
        answer: "Mobile-first approach, responsive design, touch-friendly interface, fast loading on 3G/4G, PWA features (agar kerak bo'lsa), iOS/Android browser compatibility, performance optimization for mobile devices."
      }
    ]
  },
  {
    title: "Qo'llab-quvvatlash",
    icon: Headphones,
    color: "secondary",
    faqs: [
      {
        question: "Loyiha tugagandan so'ng qanday qo'llab-quvvatlash bor?",
        answer: "1 oy bepul qo'llab-quvvatlash: bug fixlar, kichik o'zgarishlar, texnik yordam. Keyinchalik oylik qo'llab-quvvatlash: 200,000-500,000 UZS/oy (loyiha hajmiga qarab). Qamrab oladi: yangilanishlar, backup, monitoring, texnik yordam."
      },
      {
        question: "Muammo yuzaga kelsa qanchalik tez hal qilinadi?",
        answer: "Kritik muammolar (sayt ishlamaydi): 2-4 soat, Muhim muammolar (funksiya buzilgan): 24 soat, Kichik muammolar: 48-72 soat. Odatda ko'p muammolar 1 soat ichida hal bo'ladi. Emergency support uchun alohida telefon raqam beriladi."
      },
      {
        question: "O'zim saytni boshqara olamanmi?",
        answer: "Albatta! CMS (Content Management System) o'rnataman: matn o'zgartirish, rasm qo'shish, yangilik qo'shish, mahsulot qo'shish. Bepul o'qitish sessiyasi va video qo'llanma beriladi. Admin panel oson va intuitiv qilinadi."
      },
      {
        question: "Hosting va domain haqida maslahat berasizmi?",
        answer: "Ha, to'liq yordam beraman: optimal hosting tanlash, domain ro'yxatdan o'tkazish (.uz, .com), DNS sozlash, SSL o'rnatish, email accounts yaratish. Hosting'ni o'zim sozlab beraman va monitoring qilaman."
      }
    ]
  },
  {
    title: "Kafolat va Xavfsizlik",
    icon: Shield,
    color: "accent",
    faqs: [
      {
        question: "Qanday kafolat berasiz?",
        answer: "6 oy bug-free kafolat: agar coded xatolik topilsa, bepul tuzataman. 1 yil design kafolat: fundamental dizayn o'zgarishlar kerak bo'lsa, 50% chegirma. Performance kafolat: PageSpeed 85+ score, yoki qayta optimizatsiya. Sayt ishlamay qolsa - 24 soat ichida tiklash."
      },
      {
        question: "Ma'lumotlarim xavfsizligini qanday ta'minlaysiz?",
        answer: "Strict NDA (Non-Disclosure Agreement), ma'lumotlar shifrlash va secure storage, 3rd party service larga ma'lumot uzatmaslik, loyiha tugagandan so'ng ma'lumotlarni o'chirish (agar kerak bo'lsa), backup va disaster recovery plan."
      },
      {
        question: "Agar natija kutganimdan farq qilsa?",
        answer: "Birinchi 2 hafta ichida to'liq rework kafolati, agar asosli sabab bo'lsa. Qoniqmasangiz - 50% pul qaytarish. Lekin 99% mijozlarim natijadan memnun, chunki boshidanoq aniq reja va expectations belgilaymiz."
      },
      {
        question: "Intellektual mulk huquqlari qanday?",
        answer: "Loyiha tugagandan va to'liq to'lov qilingandan so'ng barcha huquqlar sizga o'tadi: source code, design files, dokumentatsiya. Men faqat portfolio uchun foydalanish huquqini saqlab qolaman (agar ruxsat bersangiz)."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ - Tez-tez So'raladigan Savollar | Akram Farmonov</title>
        <meta 
          name="description" 
          content="Web development, Telegram bot, AI chatbot xizmatlar bo'yicha tez-tez so'raladigan savollar. Narx, muddat, texnik masalalar haqida to'liq ma'lumot." 
        />
        <meta name="keywords" content="FAQ, web development savollari, telegram bot narxi, hosting, qo'llab-quvvatlash" />
        <link rel="canonical" href="https://akramfarmonov.uz/faq" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqCategories.flatMap(category => 
              category.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            )
          })}
        </script>
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-20 lg:py-24 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Tez-tez So'raladigan <span className="text-accent">Savollar</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Web development, Telegram bot va AI chatbot xizmatlarim haqida 
                barcha savollaringizga javob topasiz.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-accent" />
                  <span>30+ savol-javob</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>Tezkor javoblar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <span>Bepul konsultatsiya</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 lg:py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {faqCategories.map((category, categoryIndex) => {
                  const IconComponent = category.icon;
                  
                  return (
                    <Card key={categoryIndex} className="card-gradient">
                      <CardHeader className="pb-6">
                        <CardTitle className="flex items-center space-x-3 text-2xl">
                          <div className={`w-10 h-10 rounded-lg bg-${category.color}/10 flex items-center justify-center`}>
                            <IconComponent className={`h-5 w-5 text-${category.color}`} />
                          </div>
                          <span>{category.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Accordion type="single" collapsible className="space-y-4">
                          {category.faqs.map((faq, faqIndex) => (
                            <AccordionItem 
                              key={faqIndex} 
                              value={`${categoryIndex}-${faqIndex}`}
                              className="border border-border/50 rounded-lg px-4"
                            >
                              <AccordionTrigger className="text-left hover:no-underline py-4">
                                <span className="font-medium">{faq.question}</span>
                              </AccordionTrigger>
                              <AccordionContent className="pb-4">
                                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                  {faq.answer}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 lg:p-12 rounded-2xl border border-border/50">
                <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  Yana Savollaringiz Bormi?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Yuqorida javobini topmagan savollaringiz bo'lsa, bepul konsultatsiya 
                  uchun bog'laning. Men barcha savollaringizga javob beraman.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/aloqa">
                    <Button className="btn-hero">
                      Bepul Konsultatsiya
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" asChild>
                    <a href="https://t.me/akramfarmonov" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Telegramda Yozish
                    </a>
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  Odatda 1 soat ichida javob beraman • Bepul konsultatsiya 20-30 daqiqa
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}