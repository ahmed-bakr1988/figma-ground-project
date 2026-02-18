# 🚀 دليل النشر النهائي — Ground Protection
## الإصدار: v1.0.0 — جاهز للرفع على الاستضافة

---

## ✅ ما تم إنجازه محلياً

| المهمة | الحالة |
|--------|--------|
| `npm run build` — بناء Frontend | ✅ مكتمل |
| `php artisan optimize` — تحسين Backend | ✅ مكتمل |
| تأمين النماذج (XSS + Rate Limiting) | ✅ مكتمل |
| Service Worker v3 | ✅ مكتمل |
| `git push origin main` | ✅ مرفوع |

---

## 🌐 بنية الاستضافة المتوقعة (cPanel)

```
الدومين: ground-eg.com
├─ public_html/           ← رفع محتويات dist/ هنا (Frontend)
└─ ground-eg/             ← مجلد آخر للـ Backend (خارج public_html)
   ├─ app/
   ├─ bootstrap/
   ├─ config/
   ├─ ...
   └─ public/             ← رابط رمزي أو نسخ محتوياته إلى public_html/api
```

> **ملاحظة:** إذا كان Backend على subdomain مثل `api.ground-eg.com`، فستكون البنية مختلفة قليلاً — راجع القسم المناسب أدناه.

---

## 📦 الخطوة 1 — رفع Frontend

### الملفات المطلوبة من مجلد `dist/`

```
dist/
├─ index.html        ✅
├─ .htaccess         ✅ (مهم جداً — SPA routing + Cache)
├─ robots.txt        ✅
├─ sitemap.xml       ✅
├─ sw.js             ✅ (Service Worker)
├─ manifest.json     ✅
└─ assets/           ✅ (كل ملفات JS + CSS + الصور)
```

### كيفية الرفع

1. **اضغط مجلد `dist/`** كله إلى `dist.zip`
2. افتح **cPanel → File Manager → public_html**
3. **حذف** الملفات القديمة (إن وجدت) — ابقي فقط ما هو خاص بالاستضافة
4. **ارفع** `dist.zip` ثم استخرجه (Extract)
5. **انقل** محتويات `dist/` إلى `public_html/` مباشرة (ليس داخل مجلد فرعي)
6. **تأكد** أن `.htaccess` موجود في `public_html/`

### اختبار Frontend

- `https://ground-eg.com` — الصفحة الرئيسية
- `https://ground-eg.com/contact` — صفحة التواصل (يجب ألا تعطي 404)
- `https://ground-eg.com/services` — صفحة الخدمات
- `https://ground-eg.com/xyz-fake` — يجب أن يظهر صفحة 404 المخصصة

---

## ⚙️ الخطوة 2 — رفع Backend (Laravel)

### الخيار أ: Backend في مجلد داخل public_html

إذا كان API على `https://ground-eg.com/api/`:

```
public_html/
├─ index.html         ← Frontend
├─ .htaccess          ← Frontend htaccess
└─ api/               ← نفس محتويات backend/public/
   ├─ index.php
   └─ .htaccess
```

ارفع **محتويات `backend/`** خارج `public_html` (مثلاً `~/ground_backend/`)، ثم ارفع **محتويات `backend/public/`** داخل `public_html/api/`.

### الخيار ب: Backend على subdomain (الأفضل)

إذا كان API على `https://api.ground-eg.com`:

1. من cPanel → **Subdomains** → أنشئ `api.ground-eg.com` يشير إلى `~/api/public_html/`
2. ارفع **محتويات `backend/`** إلى `~/api/` (خارج public)
3. ارفع **محتويات `backend/public/`** إلى `~/api/public_html/`

### ملفات يجب رفعها (Backend)

```
backend/
├─ app/           ✅
├─ bootstrap/     ✅
├─ config/        ✅
├─ database/      ✅
├─ resources/     ✅
├─ routes/        ✅
├─ storage/       ✅ (يجب أن يكون قابل للكتابة 775)
├─ composer.json  ✅
├─ artisan        ✅
└─ public/        → ارفع هذا منفصلاً إلى document root للـ API
```

> **لا ترفع:** `vendor/` — سيتم تثبيته على السيرفر

---

## 🔑 الخطوة 3 — إعداد ملف `.env` على السيرفر

```bash
# على السيرفر (SSH أو Terminal في cPanel)
cd ~/backend-folder/
cp .env.production.example .env
nano .env   # أو افتحه من File Manager وعدّل القيم التالية:
```

### القيم الإجبارية للتعديل

