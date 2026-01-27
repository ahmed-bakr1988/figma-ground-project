# ⚡ Performance Optimization Summary - Ground Tech

## Overview

This document summarizes the comprehensive performance optimizations implemented to improve Google PageSpeed Insights scores and Core Web Vitals, particularly **LCP (Largest Contentful Paint)**.

---

## 🎯 Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | AVIF images, preload, responsive srcset |
| **FCP** | < 2.0s | Inline critical CSS, defer non-critical |
| **CLS** | = 0 | Explicit dimensions, content-visibility |
| **TTI** | < 3.5s | Code splitting, lazy loading |

---

## 🖼️ 1. LCP Image Optimization

### Before
```jsx
// Single WebP image, no responsive variants
<img src="/assets/images/backgroundImage/hero-optimized.webp" />
```

### After
```jsx
// AVIF primary + WebP fallback + responsive srcset
<picture>
  <source
    type="image/avif"
    srcSet="/assets/images/backgroundImage/hero-optimized-mobile.avif 640w,
            /assets/images/backgroundImage/hero-optimized-tablet.avif 1024w,
            /assets/images/backgroundImage/hero-optimized.avif 1920w"
    sizes="100vw"
  />
  <source
    type="image/webp"
    srcSet="/assets/images/backgroundImage/hero-optimized-mobile.webp 640w,
            /assets/images/backgroundImage/hero-optimized-tablet.webp 1024w,
            /assets/images/backgroundImage/hero-optimized.webp 1920w"
    sizes="100vw"
  />
  <img
    src="/assets/images/backgroundImage/hero-optimized.webp"
    loading="eager"
    fetchpriority="high"
    decoding="sync"
    width="1920"
    height="1080"
  />
</picture>
```

### Image Generation (run after adding new images)
```bash
node scripts/optimize-images.mjs
```

This generates:
- **AVIF**: 30-50% smaller than WebP
- **Responsive variants**: mobile (640w), tablet (1024w), desktop (1920w)
- **Target sizes**: Mobile <15KB, Tablet <25KB, Desktop <35KB

---

## 📄 2. HTML Optimizations (index.html)

### Preload Strategy
```html
<!-- AVIF with responsive srcset preload -->
<link 
  rel="preload" 
  as="image" 
  type="image/avif" 
  href="/assets/images/backgroundImage/hero-optimized.avif"
  imagesrcset="/assets/images/backgroundImage/hero-optimized-mobile.avif 640w,
               /assets/images/backgroundImage/hero-optimized-tablet.avif 1024w,
               /assets/images/backgroundImage/hero-optimized.avif 1920w"
  imagesizes="100vw"
  fetchpriority="high"
/>
```

### Deferred Analytics
```html
<!-- Load Google Analytics after user interaction or 3s delay -->
<script>
  const loadAnalytics = () => { /* ... */ };
  ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
    document.addEventListener(event, loadAnalytics, { once: true, passive: true });
  });
  setTimeout(loadAnalytics, 3000);
</script>
```

### Critical CSS Inlined
- Font-display: optional (prevents FOIT)
- Hero section containment
- Below-fold content-visibility

---

## ⚛️ 3. React Optimizations

### Lazy Loading Below-Fold Sections
```jsx
// Before: All sections loaded synchronously
import AboutSection from './components/sections/AboutSection'

// After: Lazy loaded with content-visibility
const AboutSection = lazy(() => import('./components/sections/AboutSection'))

<div className="below-fold">
  <Suspense fallback={<LoadingSpinner />}>
    <AboutSection />
  </Suspense>
</div>
```

### Hero Image Carousel Delayed
```jsx
// Delay carousel start to not interfere with LCP
useEffect(() => {
  const startDelay = setTimeout(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, 2000); // Start 2s after mount
  return () => clearTimeout(startDelay);
}, []);
```

### Deferred Non-Critical UI
```jsx
<Suspense fallback={null}>
  <LiveChat />
  <WhatsAppButton />
</Suspense>
```

---

## 📦 4. Vite Build Optimizations

