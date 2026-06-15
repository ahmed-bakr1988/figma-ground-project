import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2, ArrowRight, Phone, BarChart3, Droplets, Mountain, Award } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { getTitleByPath } from '../../lib/seoTitles';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function EarthingSoilResistancePage() {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';
  const isRTL = locale === 'ar';

  const data = {
    ar: {
      seoTitle: 'قياس مقاومة التربة | اختبار مقاومة التربة للتأريض في مصر - Ground Tech',
      seoDescription: 'خدمة قياس مقاومة التربة الكهربائية لتحديد أفضل نظام تأريض. فحص التربة باستخدام جهاز Wenner 4-point لتصميم أنظمة التأريض في مصر.',
      h1: 'قياس مقاومة التربة',
      subtitle: 'فحص دقيق لمقاومة التربة لتصميم أنظمة تأريض فعالة',
      intro: 'قياس مقاومة التربة هو الخطوة الأولى والأهم في تصميم أي نظام تأريض. نستخدم أحدث أجهزة القياس لتحديد خصائص التربة بدقة واختيار الحل الأمثل.',
      methods: [
        { title: 'طريقة Wenner 4-Point', desc: 'الطريقة الأكثر دقة لقياس مقاومة التربة باستخدام 4 أقطاب كهربائية.' },
        { title: 'طريقة Schlumberger', desc: 'مناسبة للمساحات الكبيرة وتوفر معلومات عن طبقات التربة المختلفة.' },
        { title: 'قياس ثلاثي الأقطاب', desc: 'طريقة سريعة للمواقع الصغيرة والمباني القائمة.' },
      ],
      steps: [
        'تحديد مواقع القياس بناءً على مساحة الموقع',
        'تركيب الأقطاب الكهربائية في التربة بالتباعد المطلوب',
        'إجراء القياسات في اتجاهات متعددة للحصول على متوسط دقيق',
        'تحليل النتائج وتحديد نوع التربة ومقاومتها',
        'تقديم توصيات لنظام التأريض المناسب',
      ],
      soilTypes: [
        { name: 'تربة طينية', resistivity: '10 - 100', quality: 'ممتازة' },
        { name: 'تربة رملية', resistivity: '50 - 500', quality: 'جيدة' },
        { name: 'تربة صخرية', resistivity: '1000 - 10000', quality: 'صعبة - تحتاج معالجة' },
      ],
      faq: [
        { q: 'لماذا قياس مقاومة التربة مهم؟', a: 'لتحديد أفضل نوع وموقع لنظام التأريض، وحساب عدد القضبان المطلوبة، وتجنب التكاليف الزائدة أو النظام غير الفعال.' },
        { q: 'كم يستغرق قياس مقاومة التربة؟', a: 'تستغرق عملية القياس من 1-3 ساعات حسب مساحة الموقع وعدد نقاط القياس.' },
      ],
    },
    en: {
      seoTitle: 'Soil Resistance Testing | Soil Resistivity Measurement for Grounding - Ground Tech',
      seoDescription: 'Professional soil resistivity measurement service using Wenner 4-point method for accurate earthing system design in Egypt.',
      h1: 'Soil Resistance Testing',
      subtitle: 'Accurate soil resistivity measurement for effective earthing design',
      intro: 'Soil resistivity measurement is the first and most important step in designing any earthing system. We use the latest testing equipment to determine soil characteristics accurately.',
      methods: [
        { title: 'Wenner 4-Point Method', desc: 'The most accurate method for measuring soil resistivity using 4 electrodes.' },
        { title: 'Schlumberger Method', desc: 'Suitable for large areas and provides information about different soil layers.' },
        { title: '3-Electrode Measurement', desc: 'Quick method for small sites and existing buildings.' },
      ],
      steps: [
        'Identify measurement points based on site area',
        'Install electrodes at required spacing',
        'Take measurements in multiple directions for accurate average',
        'Analyze results and determine soil type and resistivity',
        'Provide recommendations for the appropriate earthing system',
      ],
      soilTypes: [
        { name: 'Clay Soil', resistivity: '10 - 100', quality: 'Excellent' },
        { name: 'Sandy Soil', resistivity: '50 - 500', quality: 'Good' },
        { name: 'Rocky Soil', resistivity: '1000 - 10000', quality: 'Difficult - needs treatment' },
      ],
      faq: [
        { q: 'Why is soil resistivity measurement important?', a: 'To determine the best earthing system type and location, calculate required number of rods, and avoid overspending or ineffective systems.' },
        { q: 'How long does soil resistivity testing take?', a: 'The measurement process takes 1-3 hours depending on site area and number of test points.' },
      ],
    },
  };

  const d = data[locale];
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', url: `${companyInfo.urls.website}/services` },
    { name: locale === 'ar' ? 'قياس مقاومة التربة' : 'Soil Resistance', url: `${companyInfo.urls.website}/services/earthing/soil-resistance` },
  ];

  return (
    <>
      <SEOHead title={getTitleByPath('/services/earthing/soil-resistance', locale)} description={d.seoDescription} url={`${companyInfo.urls.website}/services/earthing/soil-resistance`} breadcrumbs={breadcrumbs} />
      <main className="bg-white">
        <section className="relative bg-gradient-to-br from-primary via-primary to-secondary min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-72 h-72 border border-white rounded-full" />
          </div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                {locale === 'ar' ? 'فحص هندسي دقيق' : 'Precision Engineering Testing'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{d.h1}</h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{d.intro}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all">
                <Phone className="w-5 h-5" />
                {locale === 'ar' ? 'اطلب فحص التربة' : 'Request Soil Testing'}
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'طرق القياس' : 'Measurement Methods'}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {d.methods.map((m, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <BarChart3 className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{m.title}</h3>
                  <p className="text-gray-600">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'خطوات القياس' : 'Testing Steps'}
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {d.steps.map((step, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                  <span className="text-gray-700">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-center mb-12">
              {locale === 'ar' ? 'أنواع التربة ومقاومتها' : 'Soil Types & Resistivity'}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {d.soilTypes.map((s, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <Droplets className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                  <p className="text-white/80">{s.resistivity} Ω.m</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">{s.quality}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'أسئلة شائعة' : 'FAQ'}
            </motion.h2>
            <div className="space-y-4">
              {d.faq.map((item, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
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
                <Link to="/services/earthing/maintenance" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'صيانة التأريض' : 'Earthing Maintenance'}</Link>
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
