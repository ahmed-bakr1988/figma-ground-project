import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Phone, ChevronRight } from 'lucide-react';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Logo from '../common/Logo';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Lightning */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/images/backgroundImage/backgroundImage1.jpeg')`,
          }}
        />
        {/* Gradient uses logical direction - start means left in LTR, right in RTL */}
        <div className="absolute inset-0 bg-gradient-to-end from-slate-900/95 via-slate-900/80 to-slate-900/60" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-16 py-6">
        <a href="/" className="flex items-center">
          <Logo size="default" showText={true} textColor="white" />
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-white/90">
          <a href="/" className="hover:text-accent transition-colors">{t('nav.home')}</a>
          <a href="/about" className="hover:text-accent transition-colors">{t('nav.about')}</a>
          <a href="/#services" className="hover:text-accent transition-colors">{t('nav.services')}</a>
          <a href="/#projects" className="hover:text-accent transition-colors">{t('nav.projects')}</a>
          <a href="/#contact" className="hover:text-accent transition-colors">{t('nav.contact')}</a>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher variant="minimal" />
          <button className="bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{t('nav.getQuote')}</span>
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-100px)] px-6 lg:px-16">
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
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder={t('contact.form.firstName')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <input 
                  type="email" 
                  placeholder={t('contact.form.email')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <input 
                  type="tel" 
                  placeholder={t('contact.form.phone')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-gray-500">
                  <option value="">{t('contact.form.service')}</option>
                  <option value="residential">{t('contact.form.services.residential')}</option>
                  <option value="commercial">{t('contact.form.services.commercial')}</option>
                  <option value="industrial">{t('contact.form.services.industrial')}</option>
                  <option value="maintenance">{t('contact.form.services.maintenance')}</option>
                </select>
                <textarea 
                  rows="3" 
                  placeholder={t('contact.form.message')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                />
                <button 
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-primary py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {t('contact.form.submit')}
                  <ChevronRight className="w-5 h-5 rtl-flip" />
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
