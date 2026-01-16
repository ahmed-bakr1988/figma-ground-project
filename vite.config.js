import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    // Generate pre-compressed assets for cPanel/Apache
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 10240 }),
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          axios: ['axios'],
        }
      }
    },
    // Drop console/debugger to slim bundles
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
  }
})
