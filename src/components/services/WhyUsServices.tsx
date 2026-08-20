import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue, MotionValue } from 'motion/react';
import { Sparkles, Layers, Smartphone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ['#94A3B8', '#0D0F1C']);

  return (
    <span className="relative inline-block mr-[0.22em] my-[0.08em]">
      <motion.span style={{ opacity, color }}>
        {children}
      </motion.span>
    </span>
  );
}

const WORD_REVEAL_COPY = "We don't just build software — we engineer outcomes. Product-first thinking, agentic AI at the core, and full-stack delivery from web to mobile. Our own SaaS products prove what we ship for you: scalable, secure, and built to last.";

const PROOF_POINTS = [
  {
    icon: Layers,
    title: "Product-First Engineering",
    description: "Thinking like founders. We prioritize user UX psychology, business objectives, and zero friction.",
    badge: "Strategy & UX",
    gradient: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "Agentic AI Capability",
    description: "Autonomous agent workflows, custom LLM pipelines, and Gemini 1.5 integrations embedded natively.",
    badge: "AI Native",
    gradient: "from-purple-600 via-pink-600 to-rose-600"
  },
  {
    icon: Smartphone,
    title: "Full-Stack: Web, Mobile & Cloud",
    description: "End-to-end craftsmanship across React, Native, Node.js, and cloud platforms with zero handoff friction.",
    badge: "Cross-Platform",
    gradient: "from-pink-600 via-purple-600 to-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "Battle-Tested In-House Products",
    description: "Our own commercial SaaS platforms (SmartSchool, OmniChat) prove our engineering standards at scale.",
    badge: "Production Proven",
    gradient: "from-indigo-600 via-blue-600 to-pink-600"
  }
];

