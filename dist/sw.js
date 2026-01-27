/**
 * Service Worker for Ground Tech Egypt
 * ================================
 * ⚡ Optimized for Core Web Vitals (LCP, FCP, CLS)
 * - Stale-while-revalidate for images
 * - Cache-first for static assets
 * - Network-first for HTML
 * 
 * @version 2.0.0
 * @author Ground Tech Egypt
 */

const CACHE_VERSION = 'ground-tech-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// ⚡ Critical assets for LCP - precache immediately
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/assets/logo/logo.png',
];

// ⚡ LCP images - high priority caching
const LCP_IMAGES = [
  '/assets/images/backgroundImage/hero-optimized.avif',
  '/assets/images/backgroundImage/hero-optimized.webp',
  '/assets/images/backgroundImage/hero-optimized-mobile.avif',
  '/assets/images/backgroundImage/hero-optimized-mobile.webp',
  '/assets/images/backgroundImage/hero-optimized-tablet.avif',
  '/assets/images/backgroundImage/hero-optimized-tablet.webp',
];

// API routes to never cache
const API_ROUTES = ['/api/', '/admin/'];

/**
 * Install Event: Precache critical assets
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache critical static assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      }),
      // Precache LCP images for instant hero load
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.addAll(LCP_IMAGES).catch(() => {
          // Silently fail if images don't exist yet
          console.log('[SW] Some LCP images not available for precaching');
        });
      }),
    ])
  );
  
  self.skipWaiting();
});

/**
 * Activate Event: Clean old caches
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !name.startsWith(CACHE_VERSION))
          .map((name) => caches.delete(name))
      );
    })
  );
  
  self.clients.claim();
});

/**
 * Fetch Event: Optimized caching strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip API calls and admin routes
  if (API_ROUTES.some(route => url.pathname.startsWith(route))) return;
  
  // Skip non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  // ⚡ Strategy 1: Cache-first for images (fast LCP)
  if (isImageRequest(url)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }
  
  // ⚡ Strategy 2: Cache-first for fonts (prevent FOIT)
  if (isFontRequest(url)) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }
  
  // ⚡ Strategy 3: Cache-first for JS/CSS (hashed, immutable)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // ⚡ Strategy 4: Network-first for HTML (fresh content)
  if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }
  
  // Default: Stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
});

/**
 * Cache-first strategy (best for static assets)
 */
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Network-first strategy (best for HTML)
 */
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    
    // Return offline page for navigation
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Stale-while-revalidate strategy
 */
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      caches.open(cacheName).then((cache) => {
        cache.put(request, response.clone());
      });
    }
    return response;
  }).catch(() => null);
  
  return cachedResponse || fetchPromise;
}

/**
 * Request type helpers
 */
function isImageRequest(url) {
  return /\.(avif|webp|png|jpg|jpeg|gif|svg|ico)$/i.test(url.pathname);
}

function isFontRequest(url) {
  return /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname) ||
         url.hostname === 'fonts.gstatic.com';
}

function isStaticAsset(url) {
  return /\.(js|css)$/i.test(url.pathname);
}

/**
 * Message Event: Handle cache updates
 */
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'clearCache') {
    Promise.all([
      caches.delete(STATIC_CACHE),
      caches.delete(IMAGE_CACHE),
      caches.delete(FONT_CACHE),
    ]);
  }
});
