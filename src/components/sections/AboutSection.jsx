import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Clock, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();

  const features = [
    t('about.features.certified'),
    t('about.features.premium'),
    t('about.features.support'),
    t('about.features.warranty'),
    t('about.features.pricing'),
    t('about.features.fast')
  ];

  const stats = [
    { icon: Award, value: '10+', label: t('about.stats.excellence') },
    { icon: Users, value: '2,500+', label: t('about.stats.clients') },
    { icon: Clock, value: '24/7', label: t('about.stats.available') }
  ];

  return (
    <section id="about" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="\assets\images\aboutUs\Image-1.png"
                alt={t('about.imageAlt')}
                className="rounded-2xl shadow-2xl w-full"
              />

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className={`absolute -bottom-8 ${isRTL ? '-left-8' : '-right-8'} bg-accent text-primary p-6 rounded-2xl shadow-xl`}
              >
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm opacity-90">{t('hero.stats.experience')}</div>
              </motion.div>
            </div>

            {/* Secondary Image */}
            <div className={`absolute -top-8 ${isRTL ? '-right-8' : '-left-8'} w-48 h-48 hidden lg:block`}>
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300"
                alt={t('about.teamAlt')}
                className="rounded-2xl shadow-xl w-full h-full object-cover border-4 border-white"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('about.badge')}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')} <span className="text-accent">{t('about.titleHighlight')}</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              onClick={() => navigate('/about')}
            >
              {t('about.cta')}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
