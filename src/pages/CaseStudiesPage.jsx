import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  ChevronRight,
  Zap,
  Award,
  Users,
  Shield,
  Phone
} from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

// Stats data
const stats = {
  ar: [
    { icon: Building2, value: '500+', label: 'مشروع منجز' },
    { icon: Users, value: '200+', label: 'عميل راضٍ' },
    { icon: Shield, value: '15+', label: 'سنة خبرة' },
    { icon: Award, value: '100%', label: 'نسبة النجاح' }
  ],
  en: [
    { icon: Building2, value: '500+', label: 'Completed Projects' },
    { icon: Users, value: '200+', label: 'Satisfied Clients' },
    { icon: Shield, value: '15+', label: 'Years Experience' },
    { icon: Award, value: '100%', label: 'Success Rate' }
  ]
};

// Case Study Card Component
const CaseStudyCard = ({ study, index, isRTL, lang }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={study.image}
          alt={study.title[lang]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Featured Badge */}
        {study.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent text-primary rounded-full text-sm font-bold flex items-center gap-1">
              <Award className="w-4 h-4" />
              {lang === 'ar' ? 'مميز' : 'Featured'}
            </span>
          </div>
        )}
        
        {/* Project Type */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="px-3 py-1 bg-white/90 text-gray-800 rounded-full text-sm font-medium">
            {study.projectType[lang]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors line-clamp-2">
          {study.title[lang]}
        </h3>
        
        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Building2 className="w-4 h-4 text-accent" />
            <span>{study.client[lang]}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{study.location[lang]}</span>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-4 py-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{study.buildingSize}</div>
            <div className="text-xs text-gray-500">{lang === 'ar' ? 'المساحة' : 'Size'}</div>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{study.projectValue}</div>
            <div className="text-xs text-gray-500">{lang === 'ar' ? 'القيمة' : 'Value'}</div>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{study.duration[lang]}</div>
            <div className="text-xs text-gray-500">{lang === 'ar' ? 'المدة' : 'Duration'}</div>
          </div>
        </div>
        
        {/* CTA */}
        <Link 
          to={`/case-studies/${study.slug}`}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-semibold transition-all group"
        >
          {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
        </Link>
      </div>
    </motion.div>
  );
};

export default function CaseStudiesPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';

  const content = {
    ar: {
      title: 'دراسات الحالة',
      subtitle: 'نماذج من مشاريعنا الناجحة',
      heroTitle: 'مشاريع حقيقية.\nنتائج استثنائية.',
      heroDescription: 'استكشف مجموعة من أبرز مشاريعنا في الحماية من الصواعق والتأريض. كل مشروع يمثل قصة نجاح فريدة ونتائج ملموسة.',
      statsTitle: 'أرقامنا تتحدث',
      projectsTitle: 'مشاريعنا المميزة',
      projectsSubtitle: 'كل مشروع هو شهادة على التزامنا بالجودة والتميز',
      ctaTitle: 'هل لديك مشروع مماثل؟',
      ctaDescription: 'تواصل معنا للحصول على استشارة مجانية وتقييم شامل لاحتياجات مشروعك',
      ctaButton: 'احجز استشارة مجانية',
      callUs: 'أو اتصل مباشرة'
    },
    en: {
      title: 'Case Studies',
      subtitle: 'Examples of Our Successful Projects',
      heroTitle: 'Real Projects.\nExceptional Results.',
      heroDescription: 'Explore a collection of our top projects in lightning protection and grounding. Each project represents a unique success story with tangible results.',
      statsTitle: 'Our Numbers Speak',
      projectsTitle: 'Featured Projects',
      projectsSubtitle: 'Every project is a testament to our commitment to quality and excellence',
      ctaTitle: 'Have a Similar Project?',
      ctaDescription: 'Contact us for a free consultation and comprehensive assessment of your project needs',
      ctaButton: 'Book Free Consultation',
      callUs: 'Or call directly'
    }
  };

  const c = content[lang];
  const currentStats = stats[lang];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{c.title}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                  {c.subtitle}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 whitespace-pre-line">
                {c.heroTitle}
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-lg">
                {c.heroDescription}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  {c.ctaButton}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
                  alt="Case Studies"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{c.statsTitle}</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {currentStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {c.subtitle}
              </span>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{c.projectsTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{c.projectsSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard 
                key={study.id} 
                study={study} 
                index={index} 
                isRTL={isRTL} 
                lang={lang} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{c.ctaTitle}</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {c.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all"
              >
                {c.ctaButton}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              
              <div className="flex items-center gap-2 text-white/80">
                <span>{c.callUs}</span>
                <a href="tel:+966123456789" className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors font-bold">
                  <Phone className="w-5 h-5" />
                  +966 12 345 6789
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
