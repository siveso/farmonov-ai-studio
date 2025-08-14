import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Akram Farmonov | Web sayt, Telegram bot, Chatbot va Avtomatlashtirish</title>
        <meta 
          name="description" 
          content="Web saytlar, Telegram botlar, chatbotlar va biznes avtomatlashtirish. O'zbek auditoriyasi uchun tezkor va SEO-optimallashgan yechimlar." 
        />
        <meta name="keywords" content="web sayt, telegram bot, chatbot, avtomatlashtirish, SEO, O'zbekiston, Tashkent" />
        <link rel="canonical" href="https://akramfarmonov.uz/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Akram Farmonov | Web sayt, Telegram bot, Chatbot va Avtomatlashtirish" />
        <meta property="og:description" content="Web saytlar, Telegram botlar, chatbotlar va biznes avtomatlashtirish. O'zbek auditoriyasi uchun tezkor va SEO-optimallashgan yechimlar." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://akramfarmonov.uz/" />
        <meta property="og:locale" content="uz_UZ" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Akram Farmonov | Web sayt, Telegram bot, Chatbot va Avtomatlashtirish" />
        <meta name="twitter:description" content="Web saytlar, Telegram botlar, chatbotlar va biznes avtomatlashtirish. O'zbek auditoriyasi uchun tezkor va SEO-optimallashgan yechimlar." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Akram Farmonov",
            "jobTitle": "Web Developer, Telegram Bot Developer",
            "description": "Web saytlar, Telegram botlar, chatbotlar va biznes avtomatlashtirish bo'yicha mutaxassis",
            "url": "https://akramfarmonov.uz",
            "email": "akram@farmonov.uz",
            "telephone": "+998901234567",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "UZ",
              "addressRegion": "Tashkent"
            },
            "sameAs": [
              "https://t.me/akramfarmonov",
              "https://linkedin.com/in/akramfarmonov",
              "https://github.com/akramfarmonov"
            ],
            "knowsAbout": [
              "Web Development",
              "Telegram Bot Development",
              "AI Chatbots",
              "Business Automation",
              "SEO Optimization"
            ],
            "offers": [
              {
                "@type": "Service",
                "name": "Web sayt yaratish",
                "description": "Tezkor, SEO-optimallashgan, mobilga mos web saytlar"
              },
              {
                "@type": "Service", 
                "name": "Telegram bot yaratish",
                "description": "Savdo, so'rovlar, to'lov, CRM bog'lanish uchun botlar"
              },
              {
                "@type": "Service",
                "name": "AI Chatbot yaratish", 
                "description": "24/7 mijozlar bilan ishlash uchun sun'iy intellekt chatbotlari"
              },
              {
                "@type": "Service",
                "name": "Biznes avtomatlashtirish",
                "description": "Workflow, CRM integratsiya va biznes jarayonlarini avtomatlashtirish"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <Layout>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
};

export default Index;