```dotenv
APP_KEY=                    # سيتم توليده تلقائياً
APP_URL=https://ground-eg.com

DB_DATABASE=grounde2_ground_eg_db    # من cPanel → MySQL Databases
DB_USERNAME=grounde2_ground_eg_user
DB_PASSWORD=YOUR_STRONG_PASSWORD

MAIL_PASSWORD=YOUR_SMTP_PASSWORD     # من cPanel → Email Accounts

FRONTEND_URL=https://ground-eg.com  # مهم لـ CORS
```

---

## 💻 الخطوة 4 — أوامر السيرفر (SSH أو Terminal cPanel)

```bash
# 1. الانتقال إلى مجلد Backend
cd ~/your-backend-folder/

# 2. تثبيت الاعتمادات (بدون dev packages)
composer install --no-dev --optimize-autoloader

# 3. توليد مفتاح التشفير
php artisan key:generate

# 4. تشغيل migrations
php artisan migrate --force

# 5. تشغيل Seeders (إذا لزم)
# php artisan db:seed --force

# 6. تحسين الأداء
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# 7. رابط التخزين
php artisan storage:link

# 8. صلاحيات المجلدات
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

---

## 🔧 الخطوة 5 — اختبار API

بعد الرفع، اختبر هذه الروابط:

```bash
# Health check
curl https://ground-eg.com/api/services

# Test contact form
curl -X POST https://ground-eg.com/api/contact/message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"This is a test message from production"}'
```

المتوقع: `{"success": true, "message": "..."}`

---

## ❗ مشاكل شائعة وحلولها

| المشكلة | السبب | الحل |
|---------|-------|------|
| **500 Internal Server Error** | `APP_KEY` فارغ أو خطأ في `.env` | `php artisan key:generate` |
| **404 على صفحات React** | `.htaccess` غير موجود أو mod_rewrite معطل | تأكد من رفع `.htaccess` وتفعيل mod_rewrite |
| **401 Unauthorized على API** | Bearer Token لا يصل للـ PHP | تأكد من وجود `RewriteCond %{HTTP:Authorization}` في backend `.htaccess` |
| **CORS Error** | `FRONTEND_URL` في `.env` غير صحيح | غيّر `FRONTEND_URL=https://ground-eg.com` بالضبط |
| **422 preferred_language** | البيانات المرسلة خاطئة | موجود في الكود — `substring(0,2)` يصحح تلقائياً |
| **خطأ في الصور** | مسارات الصور relative بعد البناء | مسارات Vite الصحيحة تبدأ بـ `/assets/` |
| **Service Worker قديم** | المتصفح cache قديم | سجّل خروجاً وادخل أو افتح Incognito |

---

## 📋 قائمة التحقق النهائية قبل الإطلاق

### Frontend
- [ ] `npm run build` يعمل بنجاح بدون errors
- [ ] `dist/.htaccess` موجود
- [ ] `dist/robots.txt` موجود
- [ ] `dist/sitemap.xml` موجود
- [ ] `.env.production` يحتوي على URL الصحيح
- [ ] اختبار التنقل: `/` → `/contact` → `/services` → `/en/contact`

### Backend
- [ ] `composer install --no-dev` مكتمل
- [ ] `.env` مضبوط بالقيم الصحيحة
- [ ] `php artisan key:generate` تم
- [ ] `php artisan migrate --force` تم بنجاح
- [ ] `storage/` صلاحيات 775
- [ ] `php artisan optimize` مكتمل
- [ ] API يرد على `GET /api/services`
- [ ] Contact form يحفظ في DB

### الأمان
- [ ] `APP_DEBUG=false` في `.env`
- [ ] `APP_ENV=production` في `.env`
- [ ] HTTPS مفعّل وHTTP يعيد توجيه
- [ ] ملف `.env` غير قابل للوصول من الخارج

---

## 📁 ملخص الملفات الجاهزة

| الملف | الوصف | الحالة |
|-------|-------|--------|
| `dist/` | Frontend مبني للإنتاج | ✅ جاهز |
| `dist/.htaccess` | Apache config + SPA routing | ✅ جاهز |
| `.env.production` | Frontend env vars | ✅ جاهز |
| `backend/.env.production.example` | Backend env template | ✅ جاهز |
| `backend/public/.htaccess` | Laravel + Bearer Token fix | ✅ جاهز |
| `backend/bootstrap/cache/` | Laravel optimized cache | ✅ جاهز |

---
*آخر تحديث: تم بناء المشروع وتحسينه بالكامل ورفعه على GitHub — الـ commit الأخير: `add2f34`*
