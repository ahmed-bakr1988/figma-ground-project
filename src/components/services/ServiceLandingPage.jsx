import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import SEOHead from '../common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { getFAQSchema, getServiceSchema } from '../../config/seoSchema';
import { getServicePageSummary, servicePageContent, servicePageSummaries } from '../../data/servicePages';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 text-start hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-gray-600 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function ServiceLandingPage({ slug }) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';
  const isRTL = locale === 'ar';
  const [openFaq, setOpenFaq] = useState(0);
  const pageEntry = servicePageContent[slug];

  if (!pageEntry) {
    return null;
  }

  const page = pageEntry[locale];
  const summary = getServicePageSummary(slug);
  const pageUrl = `${companyInfo.urls.website}/services/${slug}`;
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', url: `${companyInfo.urls.website}/services` },
    { name: summary?.label?.[locale] || page.hero.title, url: pageUrl },
  ];

  const schemas = [
    getServiceSchema(summary?.serviceId || slug, locale),
    getFAQSchema(page.faq.items.map((item) => ({ question: item.question, answer: item.answer })), locale),
  ].filter(Boolean);

  const relatedLinks = (pageEntry.relatedSlugs || [])
    .map((relatedSlug) => servicePageSummaries.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  const topCities = companyInfo.serviceAreas.slice(0, 5).map((city) => city[locale]);
  const trustStats = [
    { value: companyInfo.stats.projects, label: locale === 'ar' ? 'مشروع وخدمة' : 'Projects Delivered' },
    { value: companyInfo.stats.clients, label: locale === 'ar' ? 'عميل' : 'Clients Served' },
    { value: companyInfo.stats.experience, label: locale === 'ar' ? 'سنوات خبرة' : 'Years Experience' },
  ];

  return (
    <>
      <SEOHead
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.keywords.join(', ')}
        url={pageUrl}
        breadcrumbs={breadcrumbs}
        schema={schemas}
      />

      <main className="bg-white">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 border border-white/30 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 border border-white/20 rounded-full translate-y-1/3 -translate-x-1/4" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-28 lg:py-32">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              <motion.div {...fadeInUp}>
                <span className="inline-flex items-center rounded-full bg-accent/15 text-accent px-4 py-2 text-sm font-semibold mb-6">
                  {page.hero.badge}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {page.hero.title}
                </h1>
                <p className="text-xl text-white/90 mb-4">{page.hero.subtitle}</p>
                <p className="text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
                  {page.hero.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {page.hero.highlights.map((highlight) => (
                    <span key={highlight} className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white px-4 py-2 text-sm border border-white/15">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    {page.hero.cta}
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl transition-all"
                  >
                    {locale === 'ar' ? 'جميع الخدمات' : 'All Services'}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
                <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-sm shadow-2xl">
                  <img src={pageEntry.image} alt={page.hero.title} className="w-full h-[420px] object-cover" />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {trustStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white/10 border border-white/15 px-4 py-4 text-center">
                      <div className="text-2xl font-bold text-accent">{stat.value}</div>
                      <div className="text-xs text-white/75 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-16">
            <motion.div {...fadeInUp} className="grid lg:grid-cols-[1fr_0.9fr] gap-10 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">{page.overview.title}</h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-8">{page.overview.intro}</p>
                <ul className="space-y-4">
                  {page.overview.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] bg-white p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {locale === 'ar' ? 'نغطي هذه المناطق داخل مصر' : 'Coverage Areas in Egypt'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {topCities.map((city) => (
                    <span key={city} className="rounded-full bg-primary/5 text-primary px-4 py-2 text-sm font-medium border border-primary/10">
                      {city}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                  {locale === 'ar'
                    ? 'ننقل نفس منطق التصميم والتنفيذ والفحص إلى المواقع السكنية والتجارية والصناعية مع مراعاة ظروف كل مشروع.'
                    : 'We apply the same design, installation, and inspection discipline across residential, commercial, and industrial projects.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-16">
            <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{page.solutions.title}</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {page.solutions.items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    {...fadeInUp}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="rounded-[1.75rem] bg-white p-7 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-16">
            <motion.div {...fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{page.process.title}</h2>
            </motion.div>
            <div className="space-y-5">
              {page.process.items.map((item, index) => (
                <motion.div
                  key={item.number}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="grid md:grid-cols-[96px_1fr] gap-5 rounded-[1.75rem] border border-white/15 bg-white/10 p-6"
                >
                  <div className="w-20 h-20 rounded-2xl bg-accent text-primary flex items-center justify-center text-2xl font-bold">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-16">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{page.faq.title}</h2>
            </motion.div>
            <div className="space-y-4">
              {page.faq.items.map((item, index) => (
                <FAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{page.cta.title}</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{page.cta.description}</p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {page.cta.button}
                </Link>
                <a
                  href={companyInfo.contact.phone.telHref}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 px-8 py-4 rounded-xl transition-all"
                  dir="ltr"
                >
                  {companyInfo.contact.phone.shortDisplay}
                </a>
              </div>

              {relatedLinks.length > 0 && (
                <div className="border-t border-white/15 pt-8">
                  <p className="text-sm text-white/70 mb-4">
                    {locale === 'ar' ? 'خدمات مرتبطة' : 'Related Services'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {relatedLinks.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/services/${item.slug}`}
                        className="rounded-full bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 text-white text-sm transition-colors"
                      >
                        {item.label[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}