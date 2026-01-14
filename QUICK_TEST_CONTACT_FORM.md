# تعليمات الاختبار السريع - نموذج التواصل

## قبل البدء (تسجيل الدخول الأول)

### 1. إعداد قاعدة البيانات

```bash
cd backend
php artisan migrate --fresh --seed
```

### 2. إعدادات البريد (اختياري للتطوير)

إذا كنت تريد اختبار إرسال البريد بفعل:

**في ملف `backend/.env`:**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-gmail@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="info@ground-eg.com"
MAIL_ADMIN_EMAIL="info@ground-eg.com"
```

إذا أردت اختبار دون إرسال بريد فعلي:
```env
MAIL_MAILER=log
```

## اختبار النموذج

### الطريقة 1: الاختبار من المتصفح

1. **ابدأ Backend Server:**
```bash
cd backend
php artisan serve
# سيعمل على http://localhost:8000
```

2. **ابدأ Frontend Server (في terminal جديد):**
```bash
npm run dev
# سيعمل على http://localhost:5173
```

3. **افتح المتصفح:**
- اذهب إلى `http://localhost:5173`
- اذهب إلى أي صفحة بها نموذج تواصل (الصفحة الرئيسية، صفحة التواصل، إلخ)

4. **اختبر النموذج:**
```
الاسم: أحمد محمد
البريد: ahmed@example.com
رقم الهاتف: 01012345678
الموضوع: استفسار
الرسالة: مرحبا، أنا مهتم بخدماتكم بشدة جداً
```

5. **اضغط زر الإرسال**

### الطريقة 2: الاختبار من Postman

1. افتح Postman
2. اختر **POST** وأدخل: `http://localhost:8000/api/contact/message`
3. اذهب إلى **Headers** وأضف:
   ```
   Content-Type: application/json
   Accept: application/json
   Accept-Language: ar
   ```
4. اذهب إلى **Body** → **raw** → اختر **JSON**
5. ألصق:
```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "01012345678",
  "subject": "استفسار عن الخدمات",
  "message": "السلام عليكم، أنا مهتم بمعرفة المزيد عن خدماتكم في مجال حماية المباني من الصواعق",
  "message_type": "general",
  "source_page": "test",
  "preferred_language": "ar"
}
```
6. اضغط **Send**

### النتيجة المتوقعة

**الاستجابة الناجحة (201):**
```json
{
  "success": true,
  "message": "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.",
  "data": {
    "id": 1
  }
}
```

**استجابة خطأ (422 - Validation):**
```json
{
  "success": false,
  "message": "فشل التحقق من البيانات",
  "errors": {
    "message": ["الرسالة قصيرة جداً"]
  }
}
```

## التحقق من البيانات المحفوظة

### من قاعدة البيانات (phpMyAdmin أو MySQL)

```sql
-- عرض جميع رسائل التواصل
SELECT * FROM contact_messages;

-- عرض آخر 10 رسائل
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10;

-- عرض رسائل محددة
SELECT name, email, message, created_at FROM contact_messages 
WHERE created_at >= '2026-01-12 00:00:00'
ORDER BY created_at DESC;
```

### من Backend Logs

```bash
# شاهد جميع السجلات
tail -f backend/storage/logs/laravel.log

# ابحث عن إرسال البريد
grep -i "email\|mail" backend/storage/logs/laravel.log
```

## معالجة الأخطاء الشائعة

### 1. "خطأ CORS"
```
Access to XMLHttpRequest blocked by CORS policy
```
**الحل:** تأكد أن `FRONTEND_URL` في backend/.env = `http://localhost:5173`

### 2. "حدث خطأ أثناء الإرسال"
- تحقق من Browser Console (F12)
- شغّل Backend Server: `php artisan serve`
- اقرأ Backend Logs: `tail -f storage/logs/laravel.log`

### 3. "الرسالة قصيرة جداً"
```
message: ["الرسالة قصيرة جداً"]
```
**الحل:** الرسالة يجب أن تكون أكثر من 10 أحرف

### 4. "البريد لم يُرسل"
- تحقق من MAIL_MAILER في .env
- إذا كان `smtp` تأكد من البيانات:
  - MAIL_USERNAME و MAIL_PASSWORD صحيحة
  - استخدم Gmail App Password إذا كان Gmail
- إذا كان `log` ابحث في `storage/logs/laravel.log`

## ملفات مهمة

```
.env                                    # إعدادات Frontend
backend/.env                            # إعدادات Backend
backend/storage/logs/laravel.log        # سجلات الأخطاء
src/services/api.js                     # API Service
src/services/hooks.js                   # Custom Hooks
src/components/sections/HeroSection.jsx
src/pages/ContactPage.jsx
src/components/sections/ContactSection.jsx
```

## الخطوات النهائية

- ✅ تأكد أن كلا الخادمين يعمل (Frontend + Backend)
- ✅ تأكد من ملف `.env` في كلا المجلدين
- ✅ اختبر إرسال رسالة من المتصفح
- ✅ تحقق من البيانات في قاعدة البيانات
- ✅ إذا أردت بريد، تحقق من سجلات البريد

---

**تم إنشاؤه:** 12 يناير 2026

**للمساعدة:** اقرأ [TROUBLESHOOTING_CONTACT_FORM.md](./TROUBLESHOOTING_CONTACT_FORM.md)
