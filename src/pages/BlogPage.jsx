import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  Phone,
  Mail,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { useNewsletterSubscribe } from '../services/hooks';
import SEOHead from '../components/common/SEOHead';
import companyInfo from '../config/companyInfo';

// Blog Card Component
const BlogCard = ({ post, index, isRTL, lang }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
          <div className="h-48 overflow-hidden relative">
            <img
              src={post.image}
              alt={post.title[lang]}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-accent text-primary rounded-full text-xs font-bold">
                {post.category[lang]}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} {lang === 'ar' ? 'دقائق' : 'min read'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow">
              {post.title[lang]}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.excerpt[lang]}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name[lang]}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {post.author.name[lang]}
                </span>
              </div>

              <div className="flex items-center gap-1 text-accent font-semibold text-sm">
                {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Featured Post Component
const FeaturedPost = ({ post, isRTL, lang }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="h-64 lg:h-auto overflow-hidden">
              <img
                src={post.image}
                alt={post.title[lang]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                  {post.category[lang]}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} {lang === 'ar' ? 'دقائق قراءة' : 'min read'}</span>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title[lang]}
              </h2>

              <p className="text-gray-600 mb-6 line-clamp-3">
                {post.excerpt[lang]}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name[lang]}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {post.author.name[lang]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {post.author.role[lang]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-accent font-semibold">
                  {lang === 'ar' ? 'اقرأ المقال' : 'Read Article'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');

  // Newsletter subscription hook
  const { loading: newsletterLoading, error: newsletterError, success: newsletterSuccess, subscribe, reset: resetNewsletter } = useNewsletterSubscribe();

  // إعادة تعيين رسالة النجاح بعد 5 ثوانٍ
  useEffect(() => {
    if (newsletterSuccess) {
      const timer = setTimeout(() => {
        resetNewsletter();
        setEmail('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newsletterSuccess, resetNewsletter]);

  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(post => post.category[lang]));
    return ['all', ...cats];
  }, [lang]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' ||
        post.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt[lang].toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' ||
        post.category[lang] === selectedCategory;

      return matchesSearch && matchesCategory && !post.featured;
    });
  }, [searchTerm, selectedCategory, lang]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    await subscribe(email, null);
  };

  // SEO Data
  const locale = isRTL ? 'ar' : 'en';
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'المدونة' : 'Blog', url: `${companyInfo.urls.website}/blog` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Head */}
      <SEOHead
        title={locale === 'ar' 
          ? 'المدونة | مقالات الحماية من الصواعق والتأريض - جراوند' 
          : 'Blog | Lightning Protection & Grounding Articles - Ground'}
        description={locale === 'ar'
          ? 'اقرأ أحدث المقالات والأخبار عن أنظمة الحماية من الصواعق، تقنيات التأريض، معايير السلامة، ونصائح الخبراء. محتوى تعليمي متخصص.'
          : 'Read the latest articles and news about lightning protection systems, grounding techniques, safety standards, and expert tips. Specialized educational content.'}
        keywords={locale === 'ar'
          ? 'مقالات حماية صواعق, مدونة تأريض, نصائح سلامة كهربائية, تقنيات حماية, معايير NFPA'
          : 'lightning protection articles, grounding blog, electrical safety tips, protection techniques, NFPA standards'}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section with Navigation */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("assets/images/backgroundImage/Image-17.webp")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(5px)'
            }}></div>
          </div>
        </div>



        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-16 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-accent font-semibold text-sm">
                {t('blog.badge')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('blog.title')}
            </h1>

            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-5 h-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none bg-white min-w-[150px]"
              >
                <option value="all">{t('blog.categories.all')}</option>
                {categories.filter(c => c !== 'all').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && searchTerm === '' && selectedCategory === 'all' && (
        <section className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="text-accent font-semibold uppercase tracking-wider text-sm">
              {t('blog.featured')}
            </span>
          </div>

          <FeaturedPost post={featuredPost} isRTL={isRTL} lang={lang} />
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-[2px] bg-accent"></div>
          <span className="text-accent font-semibold uppercase tracking-wider text-sm">
            {t('blog.allPosts')}
          </span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                isRTL={isRTL}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('blog.noResults')}
            </h3>
            <p className="text-gray-500">
              {t('blog.tryAgain')}
            </p>
          </motion.div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Mail className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t('blog.newsletter.subtitle')}
            </p>

            {/* رسالة النجاح */}
            {newsletterSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-lg flex items-center justify-center gap-3 max-w-md mx-auto"
              >
                <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
                <p className="text-green-100 font-medium">{t('blog.newsletter.success', 'تم الاشتراك بنجاح!')}</p>
              </motion.div>
            )}

            {/* رسالة الخطأ */}
            {newsletterError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-lg max-w-md mx-auto"
              >
                <p className="text-red-100 font-medium">{newsletterError}</p>
              </motion.div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('blog.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={newsletterLoading}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent outline-none disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold whitespace-nowrap transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {newsletterLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    {t('blog.newsletter.subscribing', 'جارٍ الاشتراك...')}
                  </>
                ) : (
                  t('blog.newsletter.button')
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
