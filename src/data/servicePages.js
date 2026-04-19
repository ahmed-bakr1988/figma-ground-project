import {
  Activity,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Home,
  Shield,
  ShieldCheck,
  Siren,
  TowerControl,
  Wrench,
  Zap,
  Building2,
  Factory,
  FileCheck,
  Search,
  AlertTriangle,
} from 'lucide-react';

export const servicePageSummaries = [
  {
    slug: 'lightning-protection-systems',
    serviceId: 'lightning-protection-systems',
    label: {
      ar: 'أنظمة الحماية من الصواعق',
      en: 'Lightning Protection Systems',
    },
    shortLabel: {
      ar: 'حماية من الصواعق',
      en: 'Lightning Protection',
    },
  },
  {
    slug: 'lightning-rod-installation',
    serviceId: 'lightning-rod-installation',
    label: {
      ar: 'تركيب مانع صواعق',
      en: 'Lightning Rod Installation',
    },
    shortLabel: {
      ar: 'مانع صواعق',
      en: 'Lightning Rods',
    },
  },
  {
    slug: 'earthing-systems',
    serviceId: 'earthing-systems',
    label: {
      ar: 'أنظمة التأريض',
      en: 'Earthing Systems',
    },
    shortLabel: {
      ar: 'التأريض',
      en: 'Earthing',
    },
  },
  {
    slug: 'surge-protection',
    serviceId: 'surge-protection',
    label: {
      ar: 'الحماية من زيادة الجهد',
      en: 'Surge Protection',
    },
    shortLabel: {
      ar: 'SPD',
      en: 'SPD',
    },
  },
  {
    slug: 'lightning-risk-assessment',
    serviceId: 'lightning-risk-assessment',
    label: {
      ar: 'تقييم مخاطر الصواعق',
      en: 'Lightning Risk Assessment',
    },
    shortLabel: {
      ar: 'تقييم المخاطر',
      en: 'Risk Assessment',
    },
  },
  {
    slug: 'maintenance-inspection',
    serviceId: 'maintenance-inspection',
    label: {
      ar: 'صيانة وفحص الأنظمة',
      en: 'Maintenance & Inspection',
    },
    shortLabel: {
      ar: 'الصيانة',
      en: 'Maintenance',
    },
  },
];

