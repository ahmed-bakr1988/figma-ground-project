import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Logo({ size = 'default', showText = false, textColor = 'dark' }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // أحجام أكبر للـ Logo
  const sizes = {
    small: { class: 'h-10 w-10', width: 40, height: 40 },
    default: { class: 'h-14 w-14', width: 56, height: 56 },
    large: { class: 'h-16 w-16', width: 64, height: 64 },
    xl: { class: 'h-20 w-20', width: 80, height: 80 },
    '2xl': { class: 'h-24 w-24', width: 96, height: 96 }
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

  const currentSize = sizes[size] || sizes.default;

  return (
    <div className="flex items-center gap-3">
      <img 
        src="/assets/logo/logo.avif" 
        alt={altText}
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width={currentSize.width}
        height={currentSize.height}
        className={`${currentSize.class} object-contain`}
      />
      {showText && (
        <span className={`${textSizes[size]} font-bold ${textColors[textColor]}`}>
          Ground Tech
        </span>
      )}
    </div>
  );
}
