# 🔍 تشخيص مشكلة CORS - دليل عملي

## الخطأ الذي تراه

```
Cross-Origin Request Blocked: The Same Origin Policy disallows 
reading the remote resource at http://localhost:8000/api/contact/message. 
(Reason: CORS header 'Access-Control-Allow-Origin' does not match 'http://localhost:5173').
```

---

## 🎯 خطوات التشخيص السريع

### الخطوة 1: افتح DevTools
```
اضغط F12 أو Ctrl+Shift+I
```

### الخطوة 2: اذهب إلى Network Tab

1. في DevTools افتح **Network** tab
2. شغّل وحدة تصفية (Filter):
   - اكتب: `contact/message`
   - أو اكتب: `api`

### الخطوة 3: أرسل النموذج

1. أملء نموذج التواصل
2. اضغط "إرسال"
3. يجب أن ترى request في Network tab

### الخطوة 4: فحص Request

انقر على الـ request وفتش:

#### في Headers Tab:
```
Request Headers:
  POST /api/contact/message HTTP/1.1
  Host: localhost:8000
  Origin: http://localhost:5173
  Content-Type: application/json
  Accept-Language: ar
```

#### في Response Tab:
```
Response Headers:
  Access-Control-Allow-Origin: http://localhost:5173  ✅ يجب أن يكون موجود
  Access-Control-Allow-Methods: GET, POST, OPTIONS
  Access-Control-Allow-Headers: *
  Access-Control-Allow-Credentials: true
```

---

## ❌ الخطأ الشائع #1: Header غير موجود

**في Response Headers لا ترى:**
```
Access-Control-Allow-Origin: 
```

**السبب:** Backend لم يعد Config

**الحل:**
```bash
cd backend
php artisan config:clear
php artisan config:cache
php artisan serve
```

---

## ❌ الخطأ الشائع #2: Origin مختلف

**ترى:**
```
Access-Control-Allow-Origin: http://localhost:8000
```

**لكن طلبت من:**
```
http://localhost:5173
```

**السبب:** FRONTEND_URL في .env لا تتطابق

**الحل:**
```env
# backend/.env
FRONTEND_URL=http://localhost:5173,http://localhost:3000
```

---

## ✅ الفحص الناجح

### في Network Tab ستشاهد:

**Status Code:** `201` (Created) ✅

**Response Headers:**
```
Access-Control-Allow-Origin: http://localhost:5173 ✅
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS ✅
Access-Control-Allow-Credentials: true ✅
```

**Response Body:**
```json
{
  "success": true,
  "message": "تم إرسال رسالتك بنجاح",
  "data": {
    "id": 1,
    "name": "أحمد",
    "email": "ahmed@example.com"
  }
}
```

### في Browser Console:
```javascript
جارٍ إرسال البيانات: {name: "...", email: "..."}
// ثم رسالة النجاح تظهر على الشاشة
```

---

## 🧪 اختبار يدوي في Console

نسخ والصق هذا الكود في **Console** (F12):

```javascript
// اختبار الاتصال بـ API
fetch('http://localhost:8000/api/contact/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar'
  },
  credentials: 'include',  // مهم للـ cookies
  body: JSON.stringify({
    name: 'أحمد محمد',
    email: 'test@example.com',
    phone: '5551234567',
    subject: 'اختبار',
    message: 'هذه رسالة تجربة كاملة لاختبار الـ CORS والـ API',
    message_type: 'general',
    source_page: 'console_test',
    preferred_language: 'ar'
  })
})
.then(response => {
  console.log('Status:', response.status);
  console.log('Headers:', {
    'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
    'Content-Type': response.headers.get('Content-Type')
  });
  return response.json();
})
.then(data => {
  console.log('✅ النجاح:', data);
})
.catch(error => {
  console.error('❌ الخطأ:', error);
});
```

**النتيجة المتوقعة:**
```
Status: 201
Headers: {
  Access-Control-Allow-Origin: http://localhost:5173
  Content-Type: application/json
}
✅ النجاح: {success: true, message: "...", data: {...}}
```

---

## 🛠️ قائمة التشخيص

```
Backend يعمل؟
  [ ] php artisan serve يعمل
  [ ] تصل إلى http://localhost:8000/api/health
  
FRONTEND_URL صحيح؟
  [ ] فتح backend/.env
  [ ] تحقق: FRONTEND_URL=http://localhost:5173,http://localhost:3000
  
Config تم تحميله؟
  [ ] جرّب: php artisan config:clear
  [ ] ثم: php artisan serve من جديد
  
Request صحيح؟
  [ ] افتح Network tab
  [ ] تحقق من Origin header = http://localhost:5173 أو 3000
  
Response صحيح؟
  [ ] تحقق من Access-Control-Allow-Origin header
  [ ] يجب أن يطابق Origin
  [ ] يجب أن يكون Status = 201 (أو الخطأ الحقيقي 422)
```

---

## 🔐 معلومات إضافية

### CORS Headers الكاملة:

```
Request:
  Origin: http://localhost:5173          # من أين الطلب
  
Response:
  Access-Control-Allow-Origin: *         # الـ origins المسموحة
  Access-Control-Allow-Methods: GET,POST  # الـ methods المسموحة
  Access-Control-Allow-Headers: *         # الـ headers المسموح إضافتها
  Access-Control-Allow-Credentials: true  # السماح بـ cookies
  Access-Control-Max-Age: 86400           # مدة التخزين المؤقت
```

### لماذا CORS؟

> CORS = Cross-Origin Resource Sharing
> 
> المتصفح يمنع الطلبات من domain واحد إلى domain آخر للأمان.
> هذا يسمى "Same-Origin Policy"
>
> للسماح بطلبات معينة، يرسل Backend headers خاصة.

---

## ✅ الحل النهائي

```bash
# 1. تأكد أن FRONTEND_URL صحيح
cat backend/.env | grep FRONTEND_URL
# النتيجة: FRONTEND_URL=http://localhost:5173,http://localhost:3000

# 2. امسح الـ cache
cd backend
php artisan config:clear

# 3. شغّل من جديد
php artisan serve

# 4. افتح http://localhost:5173
# 5. جرّب الإرسال
# 6. افتح F12 وشوف Network tab
# 7. يجب أن ترى Status 201 الآن ✅
```

---

## 📞 لو ما زال يظهر الخطأ

**في Console اكتب:**
```javascript
fetch('http://localhost:8000/api/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend يرد:', d))
  .catch(e => console.error('❌ Backend لا يرد:', e))
```

**إذا قال Backend لا يرد = شغّل Laravel serve**

---

**الآن جاهز للاختبار! 🎉**