export const servicePageContent = {
  'lightning-protection-systems': {
    image: '/assets/images/services/Lightning Protection Systems.png',
    relatedSlugs: ['lightning-rod-installation', 'earthing-systems', 'surge-protection'],
    ar: {
      seoTitle: 'أنظمة الحماية من الصواعق في مصر | تصميم وتركيب مع Ground Tech',
      seoDescription: 'تصميم وتركيب أنظمة الحماية من الصواعق للمباني والمصانع والمشروعات التجارية في مصر وفق IEC 62305 وNFPA 780 مع دراسة فنية وتنفيذ وفحص كامل.',
      keywords: [
        'أنظمة الحماية من الصواعق',
        'حماية من الصواعق للمباني',
        'شركة حماية من الصواعق في مصر',
        'تركيب نظام حماية من الصواعق',
        'مقاول مانعات صواعق',
        'IEC 62305 مصر',
      ],
      hero: {
        badge: 'حلول حماية هندسية للمباني والمنشآت',
        title: 'أنظمة الحماية من الصواعق',
        subtitle: 'تصميم وتنفيذ أنظمة متكاملة لحماية المباني في مصر',
        description: 'نصمم وننفذ أنظمة حماية من الصواعق للمشروعات السكنية والتجارية والصناعية مع ربط كامل بين الملتقطات والموصلات والهبوط والتأريض والحماية الداخلية.',
        cta: 'اطلب معاينة فنية',
        highlights: ['للمباني السكنية والتجارية', 'تنفيذ وفق IEC 62305', 'فحص وتسليم موثق'],
      },
      overview: {
        title: 'متى يحتاج المبنى إلى نظام حماية من الصواعق؟',
        intro: 'المباني المرتفعة، المصانع، المستشفيات، المخازن، المواقع المفتوحة، والمنشآت التي تحتوي على معدات حساسة تحتاج إلى نظام حماية مصمم بناءً على مستوى الخطر وطبيعة الاستخدام.',
        points: [
          'تقليل مخاطر الحريق والتلف الناتج عن ضربة صاعقة مباشرة أو غير مباشرة.',
          'حماية لوحات الكهرباء والأنظمة الإلكترونية والبنية التحتية الحيوية.',
          'رفع مستوى الالتزام بالاشتراطات الهندسية ومواصفات السلامة.',
          'تحسين استمرارية التشغيل في المواقع التجارية والصناعية.',
        ],
      },
      solutions: {
        title: 'ماذا يشمل النظام؟',
        items: [
          {
            icon: Shield,
            title: 'الحماية الخارجية',
            description: 'ملتقطات الصواعق، موصلات الهبوط، ونقاط الربط التي تلتقط الشحنة وتوجهها بأمان إلى الأرض.',
          },
          {
            icon: Gauge,
            title: 'التأريض والربط',
            description: 'تصميم منظومة تأريض وربط equipotential لضمان تفريغ آمن وتقليل فروق الجهد الخطرة.',
          },
          {
            icon: Zap,
            title: 'الحماية الداخلية',
            description: 'تنسيق أجهزة SPD لحماية اللوحات والمعدات الحساسة من النبضات والارتفاعات العابرة.',
          },
        ],
      },
      process: {
        title: 'مراحل التنفيذ',
        items: [
          { number: '01', title: 'معاينة الموقع', description: 'مراجعة أبعاد المبنى وطبيعته والأنظمة الموجودة والبيئة المحيطة.' },
          { number: '02', title: 'التصميم والحسابات', description: 'تحديد مستوى الحماية المناسب ومسارات التنفيذ ونقاط التأريض.' },
          { number: '03', title: 'التركيب والاختبارات', description: 'تنفيذ النظام واختبار الاستمرارية والربط ومقاومة التأريض.' },
          { number: '04', title: 'التسليم والمتابعة', description: 'تسليم تقارير فنية وتوصيات صيانة وفحص دوري.' },
        ],
      },
      faq: {
        title: 'أسئلة شائعة عن أنظمة الحماية من الصواعق',
        items: [
          {
            question: 'هل كل مبنى يحتاج إلى نظام حماية من الصواعق؟',
            answer: 'ليس كل مبنى بنفس المستوى، لكن العديد من المباني والمنشآت تحتاج إلى تقييم هندسي يحدد مدى الحاجة إلى النظام ونوعه وفق الارتفاع والاستخدام والموقع وكثافة العواصف والمحتوى الداخلي.',
          },
          {
            question: 'ما الفرق بين مانع الصواعق والنظام الكامل؟',
            answer: 'مانع الصواعق هو جزء من منظومة أكبر تشمل موصلات هبوط وتأريض وربط وحماية داخلية. تركيب جزء واحد دون بقية عناصر النظام لا يعطي حماية متكاملة.',
          },
          {
            question: 'هل تقدمون الخدمة في القاهرة والجيزة والإسكندرية؟',
            answer: 'نعم، نخدم القاهرة والجيزة والإسكندرية والعبور والقليوبية ومشروعات في مناطق مختلفة داخل مصر حسب نوع المشروع ونطاق الأعمال.',
          },
        ],
      },
      cta: {
        title: 'ابدأ بتقييم احتياج منشأتك للحماية من الصواعق',
        description: 'نراجع المشروع ونقترح النظام الأنسب مع عرض سعر فني واضح.',
        button: 'تواصل مع فريقنا',
      },
    },
    en: {
      seoTitle: 'Lightning Protection Systems in Egypt | Design & Installation by Ground Tech',
      seoDescription: 'Design and installation of complete lightning protection systems for residential, commercial, and industrial buildings in Egypt with IEC 62305 and NFPA 780 compliance.',
      keywords: [
        'lightning protection systems Egypt',
        'building lightning protection',
        'lightning protection company Egypt',
        'lightning protection installation',
        'NFPA 780 contractor',
        'IEC 62305 Egypt',
      ],
      hero: {
        badge: 'Engineered protection for buildings and facilities',
        title: 'Lightning Protection Systems',
        subtitle: 'Complete system design and installation across Egypt',
        description: 'We design and install complete lightning protection systems for residential, commercial, and industrial sites, covering air terminals, down conductors, grounding, bonding, and internal surge protection.',
        cta: 'Request a Site Visit',
        highlights: ['Residential to industrial', 'Built to IEC 62305', 'Tested and documented handover'],
      },
      overview: {
        title: 'When does a building need lightning protection?',
        intro: 'Tall buildings, factories, hospitals, exposed sites, warehouses, and facilities with sensitive electrical equipment often need a properly engineered lightning protection system based on real risk and use case.',
        points: [
          'Reduce fire and damage risks from direct and indirect lightning strikes.',
          'Protect switchboards, electronics, and critical infrastructure.',
          'Support compliance with engineering and safety requirements.',
          'Improve operational continuity for commercial and industrial sites.',
        ],
      },
      solutions: {
        title: 'What the system includes',
        items: [
          {
            icon: Shield,
            title: 'External protection',
            description: 'Air terminals, down conductors, and capture components that safely intercept and direct lightning energy to ground.',
          },
          {
            icon: Gauge,
            title: 'Grounding and bonding',
            description: 'Proper earthing and equipotential bonding to dissipate energy safely and control dangerous voltage differences.',
          },
          {
            icon: Zap,
            title: 'Internal protection',
            description: 'Coordinated SPD strategy to protect panels, control systems, and sensitive equipment from transient surges.',
          },
        ],
      },
      process: {
        title: 'Delivery process',
        items: [
          { number: '01', title: 'Site review', description: 'Study building geometry, environment, existing systems, and operating conditions.' },
          { number: '02', title: 'Design and calculations', description: 'Select the right protection level, routing, and grounding strategy.' },
          { number: '03', title: 'Installation and testing', description: 'Install the system and verify continuity, bonding, and grounding resistance.' },
          { number: '04', title: 'Handover and follow-up', description: 'Provide technical documentation, inspection notes, and maintenance guidance.' },
        ],
      },
      faq: {
        title: 'Lightning protection FAQs',
        items: [
          {
            question: 'Does every building need a lightning protection system?',
            answer: 'Not every building requires the same level of protection, but many facilities should undergo an engineering review to determine whether a system is necessary based on height, occupancy, location, and internal assets.',
          },
          {
            question: 'What is the difference between a lightning rod and a full system?',
            answer: 'A lightning rod is only one component. A complete system also includes down conductors, grounding, bonding, and internal surge protection. One component alone does not provide complete protection.',
          },
          {
            question: 'Do you serve Cairo, Giza, and Alexandria?',
            answer: 'Yes. We serve Cairo, Giza, Alexandria, Obour, Qalyubia, and other project locations across Egypt depending on scope and schedule.',
          },
        ],
      },
      cta: {
        title: 'Start with a technical review of your facility',
        description: 'We assess the site and propose a practical lightning protection scope with a clear quotation.',
        button: 'Talk to Our Team',
      },
    },
  },
  'lightning-rod-installation': {
    image: '/assets/images/services/Lightning Protection Systems.png',
    relatedSlugs: ['lightning-protection-systems', 'earthing-systems', 'maintenance-inspection'],
    ar: {
      seoTitle: 'تركيب مانع صواعق في مصر | توريد وتركيب وفحص مع Ground Tech',
      seoDescription: 'خدمة تركيب مانع صواعق للمباني والمصانع والمنشآت التجارية في مصر مع اختيار النوع المناسب، تصميم المسارات، وربط النظام بالتأريض والحماية الداخلية.',
      keywords: [
        'تركيب مانع صواعق',
        'مانع صواعق للمباني',
        'سعر تركيب مانع صواعق',
        'شركة مانعات صواعق في مصر',
        'توريد مانع صواعق',
        'فحص مانع صواعق',
      ],
      hero: {
        badge: 'توريد وتركيب أنظمة الالتقاط والهبوط',
        title: 'تركيب مانع صواعق',
        subtitle: 'اختيار النظام المناسب وتنفيذه بشكل صحيح من أول مرة',
        description: 'ننفذ أعمال تركيب مانعات الصواعق للمنازل والفلل والمباني الإدارية والمصانع مع تصميم مسار الهبوط وربط المنظومة بالكامل بالتأريض.',
        cta: 'اطلب عرض سعر',
        highlights: ['حلول للمنازل والمصانع', 'توريد وتركيب وفحص', 'تنفيذ مطابق للمواصفات'],
      },
      overview: {
        title: 'تركيب مانع صواعق ليس قطعة معدنية فقط',
        intro: 'نجاح النظام يعتمد على اختيار موقع الالتقاط، وعدد النقاط، ومسارات الهبوط، ونوع الوصلات، وجودة التثبيت، وربطه الصحيح مع التأريض.',
        points: [
          'اختيار نوع الملتقط المناسب لطبيعة المبنى وارتفاعه.',
          'تنفيذ مسارات هبوط آمنة ومحمية ميكانيكياً حيث يلزم.',
          'استخدام وصلات وملحقات معتمدة تتحمل الظروف الجوية.',
          'ربط النظام بفحوصات الاستمرارية والتأريض قبل التسليم.',
        ],
      },
      solutions: {
        title: 'ما الذي نقدمه في الخدمة؟',
        items: [
          {
            icon: TowerControl,
            title: 'اختيار نقاط الالتقاط',
            description: 'تحديد أماكن الملتقطات والارتفاعات المناسبة لحماية السطح والمناطق المكشوفة والعناصر البارزة.',
          },
          {
            icon: Wrench,
            title: 'التركيب والربط',
            description: 'توريد الخامات وتنفيذ التثبيت والربط والوصلات وفق المواصفات وظروف الموقع.',
          },
          {
            icon: ClipboardCheck,
            title: 'الاختبار والتوثيق',
            description: 'فحص مرئي وفني وتقديم تقرير يوضح حالة النظام والتوصيات اللازمة للتشغيل والصيانة.',
          },
        ],
      },
      process: {
        title: 'كيف ننفذ المشروع؟',
        items: [
          { number: '01', title: 'حصر الموقع', description: 'قياس الارتفاعات ومراجعة السطح والعناصر المعدنية ومناطق الخطر.' },
          { number: '02', title: 'اعتماد المواد', description: 'تحديد نوع الملتقطات والموصلات والحوامل والوصلات.' },
          { number: '03', title: 'تنفيذ أعمال التركيب', description: 'تركيب النظام مع مراعاة المسارات العملية وسلامة التشطيب.' },
          { number: '04', title: 'الفحص والتسليم', description: 'اختبار الاستمرارية وربط النظام بمنظومة التأريض وتسليم التوصيات.' },
        ],
      },
      faq: {
        title: 'أسئلة شائعة عن تركيب مانع الصواعق',
        items: [
          {
            question: 'كم تكلفة تركيب مانع صواعق؟',
            answer: 'تعتمد التكلفة على ارتفاع المبنى، عدد نقاط الالتقاط، نوع الخامات، طول مسارات الهبوط، وحالة نظام التأريض الحالي. لذلك نفضل معاينة الموقع قبل التسعير النهائي.',
          },
          {
            question: 'هل يمكن تركيب مانع صواعق لمبنى قائم؟',
            answer: 'نعم، يمكن تنفيذ النظام على مبانٍ قائمة بشرط دراسة السطح والواجهات ومسارات الهبوط واختيار حلول تثبيت مناسبة لا تؤثر على سلامة المبنى أو شكله المعماري.',
          },
          {
            question: 'هل يحتاج مانع الصواعق إلى صيانة؟',
            answer: 'نعم، يحتاج إلى فحص دوري للتأكد من سلامة الوصلات والحوامل والاستمرارية وعدم وجود تآكل أو فصل في أي جزء من المنظومة.',
          },
        ],
      },
      cta: {
        title: 'احصل على نظام مانع صواعق مناسب لمبناك',
        description: 'نحدد نوع النظام والخامات المطلوبة وننفذ التركيب باحترافية.',
        button: 'اطلب استشارة مجانية',
      },
    },
    en: {
      seoTitle: 'Lightning Rod Installation in Egypt | Supply, Installation & Inspection',
      seoDescription: 'Professional lightning rod installation for homes, villas, commercial buildings, and industrial sites in Egypt with proper routing, grounding connection, and documented inspection.',
      keywords: [
        'lightning rod installation Egypt',
        'lightning rod for buildings',
        'lightning rod contractor Egypt',
        'lightning rod price Egypt',
        'lightning rod inspection',
        'air terminal installation',
      ],
      hero: {
        badge: 'Supply and installation of air termination systems',
        title: 'Lightning Rod Installation',
        subtitle: 'Choose the right system and install it properly the first time',
        description: 'We deliver lightning rod installation for villas, homes, office buildings, and industrial sites with correct down-conductor routing and proper integration with the grounding system.',
        cta: 'Request a Quote',
        highlights: ['Homes to factories', 'Supply, install, inspect', 'Built to specification'],
      },
      overview: {
        title: 'A lightning rod is not just a metal pole',
        intro: 'Performance depends on capture point placement, conductor routing, connector quality, fixing details, and correct integration with grounding and the wider protection system.',
        points: [
          'Select the right air terminal approach for building type and height.',
          'Install safe down-conductor routes with mechanical protection where needed.',
          'Use durable, specification-grade fittings and connectors.',
          'Test continuity and grounding before handover.',
        ],
      },
      solutions: {
        title: 'What the service covers',
        items: [
          {
            icon: TowerControl,
            title: 'Air terminal planning',
            description: 'Identify capture points, roof coverage zones, and exposed elements that need protection.',
          },
          {
            icon: Wrench,
            title: 'Installation and bonding',
            description: 'Supply materials, mount hardware, route conductors, and connect the system according to site conditions.',
          },
          {
            icon: ClipboardCheck,
            title: 'Inspection and reporting',
            description: 'Perform technical checks and provide a report on system condition and follow-up recommendations.',
          },
        ],
      },
      process: {
        title: 'How we deliver the job',
        items: [
          { number: '01', title: 'Site assessment', description: 'Review roof layout, elevations, metal parts, and exposure zones.' },
          { number: '02', title: 'Material selection', description: 'Choose air terminals, conductors, supports, and connection hardware.' },
          { number: '03', title: 'Installation works', description: 'Install the system with practical routing and attention to finish quality.' },
          { number: '04', title: 'Testing and handover', description: 'Verify continuity, connect to grounding, and issue recommendations.' },
        ],
      },
      faq: {
        title: 'Lightning rod installation FAQs',
        items: [
          {
            question: 'How much does lightning rod installation cost?',
            answer: 'Cost depends on building height, number of air terminals, conductor length, material selection, and the condition of the existing grounding system. A site visit is the best basis for final pricing.',
          },
          {
            question: 'Can a lightning rod be installed on an existing building?',
            answer: 'Yes. Existing buildings can be protected after reviewing roof access, facade routes, conductor fixing details, and grounding options that work without compromising the building structure or appearance.',
          },
          {
            question: 'Does a lightning rod require maintenance?',
            answer: 'Yes. Periodic inspection is important to verify supports, connectors, continuity, corrosion condition, and overall system integrity.',
          },
        ],
      },
      cta: {
        title: 'Get the right lightning rod system for your building',
        description: 'We define the right scope, material set, and installation method for your site.',
        button: 'Request a Free Consultation',
      },
    },
  },
  'surge-protection': {
    image: '/assets/images/services/Surge-Protection-Devices-(SPD).jpg',
    relatedSlugs: ['lightning-protection-systems', 'earthing-systems', 'lightning-risk-assessment'],
    ar: {
      seoTitle: 'الحماية من زيادة الجهد SPD في مصر | حماية اللوحات والمعدات',
      seoDescription: 'توريد وتركيب أجهزة الحماية من زيادة الجهد SPD لحماية اللوحات الكهربائية والسيرفرات والأنظمة الحساسة من النبضات والارتفاعات العابرة داخل المنشآت في مصر.',
      keywords: [
        'الحماية من زيادة الجهد',
        'SPD مصر',
        'جهاز حماية من الصواعق للوحة الكهرباء',
        'Surge Protection Device',
        'حماية السيرفرات من زيادة الجهد',
        'حماية اللوحات الكهربائية',
      ],
      hero: {
        badge: 'حماية داخلية للمعدات واللوحات',
        title: 'الحماية من زيادة الجهد SPD',
        subtitle: 'احمِ لوحات الكهرباء والمعدات الحساسة من النبضات العابرة',
        description: 'نوفر حلول SPD للمباني الإدارية والمصانع والمستشفيات وغرف السيرفرات مع اختيار الفئة المناسبة وتنسيق الحماية بين اللوحات الرئيسية والفرعية.',
        cta: 'اطلب مراجعة اللوحات',
        highlights: ['حماية للـ MDB وSMDB', 'حلول للمعدات الحساسة', 'تنسيق كامل مع التأريض'],
      },
      overview: {
        title: 'لماذا تحتاج أجهزة SPD؟',
        intro: 'الضرر الكهربائي لا ينتج فقط عن ضربة صاعقة مباشرة، بل قد ينتج من نبضات عابرة وتحويلات وفصل وتشغيل الأحمال، ما يهدد اللوحات والأجهزة الإلكترونية الحساسة.',
        points: [
          'تقليل فرص تلف لوحات الكهرباء والأنظمة الإلكترونية.',
          'حماية أنظمة الشبكات والمراقبة والتحكم والمعدات الطبية.',
          'تقليل الأعطال المفاجئة وفترات التوقف غير المخطط لها.',
          'رفع كفاءة منظومة الحماية الداخلية مع التأريض الصحيح.',
        ],
      },
      solutions: {
        title: 'حلول الحماية الداخلية التي ننفذها',
        items: [
          {
            icon: ShieldCheck,
            title: 'SPD للوحة الرئيسية',
            description: 'اختيار SPD Type 1 أو Type 2 في اللوحة الرئيسية حسب مصدر الخطر ووجود نظام حماية خارجي.',
          },
          {
            icon: Building2,
            title: 'تنسيق بين اللوحات',
            description: 'توزيع الحماية بين MDB وSMDB واللوحات الفرعية لتحقيق تنسيق فعلي وتقليل الجهد المتبقي.',
          },
          {
            icon: Activity,
            title: 'حماية الدوائر الحساسة',
            description: 'حماية إضافية للأنظمة الحساسة مثل السيرفرات وكاميرات المراقبة وأجهزة الاتصالات والتحكم.',
          },
        ],
      },
      process: {
        title: 'خطوات التنفيذ',
        items: [
          { number: '01', title: 'مراجعة اللوحات', description: 'فحص اللوحات والمغذيات ونقاط الدخول ونظام التأريض الحالي.' },
          { number: '02', title: 'اختيار فئة SPD', description: 'تحديد النوع والمقاس المناسبين حسب مستوى الحماية والاستخدام.' },
          { number: '03', title: 'التركيب والتوصيل', description: 'تنفيذ التوصيلات بمسارات قصيرة وصحيحة للحد من الجهد المتبقي.' },
          { number: '04', title: 'الاختبار والتوصيات', description: 'مراجعة حالة التركيب وإصدار توصيات للصيانة والاستبدال عند نهاية العمر.' },
        ],
      },
      faq: {
        title: 'أسئلة شائعة عن SPD',
        items: [
          {
            question: 'هل SPD يغني عن مانع الصواعق الخارجي؟',
            answer: 'لا. SPD يحمي من النبضات والارتفاعات العابرة داخل الشبكة، بينما النظام الخارجي يتعامل مع التقاط وتفريغ ضربة الصاعقة نفسها. الأفضل غالباً هو تكامل النظامين.',
          },
          {
            question: 'ما الفرق بين Type 1 وType 2 وType 3؟',
            answer: 'Type 1 يستخدم عادة عند نقاط الدخول أو مع وجود خطر صاعقة مباشر، وType 2 للحماية الداخلية في اللوحات، وType 3 لحماية الأحمال النهائية الحساسة قرب نقطة الاستخدام.',
          },
          {
            question: 'هل يحتاج SPD إلى استبدال؟',
            answer: 'نعم، بعض الأجهزة لها عمر تشغيلي أو مؤشر حالة. لذلك نوصي بالفحص الدوري ومراجعة حالة المؤشر والظروف التشغيلية بشكل منتظم.',
          },
        ],
      },
      cta: {
        title: 'احمِ لوحاتك ومعداتك من الارتفاعات العابرة',
        description: 'نراجع الحالة الحالية ونحدد استراتيجية SPD المناسبة للمنشأة.',
        button: 'اطلب مراجعة فنية',
      },
    },
    en: {
      seoTitle: 'Surge Protection in Egypt | SPD Protection for Panels and Equipment',
      seoDescription: 'Supply and installation of surge protection devices in Egypt to protect switchboards, servers, controls, and sensitive equipment from transient overvoltage and lightning-related surges.',
      keywords: [
        'surge protection Egypt',
        'SPD Egypt',
        'surge protection device for panel',
        'protect electrical panels from surges',
        'server room surge protection',
        'transient overvoltage protection',
      ],
      hero: {
        badge: 'Internal protection for electrical and electronic systems',
        title: 'Surge Protection',
        subtitle: 'Protect switchboards and sensitive equipment from transient overvoltage',
        description: 'We design and install SPD solutions for offices, factories, hospitals, and server rooms with coordinated protection across main and sub distribution boards.',
        cta: 'Review My Panels',
        highlights: ['MDB and SMDB protection', 'For sensitive equipment', 'Coordinated with grounding'],
      },
      overview: {
        title: 'Why are SPDs important?',
        intro: 'Electrical damage is not limited to direct lightning strikes. Switching events, utility disturbances, and induced surges can also damage panels and sensitive electronics.',
        points: [
          'Reduce the risk of switchboard and electronics damage.',
          'Protect network systems, controls, CCTV, medical, and IT equipment.',
          'Lower unplanned failures and downtime.',
          'Strengthen internal protection when combined with good grounding.',
        ],
      },
      solutions: {
        title: 'Protection strategies we implement',
        items: [
          {
            icon: ShieldCheck,
            title: 'Main board SPD',
            description: 'Select the right Type 1 or Type 2 SPD at the incoming board based on external lightning exposure and system design.',
          },
          {
            icon: Building2,
            title: 'Board coordination',
            description: 'Coordinate protection between MDB, SMDB, and downstream boards to control residual voltage effectively.',
          },
          {
            icon: Activity,
            title: 'Sensitive load protection',
            description: 'Protect server rooms, telecom, control, CCTV, and similar critical circuits with the right downstream devices.',
          },
        ],
      },
      process: {
        title: 'Implementation steps',
        items: [
          { number: '01', title: 'Panel review', description: 'Inspect panels, feeders, entry points, and the existing grounding arrangement.' },
          { number: '02', title: 'SPD selection', description: 'Choose the right class and rating based on risk level and usage.' },
          { number: '03', title: 'Installation and wiring', description: 'Install with short, correct connections to limit residual voltage.' },
          { number: '04', title: 'Checks and recommendations', description: 'Verify installation quality and provide maintenance and replacement guidance.' },
        ],
      },
      faq: {
        title: 'Surge protection FAQs',
        items: [
          {
            question: 'Can SPD replace an external lightning protection system?',
            answer: 'No. SPDs control transient overvoltage inside the electrical network, while the external lightning protection system intercepts and safely routes lightning energy outside the building. Many facilities need both.',
          },
          {
            question: 'What is the difference between Type 1, Type 2, and Type 3 SPD?',
            answer: 'Type 1 is typically used at service entry or where direct lightning exposure exists, Type 2 is common for internal board protection, and Type 3 is used close to sensitive end equipment.',
          },
          {
            question: 'Do SPDs need replacement?',
            answer: 'Yes. SPDs have a service life and many include status indicators. Periodic inspection is recommended to confirm device condition and performance.',
          },
        ],
      },
      cta: {
        title: 'Protect your panels and critical equipment from surges',
        description: 'We review the current setup and define the right SPD strategy for the facility.',
        button: 'Request a Technical Review',
      },
    },
  },
  'lightning-risk-assessment': {
    image: '/assets/images/backgroundImage/Risk-Assessment-1.avif',
    relatedSlugs: ['lightning-protection-systems', 'surge-protection', 'maintenance-inspection'],
    ar: {
      seoTitle: 'تقييم مخاطر الصواعق في مصر | دراسة هندسية وفق IEC 62305',
      seoDescription: 'خدمة تقييم مخاطر الصواعق للمباني والمنشآت في مصر وفق IEC 62305 لتحديد الحاجة إلى نظام الحماية ومستوى الحماية المناسب ونطاق الأعمال المطلوب.',
      keywords: [
        'تقييم مخاطر الصواعق',
        'دراسة مخاطر الصواعق',
        'IEC 62305 risk assessment',
        'هل المبنى يحتاج مانع صواعق',
        'تحليل مخاطر الصواعق للمباني',
        'استشاري حماية من الصواعق',
      ],
      hero: {
        badge: 'قرار هندسي مبني على معايير واضحة',
        title: 'تقييم مخاطر الصواعق',
        subtitle: 'حدد مدى احتياج منشأتك إلى نظام حماية قبل التنفيذ',
        description: 'نُجري تقييم مخاطر الصواعق للمشروعات الجديدة والقائمة لتحديد مدى الحاجة إلى نظام الحماية، ومستوى الحماية المناسب، والأثر المتوقع على الأشخاص والخدمات والمعدات.',
        cta: 'اطلب تقييم مخاطر',
        highlights: ['وفق IEC 62305', 'للمشروعات الجديدة والقائمة', 'مخرجات فنية قابلة للتنفيذ'],
      },
      overview: {
        title: 'لماذا تبدأ بتقييم المخاطر؟',
        intro: 'تقييم المخاطر يمنع المبالغة في الحلول أو نقص الحماية، ويعطي قراراً هندسياً يمكن الاعتماد عليه عند التصميم أو المراجعة أو التوريد.',
        points: [
          'تحديد ما إذا كان نظام الحماية مطلوباً من الأساس.',
          'اختيار مستوى الحماية المناسب للمبنى أو الموقع.',
          'تقدير تأثير الخطر على الأشخاص والخدمات والمحتوى الداخلي.',
          'إعطاء أساس واضح لنطاق الأعمال والميزانية.',
        ],
      },
      solutions: {
        title: 'ما الذي نفحصه في الدراسة؟',
        items: [
          {
            icon: Search,
            title: 'بيانات الموقع والمبنى',
            description: 'الارتفاع، المساحة، الموقع الجغرافي، طبيعة الاستخدام، وعدد الأشخاص أو الأنظمة الحرجة داخل المنشأة.',
          },
          {
            icon: AlertTriangle,
            title: 'مصادر الخطر',
            description: 'احتمالات الضرب المباشر وغير المباشر، والمسارات المحتملة لدخول الطاقة أو التأثير على الأنظمة الداخلية.',
          },
          {
            icon: FileCheck,
            title: 'توصيات الحماية',
            description: 'تحديد الحاجة إلى حماية خارجية أو داخلية أو تأريض أو مجموعة متكاملة من الحلول.',
          },
        ],
      },
      process: {
        title: 'مخرجات التقييم',
        items: [
          { number: '01', title: 'جمع البيانات', description: 'استلام الرسومات أو المعطيات الأساسية ومراجعة طبيعة المشروع.' },
          { number: '02', title: 'الحساب والمقارنة', description: 'تطبيق منهجية التقييم ومقارنة النتائج بالحدود المقبولة.' },
          { number: '03', title: 'إصدار التوصيات', description: 'تحديد مستوى الحماية والحلول المطلوبة ونقاط الأولوية.' },
          { number: '04', title: 'ربطها بالتنفيذ', description: 'تحويل النتائج إلى Scope واضح للتصميم أو التنفيذ أو المراجعة.' },
        ],
      },
      faq: {
        title: 'أسئلة شائعة عن تقييم مخاطر الصواعق',
        items: [
          {
            question: 'هل تقييم المخاطر مطلوب قبل تركيب النظام؟',
            answer: 'في كثير من المشروعات نعم، لأنه يحدد الحاجة الفعلية للنظام ومستوى الحماية المناسب. كما يساعد في تجنب التنفيذ الزائد أو غير الكافي.',
          },
          {
            question: 'ما البيانات المطلوبة لبدء الدراسة؟',
            answer: 'نحتاج عادة إلى موقع المشروع، ارتفاع المبنى، المساحة، طبيعة الاستخدام، وبعض الرسومات أو الصور، إضافة إلى أي بيانات عن الأنظمة الحساسة أو الخدمات الحرجة.',
          },
          {
            question: 'هل يمكن استخدام التقييم لمشروع قائم؟',
            answer: 'نعم، ويمكن استخدامه لمراجعة مبنى قائم أو تحديث نطاق الحماية أو دعم قرار التوسع أو التطوير في المنشأة.',
          },
        ],
      },
      cta: {
        title: 'ابدأ بقرار هندسي صحيح قبل التنفيذ',
        description: 'أرسل بيانات المشروع وسنحدد لك إذا كانت منشأتك تحتاج إلى نظام حماية وما هو النطاق المناسب.',
        button: 'اطلب دراسة مبدئية',
      },
    },
    en: {
      seoTitle: 'Lightning Risk Assessment in Egypt | IEC 62305 Engineering Study',
      seoDescription: 'Lightning risk assessment for buildings and facilities in Egypt according to IEC 62305 to determine whether protection is required, what level is needed, and what scope should be implemented.',
      keywords: [
        'lightning risk assessment Egypt',
        'IEC 62305 risk assessment',
        'does my building need lightning protection',
        'lightning assessment for buildings',
        'lightning protection consultant Egypt',
        'risk analysis lightning protection',
      ],
      hero: {
        badge: 'Engineering decisions built on standards',
        title: 'Lightning Risk Assessment',
        subtitle: 'Define the real protection need before you build or retrofit',
        description: 'We carry out lightning risk assessments for new and existing facilities to determine whether protection is required, what level is appropriate, and how the risk affects people, services, and equipment.',
        cta: 'Request an Assessment',
        highlights: ['Based on IEC 62305', 'For new and existing sites', 'Practical outputs for execution'],
      },
      overview: {
        title: 'Why start with risk assessment?',
        intro: 'Risk assessment avoids both over-design and under-protection. It gives a defensible engineering basis for design, review, procurement, and budgeting.',
        points: [
          'Determine whether lightning protection is required at all.',
          'Select the right protection level for the building or site.',
          'Estimate impact on people, services, and internal assets.',
          'Create a clear basis for technical scope and budget.',
        ],
      },
      solutions: {
        title: 'What the study reviews',
        items: [
          {
            icon: Search,
            title: 'Site and building data',
            description: 'Height, footprint, location, occupancy, and the number of people or critical systems involved.',
          },
          {
            icon: AlertTriangle,
            title: 'Threat sources',
            description: 'Direct and indirect strike exposure, likely energy entry paths, and effects on internal systems.',
          },
          {
            icon: FileCheck,
            title: 'Protection recommendations',
            description: 'Define whether external protection, internal protection, grounding upgrades, or a complete package is required.',
          },
        ],
      },
      process: {
        title: 'Assessment outputs',
        items: [
          { number: '01', title: 'Data collection', description: 'Review drawings, project basics, and operating context.' },
          { number: '02', title: 'Calculation and comparison', description: 'Apply the assessment method and compare results to accepted limits.' },
          { number: '03', title: 'Recommendation issue', description: 'Define protection level, required measures, and implementation priorities.' },
          { number: '04', title: 'Execution alignment', description: 'Translate conclusions into a clear design, review, or execution scope.' },
        ],
      },
      faq: {
        title: 'Lightning risk assessment FAQs',
        items: [
          {
            question: 'Is risk assessment required before installation?',
            answer: 'In many projects, yes. It helps determine whether protection is actually required and what level is appropriate, reducing the risk of overspending or under-protecting the facility.',
          },
          {
            question: 'What information is needed to start?',
            answer: 'We typically need the site location, building height, floor area, occupancy type, basic drawings or photos, and details about critical systems or services.',
          },
          {
            question: 'Can assessment be used for an existing building?',
            answer: 'Yes. It is useful for auditing an existing site, reviewing current protection, or defining the scope of an upgrade or expansion.',
          },
        ],
      },
      cta: {
        title: 'Start with the right engineering decision',
        description: 'Send your project data and we will identify whether protection is required and what scope fits best.',
        button: 'Request a Preliminary Study',
      },
    },
  },
  'maintenance-inspection': {
    image: '/assets/images/backgroundImage/Image-17.avif',
    relatedSlugs: ['lightning-protection-systems', 'lightning-rod-installation', 'surge-protection'],
    ar: {
      seoTitle: 'صيانة وفحص أنظمة الحماية من الصواعق | Ground Tech مصر',
      seoDescription: 'خدمة صيانة وفحص أنظمة الحماية من الصواعق والتأريض وSPD في مصر للتأكد من الاستمرارية وسلامة الوصلات والحوامل وكفاءة الحماية الدورية.',
      keywords: [
        'صيانة مانع الصواعق',
        'فحص نظام الحماية من الصواعق',
        'صيانة التأريض',
        'قياس مقاومة التأريض',
        'تفتيش SPD',
        'تقرير فحص مانعات الصواعق',
      ],
      hero: {
        badge: 'فحص دوري وتقارير فنية واضحة',
        title: 'صيانة وفحص الأنظمة',
        subtitle: 'لأن النظام غير المفحوص قد يفشل وقت الحاجة',
        description: 'ننفذ فحصاً دورياً لأنظمة الحماية من الصواعق والتأريض والحماية الداخلية للتأكد من سلامة التوصيلات، الاستمرارية، التآكل، ومقاومة التأريض.',
        cta: 'احجز فحصاً دورياً',
        highlights: ['قياسات وتقارير', 'للمشروعات القائمة', 'فحص بعد العواصف والتعديلات'],
      },
      overview: {
        title: 'لماذا الصيانة الدورية مهمة؟',
        intro: 'الأنظمة الخارجية تتعرض للعوامل الجوية، والوصلات قد ترتخي أو تتآكل، وأجهزة SPD لها عمر تشغيلي. لذلك فإن الفحص الدوري جزء أساسي من فعالية النظام.',
        points: [
          'اكتشاف التلف أو الفصل قبل حدوث فشل فعلي في الحماية.',
          'مراجعة سلامة التثبيت والوصلات والمسارات الخارجية.',
          'قياس مقاومة التأريض والتحقق من الاستمرارية والربط.',
          'إصدار توصيات إصلاح أو استبدال أو تحسين مبنية على القياس.',
        ],
      },
      solutions: {
        title: 'ماذا يشمل الفحص؟',
        items: [
          {
            icon: ClipboardCheck,
            title: 'فحص بصري شامل',
            description: 'مراجعة الملتقطات والحوامل والموصلات والوصلات ومسارات الهبوط ونقاط الربط الظاهرة.',
          },
          {
            icon: CheckCircle2,
            title: 'اختبارات وقياسات',
            description: 'قياس مقاومة التأريض، اختبار الاستمرارية، ومراجعة حالة SPD أو أي عناصر حماية داخلية ذات صلة.',
          },
          {
            icon: Siren,
            title: 'تقرير وتوصيات',
            description: 'تقرير فني يوضح الملاحظات والأعطال ونطاق الأعمال الموصى به للحفاظ على فعالية النظام.',
          },
        ],
      },
      process: {
        title: 'متى نوصي بالفحص؟',
        items: [
          { number: '01', title: 'فحص سنوي', description: 'للتأكد من بقاء النظام في حالة تشغيل سليمة على مدار العام.' },
          { number: '02', title: 'بعد عاصفة قوية', description: 'خصوصاً إذا كان هناك شك في تعرض الموقع لنبضات أو ضربات شديدة.' },
          { number: '03', title: 'بعد أعمال تعديل', description: 'عند تعديل الأسطح أو اللوحات أو أنظمة الكهرباء أو التوسعات المعمارية.' },
          { number: '04', title: 'قبل الاستلام أو التجديد', description: 'لإثبات حالة النظام وتحديد إن كانت هناك نواقص أو تحسينات مطلوبة.' },
        ],
      },
      faq: {
        title: 'أسئلة شائعة عن الصيانة والفحص',
        items: [
          {
            question: 'كم مرة يجب فحص نظام الحماية من الصواعق؟',
            answer: 'نوصي عادة بفحص سنوي على الأقل، وقد تزيد الحاجة في المنشآت الحساسة أو بعد العواصف أو التعديلات الهندسية أو الكهربائية المهمة.',
          },
          {
            question: 'هل الفحص يشمل قياس مقاومة التأريض؟',
            answer: 'نعم، في الحالات المناسبة يشمل الفحص قياس مقاومة التأريض ومراجعة الاستمرارية والربط والحالة العامة للنظام.',
          },
          {
            question: 'هل يمكنكم فحص نظام تم تنفيذه من جهة أخرى؟',
            answer: 'نعم، يمكننا مراجعة أنظمة قائمة سواء قمنا بتنفيذها أو تم تنفيذها بواسطة جهة أخرى، مع إصدار تقرير بالملاحظات والتوصيات.',
          },
        ],
      },
      cta: {
        title: 'احجز فحصاً دورياً يضمن بقاء الحماية فعالة',
        description: 'نراجع النظام ونقيس عناصره الأساسية ونحدد ما يحتاج إلى إصلاح أو تطوير.',
        button: 'اطلب زيارة فحص',
      },
    },
    en: {
      seoTitle: 'Lightning Protection Maintenance & Inspection | Ground Tech Egypt',
      seoDescription: 'Inspection and maintenance services for lightning protection, grounding, and surge protection systems in Egypt to verify continuity, connector condition, corrosion status, and grounding performance.',
      keywords: [
        'lightning protection maintenance',
        'lightning protection inspection Egypt',
        'grounding inspection',
        'ground resistance testing',
        'SPD inspection',
        'lightning system inspection report',
      ],
      hero: {
        badge: 'Periodic inspection with clear technical reporting',
        title: 'Maintenance & Inspection',
        subtitle: 'Because an untested system can fail when you need it most',
        description: 'We inspect lightning protection, grounding, and internal protection systems to verify connection integrity, continuity, corrosion condition, and grounding performance.',
        cta: 'Schedule an Inspection',
        highlights: ['Measurements and reports', 'For existing projects', 'After storms and alterations'],
      },
      overview: {
        title: 'Why does periodic maintenance matter?',
        intro: 'External systems are exposed to weather, connectors can loosen or corrode, and SPDs have a limited service life. Periodic inspection is therefore part of real system effectiveness.',
        points: [
          'Detect damage or disconnection before protection actually fails.',
          'Review supports, connectors, and exposed routing details.',
          'Measure grounding resistance and verify continuity and bonding.',
          'Issue repair, replacement, or upgrade recommendations based on measurements.',
        ],
      },
      solutions: {
        title: 'What inspection includes',
        items: [
          {
            icon: ClipboardCheck,
            title: 'Visual inspection',
            description: 'Review air terminals, supports, conductors, joints, down-conductor routes, and exposed bonding points.',
          },
          {
            icon: CheckCircle2,
            title: 'Testing and measurement',
            description: 'Measure grounding resistance, verify continuity, and check SPD status where relevant.',
          },
          {
            icon: Siren,
            title: 'Report and recommendations',
            description: 'Issue a technical report showing observations, defects, and recommended corrective scope.',
          },
        ],
      },
      process: {
        title: 'When we recommend inspection',
        items: [
          { number: '01', title: 'Annual review', description: 'To confirm the system remains in serviceable condition throughout the year.' },
          { number: '02', title: 'After a major storm', description: 'Especially where heavy strike exposure or severe transient events are suspected.' },
          { number: '03', title: 'After alterations', description: 'When roofs, switchboards, electrical systems, or architectural layouts are modified.' },
          { number: '04', title: 'Before handover or refurbishment', description: 'To confirm system condition and identify any missing or upgrade items.' },
        ],
      },
      faq: {
        title: 'Maintenance and inspection FAQs',
        items: [
          {
            question: 'How often should a lightning protection system be inspected?',
            answer: 'An annual inspection is a practical baseline in many facilities, with more frequent reviews for sensitive sites or after major storms, alterations, or electrical changes.',
          },
          {
            question: 'Does inspection include grounding resistance testing?',
            answer: 'Yes, where appropriate the scope includes grounding resistance measurement together with continuity, bonding, and visible condition checks.',
          },
          {
            question: 'Can you inspect a system installed by another contractor?',
            answer: 'Yes. We can audit existing systems whether we installed them or not and provide a report with observations and recommendations.',
          },
        ],
      },
      cta: {
        title: 'Book a periodic inspection to keep protection effective',
        description: 'We review the system, measure key parameters, and identify what needs repair or upgrade.',
        button: 'Request an Inspection Visit',
      },
    },
  },
};

export function getServicePageSummary(slug) {
  return servicePageSummaries.find((item) => item.slug === slug);
}