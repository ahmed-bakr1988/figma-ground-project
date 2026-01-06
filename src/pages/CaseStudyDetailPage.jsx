import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  ChevronRight,
  Zap,
  Award,
  CheckCircle,
  Quote,
  Phone,
  Share2,
  Download,
  ExternalLink
} from 'lucide-react';
import { getCaseStudyBySlug, getRelatedCaseStudies } from '../data/caseStudies';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import Logo from '../components/common/Logo';

// Markdown-like content parser
const ContentSection = ({ content }) => {
  if (!content) return null;
  
  const parseContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    
    lines.forEach((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="space-y-2 mb-6">
              {currentList}
            </ul>
          );
          currentList = [];
        }
        elements.push(
          <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            {line.slice(4)}
          </h3>
        );
        return;
      }
      
      // List items
      if (line.startsWith('- ')) {
        const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>');
        currentList.push(
          <li key={index} className="flex items-start gap-3 text-gray-700">
            <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: content }} />
          </li>
        );
        return;
      }
      
      // Regular paragraph
      if (line.trim() && !line.startsWith('#')) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="space-y-2 mb-6">
              {currentList}
            </ul>
          );
          currentList = [];
        }
        const content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>');
        elements.push(
          <p key={index} className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        );
      }
    });
    
    // Handle remaining list items
    if (currentList.length > 0) {
      elements.push(
        <ul key="list-final" className="space-y-2 mb-6">
          {currentList}
        </ul>
      );
    }
    
    return elements;
  };
  
  return <div>{parseContent(content)}</div>;
};

