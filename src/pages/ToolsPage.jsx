import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Zap, Activity, Phone, ArrowRight } from 'lucide-react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import Logo from '../components/common/Logo';
import LightningRiskCalculator from '../components/tools/LightningRiskCalculator';
import GroundingCalculator from '../components/tools/GroundingCalculator';

export default function ToolsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          {/* Lightning Effect */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-16 py-6">
          <Link to="/" className="flex items-center">
            <Logo size="default" showText={true} textColor="white" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-white/90">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <Link to="/about" className="hover:text-accent transition-colors">{t('nav.about')}</Link>
            <Link to="/services" className="hover:text-accent transition-colors">{t('nav.services')}</Link>
            <Link to="/products" className="hover:text-accent transition-colors">{t('nav.products')}</Link>
            <Link to="/tools" className="text-accent transition-colors">{t('nav.tools')}</Link>
            <Link to="/projects" className="hover:text-accent transition-colors">{t('nav.projects')}</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">{t('nav.contact')}</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <Link 
              to="/contact"
              className="bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.getQuote')}</span>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                  {t('toolsPage.hero.badge')}
                </span>
                <div className="w-12 h-[2px] bg-accent"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('toolsPage.hero.title')} <span className="text-accent">{t('toolsPage.hero.titleHighlight')}</span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                {t('toolsPage.hero.description')}
              </p>

              <div className="flex items-center justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">2</div>
                      <div className="text-sm text-white/70">{t('toolsPage.hero.toolsCount')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">{t('toolsPage.hero.free')}</div>
                      <div className="text-sm text-white/70">{t('toolsPage.hero.noCharge')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-24 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('toolsPage.section.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('toolsPage.section.description')}
            </p>
          </motion.div>

          {/* Calculators Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Lightning Risk Calculator */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <LightningRiskCalculator />
            </motion.div>

            {/* Grounding Calculator */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GroundingCalculator />
            </motion.div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Zap className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('toolsPage.features.accurate.title')}
              </h3>
              <p className="text-gray-600">
                {t('toolsPage.features.accurate.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Activity className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('toolsPage.features.instant.title')}
              </h3>
              <p className="text-gray-600">
                {t('toolsPage.features.instant.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Calculator className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('toolsPage.features.easy.title')}
              </h3>
              <p className="text-gray-600">
                {t('toolsPage.features.easy.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-16 bg-gradient-to-r from-accent to-accent-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Calculator className="w-16 h-16 text-primary mx-auto mb-6" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('toolsPage.cta.title')}
            </h2>
            
            <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
              {t('toolsPage.cta.description')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                {t('toolsPage.cta.button')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              <Link 
                to="/services"
                className="bg-white/20 hover:bg-white/30 text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                {t('toolsPage.cta.services')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
