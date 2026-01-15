# 📦 تثبيت المكتبات المطلوبة

## ✅ الحالة الحالية

### Backend (Laravel 11)
- ✅ Laravel 11 - موجود
- ✅ Sanctum - موجود
- ➕ **Filament 3** - تمت الإضافة
- ➕ **DomPDF** - تمت الإضافة
- ➕ **Laravel Excel** - تمت الإضافة
- ➕ **Spatie Media Library** - تمت الإضافة

### Frontend (React)
- ✅ React - موجود
- ✅ Axios - موجود

---

## 🚀 خطوات التثبيت

### 1. تثبيت Backend Dependencies

```bash
cd backend
composer install
```

سيتم تثبيت:
- **Filament 3.2** - Admin Panel احترافي
- **DomPDF 2.2** - لتوليد ملفات PDF
- **Laravel Excel 3.1** - لاستيراد وتصدير Excel
- **Spatie Media Library 11.0** - لإدارة الصور والملفات

### 2. إعداد Filament

```bash
# إنشاء مستخدم Admin
php artisan make:filament-user

# نشر ملفات Filament (اختياري)
php artisan filament:install --panels
```

### 3. إعداد Spatie Media Library

```bash
# نشر ملفات الإعداد
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"

# تشغيل migrations
php artisan migrate
```

### 4. تثبيت Frontend Dependencies

```bash
cd ..
npm install
```

---

## 📋 ما تم تثبيته

### Filament 3 (Admin Panel)
- لوحة تحكم كاملة للإدارة
- CRUD تلقائي للموديلات
- Tables & Forms جاهزة
- Dashboard & Widgets
- User Management

**الوصول:** `http://localhost:8000/admin`

### DomPDF (PDF Generation)
```php
use Barryvdh\DomPDF\Facade\Pdf;

$pdf = Pdf::loadView('invoice', $data);
return $pdf->download('invoice.pdf');
```

### Laravel Excel
```php
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ServicesExport;

return Excel::download(new ServicesExport, 'services.xlsx');
```

### Spatie Media Library
```php
// إضافة صورة للموديل
$service->addMedia($request->file('image'))
    ->toMediaCollection('images');

// جلب الصورة
$service->getFirstMediaUrl('images');
```

---

## 🎨 إعداد Filament للمشروع

### إنشاء Resources

```bash
# Resource للخدمات
php artisan make:filament-resource Service --generate

# Resource للمشاريع
php artisan make:filament-resource Project --generate

# Resource للمدونة
php artisan make:filament-resource BlogPost --generate

# Resource للأسئلة الشائعة
php artisan make:filament-resource Faq --generate
```

### إنشاء Widgets (Dashboard)

```bash
# إحصائيات الموقع
php artisan make:filament-widget StatsOverview --stats

# آخر الطلبات
php artisan make:filament-widget LatestQuotes --table
```

---

## 📝 ملاحظات مهمة

### 1. Filament Configuration
بعد التثبيت، يمكنك تخصيص Filament من:
- `config/filament.php`
- `app/Providers/Filament/AdminPanelProvider.php`

### 2. Media Library Configuration
تأكد من إضافة `HasMedia` interface للموديلات:
```php
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Service extends Model implements HasMedia
{
    use InteractsWithMedia;
}
```

### 3. DomPDF Arabic Support
لدعم اللغة العربية في PDF، أضف في `config/dompdf.php`:
```php
'font_dir' => storage_path('fonts/'),
'font_cache' => storage_path('fonts/'),
'chroot' => realpath(base_path()),
'enable_font_subsetting' => true,
'enable_unicode' => true,
```

### 4. Excel Configuration
يمكنك تخصيص Laravel Excel من:
`config/excel.php`

---

## 🌐 Database Configuration

لا حاجة لتثبيت شيء إضافي. تأكد من:

### MySQL (الحالي)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ground_protection
```

### PostgreSQL (إذا أردت التبديل)
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ground_protection
```

---

## 🚀 Hosting & Deployment

### Laravel Forge + DigitalOcean

1. **Laravel Forge:**
   - زر [forge.laravel.com](https://forge.laravel.com)
   - ربط حساب DigitalOcean
   - إنشاء Server جديد
   - Deploy من Git

2. **DigitalOcean:**
   - اختر Droplet ($6-12/شهر للبداية)
   - نظام: Ubuntu 22.04
   - RAM: 2GB minimum

### Cloudways (البديل)

1. زر [cloudways.com](https://cloudways.com)
2. اختر Laravel Application
3. Server: DigitalOcean
4. Deploy من Git

---

## ✅ التحقق من التثبيت

```bash
# Backend
cd backend
composer show | grep -E "filament|dompdf|excel|medialibrary"

# Frontend
cd ..
npm list axios

# Test Backend
php artisan --version

# Test Frontend
npm run dev
```

---

## 🎯 الخطوات التالية

1. ✅ تثبيت جميع المكتبات
2. ⬜ إعداد Filament Admin Panel
3. ⬜ إنشاء Resources للموديلات
4. ⬜ إضافة Media Library للصور
5. ⬜ تجهيز PDF Templates
6. ⬜ Deploy على Forge/Cloudways

---

## 📚 المراجع

- [Filament Docs](https://filamentphp.com/docs)
- [DomPDF Docs](https://github.com/barryvdh/laravel-dompdf)
- [Laravel Excel Docs](https://docs.laravel-excel.com)
- [Media Library Docs](https://spatie.be/docs/laravel-medialibrary)
- [Laravel Forge](https://forge.laravel.com)
- [Cloudways](https://cloudways.com)
