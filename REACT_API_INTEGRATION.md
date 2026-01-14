# دليل ربط React مع Laravel API

## ✅ ما تم إنجازه

تم ربط تطبيق React بالكامل مع Laravel Backend API:

### 1. خدمات API ([src/services/](src/services/))

#### [api.js](src/services/api.js)
خدمة Axios متكاملة تشمل:
- ✅ Axios instance مع baseURL: `http://localhost:8000/api`
- ✅ Request/Response interceptors للتعامل مع الـ tokens
- ✅ خدمات Authentication (login, register, logout, getUser)
- ✅ خدمات Services API
- ✅ خدمات Projects API
- ✅ خدمات Blog API
- ✅ خدمات FAQ API
- ✅ خدمات Contact API

#### [AuthContext.jsx](src/services/AuthContext.jsx)
React Context للمصادقة:
- ✅ `AuthProvider` لإدارة حالة المستخدم
- ✅ `useAuth` hook للوصول لحالة المصادقة
- ✅ `ProtectedRoute` component لحماية الصفحات
- ✅ تخزين token في localStorage
- ✅ تحديث axios headers تلقائياً

#### [hooks.js](src/services/hooks.js)
Custom hooks للتفاعل مع الـ API:
- ✅ `useFetch` - Hook عام لجلب البيانات
- ✅ `useServices` - جلب الخدمات
- ✅ `useProjects` - جلب المشاريع
- ✅ `useBlogPosts` - جلب المقالات
- ✅ `useFaqs` - جلب الأسئلة الشائعة
- ✅ `useContactForm` - إرسال رسائل التواصل
- ✅ `useQuoteForm` - طلب عروض الأسعار
- ✅ `usePagination` - إدارة pagination

### 2. صفحات المصادقة

#### [LoginPage.jsx](src/pages/LoginPage.jsx)
- ✅ نموذج تسجيل الدخول
- ✅ عرض أخطاء التحقق
- ✅ دعم Remember Me
- ✅ رابط نسيت كلمة المرور

#### [RegisterPage.jsx](src/pages/RegisterPage.jsx)
- ✅ نموذج التسجيل (الاسم، البريد، الجوال، كلمة المرور)
- ✅ عرض أخطاء التحقق لكل حقل
- ✅ تأكيد كلمة المرور
- ✅ الموافقة على الشروط

### 3. مكونات الواجهة

#### [UserMenu.jsx](src/components/common/UserMenu.jsx)
قائمة المستخدم تعرض:
- ✅ اسم المستخدم وصورته عند تسجيل الدخول
- ✅ قائمة منسدلة: (الإعدادات، طلباتي، تسجيل الخروج)
- ✅ أزرار Login/Register عند عدم تسجيل الدخول

#### [Navbar.jsx](src/components/layout/Navbar.jsx)
شريط التنقل الرئيسي:
- ✅ شريط علوي بمعلومات التواصل
- ✅ Logo + روابط الصفحات
- ✅ مكون UserMenu
- ✅ LanguageSwitcher

### 4. تحديثات App

#### [main.jsx](src/main.jsx)
- ✅ تغليف التطبيق بـ `AuthProvider`

#### [App.jsx](src/App.jsx)
- ✅ إضافة مسارات `/login` و `/register`

---

## 🚀 كيفية الاستخدام

### 1. تشغيل الـ Backend

```bash
cd backend
php artisan serve
```

الـ API يعمل على: `http://localhost:8000`

### 2. تشغيل الـ Frontend

```bash
npm install
npm run dev
```

التطبيق يعمل على: `http://localhost:5173`

---

## 📖 أمثلة الاستخدام

### استخدام AuthContext

```jsx
import { useAuth } from './services/AuthContext';

function MyComponent() {
  const { user, login, logout, loading } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>مرحباً {user.name}</p>
          <button onClick={logout}>تسجيل الخروج</button>
        </>
      ) : (
        <button onClick={() => login(email, password)}>تسجيل الدخول</button>
      )}
    </div>
  );
}
```

### استخدام Custom Hooks

```jsx
import { useServices, useBlogPosts } from './services/hooks';

function ServicesPage() {
  const { data: services, loading, error } = useServices();

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>حدث خطأ: {error}</div>;

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>{service.title}</div>
      ))}
    </div>
  );
}
```

### استخدام API مباشرة

```jsx
import { servicesService, contactService } from './services/api';

// جلب خدمة محددة
const service = await servicesService.getBySlug('lightning-protection');

// إرسال رسالة تواصل
await contactService.sendMessage({
  name: 'أحمد',
  email: 'ahmed@example.com',
  message: 'أريد الاستفسار عن خدماتكم'
});
```

### حماية صفحات معينة

```jsx
import { ProtectedRoute } from './services/AuthContext';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

---

## 🔧 تحديث الصفحات الحالية لاستخدام API

### مثال: تحديث ServicesPage

```jsx
import { useServices } from '../services/hooks';

function ServicesPage() {
  const { i18n } = useTranslation();
  const { data: services, loading, error } = useServices({
    featured: false,
    per_page: 12
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {services?.map((service, index) => (
        <ServiceCard 
          key={service.id} 
          service={{
            title: service.title[i18n.language],
            description: service.description[i18n.language],
            image: service.image_url,
            slug: service.slug
          }}
          index={index}
        />
      ))}
    </div>
  );
}
```

### مثال: تحديث ContactPage

```jsx
import { useContactForm } from '../services/hooks';

function ContactPage() {
  const { sendMessage, loading, success, error } = useContactForm();

  const handleSubmit = async (formData) => {
    await sendMessage(formData);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        subject: e.target.subject.value,
        message: e.target.message.value
      });
    }}>
      {/* Form fields */}
      {success && <p>تم إرسال رسالتك بنجاح!</p>}
      {error && <p>حدث خطأ: {error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'جاري الإرسال...' : 'إرسال'}
      </button>
    </form>
  );
}
```

---

## 🔄 التالي: تحديث الصفحات الحالية

لتفعيل الربط الكامل، يجب تحديث الصفحات التالية:

1. **ServicesPage.jsx** - استخدام `useServices()`
2. **ProjectsPage.jsx** - استخدام `useProjects()`
3. **BlogPage.jsx** - استخدام `useBlogPosts()`
4. **FAQPage.jsx** - استخدام `useFaqs()`
5. **ContactPage.jsx** - استخدام `useContactForm()`

---

## ⚙️ إعدادات API

يمكن تغيير رابط الـ API من ملف [api.js](src/services/api.js):

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

أو إنشاء ملف `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🐛 استكشاف الأخطاء

### CORS Error
تأكد من أن Laravel Backend يعمل وأن CORS معدة بشكل صحيح في [backend/config/cors.php](backend/config/cors.php)

### 401 Unauthorized
- تأكد من إرسال token في headers
- تحقق من أن token غير منتهي الصلاحية
- استخدم `useAuth()` للحصول على حالة المصادقة

### Network Error
- تأكد من أن Backend يعمل على `http://localhost:8000`
- تحقق من رابط الـ API في [api.js](src/services/api.js)

---

## 📚 موارد إضافية

- [Laravel API Documentation](backend/README.md)
- [Sanctum Documentation](https://laravel.com/docs/11.x/sanctum)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Context API](https://react.dev/reference/react/useContext)
