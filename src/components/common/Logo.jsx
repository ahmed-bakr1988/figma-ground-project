import React from 'react';

export default function Logo({ size = 'default', showText = true, textColor = 'white' }) {
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

  return (
    <div className="flex items-center gap-2">
      <img 
        src="/assets/logo/logo.png" 
        alt="GroundTech Logo" 
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
