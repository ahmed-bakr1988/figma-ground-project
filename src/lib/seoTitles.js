import companyInfo from '../config/companyInfo'

const BRAND = { ar: 'جراوند تك مصر', en: 'Ground Tech Egypt' }

const TITLE_PATTERNS = {
  home: {
    ar: ['{primary} | {brand}', '{primary}'],
    en: ['{brand} | {primary}', '{primary} - {brand}']
  },
  service: {
    ar: ['{primary} في مصر | {brand}', '{primary} | {secondary} - {brand}'],
    en: ['{primary} in Egypt | {brand}', '{primary} - {secondary} | {brand}']
  },
  content: {
    ar: ['{primary} | {brand}', '{primary} - {secondary} | {brand}'],
    en: ['{primary} | {brand}', '{primary} - {secondary} | {brand}']
  },
  legal: {
    ar: ['{primary} | {brand}'],
    en: ['{primary} | {brand}']
  }
}

const PAGE_CONFIGS = {
  '/': { type: 'home', primary: { ar: 'أنظمة الحماية من الصواعق والتأريض', en: 'Lightning Protection & Earthing Systems' } },
  '/about': { type: 'content', primary: { ar: 'من نحن', en: 'About Us' }, secondary: { ar: 'خبراء الحماية من الصواعق', en: 'Lightning Protection Experts' } },
  '/services': { type: 'service', primary: { ar: 'خدمات الحماية من الصواعق والتأريض', en: 'Lightning Protection & Earthing Services' }, secondary: { ar: 'تصميم وتركيب وصيانة', en: 'Design, Installation & Maintenance' } },
  '/services/lightning-protection-systems': { type: 'service', primary: { ar: 'أنظمة الحماية من الصواعق', en: 'Lightning Protection Systems' }, secondary: { ar: 'تصميم وتركيب في مصر', en: 'Design & Installation in Egypt' } },
  '/services/lightning-rod-installation': { type: 'service', primary: { ar: 'تركيب مانع صواعق', en: 'Lightning Rod Installation' }, secondary: { ar: 'توريد وتركيب وفحص', en: 'Supply, Install & Inspect' } },
  '/services/earthing-systems': { type: 'service', primary: { ar: 'أنظمة التأريض الكهربائية', en: 'Electrical Earthing Systems' }, secondary: { ar: 'تصميم وتنفيذ في مصر', en: 'Design & Installation in Egypt' } },
  '/services/surge-protection': { type: 'service', primary: { ar: 'الحماية من زيادة الجهد SPD', en: 'Surge Protection Devices SPD' }, secondary: { ar: 'حماية اللوحات الكهربائية', en: 'Electrical Panel Protection' } },
  '/services/lightning-risk-assessment': { type: 'service', primary: { ar: 'تقييم مخاطر الصواعق', en: 'Lightning Risk Assessment' }, secondary: { ar: 'دراسة وفق المعايير الدولية', en: 'IEC 62305 Study' } },
  '/services/maintenance-inspection': { type: 'service', primary: { ar: 'صيانة وفحص أنظمة الحماية', en: 'Maintenance & Inspection' }, secondary: { ar: 'فحص دوري لأنظمة الصواعق والتأريض', en: 'Periodic System Inspection' } },
  '/services/earthing/industrial': { type: 'service', primary: { ar: 'التأريض الصناعي', en: 'Industrial Earthing' }, secondary: { ar: 'تأريض المصانع والمنشآت الصناعية', en: 'Factory & Industrial Facility Grounding' } },
  '/services/earthing/soil-resistance': { type: 'service', primary: { ar: 'قياس مقاومة التربة', en: 'Soil Resistance Testing' }, secondary: { ar: 'فحص دقيق لتصميم التأريض', en: 'Precision Testing for Earthing Design' } },
  '/services/earthing/maintenance': { type: 'service', primary: { ar: 'صيانة أنظمة التأريض', en: 'Earthing System Maintenance' }, secondary: { ar: 'فحص وقياس وصيانة دورية', en: 'Inspection, Testing & Periodic Maintenance' } },
  '/services/earthing/specifications': { type: 'service', primary: { ar: 'مواصفات التأريض الفنية', en: 'Earthing Technical Specifications' }, secondary: { ar: 'معايير تركيب واختبار التأريض', en: 'Installation & Testing Standards' } },
  '/knowledge': { type: 'content', primary: { ar: 'مركز المعرفة', en: 'Knowledge Hub' }, secondary: { ar: 'معلومات هندسية عن التأريض والصواعق', en: 'Engineering Resources on Earthing & Lightning' } },
  '/products': { type: 'content', primary: { ar: 'منتجات الحماية من الصواعق والتأريض', en: 'Lightning Protection & Earthing Products' }, secondary: { ar: 'مانعات صواعق وSPD ومواد تأريض', en: 'Lightning Rods, SPDs & Earthing Materials' } },
  '/tools': { type: 'content', primary: { ar: 'أدوات ومصادر هندسية', en: 'Engineering Tools & Resources' }, secondary: { ar: 'حاسبات وأدوات فنية', en: 'Calculators & Technical Tools' } },
  '/projects': { type: 'content', primary: { ar: 'مشاريعنا', en: 'Our Projects' }, secondary: { ar: 'أعمال وتركيبات سابقة', en: 'Past Installations & Projects' } },
  '/case-studies': { type: 'content', primary: { ar: 'دراسات حالة', en: 'Case Studies' }, secondary: { ar: 'مشاريع حقيقية في الحماية من الصواعق والتأريض', en: 'Real Projects in Lightning Protection & Earthing' } },
  '/blog': { type: 'content', primary: { ar: 'المدونة', en: 'Blog' }, secondary: { ar: 'نصائح وأخبار الحماية من الصواعق والتأريض', en: 'Lightning Protection & Earthing Tips & News' } },
  '/faq': { type: 'content', primary: { ar: 'الأسئلة الشائعة', en: 'FAQ' }, secondary: { ar: 'إجابات عن الحماية من الصواعق والتأريض', en: 'Lightning Protection & Earthing Questions Answered' } },
  '/contact': { type: 'content', primary: { ar: 'اتصل بنا', en: 'Contact Us' }, secondary: { ar: 'استشارة مجانية وعرض سعر', en: 'Free Consultation & Quote' } },
  '/privacy-policy': { type: 'legal', primary: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' } },
  '/terms-of-service': { type: 'legal', primary: { ar: 'شروط الخدمة', en: 'Terms of Service' } }
}

export function getPageTitle(config, locale) {
  const { type, primary, secondary } = config
  const patterns = TITLE_PATTERNS[type] || TITLE_PATTERNS.content
  const candidates = patterns[locale] || patterns.en

  const replacements = {
    primary: primary ? primary[locale] || primary.en : '',
    secondary: secondary ? secondary[locale] || secondary.en : '',
    brand: BRAND[locale]
  }

  for (const pattern of candidates) {
    let title = pattern
    for (const [key, value] of Object.entries(replacements)) {
      title = title.replace(`{${key}}`, value)
    }
    if (title.length <= 70) return title
  }

  const fallback = `${replacements.primary} | ${replacements.brand}`
  return fallback.length <= 70 ? fallback : fallback.slice(0, 67) + '...'
}

export function getTitleByPath(pathname, locale = 'ar') {
  const config = PAGE_CONFIGS[pathname]
  if (config) return getPageTitle(config, locale)
  return null
}

export function getDynamicTitle(primary, secondary, locale = 'ar', type = 'content') {
  return getPageTitle({ type, primary: { [locale]: primary }, secondary: { [locale]: secondary } }, locale)
}

export function getBlogTitle(title, locale = 'ar') {
  return locale === 'ar'
    ? `${title} | ${BRAND.ar}`
    : `${title} | ${BRAND.en}`
}

export function getCaseStudyTitle(title, locale = 'ar') {
  return locale === 'ar'
    ? `${title} | دراسات حالة - ${BRAND.ar}`
    : `${title} | Case Study - ${BRAND.en}`
}

export function getArticleTitle(title, locale = 'ar') {
  return locale === 'ar'
    ? `${title} | مركز المعرفة - ${BRAND.ar}`
    : `${title} | Knowledge Hub - ${BRAND.en}`
}

export default getPageTitle
