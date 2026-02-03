import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeCategory, setActiveCategory] = useState('All');

  const projects = [
    {
      id: 1,
      title: t('projects.items.factory.title'),
      category: 'Industrial',
      categoryLabel: t('projects.categories.industrial'),
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=600',
      description: t('projects.items.factory.description')
    },
    {
      id: 2,
      title: t('projects.items.office.title'),
      category: 'Commercial',
      categoryLabel: t('projects.categories.commercial'),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
      description: t('projects.items.office.description')
    },
    {
      id: 3,
      title: t('projects.items.residential.title'),
      category: 'Residential',
      categoryLabel: t('projects.categories.residential'),
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600',
      description: t('projects.items.residential.description')
    },
    {
      id: 4,
      title: t('projects.items.hospital.title'),
      category: 'Healthcare',
      categoryLabel: t('projects.categories.healthcare'),
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600',
      description: t('projects.items.hospital.description')
    },
    {
      id: 5,
      title: t('projects.items.mall.title'),
      category: 'Commercial',
      categoryLabel: t('projects.categories.commercial'),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
      description: t('projects.items.mall.description')
    },
    {
      id: 6,
      title: t('projects.items.dataCenter.title'),
      category: 'Technology',
      categoryLabel: t('projects.categories.technology'),
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600',
      description: t('projects.items.dataCenter.description')
    }
  ];

  const categories = [
    { key: 'All', label: t('projects.categories.all') },
    { key: 'Industrial', label: t('projects.categories.industrial') },
    { key: 'Commercial', label: t('projects.categories.commercial') },
    { key: 'Residential', label: t('projects.categories.residential') },
    { key: 'Healthcare', label: t('projects.categories.healthcare') },
    { key: 'Technology', label: t('projects.categories.technology') }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category.key
                  ? 'bg-accent text-primary'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-accent text-primary text-sm rounded-full mb-3">
                  {project.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.description}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {t('projects.viewProject')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2">
            {t('projects.viewProject')}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
