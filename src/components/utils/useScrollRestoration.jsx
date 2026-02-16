import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollRestoration(key) {
  const location = useLocation();
  const scrollKey = key || location.pathname;

  useEffect(() => {
    // Restore scroll position on mount
    const savedPosition = sessionStorage.getItem(`scroll_${scrollKey}`);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }

    // Save scroll position on scroll
    const handleScroll = () => {
      sessionStorage.setItem(`scroll_${scrollKey}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollKey]);

  // Clear scroll position when navigating away
  useEffect(() => {
    return () => {
      if (!location.pathname.includes(scrollKey)) {
        sessionStorage.removeItem(`scroll_${scrollKey}`);
      }
    };
  }, [location.pathname, scrollKey]);
}