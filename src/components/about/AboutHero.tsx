import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAboutPage } from '@/lib/strapi';

export default function AboutHero() {
  const { aboutPage } = useAboutPage();
  const heroData = aboutPage.hero;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-50px" });

  // Mouse parallax handler for background lettermark
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = ((clientX / innerWidth) - 0.5) * 30;
      const y = ((clientY / innerHeight) - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToStory = () => {
    const nextElem = document.getElementById('story') || document.querySelector('.parallax-panel');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] lg:max-h-[calc(100vh-80px)] bg-[#F4F1EA] text-[#0B0D12] py-6 sm:py-8 lg:py-4 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-[#0B0D12]/10 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient Engineering Grid & Glow in Background */}
      <div className="absolute inset-0 pointer-events-none -z-0 opacity-40">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #0B0D12 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF4A1C]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center my-auto">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Headings, Value Proposition & Actions       */}
        {/* ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, x: -35 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-7 space-y-4 sm:space-y-5 lg:space-y-4.5 xl:space-y-5 text-left"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{heroData.badgeText || 'ABOUT APROGRA • HYDERABAD & GLOBAL'}</span>
          </div>

          {/* Main Headline (Single H1) */}
          <div className="space-y-1.5">
            <h1 className="text-h1 text-[#0B0D12] leading-[1.08]">
              {heroData.headline || 'Architecting the Future of High-Scale Software & Autonomous Intelligence'}
            </h1>
          </div>

          {/* Subheading / Description */}
          <p className="text-sm sm:text-base lg:text-[15px] xl:text-base text-[#5A5E6E] max-w-xl leading-relaxed">
            {heroData.subheadline || 'AProgra is a full-spectrum software engineering studio — founded in Hyderabad, trusted globally, obsessed with craft, architectural clarity, and long-term product resilience.'}
          </p>

          {/* Actions / CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={scrollToStory}
              className="h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-[#FF4A1C] hover:bg-[#E03A0F] text-white text-badge shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
            >
              <span>{heroData.secondaryCtaLabel || 'Explore Our Story'}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <Link
              to={heroData.primaryCtaUrl || '/contact'}
              className="h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-badge transition-all shadow-2xs hover:shadow-xs flex items-center gap-2"
            >
              <span>{heroData.primaryCtaLabel || 'Start Your Brief'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Micro Telemetry Ticker / Metrics */}
          <div className="pt-4 lg:pt-4.5 xl:pt-5 border-t border-[#0B0D12]/10 grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl">
            {heroData.kpiStats && heroData.kpiStats.length > 0 ? (
              heroData.kpiStats.map((kpi, idx) => (
                <div key={idx}>
                  <span className="block text-lg sm:text-xl lg:text-[1.35rem] xl:text-2xl font-bold font-display text-[#0B0D12]">
                    {kpi.value}
                  </span>
                  <span className="text-[10px] sm:text-caption font-mono text-[#5A5E6E] uppercase tracking-wider">
                    {kpi.label}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div>
                  <span className="block text-lg sm:text-xl lg:text-[1.35rem] xl:text-2xl font-bold font-display text-[#0B0D12]">100%</span>
                  <span className="text-[10px] sm:text-caption font-mono text-[#5A5E6E] uppercase tracking-wider">In-House</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-xl lg:text-[1.35rem] xl:text-2xl font-bold font-display text-[#FF4A1C]">4.9★</span>
                  <span className="text-[10px] sm:text-caption font-mono text-[#5A5E6E] uppercase tracking-wider">Rating</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-xl lg:text-[1.35rem] xl:text-2xl font-bold font-display text-[#0B0D12]">&lt;100ms</span>
                  <span className="text-[10px] sm:text-caption font-mono text-[#5A5E6E] uppercase tracking-wider">Latency</span>
                </div>
              </>
            )}
          </div>



        </motion.div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Studio Architecture & Team Image            */}
        {/* ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, x: 35 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#0B0D12]/15 bg-[#FAF8F5] shadow-lg group">
            <img 
              src={heroData.heroImageUrl || "https://picsum.photos/seed/1135490967/1200/800"} 
              alt="AProgra Global Engineering Studio"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-[#0B0D12]/80 backdrop-blur-xs border border-white/10">Studio HQ • Hyderabad</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Global Delivery
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

