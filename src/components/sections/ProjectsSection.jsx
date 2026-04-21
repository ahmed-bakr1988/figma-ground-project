import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, MapPin } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';

export default function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const lang = isRTL ? 'ar' : 'en';

  const featuredCaseStudies = caseStudies.filter((study) => study.featured).slice(0, 3);
  const proofItems = [
    {
      value: t('projects.proof.projectsValue'),
      label: t('projects.proof.projectsLabel'),
    },
    {
      value: t('projects.proof.sectorsValue'),
      label: t('projects.proof.sectorsLabel'),
    },
    {
      value: t('projects.proof.resultsValue'),
      label: t('projects.proof.resultsLabel'),
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 lg:px-16 bg-white">
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
              {t('projects.badge')}
            </span>
            <div className="w-12 h-[2px] bg-accent"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('projects.title')} <span className="text-accent">{t('projects.titleHighlight')}</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid gap-4 md:grid-cols-3 mb-12"
        >
          {proofItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5 text-center shadow-sm"
            >
              <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCaseStudies.map((study, index) => {
            const primaryResults = (study.results?.[lang] || []).slice(0, 2);

            return (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                      {study.projectType[lang]}
                    </span>
                    {study.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                        <Award className="w-3.5 h-3.5" />
                        {t('projects.featuredLabel')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {study.title[lang]}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-5">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{study.client[lang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{study.location[lang]}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {primaryResults.map((result) => (
                      <div key={`${study.id}-${result.metric}`} className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                        <div className="text-lg font-bold text-primary">{result.value}</div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">{result.metric}</div>
                        <div className="text-xs leading-relaxed text-gray-500">{result.description}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                  >
                    {t('projects.viewProject')}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link
            to="/case-studies"
            className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
          >
            {t('projects.browseAll')}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
          <Link
            to="/contact"
            className="border border-primary/15 hover:border-primary/30 text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
          >
            {t('projects.discussProject')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}