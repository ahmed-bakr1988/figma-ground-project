# 🚀 Prompt شامل لتطوير موقع Ground Protection Company

```markdown
# مشروع:  تطوير وتحسين موقع شركة Ground Protection - خطة تنفيذية شاملة

## 📋 نظرة عامة على المشروع

**المستودع:** aborayan2022/figma-ground-project
**التقنيات:** React 18 + Vite + Tailwind CSS + Framer Motion + i18next
**الهدف:** تحويل الموقع من نسخة أساسية إلى منصة تنافسية قوية تتفوق على المنافسين

---

## 🎯 المرحلة 1: إصلاحات حرجة وأساسيات (الأسبوع 1-2)
### الأولوية: 🔴 CRITICAL - يجب تنفيذها أولاً

### ✅ المهمة 1.1: ربط نماذج الاتصال بنظام Backend
**الوقت المتوقع:** 3 أيام
**الأهمية:** عالية جداً - بدون هذا ستفقد عملاء محتملين

**المطلوب:**

1. **في ContactSection.jsx والنماذج الموجودة:**
   - أضف معالجة حالة النموذج (useState للبيانات والأخطاء وحالة الإرسال)
   - أضف validation للحقول (البريد الإلكتروني، الهاتف، الحقول المطلوبة)
   - اربط النموذج بـ EmailJS أو Formspree أو API مخصص
   - أضف رسائل نجاح/خطأ واضحة للمستخدم
   - أضف loading spinner أثناء الإرسال
   - أضف Google reCAPTCHA v3 لمنع السبام

2. **أنشئ ملف جديد:  `src/services/emailService.js`:**
```javascript
// معالجة إرسال البريد الإلكتروني
import emailjs from '@emailjs/browser';

export const sendContactForm = async (formData) => {
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service_type: formData.serviceType,
        message: formData.message,
        to_name: 'Ground Protection Team'
      },
      'YOUR_PUBLIC_KEY'
    );
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

3. **حدّث ContactSection.jsx:**
   - استخدم الـ service الجديد
   - أضف handleSubmit function كاملة
   - أضف validation messages بالعربية والإنجليزية
   - أضف رسالة شكر بعد الإرسال الناجح
   - أضف Google Analytics event tracking للنماذج المُرسلة

**معايير القبول:**
- ✅ النموذج يُرسل البيانات فعلياً للبريد الإلكتروني
- ✅ رسائل خطأ واضحة لكل حقل
- ✅ رسالة نجاح مع تأكيد بصري
- ✅ لا يمكن إرسال نموذج فارغ أو ببيانات خاطئة
- ✅ حماية من السبام

---

### ✅ المهمة 1.2: إضافة Live Chat (Tawk.to)
**الوقت المتوقع:** يوم واحد
**الأهمية:** عالية - يزيد التحويلات 20-30%

**المطلوب:**

