import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Shield, 
  Building2, 
  Factory, 
  Wrench, 
  FileCheck, 
  Home,
  Server,
  Radio,
  Droplet,
  Sun,
  Activity,
  CheckCircle2,
  ArrowRight,
  Phone,
  Award,
  Users,
  Clock,
  ShieldCheck,
  Cpu,
  Link2,
  Settings
} from 'lucide-react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import Logo from '../components/common/Logo';
import SEOHead from '../components/common/SEOHead';
import companyInfo from '../config/companyInfo';
import { getAllServicesSchema } from '../config/seoSchema';
import { servicePageSummaries } from '../data/servicePages';

// Service Card Component
const ServiceCard = ({ service, index, isRTL }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Service Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-3`}>
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl  font-bold text-white">{service.title}</h3>
        </div>
      </div>
      
      {/* Service Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
        
        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          to={service.link || "/contact"} 
          className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
        >
          {service.cta}
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </motion.div>
  );
};

// Sector Card Component
const SectorCard = ({ sector, index, isRTL }) => {
  const Icon = sector.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-accent" />
      </div>
      <h4 className="text-lg font-semibold text-white">{sector.name}</h4>
    </motion.div>
  );
};

// Standard Badge Component
const StandardBadge = ({ standard }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
      <Award className="w-8 h-8 text-primary" />
    </div>
    <h4 className="font-bold text-gray-900 mb-1">{standard.name}</h4>
    <p className="text-sm text-gray-600">{standard.description}</p>
  </motion.div>
);

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const locale = isRTL ? 'ar' : 'en';
  const serviceLinks = servicePageSummaries.reduce((accumulator, item) => {
    accumulator[item.slug] = `/services/${item.slug}`;
    return accumulator;
  }, {});

  // SEO Breadcrumbs
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', url: `${companyInfo.urls.website}/services` },
  ];

  // Main Services
  const services = [
    {
      id: 1,
      icon: Zap,
      title: t('servicesPage.services.lightning.title'),
      description: t('servicesPage.services.lightning.description'),
      features: [
        t('servicesPage.services.lightning.features.0'),
        t('servicesPage.services.lightning.features.1'),
        t('servicesPage.services.lightning.features.2'),
        t('servicesPage.services.lightning.features.3')
      ],
      cta: t('servicesPage.requestQuote'),
      link: serviceLinks['lightning-protection-systems'],
      image: '/assets/images/services/Lightning Protection Systems.png'
    },
    {
      id: 2,
      icon: Link2,
      title: t('servicesPage.services.grounding.title'),
      description: t('servicesPage.services.grounding.description'),
      features: [
        t('servicesPage.services.grounding.features.0'),
        t('servicesPage.services.grounding.features.1'),
        t('servicesPage.services.grounding.features.2'),
        t('servicesPage.services.grounding.features.3')
      ],
      cta: t('servicesPage.learnMore', 'اعرف المزيد'),
      link: serviceLinks['earthing-systems'],
      image: '/assets/images/services/Grounding &Earthing-Systems.png'
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: t('servicesPage.services.surge.title'),
      description: t('servicesPage.services.surge.description'),
      features: [
        t('servicesPage.services.surge.features.0'),
        t('servicesPage.services.surge.features.1'),
        t('servicesPage.services.surge.features.2'),
        t('servicesPage.services.surge.features.3')
      ],
      cta: t('servicesPage.learnMore', 'اعرف المزيد'),
      link: serviceLinks['surge-protection'],
      image: '/assets/images/services/Surge-Protection-Devices-(SPD).jpg'
    },
    {
      id: 4,
      icon: FileCheck,
      title: t('servicesPage.services.risk.title'),
      description: t('servicesPage.services.risk.description'),
      features: [
        t('servicesPage.services.risk.features.0'),
        t('servicesPage.services.risk.features.1'),
        t('servicesPage.services.risk.features.2'),
        t('servicesPage.services.risk.features.3')
      ],
      cta: t('servicesPage.learnMore', 'اعرف المزيد'),
      link: serviceLinks['lightning-risk-assessment'],
      image: '/assets/images/services/lightning-Risk-Assessment.webp'
    },
    {
      id: 5,
      icon: Wrench,
      title: t('servicesPage.services.maintenance.title'),
      description: t('servicesPage.services.maintenance.description'),
      features: [
        t('servicesPage.services.maintenance.features.0'),
        t('servicesPage.services.maintenance.features.1'),
        t('servicesPage.services.maintenance.features.2'),
        t('servicesPage.services.maintenance.features.3')
      ],
      cta: t('servicesPage.learnMore', 'اعرف المزيد'),
      link: serviceLinks['maintenance-inspection'],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800'
    },
    {
      id: 6,
      icon: Settings,
      title: t('servicesPage.services.consultation.title'),
      description: t('servicesPage.services.consultation.description'),
      features: [
        t('servicesPage.services.consultation.features.0'),
        t('servicesPage.services.consultation.features.1'),
        t('servicesPage.services.consultation.features.2'),
        t('servicesPage.services.consultation.features.3')
      ],
      cta: t('servicesPage.requestQuote'),
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800'
    }
  ];

  // Industry Sectors
  const sectors = [
    { icon: Factory, name: t('servicesPage.sectors.industrial') },
    { icon: Building2, name: t('servicesPage.sectors.commercial') },
    { icon: Home, name: t('servicesPage.sectors.residential') },
    { icon: Server, name: t('servicesPage.sectors.datacenters') },
    { icon: Activity, name: t('servicesPage.sectors.healthcare') },
    { icon: Droplet, name: t('servicesPage.sectors.oilgas') },
    { icon: Radio, name: t('servicesPage.sectors.telecom') },
    { icon: Sun, name: t('servicesPage.sectors.renewable') }
  ];

  // Standards & Certifications
  const standards = [
    { name: 'IEC 62305', description: t('servicesPage.standards.iec') },
    { name: 'NFPA 780', description: t('servicesPage.standards.nfpa') },
    { name: 'BS EN 62305', description: t('servicesPage.standards.bsen') },
    { name: 'IEEE 80', description: t('servicesPage.standards.ieee') }
  ];

  // Benefits
  const benefits = [
    { icon: Shield, title: t('servicesPage.benefits.protection.title'), description: t('servicesPage.benefits.protection.description') },
    { icon: Award, title: t('servicesPage.benefits.certified.title'), description: t('servicesPage.benefits.certified.description') },
    { icon: Users, title: t('servicesPage.benefits.experts.title'), description: t('servicesPage.benefits.experts.description') },
    { icon: Clock, title: t('servicesPage.benefits.support.title'), description: t('servicesPage.benefits.support.description') }
  ];

  const portfolioPoints = [
    t('servicesPage.portfolioProof.pointOne'),
    t('servicesPage.portfolioProof.pointTwo'),
    t('servicesPage.portfolioProof.pointThree')
  ];

  return (
    <>
      {/* SEO Head */}
      <SEOHead
        title={companyInfo.seo.titles.services[locale]}
        description={t('servicesPage.servicesSection.description')}
        url={`${companyInfo.urls.website}/services`}
        breadcrumbs={breadcrumbs}
        schema={getAllServicesSchema(locale)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
                           backgroundImage: `url("assets/images/backgroundImage/Image-17.webp")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(5px)'
            }} />
          </div>
          {/* Lightning Effect */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
        </div>
  

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                  {t('servicesPage.hero.badge')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-snug">{t('servicesPage.hero.title')}
                <span className="text-accent">{t('servicesPage.hero.titleHighlight')}</span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
                {t('servicesPage.hero.description')}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {servicePageSummaries.slice(0, 6).map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/85 text-sm hover:bg-white/15 transition-colors"
                  >
                    {service.label[locale]}
                  </Link>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#services" 
                  className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
                >
                  {t('servicesPage.hero.cta')}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
                <Link 
                  to="/contact" 
                  className="border-2 border-white/30 hover:border-accent text-white hover:text-accent px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {t('servicesPage.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img 
                  src="assets/images/services/LightningProtection6-scaled.webp"
                  alt="Lightning Protection"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">10+</p>
                      <p className="text-sm text-gray-600">{t('servicesPage.hero.yearsExp')}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-accent rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-bold text-primary">2,500+</p>
                      <p className="text-sm text-primary/80">{t('servicesPage.hero.projects')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
                {t('servicesPage.servicesSection.badge')}
              </span>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('servicesPage.servicesSection.title')} <span className="text-accent">{t('servicesPage.servicesSection.titleHighlight')}</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('servicesPage.servicesSection.description')}
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
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary px-8 py-10 lg:px-12 lg:py-12 shadow-2xl"
          >
            <div className="absolute top-0 right-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-[2px] bg-accent"></div>
                  <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                    {t('servicesPage.portfolioProof.badge')}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  {t('servicesPage.portfolioProof.title')} <span className="text-accent">{t('servicesPage.portfolioProof.titleHighlight')}</span>
                </h2>

                <p className="text-lg leading-relaxed text-white/80 mb-8 max-w-2xl">
                  {t('servicesPage.portfolioProof.description')}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/case-studies"
                    className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
                  >
                    {t('servicesPage.portfolioProof.button')}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                  <Link
                    to="/contact"
                    className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
                  >
                    {t('servicesPage.portfolioProof.contactButton')}
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {portfolioPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-white/85 leading-relaxed">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Sectors Section */}
      <section className="py-24 px-6 lg:px-16 bg-gradient-to-br from-primary via-primary to-primary-dark relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto">
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
                {t('servicesPage.sectorsSection.badge')}
              </span>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('servicesPage.sectorsSection.title')} <span className="text-accent">{t('servicesPage.sectorsSection.titleHighlight')}</span>
            </h2>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {t('servicesPage.sectorsSection.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <SectorCard key={index} sector={sector} index={index} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Certifications */}
      <section className="py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
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
                {t('servicesPage.standardsSection.badge')}
              </span>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('servicesPage.standardsSection.title')} <span className="text-accent">{t('servicesPage.standardsSection.titleHighlight')}</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('servicesPage.standardsSection.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {standards.map((standard, index) => (
              <StandardBadge key={index} standard={standard} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-16 bg-gray-50">
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
                  {t('servicesPage.whyUs.badge')}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('servicesPage.whyUs.title')} <span className="text-accent">{t('servicesPage.whyUs.titleHighlight')}</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                {t('servicesPage.whyUs.description')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-5 shadow-md"
                    >
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/assets/images/services/lightning.webp"
                alt="Professional Team"
                className="rounded-2xl shadow-2xl w-full"
                  style={{filter: 'blur(1.1px)'}}
                
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6 lg:px-16 bg-gradient-to-r from-accent to-accent-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Zap className="w-16 h-16 text-primary mx-auto mb-6" />
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              {t('servicesPage.cta.title')}
            </h2>
            
            <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
              {t('servicesPage.cta.description')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/#contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                {t('servicesPage.cta.button')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              <a 
                href="tel:+201234567890"
                className="bg-white/20 hover:bg-white/30 text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">{t('servicesPage.cta.call')}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
