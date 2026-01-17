import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';

// روابط السوشيال ميديا - قم بتحديثها بالروابط الفعلية للشركة
const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/groundtecheg', label: 'Facebook', ariaLabel: 'تابعنا على فيسبوك' },
  { icon: Twitter, href: 'https://twitter.com/groundtecheg', label: 'Twitter', ariaLabel: 'تابعنا على تويتر' },
  { icon: Linkedin, href: 'https://linkedin.com/company/groundtecheg', label: 'LinkedIn', ariaLabel: 'تابعنا على لينكد إن' },
  { icon: Instagram, href: 'https://instagram.com/groundtecheg', label: 'Instagram', ariaLabel: 'تابعنا على انستجرام' }
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const footerLinks = {
    services: [
      t('footer.links.services.rod'),
      t('footer.links.services.commercial'),
      t('footer.links.services.industrial'),
      t('footer.links.services.surge'),
      t('footer.links.services.risk'),
      t('footer.links.services.maintenance')
    ],
    company: [
      t('footer.links.company.about'),
      t('footer.links.company.team'),
      t('footer.links.company.careers'),
      t('footer.links.company.blog'),
      t('footer.links.company.cases'),
      t('footer.links.company.contact')
    ],
    support: [
      t('footer.links.support.faq'),
      t('footer.links.support.docs'),
      t('footer.links.support.emergency'),
      t('footer.links.support.warranty'),
      t('footer.links.support.areas'),
      t('footer.links.support.quote')
    ]
  };
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {t('footer.cta.title')}
              </h3>
              <p className="text-white/70">
                {t('footer.cta.description')}
              </p>
            </div>
            <Link 
              to="/contact" 
              className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap"
              aria-label={t('footer.cta.button')}
            >
              {t('footer.cta.button')}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="large" showText={false} />
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent" />
                <span dir={isRTL ? 'rtl' : ''}>+2(010) 440-44855</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent" />
                <span>info@ground-eg.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent" />
                <span>123 Protection St, New York, NY</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.services.rod')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.services.commercial')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.services.industrial')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.services.surge')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.services.risk')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.services.maintenance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.company.about')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.company.team')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.company.careers')}
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.company.blog')}
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.company.cases')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.company.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.support')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.support.faq')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.support.docs')}
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.support.emergency')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.support.warranty')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.support.areas')}
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-accent transition-colors">
                  {t('footer.links.support.quote')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-start">
              {t('footer.copyright')} | 
              <a href="#" className={`hover:text-accent ${isRTL ? 'me-1' : 'ms-1'}`}>{t('footer.privacy')}</a> | 
              <a href="#" className={`hover:text-accent ${isRTL ? 'me-1' : 'ms-1'}`}>{t('footer.terms')}</a>
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel || social.label}
                    title={social.label}
                    className="w-10 h-10 bg-slate-800 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
