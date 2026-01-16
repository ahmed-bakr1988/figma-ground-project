import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import UserMenu from '../common/UserMenu';
import { Phone, Mail, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const handleDropdownEnter = (itemName) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setOpenDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 400);
    setDropdownTimeout(timeout);
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
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-4">
              <a href="tel:+201044044855" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+201044044855</span>
              </a>
              <a href="mailto:info@ground-eg.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">info@ground-eg.com</span>
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

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
                            className="block px-4 py-1 text-gray-700 hover:bg-accent/10 hover:text-accent transition-colors"
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

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
