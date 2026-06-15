/**
 * ================================
 * معلومات الشركة الموحدة - Ground Tech Egypt
 * ================================
 * 
 * هذا الملف يحتوي على جميع بيانات الشركة المستخدمة في:
 * - واجهة المستخدم (UI)
 * - SEO و Schema Markup
 * - Meta Tags
 * - Social Media
 */

const companyInfo = {
  // ================================
  // معلومات الشركة الأساسية
  // ================================
  name: {
    en: 'Ground Tech Egypt',
    ar: 'جراوند تك مصر',
    brand: 'GroundTech',
    legal: 'Ground Tech for Lightning Protection Systems',
  },

  description: {
    short: {
      en: 'Leading lightning protection and earthing systems company in Egypt',
      ar: 'الشركة الرائدة في أنظمة الحماية من الصواعق والتأريض في مصر',
    },
    long: {
      en: 'Ground Tech Egypt is a specialized company providing professional lightning protection, earthing systems, and surge protection solutions for residential, commercial, and industrial facilities across Egypt and the Middle East.',
      ar: 'جراوند تك مصر شركة متخصصة في تقديم حلول احترافية للحماية من الصواعق وأنظمة التأريض والحماية من التيار الزائد للمنشآت السكنية والتجارية والصناعية في مصر والشرق الأوسط.',
    },
  },

  // ================================
  // URLs والروابط
  // ================================
  urls: {
    website: 'https://ground-eg.com',
    logo: 'https://ground-eg.com/assets/logo/logo.png',
    ogImage: 'https://ground-eg.com/assets/images/og-image.webp',
  },

  // ================================
  // معلومات الاتصال
  // ================================
  contact: {
    phone: {
      primary: '+02 44 55-8904',
      secondary: '+2 010 440-44855',
      telHref: 'tel:+201044044855',
      shortDisplay: '+201044044855',
      whatsapp: '+201044044855',
      whatsappLink: 'https://wa.me/201044044855',
    },
    email: {
      primary: 'info@ground-eg.com',
      secondary: 'support@ground-eg.com',
      sales: 'sales@ground-eg.com',
      mailto: 'mailto:info@ground-eg.com',
    },
    address: {
      street: {
        en: '5th District, Plot 3, Block 16079',
        ar: 'الحي الخامس، قطعة 3، بلوك 16079',
      },
      city: {
        en: 'Obour City',
        ar: 'مدينة العبور',
      },
      region: {
        en: 'Qalyubia Governorate',
        ar: 'محافظة القليوبية',
      },
      country: {
        en: 'Egypt',
        ar: 'مصر',
      },
      postalCode: '11511',
      full: {
        en: 'Obour City, 5th District, Plot 3, Block 16079, Egypt',
        ar: 'مدينة العبور، الحي الخامس، قطعة 3، بلوك 16079، مصر',
      },
      // للتوافق مع الكود القديم
      line1: {
        en: '5th District, Plot 3, Block 16079',
        ar: 'الحي الخامس، قطعة 3، بلوك 16079',
      },
      line2: {
        en: 'Obour City, Egypt',
        ar: 'مدينة العبور، مصر',
      },
      mapLink: 'https://maps.google.com/?q=30.0444,31.2357',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.8!2d31.4833!3d30.2333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE0JzAwLjAiTiAzMcKwMjknMDAuMCJF!5e0!3m2!1sen!2seg!4v1704000000000!5m2!1sen!2seg',
      label: {
        en: 'GroundTech Headquarters',
        ar: 'المقر الرئيسي لـ GroundTech',
      },
      geo: {
        latitude: 30.0444,
        longitude: 31.2357,
      },
    },
    hours: {
      weekdays: {
        en: 'Sun - Thu: 8:00 AM - 6:00 PM',
        ar: 'الأحد - الخميس: 8:00 ص - 6:00 م',
      },
      friday: {
        en: 'Friday: Closed',
        ar: 'الجمعة: مغلق',
      },
      saturday: {
        en: 'Saturday: 9:00 AM - 2:00 PM',
        ar: 'السبت: 9:00 ص - 2:00 م',
      },
      emergency: {
        en: 'Emergency: 24/7 Available',
        ar: 'الطوارئ: متاح 24/7',
      },
      // Schema.org format
      schema: [
        { dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '18:00' },
        { dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' },
      ],
    },
  },

  // ================================
  // روابط السوشيال ميديا
  // ================================
  social: {
    facebook: 'https://www.facebook.com/groundeg',
    twitter: 'https://twitter.com/groundeg',
    linkedin: 'https://www.linkedin.com/in/ground-tech-4831063a1/',
    instagram: 'https://www.instagram.com/groundtech.eg',
    youtube: 'https://www.youtube.com/@groundeg',
  },

  // ================================
  // الإحصائيات
  // ================================
  stats: {
    clients: '2,500+',
    clientsNumber: 2500,
    experience: '10+',
    experienceYears: 10,
    projects: '5,000+',
    projectsNumber: 5000,
    satisfaction: '99%',
    satisfactionRate: 99,
    support: '24/7',
    rating: 4.9,
    reviewCount: 127,
  },

  // ================================
  // SEO الكلمات المفتاحية
  // ================================
  seo: {
    themeColor: '#0E3A5D',
    twitterHandle: '@groundeg',
    keywords: {
      ar: [
        'حماية من الصواعق',
        'مانع صواعق',
        'تأريض كهربائي',
        'نظام الحماية من الصواعق',
        'شركة حماية من الصواعق مصر',
        'تركيب مانع صواعق',
        'صيانة نظام الحماية',
        'الحماية من التيار الزائد',
        'أنظمة التأريض',
        'حماية المباني من الصواعق',
        ' الحماية من الصواعق',
        'أنظمة الحماية من الصواعق',
        'مانع الصواعق للمباني',
        'شركة حماية من الصواعق في مصر',
        'أنظمة الحماية من الصواعق في مصر',
        'تركيب مانع صواعق في القاهرة',
        'تركيب مانع صواعق في الجيزة',
        'شركة تأريض في مصر',
        'مقاومة التأريض',
        'قياس مقاومة التربة',
        'الحماية من زيادة الجهد',
        'SPD مصر',
        'تقييم مخاطر الصواعق',
        'صيانة مانع الصواعق',
        'فحص نظام الحماية من الصواعق',
        'حماية المباني من الصواعق في مصر',
        'شركة مانعات صواعق',
        'تكلفة مانع صواعق',
        'تركيب SPD',
        'أجهزة حماية اللوحات الكهربائية',
      ],
      en: [
        'Lightning Protection',
        'Lightning Rod',
        'Electrical Grounding',
        'Lightning Protection System',
        'Lightning Protection Company Egypt',
        'Lightning Rod Installation',
        'Protection System Maintenance',
        'Overcurrent Protection',
        'Grounding Systems',
        'Building Lightning Protection',
        'Lightning Protection',
        'Lightning Protection Systems',
        'Lightning Rod for Buildings',
        'Lightning Protection Company in Egypt',
        'lightning protection system Egypt',
        'lightning protection systems in Egypt',
        'lightning rod installation Egypt',
        'grounding company Egypt',
        'earthing systems Egypt',
        'surge protection Egypt',
        'SPD Egypt',
        'lightning risk assessment Egypt',
        'lightning protection maintenance',
        'ground resistance testing',
        'lightning protection contractor',
        'building lightning protection Egypt',
        'electrical panel surge protection',
        'lightning inspection service',
      ],
    },
    titles: {
      home: {
        en: 'Ground Tech Egypt | Lightning Protection & Earthing Systems',
        ar: 'جراوند تك مصر | أنظمة الحماية من الصواعق والتأريض',
      },
      services: {
        en: 'Lightning Protection Services | Ground Tech Egypt',
        ar: 'خدمات الحماية من الصواعق | جراوند تك مصر',
      },
      about: {
        en: 'About Us | Ground Tech Egypt - Lightning Protection Experts',
        ar: 'من نحن | جراوند تك مصر - خبراء الحماية من الصواعق',
      },
      contact: {
        en: 'Contact Us | Ground Tech Egypt',
        ar: 'اتصل بنا | جراوند تك مصر',
      },
      projects: {
        en: 'Our Projects | Ground Tech Egypt Portfolio',
        ar: 'مشاريعنا | أعمال جراوند تك مصر',
      },
      blog: {
        en: 'Blog | Lightning Protection Tips & News',
        ar: 'المدونة | نصائح وأخبار الحماية من الصواعق',
      },
      faq: {
        en: 'FAQ | Lightning Protection Questions Answered',
        ar: 'الأسئلة الشائعة | إجابات عن الحماية من الصواعق',
      },
      lightningProtectionSystems: {
        en: 'Lightning Protection Systems | Ground Tech Egypt',
        ar: 'أنظمة الحماية من الصواعق | جراوند تك مصر',
      },
      lightningRodInstallation: {
        en: 'Lightning Rod Installation | Ground Tech Egypt',
        ar: 'تركيب مانع صواعق | جراوند تك مصر',
      },
      surgeProtection: {
        en: 'Surge Protection | Ground Tech Egypt',
        ar: 'الحماية من زيادة الجهد | جراوند تك مصر',
      },
      lightningRiskAssessment: {
        en: 'Lightning Risk Assessment | Ground Tech Egypt',
        ar: 'تقييم مخاطر الصواعق | جراوند تك مصر',
      },
      maintenanceInspection: {
        en: 'Maintenance & Inspection | Ground Tech Egypt',
        ar: 'صيانة وفحص الأنظمة | جراوند تك مصر',
      },
    },
  },

  // ================================
  // الشهادات والاعتمادات
  // ================================
  certifications: [
    { name: 'ISO 9001:2015', description: { en: 'Quality Management', ar: 'إدارة الجودة' } },
    { name: 'IEC 62305', description: { en: 'Lightning Protection Standard', ar: 'معيار الحماية من الصواعق' } },
    { name: 'NFPA 780', description: { en: 'Lightning Protection Systems', ar: 'أنظمة الحماية من الصواعق' } },
    { name: 'UL Listed', description: { en: 'Safety Certified', ar: 'معتمد للسلامة' } },
    { name: 'LPI Certified', description: { en: 'Lightning Protection Institute', ar: 'معهد الحماية من الصواعق' } },
  ],

  // ================================
  // الخدمات الرئيسية (للـ Schema)
  // ================================
  services: [
    {
      id: 'lightning-protection-systems',
      name: { en: 'Lightning Protection Systems', ar: 'أنظمة الحماية من الصواعق' },
      description: {
        en: 'Complete lightning protection solutions for buildings and facilities',
        ar: 'حلول شاملة للحماية من الصواعق للمباني والمنشآت',
      },
    },
    {
      id: 'lightning-rod-installation',
      name: { en: 'Lightning Rod Installation', ar: 'تركيب مانع صواعق' },
      description: {
        en: 'Supply, installation, and inspection of lightning rod systems for buildings and facilities',
        ar: 'توريد وتركيب وفحص أنظمة مانعات الصواعق للمباني والمنشآت',
      },
    },
    {
      id: 'earthing-systems',
      name: { en: 'Earthing & Grounding Systems', ar: 'أنظمة التأريض' },
      description: {
        en: 'Professional earthing and grounding system installation',
        ar: 'تركيب احترافي لأنظمة التأريض',
      },
    },
    {
      id: 'surge-protection',
      name: { en: 'Surge Protection', ar: 'الحماية من التيار الزائد' },
      description: {
        en: 'Surge protection devices for electrical systems',
        ar: 'أجهزة الحماية من التيار الزائد للأنظمة الكهربائية',
      },
    },
    {
      id: 'lightning-risk-assessment',
      name: { en: 'Lightning Risk Assessment', ar: 'تقييم مخاطر الصواعق' },
      description: {
        en: 'Engineering assessment to determine lightning protection requirements and scope',
        ar: 'تقييم هندسي لتحديد الحاجة إلى الحماية من الصواعق ونطاق الأعمال المطلوب',
      },
    },
    {
      id: 'maintenance-inspection',
      name: { en: 'Maintenance & Inspection', ar: 'الصيانة والفحص' },
      description: {
        en: 'Regular maintenance and inspection services',
        ar: 'خدمات الصيانة والفحص الدوري',
      },
    },
    {
      id: 'consultation',
      name: { en: 'Engineering Consultation', ar: 'الاستشارات الهندسية' },
      description: {
        en: 'Expert consultation for lightning protection projects',
        ar: 'استشارات خبراء لمشاريع الحماية من الصواعق',
      },
    },
  ],

  // ================================
  // مناطق الخدمة
  // ================================
  serviceAreas: [
    { en: 'Cairo', ar: 'القاهرة' },
    { en: 'Giza', ar: 'الجيزة' },
    { en: 'Alexandria', ar: 'الإسكندرية' },
    { en: '6th of October', ar: '6 أكتوبر' },
    { en: 'New Cairo', ar: 'القاهرة الجديدة' },
    { en: 'Obour City', ar: 'مدينة العبور' },
    { en: 'All Egypt', ar: 'جميع أنحاء مصر' },
  ],
};

export default companyInfo;
