import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Phone, 
  Download, 
  FileText,
  Zap,
  Shield,
  Cable,
  Wrench,
  ArrowDown
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import companyInfo from '../config/companyInfo';

// Product Card Component
const ProductCard = ({ product, index, isRTL }) => {
  const Icon = product.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute top-4 right-4">
          <div className="bg-accent rounded-lg px-3 py-1">
            <span className="text-primary font-bold text-sm">{product.category}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
      
      {/* Product Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm">{product.description}</p>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            {product.downloadText}
          </button>
          <Link 
            to="/contact" 
            className="flex-1 bg-accent hover:bg-accent-dark text-primary px-4 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm"
          >
            <FileText className="w-4 h-4" />
            {product.quoteText}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Product Categories
  const categories = [
    { id: 'all', name: t('productsPage.categories.all'), icon: Package },
    { id: 'accessories', name: t('productsPage.categories.accessories'), icon: Wrench },
    { id: 'arresters', name: t('productsPage.categories.arresters'), icon: Shield },
    { id: 'spd', name: t('productsPage.categories.spd'), icon: Zap },
    { id: 'rods', name: t('productsPage.categories.rods'), icon: ArrowDown },
    { id: 'cables', name: t('productsPage.categories.cables'), icon: Cable }
  ];

  // Products Data
  const products = [
    {
      id: 1,
      category: t('productsPage.categories.accessories'),
      categoryId: 'accessories',
      name: t('productsPage.products.clamps.name'),
      description: t('productsPage.products.clamps.description'),
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800',
      downloadText: t('productsPage.download'),
      quoteText: t('productsPage.quote')
    },
    {
      id: 2,
      category: t('productsPage.categories.arresters'),
      categoryId: 'arresters',
      name: t('productsPage.products.arresters.name'),
      description: t('productsPage.products.arresters.description'),
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800',
      downloadText: t('productsPage.download'),
      quoteText: t('productsPage.quote')
    },
    {
      id: 3,
      category: t('productsPage.categories.spd'),
      categoryId: 'spd',
      name: t('productsPage.products.spd.name'),
      description: t('productsPage.products.spd.description'),
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800',
      downloadText: t('productsPage.download'),
      quoteText: t('productsPage.quote')
    },
    {
      id: 4,
      category: t('productsPage.categories.rods'),
      categoryId: 'rods',
      name: t('productsPage.products.rods.name'),
      description: t('productsPage.products.rods.description'),
      icon: ArrowDown,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
      downloadText: t('productsPage.download'),
      quoteText: t('productsPage.quote')
    },
    {
      id: 5,
      category: t('productsPage.categories.cables'),
      categoryId: 'cables',
      name: t('productsPage.products.cables.name'),
      description: t('productsPage.products.cables.description'),
      icon: Cable,
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800',
      downloadText: t('productsPage.download'),
      quoteText: t('productsPage.quote')
    },
    {
      id: 6,
      category: t('productsPage.categories.accessories'),
      categoryId: 'accessories',
      name: t('productsPage.products.testPoints.name'),
      description: t('productsPage.products.testPoints.description'),
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
      downloadText: t('productsPage.download'),
      quoteText: t('productsPage.quote')
    }
  ];

  // Filter products
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === selectedCategory);

  // SEO Data
  const locale = isRTL ? 'ar' : 'en';
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website },
    { name: locale === 'ar' ? 'المنتجات' : 'Products', url: `${companyInfo.urls.website}/products` },
  ];

  return (
    <>
      {/* SEO Head */}
      <SEOHead
        title={locale === 'ar' 
          ? 'منتجات الحماية من الصواعق والتأريض | جراوند مصر' 
          : 'Lightning Protection & Grounding Products | Ground Egypt'}
        description={locale === 'ar'
          ? 'تسوق منتجات الحماية من الصواعق عالية الجودة: مانعات صواعق، أجهزة حماية التيار، قضبان تأريض، كابلات نحاسية، وملحقات التركيب. منتجات معتمدة دولياً.'
          : 'Shop high-quality lightning protection products: lightning arresters, surge protection devices, grounding rods, copper cables, and installation accessories. Internationally certified products.'}
        keywords={locale === 'ar'
          ? 'منتجات حماية صواعق, مانعة صواعق للبيع, قضبان تأريض, كابلات نحاس, أجهزة SPD'
          : 'lightning protection products, lightning arresters for sale, grounding rods, copper cables, SPD devices'}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
                           backgroundImage: `url("assets/images/backgroundImage/Image-17.png")`,
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
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="text-accent font-semibold uppercase tracking-wider text-sm">
                  {t('productsPage.hero.badge')}
                </span>
                <div className="w-12 h-[2px] bg-accent"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('productsPage.hero.title')} <span className="text-accent">{t('productsPage.hero.titleHighlight')}</span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                {t('productsPage.hero.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 lg:px-16 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-accent text-primary'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === 'all' 
                ? t('productsPage.section.allTitle')
                : t('productsPage.section.categoryTitle', { category: categories.find(c => c.id === selectedCategory)?.name })}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('productsPage.section.description')}
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-16 bg-gradient-to-r from-accent to-accent-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Package className="w-16 h-16 text-primary mx-auto mb-6" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('productsPage.cta.title')}
            </h2>
            
            <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
              {t('productsPage.cta.description')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {t('productsPage.cta.button')}
              </Link>
              <Link 
                to="/tools"
                className="bg-white/20 hover:bg-white/30 text-primary px-8 py-4 rounded-lg font-semibold transition-all"
              >
                {t('productsPage.cta.tools')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
