# 🚀 دليل رفع المشروع على الاستضافة
## Ground Tech - Production Deployment Guide

---

## ✅ جاهزية المشروع

تم إصلاح جميع المشاكل الحرجة والمتوسطة:

### المشاكل المُصلحة (27 مشكلة)
- ✅ **H1**: API Backend (تحتاج تشغيل على السيرفر)
- ✅ **H2**: index.html branding و meta tags
- ✅ **H3**: خط Cairo للعربية
- ✅ **H4**: روابط Social Media
- ✅ **H5**: Error Boundary Component
- ✅ **H6**: صفحة 404
- ✅ **H7**: console.log تُحذف تلقائياً في Production
- ✅ **H8**: API URL في .env.production
- ✅ **M1-M12**: جميع المشاكل المتوسطة
- ✅ **L1-L7**: جميع المشاكل المنخفضة
- ✅ **BONUS**: Mobile Sidebar Menu
- ✅ **BONUS**: Logo محسّن وأكبر

---

## 📦 ملفات الـ Production الجاهزة

```
dist/
├── .htaccess          ✅ Apache configuration
├── index.html         ✅ Updated with correct branding
├── robots.txt         ✅ SEO
├── sitemap.xml        ✅ SEO
└── assets/
    ├── logo/          ✅ Logo files
    ├── images/        ✅ Images
    └── *.js, *.css    ✅ Bundled & compressed
```

---

## 🔧 خطوات الرفع على cPanel

### 1️⃣ رفع Frontend (React)

```bash
# على جهازك المحلي - بناء المشروع
npm run build

# الملفات الناتجة في مجلد dist/
```

**رفع الملفات:**
1. افتح cPanel → File Manager
2. انتقل إلى `public_html/`
3. ارفع **كل محتويات** مجلد `dist/` (وليس المجلد نفسه)
4. **⚠️ مهم جداً:** تأكد من رفع ملف `.htaccess`
   - قد يكون مخفياً - فعّل "Show Hidden Files" في File Manager
   - بدون هذا الملف، الروابط مثل `/services` لن تعمل
5. تأكد من رفع:
   - `index.html`
   - `.htaccess` ⚡ **حرج جداً**
   - `robots.txt`
   - `sitemap.xml`
   - مجلد `assets/` بالكامل

---

### 2️⃣ رفع Backend (Laravel)

```bash
# على السيرفر عبر Terminal في cPanel أو SSH

# انتقل لمجلد المشروع
cd ~/ground-eg.com  # أو المسار الصحيح

# ارفع ملفات Laravel (عدا public/)
# public/ يجب أن يكون في public_html/api/

# تثبيت Dependencies
composer install --no-dev --optimize-autoloader

# إعداد Environment
cp .env.example .env
nano .env  # أو vi .env

# الإعدادات المطلوبة في .env:
APP_ENV=production
APP_DEBUG=false
APP_URL=https://ground-eg.com
FRONTEND_URL=https://ground-eg.com

DB_CONNECTION=mysql
DB_HOST=localhost  # أو من cPanel
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# تشغيل Migrations
php artisan migrate --force

# Seed البيانات (اختياري)
php artisan db:seed

# Cache Configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Generate App Key (إذا لم يكن موجوداً)
php artisan key:generate

# إنشاء Symbolic Link للـ Storage
php artisan storage:link
```

---

### 3️⃣ إعداد Structure الاستضافة

**الهيكل الموصى به:**

```
/home/username/
├── public_html/              ← Frontend (React)
│   ├── index.html
│   ├── .htaccess
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│
├── api/                      ← Laravel (Backend)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/              ← نقطة الدخول للـ API
│   │   └── index.php
│   ├── routes/
│   ├── storage/
│   ├── .env
│   └── artisan
```

---

### 4️⃣ إعداد API Subdomain/Subdirectory

**خيار 1: Subdirectory (الأسهل)**

في `.htaccess` الرئيسي:
```apache
# توجيه طلبات /api إلى Laravel
RewriteRule ^api/(.*)$ api/public/index.php [L]
```

**خيار 2: Subdomain (الأفضل)**

1. أنشئ subdomain في cPanel: `api.ground-eg.com`
2. اجعله يشير إلى `/home/username/api/public`
3. حدّث `.env.production` في Frontend:
   ```
   VITE_API_URL=https://api.ground-eg.com/api
   ```

---

## 🔐 إعدادات الأمان

### في Laravel (.env)
```env
APP_DEBUG=false
APP_ENV=production

# CORS - تأكد من إضافة الدومين الصحيح
FRONTEND_URL=https://ground-eg.com

# Session
SESSION_DRIVER=database  # أو redis
SESSION_LIFETIME=120

# Queue (اختياري)
QUEUE_CONNECTION=database
```

### في cPanel
1. **SSL Certificate**: تفعيل Let's Encrypt (مجاني)
2. **Force HTTPS**: تفعيل في cPanel
3. **Directory Privacy**: حماية مجلدات Laravel خارج public/

