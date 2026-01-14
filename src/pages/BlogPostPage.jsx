import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  Share2, 
  Phone,
  Tag,
  User,
  BookOpen,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

// Simple Markdown Renderer
const MarkdownContent = ({ content }) => {
  // Parse markdown content
  const parseContent = (text) => {
    if (!text) return null;
    
    const lines = text.trim().split('\n');
    const elements = [];
    let inList = false;
    let listItems = [];
    let listType = 'ul';

    const processLine = (line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 mt-8 mb-6">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3">{line.slice(4)}</h3>;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-accent pl-6 py-4 my-6 bg-accent/5 rounded-r-lg italic text-gray-700">
            {line.slice(2)}
          </blockquote>
        );
      }

      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return { type: 'li', content: line.slice(2) };
      }

      // Bold text
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');

      // Empty line
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }

      // Table (simple support)
      if (line.startsWith('|')) {
        return null; // Skip tables for now
      }

      // Regular paragraph
      return (
        <p 
          key={index} 
          className="text-gray-700 mb-4 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    };

    let currentListItems = [];
    
    lines.forEach((line, index) => {
      const result = processLine(line, index);
      
      if (result && typeof result === 'object' && result.type === 'li') {
        currentListItems.push(
          <li key={index} className="text-gray-700 mb-2 flex items-start">
            <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span dangerouslySetInnerHTML={{ __html: result.content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') }} />
          </li>
        );
      } else {
        if (currentListItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="mb-6 space-y-1">
              {currentListItems}
            </ul>
          );
          currentListItems = [];
        }
        if (result) {
          elements.push(result);
        }
      }
    });

    // Handle remaining list items
    if (currentListItems.length > 0) {
      elements.push(
        <ul key="list-final" className="mb-6 space-y-1">
          {currentListItems}
        </ul>
      );
    }

    return elements;
  };

  return <div className="prose prose-lg max-w-none">{parseContent(content)}</div>;
};

// Related Post Card
const RelatedPostCard = ({ post, isRTL, lang }) => {
  return (
    <Link to={`/blog/${post.slug}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="h-40 overflow-hidden">
          <img
            src={post.image}
            alt={post.title[lang]}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-5">
          <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold">
            {post.category[lang]}
          </span>
          
          <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 line-clamp-2">
            {post.title[lang]}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} {lang === 'ar' ? 'دقائق' : 'min'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';
  const [copied, setCopied] = React.useState(false);

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle share
  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = post?.title[lang] || '';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('blog.notFound')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('blog.notFoundDesc')}
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category[lang] === post.category[lang])
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-accent transition-colors">{t('nav.blog')}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium line-clamp-1">{post.title[lang]}</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-10">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-bold">
                {post.category[lang]}
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} {lang === 'ar' ? 'دقائق قراءة' : 'min read'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title[lang]}
            </h1>

            {/* Author & Share */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name[lang]}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {post.author.name[lang]}
                  </div>
                  <div className="text-gray-500">
                    {post.author.role[lang]}
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 mr-2">
                  {lang === 'ar' ? 'شارك:' : 'Share:'}
                </span>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={post.image}
              alt={post.title[lang]}
              className="w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="mb-12">
            <MarkdownContent content={post.content[lang]} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-5 h-5 text-gray-400" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 md:p-10 text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('blog.cta.title')}
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              {t('blog.cta.subtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all"
            >
              {t('blog.cta.button')}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('blog.relatedPosts')}
              </span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <RelatedPostCard post={relatedPost} isRTL={isRTL} lang={lang} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors font-medium"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </section>
    </div>
  );
}
