# دليل إصلاح ونشر الموقع على cPanel
# Ground Protection - cPanel Deployment Fix Guide

## ملخص المشاكل والحلول

| # | المشكلة | السبب الجذري | الحل |
|---|---------|-------------|------|
| 1 | `/api/health` يعرض صفحة HTML فارغة | .htaccess لا يوجه `/api/*` إلى Laravel | ملف htaccess جديد مع قواعد التوجيه الصحيحة |
| 2 | Laravel يعطي خطأ 500 | PHP < 8.3 (Filament 4.0 يتطلب 8.3+) | ترقية PHP إلى 8.3+ من cPanel |
| 3 | النماذج لا تعمل (تسجيل/تواصل) | الاتصال Frontend↔Backend مقطوع بسبب #1 و #2 | يُحل تلقائياً بعد إصلاح #1 و #2 |
| 4 | الإيميلات لا ترسل | `QUEUE_CONNECTION=database` بدون Queue Worker | تغيير إلى `sync` |
| 5 | لوحة الإدارة لا تعمل | ModelNameResource معطوب + موديلات مفقودة | حذف المعطوب + إنشاء 6 Resources صحيحة |
| 6 | CORS errors | `supports_credentials: true` مع `withCredentials: false` | تغيير إلى `false` |

---

## خطوات النشر (الترتيب مهم!)

### الخطوة 1: ترقية PHP إلى 8.3+ (أهم خطوة!)

> ⚠️ **بدون هذه الخطوة، لن يعمل أي شيء**

1. ادخل cPanel → **Select PHP Version** (أو MultiPHP Manager)
2. اختر النطاق `ground-eg.com`
3. غيّر إصدار PHP إلى **PHP 8.3** أو أعلى
4. تأكد من تفعيل الإضافات التالية:
   - `pdo_mysql`
   - `mbstring`
   - `openssl`
   - `tokenizer`
   - `xml`
   - `ctype`
   - `json`
   - `bcmath`
   - `fileinfo`
   - `gd` أو `imagick`
   - `curl`
   - `zip`

### الخطوة 2: رفع ملفات Backend

ارفع الملفات المعدلة/الجديدة إلى مجلد `public_html/api/` على الخادم:

```
الملفات المعدلة:
├── bootstrap/app.php                    (تسجيل Exception Handler)
├── composer.json                        (PHP ^8.3)
├── config/cors.php                      (supports_credentials: false)
├── public/.htaccess                     (Authorization + proxy headers)
├── public/index.php                     (تعليق توضيحي فقط)
├── .env                                 (SESSION_DRIVER=file, QUEUE_CONNECTION=sync)

الملفات الجديدة:
├── app/Models/NewsletterSubscriber.php
├── app/Models/Testimonial.php
├── app/Filament/Resources/ServiceResource.php
├── app/Filament/Resources/ServiceResource/Pages/CreateService.php
├── app/Filament/Resources/ServiceResource/Pages/EditService.php
├── app/Filament/Resources/ServiceResource/Pages/ListServices.php
├── app/Filament/Resources/ProjectResource.php
├── app/Filament/Resources/ProjectResource/Pages/CreateProject.php
├── app/Filament/Resources/ProjectResource/Pages/EditProject.php
├── app/Filament/Resources/ProjectResource/Pages/ListProjects.php
├── app/Filament/Resources/BlogPostResource.php
├── app/Filament/Resources/BlogPostResource/Pages/CreateBlogPost.php
├── app/Filament/Resources/BlogPostResource/Pages/EditBlogPost.php
├── app/Filament/Resources/BlogPostResource/Pages/ListBlogPosts.php
├── app/Filament/Resources/FaqResource.php
├── app/Filament/Resources/FaqResource/Pages/CreateFaq.php
├── app/Filament/Resources/FaqResource/Pages/EditFaq.php
├── app/Filament/Resources/FaqResource/Pages/ListFaqs.php
├── app/Filament/Resources/ContactMessageResource.php
├── app/Filament/Resources/ContactMessageResource/Pages/EditContactMessage.php
├── app/Filament/Resources/ContactMessageResource/Pages/ListContactMessages.php
├── app/Filament/Resources/QuoteRequestResource.php
├── app/Filament/Resources/QuoteRequestResource/Pages/EditQuoteRequest.php
├── app/Filament/Resources/QuoteRequestResource/Pages/ListQuoteRequests.php

الملفات المحذوفة (احذفها من الخادم):
├── app/Filament/Resources/ModelNames/    (المجلد بالكامل)
```

### الخطوة 3: تحديث .env على الخادم

تأكد من وجود هذه القيم في ملف `.env` على الخادم (`public_html/api/.env`):

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://ground-eg.com/api

# قاعدة البيانات
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=grounde2_ground_eg_db
DB_USERNAME=grounde2_ground_eg_user
DB_PASSWORD=your_password_here

