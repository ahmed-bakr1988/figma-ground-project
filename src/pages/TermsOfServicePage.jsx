import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckSquare,
  Shield,
  Newspaper,
  AlertTriangle,
  Scale,
  Wrench,
  ExternalLink,
  Flag,
  RefreshCw,
  Phone,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import companyInfo from '../config/companyInfo';
import { getWebPageSchema } from '../config/seoSchema';

const sectionIcons = {
  acceptance: CheckSquare,
  services: Wrench,
  acceptableUse: Shield,
  intellectualProperty: Newspaper,
  warranty: AlertTriangle,
  liability: Scale,
  professionalDisclaimer: FileText,
  thirdParty: ExternalLink,
  governingLaw: Flag,
  changes: RefreshCw,
  contact: Phone,
};

const sectionKeys = [
  'acceptance',
  'services',
  'acceptableUse',
  'intellectualProperty',
  'warranty',
  'liability',
  'professionalDisclaimer',
  'thirdParty',
  'governingLaw',
  'changes',
  'contact',
];

export default function TermsOfServicePage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const locale = isRTL ? 'ar' : 'en';

  const pageUrl = `${companyInfo.urls.website}/terms-of-service`;

  const schema = getWebPageSchema(
    {
      url: pageUrl,
      title:
        locale === 'ar'
          ? `شروط الخدمة | ${companyInfo.name.brand}`
          : `Terms of Service | ${companyInfo.name.brand}`,
      description:
        locale === 'ar'
          ? 'شروط الخدمة لشركة جراوند تك مصر — الشروط والأحكام التي تحكم استخدام موقعنا وخدماتنا.'
          : 'Terms of Service for Ground Tech Egypt — the terms and conditions governing use of our website and services.',
      publishedAt: '2026-04-12',
      updatedAt: '2026-04-12',
    },
    locale
  );

  const breadcrumbs = [
    {
      name: locale === 'ar' ? 'الرئيسية' : 'Home',
      url: companyInfo.urls.website,
    },
    {
      name: locale === 'ar' ? 'شروط الخدمة' : 'Terms of Service',
      url: pageUrl,
    },
  ];

  return (
    <>
      <SEOHead
        title={
          locale === 'ar'
            ? `شروط الخدمة | ${companyInfo.name.brand}`
            : `Terms of Service | ${companyInfo.name.brand}`
        }
        description={
          locale === 'ar'
            ? 'شروط الخدمة لشركة جراوند تك مصر — الشروط والأحكام التي تحكم استخدام موقعنا وخدماتنا.'
            : 'Terms of Service for Ground Tech Egypt — the terms and conditions governing use of our website and services.'
        }
        url={pageUrl}
        breadcrumbs={breadcrumbs}
        schema={schema}
        noIndex={false}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-slate-900 pt-32 pb-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('termsPage.hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {t('termsPage.hero.title')}{' '}
              <span className="text-accent">{t('termsPage.hero.titleHighlight')}</span>
            </h1>

            <div className="flex items-center gap-2 text-white/50 text-sm mt-4 mb-6">
              <Calendar className="w-4 h-4" />
              <span>{t('termsPage.hero.lastUpdated')}</span>
            </div>

            <p className="text-lg text-white/70 max-w-2xl">
              {t('termsPage.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents + Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className={`flex flex-col lg:flex-row gap-10 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

            {/* Sticky Table of Contents */}
            <motion.aside
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-72 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky lg:top-28">
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  {locale === 'ar' ? 'محتويات الصفحة' : 'Contents'}
                </h2>
                <nav className="space-y-1">
                  {sectionKeys.map((key) => {
                    const Icon = sectionIcons[key];
                    return (
                      <a
                        key={key}
                        href={`#terms-${key}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{t(`termsPage.sections.${key}.title`)}</span>
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary font-semibold px-4 py-3 rounded-lg transition-colors text-sm w-full"
                  >
                    {t('termsPage.cta.button')}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {sectionKeys.map((key, index) => {
                const Icon = sectionIcons[key];
                return (
                  <motion.div
                    key={key}
                    id={`terms-${key}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.04 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 scroll-mt-28"
                  >
                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                          {t(`termsPage.sections.${key}.title`)}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {t(`termsPage.sections.${key}.content`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('termsPage.cta.title')}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {t('termsPage.cta.description')}
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent-dark text-primary font-semibold px-8 py-4 rounded-lg transition-all inline-flex items-center gap-2"
              >
                {t('termsPage.cta.button')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </Link>

            <div className={`flex items-center justify-center gap-6 mt-10 text-white/50 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">
                {t('footer.privacy')}
              </Link>
              <span>|</span>
              <Link to="/contact" className="hover:text-accent transition-colors">
                {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
