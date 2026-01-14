# Ground Protection Laravel API

![Laravel](https://img.shields.io/badge/Laravel-11-red)
![PHP](https://img.shields.io/badge/PHP-8.2+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 نظرة عامة

واجهة برمجة تطبيقات (API) متكاملة لموقع Ground Protection للحماية من الصواعق وأنظمة التأريض.

## 🚀 المميزات

- ✅ نظام مصادقة متكامل مع Laravel Sanctum
- ✅ دعم ثنائي اللغة (العربية والإنجليزية)
- ✅ هيكل استجابة API موحد
- ✅ Rate Limiting لحماية الـ API
- ✅ CORS معدة للتواصل مع React
- ✅ Soft Deletes لجميع النماذج
- ✅ تسجيل شامل للطلبات
- ✅ اختبارات Unit و Feature

## 📁 هيكل المشروع

```
backend/
├── app/
│   ├── Exceptions/          # معالجة الاستثناءات
│   ├── Http/
│   │   ├── Controllers/Api/ # متحكمات الـ API
│   │   ├── Middleware/      # الـ Middleware المخصصة
│   │   ├── Requests/        # طلبات التحقق
│   │   └── Resources/       # تحويل البيانات للـ JSON
│   ├── Models/              # نماذج Eloquent
│   └── Traits/              # Traits مشتركة
├── config/                  # ملفات الإعداد
├── database/
│   ├── factories/           # مصانع بيانات الاختبار
│   ├── migrations/          # migrations قاعدة البيانات
│   └── seeders/             # بذر البيانات الأولية
├── routes/
│   └── api.php              # مسارات الـ API
└── tests/
    └── Feature/             # اختبارات الميزات
```

## ⚡ البدء السريع

### المتطلبات

- PHP >= 8.2
- Composer
- MySQL 8.0+ أو MariaDB 10.4+
- Node.js >= 18 (للـ Frontend)

### التثبيت

```bash
# 1. الانتقال لمجلد الـ Backend
cd backend

# 2. تثبيت الاعتماديات
composer install

# 3. نسخ ملف البيئة
cp .env.example .env

# 4. توليد مفتاح التطبيق
php artisan key:generate

# 5. تحديث إعدادات قاعدة البيانات في .env

# 6. تشغيل الـ migrations
php artisan migrate

# 7. بذر البيانات الأولية
php artisan db:seed

# 8. تشغيل الخادم
php artisan serve
```

الآن يمكنك الوصول للـ API على: `http://localhost:8000/api`

## 🔐 المصادقة

### تسجيل مستخدم جديد

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "Password123!",
  "password_confirmation": "Password123!",
  "phone": "+966500000000"
}
```

### تسجيل الدخول

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "Password123!"
}
```

**الاستجابة:**

```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "user": {
      "id": 1,
      "name": "أحمد محمد",
      "email": "ahmed@example.com"
    },
    "token": "1|abcdefghijklmnopqrstuvwxyz",
    "token_type": "Bearer"
  },
  "meta": {
    "timestamp": "2024-01-01T12:00:00Z",
    "version": "v1"
  }
}
```

### استخدام Token

أضف الـ Token في header كل طلب:

```http
Authorization: Bearer {token}
```

## 📚 نقاط النهاية (Endpoints)

### المصادقة

| Method | Endpoint | الوصف |
|--------|----------|-------|
| POST | `/api/auth/register` | تسجيل مستخدم جديد |
| POST | `/api/auth/login` | تسجيل الدخول |
| POST | `/api/auth/logout` | تسجيل الخروج ⚷ |
| POST | `/api/auth/forgot-password` | طلب إعادة تعيين كلمة المرور |
| POST | `/api/auth/reset-password` | إعادة تعيين كلمة المرور |
| GET | `/api/user` | جلب بيانات المستخدم الحالي ⚷ |
| PUT | `/api/user/profile` | تحديث الملف الشخصي ⚷ |
| POST | `/api/user/change-password` | تغيير كلمة المرور ⚷ |

⚷ = يتطلب مصادقة

### الخدمات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/services` | جلب جميع الخدمات |
| GET | `/api/services/featured` | جلب الخدمات المميزة |
| GET | `/api/services/{slug}` | جلب خدمة محددة |

### المشاريع

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/projects` | جلب جميع المشاريع |
| GET | `/api/projects/featured` | جلب المشاريع المميزة |
| GET | `/api/projects/stats` | جلب الإحصائيات |
| GET | `/api/projects/{slug}` | جلب مشروع محدد |
| GET | `/api/projects/{slug}/related` | جلب المشاريع ذات الصلة |

### المقالات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/blog` | جلب جميع المقالات |
| GET | `/api/blog/featured` | جلب المقالات المميزة |
| GET | `/api/blog/latest` | جلب أحدث المقالات |
| GET | `/api/blog/categories` | جلب الفئات |
| GET | `/api/blog/{slug}` | جلب مقال محدد |

### الأسئلة الشائعة

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/faqs` | جلب جميع الأسئلة |
| GET | `/api/faqs/categories` | جلب الفئات |
| POST | `/api/faqs/{id}/feedback` | تقييم إجابة |

### التواصل

| Method | Endpoint | الوصف |
|--------|----------|-------|
| POST | `/api/contact/message` | إرسال رسالة |
| POST | `/api/contact/quote` | طلب عرض سعر |
| POST | `/api/contact/newsletter/subscribe` | الاشتراك في النشرة |
| GET | `/api/my-quotes` | جلب طلباتي ⚷ |

## 🔍 البحث والفلترة

### Parameters شائعة

```http
GET /api/services?search=صواعق
GET /api/services?featured=true
GET /api/projects?service_id=1
GET /api/blog?category=حماية
GET /api/blog?sort=published_at&order=desc
GET /api/services?per_page=10&page=2
GET /api/services?all=true  # بدون pagination
```

## 🌐 دعم اللغات

أرسل اللغة في Header:

```http
Accept-Language: ar
# أو
Accept-Language: en
```

أو كـ Query Parameter:

```http
GET /api/services?lang=en
```

## 📐 هيكل الاستجابة

### استجابة النجاح

```json
{
  "success": true,
  "message": "تمت العملية بنجاح",
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-01T12:00:00Z",
    "version": "v1"
  }
}
```

### استجابة الخطأ

```json
{
  "success": false,
  "message": "رسالة الخطأ",
  "errors": {
    "field": ["تفاصيل الخطأ"]
  },
  "meta": {
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

### استجابة Pagination

```json
{
  "success": true,
  "message": "تم جلب البيانات بنجاح",
  "data": [ ... ],
  "meta": {
    "timestamp": "2024-01-01T12:00:00Z",
    "version": "v1",
    "pagination": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 15,
      "total": 75,
      "from": 1,
      "to": 15,
      "has_more_pages": true
    }
  },
  "links": {
    "first": "http://...",
    "last": "http://...",
    "prev": null,
    "next": "http://..."
  }
}
```

## 🧪 الاختبارات

```bash
# تشغيل جميع الاختبارات
php artisan test

# تشغيل اختبارات محددة
php artisan test --filter=AuthenticationTest

# مع التغطية
php artisan test --coverage
```

## 🔒 الأمان

- CSRF Protection للـ SPA
- Rate Limiting (60 طلب/دقيقة، 5 لتسجيل الدخول)
- SQL Injection Protection (Eloquent ORM)
- XSS Prevention (Sanitization)
- Password Hashing (bcrypt)
- Token-based Authentication (Sanctum)

## 📊 معدلات الطلبات

| Endpoint | الحد |
|----------|------|
| عام | 60 طلب/دقيقة |
| تسجيل الدخول | 5 محاولات/دقيقة |
| التواصل | 5 رسائل/دقيقة |
| طلب سعر | 3 طلبات/دقيقة |

## 🛠️ التطوير

### أوامر مفيدة

```bash
# مسح الـ Cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# عرض المسارات
php artisan route:list --path=api

# إنشاء Migration
php artisan make:migration create_xxx_table

# إنشاء Model مع كل شيء
php artisan make:model ModelName -mfsc
```

## 📝 حسابات الاختبار

```
# مدير النظام
البريد: admin@groundprotection.sa
كلمة المرور: Admin@123

# موظف
البريد: staff@groundprotection.sa
كلمة المرور: Staff@123
```

## 🤝 المساهمة

1. Fork المشروع
2. أنشئ branch للميزة: `git checkout -b feature/amazing-feature`
3. Commit تغييراتك: `git commit -m 'Add amazing feature'`
4. Push للـ branch: `git push origin feature/amazing-feature`
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.
