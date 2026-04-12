import React, { Suspense, lazy, memo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MobileMenuProvider, useMobileMenu } from './context/MobileMenuContext'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import ErrorBoundary from './components/common/ErrorBoundary'
import SEOHead from './components/common/SEOHead'
import companyInfo from './config/companyInfo'

// ⚡ Lazy load non-critical homepage sections (improves FCP/LCP)
const AboutSection = lazy(() => import('./components/sections/AboutSection'))
const ServicesSection = lazy(() => import('./components/sections/ServicesSection'))
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'))
const StatsSection = lazy(() => import('./components/tools/StatsSection'))
const TestimonialsSection = lazy(() => import('./components/sections/TestimonialsSection'))
const ContactSection = lazy(() => import('./components/sections/ContactSection'))

// ⚡ Lazy load non-critical UI components (deferred)
const LiveChat = lazy(() => import('./components/common/LiveChat'))
const WhatsAppButton = lazy(() => import('./components/common/WhatsAppButton'))

// ⚡ Optimized Loading Spinner - minimal DOM, CSS-only animation
const LoadingSpinner = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

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
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Service Pages (Lazy Loaded)
const EarthingSystemsPage = lazy(() => import('./pages/services/EarthingSystemsPage'))

// Legal Pages (Lazy Loaded)
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))

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
      {/* ⚡ LCP-critical: HeroSection loads synchronously */}
      <HeroSection />
      {/* ⚡ Below-fold content: lazy loaded with content-visibility */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="below-fold">
          <AboutSection />
        </div>
        <div className="below-fold">
          <ServicesSection />
        </div>
        <div className="below-fold">
          <StatsSection />
        </div>
        <div className="below-fold">
          <ProjectsSection />
        </div>
        <div className="below-fold">
          <TestimonialsSection />
        </div>
        <div className="below-fold">
          <ContactSection />
        </div>
      </Suspense>
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
          <Route path="/services/earthing-systems" element={<EarthingSystemsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          {/* 404 Page - يجب أن يكون آخر Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      
      <Footer />
      <ScrollToTop hidden={isMobileMenuOpen} />
      {/* ⚡ Defer non-critical UI components */}
      <Suspense fallback={null}>
        <LiveChat />
        <WhatsAppButton hidden={isMobileMenuOpen} />
      </Suspense>
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