function ProofCard({ card }: { card: typeof PROOF_POINTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = -(e.clientY - rect.top - rect.height / 2) / 10;
    hoverX.set(x);
    hoverY.set(y);
  };

  const handleMouseLeave = () => {
    hoverX.set(0);
    hoverY.set(0);
  };

  const IconComp = card.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: hoverY,
        rotateY: hoverX,
      }}
      className="w-[300px] sm:w-[340px] shrink-0 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:border-purple-300 transition-all duration-300 relative group flex flex-col justify-between"
    >
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.gradient} rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity`} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} p-0.5 shadow-sm`}>
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-slate-800 group-hover:bg-transparent group-hover:text-white transition-colors duration-300">
              <IconComp className="w-5 h-5" />
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
            {card.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold font-space text-slate-900 group-hover:text-blue-600 transition-colors">
          {card.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {card.description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-purple-600">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        <span>Guaranteed standard</span>
      </div>
    </motion.div>
  );
}

export default function WhyUsServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);

  const desktopProgress = useMotionValue(0);
  const desktopWordProgress = useMotionValue(0);
  const mobileWordProgress = useMotionValue(0);

  const maxDesktopProgressRef = useRef(0);
  const maxMobileProgressRef = useRef(0);

  useEffect(() => {
    const updateCalculations = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile && trackRef.current && containerRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const distance = Math.max(0, trackWidth - containerWidth + 24);
        setScrollDistance(distance);
      }

      // Desktop Progress (0 to 1)
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const totalScroll = rect.height - window.innerHeight;
        if (totalScroll > 0) {
          // Progress starts when top of section reaches 60% of viewport height
          const startOffset = window.innerHeight * 0.6;
          const currentScroll = startOffset - rect.top;
          // Progress completes when section has scrolled 80% of its scroll distance
          const totalDistance = startOffset + (totalScroll * 0.80);
          const rawProgress = currentScroll / totalDistance;
          const currentVal = Math.max(0, Math.min(1, rawProgress));
          
          desktopProgress.set(currentVal);

          // One-way progressive reveal: store and apply max progress reached
          if (currentVal > maxDesktopProgressRef.current) {
            maxDesktopProgressRef.current = currentVal;
            desktopWordProgress.set(currentVal);
          }
        } else {
          desktopProgress.set(1);
          maxDesktopProgressRef.current = 1;
          desktopWordProgress.set(1);
        }
      }

      // Mobile Progress (0 to 1)
      if (mobileTextRef.current) {
        const rect = mobileTextRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        const startY = winH * 0.85;
        const endY = winH * 0.25;
        const rawProgress = (startY - rect.top) / (startY - endY);
        const currentVal = Math.max(0, Math.min(1, rawProgress));

        // One-way progressive reveal: store and apply max progress reached
        if (currentVal > maxMobileProgressRef.current) {
          maxMobileProgressRef.current = currentVal;
          mobileWordProgress.set(currentVal);
        }
      }
    };

    updateCalculations();

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCalculations);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateCalculations, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateCalculations();
      });
      if (trackRef.current) ro.observe(trackRef.current);
      if (containerRef.current) ro.observe(containerRef.current);
      if (sectionRef.current) ro.observe(sectionRef.current);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateCalculations);
      if (ro) ro.disconnect();
    };
  }, [desktopProgress, desktopWordProgress, mobileWordProgress]);

  // Exact pixel translation tied directly to scroll distance
  const rawX = useTransform(desktopProgress, [0, 1], ["0px", `-${scrollDistance}px`]);
  const smoothX = useSpring(rawX, { stiffness: 220, damping: 30 });

  const words = WORD_REVEAL_COPY.split(" ");

  return (
    <section 
      ref={sectionRef} 
      style={{ height: isMobile ? 'auto' : `calc(100vh + ${scrollDistance}px)` }}
      className="relative w-full bg-[#FAFAFD] text-[#0D0F1C] border-b border-slate-200/80"
    >
      {/* Background Soft Mesh Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ================= DESKTOP STICKY SPLIT LAYOUT ================= */}
      {!isMobile && (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="max-w-7xl mx-auto h-full px-8 lg:px-12 flex items-center justify-between gap-12">
            
            {/* LEFT COLUMN: Fixed Sticky Word Reveal */}
            <div className="w-5/12 shrink-0 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200/60 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
                  Why Choose Aprogra
                </span>
              </div>

              <div className="text-left">
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold font-space leading-[1.3] tracking-tight flex flex-wrap">
                  {words.map((word, i) => {
                    const start = i / words.length;
                    const end = Math.min(1, start + (1.5 / words.length));
                    return (
                      <Word key={i} progress={desktopWordProgress} range={[start, end]}>
                        {word}
                      </Word>
                    );
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 pt-2">
                <ArrowRight className="w-4 h-4 text-purple-600 animate-pulse" />
                <span>Scroll down to inspect our core proof points</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Horizontal Track Driven by Vertical Scroll */}
            <div ref={containerRef} className="w-7/12 overflow-hidden py-8">
              <motion.div ref={trackRef} style={{ x: smoothX }} className="flex gap-6 w-max">
                {PROOF_POINTS.map((card, index) => (
                  <ProofCard key={index} card={card} />
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      )}

      {/* ================= MOBILE / TABLET STACKED LAYOUT (NO STICKY POSITIONING) ================= */}
      {isMobile && (
        <div className="py-16 px-4 sm:px-6 space-y-10 relative z-10">
          
          {/* Section Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-200/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
                Why Choose Aprogra
              </span>
            </div>
          </div>

          {/* Word Reveal */}
          <div ref={mobileTextRef} className="max-w-xl mx-auto text-center">
            <p className="text-xl sm:text-2xl font-bold font-space leading-snug tracking-tight flex flex-wrap justify-center">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = Math.min(1, start + (1.5 / words.length));
                return (
                  <Word key={i} progress={mobileWordProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>

          {/* Standard Vertical / Touch Swipeable Cards */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest block text-center">
              Core Proof Points
            </span>

            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar px-2 snap-x">
              {PROOF_POINTS.map((card, index) => (
                <div key={index} className="snap-center">
                  <ProofCard card={card} />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
