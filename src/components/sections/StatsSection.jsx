import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle, Trophy, Building2 } from 'lucide-react';
// Trust Badges Component
const TrustBadges = ({ t, lang }) => {
  const badges = [
    {
      icon: Shield,
      title: lang === 'ar' ? 'معتمد من UL' : 'UL Certified',
      description: lang === 'ar' ? 'شهادة السلامة الدولية' : 'International Safety Certification'
    },
    {
      icon: Award,
      title: lang === 'ar' ? 'ISO 9001' : 'ISO 9001',
      description: lang === 'ar' ? 'معتمد لإدارة الجودة' : 'Quality Management Certified'
    },
    {
      icon: CheckCircle,
      title: lang === 'ar' ? '15+ سنة خبرة' : '15+ Years Experience',
      description: lang === 'ar' ? 'خبرة موثوقة في المجال' : 'Trusted Industry Expertise'
    },
    {
      icon: Building2,
      title: lang === 'ar' ? '500+ مشروع' : '500+ Projects',
      description: lang === 'ar' ? 'مشاريع ناجحة مكتملة' : 'Successfully Completed Projects'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:border-accent/50 transition-all"
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
            <badge.icon className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-white font-bold text-sm mb-1">{badge.title}</h4>
          <p className="text-white/70 text-xs">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
export default function StatsSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const stats = [
    { value: '10+', label: t('stats.experience'), icon: Trophy },
    { value: '1,500+', label: t('stats.projects'), icon: CheckCircle },
    { value: '99%', label: t('stats.satisfaction'), icon: Shield },
    { value: '10+', label: t('stats.awards'), icon: Award }
  ];

 
  //   { name: t('stats.certifications.ul'), logo: '🏆' },
  //   { name: t('stats.certifications.lpi'), logo: '⚡' },
  //   { name: t('stats.certifications.iso'), logo: '✓' },
  //   { name: t('stats.certifications.nfpa'), logo: '🛡️' }
  // ];
  return (
    {/* Stats Section */},
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

        {/* Trust Badges */}
        <TrustBadges t={t} lang={lang} />


      </div>
    </section>
  );
}
