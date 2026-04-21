import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';
import companyInfo from '../../config/companyInfo';
import { servicePageSummaries } from '../../data/servicePages';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const locale = isRTL ? 'ar' : 'en';
  const socialLinks = [
    { icon: Facebook, href: companyInfo.social.facebook, label: 'Facebook' },
    { icon: Twitter, href: companyInfo.social.twitter, label: 'Twitter' },
    { icon: Linkedin, href: companyInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: companyInfo.social.instagram, label: 'Instagram' },
  ];

  const footerServiceLinks = servicePageSummaries;
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
            <Link to="/contact">
              <button className="bg-accent hover:bg-accent-dark text-primary px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap">
                {t('footer.cta.button')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
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
              <Logo size="default" showText={true} textColor="white" />
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent" />
                <span dir="ltr" style={{ unicodeBidi: 'isolate' }} className={isRTL ? 'text-right w-full' : ''}>{companyInfo.contact.phone.secondary}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent" />
                <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{companyInfo.contact.email.primary}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{companyInfo.contact.address.line1[locale]}, {companyInfo.contact.address.line2[locale]}</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {footerServiceLinks.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="text-white/70 hover:text-accent transition-colors">
                    {service.label[locale]}
                  </Link>
                </li>
              ))}
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
              <Link to="/privacy-policy" className={`hover:text-accent ${isRTL ? 'me-1' : 'ms-1'}`}>{t('footer.privacy')}</Link> |
              <Link to="/terms-of-service" className={`hover:text-accent ${isRTL ? 'me-1' : 'ms-1'}`}>{t('footer.terms')}</Link>
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
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
