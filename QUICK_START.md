# Quick Start Guide - صفحة About Us

## 🚀 البدء السريع

### الخطوة 1: تثبيت الحزم
```bash
cd c:\xampp\htdocs\figma-project
npm install
```

### الخطوة 2: تشغيل المشروع
```bash
npm run dev
```

### الخطوة 3: فتح المتصفح
افتح المتصفح واذهب إلى:
- **الصفحة الرئيسية**: http://localhost:5173/
- **صفحة About Us**: http://localhost:5173/about

---

## ✅ ما تم إضافته

### 1. صفحة About Us الجديدة
📁 `src/pages/AboutUsPage.jsx`
- صفحة كاملة مع 7 أقسام رئيسية
- تصميم احترافي متجاوب
- دعم كامل للعربية والإنجليزية

### 2. التراجم
📁 `src/i18n/locales/en.json` - تم إضافة قسم `aboutPage`
📁 `src/i18n/locales/ar.json` - تم إضافة قسم `aboutPage`

### 3. React Router
- تم إضافة `react-router-dom` للتنقل بين الصفحات
- المسارات:
  - `/` - الصفحة الرئيسية
  - `/about` - صفحة About Us

### 4. تحديث Navigation
- رابط "About Us" يوجه الآن للصفحة المنفصلة `/about`

---

## 📱 أقسام صفحة About Us

1. **Hero** - قسم البطل مع 4 إحصائيات
2. **Our Story** - قصة الشركة مع صورة
3. **Mission & Vision** - الرؤية والرسالة
4. **Core Values** - 4 قيم أساسية مع أيقونات
5. **Timeline** - 4 معالم زمنية (2008-2024)
6. **Team** - 4 أعضاء فريق مع صور
7. **CTA** - دعوة للإجراء

---

## 🎨 المميزات التقنية

- ✅ Responsive Design - متجاوب مع جميع الأجهزة
- ✅ RTL Support - دعم كامل للغة العربية من اليمين لليسار
- ✅ Framer Motion - رسوم متحركة سلسة
- ✅ Lucide Icons - أيقونات احترافية
- ✅ TailwindCSS - تصميم عصري
- ✅ i18next - نظام ترجمة قوي

---

## 🔧 التخصيص

### تغيير النصوص:
```javascript
// في ملفات الترجمة:
src/i18n/locales/en.json → aboutPage
src/i18n/locales/ar.json → aboutPage
```

### تغيير الصور:
```javascript
// في AboutUsPage.jsx ابحث عن:
https://images.unsplash.com/...
// واستبدلها بروابط صورك
```

### تغيير الألوان:
```javascript
// الألوان الأساسية:
- Orange: orange-500 (#f97316)
- Dark: slate-900 (#0f172a)
- White: white (#ffffff)
```

---

## 📝 ملاحظات مهمة

1. **تثبيت الحزم ضروري**: لا تنسى تشغيل `npm install` أولاً
2. **الصور من Unsplash**: يمكنك استبدالها بصورك الخاصة
3. **التصميم قابل للتعديل**: كل شيء قابل للتخصيص حسب احتياجاتك
4. **دعم اللغات**: النظام يدعم التبديل الفوري بين العربية والإنجليزية

---

## 🐛 حل المشاكل

### المشكلة: لا يعمل التطبيق
```bash
# تأكد من تثبيت الحزم
npm install

# احذف node_modules وأعد التثبيت
rm -rf node_modules
npm install
```

### المشكلة: صفحة About لا تظهر
- تأكد من تشغيل `npm install` لتثبيت react-router-dom
- تأكد من الوصول للرابط `/about` وليس `/#about`

### المشكلة: الترجمة لا تعمل
- تأكد من وجود ملفات الترجمة في `src/i18n/locales/`
- تحقق من Console للأخطاء

---

## 📞 روابط مفيدة

- **React Router**: https://reactrouter.com/
- **Framer Motion**: https://www.framer.com/motion/
- **TailwindCSS**: https://tailwindcss.com/
- **Lucide Icons**: https://lucide.dev/

---

✨ **جاهز للاستخدام! Ready to Use!**

يمكنك الآن:
1. تشغيل المشروع بـ `npm run dev`
2. زيارة `/about` لرؤية الصفحة الجديدة
3. تخصيص المحتوى حسب احتياجاتك
