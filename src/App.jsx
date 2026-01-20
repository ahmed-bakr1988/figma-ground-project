import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MobileMenuProvider, useMobileMenu } from './context/MobileMenuContext'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import ProjectsSection from './components/sections/ProjectsSection'
import StatsSection from './components/tools/StatsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import LiveChat from './components/common/LiveChat'
import WhatsAppButton from './components/common/WhatsAppButton'
import ErrorBoundary from './components/common/ErrorBoundary'
import SEOHead from './components/common/SEOHead'
import companyInfo from './config/companyInfo'

// Loading Component محسّن
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-500 text-sm">جارٍ التحميل...</p>
    </div>
  </div>
);

// Lazy-loaded pages for better code splitting
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ToolsPage = lazy(() => import('./pages/ToolsPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function HomePage() {
  const { i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar' : 'en'

  return (
    <>
      <SEOHead
        title={companyInfo.seo.titles.home[locale]}
        description={companyInfo.description.long[locale]}
        url={companyInfo.urls.website}
        breadcrumbs={[
          { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: companyInfo.urls.website }
        ]}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}

// مكون داخلي للوصول إلى Context
function AppContent() {
  const { i18n } = useTranslation()
  const { isMobileMenuOpen } = useMobileMenu()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* 404 Page - يجب أن يكون آخر Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      
      <Footer />
      <ScrollToTop hidden={isMobileMenuOpen} />
      <LiveChat />
      <WhatsAppButton hidden={isMobileMenuOpen} />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <MobileMenuProvider>
          <AppContent />
        </MobileMenuProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
