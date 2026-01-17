# ✅ Production Deployment Checklist
## Ground Tech - ground-eg.com

---

## قبل الرفع

### على الجهاز المحلي
- [x] `npm run build` بنجاح
- [x] اختبار الموقع محلياً على http://localhost:3000
- [x] التأكد من عمل Mobile Menu
- [x] التأكد من حجم Logo مناسب
- [x] فحص Console بحثاً عن أخطاء

---

## ملفات يجب رفعها

### Frontend (→ public_html/)
```
dist/
├── index.html          ✅
├── .htaccess           ✅
├── robots.txt          ✅
├── sitemap.xml         ✅
└── assets/             ✅ (كل المجلد)
```

### Backend (→ api/)
```
backend/
├── app/                ✅
├── bootstrap/          ✅
├── config/             ✅
├── database/           ✅
├── public/             ✅
├── routes/             ✅
├── storage/            ✅ (صلاحيات 775)
├── vendor/             ✅ (بعد composer install)
├── .env                ✅ (إعداده على السيرفر)
├── artisan             ✅
└── composer.json       ✅
```

---

## على السيرفر (cPanel/SSH)

### 1. Frontend Setup
- [ ] رفع ملفات dist/ إلى public_html/
- [ ] تأكيد وجود .htaccess
- [ ] تأكيد صلاحيات الملفات: 644 للملفات، 755 للمجلدات
- [ ] تفعيل SSL/HTTPS من cPanel
- [ ] اختبار: https://ground-eg.com

### 2. Backend Setup
```bash
# في Terminal أو SSH
cd ~/api  # المسار الصحيح لـ Laravel

# Install dependencies
composer install --no-dev --optimize-autoloader

# Setup .env
cp .env.example .env
nano .env  # تعديل الإعدادات

# في .env - الإعدادات المطلوبة:
APP_ENV=production
APP_DEBUG=false
APP_URL=https://ground-eg.com
FRONTEND_URL=https://ground-eg.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_pass

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Storage link
php artisan storage:link

# Fix permissions
chmod -R 775 storage bootstrap/cache
```

### 3. Database Setup
- [ ] إنشاء Database من cPanel → MySQL Databases
- [ ] إنشاء User وتعيين صلاحيات كاملة
- [ ] تحديث بيانات Database في .env
- [ ] تشغيل Migrations

---

## اختبارات بعد الرفع

### Frontend Tests
- [ ] الصفحة الرئيسية تفتح: https://ground-eg.com
- [ ] Logo يظهر بحجم كبير ✓
- [ ] Mobile Menu يعمل على الموبايل ✓
- [ ] اللغة العربية تعمل ✓
- [ ] اللغة الإنجليزية تعمل ✓
- [ ] جميع الصفحات تعمل:
  - [ ] /about
  - [ ] /services
  - [ ] /products
  - [ ] /projects
  - [ ] /contact
  - [ ] /blog
  - [ ] /faq

### Backend API Tests
```bash
# Health Check
curl https://ground-eg.com/api/health
# يجب أن يرجع: {"success":true,"message":"API is running"}

# Services
curl https://ground-eg.com/api/services
# يجب أن يرجع JSON بالخدمات

# Contact form (POST test)
# اختبر من الموقع مباشرة
```

### Forms Tests
- [ ] Hero Section Contact Form يعمل
- [ ] Contact Page Form يعمل
- [ ] رسائل الخطأ تظهر inline (بدون alert)
- [ ] رسالة النجاح تظهر بعد الإرسال

### Mobile Tests
- [ ] Mobile Menu ينفتح على الموبايل ✓
- [ ] Sidebar Menu ينزلق بشكل سلس ✓
- [ ] Dropdowns تعمل في Mobile Menu ✓
- [ ] أزرار الاتصال تظهر في Mobile Menu ✓
- [ ] الموقع responsive على جميع الأحجام

---

## SEO Setup

### Google Search Console
- [ ] إضافة الموقع https://ground-eg.com
- [ ] رفع sitemap.xml: https://ground-eg.com/sitemap.xml
- [ ] طلب فهرسة الصفحة الرئيسية

### Social Media
- [ ] تحديث روابط Social Media في Footer
  - Facebook: https://facebook.com/groundtecheg
  - Twitter: https://twitter.com/groundtecheg
  - LinkedIn: https://linkedin.com/company/groundtecheg
  - Instagram: https://instagram.com/groundtecheg

### Analytics (اختياري)
- [ ] Google Analytics
- [ ] Facebook Pixel
- [ ] Hotjar

---

## Performance Check

### Tools
1. [ ] Google PageSpeed: https://pagespeed.web.dev/
   - Target: Score > 80
2. [ ] GTmetrix: https://gtmetrix.com/
3. [ ] Chrome Lighthouse (F12 → Lighthouse)

### Optimization
- [x] Images compressed ✓
- [x] GZIP enabled in .htaccess ✓
- [x] Browser caching enabled ✓
- [x] CSS/JS minified (Vite) ✓
- [x] Lazy loading للصور ✓

---

## Security Check

- [ ] HTTPS/SSL مُفعّل
- [ ] Force HTTPS في .htaccess
- [ ] APP_DEBUG=false في Laravel
- [ ] .env محمي (خارج public/)
- [ ] Database credentials آمنة
- [ ] CORS مُعد صحيح
- [ ] Security headers في .htaccess

---

## Final Checks

- [ ] جميع روابط الـ Navigation تعمل
- [ ] جميع الصور تظهر
- [ ] الخطوط تعمل (Cairo للعربي، Inter للإنجليزي)
- [ ] الألوان متناسقة مع Brand
- [ ] الأنيميشن يعمل بسلاسة
- [ ] Error pages تعمل (404)
- [ ] Console نظيف (لا أخطاء)

---

## Post-Launch

### Backup
- [ ] Database backup يومي
- [ ] Files backup أسبوعي
- [ ] استخدام cPanel Backup أو UpdraftPlus

### Monitoring
- [ ] تحقق من Laravel logs: storage/logs/
- [ ] تحقق من Apache error logs
- [ ] تحقق من uptime monitoring

### Updates
- [ ] تحديثات Laravel الأمنية
- [ ] تحديثات Composer packages
- [ ] تحديثات npm packages (بحذر)

---

## 🎉 المشروع جاهز للإطلاق!

**تم الانتهاء من:**
✅ جميع إصلاحات QA (27 مشكلة)
✅ Mobile Navigation محترف
✅ Logo محسّن
✅ SEO optimization
✅ Security headers
✅ Performance optimization
✅ Production .htaccess
✅ Deployment documentation

**للدعم:** راجع `DEPLOYMENT_GUIDE.md` للتفاصيل الكاملة.
