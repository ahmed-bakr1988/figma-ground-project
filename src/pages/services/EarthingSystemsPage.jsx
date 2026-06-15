/**
 * ================================
 * صفحة أنظمة التأريض الكهربائية
 * ================================
 * 
 * Service Pillar Page - Earthing Systems
 * /services/earthing-systems
 * 
 * Keywords: أنظمة التأريض، نظام التأريض الكهربائي، شركة تأريض في مصر
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap,
  Shield,
  CheckCircle2,
  ArrowRight,
  Phone,
  FileCheck,
  Settings,
  Layers,
  Activity,
  Award,
  Building2,
  Factory,
  Home,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { getFAQSchema } from '../../config/seoSchema';

// ================================
// Page Data
// ================================

const pageData = {
  ar: {
    // Hero Section
    hero: {
      title: 'أنظمة التأريض الكهربائية',
      subtitle: 'تصميم وتنفيذ أنظمة التأريض في مصر',
      description: 'نقدم حلول التأريض الكهربائية المتكاملة للمباني والمنشآت الصناعية وفق أعلى المعايير العالمية والكود المصري. حماية موثوقة لمنشأتك.',
      cta: 'احصل على عرض سعر مجاني',
    },
    
    // What is Earthing Section
    whatIs: {
      title: 'ما هو نظام التأريض الكهربائي؟',
      content: 'نظام التأريض الكهربائي هو منظومة متكاملة تهدف إلى توفير مسار آمن للتيارات الكهربائية غير المرغوبة نحو الأرض. يُعد التأريض عنصرًا أساسيًا في أي نظام كهربائي لحماية الأشخاص والمعدات من مخاطر الصدمات الكهربائية والأعطال.',
      points: [
        'يوفر مسارًا آمنًا لتفريغ التيارات الزائدة',
        'يحمي الأجهزة الإلكترونية الحساسة من التلف',
        'يقلل من مخاطر الحرائق الكهربائية',
        'ضروري لعمل أجهزة الحماية (القواطع وRCD)',
      ],
    },

    // Why Ground Tech Section
    whyUs: {
      title: 'لماذا تختار Ground Tech؟',
      features: [
        {
          icon: Award,
          title: 'خبرة 15+ سنة',
          description: 'فريق هندسي متخصص بخبرة واسعة في مشاريع التأريض',
        },
        {
          icon: FileCheck,
          title: 'التزام بالمعايير',
          description: 'نلتزم بالكود المصري والمعايير الدولية IEC و IEEE',
        },
        {
          icon: Shield,
          title: 'ضمان شامل',
          description: 'ضمان على جميع أعمالنا مع صيانة دورية',
        },
        {
          icon: Activity,
          title: 'قياسات دقيقة',
          description: 'نستخدم أحدث أجهزة قياس مقاومة التربة والتأريض',
        },
      ],
    },

    // Types of Earthing Section
    types: {
      title: 'أنواع أنظمة التأريض',
      subtitle: 'نوفر جميع أنواع أنظمة التأريض حسب طبيعة المنشأة والتربة',
      items: [
        {
          icon: Layers,
          title: 'التأريض بالقضبان (Rod Earthing)',
          description: 'الأكثر شيوعًا - يستخدم قضبان نحاسية أو مجلفنة تُدفن رأسيًا في التربة. مناسب للمباني السكنية والتجارية.',
          suitable: 'المباني السكنية والتجارية',
        },
        {
          icon: Settings,
          title: 'التأريض الشبكي (Grid Earthing)',
          description: 'شبكة من الموصلات المدفونة أفقيًا تحت الأرض. مثالي للمحطات الكهربائية والمنشآت الصناعية الكبيرة.',
          suitable: 'المحطات الكهربائية والمصانع',
        },
        {
          icon: Activity,
          title: 'التأريض الكيميائي (Chemical Earthing)',
          description: 'يستخدم مركبات كيميائية لتحسين موصلية التربة. الحل الأمثل للتربة الصخرية أو الجافة.',
          suitable: 'التربة الصخرية والجافة',
        },
        {
          icon: Factory,
          title: 'تأريض الأنظمة الصناعية',
          description: 'أنظمة تأريض متخصصة للمصانع ومحطات الطاقة تشمل تأريض المعدات والهياكل المعدنية.',
          suitable: 'المصانع ومحطات الطاقة',
        },
      ],
    },

    // Implementation Steps
    steps: {
      title: 'خطوات تنفيذ نظام التأريض',
      items: [
        {
          number: '01',
          title: 'الدراسة الأولية',
          description: 'تحليل متطلبات المنشأة والأحمال الكهربائية',
        },
        {
          number: '02',
          title: 'قياس مقاومة التربة',
          description: 'فحص التربة باستخدام أجهزة متخصصة لتحديد نوع النظام الأمثل',
        },
        {
          number: '03',
          title: 'التصميم الهندسي',
          description: 'إعداد المخططات التنفيذية وفق المعايير والكود',
        },
        {
          number: '04',
          title: 'التنفيذ والتركيب',
          description: 'تنفيذ الأعمال بواسطة فريق متخصص مع مراقبة الجودة',
        },
        {
          number: '05',
          title: 'الاختبار والتسليم',
          description: 'قياس مقاومة التأريض والتأكد من مطابقتها للمواصفات',
        },
      ],
    },

    // Cost Section
    cost: {
      title: 'تكلفة نظام التأريض',
      description: 'تعتمد تكلفة نظام التأريض على عدة عوامل:',
      factors: [
        'نوع وحجم المنشأة (سكني، تجاري، صناعي)',
        'طبيعة التربة ومقاومتها الكهربائية',
        'نوع نظام التأريض المطلوب',
        'عدد نقاط التأريض المطلوبة',
        'المواد المستخدمة (نحاس، جلفنة، ستانلس)',
      ],
      cta: 'اطلب عرض سعر مجاني',
      note: 'نقدم عروض أسعار تنافسية مع دراسة مجانية لموقعك',
    },

    // Standards Section
    standards: {
      title: 'المعايير والكود المتبع',
      items: [
        {
          code: 'IEC 62305',
          name: 'المعيار الدولي للحماية من الصواعق',
          description: 'يشمل متطلبات التأريض لأنظمة الحماية',
        },
        {
          code: 'IEEE 80',
          name: 'دليل التأريض للمحطات الكهربائية',
          description: 'المرجع الأساسي لتصميم شبكات التأريض',
        },
        {
          code: 'الكود المصري',
          name: 'كود الأعمال الكهربائية المصري',
          description: 'الاشتراطات المحلية لأنظمة التأريض في مصر',
        },
        {
          code: 'NEC',
          name: 'الكود الكهربائي الوطني الأمريكي',
          description: 'مرجع عالمي لمتطلبات السلامة الكهربائية',
        },
      ],
    },

    // FAQ Section
    faq: {
      title: 'الأسئلة الشائعة عن التأريض',
      items: [
        {
          question: 'ما هي مقاومة التأريض المقبولة؟',
          answer: 'وفقًا للكود المصري والمعايير الدولية، يجب أن تكون مقاومة التأريض للمباني السكنية أقل من 25 أوم، وللمنشآت الصناعية أقل من 5 أوم، أما لمحطات الطاقة فيجب أن تكون أقل من 1 أوم.',
        },
        {
          question: 'كم مرة يجب فحص نظام التأريض؟',
          answer: 'يُنصح بفحص نظام التأريض سنويًا على الأقل، وبعد كل عاصفة رعدية شديدة أو تعديلات كهربائية كبيرة في المبنى. الفحص الدوري يضمن استمرار فعالية النظام.',
        },
        {
          question: 'هل يمكن تحسين نظام تأريض قائم؟',
          answer: 'نعم، يمكن تحسين نظام التأريض القائم بإضافة قضبان إضافية، استخدام مواد كيميائية لتحسين موصلية التربة، أو ربط عدة نقاط تأريض معًا. نقوم بتقييم النظام الحالي وتقديم الحلول المناسبة.',
        },
        {
          question: 'ما الفرق بين التأريض والتصفير (Neutral)؟',
          answer: 'التأريض هو ربط الأجزاء المعدنية غير الحاملة للتيار بالأرض للحماية، بينما التصفير هو الموصل الذي يحمل التيار الراجع في الدائرة الكهربائية. كلاهما ضروري لسلامة النظام الكهربائي ولكن لأغراض مختلفة.',
        },
        {
          question: 'كم تستغرق عملية تركيب نظام التأريض؟',
          answer: 'تعتمد المدة على حجم المشروع ونوع النظام. للمباني السكنية تستغرق 1-2 يوم، للمباني التجارية 3-5 أيام، أما المشاريع الصناعية الكبيرة قد تستغرق أسبوعين أو أكثر.',
        },
      ],
    },

    // CTA Section
    cta: {
      title: 'هل تحتاج نظام تأريض لمنشأتك؟',
      description: 'تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر',
      button: 'تواصل معنا',
      phone: 'أو اتصل مباشرة',
    },
  },

  en: {
    // Hero Section
    hero: {
      title: 'Electrical Earthing Systems',
      subtitle: 'Design & Installation of Grounding Systems in Egypt',
      description: 'We provide comprehensive electrical earthing solutions for buildings and industrial facilities according to the highest international standards and Egyptian code. Reliable protection for your facility.',
      cta: 'Get a Free Quote',
    },
    
    // What is Earthing Section
    whatIs: {
      title: 'What is an Electrical Earthing System?',
      content: 'An electrical earthing system is an integrated system designed to provide a safe path for unwanted electrical currents to flow into the ground. Earthing is an essential element in any electrical system to protect people and equipment from electrical shock hazards and faults.',
      points: [
        'Provides a safe path for discharging excess currents',
        'Protects sensitive electronic devices from damage',
        'Reduces the risk of electrical fires',
        'Essential for protection devices (breakers and RCD) to work',
      ],
    },

    // Why Ground Tech Section
    whyUs: {
      title: 'Why Choose Ground Tech?',
      features: [
        {
          icon: Award,
          title: '15+ Years Experience',
          description: 'Specialized engineering team with extensive experience in earthing projects',
        },
        {
          icon: FileCheck,
          title: 'Standards Compliance',
          description: 'We comply with Egyptian code and international IEC and IEEE standards',
        },
        {
          icon: Shield,
          title: 'Comprehensive Warranty',
          description: 'Warranty on all our work with periodic maintenance',
        },
        {
          icon: Activity,
          title: 'Accurate Measurements',
          description: 'We use the latest soil and earthing resistance measurement devices',
        },
      ],
    },

    // Types of Earthing Section
    types: {
      title: 'Types of Earthing Systems',
      subtitle: 'We provide all types of earthing systems according to the nature of the facility and soil',
      items: [
        {
          icon: Layers,
          title: 'Rod Earthing',
          description: 'Most common - uses copper or galvanized rods buried vertically in soil. Suitable for residential and commercial buildings.',
          suitable: 'Residential and commercial buildings',
        },
        {
          icon: Settings,
          title: 'Grid Earthing',
          description: 'Network of conductors buried horizontally underground. Ideal for electrical substations and large industrial facilities.',
          suitable: 'Substations and factories',
        },
        {
          icon: Activity,
          title: 'Chemical Earthing',
          description: 'Uses chemical compounds to improve soil conductivity. The optimal solution for rocky or dry soil.',
          suitable: 'Rocky and dry soil',
        },
        {
          icon: Factory,
          title: 'Industrial System Earthing',
          description: 'Specialized earthing systems for factories and power stations including equipment and metal structure earthing.',
          suitable: 'Factories and power stations',
        },
      ],
    },

    // Implementation Steps
    steps: {
      title: 'Earthing System Implementation Steps',
      items: [
        {
          number: '01',
          title: 'Initial Study',
          description: 'Analysis of facility requirements and electrical loads',
        },
        {
          number: '02',
          title: 'Soil Resistance Measurement',
          description: 'Soil testing using specialized equipment to determine the optimal system type',
        },
        {
          number: '03',
          title: 'Engineering Design',
          description: 'Preparation of execution drawings according to standards and codes',
        },
        {
          number: '04',
          title: 'Execution & Installation',
          description: 'Work execution by specialized team with quality control',
        },
        {
          number: '05',
          title: 'Testing & Handover',
          description: 'Earthing resistance measurement and verification of specifications compliance',
        },
      ],
    },

    // Cost Section
    cost: {
      title: 'Earthing System Cost',
      description: 'The cost of an earthing system depends on several factors:',
      factors: [
        'Type and size of facility (residential, commercial, industrial)',
        'Nature of soil and its electrical resistance',
        'Type of earthing system required',
        'Number of earthing points required',
        'Materials used (copper, galvanized, stainless)',
      ],
      cta: 'Request a Free Quote',
      note: 'We offer competitive quotes with free site study',
    },

    // Standards Section
    standards: {
      title: 'Standards & Codes Followed',
      items: [
        {
          code: 'IEC 62305',
          name: 'International Lightning Protection Standard',
          description: 'Includes earthing requirements for protection systems',
        },
        {
          code: 'IEEE 80',
          name: 'Substation Grounding Guide',
          description: 'Primary reference for earthing network design',
        },
        {
          code: 'Egyptian Code',
          name: 'Egyptian Electrical Works Code',
          description: 'Local requirements for earthing systems in Egypt',
        },
        {
          code: 'NEC',
          name: 'National Electrical Code (USA)',
          description: 'Global reference for electrical safety requirements',
        },
      ],
    },

    // FAQ Section
    faq: {
      title: 'Frequently Asked Questions About Earthing',
      items: [
        {
          question: 'What is acceptable earthing resistance?',
          answer: 'According to Egyptian code and international standards, earthing resistance for residential buildings should be less than 25 ohms, for industrial facilities less than 5 ohms, and for power stations it should be less than 1 ohm.',
        },
        {
          question: 'How often should the earthing system be inspected?',
          answer: 'It is recommended to inspect the earthing system at least annually, and after any severe thunderstorm or major electrical modifications in the building. Regular inspection ensures continued system effectiveness.',
        },
        {
          question: 'Can an existing earthing system be improved?',
          answer: 'Yes, an existing earthing system can be improved by adding additional rods, using chemical compounds to improve soil conductivity, or connecting multiple earthing points together. We evaluate the current system and provide appropriate solutions.',
        },
        {
          question: 'What is the difference between earthing and neutral?',
          answer: 'Earthing is connecting non-current-carrying metal parts to ground for protection, while neutral is the conductor that carries return current in the electrical circuit. Both are necessary for electrical system safety but for different purposes.',
        },
        {
          question: 'How long does earthing system installation take?',
          answer: 'Duration depends on project size and system type. For residential buildings it takes 1-2 days, for commercial buildings 3-5 days, while large industrial projects may take two weeks or more.',
        },
      ],
    },

    // CTA Section
    cta: {
      title: 'Need an Earthing System for Your Facility?',
      description: 'Contact us now for a free consultation and quote',
      button: 'Contact Us',
      phone: 'Or call directly',
    },
  },
};

// ================================
// Animation Variants
// ================================
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
};

// ================================
// FAQ Item Component
// ================================
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-right bg-white hover:bg-gray-50 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-gray-900">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0 }}
      className="overflow-hidden"
    >
      <p className="p-5 pt-0 text-gray-600 leading-relaxed">{answer}</p>
    </motion.div>
  </div>
);

// ================================
// Main Page Component
// ================================
export default function EarthingSystemsPage() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const locale = isRTL ? 'ar' : 'en';
  const data = pageData[locale];

  // FAQ state
  const [openFAQ, setOpenFAQ] = useState(0);

  // SEO Data
  const seoTitle = locale === 'ar'
    ? 'أنظمة التأريض الكهربائية | تصميم وتنفيذ أنظمة التأريض في مصر - Ground Tech'
    : 'Electrical Earthing Systems | Grounding System Design & Installation in Egypt - Ground Tech';

  const seoDescription = locale === 'ar'
    ? 'نقدم أنظمة التأريض الكهربائية للمباني والمنشآت الصناعية وفق الكود المصري والدولي. تصميم، تنفيذ، وقياس مقاومة التربة باحترافية. اتصل الآن للاستشارة المجانية.'
    : 'We provide electrical earthing systems for buildings and industrial facilities according to Egyptian and international codes. Professional design, installation, and soil resistance measurement. Call now for free consultation.';

  const pageUrl = `${companyInfo.urls.website}/services/earthing-systems`;

  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', url: `${companyInfo.urls.website}/services` },
    { name: locale === 'ar' ? 'أنظمة التأريض' : 'Earthing Systems', url: pageUrl },
  ];

  // FAQ Schema
  const faqSchema = getFAQSchema(
    data.faq.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    locale
  );

  return (
    <>
      {/* SEO Head - استخدام المكون الموجود */}
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={locale === 'ar' 
          ? 'أنظمة التأريض, نظام التأريض الكهربائي, شركة تأريض في مصر, تأريض المباني, قياس مقاومة التربة, التأريض الكيميائي, تأريض المصانع'
          : 'earthing systems, electrical grounding, earthing company Egypt, building grounding, soil resistance measurement, chemical earthing, factory grounding'}
        url={pageUrl}
        breadcrumbs={breadcrumbs}
        schema={faqSchema}
      />

      <main className="bg-white">
        {/* ================================ */}
        {/* Hero Section */}
        {/* ================================ */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-secondary min-h-[60vh] flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-72 h-72 border border-white rounded-full" />
            <div className="absolute bottom-20 left-20 w-96 h-96 border border-white rounded-full" />
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                {locale === 'ar' ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {data.hero.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-4">
                {data.hero.subtitle}
              </p>
              
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {data.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  {data.hero.cta}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl transition-all border border-white/30"
                >
                  {locale === 'ar' ? 'جميع الخدمات' : 'All Services'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================ */}
        {/* What is Earthing Section */}
        {/* ================================ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeInUp} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {data.whatIs.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {data.whatIs.content}
                </p>
              </motion.div>

              <motion.ul
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-4"
              >
                {data.whatIs.points.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ================================ */}
        {/* Why Ground Tech Section */}
        {/* ================================ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {data.whyUs.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {data.whyUs.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================ */}
        {/* Types of Earthing Section */}
        {/* ================================ */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.types.title}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                {data.types.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {data.types.items.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.article
                    key={index}
                    {...fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                        <p className="text-white/80 text-sm mb-3">{type.description}</p>
                        <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
                          {type.suitable}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================ */}
        {/* Implementation Steps Section */}
        {/* ================================ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {data.steps.title}
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {data.steps.items.map((step, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-6 mb-8 last:mb-0"
                >
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    {index < data.steps.items.length - 1 && (
                      <div className="w-px h-8 bg-gray-200 mr-8 mt-4" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================ */}
        {/* Cost Section */}
        {/* ================================ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeInUp} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {data.cost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{data.cost.description}</p>

                  <ul className="space-y-3 mb-8">
                    {data.cost.factors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      {data.cost.cta}
                    </Link>
                    <p className="text-gray-500 text-sm">{data.cost.note}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================================ */}
        {/* Standards Section */}
        {/* ================================ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {data.standards.title}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {data.standards.items.map((standard, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{standard.code}</h3>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{standard.name}</h4>
                  <p className="text-gray-600 text-sm">{standard.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================ */}
        {/* FAQ Section */}
        {/* ================================ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {data.faq.title}
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {data.faq.items.map((item, index) => (
                <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.1 }}>
                  <FAQItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFAQ === index}
                    onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================ */}
        {/* Final CTA Section */}
        {/* ================================ */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {data.cta.title}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {data.cta.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  {data.cta.button}
                </Link>
                <div className="text-white/80">
                  <span className="text-sm block mb-1">{data.cta.phone}</span>
                  <a
                    href={companyInfo.contact.phone.telHref}
                    className="text-xl font-bold text-accent hover:text-accent/90 transition-colors"
                    dir="ltr"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {companyInfo.contact.phone.shortDisplay}
                  </a>
                </div>
              </div>

              {/* Internal Links */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-white/70 mb-4 text-sm">
                  {locale === 'ar' ? 'روابط ذات صلة' : 'Related Links'}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'جميع الخدمات' : 'All Services'}
                  </Link>
                  <Link
                    to="/services/earthing/industrial"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'تأريض المنشآت الصناعية' : 'Industrial Earthing'}
                  </Link>
                  <Link
                    to="/services/earthing/soil-resistance"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'قياس مقاومة التربة' : 'Soil Resistance Testing'}
                  </Link>
                  <Link
                    to="/services/earthing/maintenance"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'صيانة أنظمة التأريض' : 'Earthing Maintenance'}
                  </Link>
                  <Link
                    to="/services/earthing/specifications"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'مواصفات التأريض الفنية' : 'Earthing Specifications'}
                  </Link>
                  <Link
                    to="/projects"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'مشاريعنا' : 'Our Projects'}
                  </Link>
                  <Link
                    to="/contact"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                  </Link>
                  <Link
                    to="/faq"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
