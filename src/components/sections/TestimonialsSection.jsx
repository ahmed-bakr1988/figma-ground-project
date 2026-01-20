import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Shield, Award, Users, Briefcase, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom'; 

export default function TeamSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';

  // Team members data
  const teamMembers = [
    {
      nickname: t('aboutPage.team.member1.nickname'),
      name: t('aboutPage.team.member1.name'),
      role: t('aboutPage.team.member1.role'),
      image: '/assets/images/person/oaner-Image-1.jpeg',
      specialties: [isRTL ? 'حماية البنية التحتية' : 'Infrastructure Protection', isRTL ? 'أنظمة الطاقة الكهربائية' : 'Electrical Power Systems', isRTL ? 'إدارة المشاريع الكبرى' : 'Major Project Management'],
      experience: [ isRTL ? '15+ سنوات' : '15+ years']
    },
    {
      nickname: t('aboutPage.team.member2.nickname'),
      name: t('aboutPage.team.member2.name'),
      role: t('aboutPage.team.member2.role'),
      image: '/assets/images/person/oaner-Image-2.png',
      specialties: [isRTL ? 'تصميم أنظمة الحماية' : 'Protection Systems Design', isRTL ? 'التحليل الكهربائي' : 'Electrolytic Analysis', isRTL ? 'الاستشارات التقنية' : 'Technical Consulting'],
      experience: [ isRTL ? '12+ سنوات' : '12+ years']
    },
    {
      nickname: t('aboutPage.team.member3.nickname'),
      name: t('aboutPage.team.member3.name'),
      role: t('aboutPage.team.member3.role'),
      image: '/assets/images/person/oaner-Image-3.png',
      specialties: [isRTL ? 'التركيب والصيانة' : 'Installation and Maintenance', isRTL ? 'ضمان الجودة' : 'Quality Assurance', isRTL ? 'التدريب التقني' : 'Technical Training'],
      experience: [ isRTL ? '10+ سنوات' : '10+ years']
    },
    {
      nickname: t('aboutPage.team.member4.nickname'),
      name: t('aboutPage.team.member4.name'),
      role: t('aboutPage.team.member4.role'),
      image: '/assets/images/person/oaner-Image-4.jpeg',
      specialties: [isRTL ? 'إدارة العمليات' : 'Operations Management', isRTL ? 'خدمة العملاء' : 'Customer Service', isRTL ? 'تطوير الأعمال' : 'Business Development'],
      experience: [ isRTL ? '8+ سنوات' : '8+ years']
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="text-accent font-semibold uppercase tracking-wider text-sm">
              {lang === 'ar' ? 'فريق النخبة' : 'Elite Team'}
            </span>
            <div className="w-12 h-[2px] bg-accent"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {lang === 'ar' ? 'قادة التميز في' : 'Excellence Leaders in'}{' '}
            <span className="text-accent">
              {lang === 'ar' ? 'الحماية الكهربائية' : 'Electrical Protection'}
            </span>
          </h2>
          
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            {lang === 'ar' 
              ? 'فريق من الخبراء المتميزين يجمع بين سنوات الخبرة والشغف بالابتكار لتقديم أفضل حلول الحماية من الصواعق'
              : 'A team of distinguished experts combining years of experience with passion for innovation to deliver the best lightning protection solutions'
            }
          </p>
        </motion.div>


        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Member Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                {/* Profile Image with Modern Design */}
                <div className="relative mb-6">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    {/* Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Experience Badge */}
                  <div className="absolute -top-3 -right-3 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {member.experience}
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.nickname}
                  </h3>
                  <h4 className="text-lg text-white/80 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-accent font-semibold text-sm mb-4">
                    {member.role}
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-2 mb-6">
                  <h5 className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                    {lang === 'ar' ? 'التخصصات' : 'Specialties'}
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.slice(0, 2).map((specialty, i) => (
                      <span key={i} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating Action Buttons */}
                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-accent/20 hover:bg-accent text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 bg-primary/20 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Star Rating */}
              <div className="absolute top-4 left-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-12 border-t border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            {lang === 'ar' ? 'انضم إلى فريق النخبة' : 'Join Our Elite Team'}
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {lang === 'ar' 
              ? 'نبحث عن المواهب المتميزة للانضمام إلى رحلة التميز في مجال حماية الصواعق'
              : 'We are looking for exceptional talents to join our excellence journey in lightning protection'
            }
          </p>
          <Link to="/contact">
          <button className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
