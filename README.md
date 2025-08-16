# Akram Farmonov Portfolio

**Web Developer | Telegram Bot Developer | AI Chatbot Specialist**

Bu Akram Farmonov'ning professional portfolio sayti - O'zbekiston bozoriga mo'ljallangan web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish xizmatlari.

## 🚀 Saytda mavjud funksiyalar

### ✅ Hozirda mavjud bo'lgan sahifalar:
- **Bosh sahifa (/)** - Hero section, xizmatlar, portfolio va mijozlar sharhlari
- **Xizmatlar (/xizmatlar)** - To'liq xizmatlar ro'yxati va narxlar
- **Portfolio (/portfolio)** - Bajarilgan loyihalar va case studylar
- **Blog (/blog)** - Professional maqolalar va maslahatlar
- **Haqida (/haqida)** - Shaxsiy va professional ma'lumotlar
- **Aloqa (/aloqa)** - Bog'lanish formasi va kontakt ma'lumotlari
- **Case Studies (/case-studies)** - Batafsil loyiha tahlillari
- **FAQ (/faq)** - Ko'p beriladigan savollar

### ✅ Backend funksiyalari:
- **Blog tizimi** - Admin panel orqali maqola yaratish va boshqarish
- **Portfolio boshqaruvi** - Loyihalar va case studylarni qo'shish
- **Aloqa formlari** - Mijozlar so'rovlarini olish va boshqarish
- **Analytics** - Sayt trafigi va foydalanuvchi harakatlari
- **SEO optimizatsiya** - Meta teglar, structured data, sitemap
- **Xavfsizlik** - Rate limiting, CORS, CSP, authentication

### ✅ AI va avtomatlashtirish:
- **Google Gemini integratsiya** - Blog maqolalarini avtomatik yaratish
- **Telegram bot integratsiya** - Yangi so'rovlar haqida xabarnomalar
- **Email yuborish** - Nodemailer orqali avtomatik xabarlar
- **Scheduled tasklarr** - Cron job'lar orqali muntazam ishlar

## 🛠 Texnik arxitektura

### Frontend:
- **React 18** + TypeScript
- **Wouter** - Lightweight routing
- **Tailwind CSS** - Styling va responsive design
- **Radix UI** - Accessible UI komponentlar
- **React Query** - Server state management
- **Vite** - Build tool va dev server

### Backend:
- **Express.js** + TypeScript
- **Drizzle ORM** + PostgreSQL
- **Zod** - Runtime validation
- **JWT** - Authentication
- **Rate limiting** - API himoyasi

### Database:
- **PostgreSQL** (Neon Database)
- **Users** - Admin authentication
- **Posts** - Blog maqolalar
- **Projects** - Portfolio loyihalari
- **Services** - Xizmatlar ma'lumotlari
- **Leads** - Mijozlar so'rovlari
- **Analytics** - Statistika

### Third-party integratsiyalar:
- **Google Gemini AI** - Kontent yaratish
- **Telegram Bot API** - Xabarnomalar
- **Nodemailer** - Email yuborish
- **Sharp** - Rasm optimizatsiya

## 📋 Hozirgi holat

### ✅ Tayyor bo'lgan funksiyalar:
- [x] To'liq responsive design
- [x] SEO optimizatsiya
- [x] Blog tizimi (AI bilan)
- [x] Portfolio showcase
- [x] Aloqa formlari
- [x] Admin panel
- [x] Database integratsiya
- [x] Security middleware
- [x] Analytics tracking
- [x] Email notifications
- [x] Telegram bot alerts

### ⚠️ Sozlash kerak bo'lgan qismlar:
- [x] **Google Gemini API Key** - Blog generatsiya uchun ✅
- [x] **Telegram Bot Token** - Xabarnomalar uchun ✅  
- [x] **Admin Password** - Yangilandi: `Gisobot201415*` ✅
- [ ] **PostgreSQL** - Production database (Render.com da sozlash)
- [ ] **Domain** - akramfarmonov.uz domainiga ulash

