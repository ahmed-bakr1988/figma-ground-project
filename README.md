# 🏗️ Ground Protection Company - Website

> شركة جراوند لأنظمة الحماية الإلكترونية والتأمين الشامل

موقع ويب حديث ومتعدد اللغات (عربي/إنجليزي) لشركة جراوند لأنظمة الحماية، مبني باستخدام React + Vite + Tailwind CSS مع تكامل كامل مع Figma

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg)](https://tailwindcss.com/)

## 🌟 المميزات

- ⚡ **أداء عالي** - بني باستخدام Vite لسرعة فائقة
- 🌍 **دعم ثنائي اللغة** - عربي وإنجليزي مع RTL/LTR
- 🎨 **تصميم عصري** - UI/UX احترافي مبني من تصاميم Figma
- 📱 **متجاوب تماماً** - يعمل على جميع الأجهزة والشاشات
- 🎭 **رسوم متحركة سلسة** - باستخدام Framer Motion
- 🗺️ **خرائط تفاعلية** - تكامل مع Google Maps
- 🎯 **SEO محسّن** - بنية صديقة لمحركات البحث

## 🔍 نظرة عامة على المشروع

هذا الموقع مخصص لشركة جراوند لأنظمة الحماية الإلكترونية ويتضمن:
- صفحة رئيسية متكاملة (Hero, Services, Stats, Projects, Testimonials, Contact)
- صفحة "من نحن" شاملة
- نظام تنقل ذكي مع تبديل سلس بين اللغات
- نماذج اتصال تفاعلية
- معرض مشاريع وشهادات عملاء

## 🚀 البدء السريع

### 1. تثبيت المتطلبات

```bash
npm install
```

### 2. تشغيل المشروع

```bash
npm run dev
```

سيفتح المشروع على: http://localhost:3000

## 📁 هيكل المشروع

```
figma-ground-project/
├── public/
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

## 📍 معلومات الاتصال

**العنوان:** مدينة العبور / الحي الخامس / قطعة 3 / بلوك 16079  
**البريد الإلكتروني:** info@ground-eg.com  
**الهاتف:** +1 (555) 123-4567

## 🔧 الخطوات التالية

### للعمل مع Figma MCP:

1. **احصل على Figma Access Token:**
   - افتح Figma → Settings → Account → Personal Access Tokens
   - أنشئ token جديد وانسخه

2. **أضف رابط تصميم Figma:**
   - افتح تصميمك في Figma
   - انسخ الرابط الذي يحتوي على `node-id`

3. **استخدم GitHub Copilot:**
   - اضغط `Ctrl+I` في VS Code
   - اطلب تحويل التصميم إلى كود

## 📝 أوامر مفيدة

```bash
# تشغيل بيئة التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة نسخة الإنتاج محلياً
npm run preview

# فحص الأكواد
npm run lint
```

## 📄 الترخيص

هذا المشروع ملك لشركة جراوند لأنظمة الحماية الإلكترونية © 2025

## 👨‍💻 المطور

تم تطويره بواسطة: **Ahmed Bakr Ali**  
GitHub: [@aborayan2022](https://github.com/aborayan2022)

## 🙏 الشكر والتقدير

- تصميم UI/UX من Figma
- بُني باستخدام أفضل الممارسات في تطوير React
- مُحسّن للأداء وتجربة المستخدم

---

⭐ إذا أعجبك المشروع، لا تنسى وضع نجمة على GitHub!

🔗 **رابط المستودع:** https://github.com/aborayan2022/figma-ground-project
