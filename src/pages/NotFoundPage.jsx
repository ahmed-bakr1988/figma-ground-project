import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Search, AlertCircle } from 'lucide-react';

/**
 * ================================
 * صفحة 404 - الصفحة غير موجودة
 * ================================
 */
export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const quickLinks = [
    { name: isRTL ? 'الرئيسية' : 'Home', href: '/' },
    { name: isRTL ? 'خدماتنا' : 'Services', href: '/services' },
    { name: isRTL ? 'مشاريعنا' : 'Projects', href: '/projects' },
    { name: isRTL ? 'اتصل بنا' : 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* الرقم 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-white/10 leading-none select-none">
            404
          </h1>
        </motion.div>

        {/* الأيقونة والرسالة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative -mt-24 md:-mt-32"
        >
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-accent" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            {isRTL 
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.'
              : "Sorry, the page you're looking for doesn't exist or has been moved."
            }
          </p>

          {/* أزرار التنقل */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary font-semibold px-8 py-4 rounded-lg transition-all"
            >
              <Home className="w-5 h-5" />
              {isRTL ? 'العودة للرئيسية' : 'Go Home'}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/20"
            >
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* روابط سريعة */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm mb-4">
              {isRTL ? 'روابط سريعة قد تساعدك:' : 'Quick links that might help:'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-accent hover:text-accent-light transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
