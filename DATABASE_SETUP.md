# PostgreSQL Database Setup Guide

## O'rnatilgan narsalar ✅

### 1. Database Schema (shared/schema.ts)
- **Users** - Admin autentifikatsiya uchun
- **Posts** - Blog maqolalari uchun
- **Projects** - Portfolio loyihalari uchun  
- **Services** - Xizmatlar uchun
- **Leads** - Mijozlar so'rovlari uchun
- **Analytics** - Sayt statistikasi uchun
- **Blog_scheduler** - Maqola rejalashtirish uchun

### 2. Database Connection (server/db.ts)
- Neon PostgreSQL cloud provider uchun sozlangan
- WebSocket support bilan
- Environment variable validation
- Fallback mechanism (memory storage)

### 3. Storage Layer (server/storage.ts)
- **IStorage interface** - barcha ma'lumotlar operatsiyalari uchun
- **MemStorage** - development uchun (hozirda faol)
- **DatabaseStorage** - production uchun (tayyor)
- Avtomatik fallback: DATABASE_URL bo'lsa database, yo'q bo'lsa memory

### 4. Migrations (migrations/0000_grey_inertia.sql)
- Barcha table'lar yaratilgan
- Foreign key constraint'lar qo'shilgan
- Index'lar va unique constraint'lar sozlangan

## Production uchun Database yoqish 🚀

### Variantlar:

#### 1. Replit Database (Tavsiya etiladi)
```bash
# Replit UI orqali PostgreSQL provision qiling
# Avtomatik DATABASE_URL environment variable qo'shiladi
```

#### 2. Neon Database (Tashqi)
```bash
# 1. https://neon.tech da hisobingizni oching
# 2. Yangi database yarating
# 3. Connection string ni oling
# 4. Replit Secrets ga DATABASE_URL qo'shing
```

#### 3. Manual Setup (Lokalni test uchun)
```bash
# Environment variable qo'shing:
export DATABASE_URL="postgresql://username:password@host:port/database"

# Migration ishga tushiring:
npm run db:push
```

## Migration Commands

```bash
# Schema o'zgarishlarni generate qilish
npx drizzle-kit generate

# Database ga push qilish
npm run db:push

# Database holatini ko'rish
npx drizzle-kit studio
```

## Test qilish

```bash
# Hozirgi holat (Memory storage)
curl http://localhost:5000/api/posts

# Database yoqilgandan keyin storage avtomatik o'zgaradi
# Restart kerak emas - conditional loading ishlaydi
```

## Production Checklist

- [ ] DATABASE_URL environment variable o'rnatilgan
- [ ] Migration muvaffaqiyatli bajarilgan
- [ ] Sample data import qilingan
- [ ] Backup strategiya sozlangan
- [ ] Connection pooling optimal
- [ ] SSL/TLS yoqilgan

## Faydalar

✅ **Type Safety** - Drizzle ORM bilan to'liq TypeScript qo'llab-quvvatlash  
✅ **Auto Migration** - Schema o'zgarishlari avtomatik generate  
✅ **Fallback Ready** - DATABASE_URL yo'q bo'lsa memory storage  
✅ **Production Ready** - Connection pooling va error handling  
✅ **Developer Friendly** - Drizzle Studio bilan database ko'rish  

## Keyingi Qadamlar

1. **Database Provision** - Replit yoki Neon orqali
2. **Sample Data** - Admin va ba'zi maqolalar qo'shish
3. **Backup Setup** - Har kunlik backup strategiya
4. **Monitoring** - Database performance kuzatish
5. **Deploy** - Production muhitga o'tkazish