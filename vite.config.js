import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      // ⚡ Optimize React refresh for faster HMR
      fastRefresh: true,
    }),
    splitVendorChunkPlugin(),
    // ⚡ Generate pre-compressed Brotli assets (best compression)
    viteCompression({ 
      algorithm: 'brotliCompress', 
      ext: '.br', 
      threshold: 512, // Compress files > 512 bytes
      deleteOriginFile: false,
    }),
    // ⚡ Generate gzip as fallback for older servers
    viteCompression({ 
      algorithm: 'gzip', 
      ext: '.gz', 
      threshold: 512,
      deleteOriginFile: false,
    }),
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // ⚡ Target modern browsers for smaller bundles (ES2020+)
    target: 'es2020',
    
    chunkSizeWarningLimit: 350, // Stricter warning threshold
    cssCodeSplit: true,
    
    // ⚡ Use esbuild for faster builds, terser for smaller output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 3, // More passes = better compression
        unsafe_math: true,
        unsafe_methods: true,
      },
      mangle: {
        safari10: true,
        properties: false, // Don't mangle property names
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    
    rollupOptions: {
      output: {
        // ⚡ Optimized chunking strategy for better caching & LCP
        manualChunks: (id) => {
          // Core React - critical path, rarely changes
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('react') && !id.includes('react-router') && !id.includes('react-i18next')) {
            return 'react';
          }
          // Router - needed for initial navigation
          if (id.includes('react-router')) {
            return 'router';
          }
          // i18n - changes with translations, needed for initial render
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          // Animation - defer loading, not critical for LCP
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          // Icons - tree-shake and defer
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // HTTP client - only needed for API calls
          if (id.includes('axios')) {
            return 'http';
          }
          // Helmet/SEO - defer
          if (id.includes('helmet') || id.includes('react-helmet')) {
            return 'seo';
          }
          // All other vendor chunks - aggressively split by package
          if (id.includes('node_modules')) {
            // Extract package name for granular caching
            const packageName = id.split('node_modules/')[1]?.split('/')[0];
            if (packageName) {
              return `vendor-${packageName}`;
            }
            return 'vendor';
          }
        },
        // ⚡ Asset file naming with content hash for long-term caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (ext === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // ⚡ Report compressed size
    reportCompressedSize: true,
    
    // ⚡ Source maps for production debugging (disable for smallest output)
    sourcemap: false,
    
    // ⚡ CSS optimization
    cssMinify: true,
  },
  
  // ⚡ Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude heavy deps from pre-bundling for faster dev start
    exclude: ['framer-motion'],
  },
  
  // ⚡ Enable CSS modules
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    devSourcemap: true,
  },
})
