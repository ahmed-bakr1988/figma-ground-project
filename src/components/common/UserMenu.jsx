import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, LogIn, UserPlus, Settings, FileText } from 'lucide-react';
import { useAuth } from '../../services/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const UserMenu = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If user is logged in
  if (user) {
    return (
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold text-gray-900 hidden md:block">{user.name}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50`}
            >
              <div className="p-4 border-b border-gray-100">
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="py-2">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{isRTL ? 'إعدادات الحساب' : 'Settings'}</span>
                </Link>

                <Link
                  to="/my-quotes"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{isRTL ? 'طلباتي' : 'My Quotes'}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-red-600 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <LogOut className="w-5 h-5" />
                  <span>{isRTL ? 'تسجيل الخروج' : 'Logout'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // If user is not logged in
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-accent transition-colors font-semibold"
      >
        <LogIn className="w-5 h-5" />
        <span className="hidden md:block">{isRTL ? 'تسجيل الدخول' : 'Login'}</span>
      </Link>
      <Link
        to="/register"
        className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-primary rounded-lg transition-colors font-bold"
      >
        <UserPlus className="w-5 h-5" />
        <span className="hidden md:block">{isRTL ? 'تسجيل' : 'Register'}</span>
      </Link>
    </div>
  );
};

export default UserMenu;
