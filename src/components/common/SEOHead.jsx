/**
 * ================================
 * مكون SEO Head - إدارة Meta Tags والـ Schema
 * ================================
 * 
 * يستخدم هذا المكون لإضافة meta tags وschema markup
 * لكل صفحة بشكل ديناميكي
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import companyInfo from '../../config/companyInfo';
import { getFullSchema, getBreadcrumbSchema } from '../../config/seoSchema';

/**
 * SEOHead Component
 * 
 * @param {Object} props
 * @param {string} props.title - عنوان الصفحة
 * @param {string} props.description - وصف الصفحة
 * @param {string} props.keywords - الكلمات المفتاحية (اختياري)
 * @param {string} props.image - صورة OG (اختياري)
 * @param {string} props.url - رابط الصفحة (اختياري)
 * @param {string} props.type - نوع الصفحة (website, article, product)
 * @param {Array} props.breadcrumbs - مسار التنقل [{name, url}]
 * @param {Object} props.schema - Schema إضافي مخصص
 * @param {boolean} props.noIndex - منع الفهرسة
 */
export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  breadcrumbs,
  schema,
  noIndex = false,
  article,
}) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';
  const isRTL = locale === 'ar';

  // القيم الافتراضية
  const pageTitle = title || companyInfo.seo.titles.home[locale];
  const pageDescription = description || companyInfo.description.short[locale];
  const pageKeywords = keywords || companyInfo.seo.keywords[locale].join(', ');
  const pageImage = image || companyInfo.urls.ogImage;
  const pageUrl = url || companyInfo.urls.website;
  const siteName = companyInfo.name[locale];

  useEffect(() => {
    // تحديث عنوان الصفحة
    document.title = pageTitle;

    // تحديث اتجاه الصفحة
    document.documentElement.lang = locale === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // تحديث Meta Tags
    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', pageKeywords);
    updateMetaTag('author', siteName);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Canonical URL
    updateLinkTag('canonical', pageUrl);

    // hreflang tags
    updateLinkTag('alternate', `${companyInfo.urls.website}${getPathFromUrl(pageUrl)}?lang=ar`, 'hreflang', 'ar');
    updateLinkTag('alternate', `${companyInfo.urls.website}${getPathFromUrl(pageUrl)}?lang=en`, 'hreflang', 'en');
    updateLinkTag('alternate', `${companyInfo.urls.website}${getPathFromUrl(pageUrl)}`, 'hreflang', 'x-default');

    // Open Graph
    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', pageDescription, 'property');
    updateMetaTag('og:image', pageImage, 'property');
    updateMetaTag('og:url', pageUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    updateMetaTag('og:locale', locale === 'ar' ? 'ar_EG' : 'en_US', 'property');
    updateMetaTag('og:locale:alternate', locale === 'ar' ? 'en_US' : 'ar_EG', 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', pageImage);
    updateMetaTag('twitter:site', '@groundeg');

    // Article specific meta (for blog posts)
    if (type === 'article' && article) {
      updateMetaTag('article:published_time', article.publishedAt, 'property');
      updateMetaTag('article:modified_time', article.updatedAt || article.publishedAt, 'property');
      updateMetaTag('article:author', article.author || siteName, 'property');
      if (article.tags) {
        article.tags.forEach((tag) => {
          addMetaTag('article:tag', tag, 'property');
        });
      }
    }

    // Schema.org JSON-LD
    updateSchemaScript(locale, breadcrumbs, schema);

    // Cleanup function
    return () => {
      // يمكن إضافة تنظيف هنا إذا لزم الأمر
    };
  }, [pageTitle, pageDescription, pageKeywords, pageImage, pageUrl, locale, type, article, breadcrumbs, schema, noIndex, isRTL, siteName]);

  return null; // هذا المكون لا يعرض أي شيء مرئي
}

/**
 * تحديث أو إنشاء meta tag
 */
function updateMetaTag(name, content, attribute = 'name') {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * إضافة meta tag جديد (للتكرار مثل article:tag)
 */
function addMetaTag(name, content, attribute = 'name') {
  if (!content) return;

  const element = document.createElement('meta');
  element.setAttribute(attribute, name);
  element.setAttribute('content', content);
  document.head.appendChild(element);
}

/**
 * تحديث أو إنشاء link tag
 */
function updateLinkTag(rel, href, attribute = null, attributeValue = null) {
  if (!href) return;

  let selector = `link[rel="${rel}"]`;
  if (attribute && attributeValue) {
    selector = `link[rel="${rel}"][${attribute}="${attributeValue}"]`;
  }

  let element = document.querySelector(selector);
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (attribute && attributeValue) {
      element.setAttribute(attribute, attributeValue);
    }
    document.head.appendChild(element);
  }
  
  element.setAttribute('href', href);
}

/**
 * استخراج المسار من URL
 */
function getPathFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch {
    return url.replace(companyInfo.urls.website, '') || '/';
  }
}

/**
 * تحديث Schema.org JSON-LD
 */
function updateSchemaScript(locale, breadcrumbs, additionalSchema) {
  // إزالة السكريبت القديم
  const existingScript = document.querySelector('script[data-schema="seo"]');
  if (existingScript) {
    existingScript.remove();
  }

  // إنشاء Schema جديد
  const schemas = [...getFullSchema(locale)];

  // إضافة Breadcrumb Schema إذا وجد
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(getBreadcrumbSchema(breadcrumbs));
  }

  // إضافة Schema مخصص
  if (additionalSchema) {
    if (Array.isArray(additionalSchema)) {
      schemas.push(...additionalSchema);
    } else {
      schemas.push(additionalSchema);
    }
  }

  // إنشاء وإضافة السكريبت
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'seo');
  script.textContent = JSON.stringify(schemas);
  document.head.appendChild(script);
}

/**
 * Hook لاستخدام SEO بدون مكون
 */
export function useSEO(options) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';

  useEffect(() => {
    if (options.title) {
      document.title = options.title;
    }
    // يمكن إضافة المزيد من المنطق هنا
  }, [options, locale]);
}
