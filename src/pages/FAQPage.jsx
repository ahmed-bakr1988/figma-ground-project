import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Zap, 
  Shield, 
  Wrench, 
  DollarSign,
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import Logo from '../components/common/Logo';

// FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle, isRTL }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4 flex-1">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-accent' : 'text-gray-400'}`} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-2 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Category Tab Component
const CategoryTab = ({ category, isActive, onClick, isRTL }) => {
  const Icon = category.icon;
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
        isActive 
          ? 'bg-accent text-primary shadow-lg shadow-accent/30' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{category.label}</span>
    </button>
  );
};

export default function FAQPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  // Categories
  const categories = [
    { id: 'all', label: t('faq.categories.all'), icon: HelpCircle },
    { id: 'general', label: t('faq.categories.general'), icon: Zap },
    { id: 'installation', label: t('faq.categories.installation'), icon: Wrench },
    { id: 'maintenance', label: t('faq.categories.maintenance'), icon: Shield },
    { id: 'pricing', label: t('faq.categories.pricing'), icon: DollarSign }
  ];

  // FAQ Data
  const faqs = [
    // General Questions
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
      category: 'general',
      question: t('faq.general.q3.question'),
      answer: t('faq.general.q3.answer')
    },
    {
      category: 'general',
      question: t('faq.general.q4.question'),
      answer: t('faq.general.q4.answer')
    },
    
    // Installation Questions
    {
      category: 'installation',
      question: t('faq.installation.q1.question'),
      answer: t('faq.installation.q1.answer')
    },
    {
      category: 'installation',
      question: t('faq.installation.q2.question'),
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
    
    // Maintenance Questions
    {
      category: 'maintenance',
      question: t('faq.maintenance.q1.question'),
      answer: t('faq.maintenance.q1.answer')
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
    
    // Pricing Questions
    {
      category: 'pricing',
      question: t('faq.pricing.q1.question'),
      answer: t('faq.pricing.q1.answer')
    },
    {
      category: 'pricing',
      question: t('faq.pricing.q2.question'),
      answer: t('faq.pricing.q2.answer')
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

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = searchTerm === '' || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchTerm, activeCategory]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Navigation */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-16 py-6">
          <Link to="/" className="flex items-center">
            <Logo size="default" showText={true} textColor="white" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-white/90">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <Link to="/about" className="hover:text-accent transition-colors">{t('nav.about')}</Link>
            <Link to="/services" className="hover:text-accent transition-colors">{t('nav.services')}</Link>
            <Link to="/projects" className="hover:text-accent transition-colors">{t('nav.projects')}</Link>
            <Link to="/blog" className="hover:text-accent transition-colors">{t('nav.blog')}</Link>
            <Link to="/case-studies" className="hover:text-accent transition-colors">{t('nav.caseStudies')}</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">{t('nav.contact')}</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <Link to="/contact" className="bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.getQuote')}</span>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-16 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
              <HelpCircle className="w-4 h-4 text-accent" />
              <span className="text-accent font-semibold text-sm">
                {t('faq.badge')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('faq.title')}
            </h1>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              {t('faq.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-5' : 'left-5'} w-5 h-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t('faq.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-4 bg-white rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-accent focus:outline-none shadow-lg`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 lg:px-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <CategoryTab
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenIndex(0);
                }}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                isRTL={isRTL}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('faq.noResults')}
              </h3>
              <p className="text-gray-500">
                {t('faq.tryAgain')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 px-6 lg:px-16 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <MessageSquare className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('faq.cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t('faq.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all"
              >
                {t('faq.cta.contact')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              <a
                href="tel:+201234567890"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                {t('faq.cta.call')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
