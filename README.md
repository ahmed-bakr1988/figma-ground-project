# 🏗️ Ground Tech - Lightning Protection Services

> Ground Tech Egypt - Professional Lightning Protection Systems | أنظمة الحماية من الصواعق

موقع ويب احترافي ثنائي اللغة (عربي/إنجليزي) متكامل مع Backend API، مبني باستخدام أحدث التقنيات

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg)](https://tailwindcss.com/)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20.svg)](https://laravel.com/)
[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success.svg)](https://ground-eg.com)

---

## 🌟 المميزات الرئيسية

### ✅ Frontend (React + Vite)
- ⚡ **أداء فائق** - بني باستخدام Vite مع code splitting
- 🌍 **ثنائي اللغة** - عربي/إنجليزي مع دعم كامل لـ RTL/LTR
- 📱 **Responsive** - Mobile Sidebar Menu احترافي
- 🎨 **UI/UX محترف** - تصميم عصري مع Tailwind CSS
- 🎭 **رسوم متحركة** - Framer Motion لتجربة مستخدم سلسة
- 🔍 **SEO محسّن** - Meta tags, Open Graph, Sitemap, Robots.txt
- 🛡️ **Error Handling** - Error Boundary + صفحة 404 مخصصة
- ♿ **Accessibility** - ARIA labels, form validation محسّنة

### ✅ Backend (Laravel 11)
- 🔐 **Sanctum API** - Bearer token authentication
- 🗄️ **MySQL Database** - بنية كاملة مع Soft Deletes
- 📝 **API Resources** - استجابات موحدة ومنظمة
- ✅ **Form Validation** - Request classes لكل endpoint
- 🌐 **Bilingual Content** - محتوى بالعربية والإنجليزية
- 🛡️ **Security** - Rate limiting, CORS, Security headers
- 🔧 **Filament Admin** - لوحة تحكم إدارية جاهزة
- 🧪 **Testing** - Feature tests للـ API

---

## 📦 التحديثات الأخيرة (v2.0)

### 🎉 Production Ready!
تم إصلاح **27 مشكلة** تم اكتشافها في QA Testing:

#### ✅ Critical Fixes (HIGH)
- Fixed index.html branding (LightningGuard → Ground Tech)
- Added Arabic font (Cairo) with proper loading
- Fixed Social Media links with proper targets
- Added Error Boundary Component
- Created professional 404 Page
- Removed all console.log statements
- Fixed API URL configuration
- Added proper favicon

#### ✅ Medium Fixes
- Created robots.txt & sitemap.xml for SEO
- Added Open Graph tags for social sharing
- Improved Loading spinner component
- Fixed dropdown timeout (200ms → 400ms)
- Enhanced form validation (inline errors)
- Added lazy loading for images
- Fixed Footer CTA button
- Improved Logo alt text for accessibility

#### ✅ New Features
- **Mobile Sidebar Menu** - قائمة جانبية احترافية للموبايل والتابلت
- **Enhanced Logo** - حجم أكبر وتصميم محسّن (بدون نص)
- **Production .htaccess** - Apache config with security headers
- **Deployment Guide** - دليل شامل للرفع على الاستضافة

---

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL 8.0+

### 1️⃣ Backend Setup (Laravel)

```bash
# 1. الانتقال لمجلد Backend
cd backend

# 2. تثبيت الاعتماديات
composer install

# 3. إعداد قاعدة البيانات
# افتح MySQL واكتب:
# CREATE DATABASE ground_protection CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 4. نسخ ملف البيئة وتعديله
cp .env.example .env
# عدّل: DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 5. توليد مفتاح التطبيق
php artisan key:generate

# 6. تشغيل Migrations
php artisan migrate

# 7. بذر البيانات
php artisan db:seed

# 8. تشغيل الخادم
php artisan serve
```

✅ الـ API جاهز على: `http://localhost:8000/api`

### الخطوة 2: Frontend (React)

```bash
# 1. العودة للمجلد الرئيسي
cd ..

# 2. تثبيت الاعتماديات
npm install

# 3. نسخ ملف البيئة
cp .env.example .env

# 4. تشغيل التطبيق
npm run dev
```

✅ التطبيق جاهز على: `http://localhost:5173`

## 📁 هيكل المشروع

```
figma-project/
├── backend/                 # Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/  # API Controllers
│   │   │   ├── Middleware/       # Custom Middleware
│   │   │   ├── Requests/         # Form Validation
│   │   │   └── Resources/        # API Resources
│   │   ├── Models/              # Eloquent Models
│   │   └── Traits/              # Shared Traits
│   ├── database/
│   │   ├── migrations/          # Database Schema
│   │   └── seeders/             # Test Data
│   ├── routes/
│   │   └── api.php              # API Routes
│   └── tests/                   # Feature Tests
│
├── src/                     # React Frontend
│   └── assets/
│       ├── images/          # صور المشروع
│       └── logo/            # شعار الشركة
├── src/
│   ├── components/
│   │   ├── common/          # مكونات مشتركة
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── Logo.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── layout/          # مكونات التخطيط
│   │   │   └── Footer.jsx
│   │   └── sections/        # أقسام الصفحة
│   │       ├── HeroSection.jsx
│   │       ├── ServicesSection.jsx
│   │       ├── StatsSection.jsx
│   │       ├── ProjectsSection.jsx
│   │       ├── TestimonialsSection.jsx
│   │       ├── ContactSection.jsx
│   │       └── AboutSection.jsx
│   ├── i18n/                # نظام الترجمة
│   │   ├── index.js
│   │   └── locales/
│   │       ├── ar.json      # الترجمات العربية
│   │       └── en.json      # الترجمات الإنجليزية
│   ├── pages/
│   │   └── AboutUsPage.jsx
│   ├── App.jsx              # المكون الرئيسي
│   ├── main.jsx             # نقطة الدخول
│   └── index.css            # أنماط Tailwind
├── tailwind.config.js       # إعدادات Tailwind
├── vite.config.js           # إعدادات Vite
└── package.json
```

## 🔧 التقنيات المستخدمة

- **React 18** - مكتبة واجهة المستخدم
- **Vite 5** - أداة البناء السريعة
- **Tailwind CSS 3** - إطار عمل CSS
- **Framer Motion** - مكتبة الرسوم المتحركة
- **React Router** - التنقل بين الصفحات
- **React i18next** - نظام الترجمة الدولية
- **Lucide React** - مكتبة الأيقونات
- **Google Maps** - الخرائط التفاعلية

## 🚀 التثبيت والتشغيل

### 1. استنساخ المشروع

```bash
git clone https://github.com/aborayan2022/figma-ground-project.git
cd figma-ground-project
```

### 2. تثبيت المتطلبات

```bash
npm install
```

### 3. تشغيل بيئة التطوير

```bash
npm run dev
```

الموقع سيعمل على: http://localhost:5173

### 4. بناء المشروع للإنتاج

```bash
npm run build
npm run preview
```

## 🎨 تخصيص الألوان

يمكنك تعديل ألوان الموقع من ملف `tailwind.config.js`:

```javascript
colors: {
  primary: '#1B3C5C',      // اللون الأساسي (أزرق داكن)
  secondary: '#2C5282',    // اللون الثانوي
  accent: '#FDB022',       // لون التمييز (ذهبي)
  'accent-dark': '#E09A1A',
}
```

## 🌍 دعم اللغات

الموقع يدعم اللغتين العربية والإنجليزية بشكل كامل:
- تبديل تلقائي لاتجاه النص (RTL/LTR)
- ترجمات كاملة لجميع النصوص
- خطوط مخصصة لكل لغة

لإضافة ترجمات جديدة، عدّل الملفات:
- `src/i18n/locales/ar.json`
- `src/i18n/locales/en.json`

## � تكامل React مع Laravel API

تم ربط React بشكل كامل مع Laravel Backend:

### خدمات API

- **[src/services/api.js](src/services/api.js)** - Axios client مع جميع الخدمات
- **[src/services/AuthContext.jsx](src/services/AuthContext.jsx)** - Context للمصادقة
- **[src/services/hooks.js](src/services/hooks.js)** - Custom hooks للتفاعل مع API

### استخدام Custom Hooks

```javascript
import { useServices, useFaqs, useContactForm } from './services/hooks';

// جلب الخدمات
const { data: services, loading, error } = useServices();

// جلب الأسئلة الشائعة
const { data: faqs } = useFaqs();

// إرسال رسالة تواصل
const { sendMessage, loading, success } = useContactForm();
await sendMessage({ name, email, message });
```

### Authentication

```javascript
import { useAuth } from './services/AuthContext';

const { user, login, logout } = useAuth();

// تسجيل الدخول
await login(email, password);

// تسجيل الخروج
await logout();
```

📚 **للمزيد:** راجع [REACT_API_INTEGRATION.md](REACT_API_INTEGRATION.md) و [START_HERE.md](START_HERE.md)

## 📍 API Endpoints

| Endpoint | الطريقة | الوصف |
|----------|---------|-------|
| `/api/services` | GET | جلب الخدمات |
| `/api/projects` | GET | جلب المشاريع |
| `/api/blog` | GET | جلب المقالات |
| `/api/faqs` | GET | الأسئلة الشائعة |
| `/api/contact/message` | POST | إرسال رسالة |
| `/api/auth/login` | POST | تسجيل الدخول |
| `/api/auth/register` | POST | إنشاء حساب |

📖 **التوثيق الكامل:** [backend/README.md](backend/README.md)

## 📍 معلومات الاتصال

**العنوان:** مدينة العبور / الحي الخامس / قطعة 3 / بلوك 16079  
**البريد الإلكتروني:** info@groundprotection.sa  
**الهاتف:** +966 92 000 0000  
**WhatsApp:** +966 50 000 0000

## 🧪 الاختبارات

### Backend Tests

```bash
cd backend
php artisan test
```

### Frontend Tests

```bash
npm run test
```

## 🔧 الخطوات التالية

- ✅ ربط صفحات React المتبقية مع الـ API
- ⬜ إضافة Dashboard للإدارة
- ⬜ إضافة نظام الإشعارات
- ⬜ تحسين SEO وإضافة sitemap
- ⬜ إضافة Progressive Web App (PWA)

## 📝 أوامر مفيدة

### Frontend
```bash
npm run dev          # تشغيل بيئة التطوير
npm run build        # بناء للإنتاج
npm run preview      # معاينة نسخة الإنتاج
npm run lint         # فحص الأكواد
```

### Backend
```bash
php artisan serve    # تشغيل الخادم
php artisan test     # تشغيل الاختبارات
php artisan migrate  # تشغيل migrations
php artisan db:seed  # بذر البيانات
```

## 📄 الترخيص

هذا المشروع ملك لشركة جراوند لأنظمة الحماية من الصواعق والتأريض © 2026

## 👨‍💻 المطور

تم تطويره بواسطة: **Ahmed Bakr Ali**  
GitHub: [@aborayan2022](https://github.com/aborayan2022)

## 🙏 الشكر والتقدير

- تصميم UI/UX من Figma
- Laravel 11 + Sanctum للـ Backend
- React 18 + Vite 5 للـ Frontend
- Tailwind CSS 3 للتصميم
- بُني باستخدام أفضل الممارسات

---

⭐ إذا أعجبك المشروع، لا تنسى وضع نجمة على GitHub!

🔗 **رابط المستودع:** https://github.com/aborayan2022/figma-ground-project
