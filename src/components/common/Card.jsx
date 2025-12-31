import React from 'react';

export default function Card({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) {
  const baseStyles = 'bg-white rounded-xl shadow-lg border border-gray-100';
  const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300' : '';
  
  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