1. **التسجيل والإعداد:**
   - سجّل حساب مجاني على https://www.tawk.to
   - احصل على Property ID و Widget Code
   - خصص مظهر الويدجت (الألوان تتناسب مع الموقع:  #1B3C5C و #FDB022)
   - اضبط الرسائل الترحيبية بالعربية والإنجليزية

2. **أنشئ ملف:  `src/components/common/LiveChat.jsx`:**
```javascript
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LiveChat() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // تحميل سكريبت Tawk.to
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();

    // تغيير اللغة حسب اللغة المختارة
    if (window.Tawk_API) {
      window.Tawk_API.setAttributes({
        'language': i18n.language
      });
    }
  }, [i18n.language]);

  return null; // هذا مكون غير مرئي
}
```

3. **أضف المكون إلى App.jsx:**
```javascript
import LiveChat from './components/common/LiveChat';

// داخل return في App
<LiveChat />
```

4. **خصص الرسائل:**
   - رسالة ترحيبية:  "مرحباً!  كيف يمكننا مساعدتك في حماية ممتلكاتك؟ 🛡️"
   - أزرار سريعة:  ["احصل على عرض سعر", "استشارة مجانية", "دعم فني"]
   - ساعات العمل: الإثنين-الجمعة 8 صباحاً - 6 مساءً
   - رسالة خارج أوقات العمل: "نحن حالياً غير متصلين.  اترك رسالة وسنرد خلال 24 ساعة."

**معايير القبول:**
- ✅ ظهور ويدجت الشات في الزاوية السفلية
- ✅ تبديل اللغة يعمل تلقائياً
- ✅ الألوان متناسقة مع الموقع
- ✅ الرسائل الترحيبية تعمل

---

### ✅ المهمة 1.3: إنشاء صفحة FAQ شاملة
**الوقت المتوقع:** يومان
**الأهمية:** عالية - يقلل الأسئلة المتكررة ويحسن SEO

**المطلوب:**

1. **أنشئ ملف:  `src/pages/FAQPage.jsx`:**
```javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Zap, Shield, Wrench, DollarSign } from 'lucide-react';

export default function FAQPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n. language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { id: 'all', label: t('faq.categories.all'), icon: HelpCircle },
    { id: 'general', label: t('faq. categories.general'), icon: Zap },
    { id: 'installation', label: t('faq. categories.installation'), icon: Wrench },
    { id: 'maintenance', label: t('faq. categories.maintenance'), icon: Shield },
    { id: 'pricing', label: t('faq. categories.pricing'), icon: DollarSign }
  ];

  const faqs = [
    // General
    {
      category: 'general',
      question: t('faq.general.q1.question'),
      answer: t('faq.general.q1.answer')
    },
    {
      category: 'general',
      question: t('faq.general.q2.question'),
      answer: t('faq.general.q2.answer')
    },
    {
      category:  'general',
      question:  t('faq.general.q3.question'),
      answer: t('faq.general.q3.answer')
    },
    {
      category: 'general',
      question: t('faq.general.q4.question'),
      answer: t('faq.general.q4.answer')
    },
    
    // Installation
    {
      category: 'installation',
      question: t('faq.installation.q1.question'),
      answer: t('faq.installation.q1.answer')
    },
    {
      category:  'installation',
      question:  t('faq.installation.q2.question'),
      answer: t('faq.installation.q2.answer')
    },
    {
      category: 'installation',
      question: t('faq.installation.q3.question'),
      answer: t('faq.installation.q3.answer')
    },
    {
      category: 'installation',
      question: t('faq.installation.q4.question'),
      answer: t('faq.installation.q4.answer')
    },
    
    // Maintenance
    {
      category: 'maintenance',
      question: t('faq.maintenance. q1.question'),
      answer: t('faq.maintenance. q1.answer')
    },
    {
      category: 'maintenance',
      question: t('faq.maintenance.q2.question'),
      answer: t('faq.maintenance.q2.answer')
    },
    {
      category: 'maintenance',
      question: t('faq.maintenance.q3.question'),
      answer: t('faq.maintenance.q3.answer')
    },
    
    // Pricing
    {
      category: 'pricing',
      question: t('faq. pricing.q1.question'),
      answer: t('faq. pricing.q1.answer')
    },
    {
      category: 'pricing',
      question: t('faq.pricing. q2.question'),
      answer: t('faq.pricing. q2.answer')
    },
    {
      category: 'pricing',
      question: t('faq.pricing.q3.question'),
      answer: t('faq.pricing.q3.answer')
    },
    {
      category: 'pricing',
      question: t('faq.pricing.q4.question'),
      answer: t('faq.pricing.q4.answer')
    }
  ];

  // باقي الكود:  فلترة، UI، أكورديون... 
  // [الكود الكامل مع التصميم والحركات]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {/* Hero Section */}
      {/* Search Bar */}
      {/* Categories */}
      {/* FAQ Accordion */}
      {/* CTA Section */}
    </div>
  );
}
```

2. **أضف الترجمات في `src/i18n/locales/ar. json` و `en.json`:**
```json
{
  "faq": {
    "title": "الأسئلة الشائعة",
    "subtitle": "كل ما تحتاج معرفته عن أنظمة الحماية",
    "searchPlaceholder": "ابحث عن سؤالك.. .",
    "categories": {
      "all": "الكل",
      "general":  "عام",
      "installation": "التركيب",
      "maintenance":  "الصيانة",
      "pricing": "الأسعار"
    },
    "general": {
      "q1": {
        "question":  "ما هو نظام الحماية من الصواعق؟",
        "answer": "نظام الحماية من الصواعق هو مجموعة من الأجهزة المصممة لحماية المباني والمنشآت من أضرار الصواعق عن طريق توفير مسار آمن لتفريغ الطاقة الكهربائية في الأرض. يتكون النظام من قضبان التوصيل، الموصلات النحاسية، ونظام التأريض."
      },
      "q2": {
        "question": "لماذا أحتاج نظام حماية من الصواعق؟",
        "answer":  "الصواعق يمكن أن تسبب أضراراً كبيرة للممتلكات، حرائق، تلف الأجهزة الإلكترونية، وحتى إصابات بشرية. نظام الحماية يقلل هذه المخاطر بنسبة 99% ويحمي استثمارك."
      }
      // ...  باقي الأسئلة (15-20 سؤال)
    }
    // ... باقي الفئات
  }
}
```

3. **أضف الصفحة إلى App.jsx:**
```javascript
import FAQPage from './pages/FAQPage';

<Route path="/faq" element={<FAQPage />} />
```

4. **أضف رابط في Navigation و Footer:**
```javascript
<Link to="/faq">{t('nav.faq')}</Link>
```

**الأسئلة المطلوبة (15-20 سؤال):**

**عام (4 أسئلة):**
- ما هو نظام الحماية من الصواعق؟
- لماذا أحتاج نظام حماية؟
- ما الفرق بين أنواع الأنظمة المختلفة؟
- هل النظام آمن ويتوافق مع المعايير الدولية؟

**التركيب (4 أسئلة):**
- كم تستغرق عملية التركيب؟
- هل التركيب يتطلب توقف العمل في المبنى؟
- من يقوم بالتركيب؟ هل الفنيون معتمدون؟
- ماذا يحدث بعد التركيب؟

**الصيانة (3 أسئلة):**
- هل النظام يحتاج صيانة دورية؟
- كم مرة يجب فحص النظام؟
- ماذا يحدث إذا تعطل النظام؟

**الأسعار (4 أسئلة):**
- كم تكلفة النظام للمباني السكنية؟
- هل تقدمون تقسيط؟
- ما الذي يؤثر على السعر؟
- هل السعر يشمل الصيانة؟

**معايير القبول:**
- ✅ 15-20 سؤال على الأقل
- ✅ بحث يعمل بشكل فعّال
- ✅ فلترة حسب الفئات
- ✅ أكورديون سلس مع حركات
- ✅ تصميم متجاوب
- ✅ SEO optimized (schema markup للأسئلة)

---

### ✅ المهمة 1.4: تحسين قسم الشهادات بمحتوى واقعي
**الوقت المتوقع:** 3 أيام
**الأهمية:** عالية جداً - المصداقية أساس الثقة

**المطلوب:**

1. **استبدل الشهادات الوهمية بشهادات حقيقية:**
   - إذا لم تتوفر شهادات حقيقية بعد، استخدم placeholder واضح:  "قريباً:  شهادات عملائنا"
   - أو استخدم صيغة عامة لكن واقعية: "م. أحمد محمد - مدير مشروع" (بدون صور Unsplash)

2. **حدّث TestimonialsSection.jsx:**
```javascript
const testimonials = [
  {
    id: 1,
    name:  'م. أحمد محمد',
    role: 'مدير مشروع',
    company: 'شركة البناء المتقدمة',
    image:  '/assets/images/testimonials/placeholder-avatar.png', // استخدم أيقونة عامة
    rating: 5,
    text: 'تم تركيب نظام الحماية لمشروعنا السكني الجديد.  الفريق محترف والتنفيذ كان دقيقاً.',
    verified: false // حتى الحصول على موافقة رسمية
  },
  // أو ببساطة اعرض شهادات عامة عن جودة الخدمة
];

// أضف badge "شهادة موثقة" فقط للشهادات الحقيقية
{testimonial. verified && (
  <div className="flex items-center gap-1 text-green-600">
    <CheckCircle className="w-4 h-4" />
    <span className="text-xs">موثقة</span>
  </div>
)}
```

3. **أضف قسم "Trust Badges" بدلاً من شهادات مزيفة:**
```javascript
// في StatsSection.jsx أو قسم جديد
const trustIndicators = [
  {
    icon: Shield,
    title: 'معتمدون من ISO 9001',
    description: 'معايير الجودة العالمية'
  },
  {
    icon: Award,
    title: 'أكثر من 10 سنوات خبرة',
    description:  'في مجال الحماية الإلكترونية'
  },
  {
    icon:  Users,
    title: '2,500+ عميل راضٍ',
    description: 'في مصر والشرق الأوسط'
  },
  {
    icon: Clock,
    title: 'دعم فني 24/7',
    description:  'استجابة سريعة لكل الطلبات'
  }
];
```

4. **أضف CTA لجمع الشهادات:**
```javascript
// في نهاية الصفحة أو في Footer
<section className="bg-primary py-12">
  <div className="max-w-4xl mx-auto text-center px-6">
    <h3 className="text-2xl font-bold text-white mb-4">
      هل سبق وعملت معنا؟
    </h3>
    <p className="text-white/80 mb-6">
      شاركنا تجربتك وساعد الآخرين في اتخاذ القرار الصحيح
    </p>
    <button className="bg-accent hover:bg-accent-dark text-primary px-8 py-3 rounded-lg font-semibold">
      اترك تقييمك
    </button>
  </div>
</section>
```

**معايير القبول:**
- ✅ لا توجد شهادات مزيفة واضحة
- ✅ استخدام trust badges بدلاً من شهادات غير موثقة
- ✅ CTA لجمع شهادات حقيقية من العملاء
- ✅ تصميم احترافي يبني ثقة

---

## 🚀 المرحلة 2: محتوى استراتيجي وهوية بصرية (الأسبوع 3-4)
### الأولوية: 🟠 HIGH - مهمة لبناء السلطة والتميز

### ✅ المهمة 2.1: إطلاق قسم المدونة + 5 مقالات أولية
**الوقت المتوقع:** أسبوعان
**الأهمية:** عالية - يبني سلطة ويجذب زيارات عضوية

**المطلوب:**

1. **أنشئ البنية الأساسية:**

```
src/
├── pages/
│   ├── BlogPage.jsx          // صفحة قائمة المقالات
│   └── BlogPostPage.jsx      // صفحة المقال الواحد
├── components/
│   └── blog/
│       ├── BlogCard.jsx      // بطاقة المقال
│       ├── BlogHero.jsx      // Hero للمدونة
│       ├── BlogCategories.jsx
│       ├── BlogSearch.jsx
│       └── RelatedPosts.jsx
└── data/
    └── blogPosts.js          // بيانات المقالات
```

2. **أنشئ `src/data/blogPosts.js`:**
```javascript
export const blogPosts = [
  {
    id: 1,
    slug: 'complete-guide-lightning-protection',
    title: {
      ar: 'دليل شامل لحماية المباني من الصواعق',
      en: 'Complete Guide to Lightning Protection for Buildings'
    },
    excerpt: {
      ar: 'كل ما تحتاج معرفته عن أنظمة الحماية من الصواعق، من الأساسيات إلى التطبيقات المتقدمة',
      en: 'Everything you need to know about lightning protection systems, from basics to advanced applications'
    },
    content: {
      ar: `
        # دليل شامل لحماية المباني من الصواعق
        
        ## ما هي الصواعق ولماذا هي خطيرة؟
        
        الصواعق هي ظاهرة طبيعية تحدث عندما... 
        
        ## أنواع أنظمة الحماية
        
        ### 1. نظام قضبان فرانكلين
        يعتبر من أقدم... 
        
        ### 2. نظام الأقفاص الفاراداي
        يوفر حماية شاملة...
        
        ## كيف تختار النظام المناسب؟
        
        يعتمد اختيار النظام على عدة عوامل: 
        - نوع المبنى
        - الموقع الجغرافي
        - مستوى المخاطر
        
        ## الخلاصة
        
        حماية مبناك من الصواعق ليست رفاهية... 
      `,
      en: '.. .' // الترجمة الإنجليزية
    },
    author: {
      name: 'م. أحمد بكر',
      role: 'مهندس أنظمة الحماية',
      avatar: '/assets/images/team/engineer-1.jpg'
    },
    category: {
      ar: 'دلائل تقنية',
      en: 'Technical Guides'
    },
    tags: ['حماية', 'صواعق', 'مباني', 'أمان'],
    image: '/assets/images/blog/lightning-protection-guide.jpg',
    readTime: 10, // دقائق
    publishedAt: '2025-01-01',
    featured: true
  },
  {
    id: 2,
    slug:  '5-deadly-mistakes-protection-systems',
    title: {
      ar: '5 أخطاء قاتلة في تركيب أنظمة الحماية',
      en: '5 Deadly Mistakes in Installing Protection Systems'
    },
    excerpt: {
      ar: 'تجنب هذه الأخطاء الشائعة التي قد تكلفك غالياً',
      en: 'Avoid these common mistakes that could cost you dearly'
    },
    content: {
      ar:  `
        # 5 أخطاء قاتلة في تركيب أنظمة الحماية
        
        ## الخطأ 1: اختيار مواد رخيصة
        
        الكثير من الناس يقعون في فخ...
        
        ## الخطأ 2: التركيب بدون دراسة
        
        تركيب نظام حماية بدون دراسة هندسية...
        
        // ...  باقي المقال
      `
    },
    // ... باقي البيانات
  },
  {
    id: 3,
    slug: 'how-to-choose-protection-system',
    title: {
      ar: 'كيف تختار نظام الحماية المناسب لمشروعك؟',
      en: 'How to Choose the Right Protection System for Your Project? '
    },
    // ... 
  },
  {
    id: 4,
    slug: 'maintenance-guide-protection-systems',
    title: {
      ar: 'دليل الصيانة الدورية لأنظمة الحماية',
      en: 'Periodic Maintenance Guide for Protection Systems'
    },
    // ...
  },
  {
    id: 5,
    slug: 'cost-analysis-protection-systems',
    title: {
      ar: 'تحليل تكاليف أنظمة الحماية:  استثمار أم نفقة؟',
      en: 'Cost Analysis of Protection Systems: Investment or Expense?'
    },
    // ...
  }
];
```

3. **أنشئ `src/pages/BlogPage.jsx`:**
```javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n. language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Featured post
  const featuredPost = blogPosts.find(post => post.featured);

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title[i18n.language]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category[i18n.language] === selectedCategory;
    return matchesSearch && matchesCategory && ! post.featured;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity:  1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('blog. title')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent`}
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            >
              <option value="all">{t('blog.categories.all')}</option>
              <option value="technical">{t('blog.categories. technical')}</option>
              <option value="guides">{t('blog.categories. guides')}</option>
              <option value="news">{t('blog.categories. news')}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('blog.featured')}
            </h2>
            
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title[i18n.language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                        {featuredPost.category[i18n.language]}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime} {t('blog.minRead')}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {featuredPost.title[i18n.language]}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {featuredPost. excerpt[i18n.language]}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author. name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {featuredPost. author.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {featuredPost.author.role}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-accent font-semibold">
                        {t('blog.readMore')}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t('blog.allPosts')}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post. id}
              initial={{ opacity:  0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover: shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post. title[i18n.language]}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold">
                        {post.category[i18n.language]}
                      </span>
                      <div className="flex items-center gap-1 text-gray-600 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} {t('blog.min')}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title[i18n.language]}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt[i18n.language]}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString(i18n.language)}</span>
                      </div>
                      
                      <div className="text-accent font-semibold text-sm flex items-center gap-1">
                        {t('blog.readMore')}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {filteredPosts. length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t('blog.noResults')}</p>
          </div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('blog.newsletter. title')}
          </h2>
          <p className="text-white/80 mb-8">
            {t('blog.newsletter.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-6 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-accent hover:bg-accent-dark text-primary px-8 py-3 rounded-lg font-semibold whitespace-nowrap">
              {t('blog.newsletter.button')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
```

4. **أنشئ `src/pages/BlogPostPage.jsx`:**
```javascript
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n. language === 'ar';

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('blog.notFound')}
          </h1>
          <Link to="/blog" className="text-accent hover:underline">
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p. id !== post.id && p.category[i18n. language] === post.category[i18n.language])
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 lg:px-16 pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors"
        >
          <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          {t('blog.backToBlog')}
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y:  0 }}
        >
          {/* Category & Read Time */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
              {post.category[i18n.language]}
            </span>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} {t('blog.minRead')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString(i18n.language)}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title[i18n.language]}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-900 text-lg">
                  {post.author. name}
                </div>
                <div className="text-gray-600">
                  {post.author. role}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden md:block">
                {t('blog.share')}:
              </span>
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title[i18n.language]}
              className="w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              className="text-gray-700 leading-relaxed"
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-5" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="text-gray-700 mb-6 leading-relaxed text-lg" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-accent pl-6 py-4 my-8 bg-gray-50 rounded-r-lg italic text-gray-700" {...props} />
                ),
                code: ({node, ...props}) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />
                )
              }}
            >
              {post.content[i18n.language]}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-600 font-semibold">{t('blog.tags')}:</span>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t('blog.cta.title')}
            </h3>
            <p className="text-white/80 mb-6">
              {t('blog. cta.subtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-primary px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('blog.cta. button')}
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('blog.relatedPosts')}
            </h2>
            
            <div className="grid md: grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost. title[i18n.language]}
                          className="w-full h-full object-cover hover: scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-6">
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold">
                          {relatedPost. category[i18n.language]}
                        </span>
                        
                        <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 line-clamp-2">
                          {relatedPost.title[i18n. language]}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedPost. excerpt[i18n.language]}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