# السبب الرئيسي لعدم إرسال الإيميلات - يجب أن يكون sync
QUEUE_CONNECTION=sync
SESSION_DRIVER=file

# إعدادات البريد
MAIL_MAILER=smtp
MAIL_HOST=mail.ground-eg.com
MAIL_PORT=587
MAIL_USERNAME=info@ground-eg.com
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=info@ground-eg.com
MAIL_FROM_NAME="Ground Protection"

# الفرونت إند
FRONTEND_URL=https://ground-eg.com

# Sanctum
SANCTUM_STATEFUL_DOMAINS=ground-eg.com
```

### الخطوة 4: نسخ .htaccess الرئيسي

انسخ محتوى الملف `cpanel/htaccess-main.conf` إلى `public_html/.htaccess`

**هذا هو الملف الأهم** - يوجه طلبات `/api/*` إلى Laravel و `/admin/*` إلى Filament

```bash
# على الخادم، أو ارفعه يدوياً:
cp cpanel/htaccess-main.conf public_html/.htaccess
```

### الخطوة 5: تشغيل أوامر Laravel على الخادم

ادخل عبر SSH أو Terminal في cPanel واذهب لمجلد API:

```bash
cd ~/public_html/api

# تحديث الحزم
composer install --optimize-autoloader --no-dev

# تحديث قاعدة البيانات
php artisan migrate --force

# تنظيف وتخزين الكاش
php artisan config:cache
php artisan route:cache
php artisan view:cache

# ربط مجلد التخزين (إذا لم يكن مربوط)
php artisan storage:link

# بذر البيانات (اختياري - إذا كانت قاعدة البيانات فارغة)
# php artisan db:seed --force
```

### الخطوة 6: إنشاء مستخدم Admin

```bash
cd ~/public_html/api
php artisan make:filament-user
```

أدخل الاسم والبريد وكلمة المرور.

---

## التحقق والاختبار

### اختبار 1: API Health
```bash
curl -s https://ground-eg.com/api/health
# المتوقع: JSON response مثل {"status": "ok"} أو Laravel response
```

### اختبار 2: قائمة الخدمات
```bash
curl -s https://ground-eg.com/api/services | head -c 200
# المتوقع: JSON array من الخدمات
```

### اختبار 3: إرسال رسالة تواصل
```bash
curl -s -X POST https://ground-eg.com/api/contact/message \
  -H "Content-Type: application/json" \
  -d '{"name":"أحمد","email":"test@test.com","phone":"01234567890","subject":"اختبار","message":"رسالة اختبار"}'
# المتوقع: JSON success response + إيميل يصل لـ info@ground-eg.com
```

### اختبار 4: لوحة الإدارة
```
افتح في المتصفح: https://ground-eg.com/admin
المتوقع: صفحة تسجيل دخول Filament
```

### اختبار 5: صفحة React
```
افتح في المتصفح: https://ground-eg.com
المتوقع: الموقع الرئيسي يعمل بشكل طبيعي
```

---

## هيكل الخادم النهائي

```
public_html/
├── .htaccess           ← من cpanel/htaccess-main.conf (يوجه API + Admin + SPA)
├── index.html          ← React SPA (Frontend)
├── assets/             ← React build assets
├── api/                ← Laravel Backend
│   ├── .env
│   ├── artisan
│   ├── composer.json
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   │   ├── .htaccess   ← Laravel's own .htaccess
│   │   └── index.php   ← Laravel entry point
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   └── vendor/
├── manifest.json
├── robots.txt
├── sitemap.xml
└── sw.js
```

---

## إذا واجهت مشاكل

### المشكلة: خطأ 500 بعد ترقية PHP
```bash
cd ~/public_html/api
composer install --no-dev
php artisan config:clear
php artisan cache:clear
```

### المشكلة: خطأ 419 CSRF
- تأكد أن `.env` يحتوي: `SESSION_DRIVER=file`
- تأكد أن API تستخدم Bearer Token وليس session auth

### المشكلة: الإيميلات لا ترسل
- تأكد أن `.env` يحتوي: `QUEUE_CONNECTION=sync`
- تأكد من صحة إعدادات SMTP
- اختبر:
```bash
php artisan tinker
Mail::raw('Test', function($m) { $m->to('your@email.com')->subject('Test'); });
```

### المشكلة: لوحة الإدارة تعطي 404
- تأكد أن `.htaccess` في `public_html/` يحتوي قاعدة `/admin/*`
- تأكد أن المسار `/admin` مسجل في `AdminPanelProvider.php`

### المشكلة: CORS errors في Console
- تأكد أن `FRONTEND_URL=https://ground-eg.com` في `.env`
- تأكد أن `supports_credentials => false` في `config/cors.php`
