import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Logo({ size = 'default', showText = false, textColor = 'dark' }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // أحجام أكبر للـ Logo
  const sizes = {
    small: 'h-10 w-10',
    default: 'h-14 w-14',
    large: 'h-16 w-16',
    xl: 'h-20 w-20',
    '2xl': 'h-24 w-24'
  };

  const textSizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl',
    xl: 'text-3xl'
  };

  const textColors = {
    white: 'text-white',
    dark: 'text-gray-900',
    primary: 'text-primary'
  };

  const altText = isRTL 
    ? 'جراوند تك - شركة متخصصة في الحماية من الصواعق في مصر' 
    : 'Ground Tech - Lightning Protection Services in Egypt';

  return (
    <div className="flex items-center gap-3">
      <img 
        src="/assets/logo/logo.png" 
        alt={altText}
        loading="eager"
        className={`${sizes[size]} object-contain`}
      />
      {showText && (
        <span className={`${textSizes[size]} font-bold ${textColors[textColor]}`}>
          Ground Tech
        </span>
      )}
    </div>
  );
}
