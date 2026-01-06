/**
 * Email Service for Contact Forms
 * Handles form submissions using EmailJS
 * 
 * Setup Instructions:
 * 1. Go to https://www.emailjs.com and create an account
 * 2. Create an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with variables: from_name, from_email, phone, service_type, message, to_name
 * 4. Get your Service ID, Template ID, and Public Key
 * 5. Replace the placeholder values below
 */

// Configuration - Replace with your actual EmailJS credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID', // e.g., 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // e.g., 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY' // e.g., 'user_abcdefg'
};

// Validation patterns
const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  name: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/
};

// Validation messages in both languages
export const VALIDATION_MESSAGES = {
  ar: {
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    invalidPhone: 'رقم الهاتف غير صالح',
    invalidName: 'الاسم يجب أن يكون بين 2-50 حرف',
    minLength: (min) => `يجب أن يكون على الأقل ${min} أحرف`,
    maxLength: (max) => `يجب أن لا يتجاوز ${max} حرف`,
    submitSuccess: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    submitError: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    networkError: 'خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت.'
  },
  en: {
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    invalidPhone: 'Invalid phone number',
    invalidName: 'Name must be between 2-50 characters',
    minLength: (min) => `Must be at least ${min} characters`,
    maxLength: (max) => `Must not exceed ${max} characters`,
    submitSuccess: 'Your message has been sent successfully! We will contact you soon.',
    submitError: 'An error occurred while sending your message. Please try again.',
    networkError: 'Connection error. Please check your internet connection.'
  }
};

/**
 * Validate a single field
 * @param {string} field - Field name
 * @param {string} value - Field value
 * @param {string} lang - Language code ('ar' or 'en')
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (field, value, lang = 'en') => {
  const messages = VALIDATION_MESSAGES[lang] || VALIDATION_MESSAGES.en;
  const trimmedValue = value?.trim() || '';

  switch (field) {
    case 'firstName':
    case 'lastName':
    case 'name':
      if (!trimmedValue) return messages.required;
      if (!VALIDATION_PATTERNS.name.test(trimmedValue)) return messages.invalidName;
      return null;

    case 'email':
      if (!trimmedValue) return messages.required;
      if (!VALIDATION_PATTERNS.email.test(trimmedValue)) return messages.invalidEmail;
      return null;

    case 'phone':
      if (trimmedValue && !VALIDATION_PATTERNS.phone.test(trimmedValue)) {
        return messages.invalidPhone;
      }
      return null;

    case 'message':
      if (!trimmedValue) return messages.required;
      if (trimmedValue.length < 10) return messages.minLength(10);
      if (trimmedValue.length > 1000) return messages.maxLength(1000);
      return null;

    case 'service':
      if (!trimmedValue) return messages.required;
      return null;

    default:
      return null;
  }
};

/**
 * Validate entire form
 * @param {Object} formData - Form data object
 * @param {string} lang - Language code
 * @returns {Object} - Object with field errors
 */
export const validateForm = (formData, lang = 'en') => {
  const errors = {};
  
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field], lang);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

/**
 * Check if form is valid
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean} - True if no errors
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

/**
 * Load EmailJS script dynamically
 * @returns {Promise} - Resolves when script is loaded
 */
const loadEmailJS = () => {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      resolve(window.emailjs);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      resolve(window.emailjs);
    };
    script.onerror = () => reject(new Error('Failed to load EmailJS'));
    document.head.appendChild(script);
  });
};

/**
 * Send contact form via EmailJS
 * @param {Object} formData - Form data
 * @returns {Promise<Object>} - Result object with success status
 */
export const sendContactForm = async (formData) => {
  try {
    const emailjs = await loadEmailJS();

    const templateParams = {
      from_name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      service_type: formData.service || 'General Inquiry',
      message: formData.message,
      to_name: 'Ground Protection Team',
      reply_to: formData.email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    // Track successful submission (for analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submission', {
        event_category: 'Contact',
        event_label: formData.service || 'General'
      });
    }

    return { 
      success: true, 
      data: response,
      message: 'Form submitted successfully'
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    
    // Track failed submission
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_error', {
        event_category: 'Contact',
        event_label: error.message
      });
    }

    return { 
      success: false, 
      error: error.message || 'Failed to send message',
      message: error.text || 'An error occurred'
    };
  }
};

/**
 * Send form via Formspree (Alternative to EmailJS)
 * @param {Object} formData - Form data
 * @param {string} formId - Formspree form ID
 * @returns {Promise<Object>} - Result object
 */
export const sendViaFormspree = async (formData, formId = 'YOUR_FORMSPREE_ID') => {
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        _subject: `New Contact from ${formData.firstName || 'Website Visitor'}`
      })
    });

    if (response.ok) {
      return { success: true, message: 'Form submitted successfully' };
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Custom hook-style form handler (can be imported in components)
 */
export const createFormHandler = (lang = 'en') => {
  const messages = VALIDATION_MESSAGES[lang] || VALIDATION_MESSAGES.en;

  return {
    validate: (formData) => validateForm(formData, lang),
    validateField: (field, value) => validateField(field, value, lang),
    submit: sendContactForm,
    messages
  };
};

export default {
  sendContactForm,
  sendViaFormspree,
  validateField,
  validateForm,
  isFormValid,
  createFormHandler,
  VALIDATION_MESSAGES
};
