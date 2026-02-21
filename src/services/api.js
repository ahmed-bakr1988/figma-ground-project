/**
 * ================================
 * خدمة الـ API — Google Sheets Backend
 * ================================
 * 
 * بعد إزالة Laravel Backend، يتم إرسال نماذج التواصل
 * إلى Google Sheets عبر Google Apps Script
 * البيانات الأخرى (خدمات، مشاريع، مقالات) تُقرأ من ملفات ثابتة
 */

// ================================
// Google Sheets Contact API
// ================================
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

/**
 * خدمة إرسال رسائل التواصل عبر Google Sheets
 */
export const contactService = {
  /**
   * إرسال رسالة تواصل
   * @param {Object} data - بيانات النموذج
   * @returns {Promise<Object>} - نتيجة الإرسال
   */
  sendMessage: async (data) => {
    if (!GOOGLE_SHEETS_URL) {
      console.error('VITE_GOOGLE_SHEETS_URL is not configured');
      return { 
        success: false, 
        message: 'خدمة الإرسال غير مهيأة. يرجى التواصل عبر الهاتف أو البريد الإلكتروني.' 
      };
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain', // مطلوب لتجاوز CORS مع Google Apps Script
        },
        body: JSON.stringify({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || '',
          source_page: data.source_page || 'website',
          preferred_language: data.preferred_language || 'ar',
        }),
      });

      // Google Apps Script قد يرجع redirect
      if (response.ok || response.redirected) {
        try {
          const result = await response.json();
          return { success: true, data: result, message: result.message || 'تم إرسال رسالتك بنجاح' };
        } catch {
          // في حال لم يكن الرد JSON (بعض حالات redirect)
          return { success: true, message: 'تم إرسال رسالتك بنجاح' };
        }
      }

      return { 
        success: false, 
        message: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.' 
      };
    } catch (error) {
      console.error('Contact form error:', error);
      return { 
        success: false, 
        message: 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.' 
      };
    }
  },

  /**
   * الاشتراك في النشرة البريدية (يُرسل أيضاً إلى Google Sheets)
   */
  subscribeNewsletter: async (email, name = null) => {
    if (!GOOGLE_SHEETS_URL) {
      return { success: false, message: 'خدمة الاشتراك غير مهيأة.' };
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          name: name || '',
          email: email,
          phone: '',
          subject: 'Newsletter Subscription',
          message: 'اشتراك في النشرة البريدية',
          source_page: 'newsletter',
          preferred_language: 'ar',
        }),
      });

      if (response.ok || response.redirected) {
        return { success: true, message: 'تم الاشتراك في النشرة البريدية بنجاح!' };
      }

      return { success: false, message: 'فشل الاشتراك. يرجى المحاولة مرة أخرى.' };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return { success: false, message: 'حدث خطأ. يرجى المحاولة مرة أخرى.' };
    }
  },
};
