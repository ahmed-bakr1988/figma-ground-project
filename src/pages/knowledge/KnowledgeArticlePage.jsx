import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, ChevronRight, BookOpen } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import companyInfo from '../../config/companyInfo';
import { getKnowledgeArticleBySlug, getRelatedKnowledgeArticles } from '../../data/knowledgeArticles';
import { getArticleTitle } from '../../lib/seoTitles';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function parseContentToHtml(markdown) {
  return markdown
    .split('\n')
    .map((line) => {
      if (line.startsWith('### ')) return `<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">${line.slice(4)}</h3>`;
      if (line.startsWith('## ')) return `<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith('# ')) return `<h1 class="text-3xl font-bold text-gray-900 mt-10 mb-6">${line.slice(2)}</h1>`;
      if (line.startsWith('- ')) return `<li class="flex items-start gap-2 text-gray-700 mb-1"><span class="text-accent mt-2">•</span><span>${line.slice(2)}</span></li>`;
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) return `<li class="flex items-start gap-2 text-gray-700 mb-1"><span class="font-bold text-accent min-w-[20px]">${line.slice(0, 3)}</span><span>${line.slice(3)}</span></li>`;
      if (line.trim() === '') return '';
      if (line.startsWith('**') && line.endsWith('**')) return `<strong class="text-primary block mt-4 mb-2">${line.slice(2, -2)}</strong>`;
      return `<p class="text-gray-700 mb-3 leading-relaxed">${line}</p>`;
    })
    .join('\n');
}

export default function KnowledgeArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar' : 'en';

  const article = getKnowledgeArticleBySlug(slug);
  const related = article ? getRelatedKnowledgeArticles(slug, 2) : [];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'المقال غير موجود' : 'Article Not Found'}
          </h1>
          <Link to="/knowledge" className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg font-semibold">
            <ArrowLeft className="w-5 h-5" />
            {locale === 'ar' ? 'العودة لمركز المعرفة' : 'Back to Knowledge Hub'}
          </Link>
        </div>
      </div>
    );
  }

  const pageUrl = `${companyInfo.urls.website}/knowledge/${article.slug}`;
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'مركز المعرفة' : 'Knowledge Hub', url: `${companyInfo.urls.website}/knowledge` },
    { name: article.title[locale], url: pageUrl },
  ];

  return (
    <>
      <SEOHead
        title={getArticleTitle(article.title[locale], locale)}
        description={article.excerpt[locale]}
        url={pageUrl}
        breadcrumbs={breadcrumbs}
      />
      <main className="bg-white">
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-16 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-accent transition-colors">
                {locale === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/knowledge" className="hover:text-accent transition-colors">
                {locale === 'ar' ? 'مركز المعرفة' : 'Knowledge Hub'}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium line-clamp-1">{article.title[locale]}</span>
            </div>
          </div>
        </div>

        <article className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-16">
            <motion.div {...fadeInUp}>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {article.title[locale]}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.publishedAt}
                </span>
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: parseContentToHtml(article.content[locale]) }} />
            </motion.div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  {locale === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {related.map((r) => (
                    <Link key={r.slug} to={`/knowledge/${r.slug}`} className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                      <h3 className="font-bold text-gray-900 group-hover:text-accent transition-colors mb-2">{r.title[locale]}</h3>
                      <p className="text-sm text-gray-600">{r.excerpt[locale]}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 text-center">
              <Link to="/knowledge" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                <ArrowRight className="w-5 h-5" />
                {locale === 'ar' ? 'العودة لمركز المعرفة' : 'Back to Knowledge Hub'}
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
