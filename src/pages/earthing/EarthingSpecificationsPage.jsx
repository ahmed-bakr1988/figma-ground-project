import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, ArrowRight, Phone, BookOpen, Award, Shield, Zap } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { getTitleByPath } from '../../lib/seoTitles';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function EarthingSpecificationsPage() {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';

  const data = {
    ar: {
      seoTitle: 'مواصفات أنظمة التأريض | المعايير الفنية والكودات القياسية للتأريض - Ground Tech',
      seoDescription: 'المواصفات الفنية لأنظمة التأريض وفق الكود المصري والمعايير الدولية IEC, IEEE, NFPA. دليل شامل لتصميم وتنفيذ أنظمة التأريض.',
      h1: 'مواصفات أنظمة التأريض',
      subtitle: 'الدليل الفني لمواصفات ومعايير أنظمة التأريض',
      intro: 'نقدم الدليل الفني الشامل لمواصفات أنظمة التأريض وفق الكود المصري والمعايير الدولية لضمان تصميم وتنفيذ آمن وفعال.',
      specs: [
        { title: locale === 'ar' ? 'مقاومة التأريض' : 'Ground Resistance', code: locale === 'ar' ? 'الكود المصري' : 'Egyptian Code', value: locale === 'ar' ? 'سكني < 25 Ω، صناعي < 5 Ω، محطات < 1 Ω' : 'Residential < 25 Ω, Industrial < 5 Ω, Substations < 1 Ω' },
        { title: locale === 'ar' ? 'مادة القضبان' : 'Rod Material', code: 'IEC 62561', value: locale === 'ar' ? 'نحاس مطلي بالكهرباء أو ستانلس ستيل' : 'Copper-bonded steel or stainless steel' },
        { title: locale === 'ar' ? 'قطر القضيب الأدنى' : 'Minimum Rod Diameter', code: locale === 'ar' ? 'الكود المصري' : 'Egyptian Code', value: '16 mm' },
        { title: locale === 'ar' ? 'عمق القضيب' : 'Rod Depth', code: 'IEEE 80', value: locale === 'ar' ? '3-6 متر حسب التربة' : '3-6 meters depending on soil' },
      ],
      standards: [
        { name: 'IEC 62305', desc: locale === 'ar' ? 'الحماية من الصواعق' : 'Lightning Protection' },
        { name: 'IEEE 80', desc: locale === 'ar' ? 'دليل تأريض المحطات' : 'Substation Grounding Guide' },
        { name: 'NFPA 780', desc: locale === 'ar' ? 'أنظمة الحماية من الصواعق' : 'Lightning Protection Systems' },
        { name: 'BS 7430', desc: locale === 'ar' ? 'دليل التأريض العملي' : 'Earthing Practice Guide' },
      ],
      faq: [
        { q: locale === 'ar' ? 'ما هو الكود المصري للتأريض؟' : 'What is the Egyptian Code for earthing?', a: locale === 'ar' ? 'الكود المصري للأعمال الكهربائية يحدد متطلبات التأريض للمباني والمنشآت في مصر ويشمل مقاومة التأريض ونوع المواد وطرق التنفيذ.' : 'The Egyptian Electrical Code specifies earthing requirements for buildings in Egypt including resistance values, material types, and installation methods.' },
      ],
    },
    en: {
      seoTitle: 'Earthing System Specifications | Technical Standards & Codes - Ground Tech',
      seoDescription: 'Technical specifications for earthing systems according to Egyptian code and international standards IEC, IEEE, NFPA. Complete guide for earthing system design.',
      h1: 'Earthing Specifications',
      subtitle: 'Technical guide to earthing system standards and specifications',
      intro: 'We provide a comprehensive technical guide to earthing system specifications according to Egyptian code and international standards for safe and effective design and installation.',
      specs: [
        { title: 'Ground Resistance', code: 'Egyptian Code', value: 'Residential < 25 Ω, Industrial < 5 Ω, Substations < 1 Ω' },
        { title: 'Rod Material', code: 'IEC 62561', value: 'Copper-bonded steel or stainless steel' },
        { title: 'Minimum Rod Diameter', code: 'Egyptian Code', value: '16 mm' },
        { title: 'Rod Depth', code: 'IEEE 80', value: '3-6 meters depending on soil' },
      ],
      standards: [
        { name: 'IEC 62305', desc: 'Lightning Protection' },
        { name: 'IEEE 80', desc: 'Substation Grounding Guide' },
        { name: 'NFPA 780', desc: 'Lightning Protection Systems' },
        { name: 'BS 7430', desc: 'Earthing Practice Guide' },
      ],
      faq: [
        { q: 'What is the Egyptian Code for earthing?', a: 'The Egyptian Electrical Code specifies earthing requirements for buildings in Egypt including resistance values, material types, and installation methods.' },
      ],
    },
  };

  const d = data[locale];
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', url: `${companyInfo.urls.website}/services` },
    { name: locale === 'ar' ? 'مواصفات التأريض' : 'Earthing Specifications', url: `${companyInfo.urls.website}/services/earthing/specifications` },
  ];

  return (
    <>
      <SEOHead title={getTitleByPath('/services/earthing/specifications', locale)} description={d.seoDescription} url={`${companyInfo.urls.website}/services/earthing/specifications`} breadcrumbs={breadcrumbs} />
      <main className="bg-white">
        <section className="relative bg-gradient-to-br from-primary via-primary to-secondary min-h-[50vh] flex items-center overflow-hidden">
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                {locale === 'ar' ? 'دليل فني معتمد' : 'Certified Technical Guide'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{d.h1}</h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{d.intro}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all">
                <Phone className="w-5 h-5" />
                {locale === 'ar' ? 'استشارة فنية' : 'Technical Consultation'}
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-gray-900 text-center mb-12">
              {locale === 'ar' ? 'المواصفات الفنية الرئيسية' : 'Key Technical Specifications'}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {d.specs.map((s, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <FileText className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{s.title}</h3>
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full mb-3">{s.code}</span>
                  <p className="text-gray-700">{s.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 {...fadeInUp} className="text-3xl font-bold text-center mb-12">
              {locale === 'ar' ? 'المعايير الدولية' : 'International Standards'}
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-6">
              {d.standards.map((s, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <Award className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-1">{s.name}</h3>
                  <p className="text-white/70 text-sm">{s.desc}</p>
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
                <Link to="/services/earthing/maintenance" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'صيانة التأريض' : 'Earthing Maintenance'}</Link>
                <Link to="/services/earthing-systems" className="text-white/80 hover:text-accent transition-colors text-sm">{locale === 'ar' ? 'أنظمة التأريض' : 'Earthing Systems'}</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
