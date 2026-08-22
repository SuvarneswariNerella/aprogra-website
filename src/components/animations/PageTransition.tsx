import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useGlobalScrollReveal } from '../../hooks/useScrollReveal';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // 1. Scroll to top when the new page mounts
  useEffect(() => {
    if ((window as any).lenis && typeof (window as any).lenis.scrollTo === 'function') {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // 2. Initialize scroll reveals after the new page is fully mounted
  useGlobalScrollReveal([]);

  return (
    <div className="relative w-full overflow-x-clip">
      {/* Main page content clean crossfade transition */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
