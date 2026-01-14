import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import ProjectsSection from './components/sections/ProjectsSection'
import StatsSection from './components/sections/StatsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import LiveChat from './components/common/LiveChat'
import WhatsAppButton from './components/common/WhatsAppButton'
import AboutUsPage from './pages/AboutUsPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyDetailPage from './pages/CaseStudyDetailPage'
import ProductsPage from './pages/ProductsPage'
import ToolsPage from './pages/ToolsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function HomePage() {
  return (
    <>
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

function App() {
  const { i18n } = useTranslation()

  // Direction is controlled via <html dir> in i18n/index.js
  // Font family is controlled via CSS html[dir="rtl"] selector
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
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
        </Routes>
        
        <Footer />
        <ScrollToTop />
        <LiveChat />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App
