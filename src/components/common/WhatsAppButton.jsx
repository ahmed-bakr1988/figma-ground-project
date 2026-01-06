import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Replace with actual company WhatsApp number
  const whatsappNumber = '201234567890'; // Example: Egypt number format
  const message = encodeURIComponent(t('whatsapp.defaultMessage'));

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all flex items-center justify-center group`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 1, 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <span className={`absolute ${isRTL ? 'right-full mr-3' : 'left-full ml-3'} bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
        {t('whatsapp.tooltip')}
      </span>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
    </motion.a>
  );
}
