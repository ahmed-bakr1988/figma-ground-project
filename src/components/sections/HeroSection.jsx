import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Phone, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContactForm } from '../../services/hooks';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { loading, error, success, sendMessage, reset } = useContactForm();
  
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // حالة أخطاء التحقق
  const [validationErrors, setValidationErrors] = useState({});

  // Background images array
  const backgroundImages = [
    '/assets/images/backgroundImage/backgroundImage1.jpeg',
    '/assets/images/backgroundImage/backgroundImage5.jpeg',
    '/assets/images/backgroundImage/backgroundImage7.avif'
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // إعادة تعيين رسالة النجاح بعد 5 ثوانٍ
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        reset();
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, reset]);

  // معالجة تغيير الحقول
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // إزالة خطأ الحقل عند الكتابة
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = t('contact.form.nameError', 'الاسم مطلوب ويجب أن يكون حرفين على الأقل');
    }
    
    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = t('contact.form.emailError', 'البريد الإلكتروني مطلوب وغير صحيح');
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = t('contact.form.messageError', 'الرسالة مطلوبة ويجب أن تكون أكثر من 10 أحرف');
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // معالجة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من البيانات
    if (!validateForm()) {
      return;
    }
    
    // تحضير البيانات للإرسال
    const submitData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.service || t('contact.form.quickInquiry', 'استفسار سريع'),
      message: formData.message.trim(),
      message_type: 'general',
      source_page: 'hero_section',
      preferred_language: i18n.language
    };
   
    await sendMessage(submitData);
  };

  return (
    <section className="hero-section relative min-h-screen overflow-hidden">
      {/* Background Image with Lightning - Auto Rotating */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0
            }}
          />
        ))}
        {/* Gradient uses logical direction - start means left in LTR, right in RTL */}
        <div className="absolute inset-0 bg-gradient-to-end from-slate-900/95 via-slate-900/80 to-slate-900/60" style={{ zIndex: 2 }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Start Content (Left in LTR, Right in RTL) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="animate-slide-in-start"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('hero.badge')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t('hero.title')}{' '}
              <span className="text-accent">{t('hero.titleHighlight')}</span>{' '}
              {t('hero.titleEnd')}
            </h1>
            
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                {t('hero.cta')}
                <ChevronRight className="w-5 h-5 rtl-flip" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                {t('hero.ctaSecondary')}
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-accent">10+</div>
                <div className="text-white/60 text-sm">{t('hero.stats.experience')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">2000+</div>
                <div className="text-white/60 text-sm">{t('hero.stats.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">99%</div>
                <div className="text-white/60 text-sm">{t('hero.stats.satisfaction')}</div>
              </div>
            </div>
          </motion.div>

          {/* End - Contact Form (Right in LTR, Left in RTL) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block animate-slide-in-end"
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md ms-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t('contact.form.title')}</h3>
                  <p className="text-gray-500 text-sm">{t('contact.form.subtitle')}</p>
                </div>
              </div>
              
              {/* رسالة النجاح */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-700 font-medium text-sm">{t('contact.form.successMessage', 'تم إرسال رسالتك بنجاح!')}</p>
                </motion.div>
              )}

              {/* رسالة الخطأ */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.firstName')}
                    aria-label={t('contact.form.firstName')}
                    aria-invalid={!!validationErrors.name}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${
                      validationErrors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.email')}
                    aria-label={t('contact.form.email')}
                    aria-invalid={!!validationErrors.email}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${
                      validationErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.phone')}
                  aria-label={t('contact.form.phone')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  aria-label={t('contact.form.service')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-gray-500"
                >
                  <option value="">{t('contact.form.service')}</option>
                  <option value="residential">{t('contact.form.services.residential')}</option>
                  <option value="commercial">{t('contact.form.services.commercial')}</option>
                  <option value="industrial">{t('contact.form.services.industrial')}</option>
                  <option value="maintenance">{t('contact.form.services.maintenance')}</option>
                </select>
                <div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3" 
                    placeholder={t('contact.form.message')}
                    aria-label={t('contact.form.message')}
                    aria-invalid={!!validationErrors.message}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none ${
                      validationErrors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {validationErrors.message && (
                    <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.message}
                    </p>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent-dark text-primary py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      {t('contact.form.sending', 'جارٍ الإرسال...')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <ChevronRight className="w-5 h-5 rtl-flip" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Centered using flexbox (RTL-safe) */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center z-30">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <button
            type="button"
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-10 h-14 border-2 border-white/30 hover:border-accent rounded-full flex justify-center pt-3 transition-colors cursor-pointer bg-transparent"
            aria-label="Scroll to next section"
          >
            <div className="w-2 h-4 bg-accent rounded-full"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
