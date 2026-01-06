import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building2,
  Headphones,
  Shield,
  Award,
  Users,
  Zap
} from 'lucide-react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import Logo from '../components/common/Logo';

// Contact Info Card Component
const ContactInfoCard = ({ info, index, isRTL }) => {
  const Icon = info.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-14 h-14 ${info.bgColor} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 ${info.iconColor}`} />
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h4>
      {info.details.map((detail, i) => (
        <p key={i} className="text-gray-600 text-sm leading-relaxed">{detail}</p>
      ))}
      {info.action && (
        <a 
          href={info.actionLink} 
          className="inline-flex items-center gap-2 mt-4 text-accent font-semibold text-sm hover:gap-3 transition-all"
        >
          {info.action}
          <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </a>
      )}
    </motion.div>
  );
};

// FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
    >
      <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
      <div className="text-white/60 text-sm">{stat.label}</div>
    </motion.div>
  );
};

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openFAQ, setOpenFAQ] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: t('contactPage.info.phone.title'),
      details: [
        t('contactPage.info.phone.primary'),
        t('contactPage.info.phone.secondary')
      ],
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      action: t('contactPage.info.phone.action'),
      actionLink: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: t('contactPage.info.email.title'),
      details: [
        t('contactPage.info.email.primary'),
        t('contactPage.info.email.secondary')
      ],
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      action: t('contactPage.info.email.action'),
      actionLink: 'mailto:info@groundtech.com'
    },
    {
      icon: MapPin,
      title: t('contactPage.info.address.title'),
      details: [
        t('contactPage.info.address.line1'),
        t('contactPage.info.address.line2')
      ],
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      action: t('contactPage.info.address.action'),
      actionLink: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: t('contactPage.info.hours.title'),
      details: [
        t('contactPage.info.hours.weekdays'),
        t('contactPage.info.hours.emergency')
      ],
      bgColor: 'bg-accent/20',
      iconColor: 'text-accent'
    }
  ];

  const faqs = [
    {
      question: t('contactPage.faq.items.response.question'),
      answer: t('contactPage.faq.items.response.answer')
    },
    {
      question: t('contactPage.faq.items.quote.question'),
      answer: t('contactPage.faq.items.quote.answer')
    },
    {
      question: t('contactPage.faq.items.emergency.question'),
      answer: t('contactPage.faq.items.emergency.answer')
    },
    {
      question: t('contactPage.faq.items.areas.question'),
      answer: t('contactPage.faq.items.areas.answer')
    },
    {
      question: t('contactPage.faq.items.warranty.question'),
      answer: t('contactPage.faq.items.warranty.answer')
    }
  ];

  const stats = [
    { icon: Users, value: '2,500+', label: t('contactPage.stats.clients') },
    { icon: Award, value: '15+', label: t('contactPage.stats.experience') },
    { icon: Shield, value: '99%', label: t('contactPage.stats.satisfaction') },
    { icon: Headphones, value: '24/7', label: t('contactPage.stats.support') }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <>
      {/* Hero Section with Navigation */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>

        {/* Navigation - Matching Homepage Style */}
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
            <Link to="/contact" className="text-accent transition-colors">{t('nav.contact')}</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <a href="tel:+15551234567" className="bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.getQuote')}</span>
            </a>
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center px-6 lg:px-16 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent font-semibold text-sm">
                {t('contactPage.hero.badge')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('contactPage.hero.title')}
              <br />
              <span className="text-accent">{t('contactPage.hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              {t('contactPage.hero.description')}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('contactPage.info.badge')}
              </span>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('contactPage.info.title')} <span className="text-accent">{t('contactPage.info.titleHighlight')}</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('contactPage.info.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <ContactInfoCard
                key={index}
                info={info}
                index={index}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{t('contactPage.form.title')}</h3>
                    <p className="text-gray-500 text-sm">{t('contactPage.form.subtitle')}</p>
                  </div>
                </div>
                
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-medium">{t('contactPage.form.success')}</p>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input 
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t('contactPage.form.firstName')}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                    <input 
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t('contactPage.form.lastName')}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contactPage.form.email')}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  />
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('contactPage.form.phone')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  />
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-gray-500"
                  >
                    <option value="">{t('contactPage.form.service')}</option>
                    <option value="lightning">{t('contactPage.form.services.lightning')}</option>
                    <option value="grounding">{t('contactPage.form.services.grounding')}</option>
                    <option value="surge">{t('contactPage.form.services.surge')}</option>
                    <option value="maintenance">{t('contactPage.form.services.maintenance')}</option>
                    <option value="consultation">{t('contactPage.form.services.consultation')}</option>
                  </select>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder={t('contactPage.form.message')}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-dark text-primary py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        {t('contactPage.form.sending')}
                      </>
                    ) : (
                      <>
                        {t('contactPage.form.submit')}
                        <Send className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {/* Map Container */}
              <div className="bg-slate-200 rounded-2xl h-80 lg:h-96 overflow-hidden relative shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.8!2d31.4833!3d30.2333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE0JzAwLjAiTiAzMcKwMjknMDAuMCJF!5e0!3m2!1sen!2seg!4v1704000000000!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contactPage.map.title')}
                  className="absolute inset-0"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-semibold text-sm">{t('contactPage.map.label')}</p>
                      <p className="text-white/80 text-xs">{t('contactPage.info.address.line2')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-primary rounded-xl p-6 text-white">
                  <Building2 className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-bold mb-2">{t('contactPage.quickContact.office.title')}</h4>
                  <p className="text-white/80 text-sm">{t('contactPage.quickContact.office.description')}</p>
                </div>
                <div className="bg-accent rounded-xl p-6 text-primary">
                  <Headphones className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-bold mb-2">{t('contactPage.quickContact.support.title')}</h4>
                  <p className="text-primary/80 text-sm">{t('contactPage.quickContact.support.description')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('contactPage.faq.badge')}
              </span>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('contactPage.faq.title')} <span className="text-accent">{t('contactPage.faq.titleHighlight')}</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('contactPage.faq.description')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Zap className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('contactPage.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('contactPage.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                <Phone className="w-5 h-5" />
                {t('contactPage.cta.call')}
              </a>
              <a
                href="mailto:info@groundtech.com"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                <Mail className="w-5 h-5" />
                {t('contactPage.cta.email')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
