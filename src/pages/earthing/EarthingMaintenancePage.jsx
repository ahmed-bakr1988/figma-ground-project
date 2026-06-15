import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, ArrowRight, Phone, ClipboardCheck, Siren, Calendar, Award } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { getTitleByPath } from '../../lib/seoTitles';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function EarthingMaintenancePage() {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';

  const data = {
    ar: {
      seoTitle: 'صيانة أنظمة التأريض | فحص وصيانة دورية لنظام التأريض في مصر - Ground Tech',
      seoDescription: 'خدمة صيانة وفحص أنظمة التأريض الدورية في مصر. قياس مقاومة التأريض، اختبار الاستمرارية، وفحص الوصلات لضمان فعالية الحماية.',
      h1: 'صيانة أنظمة التأريض',
      subtitle: 'فحص دوري يضمن بقاء نظام التأريض فعالاً',
      intro: 'نظام التأريض يحتاج إلى صيانة دورية مثل أي نظام كهربائي. التربة تتغير، الوصلات تتأكسد، والمقاومة ترتفع مع الوقت. نقدم خدمة فحص وصيانة شاملة.',
      services: [
        { icon: ClipboardCheck, title: 'فحص بصري شامل', desc: 'مراجعة جميع نقاط التأريض والوصلات والقضبان بحثاً عن التآكل أو التلف.' },
        { icon: Activity, title: 'قياس المقاومة', desc: 'قياس مقاومة التأريض باستخدام أجهزة احترافية ومقارنتها بالمعايير.' },
        { icon: Wrench, title: 'صيانة وإصلاح', desc: 'إصلاح الوصلات التالفة، استبدال القضبان المتآكلة، وتحسين النظام.' },
      ],
      schedule: [
        { period: locale === 'ar' ? 'فحص شهري' : 'Monthly', items: [locale === 'ar' ? 'فحص بصري للوصلات الظاهرة' : 'Visual inspection of visible connections', locale === 'ar' ? 'التأكد من عدم وجود تآكل' : 'Check for corrosion'] },
        { period: locale === 'ar' ? 'فحص سنوي' : 'Annual', items: [locale === 'ar' ? 'قياس مقاومة التأريض الكاملة' : 'Full ground resistance measurement', locale === 'ar' ? 'فحص جميع نقاط الربط' : 'Inspect all bonding points', locale === 'ar' ? 'تقرير فني شامل' : 'Comprehensive technical report'] },
      ],
      faq: [
        { q: locale === 'ar' ? 'كم مرة يجب فحص التأريض؟' : 'How often should earthing be inspected?', a: locale === 'ar' ? 'نوصي بفحص سنوي على الأقل، وكل 6 أشهر للمنشآت الحساسة، وبعد أي تعديلات كهربائية كبيرة.' : 'We recommend annual inspection at minimum, every 6 months for sensitive facilities, and after any major electrical modifications.' },
      ],
    },
    en: {
      seoTitle: 'Earthing System Maintenance | Periodic Grounding System Inspection - Ground Tech',
      seoDescription: 'Periodic earthing system maintenance and inspection service in Egypt. Ground resistance measurement, continuity testing, and connection inspection.',
      h1: 'Earthing System Maintenance',
      subtitle: 'Periodic inspection keeps your earthing system effective',
      intro: 'Earthing systems need regular maintenance like any electrical system. Soil changes, connections oxidize, and resistance increases over time. We provide comprehensive inspection and maintenance.',
      services: [
        { icon: ClipboardCheck, title: 'Visual Inspection', desc: 'Review all grounding points, connections, and rods for corrosion or damage.' },
        { icon: Activity, title: 'Resistance Measurement', desc: 'Measure ground resistance using professional equipment and compare with standards.' },
        { icon: Wrench, title: 'Repair & Improvement', desc: 'Fix damaged connections, replace corroded rods, and improve the system.' },
      ],
      schedule: [
        { period: 'Monthly', items: ['Visual inspection of visible connections', 'Check for corrosion'] },
        { period: 'Annual', items: ['Full ground resistance measurement', 'Inspect all bonding points', 'Comprehensive technical report'] },
      ],
      faq: [
        { q: 'How often should earthing be inspected?', a: 'We recommend annual inspection at minimum, every 6 months for sensitive facilities, and after any major electrical modifications.' },
      ],
    },
  };

  const d = data[locale];
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', url: `${companyInfo.urls.website}/services` },
    { name: locale === 'ar' ? 'صيانة التأريض' : 'Earthing Maintenance', url: `${companyInfo.urls.website}/services/earthing/maintenance` },
  ];

  return (
    <>
      <SEOHead title={getTitleByPath('/services/earthing/maintenance', locale)} description={d.seoDescription} url={`${companyInfo.urls.website}/services/earthing/maintenance`} breadcrumbs={breadcrumbs} />
      <main className="bg-white">
        <section className="relative bg-gradient-to-br from-primary via-primary to-secondary min-h-[50vh] flex items-center overflow-hidden">
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                {locale === 'ar' ? 'صيانة دورية احترافية' : 'Professional Periodic Maintenance'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{d.h1}</h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{d.intro}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all">
                <Phone className="w-5 h-5" />
                {locale === 'ar' ? 'احجز فحصاً' : 'Schedule Inspection'}
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'خدمات الصيانة' : 'Maintenance Services'}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {d.services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-600">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'جدول الصيانة المقترح' : 'Suggested Maintenance Schedule'}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {d.schedule.map((s, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <Calendar className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{s.period}</h3>
                  <ul className="space-y-2">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div {...fadeInUp}>
              <div className="flex flex-wrap justify-center gap-4">
                <p className="text-white/70 text-sm w-full mb-2">{locale === 'ar' ? 'خدمات تأريض ذات صلة' : 'Related Earthing Services'}</p>
                <Link to="/services/earthing/industrial" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'تأريض صناعي' : 'Industrial Earthing'}</Link>
                <Link to="/services/earthing/soil-resistance" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'قياس مقاومة التربة' : 'Soil Resistance Testing'}</Link>
                <Link to="/services/earthing/specifications" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'مواصفات التأريض' : 'Earthing Specifications'}</Link>
                <Link to="/services/earthing-systems" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'أنظمة التأريض' : 'Earthing Systems'}</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