## 🚀 Ishga tushirish

### Development:
```bash
npm run dev
```

### Production build:
```bash
npm run build
npm start
```

### Database setup:
```bash
npm run db:push
```

## 🌐 Render.com ga Deploy Qilish

### 1. Repository Tayyorlash

1. GitHub repository yarating
2. Kodni push qiling:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Render.com da Web Service Yaratish

1. [Render.com](https://render.com) ga kiring
2. "New +" -> "Web Service" ni tanlang
3. GitHub repository ni ulang
4. Quyidagi sozlamalarni kiriting:

**Basic Settings:**
- **Name**: `akram-farmonov-portfolio`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Instance Type**: `Free` yoki `Starter`

### 3. Environment Variables Sozlash

Render dashboard da "Environment" bo'limiga quyidagi o'zgaruvchilarni qo'shing:

```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# Admin Panel
ADMIN_PASSWORD=Gisobot201415*

# Google AI (Blog generation)
GOOGLE_API_KEY=your_google_gemini_api_key

# Telegram Notifications
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Security
NODE_ENV=production
```

### 4. PostgreSQL Database Sozlash

1. Render da "New +" -> "PostgreSQL" ni tanlang
2. Database yarating
3. CONNECTION_STRING ni nusxalang
4. `DATABASE_URL` environment variable ga qo'ying

### 5. API Keys Olish

#### Google Gemini AI Key:
1. [Google AI Studio](https://makersuite.google.com/app/apikey) ga boring
2. API key yarating
3. `GOOGLE_API_KEY` ga qo'ying

#### Telegram Bot:
1. [@BotFather](https://t.me/botfather) ga murojaat qiling
2. `/newbot` buyrug'i bilan bot yarating
3. Bot token ni `TELEGRAM_BOT_TOKEN` ga qo'ying
4. Chat ID ni olish uchun:
   - Botga xabar yuboring
   - `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates` ga boring
   - Chat ID ni `TELEGRAM_CHAT_ID` ga qo'ying

### 6. Deploy Process

1. Barcha environment variables to'g'ri kiritilganini tasdiqlang
2. "Deploy" tugmasini bosing
3. Build jarayonini kuzating
4. Deploy muvaffaqiyatli tugaganidan keyin saytni tekshiring

### 7. Domain Sozlash (Ixtiyoriy)

1. Render dashboard da "Settings" bo'limiga boring
2. "Custom Domains" qismiga o'z domeningizni qo'shing
3. DNS sozlamalarini o'zgartiring

## 🔐 Admin Panel

Admin panelga kirish uchun:
1. `/admin` sahifasiga boring
2. **Parol**: `Gisobot201415*`
3. Blog, mijozlar va analytics boshqarish

## 📊 Production URLs

- **Production**: `https://akram-farmonov-portfolio.onrender.com`
- **Admin Panel**: `https://akram-farmonov-portfolio.onrender.com/admin`

## 🔧 Environment Variables

`.env` faylida quyidagi o'zgaruvchilarni sozlash kerak:

```env
# Database
DATABASE_URL="postgresql://..."

# Google Gemini AI
GOOGLE_API_KEY="your_gemini_api_key"

# Telegram Bot
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="your_chat_id"

# Admin Panel
ADMIN_PASSWORD="Gisobot201415*"

# Security
NODE_ENV="production"
```

## 📞 Aloqa

- **Email**: akramfarmonov1@gmail.com
- **Telegram**: [@Akramjon1984](https://t.me/Akramjon1984)
- **Phone**: +998 99 644 84 44
- **Website**: https://akramfarmonov.uz

---

**Loyiha maqsadi**: O'zbek auditoriyasi uchun professional web development xizmatlari ko'rsatish va mijozlar bilan samarali aloqa o'rnatish.