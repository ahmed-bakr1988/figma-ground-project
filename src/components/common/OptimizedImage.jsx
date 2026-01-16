import React, { useState } from 'react';

/**
 * ================================
 * مكون صورة محسّن مع Lazy Loading
 * ================================
 * يدعم:
 * - Lazy Loading افتراضي
 * - Placeholder أثناء التحميل
 * - معالجة الأخطاء
 * - Accessibility (alt text)
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  placeholder = 'bg-gray-200',
  onError,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 ${placeholder} animate-pulse`} />
      )}
      
      {/* الصورة الفعلية */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      ) : (
        // Fallback في حالة فشل تحميل الصورة
        <div className={`w-full h-full ${placeholder} flex items-center justify-center`}>
          <span className="text-gray-400 text-sm">فشل تحميل الصورة</span>
        </div>
      )}
    </div>
  );
}
