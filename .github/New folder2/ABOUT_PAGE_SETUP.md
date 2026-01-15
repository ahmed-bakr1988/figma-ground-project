# إعداد صفحة About Us / About Page Setup

## 📋 نظرة عامة / Overview

تم إنشاء صفحة About Us كاملة ومنفصلة مع تصميم احترافي يتضمن:
- قصة الشركة ورحلتها
- الرؤية والرسالة
- القيم الأساسية
- الفريق
- الإنجازات والمعالم الزمنية
- دعم كامل للغتين العربية والإنجليزية

A complete standalone About Us page has been created with professional design including:
- Company story and journey
- Vision and mission
- Core values
- Team members
- Achievements and timeline
- Full Arabic and English support

---

## 🚀 خطوات التشغيل / Setup Instructions

### 1. تثبيت الحزم / Install Dependencies

```bash
npm install
```

هذا سيقوم بتثبيت:
- `react-router-dom` للتنقل بين الصفحات
- جميع الحزم الأخرى المطلوبة

This will install:
- `react-router-dom` for page navigation
- All other required packages

### 2. تشغيل المشروع / Run the Project

```bash
npm run dev
```

سيعمل التطبيق على: `http://localhost:5173`
The application will run on: `http://localhost:5173`

---

## 🗂️ الملفات المضافة / Files Added

### 1. صفحة About Us
- **المسار / Path**: `src/pages/AboutUsPage.jsx`
- **الوصف / Description**: صفحة كاملة مع جميع الأقسام

### 2. التراجم / Translations
- **الإنجليزية / English**: `src/i18n/locales/en.json`
- **العربية / Arabic**: `src/i18n/locales/ar.json`
- تم إضافة قسم `aboutPage` مع جميع النصوص المطلوبة

### 3. التعديلات / Modifications
- **App.jsx**: إضافة React Router ومسارات الصفحات
- **HeroSection.jsx**: تحديث روابط التنقل
- **package.json**: إضافة react-router-dom

---

## 🌐 الروابط / Routes

- **الصفحة الرئيسية / Home Page**: `/`
- **صفحة من نحن / About Us Page**: `/about`

---

## 📱 الأقسام في صفحة About Us / Sections in About Us Page

1. **Hero Section**: قسم البطل مع الإحصائيات
2. **Our Story**: قصة الشركة
3. **Mission & Vision**: الرؤية والرسالة
4. **Core Values**: القيم الأساسية (4 قيم)
5. **Timeline**: المعالم الزمنية (4 معالم)
6. **Team**: الفريق (4 أعضاء)
7. **CTA Section**: قسم الدعوة للإجراء

---

## 🎨 المميزات / Features

✅ تصميم متجاوب (Responsive Design)
✅ دعم كامل للغة العربية والإنجليزية مع RTL
✅ رسوم متحركة باستخدام Framer Motion
✅ أيقونات جميلة من Lucide React
✅ تصميم احترافي بألوان متناسقة
✅ Navigation ثابت في الأعلى
✅ Footer مشترك

---

## 🔄 التنقل / Navigation

الرابط "About Us" في القائمة الرئيسية يوجه الآن إلى صفحة `/about` المنفصلة.
يمكنك العودة للصفحة الرئيسية عن طريق الضغط على الشعار أو "Home".

The "About Us" link in the main navigation now directs to the separate `/about` page.
You can return to the home page by clicking the logo or "Home".

---

## 📝 ملاحظات / Notes

- جميع النصوص قابلة للتخصيص من ملفات الترجمة
- الصور المستخدمة من Unsplash (يمكن استبدالها بصور خاصة)
- التصميم متوافق مع جميع أحجام الشاشات
- يدعم التبديل السلس بين اللغات

- All texts are customizable from translation files
- Images are from Unsplash (can be replaced with custom images)
- Design is compatible with all screen sizes
- Supports smooth language switching

---

## 🛠️ تخصيص المحتوى / Content Customization

لتغيير المحتوى، قم بتعديل الملفات التالية:
To change content, modify the following files:

- **النصوص الإنجليزية / English texts**: `src/i18n/locales/en.json` → `aboutPage`
- **النصوص العربية / Arabic texts**: `src/i18n/locales/ar.json` → `aboutPage`
- **الصور / Images**: في `src/pages/AboutUsPage.jsx` ابحث عن روابط `https://images.unsplash.com`

---

## 📞 دعم / Support

إذا واجهت أي مشاكل، تأكد من:
If you face any issues, make sure:

1. تم تثبيت جميع الحزم: `npm install`
2. إصدار Node.js محدث
3. لا توجد أخطاء في Console

---

✨ **تم إنشاء الصفحة بنجاح! / Page Created Successfully!**
