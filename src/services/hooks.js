/**
 * ================================
 * Custom Hooks للتعامل مع الـ API
 * ================================
 */

import { useState, useEffect, useCallback } from 'react';
import { servicesService, projectsService, blogService, faqService, contactService } from './api';

/**
 * Hook عام لجلب البيانات
 */
export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في جلب البيانات');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook لجلب الخدمات
 */
export function useServices(params = {}) {
  return useFetch(() => servicesService.getAll(params), [JSON.stringify(params)]);
}

/**
 * Hook لجلب الخدمات المميزة
 */
export function useFeaturedServices() {
  return useFetch(() => servicesService.getFeatured(), []);
}

/**
 * Hook لجلب خدمة واحدة
 */
export function useService(slug) {
  return useFetch(() => servicesService.getBySlug(slug), [slug]);
}

/**
 * Hook لجلب المشاريع
 */
export function useProjects(params = {}) {
  return useFetch(() => projectsService.getAll(params), [JSON.stringify(params)]);
}

/**
 * Hook لجلب المشاريع المميزة
 */
export function useFeaturedProjects() {
  return useFetch(() => projectsService.getFeatured(), []);
}

/**
 * Hook لجلب مشروع واحد
 */
export function useProject(slug) {
  return useFetch(() => projectsService.getBySlug(slug), [slug]);
}

/**
 * Hook لجلب إحصائيات المشاريع
 */
export function useProjectStats() {
  return useFetch(() => projectsService.getStats(), []);
}

/**
 * Hook لجلب المقالات
 */
export function useBlogPosts(params = {}) {
  return useFetch(() => blogService.getAll(params), [JSON.stringify(params)]);
}

/**
 * Hook لجلب مقال واحد
 */
export function useBlogPost(slug) {
  return useFetch(() => blogService.getBySlug(slug), [slug]);
}

/**
 * Hook لجلب الأسئلة الشائعة
 */
export function useFaqs(params = {}) {
  return useFetch(() => faqService.getAll(params), [JSON.stringify(params)]);
}

/**
 * Hook لإرسال نموذج
 */
export function useFormSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (submitFunction, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await submitFunction(data);
      if (response.success) {
        setSuccess(true);
        return { success: true, data: response.data, message: response.message };
      } else {
        setError(response.message);
        return { success: false, message: response.message, errors: response.errors };
      }
    } catch (err) {
      // معلومات مفصلة عن الخطأ للتشخيص
      console.error('خطأ أثناء إرسال النموذج:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        errors: err.response?.data?.errors,
        data: err.response?.data,
        url: err.config?.url,
        method: err.config?.method,
        fullError: err.message
      });

      // رسالة خطأ واضحة للمستخدم
      let message = 'حدث خطأ أثناء الإرسال';
      if (err.response?.status === 422) {
        // خطأ في التحقق من الصحة
        message = err.response?.data?.message || 'بيانات غير صحيحة. يرجى التحقق من النموذج';
      } else if (err.response?.status === 500) {
        message = 'خطأ في الخادم. يرجى محاولة لاحقاً';
      } else if (err.response?.status === 0 || !err.response?.status) {
        message = 'لا يمكن الاتصال بالخادم. تأكد من أن الخادم يعمل';
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }
      
      const errors = err.response?.data?.errors || {};
      setError(message);
      return { success: false, message, errors };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return { loading, error, success, submit, reset };
}

/**
 * Hook لإرسال رسالة تواصل
 */
export function useContactForm() {
  const { loading, error, success, submit, reset } = useFormSubmit();

  const sendMessage = useCallback((data) => {
    return submit(contactService.sendMessage, data);
  }, [submit]);

  return { loading, error, success, sendMessage, reset };
}

/**
 * Hook لإرسال طلب عرض سعر
 */
export function useQuoteForm() {
  const { loading, error, success, submit, reset } = useFormSubmit();

  const requestQuote = useCallback((data) => {
    return submit(contactService.requestQuote, data);
  }, [submit]);

  return { loading, error, success, requestQuote, reset };
}

/**
 * Hook للاشتراك في النشرة
 */
export function useNewsletterSubscribe() {
  const { loading, error, success, submit, reset } = useFormSubmit();

  const subscribe = useCallback((email, name = null) => {
    return submit(() => contactService.subscribeNewsletter(email, name), {});
  }, [submit]);

  return { loading, error, success, subscribe, reset };
}

/**
 * Hook للـ Pagination
 */
export function usePagination(fetchFunction, initialParams = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 15,
    hasMore: false,
  });
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchFunction({ ...params, page });
      
      if (response.success) {
        if (page === 1) {
          setData(response.data);
        } else {
          setData(prev => [...prev, ...response.data]);
        }
        
        setPagination({
          currentPage: response.meta.pagination.current_page,
          lastPage: response.meta.pagination.last_page,
          total: response.meta.pagination.total,
          perPage: response.meta.pagination.per_page,
          hasMore: response.meta.pagination.has_more_pages,
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, params]);

  useEffect(() => {
    fetchData(1);
  }, [params]);

  const loadMore = useCallback(() => {
    if (!loading && pagination.hasMore) {
      fetchData(pagination.currentPage + 1);
    }
  }, [loading, pagination, fetchData]);

  const refresh = useCallback(() => {
    fetchData(1);
  }, [fetchData]);

  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    loadMore,
    refresh,
    updateParams,
    setParams,
  };
}

export default {
  useFetch,
  useServices,
  useFeaturedServices,
  useService,
  useProjects,
  useFeaturedProjects,
  useProject,
  useProjectStats,
  useBlogPosts,
  useBlogPost,
  useFaqs,
  useFormSubmit,
  useContactForm,
  useQuoteForm,
  useNewsletterSubscribe,
  usePagination,
};
