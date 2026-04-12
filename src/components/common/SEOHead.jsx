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
  const pageUrl = url || getCurrentAbsolutePageUrl();
  const siteName = companyInfo.name[locale];
  const pagePath = normalizePath(getPathFromUrl(pageUrl));
  const alternateUrls = getAlternateUrls(pagePath);
  const canonicalUrl = locale === 'en' ? alternateUrls.en : alternateUrls.ar;
  const robotsContent = noIndex
    ? 'noindex, nofollow, max-image-preview:none, max-snippet:0, max-video-preview:0'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

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
    updateMetaTag('robots', robotsContent);
    updateMetaTag('googlebot', robotsContent);
    updateMetaTag('language', locale);
    updateMetaTag('application-name', companyInfo.name.brand);
    updateMetaTag('theme-color', companyInfo.seo.themeColor || '#0E3A5D');

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // hreflang tags
    updateLinkTag('alternate', alternateUrls.ar, 'hreflang', 'ar');
    updateLinkTag('alternate', alternateUrls.en, 'hreflang', 'en');
    updateLinkTag('alternate', alternateUrls.ar, 'hreflang', 'x-default');

    // Open Graph
    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', pageDescription, 'property');
    updateMetaTag('og:image', pageImage, 'property');
    updateMetaTag('og:image:secure_url', pageImage, 'property');
    updateMetaTag('og:image:alt', pageTitle, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    updateMetaTag('og:locale', locale === 'ar' ? 'ar_EG' : 'en_US', 'property');
    updateMetaTag('og:locale:alternate', locale === 'ar' ? 'en_US' : 'ar_EG', 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', pageImage);
    updateMetaTag('twitter:image:alt', pageTitle);
    updateMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:site', companyInfo.seo.twitterHandle || '@groundeg');
    updateMetaTag('twitter:creator', companyInfo.seo.twitterHandle || '@groundeg');

    // Article specific meta (for blog posts)
    removeMetaTags('article:tag', 'property');
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
      removeMetaTags('article:tag', 'property');
      removeSchemaScripts();
    };
  }, [pageTitle, pageDescription, pageKeywords, pageImage, canonicalUrl, locale, type, article, breadcrumbs, schema, noIndex, isRTL, siteName, robotsContent, alternateUrls.ar, alternateUrls.en]);

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

function removeMetaTags(name, attribute = 'name') {
  document.querySelectorAll(`meta[${attribute}="${name}"]`).forEach((element) => {
    element.remove();
  });
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

function getCurrentAbsolutePageUrl() {
  if (typeof window === 'undefined') {
    return companyInfo.urls.website;
  }

  return `${companyInfo.urls.website}${window.location.pathname}`;
}

function normalizePath(path) {
  if (!path || path === '') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function buildLocalizedUrl(path, locale) {
  const url = new URL(path, companyInfo.urls.website);

  if (locale === 'en') {
    url.searchParams.set('lang', 'en');
  } else {
    url.searchParams.delete('lang');
  }

  return url.toString();
}

function getAlternateUrls(path) {
  return {
    ar: buildLocalizedUrl(path, 'ar'),
    en: buildLocalizedUrl(path, 'en'),
  };
}

function removeSchemaScripts() {
  document.querySelectorAll('script[data-schema="seo"]').forEach((script) => {
    script.remove();
  });
}

/**
 * تحديث Schema.org JSON-LD
 */
function updateSchemaScript(locale, breadcrumbs, additionalSchema) {
  // إزالة السكريبت القديم
  removeSchemaScripts();

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
