import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle2 } from 'lucide-react';

export default function CertificationsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const certifications = [
    {
      id: 1,
      name: 'UL',
      fullName: t('certifications.ul.name'),
      description: t('certifications.ul.description'),
      icon: Shield
    },
    {
      id: 2,
      name: 'ISO 9001',
      fullName: t('certifications.iso.name'),
      description: t('certifications.iso.description'),
      icon: Award
    },
    {
      id: 3,
      name: 'LPI',
      fullName: t('certifications.lpi.name'),
      description: t('certifications.lpi.description'),
      icon: CheckCircle2
    },
    {
      id: 4,
      name: 'NFPA',
      fullName: t('certifications.nfpa.name'),
      description: t('certifications.nfpa.description'),
      icon: Shield
    },
    {
      id: 5,
      name: 'IEC',
      fullName: t('certifications.iec.name'),
      description: t('certifications.iec.description'),
      icon: Award
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-16 bg-white">
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
              {t('certifications.badge')}
            </span>
            <div className="w-12 h-[2px] bg-accent"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('certifications.title')} <span className="text-accent">{t('certifications.titleHighlight')}</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('certifications.description')}
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-10 h-10 text-primary" />
                </div>

                {/* Certification Badge */}
                <div className="bg-accent/10 rounded-lg px-3 py-1 inline-block mb-3">
                  <span className="text-accent font-bold text-lg">{cert.name}</span>
                </div>

                {/* Full Name */}
                <h3 className="font-bold text-gray-900 mb-2 text-sm">
                  {cert.fullName}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-center"
        >
          <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            {t('certifications.trustBadge.title')}
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            {t('certifications.trustBadge.description')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
