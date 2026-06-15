import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Factory, Shield, CheckCircle2, ArrowRight, Phone, Settings, Cpu, Zap, Award } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { getTitleByPath } from '../../lib/seoTitles';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function EarthingIndustrialPage() {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';
  const isRTL = locale === 'ar';

  const data = {
    ar: {
      seoTitle: 'التأريض الصناعي | أنظمة تأريض المصانع والمنشآت الصناعية في مصر - Ground Tech',
      seoDescription: 'تصميم وتنفيذ أنظمة التأريض الصناعي للمصانع والمحطات الكهربائية والمنشآت الصناعية في مصر. شبكات تأريض، تأريض المعدات، وربط الهياكل المعدنية.',
      h1: 'التأريض الصناعي',
      subtitle: 'حماية المنشآت الصناعية بأنظمة تأريض احترافية',
      intro: 'التأريض الصناعي هو العمود الفقري لسلامة المنشآت الصناعية. نصمم وننفذ أنظمة تأريض متكاملة للمصانع ومحطات الطاقة والمنشآت البتروكيماوية وفق أعلى المعايير الدولية.',
      types: [
        { title: 'شبكات التأريض', desc: 'شبكة من الموصلات النحاسية المدفونة أفقيًا تغطي مساحة المنشأة بالكامل لضمان توزيع متساوي للجهد.' },
        { title: 'تأريض المعدات', desc: 'ربط جميع الهياكل والمعدات المعدنية بنظام التأريض لمنع فروق الجهد الخطرة.' },
        { title: 'تأريض المحطات', desc: 'تصميم شبكات تأريض للمحطات الكهربائية ومحولات التوزيع وفق IEEE 80.' },
        { title: 'تأريض الخزانات', desc: 'أنظمة تأريض خاصة لخزانات الوقود والغاز والمواد الكيميائية.' },
      ],
      benefits: [
        'حماية العاملين من الصعق الكهربائي',
        'حماية المعدات الحساسة من الأعطال',
        'الامتثال لمعايير السلامة الصناعية',
        'تقليل مخاطر الحرائق الكهربائية',
        'تحسين استمرارية التشغيل والإنتاج',
      ],
      standards: ['IEC 62305', 'IEEE 80', 'NFPA 780', 'API RP 2003'],
      faq: [
        { q: 'ما الفرق بين التأريض الصناعي والتأريض العادي؟', a: 'التأريض الصناعي يتعامل مع تيارات أعلى ومعدات أكبر ويتطلب شبكات أكثر تعقيدًا مع مقاومة تأريض أقل (عادة أقل من 1-5 أوم) مقارنة بالتأريض العادي.' },
        { q: 'كم مرة يجب فحص نظام التأريض في المصانع؟', a: 'يفضل الفحص كل 6 أشهر مع قياس مقاومة التأريض ومراجعة الوصلات، وبعد أي تعديلات في المنشأة أو أعطال كهربائية.' },
        { q: 'ما هي مقاومة التأريض المطلوبة للمصانع؟', a: 'حسب الكود المصري والمعايير الدولية، يفضل أن تكون مقاومة التأريض للمنشآت الصناعية أقل من 5 أوم وللمحطات أقل من 1 أوم.' },
      ],
    },
    en: {
      seoTitle: 'Industrial Earthing | Factory Grounding Systems in Egypt - Ground Tech',
      seoDescription: 'Design and installation of industrial earthing systems for factories, power stations, and industrial facilities in Egypt. Ground grids, equipment grounding, and structural bonding.',
      h1: 'Industrial Earthing',
      subtitle: 'Protecting industrial facilities with professional grounding systems',
      intro: 'Industrial earthing is the backbone of industrial facility safety. We design and install complete earthing systems for factories, power plants, and petrochemical facilities according to the highest international standards.',
      types: [
        { title: 'Ground Grids', desc: 'Network of buried copper conductors covering the entire facility area to ensure uniform voltage distribution.' },
        { title: 'Equipment Grounding', desc: 'Bonding all metallic structures and equipment to the earthing system to prevent dangerous voltage differences.' },
        { title: 'Substation Grounding', desc: 'Ground grid design for electrical substations and distribution transformers per IEEE 80.' },
        { title: 'Tank Grounding', desc: 'Specialized earthing systems for fuel, gas, and chemical storage tanks.' },
      ],
      benefits: [
        'Worker protection from electric shock',
        'Sensitive equipment protection from faults',
        'Industrial safety standards compliance',
        'Reduced electrical fire risk',
        'Improved operational continuity',
      ],
      standards: ['IEC 62305', 'IEEE 80', 'NFPA 780', 'API RP 2003'],
      faq: [
        { q: 'What is the difference between industrial and residential earthing?', a: 'Industrial earthing handles higher fault currents and larger equipment, requiring more complex networks with lower resistance (typically under 1-5 ohms) compared to residential earthing.' },
        { q: 'How often should industrial earthing be inspected?', a: 'Every 6 months with resistance measurement and connection review, and after any facility modifications or electrical faults.' },
        { q: 'What is the required ground resistance for factories?', a: 'According to Egyptian code and international standards, industrial facilities should have ground resistance below 5 ohms, and substations below 1 ohm.' },
      ],
    },
  };

  const d = data[locale];
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', url: `${companyInfo.urls.website}/services` },
    { name: locale === 'ar' ? 'التأريض الصناعي' : 'Industrial Earthing', url: `${companyInfo.urls.website}/services/earthing/industrial` },
  ];

  return (
    <>
      <SEOHead
        title={getTitleByPath('/services/earthing/industrial', locale)}
        description={d.seoDescription}
        url={`${companyInfo.urls.website}/services/earthing/industrial`}
        breadcrumbs={breadcrumbs}
      />
      <main className="bg-white">
        <section className="relative bg-gradient-to-br from-primary via-primary to-secondary min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-72 h-72 border border-white rounded-full" />
            <div className="absolute bottom-20 left-20 w-96 h-96 border border-white rounded-full" />
          </div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                {locale === 'ar' ? 'حلول صناعية متخصصة' : 'Specialized Industrial Solutions'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{d.h1}</h1>
              <p className="text-xl text-white/90 mb-4">{d.subtitle}</p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{d.intro}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all shadow-lg">
                  <Phone className="w-5 h-5" />
                  {locale === 'ar' ? 'طلب استشارة' : 'Request Consultation'}
                </Link>
                <Link to="/services/earthing-systems" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl transition-all border border-white/30">
                  {locale === 'ar' ? 'أنظمة التأريض' : 'Earthing Systems'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'أنظمة التأريض الصناعي التي ننفذها' : 'Industrial Earthing Systems We Deliver'}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {d.types.map((item, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <Settings className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'المزايا' : 'Benefits'}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {d.benefits.map((b, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{b}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-center mb-12">
              {locale === 'ar' ? 'المعايير المتبعة' : 'Standards Followed'}
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-6">
              {d.standards.map((s, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <Award className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="text-xl font-bold">{s}</h3>
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

        <section className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-white mb-4">
                {locale === 'ar' ? 'احمِ مصنعك بنظام تأريض احترافي' : 'Protect Your Factory with Professional Earthing'}
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                {locale === 'ar' ? 'نصمم وننفذ نظام التأريض المناسب لمنشأتك الصناعية' : 'We design and install the right earthing system for your industrial facility'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all">
                  {locale === 'ar' ? 'تواصل مع فريقنا' : 'Contact Our Team'}
                </Link>
                <Link to="/services/earthing-systems" className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl transition-all">
                  {locale === 'ar' ? 'العودة لخدمات التأريض' : 'Back to Earthing Services'}
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-white/20">
                <p className="text-white/70 text-sm w-full mb-2">{locale === 'ar' ? 'خدمات تأريض ذات صلة' : 'Related Earthing Services'}</p>
                <Link to="/services/earthing/soil-resistance" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'قياس مقاومة التربة' : 'Soil Resistance Testing'}</Link>
                <Link to="/services/earthing/maintenance" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'صيانة التأريض' : 'Earthing Maintenance'}</Link>
                <Link to="/services/earthing/specifications" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'مواصفات التأريض' : 'Earthing Specifications'}</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