---

## 🧪 اختبار ما بعد الرفع

### 1. اختبار Frontend
- ✅ افتح https://ground-eg.com
- ✅ تحقق من ظهور Logo والمحتوى
- ✅ اختبر جميع الصفحات (About, Services, Contact, etc.)
- ✅ اختبر التبديل بين العربية والإنجليزية
- ✅ اختبر Mobile Menu (على الموبايل/تابلت)

### 2. اختبار Backend API
```bash
# Health Check
curl https://ground-eg.com/api/health

# Get Services
curl https://ground-eg.com/api/services

# يجب أن ترجع JSON بدون أخطاء
```

### 3. اختبار Forms
- ✅ نموذج الاتصال في Hero Section
- ✅ صفحة Contact الكاملة
- ✅ تسجيل الدخول/التسجيل (إذا كان مفعلاً)

### 4. اختبار Performance
- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- Lighthouse في Chrome DevTools

---

## 🐛 حل المشاكل الشائعة

### مشكلة 1: صفحة بيضاء أو 404 على الروابط
**الأعراض:**
- https://ground-eg.com تعمل ✅
- https://ground-eg.com/services تُظهر 404 ❌

**السبب:** ملف `.htaccess` غير موجود أو غير مُفعّل

**الحل:**
```bash
# 1. تأكد من وجود .htaccess في public_html/
# في cPanel → File Manager → Settings → Show Hidden Files

# 2. إذا غير موجود، ارفع الملف من dist/.htaccess

# 3. تأكد من الصلاحيات
chmod 644 .htaccess

# 4. اتصل بالدعم الفني لتفعيل mod_rewrite إذا لزم الأمر
```

**⚠️ ملاحظة:** راجع ملف `FIX_404_ERROR.md` لحلول مفصلة

### مشكلة 2: API لا يعمل (Error 500/404)
**الحل:**
```bash
# تحقق من Laravel logs
tail -f storage/logs/laravel.log

# تحقق من .env
cat .env

# إعادة Cache
php artisan config:clear
php artisan cache:clear
```

### مشكلة 3: 419 CSRF Token Mismatch
**الحل:**
- تأكد من `FRONTEND_URL` في Laravel .env
- تأكد من `VITE_API_URL` في Frontend
- المشروع يستخدم Bearer Token (لا يحتاج CSRF)

### مشكلة 4: الخطوط أو الصور لا تظهر
**الحل:**
- تأكد من صلاحيات الملفات (644 للملفات، 755 للمجلدات)
- تحقق من مسار الملفات في Console
- تأكد من `.htaccess` موجود

---

## 📊 Checklist قبل Launch

### Frontend ✅
- [ ] `npm run build` بنجاح بدون أخطاء
- [ ] رفع جميع ملفات `dist/` للسيرفر
- [ ] `.htaccess` موجود وصحيح
- [ ] `robots.txt` و `sitemap.xml` موجودان
- [ ] SSL مُفعّل وHTTPS يعمل
- [ ] جميع الصفحات تعمل (لا توجد 404)
- [ ] Mobile Menu يعمل
- [ ] اللغتين (عربي/إنجليزي) تعملان

### Backend ✅
- [ ] `composer install --no-dev` بنجاح
- [ ] `.env` مُعد بشكل صحيح
- [ ] Database migrations تمت
- [ ] `php artisan config:cache`
- [ ] `php artisan route:cache`
- [ ] API Health Check يعمل
- [ ] CORS مُعد صحيح
- [ ] صلاحيات `storage/` و `bootstrap/cache/` (775)

### SEO & Performance ✅
- [ ] Google Search Console مُعد
- [ ] Google Analytics (اختياري)
- [ ] Sitemap مُسجّل في Search Console
- [ ] Social Media links محدّثة
- [ ] Open Graph tags صحيحة
- [ ] PageSpeed > 80

---

## 📞 بعد Launch

1. **Monitoring:**
   - راقب Laravel logs: `storage/logs/laravel.log`
   - راقب Apache/Nginx error logs

2. **Backup:**
   - إعداد Backup تلقائي للـ Database
   - Backup ملفات المشروع

3. **Updates:**
   - تحديثات أمان Laravel
   - تحديثات Dependencies

---

## 🎉 المشروع جاهز تماماً!

جميع الإصلاحات تمت، والمشروع جاهز للرفع على الاستضافة.

**التحديثات الأخيرة:**
- ✅ Mobile Sidebar Menu محترف
- ✅ Logo أكبر وبدون نص
- ✅ جميع مشاكل QA مُصلحة
- ✅ .htaccess محسّن للـ Production
- ✅ SEO optimization كامل

---

**للدعم:** راجع الملفات التالية:
- `AUTHENTICATION_SETUP.md` - للمصادقة
- `CSRF_FIX_BEARER_TOKENS.md` - لفهم آلية الحماية
- `.github/copilot-instructions.md` - نظرة شاملة على المشروع