### Chunk Splitting Strategy
```javascript
manualChunks: (id) => {
  if (id.includes('react-dom')) return 'react-dom';
  if (id.includes('react')) return 'react';
  if (id.includes('react-router')) return 'router';
  if (id.includes('framer-motion')) return 'motion'; // Deferred
  if (id.includes('lucide-react')) return 'icons';
  // Granular vendor splitting
  if (id.includes('node_modules')) {
    const pkg = id.split('node_modules/')[1]?.split('/')[0];
    return pkg ? `vendor-${pkg}` : 'vendor';
  }
}
```

### Compression
- **Brotli**: Primary (20% smaller than gzip)
- **Gzip**: Fallback
- **Threshold**: 512 bytes

---

## 🗄️ 5. Caching Strategy (htaccess)

| Resource Type | Cache Duration | Strategy |
|---------------|----------------|----------|
| Images (avif, webp) | 1 year | immutable |
| Fonts | 1 year | immutable |
| JS/CSS (hashed) | 1 year | immutable |
| HTML | 5 minutes | must-revalidate |
| manifest.json, sw.js | No cache | always fresh |

---

## 🔧 6. Service Worker Strategies

| Resource | Strategy | Benefit |
|----------|----------|---------|
| Images | Cache-first | Instant LCP on repeat visits |
| Fonts | Cache-first | Prevent FOIT |
| JS/CSS | Cache-first | Fast hydration |
| HTML | Network-first | Fresh content |
| Other | Stale-while-revalidate | Balanced |

### LCP Image Precaching
```javascript
const LCP_IMAGES = [
  '/assets/images/backgroundImage/hero-optimized.avif',
  '/assets/images/backgroundImage/hero-optimized.webp',
  '/assets/images/backgroundImage/hero-optimized-mobile.avif',
  '/assets/images/backgroundImage/hero-optimized-mobile.webp',
];
```

---

## 🎨 7. CSS Optimizations

### Critical CSS (Inlined)
```css
.hero-section {
  contain: layout style paint; /* CSS containment */
}
.hero-bg-img {
  will-change: opacity; /* GPU acceleration hint */
}
.below-fold {
  content-visibility: auto; /* Skip rendering until visible */
  contain-intrinsic-size: 0 500px; /* Reserve space */
}
```

---

## 📊 Expected Improvements

| Metric | Before (est.) | After (target) |
|--------|---------------|----------------|
| LCP | 3.5-4.5s | < 2.5s |
| FCP | 2.5-3.0s | < 2.0s |
| CLS | 0.05-0.1 | 0 |
| Speed Index | 4.0s | < 3.0s |
| Total Blocking Time | 300ms+ | < 200ms |

---

## 🚀 Deployment Checklist

1. **Generate optimized images**:
   ```bash
   node scripts/optimize-images.mjs
   ```

2. **Build production bundle**:
   ```bash
   npm run build
   ```

3. **Deploy htaccess configuration**:
   Copy `cpanel/htaccess-performance.conf` to production `.htaccess`

4. **Verify Service Worker**:
   Check `sw.js` is served with `Cache-Control: no-cache`

5. **Test with PageSpeed Insights**:
   - Test both mobile and desktop
   - Verify LCP element is the hero image
   - Check "Opportunities" for any remaining issues

---

## 📁 Modified Files

- [index.html](index.html) - Critical CSS, preloads, deferred analytics
- [src/App.jsx](src/App.jsx) - Lazy loading, code splitting
- [src/components/sections/HeroSection.jsx](src/components/sections/HeroSection.jsx) - AVIF/responsive images
- [src/components/common/OptimizedImage.jsx](src/components/common/OptimizedImage.jsx) - AVIF/WebP/srcset support
- [src/index.css](src/index.css) - CSS containment, shimmer
- [vite.config.js](vite.config.js) - Optimized chunking, compression
- [public/sw.js](public/sw.js) - LCP image precaching
- [scripts/optimize-images.mjs](scripts/optimize-images.mjs) - AVIF generation
- [cpanel/htaccess-performance.conf](cpanel/htaccess-performance.conf) - Caching rules

---

## 🔍 Testing

### Local Testing
```bash
npm run build
npm run preview
```

### PageSpeed Testing
1. Deploy to staging
2. Run [PageSpeed Insights](https://pagespeed.web.dev/)
3. Check [Web Vitals Report](https://search.google.com/search-console/core-web-vitals)

### Manual LCP Check
Open DevTools → Performance → Record page load → Look for "LCP" marker
