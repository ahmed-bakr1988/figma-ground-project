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
// خدمات لوحة التحكم (Admin)
// ================================

/**
 * طبقة الإدارة المركزية - Admin AJAX Layer
 * تدعم CRUD كامل لجميع الموارد مع RBAC
 * تستخدم adminApi (مسار /admin على web routes) بدلاً من api (مسار /api)
 */

// ================================
// إعداد Axios للإدارة (Web Routes)
// ================================
const adminApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false, // نستخدم Bearer Token فقط
});

// إضافة Token تلقائياً لطلبات الإدارة
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const language = localStorage.getItem('i18nextLng') || 'ar';
    config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => Promise.reject(error)
);

// معالجة الاستجابات والأخطاء للإدارة
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    if (error.response?.status === 503) {
      window.location.href = '/maintenance';
    }
    return Promise.reject(error);
  }
);

// إحصائيات لوحة التحكم
export const adminDashboardService = {
  getStats: async () => {
    const response = await adminApi.get('/admin/dashboard/stats');
    return response.data;
  },
  getRecentActivity: async () => {
    const response = await adminApi.get('/admin/dashboard/activity');
    return response.data;
  },
};

// إدارة الخدمات
export const adminServicesService = {
  getAll: async (params = {}) => {
    const response = await adminApi.get('/admin/services', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await adminApi.get(`/admin/services/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await adminApi.post('/admin/services', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await adminApi.put(`/admin/services/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await adminApi.delete(`/admin/services/${id}`);
    return response.data;
  },
  restore: async (id) => {
    const response = await adminApi.post(`/admin/services/${id}/restore`);
    return response.data;
  },
  toggleActive: async (id) => {
    const response = await adminApi.patch(`/admin/services/${id}/toggle-active`);
    return response.data;
  },
  toggleFeatured: async (id) => {
    const response = await adminApi.patch(`/admin/services/${id}/toggle-featured`);
    return response.data;
  },
};

// إدارة المشاريع
export const adminProjectsService = {
  getAll: async (params = {}) => {
    const response = await adminApi.get('/admin/projects', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await adminApi.get(`/admin/projects/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await adminApi.post('/admin/projects', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await adminApi.put(`/admin/projects/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await adminApi.delete(`/admin/projects/${id}`);
    return response.data;
  },
  restore: async (id) => {
    const response = await adminApi.post(`/admin/projects/${id}/restore`);
    return response.data;
  },
  toggleActive: async (id) => {
    const response = await adminApi.patch(`/admin/projects/${id}/toggle-active`);
    return response.data;
  },
  toggleFeatured: async (id) => {
    const response = await adminApi.patch(`/admin/projects/${id}/toggle-featured`);
    return response.data;
  },
};

// إدارة المقالات
export const adminBlogService = {
  getAll: async (params = {}) => {
    const response = await adminApi.get('/admin/blog-posts', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await adminApi.get(`/admin/blog-posts/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await adminApi.post('/admin/blog-posts', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await adminApi.put(`/admin/blog-posts/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await adminApi.delete(`/admin/blog-posts/${id}`);
    return response.data;
  },
  restore: async (id) => {
    const response = await adminApi.post(`/admin/blog-posts/${id}/restore`);
    return response.data;
  },
  togglePublished: async (id) => {
    const response = await adminApi.patch(`/admin/blog-posts/${id}/toggle-published`);
    return response.data;
  },
  toggleFeatured: async (id) => {
    const response = await adminApi.patch(`/admin/blog-posts/${id}/toggle-featured`);
    return response.data;
  },
};

// إدارة الأسئلة الشائعة
export const adminFaqService = {
  getAll: async (params = {}) => {
    const response = await adminApi.get('/admin/faqs', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await adminApi.get(`/admin/faqs/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await adminApi.post('/admin/faqs', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await adminApi.put(`/admin/faqs/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await adminApi.delete(`/admin/faqs/${id}`);
    return response.data;
  },
  restore: async (id) => {
    const response = await adminApi.post(`/admin/faqs/${id}/restore`);
    return response.data;
  },
  toggleActive: async (id) => {
    const response = await adminApi.patch(`/admin/faqs/${id}/toggle-active`);
    return response.data;
  },
  reorder: async (items) => {
    const response = await adminApi.post('/admin/faqs/reorder', { items });
    return response.data;
  },
};

// إدارة رسائل التواصل
export const adminContactService = {
  getAll: async (params = {}) => {
    const response = await adminApi.get('/admin/contact-messages', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await adminApi.get(`/admin/contact-messages/${id}`);
    return response.data;
  },
  updateStatus: async (id, status, adminNotes = null) => {
    const response = await adminApi.patch(`/admin/contact-messages/${id}/status`, {
      status,
      admin_notes: adminNotes,
    });
    return response.data;
  },
  addNotes: async (id, notes) => {
    const response = await adminApi.patch(`/admin/contact-messages/${id}/notes`, {
      admin_notes: notes,
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await adminApi.delete(`/admin/contact-messages/${id}`);
    return response.data;
  },
  restore: async (id) => {
    const response = await adminApi.post(`/admin/contact-messages/${id}/restore`);
    return response.data;
  },
  bulkUpdateStatus: async (ids, status) => {
    const response = await adminApi.post('/admin/contact-messages/bulk-status', { ids, status });
    return response.data;
  },
};

// إدارة طلبات عروض الأسعار
export const adminQuoteService = {
  getAll: async (params = {}) => {
    const response = await adminApi.get('/admin/quote-requests', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await adminApi.get(`/admin/quote-requests/${id}`);
    return response.data;
  },
  updateStatus: async (id, status, quotedAmount = null, quoteNotes = null) => {
    const response = await adminApi.patch(`/admin/quote-requests/${id}/status`, {
      status,
      quoted_amount: quotedAmount,
      quote_notes: quoteNotes,
    });
    return response.data;
  },
  addQuote: async (id, amount, notes = null) => {
    const response = await adminApi.post(`/admin/quote-requests/${id}/quote`, {
      quoted_amount: amount,
      quote_notes: notes,
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await adminApi.delete(`/admin/quote-requests/${id}`);
    return response.data;
  },
  restore: async (id) => {
    const response = await adminApi.post(`/admin/quote-requests/${id}/restore`);
    return response.data;
  },
  bulkUpdateStatus: async (ids, status) => {
    const response = await adminApi.post('/admin/quote-requests/bulk-status', { ids, status });
    return response.data;
  },
};

// إدارة المستخدمين (admin فقط)
export const adminUsersService = {
  getAll: async (params = {}) => {
    const response = await adminApi.get('/admin/users', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await adminApi.get(`/admin/users/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await adminApi.post('/admin/users', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await adminApi.put(`/admin/users/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await adminApi.delete(`/admin/users/${id}`);
    return response.data;
  },
  restore: async (id) => {
    const response = await adminApi.post(`/admin/users/${id}/restore`);
    return response.data;
  },
  toggleActive: async (id) => {
    const response = await adminApi.patch(`/admin/users/${id}/toggle-active`);
    return response.data;
  },
};

// ================================
// تصدير الـ API instance للاستخدام المباشر
// ================================
export default api;
