import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Logo({ size = 'default', showText = true, textColor = 'white' }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const sizes = {
    small: 'h-8',
    default: 'h-10',
    large: 'h-14',
    xl: 'h-20'
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
    <div className="flex items-center gap-2">
      <img 
        src="/assets/logo/logo.png" 
        alt={altText}
        loading="eager"
        className={`${sizes[size]} w-auto object-contain`}
      />
      {showText && (
        <span className={`${textSizes[size]} font-bold ${textColors[textColor]}`}>
          Ground Tech
        </span>
      )}
    </div>
  );
}
