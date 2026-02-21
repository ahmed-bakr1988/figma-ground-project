/**
 * ================================
 * Custom Hooks — بعد إزالة Backend
 * ================================
 * 
 * تم تبسيط الـ hooks للعمل مع Google Sheets
 * بدلاً من Laravel API
 */

import { useState, useCallback } from 'react';
import { contactService } from './api';

/**
 * Hook لإرسال نموذج (عام)
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
        setError(response.message || 'حدث خطأ أثناء الإرسال');
        return { success: false, message: response.message };
      }
    } catch (err) {
      console.error('خطأ أثناء إرسال النموذج:', err);
      const message = 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.';
      setError(message);
      return { success: false, message };
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
 * Hook للاشتراك في النشرة البريدية
 */
export function useNewsletterSubscribe() {
  const { loading, error, success, submit, reset } = useFormSubmit();

  const subscribe = useCallback((email, name = null) => {
    return submit(() => contactService.subscribeNewsletter(email, name), {});
  }, [submit]);

  return { loading, error, success, subscribe, reset };
}

export default {
  useFormSubmit,
  useContactForm,
  useNewsletterSubscribe,
};
