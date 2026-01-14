/**
 * ================================
 * خدمة الـ API للتواصل مع Laravel Backend
 * ================================
 * 
 * هذا الملف يوفر طبقة تجريدية للتواصل مع الـ API
 * يمكن استخدامه في أي مكان في تطبيق React
 */

import axios from 'axios';

// ================================
// إعداد Axios
// ================================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // مهم لتعريف الطلب كـ AJAX
  },
  withCredentials: false, // نستخدم Bearer Token فقط، لا حاجة للـ Cookies
  // هذا يتجنب مشكلة CSRF 419 مع Sanctum stateful domains
});

// ================================
// Interceptors
// ================================

// إضافة Token تلقائياً لكل طلب
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // إضافة اللغة الحالية
    const language = localStorage.getItem('i18nextLng') || 'ar';
    config.headers['Accept-Language'] = language;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// معالجة الاستجابات والأخطاء
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // معالجة خطأ 401 (غير مصرح)
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // معالجة خطأ 503 (صيانة)
    if (error.response?.status === 503) {
      window.location.href = '/maintenance';
    }
    
    return Promise.reject(error);
  }
);

// ================================
// خدمات المصادقة
// ================================
export const authService = {
  // تسجيل مستخدم جديد
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    if (response.data.success) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // تسجيل الدخول
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('auth_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // تسجيل الخروج
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  // جلب بيانات المستخدم الحالي
  getUser: async () => {
    const response = await api.get('/user');
    return response.data;
  },

  // تحديث الملف الشخصي
  updateProfile: async (data) => {
    const response = await api.put('/user/profile', data);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // تغيير كلمة المرور
  changePassword: async (currentPassword, newPassword, confirmation) => {
    const response = await api.post('/user/change-password', {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmation,
    });
    return response.data;
  },

  // نسيت كلمة المرور
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // إعادة تعيين كلمة المرور
  resetPassword: async (token, email, password, confirmation) => {
    const response = await api.post('/auth/reset-password', {
      token,
      email,
      password,
      password_confirmation: confirmation,
    });
    return response.data;
  },

  // التحقق من حالة تسجيل الدخول
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  // جلب المستخدم من التخزين المحلي
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// ================================
// خدمات الخدمات (Services)
// ================================
export const servicesService = {
  // جلب جميع الخدمات
  getAll: async (params = {}) => {
    const response = await api.get('/services', { params });
    return response.data;
  },

  // جلب الخدمات المميزة
  getFeatured: async () => {
    const response = await api.get('/services/featured');
    return response.data;
  },

  // جلب خدمة واحدة
  getBySlug: async (slug) => {
    const response = await api.get(`/services/${slug}`);
    return response.data;
  },
};

// ================================
// خدمات المشاريع
// ================================
export const projectsService = {
  // جلب جميع المشاريع
  getAll: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // جلب المشاريع المميزة
  getFeatured: async () => {
    const response = await api.get('/projects/featured');
    return response.data;
  },

  // جلب مشروع واحد
  getBySlug: async (slug) => {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  },

  // جلب المشاريع ذات الصلة
  getRelated: async (slug) => {
    const response = await api.get(`/projects/${slug}/related`);
    return response.data;
  },

  // جلب الإحصائيات
  getStats: async () => {
    const response = await api.get('/projects/stats');
    return response.data;
  },
};

// ================================
// خدمات المقالات
// ================================
export const blogService = {
  // جلب جميع المقالات
  getAll: async (params = {}) => {
    const response = await api.get('/blog', { params });
    return response.data;
  },

  // جلب المقالات المميزة
  getFeatured: async () => {
    const response = await api.get('/blog/featured');
    return response.data;
  },

  // جلب أحدث المقالات
  getLatest: async () => {
    const response = await api.get('/blog/latest');
    return response.data;
  },

  // جلب مقال واحد
  getBySlug: async (slug) => {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  },

  // جلب المقالات ذات الصلة
  getRelated: async (slug) => {
    const response = await api.get(`/blog/${slug}/related`);
    return response.data;
  },

  // جلب الفئات
  getCategories: async () => {
    const response = await api.get('/blog/categories');
    return response.data;
  },
};

// ================================
// خدمات الأسئلة الشائعة
// ================================
export const faqService = {
  // جلب جميع الأسئلة
  getAll: async (params = {}) => {
    const response = await api.get('/faqs', { params });
    return response.data;
  },

  // جلب الفئات
  getCategories: async () => {
    const response = await api.get('/faqs/categories');
    return response.data;
  },

  // إرسال تقييم
  sendFeedback: async (id, helpful) => {
    const response = await api.post(`/faqs/${id}/feedback`, { helpful });
    return response.data;
  },
};

// ================================
// خدمات التواصل
// ================================
export const contactService = {
  // إرسال رسالة تواصل
  sendMessage: async (data) => {
    const response = await api.post('/contact/message', data);
    return response.data;
  },

  // طلب عرض سعر
  requestQuote: async (data) => {
    const response = await api.post('/contact/quote', data);
    return response.data;
  },

  // الاشتراك في النشرة
  subscribeNewsletter: async (email, name = null) => {
    const response = await api.post('/contact/newsletter/subscribe', { email, name });
    return response.data;
  },

  // جلب طلباتي (للمستخدم المسجل)
  getMyQuotes: async (params = {}) => {
    const response = await api.get('/my-quotes', { params });
    return response.data;
  },

  // جلب تفاصيل طلب
  getQuoteDetails: async (id) => {
    const response = await api.get(`/my-quotes/${id}`);
    return response.data;
  },
};

// ================================
// تصدير الـ API instance للاستخدام المباشر
// ================================
export default api;
