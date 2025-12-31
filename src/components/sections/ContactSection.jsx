import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Zap } from 'lucide-react';

export default function ContactSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: ['info@ground-eg.com', 'support@ground-eg.com'],
      color: 'bg-green-500'
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      details: ['123 Protection Street', 'New York, NY 10001', isRTL ? 'مدينة العبور /الحي الخامس /قطعة3 /بلوك 16079' : 'Obour City / Fifth District / Piece 3 / Block 16079'],
      color: 'bg-purple-500'
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', t('contact.info.emergency')],
      color: 'bg-accent'
    }
  ];
  return (
    <section id="contact" className="py-24 px-6 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="text-accent font-semibold uppercase tracking-wider text-sm">
              {t('contact.badge')}
            </span>
            <div className="w-12 h-[2px] bg-accent"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('contact.title')} <span className="text-accent">{t('contact.titleHighlight')}</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </motion.div>
                );
              })}
            </div>

            {/* Google Maps */}
            <div className="bg-slate-200 rounded-2xl h-72 overflow-hidden relative shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.8!2d31.4833!3d30.2333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE0JzAwLjAiTiAzMcKwMjknMDAuMCJF!5e0!3m2!1sen!2seg!4v1704000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={isRTL ? 'موقع مكتب الشركة' : 'Company Office Location'}
                className="absolute inset-0"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-sm">
                      {isRTL ? 'عنوان مكتب الشركة' : 'Company Office Address'}
                    </p>
                    <p className="text-white/80 text-xs">
                      {isRTL ? 'مدينة العبور / الحي الخامس / قطعة 3 / بلوك 16079' : 'Obour City / Fifth District / Piece 3 / Block 16079'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t('contact.form.title')}</h3>
                  <p className="text-gray-500 text-sm">{t('contact.form.subtitle')}</p>
                </div>
              </div>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input 
                    type="text" 
                    placeholder={t('contact.form.firstName')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder={t('contact.form.lastName')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  />
                </div>
                
                <input 
                  type="email" 
                  placeholder={t('contact.form.email')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                
                <input 
                  type="tel" 
                  placeholder={t('contact.form.phone')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
                
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-gray-500">
                  <option value="">{t('contact.form.service')}</option>
                  <option value="residential">{t('contact.form.services.residential')}</option>
                  <option value="commercial">{t('contact.form.services.commercial')}</option>
                  <option value="industrial">{t('contact.form.services.industrial')}</option>
                  <option value="maintenance">{t('contact.form.services.maintenance')}</option>
                  <option value="consultation">{t('contact.form.services.consultation')}</option>
                </select>
                
                <textarea 
                  rows="4" 
                  placeholder={t('contact.form.message')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                />
                
                <button 
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-primary py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {t('contact.form.submit')}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
