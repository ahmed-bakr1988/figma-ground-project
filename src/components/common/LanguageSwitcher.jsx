import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'default' }) {
  const { i18n, t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const isArabic = i18n.language === 'ar';

  if (variant === 'minimal') {
    return (
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label={t('language.label')}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{t('language.switch')}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 backdrop-blur-sm transition-all group"
      aria-label={t('language.label')}
    >
      <Globe className="w-4 h-4 text-accent" />
      <span className="text-sm font-medium text-white">
        {t('language.switch')}
      </span>
      
      {/* Indicator dot */}
      <span className={`absolute -top-1 -end-1 w-3 h-3 rounded-full ${isArabic ? 'bg-green-500' : 'bg-blue-500'} border-2 border-slate-800`} />
    </motion.button>
  );
}
