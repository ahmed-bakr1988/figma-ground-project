# 🧪 دليل اختبار إرسال النماذج - Form Submission Testing Guide

## المحتويات
- [1. التحضير الأساسي](#1-التحضير-الأساسي)
- [2. اختبار الاتصال بالـ API](#2-اختبار-الاتصال-بالـ-api)
- [3. اختبار الأخطاء الشائعة](#3-اختبار-الأخطاء-الشائعة)
- [4. اختبار الإرسال الفعلي](#4-اختبار-الإرسال-الفعلي)
- [5. التحقق من البيانات في قاعدة البيانات](#5-التحقق-من-البيانات-في-قاعدة-البيانات)

---

## 1. التحضير الأساسي

### الخطوة 1: بدء Backend
```bash
# افتح Terminal جديد
cd backend
php artisan serve
```

✅ تأكد من ظهور:
```
Laravel development server started at [http://127.0.0.1:8000]
```

### الخطوة 2: بدء Frontend
```bash
# افتح Terminal آخر
npm run dev
```

✅ تأكد من ظهور:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

### الخطوة 3: التحقق من الاتصال
افتح صفحة `http://localhost:5173` وافتح **F12** (DevTools)

---

## 2. اختبار الاتصال بالـ API

### في خانة Console (F12):
```javascript
// اختبر هل الـ API يرد
fetch('http://localhost:8000/api/health')
  .then(r => r.json())
  .then(d => console.log('API يرد:', d))
  .catch(e => console.error('خطأ في الاتصال:', e));
```

**النتيجة المتوقعة:**
```
API يرد: { success: true }
```

---

## 3. اختبار الأخطاء الشائعة

### ❌ الخطأ #1: "لا يمكن الاتصال بالخادم"

**السبب:** Backend لا يعمل

**الحل:**
```bash
# في terminal Backend
php artisan serve
```

---

### ❌ الخطأ #2: "بيانات غير صحيحة"

**المتطلبات:**
| الحقل | الحد الأدنى | الحد الأقصى | ملاحظات |
|-------|-----------|-----------|--------|
| name | 2 حرف | 255 | مطلوب |
| email | 5 أحرف | 255 | صيغة البريد الصحيحة |
| phone | 1 | 20 | اختياري |
| message | **10 أحرف** | 1000 | **مهم جداً** |

**الحل:**
```javascript
// ✅ بيانات صحيحة
const data = {
  name: "أحمد محمد",           // ✅ أكثر من 2 حرف
  email: "test@example.com",   // ✅ بريد صحيح
  phone: "5551234567",         // ✅ رقم صحيح
  subject: "استفسار",         // ✅
  message: "أريد معلومات عن الخدمات التي توفرها شركتكم",  // ✅ أكثر من 10 أحرف
  message_type: "general",
  source_page: "hero_section",
  preferred_language: "ar"
};
```

---

### ❌ الخطأ #3: "خطأ في الخادم"

**السبب:** قد تكون المشكلة في:
- قاعدة البيانات لم تُهيأ
- بعض الأعمدة مفقودة في الجدول

**الحل:**
```bash
# شغّل الـ migrations
cd backend
php artisan migrate --fresh --seed
```

---

## 4. اختبار الإرسال الفعلي

### الطريقة 1️⃣: من المتصفح (الأسهل)

1. افتح `http://localhost:5173`
2. اذهب إلى نموذج التواصل (في Hero Section أو Contact Page)
3. **افتح F12 ثم اذهب إلى Console**
4. أملء النموذج ببيانات صحيحة:
   ```
   الاسم: أحمد محمد
   البريد: test@example.com
   الهاتف: 5551234567
   الخدمة: اختر أي خدمة
   الرسالة: أرسل رسالة أكثر من 10 أحرف
   ```
5. اضغط "إرسال"

### في Console سترى:
```javascript
// قبل الإرسال
جارٍ إرسال البيانات: {
  name: "أحمد محمد",
  email: "test@example.com",
  ...
}

// عند النجاح
// سيظهر في Console:
✅ رسالة النجاح
```

### عند الخطأ سترى:
```javascript
خطأ أثناء إرسال النموذج: {
  status: 422,          // 422 = خطأ في البيانات
  message: "...",       // رسالة الخطأ
  errors: { ... }       // تفاصيل الأخطاء
}
```

---

### الطريقة 2️⃣: من Postman (للمطورين)

#### التحضير:
1. افتح **Postman**
2. إنشء request جديد

#### في Postman:
```
METHOD: POST
URL: http://localhost:8000/api/contact/message

Headers:
  Content-Type: application/json
  Accept: application/json
  Accept-Language: ar

Body (JSON):
{
  "name": "أحمد محمد",
  "email": "test@example.com",
  "phone": "5551234567",
  "subject": "استفسار عن الخدمات",
  "message": "أرغب في الاستفسار عن أسعار خدماتكم وتوفر الضمان",
  "message_type": "general",
  "source_page": "hero_section",
  "preferred_language": "ar"
}
```

#### النتيجة المتوقعة ✅:
```json
{
  "success": true,
  "message": "تم حفظ الرسالة بنجاح",
  "data": {
    "id": 1,
    "name": "أحمد محمد",
    "email": "test@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### في حالة الخطأ ❌:
```json
{
  "success": false,
  "message": "خطأ في التحقق من الصحة",
  "errors": {
    "message": ["الرسالة مطلوبة وتجب أن تكون أكثر من 10 أحرف"]
  }
}
```

---

## 5. التحقق من البيانات في قاعدة البيانات

### عبر Terminal:
```bash
# ادخل إلى MySQL
mysql -u root -p ground_protection

# عرض جميع الرسائل المرسلة
SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC;

# عرض رسالة واحدة بالتفاصيل
SELECT * FROM contact_messages WHERE id = 1;

# عدد الرسائل
SELECT COUNT(*) as total_messages FROM contact_messages;
```

### عبر Filament Admin:
1. افتح `http://localhost:8000/admin`
2. سجّل الدخول برسالة بيانات Admin
3. اضغط على "Contact Messages"
4. يجب أن ترى الرسائل المرسلة

---

## 6. معالجة الأخطاء الشائعة

### مشكلة: الخطأ 405 (Method Not Allowed)

```
❌ Error: 405 Method Not Allowed
```

**السبب:** الـ route خاطئ

**الحل:**
```bash
# تحقق من الـ routes موجودة
php artisan route:list | grep contact
```

---

### مشكلة: الخطأ 419 (Token Mismatch)

```
❌ Error: 419 Mismatch CSRF
```

**السبب:** عادة لا يحدث لأننا نستخدم API، لكن تأكد من:
- `Accept-Language` موجود في Headers
- Bearer Token صحيح (إذا كانت الرسالة محمية)

---

### مشكلة: البيانات تُرسل لكن لا تُحفظ

**السبب:** المشاكل المحتملة:
1. Database connection خاطئة
2. الجدول مفقود

**الحل:**
```bash
# تحقق من الـ connection
cd backend
php artisan tinker

# اختبر الاتصال
>>> DB::connection()->getPdo();
// إذا لم يعطي خطأ = الاتصال صحيح

# اختبر إدراج سجل يدوياً
>>> use App\Models\ContactMessage;
>>> ContactMessage::create(['name'=>'test','email'=>'test@test.com','message'=>'this is a test message for contact form']);
```

---

## 7. Logging & Debugging

### عرض logs الـ Laravel:

```bash
# في terminal Backend أثناء تشغيل artisan serve
# سترى logs مباشرة
```

### أو اقرأ الملف:
```bash
cd backend
tail -f storage/logs/laravel.log
```

### في Browser Console (F12):
```javascript
// سترى رسالة التشخيص الكاملة عند الخطأ:
خطأ أثناء إرسال النموذج: {
  status: 422,
  message: "خطأ في التحقق من الصحة",
  errors: {
    message: ["الرسالة مطلوبة وتجب أن تكون أكثر من 10 أحرف"],
    email: ["البريد الإلكتروني يجب أن يكون بريداً صحيحاً"]
  }
}
```

---

## ✅ Checklist النجاح

- [ ] Backend يعمل على `http://localhost:8000`
- [ ] Frontend يعمل على `http://localhost:5173`
- [ ] أستطيع الاتصال بـ API من Console
- [ ] النموذج يقبل بيانات صحيحة (message > 10 حروف)
- [ ] الرسالة تُحفظ في قاعدة البيانات
- [ ] أرى رسالة نجاح بعد الإرسال
- [ ] البريد الإلكتروني يُرسل إلى admin

---

## 📞 الدعم

إذا واجهت مشكلة:

1. **افتح Browser Console (F12)**
2. **انسخ رسالة الخطأ بالكامل**
3. **اتبع الخطوات أعلاه** وفقاً لنوع الخطأ
4. **تحقق من Backend Terminal** هل يوجد خطأ هناك
5. **اقرأ `backend/storage/logs/laravel.log`**

---

**آخر تحديث:** 2024-01-15
**الحالة:** ✅ جاهز للاختبار
