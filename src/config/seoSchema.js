/**
 * ================================
 * Schema.org Structured Data للـ SEO
 * ================================
 * 
 * هذا الملف يولّد Schema Markup بتنسيق JSON-LD
 * لتحسين ظهور الموقع في نتائج البحث
 */

import companyInfo from './companyInfo';

/**
 * Organization Schema
 * Note: مدمج الآن مع LocalBusiness لتجنب التكرار
 */
export const getOrganizationSchema = (locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${companyInfo.urls.website}/#organization`,
  name: companyInfo.name[locale],
  alternateName: companyInfo.name.brand,
  url: companyInfo.urls.website,
  logo: {
    '@type': 'ImageObject',
    url: companyInfo.urls.logo,
    width: 512,
    height: 512,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: companyInfo.contact.phone.shortDisplay,
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
      areaServed: 'EG',
    },
  ],
  sameAs: Object.values(companyInfo.social),
});

/**
 * LocalBusiness Schema - للأعمال المحلية
 * تم دمج خصائص Organization الهامة هنا لتقديم كيان واحد قوي
 */
export const getLocalBusinessSchema = (locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${companyInfo.urls.website}/#localbusiness`,
  name: companyInfo.name[locale],
  alternateName: companyInfo.name.brand,
  image: {
    '@type': 'ImageObject',
    url: companyInfo.urls.logo,
    width: 512,
    height: 512,
  },
  url: companyInfo.urls.website,
  telephone: companyInfo.contact.phone.shortDisplay,
  email: companyInfo.contact.email.primary,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyInfo.contact.address.street[locale],
    addressLocality: companyInfo.contact.address.city[locale],
    addressRegion: companyInfo.contact.address.region[locale],
    postalCode: companyInfo.contact.address.postalCode,
    addressCountry: 'EG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: companyInfo.contact.address.geo.latitude,
    longitude: companyInfo.contact.address.geo.longitude,
  },
  openingHoursSpecification: companyInfo.contact.hours.schema.map((schedule) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: schedule.dayOfWeek,
    opens: schedule.opens,
    closes: schedule.closes,
  })),
  // وتمت إزالة AggregateRating لعدم وجود مراجعات مرئية على الموقع حالياً
  // Google Policy: Reviews must be visible to users to use AggregateRating
  areaServed: companyInfo.serviceAreas.map((area) => ({
    '@type': 'City',
    name: area[locale],
  })),
  sameAs: Object.values(companyInfo.social),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: companyInfo.contact.phone.shortDisplay,
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
      areaServed: 'EG',
    },
    {
      '@type': 'ContactPoint',
      telephone: companyInfo.contact.phone.shortDisplay,
      contactType: 'sales',
      availableLanguage: ['Arabic', 'English'],
      areaServed: 'EG',
    },
  ],
});

/**
 * Service Schema - لصفحات الخدمات
 */
export const getServiceSchema = (serviceId, locale = 'ar') => {
  const service = companyInfo.services.find((s) => s.id === serviceId);
  if (!service) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${companyInfo.urls.website}/services/${serviceId}`,
    name: service.name[locale],
    description: service.description[locale],
    provider: {
      '@type': 'Organization',
      name: companyInfo.name[locale],
      url: companyInfo.urls.website,
    },
    areaServed: {
      '@type': 'Country',
      name: locale === 'ar' ? 'مصر' : 'Egypt',
    },
    serviceType: service.name.en,
  };
};

/**
 * جميع خدمات الشركة Schema
 */
export const getAllServicesSchema = (locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${companyInfo.urls.website}/services`,
  name: locale === 'ar' ? 'خدمات الحماية من الصواعق والتأريض' : 'Lightning Protection & Earthing Services',
  provider: {
    '@type': 'Organization',
    name: companyInfo.name[locale],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: locale === 'ar' ? 'خدماتنا' : 'Our Services',
    itemListElement: companyInfo.services.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service.name[locale],
        description: service.description[locale],
      },
    })),
  },
});

/**
 * FAQ Schema - للأسئلة الشائعة
 */
export const getFAQSchema = (faqs, locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${companyInfo.urls.website}/faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

/**
 * Article Schema - لمقالات المدونة
 */
export const getArticleSchema = (article, locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${companyInfo.urls.website}/blog/${article.slug}`,
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt || article.publishedAt,
  author: {
    '@type': 'Person',
    name: article.author || 'فريق جراوند تك',
  },
  publisher: {
    '@type': 'Organization',
    name: companyInfo.name[locale],
    logo: {
      '@type': 'ImageObject',
      url: companyInfo.urls.logo,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${companyInfo.urls.website}/blog/${article.slug}`,
  },
});

/**
 * BreadcrumbList Schema
 */
export const getBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * WebSite Schema - للبحث في الموقع
 */
export const getWebSiteSchema = (locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${companyInfo.urls.website}/#website`,
  url: companyInfo.urls.website,
  name: companyInfo.name[locale],
  description: companyInfo.description.short[locale],
  publisher: {
    '@id': `${companyInfo.urls.website}/#localbusiness`,
  },
  inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${companyInfo.urls.website}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * WebPage Schema - لأي صفحة
 */
export const getWebPageSchema = (page, locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': page.url,
  url: page.url,
  name: page.title,
  description: page.description,
  isPartOf: {
    '@id': `${companyInfo.urls.website}/#website`,
  },
  about: {
    '@id': `${companyInfo.urls.website}/#localbusiness`,
  },
  inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
  datePublished: page.publishedAt,
  dateModified: page.updatedAt,
});

/**
 * Product Schema
 * تمت إزالة التقييمات (AggregateRating) لعدم وجود مراجعات مرئية
 */
export const getProductReviewSchema = (locale = 'ar') => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: locale === 'ar' ? 'خدمات الحماية من الصواعق' : 'Lightning Protection Services',
  description: companyInfo.description.short[locale],
  brand: {
    '@type': 'Brand',
    name: companyInfo.name.brand,
  },
});

/**
 * دمج جميع الـ Schema في كائن واحد
 * تم تحديثه لإرجاع LocalBusiness فقط (بدلاً من Organization + LocalBusiness) لمنع التكرار
 */
export const getFullSchema = (locale = 'ar') => [
  getLocalBusinessSchema(locale),
  getWebSiteSchema(locale),
];

export default {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getAllServicesSchema,
  getFAQSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  getWebSiteSchema,
  getWebPageSchema,
  getProductReviewSchema,
  getFullSchema,
};
