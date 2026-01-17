# 🔧 حل مشكلة 404 على الاستضافة

## المشكلة
عند الدخول على روابط مثل `https://ground-eg.com/services` تظهر رسالة:
```
Not Found
The requested URL was not found on this server.
Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.
```

---

## ✅ الحل السريع

### الخطوة 1: تحميل ملف .htaccess الجديد
ملف `.htaccess` الآن موجود في مجلد `dist/` - ارفعه للسيرفر.

```bash
# الملف الموجود:
dist/.htaccess
```

### الخطوة 2: رفع الملف على cPanel

1. **افتح cPanel → File Manager**
2. **انتقل إلى `public_html/`**
3. **ارفع ملف `.htaccess`** من مجلد `dist/`
4. **تأكد من ظهور الملف** (قد يكون مخفياً - فعّل "Show Hidden Files")

---

## 🔍 إذا لم تحل المشكلة

### تحقق 1: هل ملف .htaccess موجود؟

في cPanel → File Manager:
- اضغط على Settings (أعلى اليمين)
- فعّل "Show Hidden Files (dotfiles)"
- تحقق من وجود `.htaccess` في `public_html/`

### تحقق 2: هل mod_rewrite مُفعّل؟

**الطريقة الأولى - عبر cPanel:**
1. اذهب إلى cPanel → Software → MultiPHP INI Editor
2. أو cPanel → Software → Select PHP Version
3. تأكد من تفعيل mod_rewrite

**الطريقة الثانية - اتصل بالدعم الفني:**
اطلب منهم تفعيل `mod_rewrite` لحسابك

### تحقق 3: الصلاحيات

تأكد من صلاحيات الملف:
```bash
# في Terminal (SSH) أو File Manager
chmod 644 .htaccess
```

في cPanel → File Manager:
- انقر بالزر الأيمن على `.htaccess`
- اختر "Change Permissions"
- اجعلها `644` (Owner: Read+Write, Group: Read, World: Read)

---

## 🛠️ حلول بديلة

### الحل البديل 1: تبسيط .htaccess

إذا لم يعمل الملف الحالي، جرّب هذا الإصدار المبسط:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

ErrorDocument 404 /index.html
```

احفظه كـ `.htaccess` وارفعه.

### الحل البديل 2: إنشاء ملف php.ini مخصص

بعض الاستضافات تتطلب:
```ini
# php.ini في public_html/
suhosin.executor.include.whitelist = "phar"
```

---

## ✅ اختبار بعد الحل

بعد رفع `.htaccess`:

1. **امسح Cache المتصفح** (Ctrl+Shift+R أو Cmd+Shift+R)
2. **جرّب الروابط:**
   - ✅ https://ground-eg.com/services
   - ✅ https://ground-eg.com/about
   - ✅ https://ground-eg.com/contact
   - ✅ https://ground-eg.com/projects

3. **تحقق من Console** (F12 في المتصفح)
   - لا يجب أن تظهر أخطاء 404

---

## 🆘 إذا استمرت المشكلة

### الخيار 1: اتصل بالدعم الفني
أخبرهم:
> "أحتاج تفعيل mod_rewrite وتمكين .htaccess لـ React SPA على حسابي"

### الخيار 2: استخدم nginx بدلاً من Apache
إذا كان السيرفر يدعم nginx:
```nginx
# nginx.conf
location / {
    try_files $uri $uri/ /index.html;
}
```

### الخيار 3: استخدام Hash Router (حل مؤقت)
في React Router - غيّر من BrowserRouter إلى HashRouter:
```javascript
// في App.jsx
import { HashRouter as Router } from 'react-router-dom'

// بدلاً من
// import { BrowserRouter as Router } from 'react-router-dom'
```
⚠️ لكن هذا سيجعل الروابط مثل: `https://ground-eg.com/#/services`

---

## 📋 Checklist النهائي

- [ ] ملف `.htaccess` موجود في `public_html/`
- [ ] `.htaccess` ظاهر (Show Hidden Files مُفعّل)
- [ ] صلاحيات `.htaccess` هي `644`
- [ ] `mod_rewrite` مُفعّل على السيرفر
- [ ] مسح cache المتصفح
- [ ] اختبار الروابط المختلفة

---

## 🎯 الحل الأمثل (موصى به)

### للتأكد من أن كل شيء يعمل:

1. **ارفع ملف `.htaccess` الجديد** من `dist/`
2. **امسح cache cPanel** (إن وُجد)
3. **امسح cache المتصفح**
4. **اختبر الرابط:** https://ground-eg.com/services

**يجب أن يعمل الآن! ✨**

---

## 📞 للدعم

إذا لم تحل المشكلة، أرسل:
1. لقطة شاشة من File Manager تظهر `.htaccess`
2. لقطة شاشة من Console (F12) عند الخطأ
3. اسم شركة الاستضافة (لمعرفة الإعدادات الخاصة)
