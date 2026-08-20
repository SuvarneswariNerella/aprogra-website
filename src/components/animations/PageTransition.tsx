import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

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
