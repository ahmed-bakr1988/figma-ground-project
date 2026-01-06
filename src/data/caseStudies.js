// Case Studies Data - 3 Detailed Case Studies
// Each case study showcases a real project with comprehensive details

export const caseStudies = [
  {
    id: 1,
    slug: 'riyadh-mall-protection',
    title: {
      ar: 'مول الرياض بارك - نظام حماية متكامل',
      en: 'Riyadh Park Mall - Integrated Protection System'
    },
    client: {
      ar: 'شركة الفيصلية للتطوير العقاري',
      en: 'Al Faisaliah Real Estate Development'
    },
    location: {
      ar: 'الرياض، المملكة العربية السعودية',
      en: 'Riyadh, Saudi Arabia'
    },
    projectType: {
      ar: 'مركز تجاري',
      en: 'Commercial Mall'
    },
    buildingSize: '180,000 m²',
    projectValue: '$2.5M',
    duration: {
      ar: '8 أشهر',
      en: '8 months'
    },
    completedAt: '2024-06-15',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    ],
    challenge: {
      ar: `واجه مول الرياض بارك تحديات كبيرة في مجال الحماية من الصواعق والتأريض بسبب:

- **مساحة ضخمة**: المبنى يمتد على مساحة 180,000 متر مربع مع سقف معدني كبير
- **أنظمة إلكترونية حساسة**: أكثر من 500 شاشة عرض وأنظمة كاميرات مراقبة متطورة
- **معدات تكييف ضخمة**: 45 وحدة تكييف مركزي على السطح
- **متطلبات السلامة**: معايير صارمة للسلامة في المراكز التجارية
- **استمرارية العمل**: عدم التأثير على العمليات التجارية أثناء التركيب`,
      en: `Riyadh Park Mall faced significant challenges in lightning protection and grounding due to:

- **Massive area**: The building spans 180,000 square meters with a large metal roof
- **Sensitive electronics**: Over 500 display screens and advanced surveillance camera systems
- **Huge HVAC equipment**: 45 central air conditioning units on the roof
- **Safety requirements**: Strict safety standards for commercial centers
- **Business continuity**: No impact on commercial operations during installation`
    },
    solution: {
      ar: `قدمنا حلاً شاملاً متكاملاً يشمل:

### نظام الحماية من الصواعق
- تركيب **85 مانعة صواعق** من نوع ESE عالية الأداء
- شبكة موصلات نحاسية بطول **12 كيلومتر**
- **120 نقطة تأريض** موزعة حول المبنى

### نظام التأريض المتقدم
- شبكة تأريض شبكية متصلة بالكامل
- مقاومة أرضية أقل من **1 أوم**
- نظام مراقبة إلكتروني للتأريض

### حماية الأجهزة الإلكترونية
- **280 جهاز حماية** من الطفرات الكهربائية
- نظام SPD متدرج ثلاثي المراحل
- حماية خاصة لأنظمة BMS

### التنفيذ الذكي
- العمل ليلاً لعدم التأثير على العمليات
- فريق من **35 فني متخصص**
- إشراف هندسي على مدار الساعة`,
      en: `We provided a comprehensive integrated solution including:

### Lightning Protection System
- Installation of **85 ESE lightning rods** with high performance
- Copper conductor network spanning **12 kilometers**
- **120 grounding points** distributed around the building

### Advanced Grounding System
- Fully interconnected mesh grounding network
- Ground resistance less than **1 ohm**
- Electronic grounding monitoring system

### Electronic Equipment Protection
- **280 surge protection devices**
- Three-stage graduated SPD system
- Special protection for BMS systems

### Smart Execution
- Night work to avoid impacting operations
- Team of **35 specialized technicians**
- 24/7 engineering supervision`
    },
    results: {
      ar: [
        { metric: 'نسبة الحماية', value: '99.9%', description: 'حماية شاملة من الصواعق' },
        { metric: 'مقاومة التأريض', value: '<1 أوم', description: 'أقل من المعايير المطلوبة' },
        { metric: 'الأجهزة المحمية', value: '2,500+', description: 'جهاز إلكتروني محمي' },
        { metric: 'توفير الطاقة', value: '15%', description: 'تحسين في كفاءة الطاقة' }
      ],
      en: [
        { metric: 'Protection Rate', value: '99.9%', description: 'Comprehensive lightning protection' },
        { metric: 'Ground Resistance', value: '<1 Ohm', description: 'Below required standards' },
        { metric: 'Protected Devices', value: '2,500+', description: 'Electronic devices protected' },
        { metric: 'Energy Savings', value: '15%', description: 'Improvement in energy efficiency' }
      ]
    },
    testimonial: {
      quote: {
        ar: 'عمل احترافي استثنائي! فريق رعد للحماية قدم حلاً متكاملاً يفوق توقعاتنا. لم نشهد أي أعطال كهربائية منذ التركيب رغم العواصف الرعدية المتعددة.',
        en: 'Exceptional professional work! The Raad Protection team delivered an integrated solution that exceeded our expectations. We have not experienced any electrical failures since installation despite multiple thunderstorms.'
      },
      author: {
        ar: 'م. خالد العتيبي',
        en: 'Eng. Khalid Al-Otaibi'
      },
      role: {
        ar: 'مدير المشاريع - شركة الفيصلية',
        en: 'Project Manager - Al Faisaliah Company'
      }
    },
    services: ['lightning-protection', 'grounding', 'surge-protection'],
    featured: true
  },
  {
    id: 2,
    slug: 'aramco-facility-protection',
    title: {
      ar: 'منشأة أرامكو الصناعية - حماية المنشآت الحيوية',
      en: 'Aramco Industrial Facility - Critical Infrastructure Protection'
    },
    client: {
      ar: 'أرامكو السعودية',
      en: 'Saudi Aramco'
    },
    location: {
      ar: 'الظهران، المملكة العربية السعودية',
      en: 'Dhahran, Saudi Arabia'
    },
    projectType: {
      ar: 'منشأة صناعية',
      en: 'Industrial Facility'
    },
    buildingSize: '45,000 m²',
    projectValue: '$1.8M',
    duration: {
      ar: '6 أشهر',
      en: '6 months'
    },
    completedAt: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop'
    ],
    challenge: {
      ar: `المنشآت النفطية والغازية تتطلب أعلى معايير السلامة والحماية:

- **خطورة عالية**: وجود مواد قابلة للاشتعال والانفجار
- **معايير صارمة**: الامتثال لمعايير IEC 62305 و NFPA 780
- **بيئة قاسية**: درجات حرارة مرتفعة وبيئة تآكلية
- **استمرارية العمليات**: عدم إيقاف الإنتاج أثناء التركيب
- **متطلبات أرامكو**: معايير السلامة الخاصة بالشركة`,
      en: `Oil and gas facilities require the highest safety and protection standards:

- **High risk**: Presence of flammable and explosive materials
- **Strict standards**: Compliance with IEC 62305 and NFPA 780 standards
- **Harsh environment**: High temperatures and corrosive environment
- **Operational continuity**: No production stoppage during installation
- **Aramco requirements**: Company-specific safety standards`
    },
    solution: {
      ar: `طورنا نظاماً متخصصاً للمنشآت الحيوية:

### تقييم المخاطر المتقدم
- دراسة شاملة وفق معايير **IEC 62305-2**
- تحليل الأخطار باستخدام **HAZOP**
- محاكاة حاسوبية للتصريف الكهربائي

### نظام حماية مقاوم للانفجار
- مانعات صواعق **Ex-proof** معتمدة
- موصلات من **الستانلس ستيل 316L**
- أنظمة تأريض مقاومة للتآكل

### حماية متدرجة شاملة
- **Type 1 SPD** في نقاط الدخول الرئيسية
- **Type 2 SPD** في لوحات التوزيع
- **Type 3 SPD** لحماية المعدات الحساسة

### نظام المراقبة الذكي
- مراقبة فورية لحالة النظام
- إنذارات تلقائية عند أي خلل
- تقارير دورية شاملة`,
      en: `We developed a specialized system for critical facilities:

### Advanced Risk Assessment
- Comprehensive study according to **IEC 62305-2** standards
- Hazard analysis using **HAZOP**
- Computer simulation of electrical discharge

### Explosion-Proof Protection System
- Certified **Ex-proof** lightning rods
- **316L stainless steel** conductors
- Corrosion-resistant grounding systems

### Comprehensive Tiered Protection
- **Type 1 SPD** at main entry points
- **Type 2 SPD** at distribution panels
- **Type 3 SPD** for sensitive equipment protection

### Smart Monitoring System
- Real-time system status monitoring
- Automatic alerts for any malfunction
- Comprehensive periodic reports`
    },
    results: {
      ar: [
        { metric: 'الامتثال للمعايير', value: '100%', description: 'IEC 62305 & NFPA 780' },
        { metric: 'زمن التوقف', value: '0', description: 'ساعات توقف للإنتاج' },
        { metric: 'الحوادث المسجلة', value: '0', description: 'منذ التركيب' },
        { metric: 'التوفير السنوي', value: '$180K', description: 'في تكاليف الصيانة' }
      ],
      en: [
        { metric: 'Standards Compliance', value: '100%', description: 'IEC 62305 & NFPA 780' },
        { metric: 'Downtime', value: '0', description: 'Hours of production stoppage' },
        { metric: 'Recorded Incidents', value: '0', description: 'Since installation' },
        { metric: 'Annual Savings', value: '$180K', description: 'In maintenance costs' }
      ]
    },
    testimonial: {
      quote: {
        ar: 'التزام تام بمعايير السلامة ومتطلباتنا الصارمة. فريق محترف يفهم طبيعة العمل في المنشآت الحيوية ويقدم حلولاً مبتكرة.',
        en: 'Full compliance with safety standards and our strict requirements. A professional team that understands the nature of work in critical facilities and provides innovative solutions.'
      },
      author: {
        ar: 'م. عبدالله الشمري',
        en: 'Eng. Abdullah Al-Shammari'
      },
      role: {
        ar: 'مدير السلامة والبيئة - أرامكو',
        en: 'HSE Manager - Aramco'
      }
    },
    services: ['lightning-protection', 'grounding', 'surge-protection', 'maintenance'],
    featured: true
  },
  {
    id: 3,
    slug: 'king-abdullah-hospital',
    title: {
      ar: 'مستشفى الملك عبدالله التخصصي - حماية المرافق الصحية',
      en: 'King Abdullah Specialist Hospital - Healthcare Facility Protection'
    },
    client: {
      ar: 'وزارة الصحة السعودية',
      en: 'Saudi Ministry of Health'
    },
    location: {
      ar: 'جدة، المملكة العربية السعودية',
      en: 'Jeddah, Saudi Arabia'
    },
    projectType: {
      ar: 'مستشفى تخصصي',
      en: 'Specialist Hospital'
    },
    buildingSize: '95,000 m²',
    projectValue: '$1.2M',
    duration: {
      ar: '5 أشهر',
      en: '5 months'
    },
    completedAt: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop'
    ],
    challenge: {
      ar: `المستشفيات تمثل تحدياً خاصاً في الحماية الكهربائية:

- **أجهزة طبية حساسة**: أجهزة MRI، CT، ومعدات العناية المركزة
- **استمرارية الخدمة**: لا يمكن تحمل أي انقطاع في الكهرباء
- **بيئة معقمة**: متطلبات خاصة للنظافة والتعقيم
- **أنظمة متعددة**: غازات طبية، أكسجين، أنظمة إنذار
- **سلامة المرضى**: أولوية قصوى لا يمكن المساومة عليها`,
      en: `Hospitals represent a special challenge in electrical protection:

- **Sensitive medical equipment**: MRI, CT machines, and ICU equipment
- **Service continuity**: Cannot tolerate any power interruption
- **Sterile environment**: Special requirements for cleanliness and sterilization
- **Multiple systems**: Medical gases, oxygen, alarm systems
- **Patient safety**: Top priority that cannot be compromised`
    },
    solution: {
      ar: `صممنا نظاماً متخصصاً للمرافق الصحية:

### حماية الأجهزة الطبية
- **SPD طبي متخصص** لكل جهاز حساس
- عزل كهربائي متعدد المراحل
- نظام **UPS مركزي** للأقسام الحرجة

### تأريض طبي معتمد
- شبكة تأريض منفصلة للأجهزة الطبية
- مقاومة تأريض **<0.5 أوم**
- ربط متساوي الجهد في غرف العمليات

### حماية البنية التحتية
- 55 مانعة صواعق ESE
- شبكة موصلات بطول 6 كيلومتر
- حماية خزانات الغازات الطبية

### التنفيذ الآمن
- العمل في مراحل دون إيقاف الخدمات
- تنسيق كامل مع الكوادر الطبية
- اختبارات شاملة قبل التشغيل`,
      en: `We designed a specialized system for healthcare facilities:

### Medical Equipment Protection
- **Specialized medical SPD** for each sensitive device
- Multi-stage electrical isolation
- **Central UPS system** for critical departments

### Certified Medical Grounding
- Separate grounding network for medical equipment
- Ground resistance **<0.5 ohms**
- Equipotential bonding in operating rooms

### Infrastructure Protection
- 55 ESE lightning rods
- 6-kilometer conductor network
- Medical gas tank protection

### Safe Execution
- Phased work without service interruption
- Full coordination with medical staff
- Comprehensive testing before commissioning`
    },
    results: {
      ar: [
        { metric: 'استقرار الطاقة', value: '99.99%', description: 'نسبة الجهوزية الكهربائية' },
        { metric: 'الأجهزة الطبية', value: '850+', description: 'جهاز محمي بالكامل' },
        { metric: 'غرف العمليات', value: '24', description: 'غرفة بحماية كاملة' },
        { metric: 'الأعطال', value: '0', description: 'أعطال كهربائية مسجلة' }
      ],
      en: [
        { metric: 'Power Stability', value: '99.99%', description: 'Electrical uptime rate' },
        { metric: 'Medical Devices', value: '850+', description: 'Fully protected devices' },
        { metric: 'Operating Rooms', value: '24', description: 'Rooms with full protection' },
        { metric: 'Failures', value: '0', description: 'Recorded electrical failures' }
      ]
    },
    testimonial: {
      quote: {
        ar: 'حماية موثوقة لمرضانا ومعداتنا الطبية. الفريق أظهر فهماً عميقاً لمتطلبات المستشفيات وقدم حلاً يضمن استمرارية الخدمات الصحية.',
        en: 'Reliable protection for our patients and medical equipment. The team demonstrated a deep understanding of hospital requirements and provided a solution that ensures continuity of healthcare services.'
      },
      author: {
        ar: 'د. سارة القحطاني',
        en: 'Dr. Sarah Al-Qahtani'
      },
      role: {
        ar: 'المدير التنفيذي للمستشفى',
        en: 'Hospital CEO'
      }
    },
    services: ['lightning-protection', 'grounding', 'surge-protection', 'maintenance'],
    featured: false
  }
];

// Helper function to get case study by slug
export const getCaseStudyBySlug = (slug) => {
  return caseStudies.find(cs => cs.slug === slug);
};

// Helper function to get related case studies
export const getRelatedCaseStudies = (currentId, limit = 2) => {
  return caseStudies
    .filter(cs => cs.id !== currentId)
    .slice(0, limit);
};

// Helper function to get featured case studies
export const getFeaturedCaseStudies = () => {
  return caseStudies.filter(cs => cs.featured);
};

export default caseStudies;
