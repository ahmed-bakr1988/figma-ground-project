/**
 * ================================
 * React Context للمصادقة
 * ================================
 * 
 * يوفر حالة المصادقة لجميع المكونات
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from './api';

// إنشاء السياق
const AuthContext = createContext(null);

/**
 * مزود سياق المصادقة
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // التحقق من حالة المصادقة عند تحميل التطبيق
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const response = await authService.getUser();
          if (response.success) {
            setUser(response.data);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        // إذا فشل جلب المستخدم، قم بتسجيل الخروج
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // تسجيل الدخول
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        setUser(response.data.user);
        return { success: true };
      }
      setError(response.message);
      return { success: false, message: response.message };
    } catch (err) {
      const message = err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // التسجيل
  const register = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      if (response.success) {
        setUser(response.data.user);
        return { success: true };
      }
      setError(response.message);
      return { success: false, message: response.message, errors: response.errors };
    } catch (err) {
      const message = err.response?.data?.message || 'حدث خطأ أثناء التسجيل';
      const errors = err.response?.data?.errors || {};
      setError(message);
      return { success: false, message, errors };
    } finally {
      setLoading(false);
    }
  }, []);

  // تسجيل الخروج
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  // تحديث الملف الشخصي
  const updateProfile = useCallback(async (data) => {
    try {
      const response = await authService.updateProfile(data);
      if (response.success) {
        setUser(response.data);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'حدث خطأ',
        errors: err.response?.data?.errors 
      };
    }
  }, []);

  // القيمة المُقدمة للسياق
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStaff: user?.role === 'admin' || user?.role === 'staff',
    login,
    register,
    logout,
    updateProfile,
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook لاستخدام سياق المصادقة
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * مكون لحماية المسارات
 */
export function ProtectedRoute({ children, requireAdmin = false, requireStaff = false }) {
  const { isAuthenticated, isAdmin, isStaff, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // يمكن إضافة إعادة توجيه إلى صفحة تسجيل الدخول هنا
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">غير مصرح</h2>
          <p className="text-gray-600">يرجى تسجيل الدخول للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">غير مسموح</h2>
          <p className="text-gray-600">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    );
  }

  if (requireStaff && !isStaff) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">غير مسموح</h2>
          <p className="text-gray-600">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    );
  }

  return children;
}

export default AuthContext;
