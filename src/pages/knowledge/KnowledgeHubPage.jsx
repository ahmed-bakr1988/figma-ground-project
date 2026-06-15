import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Search, Calendar, Clock, Tag } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { knowledgeArticles } from '../../data/knowledgeArticles';
import { getTitleByPath } from '../../lib/seoTitles';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const categoryData = {
  guide: { ar: 'أدلة فنية', en: 'Technical Guides', color: 'bg-blue-100 text-blue-700' },
  testing: { ar: 'اختبارات وقياسات', en: 'Testing & Measurements', color: 'bg-green-100 text-green-700' },
  educational: { ar: 'معلومات تثقيفية', en: 'Educational', color: 'bg-purple-100 text-purple-700' },
  maintenance: { ar: 'صيانة', en: 'Maintenance', color: 'bg-orange-100 text-orange-700' },
};

export default function KnowledgeHubPage() {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';

  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'المعرفة' : 'Knowledge Hub', url: `${companyInfo.urls.website}/knowledge` },
  ];

  return (
    <>
      <SEOHead
        title={getTitleByPath('/knowledge', locale)}
        description={locale === 'ar' ? 'مركز المعرفة الهندسية لأنظمة التأريض والحماية من الصواعق. أدلة فنية، مقالات تعليمية، واختبارات قياس مقاومة التربة.' : 'Engineering knowledge hub for earthing and lightning protection systems. Technical guides, educational articles, and soil testing resources.'}
        url={`${companyInfo.urls.website}/knowledge`}
        breadcrumbs={breadcrumbs}
      />
      <main className="bg-white">
        <section className="relative bg-gradient-to-br from-primary via-primary to-secondary py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 border border-white/30 rounded-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
            <motion.div {...fadeInUp} className="text-center">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                {locale === 'ar' ? 'مصادر تعليمية هندسية' : 'Engineering Educational Resources'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {locale === 'ar' ? 'مركز المعرفة' : 'Knowledge Hub'}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                {locale === 'ar' ? 'مصدرك الشامل للمعلومات الهندسية عن أنظمة التأريض والحماية من الصواعق' : 'Your comprehensive source for engineering information on earthing and lightning protection systems'}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="grid md:grid-cols-2 gap-8">
              {knowledgeArticles.map((article, index) => {
                const cat = categoryData[article.category] || { ar: '', en: '', color: 'bg-gray-100 text-gray-700' };
                return (
                  <motion.article key={article.slug} {...fadeInUp} transition={{ delay: index * 0.1 }} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100">
                    <Link to={`/knowledge/${article.slug}`} className="block">
                      <div className="h-48 overflow-hidden">
                        <img src={article.image} alt={article.title[locale]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${cat.color}`}>
                          {cat[locale]}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                          {article.title[locale]}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                          {article.excerpt[locale]}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.publishedAt}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                          {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
