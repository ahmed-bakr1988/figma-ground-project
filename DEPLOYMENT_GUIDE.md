# 🚀 دليل نشر Ground Protection على الاستضافة

## 📋 المعلومات الأساسية

- **الدومين:** https://ground-eg.com
- **نوع الاستضافة:** cPanel (مفترض)
- **SSL:** ✅ تلقائي من الاستضافة

---

## 🎯 خطوات النشر الكاملة

### المرحلة 1️⃣: تجهيز Frontend للـ Production

#### 1. إنشاء ملف البيئة للـ Production

```bash
# في المجلد الرئيسي للمشروع
cp .env.production.example .env.production
```

#### 2. تعديل `.env.production`:

```env
VITE_API_URL=https://ground-eg.com/api
```

#### 3. Build Frontend للـ Production

```bash
npm run build
```

✅ سيتم إنشاء مجلد `dist/` يحتوي على الملفات الجاهزة للرفع

---

### المرحلة 2️⃣: تجهيز Backend للـ Production

#### 1. إنشاء ملف البيئة

```bash
cd backend
cp .env.production.example .env
```

#### 2. تعديل `backend/.env` بمعلومات الاستضافة:

```env
APP_URL=https://ground-eg.com
FRONTEND_URL=https://ground-eg.com
APP_ENV=production
APP_DEBUG=false

# معلومات قاعدة البيانات من cPanel
DB_DATABASE=ground_eg_db
DB_USERNAME=ground_eg_user
DB_PASSWORD=كلمة_مرور_قوية

# إعدادات البريد من الاستضافة
MAIL_HOST=mail.ground-eg.com
MAIL_USERNAME=noreply@ground-eg.com
MAIL_PASSWORD=كلمة_مرور_البريد
```

#### 3. تثبيت Dependencies (على السيرفر عبر SSH):

```bash
cd /home/username/ground-eg.com/backend
composer install --optimize-autoloader --no-dev
```

#### 4. Generate Application Key:

```bash
php artisan key:generate
```

#### 5. تشغيل Migrations:

```bash
php artisan migrate --force
```

#### 6. Seed البيانات الأولية (اختياري):

```bash
php artisan db:seed --force
```

#### 7. تحسين الأداء:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

### المرحلة 3️⃣: رفع الملفات على الاستضافة

#### السيناريو أ: Frontend و Backend معاً (Single Domain)

```
📁 public_html/ (أو www/)
├── 📁 index.html                  ← من dist/
├── 📁 assets/                     ← من dist/assets/
├── 📁 api/                        ← Backend Laravel
│   ├── public/
│   │   └── index.php              ← نقطة الدخول للـ API
│   ├── app/
│   ├── config/
│   ├── routes/
│   ├── .env                       ← ⚠️ مخفي، احتفظ بنسخة احتياطية
│   └── vendor/
```

#### الخطوات:

