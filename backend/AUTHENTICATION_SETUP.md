# 🔐 إعدادات المصادقة - Filament + Sanctum

## ✅ تم الإعداد

تم تكوين المشروع ليستخدم نظامي مصادقة منفصلين:

### 1. Sanctum API (للـ React Frontend)
- **Guard:** `api` (sanctum)
- **Driver:** Token-based authentication
- **Path:** `/api/*`
- **استخدام:** React Frontend يرسل Bearer Token

### 2. Filament Admin Panel
- **Guard:** `web` (session)
- **Driver:** Session-based authentication
- **Path:** `/admin`
- **استخدام:** Admin Panel للموظفين

---

## 📁 الملفات المعدّلة

### 1. [config/auth.php](backend/config/auth.php)
تم إنشاء الملف مع Guards منفصلة:

```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'sanctum',
        'provider' => 'users',
    ],
],
```

### 2. [app/Models/User.php](backend/app/Models/User.php)
تمت إضافة `FilamentUser` interface:

```php
class User extends Authenticatable implements MustVerifyEmail, FilamentUser
{
    /**
     * فقط admin و staff يمكنهم دخول Filament
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return in_array($this->role, ['admin', 'staff']) && $this->is_active;
    }
}
```

### 3. [app/Providers/Filament/AdminPanelProvider.php](backend/app/Providers/Filament/AdminPanelProvider.php)
تم تحديد `authGuard('web')`:

```php
->authGuard('web') // Filament يستخدم web guard (session)
->brandName('Ground Protection')
->colors([
    'primary' => Color::hex('#1B3C5C'),
])
```

---

## 🚀 كيفية الاستخدام

### إنشاء مستخدم Admin

```bash
php artisan make:filament-user
```

سيطلب منك:
- Name
- Email
- Password

ثم عدّل role في قاعدة البيانات:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

**أو** باستخدام Tinker:

```bash
php artisan tinker
```

```php
$user = User::where('email', 'admin@example.com')->first();
$user->role = 'admin';
$user->save();
```

---

## 🔑 أنواع المستخدمين

| Role | الوصف | Filament Access | API Access |
|------|-------|----------------|------------|
| `admin` | مدير النظام | ✅ نعم | ✅ نعم |
| `staff` | موظف | ✅ نعم | ✅ نعم |
| `user` | عميل | ❌ لا | ✅ نعم |

---

## 🌐 المسارات

### API (React Frontend)
```
GET  /api/services          - جلب الخدمات
POST /api/auth/login        - تسجيل دخول API
POST /api/auth/register     - تسجيل جديد
GET  /api/user              - بيانات المستخدم (Bearer Token)
```

### Filament Admin Panel
```
GET  /admin                 - Dashboard
GET  /admin/login           - صفحة تسجيل الدخول
GET  /admin/services        - إدارة الخدمات
GET  /admin/users           - إدارة المستخدمين
```

---

## 🧪 اختبار النظام

### 1. اختبار API (Sanctum)

```bash
# تسجيل دخول
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password"}'

# استخدام Token
curl http://localhost:8000/api/user \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. اختبار Filament

1. افتح: `http://localhost:8000/admin`
2. سجل دخول بحساب admin أو staff
3. يجب أن تظهر لوحة التحكم

### 3. اختبار الصلاحيات

```bash
# إنشاء user عادي
php artisan tinker
```

```php
$user = User::create([
    'name' => 'Test User',
    'email' => 'user@test.com',
    'password' => bcrypt('password'),
    'role' => 'user', // user عادي
]);
```

حاول تسجيل الدخول في `/admin` - يجب أن يُرفض!

---

## 🔒 الأمان

### 1. Middleware منفصلة

**API Routes** (`routes/api.php`):
```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
});
```

**Filament Admin**:
- يستخدم middleware خاصة به
- Session-based authentication
- CSRF Protection

### 2. CORS

API مفتوح للـ React Frontend (`config/cors.php`):
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
```

Admin Panel محمي من CORS.

---

## 📊 إنشاء Filament Resources

بعد التأكد من عمل النظام، أنشئ Resources:

```bash
# Filament Resources للموديلات
php artisan make:filament-resource Service --generate
php artisan make:filament-resource Project --generate
php artisan make:filament-resource BlogPost --generate
php artisan make:filament-resource Faq --generate
php artisan make:filament-resource User --generate

# Widgets للـ Dashboard
php artisan make:filament-widget StatsOverview --stats
php artisan make:filament-widget LatestQuotes --table
```

---

## ✨ المميزات

### React Frontend (Sanctum)
- ✅ Token-based authentication
- ✅ تسجيل دخول/خروج
- ✅ إدارة الملف الشخصي
- ✅ طلبات محمية بـ Bearer Token

### Filament Admin (Web)
- ✅ Session-based authentication
- ✅ لوحة تحكم شاملة
- ✅ CRUD تلقائي
- ✅ صلاحيات (admin/staff فقط)
- ✅ Dashboard & Widgets

---

## 🎯 الخلاصة

الآن لديك:
- ✅ نظامي مصادقة منفصلين يعملان معاً
- ✅ API للـ React (Sanctum)
- ✅ Admin Panel للإدارة (Filament)
- ✅ صلاحيات واضحة
- ✅ أمان كامل

**كل شيء يعمل بانسجام!** 🎉
