import React, { createContext, useContext, useState, useCallback } from 'react';

const MobileMenuContext = createContext();

export function MobileMenuProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  return (
    <MobileMenuContext.Provider value={{ 
      isMobileMenuOpen, 
      openMenu, 
      closeMenu, 
      toggleMenu,
      setIsMobileMenuOpen 
    }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
}