1. **رفع Frontend (dist/*):**
   ```
   - رفع محتويات مجلد dist/ إلى public_html/
   - index.html يكون في الجذر
   ```

2. **رفع Backend:**
   ```
   - إنشاء مجلد api/ داخل public_html/
   - رفع جميع ملفات backend/ إلى api/
   ```

3. **إعداد .htaccess الرئيسي** في `public_html/.htaccess`:
   
   ```apache
   # Ground Protection - Main .htaccess
   
   <IfModule mod_rewrite.c>
       RewriteEngine On
       
       # Redirect HTTP to HTTPS
       RewriteCond %{HTTPS} off
       RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
       
       # API Routes - توجيه /api إلى Laravel backend
       RewriteRule ^api/(.*)$ api/public/index.php [L]
       
       # Frontend Routes - SPA Router
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule ^(.*)$ /index.html [L]
   </IfModule>
   
   # Security Headers
   <IfModule mod_headers.c>
       Header set X-Content-Type-Options "nosniff"
       Header set X-Frame-Options "DENY"
       Header set X-XSS-Protection "1; mode=block"
   </IfModule>
   ```

4. **إعداد .htaccess للـ API** في `public_html/api/public/.htaccess`:
   
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       
       # Handle Authorization Header
       RewriteCond %{HTTP:Authorization} .
       RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
       
       # Redirect to index.php
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteRule ^ index.php [L]
   </IfModule>
   ```

---

### المرحلة 4️⃣: إعدادات cPanel

#### 1. إنشاء قاعدة البيانات:

```
cPanel → MySQL Databases
→ Create Database: ground_eg_db
→ Create User: ground_eg_user + كلمة مرور قوية
→ Add User to Database (جميع الصلاحيات)
```

#### 2. SSL Certificate:

```
cPanel → SSL/TLS Status
→ تفعيل AutoSSL لـ ground-eg.com
```

#### 3. PHP Version:

```
cPanel → Select PHP Version
→ اختر PHP 8.2 أو أعلى
→ Enable Extensions:
   ✅ mbstring
   ✅ openssl
   ✅ pdo
   ✅ tokenizer
   ✅ xml
   ✅ curl
   ✅ zip
```

#### 4. إعداد Cron Jobs (اختياري):

```
cPanel → Cron Jobs
→ Add New:
*/5 * * * * cd /home/username/public_html/api && php artisan schedule:run >> /dev/null 2>&1
```

---

### المرحلة 5️⃣: الاختبار بعد النشر

#### 1. Test API Health:

```bash
curl https://ground-eg.com/api/health
```

**Expected:**
```json
{
  "success": true,
  "message": "API is running"
}
```

#### 2. Test Login:

```bash
curl -X POST https://ground-eg.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password"}'
```

#### 3. Test Frontend:

- افتح https://ground-eg.com
- جرب التنقل بين الصفحات
- جرب تسجيل الدخول
- تأكد من تحميل الـ Assets (images, CSS, JS)

#### 4. Test HTTPS:

```bash
curl -I https://ground-eg.com
```

يجب أن ترى:
```
HTTP/2 200
strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: DENY
```

---

## 🔧 إصلاح المشاكل الشائعة

### ❌ مشكلة: "500 Internal Server Error"

**الحل:**
```bash
# تحقق من log files
tail -f storage/logs/laravel.log

# تأكد من الصلاحيات
chmod -R 755 storage bootstrap/cache
```

### ❌ مشكلة: "CORS Error" من Frontend

**الحل:**
```php
// في backend/.env تأكد من:
FRONTEND_URL=https://ground-eg.com

// لا توجد فواصل زائدة
```

### ❌ مشكلة: "Token Mismatch" رغم التعديلات

**الحل:**
```bash
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

### ❌ مشكلة: Routes لا تعمل (404)

**الحل:**
```apache
# تأكد من وجود mod_rewrite في .htaccess
<IfModule mod_rewrite.c>
  Options +FollowSymLinks
  RewriteEngine On
</IfModule>
```

---

## 📊 Checklist النشر النهائي

### قبل النشر:
- [ ] تم عمل `npm run build` للـ Frontend
- [ ] تم تعديل `.env` للـ Backend بمعلومات الاستضافة
- [ ] تم اختبار الـ API محلياً
- [ ] تم عمل نسخة احتياطية من قاعدة البيانات

### أثناء النشر:
- [ ] رفع ملفات Frontend إلى `public_html/`
- [ ] رفع ملفات Backend إلى `public_html/api/`
- [ ] إعداد `.htaccess` الرئيسي
- [ ] إعداد قاعدة البيانات في cPanel
- [ ] تشغيل `php artisan migrate --force`

### بعد النشر:
- [ ] اختبار https://ground-eg.com
- [ ] اختبار https://ground-eg.com/api/health
- [ ] اختبار تسجيل الدخول
- [ ] اختبار HTTPS و SSL
- [ ] مراقبة logs لمدة ساعة

---

## 🔒 أمان إضافي بعد النشر

```bash
# 1. إخفاء معلومات PHP
# في .htaccess الرئيسي:
<IfModule mod_headers.c>
    Header unset X-Powered-By
</IfModule>

# 2. حماية ملفات .env
<Files ".env">
    Order allow,deny
    Deny from all
</Files>

# 3. تعطيل directory listing
Options -Indexes

# 4. حماية من file injection
<Files "*.php">
    Order Allow,Deny
    Deny from all
</Files>
<FilesMatch "^(index\.php)$">
    Order Allow,Deny
    Allow from all
</FilesMatch>
```

---

## 📞 دعم فني سريع

### Logs المهمة:

```bash
# Laravel logs
tail -f backend/storage/logs/laravel.log

# Apache error logs (من cPanel)
public_html/error_log
```

### أوامر مفيدة للـ Debug:

```bash
# إعادة بناء Cache
php artisan optimize:clear

# التحقق من Routes
php artisan route:list

# التحقق من Config
php artisan config:show

# إعادة إنشاء autoload
composer dump-autoload
```

---

## ✅ النشر ناجح!

بعد اتباع جميع الخطوات، يجب أن يكون موقعك:

- ✅ يعمل على https://ground-eg.com
- ✅ API تستجيب على https://ground-eg.com/api
- ✅ HTTPS مفعل مع SSL
- ✅ Security headers نشطة
- ✅ Bearer token authentication يعمل
- ✅ Rate limiting نشط على Login

**🎉 مبروك! موقعك الآن على الإنترنت!**
