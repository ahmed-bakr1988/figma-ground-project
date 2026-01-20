import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useMobileMenu } from '../../context/MobileMenuContext';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import UserMenu from '../common/UserMenu';
import { Phone, Mail, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import companyInfo from '../../config/companyInfo';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();
  const [mobileDropdown, setMobileDropdown] = useState(null);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdown(null);
  }, [location.pathname]);

  // منع التمرير عند فتح القائمة
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleDropdownEnter = (itemName) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setOpenDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 400);
    setDropdownTimeout(timeout);
  };

  const toggleMobileDropdown = (itemName) => {
    setMobileDropdown(mobileDropdown === itemName ? null : itemName);
  };

  // القائمة الرئيسية مع dropdown للخدمات والمشاريع
  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { 
      name: t('nav.services'), 
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: t('nav.allServices', 'جميع الخدمات'), href: '/services' },
        { name: t('nav.products'), href: '/products' },
        { name: t('nav.tools'), href: '/tools' },
      ]
    },
    { 
      name: t('nav.projects'), 
      href: '/projects',
      hasDropdown: true,
      dropdownItems: [
        { name: t('nav.allProjects', 'جميع المشاريع'), href: '/projects' },
        { name: t('nav.caseStudies'), href: '/case-studies' },
      ]
    },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Bar - مخفي على الموبايل */}
      <div className="bg-primary text-white py-2 hidden sm:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-4">
              <a href={companyInfo.contact.phone.telHref} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span>{companyInfo.contact.phone.shortDisplay}</span>
              </a>
              <a href={companyInfo.contact.email.mailto} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span>{companyInfo.contact.email.primary}</span>
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - أكبر حجماً */}
          <Link to="/" className="flex items-center">
            <Logo size="default" showText={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                onMouseLeave={() => handleDropdownLeave()}
              >
                {item.hasDropdown ? (
                  <>
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-accent font-semibold transition-colors flex items-center gap-1"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </Link>
                    {/* Dropdown Menu */}
                    {openDropdown === item.name && (
                      <div 
                        className={`dropdown-menu absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50`}
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={() => handleDropdownLeave()}
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-accent/10 hover:text-accent transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-accent font-semibold transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop User Menu & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div 
        className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[110] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen 
            ? 'translate-x-0' 
            : isRTL ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Logo size="small" showText={false} />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)] pb-20">
          {/* Contact Info */}
          <div className="p-4 bg-primary/5 border-b border-gray-100">
            <a href={companyInfo.contact.phone.telHref} className="flex items-center gap-3 text-gray-700 py-2">
              <Phone className="w-5 h-5 text-accent" />
              <span className="font-medium">{companyInfo.contact.phone.shortDisplay}</span>
            </a>
            <a href={companyInfo.contact.email.mailto} className="flex items-center gap-3 text-gray-700 py-2">
              <Mail className="w-5 h-5 text-accent" />
              <span className="font-medium">{companyInfo.contact.email.primary}</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="p-4">
            {navigation.map((item) => (
              <div key={item.name} className="border-b border-gray-100 last:border-0">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between py-4 text-gray-700 font-semibold"
                    >
                      {item.name}
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          mobileDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {/* Mobile Dropdown */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileDropdown === item.name ? 'max-h-48 mb-2' : 'max-h-0'
                      }`}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          to={dropdownItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-2 py-3 ${isRTL ? 'pr-6' : 'pl-6'} text-gray-600 hover:text-accent transition-colors`}
                        >
                          <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-gray-700 font-semibold hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="p-4">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-accent hover:bg-accent-dark text-primary text-center py-4 rounded-lg font-semibold transition-colors"
            >
              {t('nav.getQuote', 'احصل على عرض سعر')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
