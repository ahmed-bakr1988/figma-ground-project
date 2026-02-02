import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Phone,
    Building2,
    Factory,
    Home,
    Stethoscope,
    Server,
    Award,
    Users,
    Shield,
    TrendingUp,
    CheckCircle2,
    MapPin,
    Calendar,
    Ruler,
    ExternalLink
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import companyInfo from '../config/companyInfo';

// Project Card Component
const ProjectCard = ({ project, index, isRTL, onViewDetails }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white"
            onClick={() => onViewDetails(project)}
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
                <span className="inline-block px-3 py-1 bg-accent text-primary text-sm font-medium rounded-full mb-3">
                    {project.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                </p>

                {/* Project Meta */}
                <div className="flex items-center gap-4 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3">
                    {project.location && (
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                        </span>
                    )}
                    {project.year && (
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {project.year}
                        </span>
                    )}
                </div>

                <button
                    className="inline-flex items-center gap-2 text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {project.viewDetails}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </motion.div>
    );
};

// Category Card Component
const CategoryCard = ({ category, index, isRTL, onClick, isActive }) => {
    const Icon = category.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={onClick}
            className={`cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 ${isActive
                ? 'bg-accent text-primary shadow-lg shadow-accent/30'
                : 'bg-white shadow-lg hover:shadow-xl text-gray-900'
                }`}
        >
            <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 ${isActive ? 'bg-primary/20' : 'bg-primary/10'
                }`}>
                <Icon className={`w-8 h-8 ${isActive ? 'text-primary' : 'text-accent'}`} />
            </div>
            <h4 className={`text-lg font-bold mb-2 ${isActive ? 'text-primary' : 'text-gray-900'}`}>
                {category.name}
            </h4>
            <p className={`text-sm ${isActive ? 'text-primary/70' : 'text-gray-600'}`}>
                {category.count}
            </p>
        </motion.div>
    );
};

// Featured Project Component
const FeaturedProject = ({ project, isRTL }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
            <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-80 lg:h-full overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary font-semibold rounded-full">
                            <Award className="w-4 h-4" />
                            {project.featured}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-accent text-sm font-medium rounded-full mb-4 w-fit">
                        {project.categoryLabel}
                    </span>

                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        {project.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.fullDescription}
                    </p>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {project.details.map((detail, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                        ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                        {project.location && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {project.location}
                            </span>
                        )}
                        {project.size && (
                            <span className="flex items-center gap-1">
                                <Ruler className="w-4 h-4" />
                                {project.size}
                            </span>
                        )}
                        {project.year && (
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {project.year}
                            </span>
                        )}
                    </div>

                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all w-fit"
                    >
                        {project.cta}
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

// Project Modal
const ProjectModal = ({ project, isOpen, onClose, isRTL }) => {
    if (!isOpen || !project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-64 md:h-80">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                        <span className="text-2xl leading-none">&times;</span>
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-4">
                        {project.categoryLabel}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {project.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.fullDescription || project.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                        {project.location && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {project.location}
                            </span>
                        )}
                        {project.year && (
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {project.year}
                            </span>
                        )}
                        {project.size && (
                            <span className="flex items-center gap-1">
                                <Ruler className="w-4 h-4" />
                                {project.size}
                            </span>
                        )}
                    </div>

                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-lg font-semibold transition-all"
                    >
                        {project.cta || 'Get Similar Solution'}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function ProjectsPage() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const categories = [
        {
            key: 'All',
            name: t('projectsPage.categories.all.name'),
            count: t('projectsPage.categories.all.count'),
            icon: Building2
        },
        {
            key: 'Industrial',
            name: t('projectsPage.categories.industrial.name'),
            count: t('projectsPage.categories.industrial.count'),
            icon: Factory
        },
        {
            key: 'Commercial',
            name: t('projectsPage.categories.commercial.name'),
            count: t('projectsPage.categories.commercial.count'),
            icon: Building2
        },
        {
            key: 'Residential',
            name: t('projectsPage.categories.residential.name'),
            count: t('projectsPage.categories.residential.count'),
            icon: Home
        },
        {
            key: 'Healthcare',
            name: t('projectsPage.categories.healthcare.name'),
            count: t('projectsPage.categories.healthcare.count'),
            icon: Stethoscope
        },
        {
            key: 'Technology',
            name: t('projectsPage.categories.technology.name'),
            count: t('projectsPage.categories.technology.count'),
            icon: Server
        }
    ];

    const projects = [
        {
            id: 1,
            title: t('projectsPage.projects.factory.title'),
            category: 'Industrial',
            categoryLabel: t('projectsPage.categories.industrial.name'),
            image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=800',
            description: t('projectsPage.projects.factory.description'),
            fullDescription: t('projectsPage.projects.factory.fullDescription'),
            location: t('projectsPage.projects.factory.location'),
            year: '2024',
            size: t('projectsPage.projects.factory.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.factory.details.0'),
                t('projectsPage.projects.factory.details.1'),
                t('projectsPage.projects.factory.details.2'),
                t('projectsPage.projects.factory.details.3')
            ]
        },
        {
            id: 2,
            title: t('projectsPage.projects.office.title'),
            category: 'Commercial',
            categoryLabel: t('projectsPage.categories.commercial.name'),
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
            description: t('projectsPage.projects.office.description'),
            fullDescription: t('projectsPage.projects.office.fullDescription'),
            location: t('projectsPage.projects.office.location'),
            year: '2023',
            size: t('projectsPage.projects.office.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.office.details.0'),
                t('projectsPage.projects.office.details.1'),
                t('projectsPage.projects.office.details.2'),
                t('projectsPage.projects.office.details.3')
            ]
        },
        {
            id: 3,
            title: t('projectsPage.projects.residential.title'),
            category: 'Residential',
            categoryLabel: t('projectsPage.categories.residential.name'),
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
            description: t('projectsPage.projects.residential.description'),
            fullDescription: t('projectsPage.projects.residential.fullDescription'),
            location: t('projectsPage.projects.residential.location'),
            year: '2024',
            size: t('projectsPage.projects.residential.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.residential.details.0'),
                t('projectsPage.projects.residential.details.1'),
                t('projectsPage.projects.residential.details.2'),
                t('projectsPage.projects.residential.details.3')
            ]
        },
        {
            id: 4,
            title: t('projectsPage.projects.hospital.title'),
            category: 'Healthcare',
            categoryLabel: t('projectsPage.categories.healthcare.name'),
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800',
            description: t('projectsPage.projects.hospital.description'),
            fullDescription: t('projectsPage.projects.hospital.fullDescription'),
            location: t('projectsPage.projects.hospital.location'),
            year: '2023',
            size: t('projectsPage.projects.hospital.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.hospital.details.0'),
                t('projectsPage.projects.hospital.details.1'),
                t('projectsPage.projects.hospital.details.2'),
                t('projectsPage.projects.hospital.details.3')
            ]
        },
        {
            id: 5,
            title: t('projectsPage.projects.mall.title'),
            category: 'Commercial',
            categoryLabel: t('projectsPage.categories.commercial.name'),
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
            description: t('projectsPage.projects.mall.description'),
            fullDescription: t('projectsPage.projects.mall.fullDescription'),
            location: t('projectsPage.projects.mall.location'),
            year: '2022',
            size: t('projectsPage.projects.mall.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.mall.details.0'),
                t('projectsPage.projects.mall.details.1'),
                t('projectsPage.projects.mall.details.2'),
                t('projectsPage.projects.mall.details.3')
            ]
        },
        {
            id: 6,
            title: t('projectsPage.projects.dataCenter.title'),
            category: 'Technology',
            categoryLabel: t('projectsPage.categories.technology.name'),
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800',
            description: t('projectsPage.projects.dataCenter.description'),
            fullDescription: t('projectsPage.projects.dataCenter.fullDescription'),
            location: t('projectsPage.projects.dataCenter.location'),
            year: '2024',
            size: t('projectsPage.projects.dataCenter.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.dataCenter.details.0'),
                t('projectsPage.projects.dataCenter.details.1'),
                t('projectsPage.projects.dataCenter.details.2'),
                t('projectsPage.projects.dataCenter.details.3')
            ]
        },
        {
            id: 7,
            title: t('projectsPage.projects.warehouse.title'),
            category: 'Industrial',
            categoryLabel: t('projectsPage.categories.industrial.name'),
            image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800',
            description: t('projectsPage.projects.warehouse.description'),
            fullDescription: t('projectsPage.projects.warehouse.fullDescription'),
            location: t('projectsPage.projects.warehouse.location'),
            year: '2023',
            size: t('projectsPage.projects.warehouse.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.warehouse.details.0'),
                t('projectsPage.projects.warehouse.details.1'),
                t('projectsPage.projects.warehouse.details.2'),
                t('projectsPage.projects.warehouse.details.3')
            ]
        },
        {
            id: 8,
            title: t('projectsPage.projects.hotel.title'),
            category: 'Commercial',
            categoryLabel: t('projectsPage.categories.commercial.name'),
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
            description: t('projectsPage.projects.hotel.description'),
            fullDescription: t('projectsPage.projects.hotel.fullDescription'),
            location: t('projectsPage.projects.hotel.location'),
            year: '2024',
            size: t('projectsPage.projects.hotel.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.hotel.details.0'),
                t('projectsPage.projects.hotel.details.1'),
                t('projectsPage.projects.hotel.details.2'),
                t('projectsPage.projects.hotel.details.3')
            ]
        },
        {
            id: 9,
            title: t('projectsPage.projects.villa.title'),
            category: 'Residential',
            categoryLabel: t('projectsPage.categories.residential.name'),
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
            description: t('projectsPage.projects.villa.description'),
            fullDescription: t('projectsPage.projects.villa.fullDescription'),
            location: t('projectsPage.projects.villa.location'),
            year: '2023',
            size: t('projectsPage.projects.villa.size'),
            viewDetails: t('projectsPage.viewDetails'),
            cta: t('projectsPage.getSimilar'),
            details: [
                t('projectsPage.projects.villa.details.0'),
                t('projectsPage.projects.villa.details.1'),
                t('projectsPage.projects.villa.details.2'),
                t('projectsPage.projects.villa.details.3')
            ]
        }
    ];

    // Featured Project
    const featuredProject = {
        ...projects[0],
        featured: t('projectsPage.featured')
    };

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const achievements = [
        { icon: Users, value: '2,500+', label: t('projectsPage.stats.clients') },
        { icon: Award, value: '50+', label: t('projectsPage.stats.awards') },
        { icon: Shield, value: '10+', label: t('projectsPage.stats.experience') },
        { icon: TrendingUp, value: '99%', label: t('projectsPage.stats.satisfaction') }
    ];

    // SEO Data
    const locale = isRTL ? 'ar' : 'en';
    const breadcrumbs = [
        { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
        { name: locale === 'ar' ? 'مشاريعنا' : 'Projects', url: `${companyInfo.urls.website}/projects` },
    ];

    return (
        <>
            {/* SEO Head */}
            <SEOHead
                title={locale === 'ar' 
                    ? 'مشاريعنا | أعمال الحماية من الصواعق والتأريض - جراوند' 
                    : 'Our Projects | Lightning Protection & Grounding Work - Ground'}
                description={locale === 'ar'
                    ? 'استعرض مشاريعنا المنجزة في مجال الحماية من الصواعق وأنظمة التأريض. مشاريع صناعية، تجارية، سكنية، ومستشفيات في جميع أنحاء مصر.'
                    : 'Browse our completed projects in lightning protection and grounding systems. Industrial, commercial, residential, and healthcare projects across Egypt.'}
                keywords={locale === 'ar'
                    ? 'مشاريع حماية صواعق, أعمال تأريض مصر, مشاريع كهربائية, حماية مصانع, حماية مباني تجارية'
                    : 'lightning protection projects, grounding work Egypt, electrical projects, factory protection, commercial building protection'}
                breadcrumbs={breadcrumbs}
            />

            {/* Hero Section with Navigation */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={
                            {
                                backgroundImage: `url("/assets/images/backgroundImage/backgroundImage6.png")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }
                        }>

                        </div>
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
                                {t('projectsPage.hero.badge')}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {t('projectsPage.hero.title')}
                            <br />
                            <span className="text-accent">{t('projectsPage.hero.titleHighlight')}</span>
                        </h1>

                        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
                            {t('projectsPage.hero.description')}
                        </p>
                    </motion.div>

                    {/* Stats */}
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

            {/* Categories Section */}
            <section className="py-20 px-6 lg:px-16 bg-gray-50">
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
                                {t('projectsPage.categoriesSection.badge')}
                            </span>
                            <div className="w-12 h-[2px] bg-accent"></div>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {t('projectsPage.categoriesSection.title')} <span className="text-accent">{t('projectsPage.categoriesSection.titleHighlight')}</span>
                        </h2>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t('projectsPage.categoriesSection.description')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <CategoryCard
                                key={category.key}
                                category={category}
                                index={index}
                                isRTL={isRTL}
                                isActive={activeCategory === category.key}
                                onClick={() => setActiveCategory(category.key)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Project Section */}
            <section className="py-20 px-6 lg:px-16 bg-white">
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
                                {t('projectsPage.featuredSection.badge')}
                            </span>
                            <div className="w-12 h-[2px] bg-accent"></div>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {t('projectsPage.featuredSection.title')} <span className="text-accent">{t('projectsPage.featuredSection.titleHighlight')}</span>
                        </h2>
                    </motion.div>

                    <FeaturedProject project={featuredProject} isRTL={isRTL} />
                </div>
            </section>

            {/* Projects Grid Section */}
            <section className="py-20 px-6 lg:px-16 bg-gray-50">
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
                                {t('projectsPage.gridSection.badge')}
                            </span>
                            <div className="w-12 h-[2px] bg-accent"></div>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {t('projectsPage.gridSection.title')} <span className="text-accent">{t('projectsPage.gridSection.titleHighlight')}</span>
                        </h2>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t('projectsPage.gridSection.description')}
                        </p>
                    </motion.div>

                    {/* Filter Buttons */}
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
                                className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === category.key
                                    ? 'bg-accent text-primary'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    isRTL={isRTL}
                                    onViewDetails={setSelectedProject}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
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
                            {t('projectsPage.cta.title')}
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            {t('projectsPage.cta.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                            >
                                {t('projectsPage.cta.button')}
                                <CheckCircle2 className="w-5 h-5" />
                            </Link>
                            <a
                                href="tel:+1234567890"
                                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                {t('projectsPage.cta.call')}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        isOpen={!!selectedProject}
                        onClose={() => setSelectedProject(null)}
                        isRTL={isRTL}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
