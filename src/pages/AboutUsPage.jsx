import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Eye, 
  Award, 
  Users, 
  TrendingUp,
  CheckCircle2,
  Heart,
  Lightbulb,
  Phone
} from 'lucide-react';

export default function AboutUsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const values = [
    {
      icon: Shield,
      title: t('aboutPage.values.safety.title'),
      description: t('aboutPage.values.safety.description')
    },
    {
      icon: Award,
      title: t('aboutPage.values.excellence.title'),
      description: t('aboutPage.values.excellence.description')
    },
    {
      icon: Heart,
      title: t('aboutPage.values.integrity.title'),
      description: t('aboutPage.values.integrity.description')
    },
    {
      icon: Lightbulb,
      title: t('aboutPage.values.innovation.title'),
      description: t('aboutPage.values.innovation.description')
    }
  ];

  const milestones = [
    {
      year: '2016',
      title: t('aboutPage.timeline.founded.title'),
      description: t('aboutPage.timeline.founded.description')
    },
    {
      year: '2018',
      title: t('aboutPage.timeline.expansion.title'),
      description: t('aboutPage.timeline.expansion.description')
    },
    {
      year: '2020',
      title: t('aboutPage.timeline.certification.title'),
      description: t('aboutPage.timeline.certification.description')
    },
    {
      year: '2025',
      title: t('aboutPage.timeline.leader.title'),
      description: t('aboutPage.timeline.leader.description')
    }
  ];

  const teamMembers = [
    {
      nickname: t('aboutPage.team.member1.nickname'),
      name: t('aboutPage.team.member1.name'),
      role: t('aboutPage.team.member1.role'),
      image: '/assets/images/person/oaner-Image-1.jpeg'
    },
    {
      nickname: t('aboutPage.team.member2.nickname'),
      name: t('aboutPage.team.member2.name'),
      role: t('aboutPage.team.member2.role'),
      image: '/assets/images/person/oaner-Image-2.png'
    },
    {
      nickname: t('aboutPage.team.member3.nickname'),
      name: t('aboutPage.team.member3.name'),
      role: t('aboutPage.team.member3.role'),
      image: '/assets/images/person/oaner-Image-3.png'
    },
    {
      nickname: t('aboutPage.team.member4.nickname'),
      name: t('aboutPage.team.member4.name'),
      role: t('aboutPage.team.member4.role'),
      image: '/assets/images/person/oaner-Image-4.jpeg'
    }
  ];

  const achievements = [
    { icon: Users, value: '2,500+', label: t('aboutPage.achievements.clients') },
    { icon: Award, value: '50+', label: t('aboutPage.achievements.awards') },
    { icon: Shield, value: '10+', label: t('aboutPage.achievements.experience') },
    { icon: TrendingUp, value: '99%', label: t('aboutPage.achievements.satisfaction') }
  ];
 
  return (
    <>
      {/* Hero Section with Navigation */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("/assets/images/aboutUs/Image-4.png")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              transform: isRTL ? 'scaleX(-1)' : 'none'
            }}></div>
          </div>
        </div>

        
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
                {t('aboutPage.hero.badge')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('aboutPage.hero.title')}
              <br />
              <span className="text-accent">{t('aboutPage.hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              {t('aboutPage.hero.description')}
            </p>
          </motion.div>

          {/* Achievements */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{achievement.value}</div>
                  <div className="text-white/60 text-sm">{achievement.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                  {t('aboutPage.story.badge')}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('aboutPage.story.title')}
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('aboutPage.story.paragraph1')}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('aboutPage.story.paragraph2')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/assets/images/aboutUs/Image-2.png"
                alt={t('aboutPage.story.imageAlt')}
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-accent text-primary p-8 rounded-2xl shadow-xl">
                <div className="text-5xl font-bold mb-2">10+</div>
                <div className="text-white/90">{t('aboutPage.story.yearsExperience')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('aboutPage.mission.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutPage.mission.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('aboutPage.vision.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutPage.vision.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('aboutPage.values.badge')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('aboutPage.values.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('aboutPage.values.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('aboutPage.timeline.badge')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('aboutPage.timeline.title')}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute top-0 bottom-0 w-1 bg-primary/20 ${isRTL ? 'right-4 md:right-1/2' : 'left-4 md:left-1/2'}`}></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? (index % 2 === 0 ? -50 : 50) : (index % 2 === 0 ? 50 : -50) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 
                      ? isRTL ? 'md:flex-row' : 'md:flex-row-reverse' 
                      : isRTL ? 'md:flex-row-reverse' : 'md:flex-row'
                  } flex-col md:gap-8`}
                >
                  {/* Year Badge */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left mb-4 md:mb-0`}>
                    <div className={`inline-block bg-accent text-primary px-6 py-2 rounded-full font-bold text-lg ${
                      index % 2 === 0 ? isRTL ? '' : 'md:ml-auto' : isRTL ? 'md:mr-auto' : ''
                    }`}>
                      {milestone.year}
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-accent rounded-full border-4 border-slate-900"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-white/70">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                {t('aboutPage.team.badge')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('aboutPage.team.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('aboutPage.team.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5] bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.nickname} / {member.name}
                </h3>
                <p className="text-accent font-medium">
                  {member.role}
                </p>
              </motion.div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('aboutPage.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('aboutPage.cta.description')}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              {t('aboutPage.cta.button')}
              <CheckCircle2 className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
