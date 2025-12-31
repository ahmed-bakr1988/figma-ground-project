import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle, Trophy } from 'lucide-react';

export default function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    { value: '10+', label: t('stats.experience'), icon: Trophy },
    { value: '2,500+', label: t('stats.projects'), icon: CheckCircle },
    { value: '99%', label: t('stats.satisfaction'), icon: Shield },
    { value: '50+', label: t('stats.awards'), icon: Award }
  ];

  const certifications = [
    { name: t('stats.certifications.ul'), logo: '🏆' },
    { name: t('stats.certifications.lpi'), logo: '⚡' },
    { name: t('stats.certifications.iso'), logo: '✓' },
    { name: t('stats.certifications.nfpa'), logo: '🛡️' }
  ];
  return (
    <section className="py-24 px-6 lg:px-16 bg-gradient-to-r from-primary to-primary-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-12"></div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">{t('stats.trusted')}</h3>
          
          <div className="flex flex-wrap justify-center gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl flex items-center gap-3 border border-white/20"
              >
                <span className="text-3xl">{cert.logo}</span>
                <span className="text-white font-semibold">{cert.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
