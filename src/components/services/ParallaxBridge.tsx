import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function ParallaxBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted && containerRef.current ? containerRef : undefined,
    offset: ["start end", "end start"]
  });

  // Background moves slower, foreground moves slightly faster for rich parallax depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-[#0D0F1C] text-white flex items-center justify-center border-y border-purple-900/40"
    >
      {/* Background Parallax Graphic Layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none select-none overflow-hidden"
      >
        {/* Abstract Tech Mesh & Glowing Gradient Orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/50 via-[#0D0F1C] to-[#0D0F1C]" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[300px] bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-500/30 rounded-full blur-[100px]" />
        
        {/* Subtle Decorative Geometric Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Abstract Cards / Planes */}
        <div className="absolute top-10 left-[12%] w-24 h-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm rotate-12" />
        <div className="absolute bottom-10 right-[14%] w-32 h-32 rounded-3xl border border-purple-500/20 bg-purple-500/10 backdrop-blur-sm -rotate-6" />
      </motion.div>

      {/* Foreground Content Layer */}
      <motion.div
        style={{ y: fgY, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold uppercase tracking-widest text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Proof, Not Promises</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-space tracking-tight text-white leading-tight">
          Selected Work &{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 text-transparent bg-clip-text">
            Engineered Outcomes
          </span>
        </h2>

        <p className="text-xs sm:text-base text-slate-300 max-w-lg mx-auto font-normal leading-relaxed">
          Explore a showcase of high-performance web platforms, mobile apps, and autonomous AI agents.
        </p>

        <div className="pt-2 flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
          >
            <ArrowDown className="w-4 h-4 text-purple-300" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
