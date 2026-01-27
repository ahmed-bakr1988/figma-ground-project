import React, { useState, useRef, useEffect, memo } from 'react';

/**
 * ================================
 * ⚡ LCP-Optimized Image Component (2025 Best Practices)
 * ================================
 * Features:
 * - AVIF primary + WebP fallback (automatic)
 * - Responsive srcset with proper sizes
 * - fetchpriority="high" for LCP images
 * - Explicit dimensions (prevents CLS = 0)
 * - Intersection Observer for true lazy loading
 * - Error boundary with graceful fallback
 * - content-visibility for below-fold images
 */
const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  width,
  height,
  className = '', 
  loading = 'lazy',
  priority = false,
  placeholder = 'bg-gray-200',
  objectFit = 'cover',
  sizes = '100vw',
  // ⚡ New: Responsive image variants
  srcSet,
  avifSrcSet,
  webpSrcSet,
  onError,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // LCP images render immediately
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Determine loading strategy
  const loadingStrategy = priority ? 'eager' : loading;
  const fetchPriorityValue = priority ? 'high' : 'auto';

  // ⚡ Generate format variants automatically if not provided
  const generateSrcSet = (baseSrc, format) => {
    if (!baseSrc) return null;
    const ext = baseSrc.match(/\.(jpg|jpeg|png|webp|avif)$/i)?.[1] || 'jpg';
    const base = baseSrc.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
    
    // Check if it's a local image
    if (baseSrc.startsWith('http')) return null;
    
    return `${base}-mobile.${format} 640w, ${base}-tablet.${format} 1024w, ${base}.${format} 1920w`;
  };

  // Use provided srcSets or generate them
  const avifSources = avifSrcSet || (src && !src.startsWith('http') ? generateSrcSet(src, 'avif') : null);
  const webpSources = webpSrcSet || (src && !src.startsWith('http') ? generateSrcSet(src, 'webp') : null);

  // ⚡ Intersection Observer for true lazy loading (better than native lazy)
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Object fit classes
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };

  // Calculate aspect ratio for CLS prevention
  const aspectRatio = width && height ? width / height : null;

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspectRatio || undefined,
        // ⚡ content-visibility for below-fold images
        contentVisibility: priority ? 'visible' : 'auto',
        containIntrinsicSize: width && height ? `${width}px ${height}px` : undefined,
      }}
    >
      {/* Placeholder - shown until image loads */}
      {!isLoaded && !hasError && (
        <div 
          className={`absolute inset-0 ${placeholder}`} 
          aria-hidden="true"
          style={{ 
            // Subtle shimmer animation
            background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      
      {/* Render image only when in view (or priority) */}
      {(isInView || priority) && !hasError ? (
        <picture>
          {/* AVIF - Best compression, modern browsers */}
          {avifSources && (
            <source 
              srcSet={avifSources} 
              type="image/avif" 
              sizes={sizes}
            />
          )}
          
          {/* WebP - Good compression, wide support */}
          {webpSources && (
            <source 
              srcSet={webpSources} 
              type="image/webp" 
              sizes={sizes}
            />
          )}
          
          <img
            ref={imgRef}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={loadingStrategy}
            fetchpriority={fetchPriorityValue}
            decoding={priority ? 'sync' : 'async'}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full ${objectFitClasses[objectFit] || 'object-cover'} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...props}
          />
        </picture>
      ) : hasError ? (
        // Fallback for failed images
        <div className={`w-full h-full ${placeholder} flex items-center justify-center`}>
          <span className="text-gray-400 text-sm">فشل تحميل الصورة</span>
        </div>
      ) : null}
    </div>
  );
});

export default OptimizedImage;

/**
 * مكون صورة الخلفية المحسّنة
 */
export function BackgroundImage({ 
  src, 
  alt = '', 
  children, 
  className = '',
  overlay = true,
  overlayClass = 'bg-black/50',
  priority = false,
  ...props 
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="absolute inset-0"
        objectFit="cover"
        priority={priority}
        {...props}
      />
      {overlay && (
        <div className={`absolute inset-0 ${overlayClass}`} />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
