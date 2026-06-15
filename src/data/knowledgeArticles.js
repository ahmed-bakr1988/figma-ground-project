export const knowledgeArticles = [
  {
    slug: 'earthing-system-guide',
    category: 'guide',
    image: '/assets/images/services/Grounding &Earthing-Systems.png',
    title: {
      ar: 'الدليل الشامل لأنظمة التأريض الكهربائية',
      en: 'Complete Guide to Electrical Earthing Systems',
    },
    excerpt: {
      ar: 'كل ما تحتاج معرفته عن أنظمة التأريض: الأنواع، طرق القياس، المعايير، وأفضل الممارسات للتركيب والصيانة.',
      en: 'Everything you need to know about earthing systems: types, measurement methods, standards, and best practices for installation and maintenance.',
    },
    content: {
      ar: `# الدليل الشامل لأنظمة التأريض الكهربائية

## ما هو التأريض الكهربائي؟

التأريض الكهربائي هو ربط الأجزاء المعدنية غير الحاملة للتيار في النظام الكهربائي بالأرض عبر موصل ذي مقاومة منخفضة. الهدف الأساسي هو توفير مسار آمن لتيارات الأعطال والتسرب إلى الأرض.

## أهمية التأريض

1. **حماية الأرواح**: يمنع الصعق الكهربائي بتوفير مسار منخفض المقاومة لتيار العطل.
2. **حماية المعدات**: يحد من ارتفاع الجهد ويحمي الأجهزة الكهربائية.
3. **استقرار الجهد**: يساعد في الحفاظ على استقرار الجهد في النظام الكهربائي.
4. **تفريغ الصواعق**: يوفر مساراً آمناً لتفريغ تيارات الصواعق.

## أنواع أنظمة التأريض

### 1. نظام TN (Terre Neutral)
- **TN-S**: موصل محايد وحماية منفصلين.
- **TN-C**: موصل محايد وحماية مدمج (PEN).
- **TN-C-S**: مزيج من النظامين (الأكثر شيوعاً).

### 2. نظام TT
لكل منشأة نظام تأريض مستقل، والموصل المحايد مؤرض مباشرة.

### 3. نظام IT
النظام معزول عن الأرض أو مؤرض عبر ممانعة عالية.

## طرق قياس مقاومة التربة

1. **طريقة Wenner 4-Point**: الأكثر دقة، تستخدم 4 أقطاب.
2. **طريقة Fall of Potential**: لقياس مقاومة التأريض الفعلية.
3. **طريقة Clamp-On**: سريعة للأنظمة القائمة.

## العوامل المؤثرة على مقاومة التأريض

- نوع التربة ومحتواها الرطوبي
- درجة الحرارة
- عمق القضبان وعددها
- المسافة بين القضبان
- نوع المادة المستخدمة`,
      en: `# Complete Guide to Electrical Earthing Systems

## What is Electrical Earthing?

Electrical earthing is connecting non-current-carrying metal parts of an electrical system to the ground through a low-resistance conductor. The primary goal is to provide a safe path for fault and leakage currents.

## Importance of Earthing

1. **Life Protection**: Prevents electric shock by providing a low-resistance path for fault current.
2. **Equipment Protection**: Limits voltage rise and protects electrical devices.
3. **Voltage Stability**: Helps maintain stable voltage in the electrical system.
4. **Lightning Discharge**: Provides a safe path for lightning current discharge.

## Types of Earthing Systems

### 1. TN System (Terre Neutral)
- **TN-S**: Separate neutral and protection conductors.
- **TN-C**: Combined neutral and protection conductor (PEN).
- **TN-C-S**: Combination of both systems (most common).

### 2. TT System
Each facility has an independent earthing system, and the neutral conductor is directly grounded.

### 3. IT System
System isolated from ground or grounded through high impedance.

## Soil Resistivity Measurement Methods

1. **Wenner 4-Point Method**: Most accurate, uses 4 electrodes.
2. **Fall of Potential Method**: For measuring actual ground resistance.
3. **Clamp-On Method**: Quick for existing systems.

## Factors Affecting Ground Resistance

- Soil type and moisture content
- Temperature
- Rod depth and number
- Distance between rods
- Material type used`,
    },
    tags: ['تأريض', 'أنظمة كهربائية', 'دليل فني', 'earthing', 'grounding', 'technical guide'],
    publishedAt: '2026-06-15',
  },
  {
    slug: 'soil-resistance-testing',
    category: 'testing',
    image: '/assets/images/backgroundImage/Risk-Assessment-1.avif',
    title: {
      ar: 'كيفية اختبار مقاومة التربة للتأريض',
      en: 'How to Test Soil Resistance for Earthing',
    },
    excerpt: {
      ar: 'دليل عملي لقياس مقاومة التربة الكهربائية باستخدام طرق Wenner و Fall of Potential مع شرح النتائج والتوصيات.',
      en: 'A practical guide to measuring soil electrical resistivity using Wenner and Fall of Potential methods with result analysis and recommendations.',
    },
    content: {
      ar: `# كيفية اختبار مقاومة التربة للتأريض

## لماذا نقيس مقاومة التربة؟

مقاومة التربة (Soil Resistivity) هي العامل الأكثر تأثيراً في تصميم نظام التأريض. قياسها بدقة يضمن:
- اختيار نوع نظام التأريض المناسب
- حساب عدد القضبان والمسافات بينها
- تقدير تكلفة النظام بدقة
- ضمان مطابقة النظام للمواصفات

## الأدوات المستخدمة

1. **جهاز قياس مقاومة التربة (Earth Tester)**: مثل Fluke 1625 أو Kyoritsu 4106.
2. **أقطاب كهربائية**: 4 أقطاب من الفولاذ المقاوم للصدأ.
3. **أسلاك توصيل**: بطول مناسب (عادة 50-100 متر).
4. **مطرقة**: لدق الأقطاب في التربة.

## طريقة Wenner 4-Point (الأكثر دقة)

### خطوات القياس:
1. دق 4 أقطاب في الأرض بخط مستقيم وبمسافات متساوية (a).
2. وصل الأقطاب بجهاز القياس.
3. تطبيق تيار كهربائي بين القطبين الخارجيين.
4. قياس الجهد بين القطبين الداخليين.
5. حساب المقاومة النوعية: ρ = 2πaR

### نصائح مهمة:
- تجنب القياس بالقرب من الهياكل المعدنية تحت الأرض
- كرر القياس في اتجاهات مختلفة
- سجل درجة حرارة التربة ورطوبتها`,
      en: `# How to Test Soil Resistance for Earthing

## Why Measure Soil Resistivity?

Soil resistivity is the most influential factor in earthing system design. Accurate measurement ensures:
- Choosing the right earthing system type
- Calculating required rod count and spacing
- Accurate cost estimation
- System specification compliance

## Equipment Used

1. **Earth Tester**: Such as Fluke 1625 or Kyoritsu 4106.
2. **Electrodes**: 4 stainless steel electrodes.
3. **Test Leads**: Suitable length (typically 50-100 meters).
4. **Hammer**: For driving electrodes into soil.

## Wenner 4-Point Method (Most Accurate)

### Measurement Steps:
1. Drive 4 electrodes in a straight line at equal spacing (a).
2. Connect electrodes to the tester.
3. Apply current between outer electrodes.
4. Measure voltage between inner electrodes.
5. Calculate resistivity: ρ = 2πaR

### Important Tips:
- Avoid measuring near underground metal structures
- Repeat measurements in different directions
- Record soil temperature and moisture`,
    },
    tags: ['مقاومة تربة', 'قياس', 'فحص', 'soil resistivity', 'measurement', 'testing'],
    publishedAt: '2026-06-14',
  },
  {
    slug: 'lightning-vs-earthing',
    category: 'educational',
    image: '/assets/images/services/Lightning Protection Systems.png',
    title: {
      ar: 'العلاقة بين الحماية من الصواعق وأنظمة التأريض',
      en: 'The Relationship Between Lightning Protection and Earthing Systems',
    },
    excerpt: {
      ar: 'فهم العلاقة التكاملية بين أنظمة الحماية من الصواعق والتأريض لضمان حماية كاملة للمنشآت.',
      en: 'Understanding the complementary relationship between lightning protection and earthing systems for complete facility protection.',
    },
    content: {
      ar: `# العلاقة بين الحماية من الصواعق وأنظمة التأريض

## لماذا لا يعمل أحدهما بدون الآخر؟

نظام الحماية من الصواعق ونظام التأريض وجهان لعملة واحدة. النظام الخارجي يلتقط الصاعقة ويوجهها إلى الأرض، لكن بدون نظام تأريض فعال، لا يمكن تفريغ الطاقة بأمان.

## كيف يعمل التكامل؟

### النظام الخارجي
- الملتقطات (Air Terminals) تلتقط الشحنة الكهربائية
- الموصلات الهابطة (Down Conductors) تنقل التيار
- العدادات تقيس التيار المار

### نظام التأريض
- يستقبل التيار من الموصلات الهابطة
- يفرغ الطاقة في الأرض بأمان
- يحد من ارتفاع الجهد

## ماذا يحدث بدون تأريض جيد؟

- **ارتفاع الجهد الخطير**: يمكن أن يصل الجهد إلى آلاف الفولتات
- **وميض جانبي (Side Flash)**: انتقال الشرارة إلى أجزاء المبنى
- **تلف المعدات**: حتى مع وجود مانع صواعق
- **خطر الحريق**: بسبب الشرارة الكهربائية`,
      en: `# The Relationship Between Lightning Protection and Earthing Systems

## Why Neither Works Without the Other?

Lightning protection and earthing systems are two sides of the same coin. The external system captures lightning and directs it to ground, but without an effective earthing system, energy cannot be safely dissipated.

## How Integration Works?

### External System
- Air terminals capture the electrical charge
- Down conductors transmit the current
- Meters measure passing current

### Earthing System
- Receives current from down conductors
- Dissipates energy safely into ground
- Limits voltage rise

## What Happens Without Good Earthing?

- **Dangerous Voltage Rise**: Voltage can reach thousands of volts
- **Side Flash**: Spark transfer to building parts
- **Equipment Damage**: Even with lightning rods installed
- **Fire Risk**: Due to electrical sparking`,
    },
    tags: ['صواعق', 'تأريض', 'حماية متكاملة', 'lightning', 'earthing', 'integrated protection'],
    publishedAt: '2026-06-13',
  },
  {
    slug: 'earthing-maintenance',
    category: 'maintenance',
    image: '/assets/images/backgroundImage/Image-17.avif',
    title: {
      ar: 'دليل صيانة أنظمة التأريض الدورية',
      en: 'Periodic Earthing System Maintenance Guide',
    },
    excerpt: {
      ar: 'خطوات وإجراءات الصيانة الدورية لأنظمة التأريض لضمان استمرار فعالية الحماية الكهربائية.',
      en: 'Steps and procedures for periodic earthing system maintenance to ensure continued electrical protection effectiveness.',
    },
    content: {
      ar: `# دليل صيانة أنظمة التأريض الدورية

## لماذا الصيانة الدورية ضرورية؟

نظام التأريض معرض لعوامل بيئية تؤثر على أدائه مع الوقت:
- تآكل الوصلات والقضبان
- تغير رطوبة التربة ومقاومتها
- حركة التربة والانكماش
- التعديلات في المنشأة

## قائمة الفحص الدوري

### فحص شهري
- فحص بصري للوصلات الظاهرة
- التأكد من عدم وجود قطع أو تلف في الموصلات
- مراجعة حالة غرف التفتيش

### فحص سنوي
- قياس مقاومة التأريض
- اختبار الاستمرارية بين جميع النقاط
- فحص حالة القضبان والتآكل
- اختبار أجهزة SPD المرتبطة

### فحص بعد الأحداث الطارئة
- بعد صواعق قريبة
- بعد أعمال حفر أو بناء
- بعد حدوث أعطال كهربائية`,
      en: `# Periodic Earthing System Maintenance Guide

## Why is Periodic Maintenance Essential?

The earthing system is exposed to environmental factors that affect its performance over time:
- Connection and rod corrosion
- Changes in soil moisture and resistivity
- Soil movement and shrinkage
- Facility modifications

## Inspection Checklist

### Monthly Inspection
- Visual inspection of visible connections
- Check for broken or damaged conductors
- Review inspection chamber condition

### Annual Inspection
- Ground resistance measurement
- Continuity testing between all points
- Rod corrosion inspection
- Associated SPD device testing

### Post-Emergency Inspection
- After nearby lightning strikes
- After excavation or construction work
- After electrical faults occur`,
    },
    tags: ['صيانة', 'تأريض', 'فحص دوري', 'maintenance', 'earthing', 'periodic inspection'],
    publishedAt: '2026-06-12',
  },
];

export const getKnowledgeArticleBySlug = (slug) => {
  return knowledgeArticles.find((article) => article.slug === slug);
};

export const getRelatedKnowledgeArticles = (currentSlug, limit = 2) => {
  return knowledgeArticles.filter((a) => a.slug !== currentSlug).slice(0, limit);
};