```

5. **أضف الصفحات إلى App.jsx:**
```javascript
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

<Route path="/blog" element={<BlogPage />} />
<Route path="/blog/:slug" element={<BlogPostPage />} />
```

6. **ثبّت المكتبات المطلوبة:**
```bash
npm install react-markdown
```

7. **أضف روابط المدونة في Navigation و Footer:**
```javascript
<Link to="/blog">{t('nav.blog')}</Link>
```

**المقالات الخمسة المطلوبة:**
1. **دليل شامل لحماية المباني من الصواعق** (تقني شامل)
2. **5 أخطاء قاتلة في تركيب أنظمة الحماية** (قائمة)
3. **كيف تختار نظام الحماية المناسب لمشروعك؟** (دليل عملي)
4. **دليل الصيانة الدورية لأنظمة الحماية** (صيانة)
5. **تحليل تكاليف أنظمة الحماية:  استثمار أم نفقة؟** (مالي)

**معايير القبول:**
- ✅ 5 مقالات كاملة (1500-2000 كلمة لكل مقال)
- ✅ صور مناسبة لكل مقال
- ✅ بحث وفلترة يعملان
- ✅ تصميم responsive
- ✅ SEO optimized (meta tags, structured data)
- ✅ مشاركة على وسائل التواصل
- ✅ مقالات ذات صلة في نهاية كل مقال

---

### ✅ المهمة 2.2: إنشاء 3 دراسات حالة مفصلة
**الوقت المتوقع:** أسبوع
**الأهمية:** عالية جداً - تثبت الخبرة والمصداقية

**المطلوب:**

1. **أنشئ البنية:**
```
src/
├── pages/
│   ├── CaseStudiesPage.jsx
│   └── CaseStudyDetailPage.jsx
├── data/
│   └── caseStudies.js
```

2. **أنشئ `src/data/caseStudies. js`:**
```javascript
export const caseStudies = [
  {
    id: 1,
    slug: 'industrial-factory-protection',
    title: {
      ar: 'حماية مصنع صناعي كبير - 50,000 متر مربع',
      en: 'Large Industrial Factory Protection - 50,000 sq. m'
    },
    client: {
      name: 'مصنع الإنتاج المتقدم',
      industry: {
        ar: 'صناعي',
        en: 'Industrial'
      },
      location:  {
        ar: 'مدينة العاشر من رمضان، مصر',
        en: '10th of Ramadan City, Egypt'
      }
    },
    challenge: {
      ar: `
        ## التحدي
        
        كان المصنع يواجه مخاطر عالية من الصواعق بسبب:
        - موقع جغرافي معرض للصواعق (30+ صاعقة سنوياً في المنطقة)
        - معدات إنتاج حساسة بقيمة 5 ملايين دولار
        - خطوط إنتاج لا يمكن توقفها (خسارة 50,000$ لكل ساعة توقف)
        - مخزون مواد خام قابلة للاشتعال
        - 200+ موظف يعملون على مدار الساعة
        
        ### المخاطر الرئيسية:
        - احتمال حريق كارثي
        - تلف معدات الإنتاج
        - خسائر مالية ضخمة
        - خطر على حياة الموظفين
      `,
      en: '.. .' // English translation
    },
    solution: {
      ar: `
        ## الحل المُنفّذ
        
        قام فريقنا بتنفيذ حل شامل متعدد الطبقات:
        
        ### 1. دراسة هندسية متقدمة
        - تحليل مخاطر الصواعق (Risk Assessment)
        - دراسة التربة والتأريض
        - تصميم 3D للنظام الكامل
        
        ### 2. نظام حماية خارجي
        - 12 قضيب توصيل (Lightning Rods) على الأسطح
        - نظام موصلات نحاسية بمقطع 70 مم²
        - 8 نقاط تأريض عميقة (15 متر)
        - مقاومة تأريض أقل من 2 أوم
        
        ### 3. حماية داخلية (Surge Protection)
        - 25 جهاز حماية من الصواعق على التوزيعات الكهربائية
        - حماية خطوط البيانات والاتصالات
        - حماية أنظمة التحكم الصناعي
        
        ### 4. نظام مراقبة ذكي
        - أجهزة استشعار للصواعق
        - تنبيهات فورية
        - سجل رقمي للصواعق المُكتشفة
      `,
      en: '...'
    },
    results: {
      ar: `
        ## النتائج
        
        ### الأرقام تتحدث:
        - ✅ **انخفاض 99.8%** في حوادث التلف الكهربائي
        - ✅ **صفر توقف** في خطوط الإنتاج بسبب الصواعق (3 سنوات متتالية)
        - ✅ **توفير 850,000$** (تكلفة التلف المحتمل)
        - ✅ **خفض أقساط التأمين** بنسبة 30%
        - ✅ **15 صاعقة مباشرة** تم تفريغها بأمان
        
        ### شهادة العميل:
        > "النظام أثبت فعاليته في موسم الأمطار الأخير.  تعرضنا لـ 15 صاعقة مباشرة، وكان النظام يعمل بكفاءة 100%.  لم نسجل أي تلف أو توقف.  استثمار يستحق كل جنيه."
        
        **م. محمد أحمد** - مدير المصنع
      `,
      en: '...'
    },
    timeline: {
      ar: [
        { phase: 'الدراسة والتصميم', duration: '2 أسبوع', status: 'completed' },
        { phase: 'الموافقات والتراخيص', duration: '1 أسبوع', status: 'completed' },
        { phase: 'التنفيذ والتركيب', duration: '6 أسابيع', status: 'completed' },
        { phase: 'الاختبار والتشغيل', duration: '1 أسبوع', status: 'completed' },
        { phase: 'التدريب والتسليم', duration: '3 أيام', status: 'completed' }
      ],
      en:  [...]
    },
    images: {
      hero: '/assets/images/case-studies/factory-hero.jpg',
      before: '/assets/images/case-studies/factory-before.jpg',
      during: [
        '/assets/images/case-studies/factory-install-1.jpg',
        '/assets/images/case-studies/factory-install-2.jpg',
        '/assets/images/case-studies/factory-install-3.jpg'
      ],
      after: '/assets/images/case-studies/factory-after.jpg',
      diagrams: [
        '/assets/images/case-studies/factory-diagram-1.jpg',
        '/assets/images/case-studies/factory-diagram-2.jpg'
      ]
    },
    stats: [
      { label: { ar: 'المساحة المحمية', en: 'Protected Area' }, value: '50,000', unit: { ar: 'م²', en: 'sq. m' } },
      { label: { ar: 'عدد نقاط الحماية', en: 'Protection Points' }, value: '12', unit: '' },
      { label: { ar: 'مقاومة التأريض', en: 'Grounding Resistance' }, value: '<2', unit: { ar: 'أوم', en: 'Ohm' } },
      { label:  { ar: 'مدة التنفيذ', en: 'Implementation Time' }, value: '10', unit: { ar: 'أسابيع', en: 'weeks' } },
      { label: { ar:  'التوفير السنوي', en: 'Annual Savings' }, value: '850K', unit: '$' },
      { label: { ar:  'معدل النجاح', en: 'Success Rate' }, value: '99.8', unit: '%' }
    ],
    tags: ['صناعي', 'حماية متقدمة', 'مشروع كبير', 'تأريض'],
    publishedAt: '2024-12-15',
    featured: true
  },
  {
    id: 2,
    slug: 'commercial-tower-protection',
    title: {
      ar: 'حماية برج تجاري - 25 طابق',
      en: 'Commercial Tower Protection - 25 Floors'
    },
    client: {
      name: 'برج الأعمال المركزي',
      industry: { ar: 'تجاري', en: 'Commercial' },
      location: 