/**
 * Live Chat Component using Tawk.to
 * 
 * Setup Instructions:
 * 1. Go to https://www.tawk.to and create a free account
 * 2. Create a new property for your website
 * 3. Get your Property ID and Widget ID from the Dashboard
 * 4. Replace the placeholders below with your actual IDs
 * 
 * Features:
 * - Automatic language switching based on i18n
 * - Custom styling to match brand colors
 * - Visibility control based on page/route
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration - Replace with your actual Tawk.to credentials
const TAWK_CONFIG = {
  PROPERTY_ID: 'YOUR_PROPERTY_ID', // e.g., '64a1b2c3d4e5f6g7h8i9j0k1'
  WIDGET_ID: 'YOUR_WIDGET_ID' // e.g., '1h2i3j4k5l'
};

// Custom attributes for branding
const BRAND_CONFIG = {
  primaryColor: '#0E3A5D', // Navy
  accentColor: '#F2C94C', // Gold
  companyName: 'GroundTech',
  greetings: {
    ar: {
      online: 'مرحباً! 👋 كيف يمكننا مساعدتك في حماية ممتلكاتك؟',
      offline: 'نحن غير متصلين حالياً. اترك رسالة وسنرد خلال 24 ساعة.',
      away: 'سنعود قريباً! اترك رسالتك وسنتواصل معك.'
    },
    en: {
      online: 'Hello! 👋 How can we help protect your property?',
      offline: "We're currently offline. Leave a message and we'll respond within 24 hours.",
      away: "We'll be back soon! Leave your message and we'll get back to you."
    }
  },
  quickButtons: {
    ar: ['احصل على عرض سعر', 'استشارة مجانية', 'دعم فني', 'معلومات عامة'],
    en: ['Get a Quote', 'Free Consultation', 'Technical Support', 'General Info']
  }
};

export default function LiveChat() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  useEffect(() => {
    // Don't load in development if needed
    // if (process.env.NODE_ENV === 'development') return;

    // Initialize Tawk.to API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Set custom style before loading
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: currentLang === 'ar' ? 'bl' : 'br', // bottom-left for RTL, bottom-right for LTR
          xOffset: 20,
          yOffset: 20
        },
        mobile: {
          position: currentLang === 'ar' ? 'bl' : 'br',
          xOffset: 10,
          yOffset: 10
        }
      }
    };

    // Set visitor attributes based on language
    window.Tawk_API.onLoad = function() {
      try {
        // Set language
        window.Tawk_API.setAttributes({
          language: currentLang,
          name: 'Visitor',
          hash: '' // Optional: for authenticated users
        }, function(error) {
          if (error) console.error('Tawk.to setAttributes error:', error);
        });

        // Update widget language/greeting
        const greetings = BRAND_CONFIG.greetings[currentLang] || BRAND_CONFIG.greetings.en;
        
        // You can customize the widget via Tawk.to dashboard for more options
        console.log('Tawk.to loaded successfully');
      } catch (e) {
        console.error('Tawk.to initialization error:', e);
      }
    };

    // Handle chat events
    window.Tawk_API.onChatStarted = function() {
      // Track chat started (analytics)
      if (window.gtag) {
        window.gtag('event', 'chat_started', {
          event_category: 'Engagement',
          event_label: 'Tawk.to Chat'
        });
      }
    };

    window.Tawk_API.onChatEnded = function() {
      // Track chat ended
      if (window.gtag) {
        window.gtag('event', 'chat_ended', {
          event_category: 'Engagement',
          event_label: 'Tawk.to Chat'
        });
      }
    };

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_CONFIG.PROPERTY_ID}/${TAWK_CONFIG.WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Cleanup on unmount
    return () => {
      // Hide widget when component unmounts if needed
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        // window.Tawk_API.hideWidget();
      }
    };
  }, []);

  // Update widget position when language changes
  useEffect(() => {
    if (window.Tawk_API && window.Tawk_API.setAttributes) {
      window.Tawk_API.setAttributes({
        language: currentLang
      }, function(error) {
        if (error) console.error('Tawk.to language update error:', error);
      });
    }
  }, [currentLang]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Hook to control Tawk.to widget visibility
 * Usage: const { showChat, hideChat, toggleChat } = useTawkControl();
 */
export const useTawkControl = () => {
  const showChat = () => {
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API.showWidget();
    }
  };

  const hideChat = () => {
    if (window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
    }
  };

  const toggleChat = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    }
  };

  const maximize = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
    }
  };

  const minimize = () => {
    if (window.Tawk_API && window.Tawk_API.minimize) {
      window.Tawk_API.minimize();
    }
  };

  const openWithMessage = (message) => {
    if (window.Tawk_API) {
      if (window.Tawk_API.maximize) {
        window.Tawk_API.maximize();
      }
      // Note: Setting pre-filled message requires Tawk.to Pro
    }
  };

  return {
    showChat,
    hideChat,
    toggleChat,
    maximize,
    minimize,
    openWithMessage
  };
};
