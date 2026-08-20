import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Infinity } from 'lucide-react';

function MagneticButton({ children, className, to }: { children: React.ReactNode, className?: string, to: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative inline-block", className)}
    >
      <Link to={to} className="relative z-10 px-10 py-5 bg-gradient-brand text-white rounded-full font-bold text-lg inline-flex items-center justify-center shadow-[0_0_40px_-10px_rgba(59,91,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(224,30,139,0.6)] transition-shadow duration-500 overflow-hidden group">
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </Link>
    </motion.div>
  );
}

export default function ServicesCta() {
  return (
    <section data-snap-section className="h-screen min-h-screen w-full bg-white text-navy relative flex items-center justify-center overflow-hidden border-t border-navy/5">
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none">
        <Infinity className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] text-electric animate-pulse blur-3xl" />
      </div>
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-7xl font-extrabold text-navy max-w-4xl mx-auto leading-tight tracking-tight">
            Whatever you're imagining — <br/>
            <span className="text-gradient">we can build it.</span>
          </h2>
          
          <MagneticButton to="/contact">
            Start a Project
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
