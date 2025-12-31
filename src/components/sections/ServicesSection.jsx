import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Building2, Factory, Wrench, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, index, isRTL, learnMore }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
      
      <a href="#" className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
        {learnMore}
        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
      </a>
    </motion.div>
  );
};

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const services = [
    {
      id: 1,
      icon: Zap,
      title: t('services.items.lightningRod.title'),
      description: t('services.items.lightningRod.description'),
      color: 'from-primary to-primary-light'
    },
    {
      id: 2,
      icon: Building2,
      title: t('services.items.commercial.title'),
      description: t('services.items.commercial.description'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      icon: Factory,
      title: t('services.items.industrial.title'),
      description: t('services.items.industrial.description'),
      color: 'from-slate-600 to-slate-700'
    },
    {
      id: 4,
      icon: Wrench,
      title: t('services.items.maintenance.title'),
      description: t('services.items.maintenance.description'),
      color: 'from-green-500 to-green-600'
    },
    {
      id: 5,
      icon: ShieldCheck,
      title: t('services.items.surge.title'),
      description: t('services.items.surge.description'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 6,
      icon: FileCheck,
      title: t('services.items.risk.title'),
      description: t('services.items.risk.description'),
      color: 'from-red-500 to-red-600'
    }
  ];
  return (
    <section id="services" className="py-24 px-6 lg:px-16 bg-gray-50">
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
              {t('services.badge')}
            </span>
            <div className="w-12 h-[2px] bg-accent"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('services.title')} <span className="text-accent">{t('services.titleHighlight')}</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              isRTL={isRTL}
              learnMore={t('services.learnMore')}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2">
            {t('services.viewAll')}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
