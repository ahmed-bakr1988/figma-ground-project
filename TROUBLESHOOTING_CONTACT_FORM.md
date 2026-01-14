# دليل استكشاف الأخطاء - نموذج التواصل

## المشاكل الشائعة والحلول

### 1. رسالة "حدث خطأ أثناء الإرسال"

#### المتطلبات الأساسية:
- ✅ يجب أن تكون خادم Laravel يعمل على `http://localhost:8000`
- ✅ يجب أن تكون قاعدة البيانات متصلة ومهيأة
- ✅ يجب أن تكون ملف `.env` الخاص بـ Frontend يحتوي على:
```env
VITE_API_URL=http://localhost:8000/api
```

#### خطوات التشخيص:

**الخطوة 1: تحقق من الخادم الخلفي**
```bash
# في مجلد backend
php artisan serve

# يجب أن تظهر رسالة "started server on 127.0.0.1:8000"
```

**الخطوة 2: اختبر الاتصال مباشرة**

افتح متصفح وذهب إلى:
```
http://localhost:8000/api/health
```

يجب أن ترى استجابة JSON:
```json
{
  "success": true,
  "message": "API is running",
  "data": {
    "status": "healthy",
    "version": "v1",
    "timestamp": "2026-01-12T10:30:00+00:00"
  }
}
```

إذا رأيت خطأ 404 أو رفض الاتصال، فالخادم الخلفي لا يعمل.

**الخطوة 3: افتح Browser Developer Tools (F12)**

1. اذهب إلى تبويب `Console` لترى أي رسائل خطأ
2. اذهب إلى تبويب `Network` وحاول إرسال النموذج
3. ابحث عن الطلب `POST /api/contact/message`
4. انظر إلى Status Code:
   - **500**: خطأ في الخادم (اتصل بـ Laravel logs)
   - **422**: خطأ Validation (البيانات المرسلة غير صحيحة)
   - **CORS Error**: مشكلة في إعدادات CORS
   - **0 (blocked)**: مشكلة CORS من المتصفح

### 2. متطلبات البيانات

تأكد من أن جميع الحقول تستوفي المتطلبات:

| الحقل | الحد الأدنى | الحد الأقصى | ملاحظات |
|-------|-----------|-----------|--------|
| name | 2 حرف | 255 حرف | **مطلوب** |
| email | صحيح | 255 حرف | **مطلوب** |
| phone | - | 20 حرف | اختياري |
| subject | 1 حرف | 500 حرف | **مطلوب** |
| message | **10 أحرف** | 5000 حرف | **مطلوب** |

**❌ خطأ شائع:**
```javascript
// هذا سيفشل - الرسالة أقل من 10 أحرف
const data = {
  message: "مرحبا" // 5 أحرف فقط
};
```

**✅ الصيح:**
```javascript
// هذا سيعمل - الرسالة أكثر من 10 أحرف
const data = {
  message: "مرحبا، أنا مهتم بخدماتكم" // 27 حرف
};
```

### 3. إعدادات البريد الإلكتروني

إذا كانت الرسائل تُحفظ لكن لا تُرسل بريد:

1. تحقق من ملف `.env` في مجلد backend:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="info@ground-eg.com"
MAIL_ADMIN_EMAIL="info@ground-eg.com"
```

2. إذا كنت تستخدم Gmail:
   - استخدم "كلمة مرور التطبيقات" (App Password) وليس كلمة المرور العادية
   - https://support.google.com/accounts/answer/185833

3. للتطوير (عدم إرسال البريد فعلاً):
```env
MAIL_MAILER=log
```

### 4. أدوات التصحيح

#### Console Browser (F12 → Console)
```javascript
// اختبر الاتصال مباشرة
const testConnection = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/health');
    console.log(await response.json());
  } catch (e) {
    console.error('Connection Error:', e);
  }
};
testConnection();
```

#### Network Tab (F12 → Network)
1. افتح Network tab
2. أرسل النموذج
3. ابحث عن الطلب `contact/message`
4. انظر إلى:
   - Request Headers (تحقق من القيم المرسلة)
   - Response (اقرأ رسالة الخطأ من الخادم)
   - Status Code

### 5. مشاكل وحلول شائعة

| المشكلة | الحل |
|--------|------|
| Network error / CORS blocked | تأكد أن Backend يعمل على http://localhost:8000 |
| 422 Validation Error | تحقق من أن الرسالة أكثر من 10 أحرف |
| 500 Server Error | اقرأ backend/storage/logs/laravel.log |
| البريد لا يُرسل | تحقق من إعدادات MAIL في .env |
| "Unauthenticated" خطأ | الـ API endpoint لا يتطلب Authentication |

### 6. مشاهدة Logs

#### Frontend Logs
- اضغط F12 واذهب إلى Console
- ستظهر رسائل مثل "جارٍ إرسال البيانات: {...}"

#### Backend Logs
```bash
# في مجلد backend
tail -f storage/logs/laravel.log

# أو في Windows
type storage\logs\laravel.log
```

### 7. اختبار يدوي مع Postman

1. افتح Postman
2. اختر POST
3. اكتب الرابط: `http://localhost:8000/api/contact/message`
4. في تبويب Headers أضف:
   ```
   Content-Type: application/json
   Accept: application/json
   Accept-Language: ar
   ```
5. في Body اختر raw → JSON:
```json
{
  "name": "أحمد محمد",
  "email": "ahmad@example.com",
  "phone": "01234567890",
  "subject": "استفسار عن الخدمات",
  "message": "السلام عليكم، أنا مهتم بمعرفة المزيد عن خدماتكم في مجال حماية المباني من الصواعق",
  "message_type": "general",
  "source_page": "test",
  "preferred_language": "ar"
}
```
6. اضغط Send
7. يجب أن ترى استجابة 201 مع البيانات المحفوظة

### 8. اختبر الآن

```bash
# 1. تأكد أن npm dependencies مثبتة
npm install

# 2. أنشئ ملف .env إذا لم تنشئه بعد
# انسخ من .env.example

# 3. ابدأ development server
npm run dev

# 4. الآن اختبر النموذج
```

---

## الخطوات التالية إذا استمرت المشكلة

1. **افتح File → Logs في Browser DevTools** واقرأ الأخطاء
2. **اقرأ Backend Logs:** `tail -f backend/storage/logs/laravel.log`
3. **جرب Postman** للتأكد من أن الـ API يعمل
4. **تحقق من CORS** في backend config

---

**تاريخ آخر تحديث:** 12 يناير 2026