// Related Case Study Card
const RelatedCaseCard = ({ study, isRTL, lang }) => {
  return (
    <Link to={`/case-studies/${study.slug}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="h-48 overflow-hidden">
          <img
            src={study.image}
            alt={study.title[lang]}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-5">
          <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold">
            {study.projectType[lang]}
          </span>
          
          <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 line-clamp-2">
            {study.title[lang]}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{study.location[lang]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';

  const study = getCaseStudyBySlug(slug);
  const relatedStudies = study ? getRelatedCaseStudies(study.id, 2) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const content = {
    ar: {
      challenge: 'التحدي',
      challengeDesc: 'المشكلة التي واجهناها',
      solution: 'الحل',
      solutionDesc: 'كيف تعاملنا مع التحدي',
      results: 'النتائج',
      resultsDesc: 'ما حققناه في هذا المشروع',
      testimonial: 'شهادة العميل',
      relatedTitle: 'مشاريع مشابهة',
      ctaTitle: 'هل لديك مشروع مماثل؟',
      ctaDesc: 'تواصل معنا للحصول على استشارة مجانية',
      ctaButton: 'احجز استشارة',
      backToList: 'العودة للمشاريع',
      notFound: 'دراسة الحالة غير موجودة',
      notFoundDesc: 'عذراً، لم نتمكن من العثور على دراسة الحالة المطلوبة',
      projectInfo: 'معلومات المشروع',
      client: 'العميل',
      location: 'الموقع',
      projectType: 'نوع المشروع',
      size: 'المساحة',
      value: 'قيمة المشروع',
      duration: 'مدة التنفيذ',
      completed: 'تاريخ الإنجاز'
    },
    en: {
      challenge: 'The Challenge',
      challengeDesc: 'The problem we faced',
      solution: 'The Solution',
      solutionDesc: 'How we tackled the challenge',
      results: 'The Results',
      resultsDesc: 'What we achieved in this project',
      testimonial: 'Client Testimonial',
      relatedTitle: 'Similar Projects',
      ctaTitle: 'Have a Similar Project?',
      ctaDesc: 'Contact us for a free consultation',
      ctaButton: 'Book Consultation',
      backToList: 'Back to Projects',
      notFound: 'Case Study Not Found',
      notFoundDesc: 'Sorry, we could not find the requested case study',
      projectInfo: 'Project Information',
      client: 'Client',
      location: 'Location',
      projectType: 'Project Type',
      size: 'Size',
      value: 'Project Value',
      duration: 'Duration',
      completed: 'Completion Date'
    }
  };

  const c = content[lang];

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{c.notFound}</h1>
          <p className="text-gray-600 mb-8">{c.notFoundDesc}</p>
          <Link 
            to="/case-studies" 
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            {c.backToList}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo size="small" showText={true} textColor="dark" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <Link to="/services" className="hover:text-accent transition-colors">{t('nav.services')}</Link>
            <Link to="/projects" className="hover:text-accent transition-colors">{t('nav.projects')}</Link>
            <Link to="/blog" className="hover:text-accent transition-colors">{t('nav.blog')}</Link>
            <Link to="/case-studies" className="text-accent font-semibold">{t('nav.caseStudies')}</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">{t('nav.contact')}</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <Link to="/contact" className="bg-accent hover:bg-accent-dark text-primary px-4 py-2 rounded-lg font-semibold transition-all text-sm">
              {t('nav.getQuote')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/case-studies" className="hover:text-accent transition-colors">{lang === 'ar' ? 'دراسات الحالة' : 'Case Studies'}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium line-clamp-1">{study.title[lang]}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img
            src={study.image}
            alt={study.title[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {study.featured && (
                  <span className="inline-flex items-center gap-1 px-4 py-2 bg-accent text-primary rounded-full text-sm font-bold mb-4">
                    <Award className="w-4 h-4" />
                    {lang === 'ar' ? 'مشروع مميز' : 'Featured Project'}
                  </span>
                )}
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {study.title[lang]}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span>{study.client[lang]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{study.location[lang]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(study.completedAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{c.challenge}</h2>
                  <p className="text-gray-500 text-sm">{c.challengeDesc}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <ContentSection content={study.challenge[lang]} />
              </div>
            </motion.section>

            {/* Solution Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{c.solution}</h2>
                  <p className="text-gray-500 text-sm">{c.solutionDesc}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 md:p-8 border border-primary/10">
                <ContentSection content={study.solution[lang]} />
              </div>
            </motion.section>

            {/* Results Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{c.results}</h2>
                  <p className="text-gray-500 text-sm">{c.resultsDesc}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {study.results[lang].map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="text-4xl font-bold text-primary mb-2">{result.value}</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">{result.metric}</div>
                    <div className="text-sm text-gray-500">{result.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Testimonial Section */}
            {study.testimonial && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{c.testimonial}</h2>
                </div>
                
                <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 relative overflow-hidden">
                  <Quote className="absolute top-4 right-4 w-24 h-24 text-white/10" />
                  
                  <blockquote className="text-xl leading-relaxed mb-6 relative z-10">
                    "{study.testimonial.quote[lang]}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">{study.testimonial.author[lang][0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{study.testimonial.author[lang]}</div>
                      <div className="text-white/80">{study.testimonial.role[lang]}</div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                {c.projectInfo}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">{c.client}</div>
                    <div className="font-semibold text-gray-900">{study.client[lang]}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">{c.location}</div>
                    <div className="font-semibold text-gray-900">{study.location[lang]}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">{c.projectType}</div>
                    <div className="font-semibold text-gray-900">{study.projectType[lang]}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">{c.size}</div>
                    <div className="font-semibold text-gray-900">{study.buildingSize}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">{c.value}</div>
                    <div className="font-semibold text-gray-900">{study.projectValue}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">{c.duration}</div>
                    <div className="font-semibold text-gray-900">{study.duration[lang]}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">{c.completed}</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(study.completedAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-bold transition-all"
                >
                  {c.ctaButton}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
                
                <a
                  href="tel:+966123456789"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <Phone className="w-5 h-5" />
                  +966 12 345 6789
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {c.relatedTitle}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {relatedStudies.map((relatedStudy, index) => (
                <motion.div
                  key={relatedStudy.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <RelatedCaseCard study={relatedStudy} isRTL={isRTL} lang={lang} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to List */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors font-medium"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            {c.backToList}
          </Link>
        </div>
      </section>
    </div>
  );
}
