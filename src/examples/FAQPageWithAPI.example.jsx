// مثال: صفحة FAQPage محدّثة لاستخدام Laravel API
// هذا مثال فقط - لم يتم تطبيقه بعد على الصفحة الأصلية

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, HelpCircle, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { useFaqs } from '../services/hooks';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import Logo from '../components/common/Logo';

const FAQItem = ({ faq, index, isOpen, onToggle, isRTL, lang }) => {
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
        <span className="font-semibold text-gray-900 pr-4 flex-1">
          {faq.question?.[lang] || faq.question}
        </span>
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
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
              {faq.answer?.[lang] || faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQPageWithAPI = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = i18n.language;

  // استخدام Custom Hook لجلب الأسئلة من الـ API
  const { data: faqs, loading, error } = useFaqs();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(null);

  // استخراج الفئات من البيانات
  const categories = useMemo(() => {
    if (!faqs) return [];
    const uniqueCategories = [...new Set(faqs.map(faq => faq.category?.[lang] || faq.category))];
    return ['all', ...uniqueCategories];
  }, [faqs, lang]);

  // تصفية الأسئلة
  const filteredFaqs = useMemo(() => {
    if (!faqs) return [];

    return faqs.filter(faq => {
      const matchesSearch = searchQuery === '' || 
        (faq.question?.[lang] || faq.question).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.answer?.[lang] || faq.answer).toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || 
        (faq.category?.[lang] || faq.category) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, selectedCategory, lang]);

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isRTL ? 'حدث خطأ' : 'Error'}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-lg transition-all"
          >
            {isRTL ? 'إعادة المحاولة' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <Logo />
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary-dark to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-xl text-gray-200">
              {isRTL 
                ? 'إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا' 
                : 'Answers to the most common questions about our services'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search */}
          <div className="relative mb-6">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? 'ابحث في الأسئلة...' : 'Search questions...'}
              className={`w-full ${isRTL ? 'pr-12' : 'pl-12'} py-4 rounded-xl border-2 border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all`}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-primary'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' 
                  ? (isRTL ? 'الكل' : 'All')
                  : category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {isRTL ? 'لم يتم العثور على نتائج' : 'No results found'}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                isOpen={openFaqId === faq.id}
                onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                isRTL={isRTL}
                lang={lang}
              />
            ))
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 bg-gradient-to-br from-accent to-yellow-400 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-primary mb-4">
            {isRTL ? 'لم تجد إجابة لسؤالك؟' : "Didn't find your answer?"}
          </h3>
          <p className="text-lg text-primary-dark mb-8">
            {isRTL 
              ? 'فريقنا جاهز لمساعدتك في أي استفسار' 
              : 'Our team is ready to help you with any question'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <a
              href="tel:+966920000000"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-primary font-bold rounded-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              {isRTL ? 'اتصل بنا' : 'Call Us'}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPageWithAPI;
