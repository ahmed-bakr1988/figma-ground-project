import React, { useState, useEffect, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Phone, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useContactForm } from '../../services/hooks';

/**
 * ⚡ LCP-Optimized Hero Images Configuration
 * - AVIF primary (best compression, ~30% smaller than WebP)
 * - WebP fallback (wide browser support)
 * - Responsive srcset for mobile/tablet/desktop
 * - Target file sizes: mobile <15KB, tablet <25KB, desktop <35KB
 */
const HERO_IMAGES = [
  {
    // Primary hero image - LCP critical
    avif: {
      mobile: '/assets/images/backgroundImage/hero-optimized-mobile.avif',
      tablet: '/assets/images/backgroundImage/hero-optimized-tablet.avif',
      desktop: '/assets/images/backgroundImage/hero-optimized.avif',
    },
    webp: {
      mobile: '/assets/images/backgroundImage/hero-optimized-mobile.webp',
      tablet: '/assets/images/backgroundImage/hero-optimized-tablet.webp',
      desktop: '/assets/images/backgroundImage/hero-optimized.webp',
    },
    fallback: '/assets/images/backgroundImage/hero-optimized.webp',
  },
  {
    avif: {
      mobile: '/assets/images/backgroundImage/hero-2-mobile.avif',
      tablet: '/assets/images/backgroundImage/hero-2-tablet.avif',
      desktop: '/assets/images/backgroundImage/hero-2.avif',
    },
    webp: {
      mobile: '/assets/images/backgroundImage/hero-2-mobile.webp',
      tablet: '/assets/images/backgroundImage/hero-2-tablet.webp',
      desktop: '/assets/images/backgroundImage/hero-2.webp',
    },
    fallback: '/assets/images/backgroundImage/hero-2.webp',
  },
  {
    avif: {
      mobile: '/assets/images/backgroundImage/hero-3-mobile.avif',
      tablet: '/assets/images/backgroundImage/hero-3-tablet.avif',
      desktop: '/assets/images/backgroundImage/hero-3.avif',
    },
    webp: {
      mobile: '/assets/images/backgroundImage/hero-3-mobile.webp',
      tablet: '/assets/images/backgroundImage/hero-3-tablet.webp',
      desktop: '/assets/images/backgroundImage/hero-3.webp',
    },
    fallback: '/assets/images/backgroundImage/hero-3.avif',
  }
];

/**
 * ⚡ LCP-Optimized Hero Background Component
 * - Uses picture element with AVIF/WebP/fallback
 * - Responsive srcset for different viewports
 * - First image loaded eagerly with high priority
 * - Subsequent images lazy loaded
 * - Explicit dimensions prevent CLS
 */
const HeroBackground = memo(({ currentIndex }) => (
  <div className="absolute inset-0" aria-hidden="true">
    {HERO_IMAGES.map((image, index) => {
      const isLCP = index === 0;
      const isVisible = currentIndex === index;
      
      return (
        <picture key={index}>
          {/* AVIF - Best compression, modern browsers */}
          <source
            type="image/avif"
            srcSet={`${image.avif.mobile} 640w, ${image.avif.tablet} 1024w, ${image.avif.desktop} 1920w`}
            sizes="100vw"
          />
          {/* WebP - Good compression, wide support */}
          <source
            type="image/webp"
            srcSet={`${image.webp.mobile} 640w, ${image.webp.tablet} 1024w, ${image.webp.desktop} 1920w`}
            sizes="100vw"
          />
          {/* Fallback */}
          <img
            src={image.fallback}
            alt=""
            role="presentation"
            // LCP image: eager load with high priority
            loading={isLCP ? 'eager' : 'lazy'}
            fetchpriority={isLCP ? 'high' : 'low'}
            decoding={isLCP ? 'sync' : 'async'}
            // Explicit dimensions prevent CLS
            width="1920"
            height="1080"
            className="hero-bg-img transition-opacity duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              zIndex: isVisible ? 1 : 0,
              // Prevent layout recalculation
              contain: 'strict',
            }}
          />
        </picture>
      );
    })}
    {/* Gradient overlay - uses CSS for performance */}
    <div 
      className="absolute inset-0 bg-gradient-to-end from-slate-900/95 via-slate-900/80 to-slate-900/60" 
      style={{ zIndex: 2 }} 
    />
  </div>
));
HeroBackground.displayName = 'HeroBackground';

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

  // ⚡ Optimized: Use requestAnimationFrame for smooth transitions
  // Auto-rotate images every 5 seconds (only after initial paint)
  useEffect(() => {
    // Delay carousel start to not interfere with LCP
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % HERO_IMAGES.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }, 2000); // Start carousel 2s after mount

    return () => clearTimeout(startDelay);
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
  };

  // معالجة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من البيانات
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      alert(t('contact.form.nameError', 'الاسم مطلوب ويجب أن يكون حرفين على الأقل'));
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert(t('contact.form.emailError', 'البريد الإلكتروني مطلوب وغير صحيح'));
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      alert(t('contact.form.messageError', 'الرسالة مطلوبة وتجب أن تكون أكثر من 10 أحرف'));
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

    console.log('جارٍ إرسال البيانات:', submitData);

    await sendMessage(submitData);
  };

  return (
    <section className="hero-section relative min-h-screen overflow-hidden" aria-label={t('hero.ariaLabel', 'قسم الترحيب الرئيسي')}>
      {/* ⚡ Optimized Background with WebP + explicit dimensions */}
      <HeroBackground currentIndex={currentImageIndex} />

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

            {/* ✅ SEO: Single H1 tag - most important for SEO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t('hero.title')}{' '}
              <span className="text-accent">{t('hero.titleHighlight')}</span>{' '}
              {t('hero.titleEnd')}
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-xl">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 w-full"
                >
                  {t('hero.cta')}
                  <ChevronRight className="w-5 h-5 rtl-flip" />
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 w-full"
                >
                  {t('hero.ctaSecondary')}
                </motion.button>
              </Link>
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
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.firstName')}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.email')}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.phone')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-gray-500"
                >
                  <option value="">{t('contact.form.service')}</option>
                  <option value="residential">{t('contact.form.services.residential')}</option>
                  <option value="commercial">{t('contact.form.services.commercial')}</option>
                  <option value="industrial">{t('contact.form.services.industrial')}</option>
                  <option value="maintenance">{t('contact.form.services.maintenance')}</option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder={t('contact.form.message')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                />
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
