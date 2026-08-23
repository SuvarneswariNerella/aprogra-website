import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowDown, 
  ShieldCheck, 
  Globe2, 
  Layers, 
  Cpu, 
  Code, 
  Server, 
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  Box
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAboutPage, PillarItem } from '@/lib/strapi';

function getPillarIcon(iconName: string) {
  switch ((iconName || '').toLowerCase()) {
    case 'server':
      return Server;
    case 'cpu':
      return Cpu;
    case 'globe2':
    case 'globe':
      return Globe2;
    case 'code':
      return Code;
    case 'zap':
      return Zap;
    case 'box':
      return Box;
    case 'layers':
    default:
      return Layers;
  }
}

export default function AboutHero() {
  const { aboutPage } = useAboutPage();
  const heroData = aboutPage.hero;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePillar, setActivePillar] = useState(0);
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
        {/* RIGHT COLUMN: Interactive Studio DNA & Blueprint Card     */}
        {/* ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, x: 35 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-5 relative w-full"
        >
          <div className="rounded-2xl bg-white border border-[#0B0D12]/15 p-4 sm:p-5 lg:p-4.5 xl:p-5.5 shadow-lg space-y-3 sm:space-y-3.5">
            
            {/* Header row */}
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-gray-100">
              <span className="text-xs font-mono font-bold text-[#0B0D12] uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#FF4A1C]" />
                <span>STUDIO BLUEPRINT</span>
              </span>
              
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Core DNA</span>
              </span>
            </div>

            {/* Pillar Interactive List */}
            <div className="space-y-2 lg:space-y-2 xl:space-y-2.5">
              {heroData.pillars.map((pillar, idx) => {
                const IconComponent = getPillarIcon(pillar.icon);
                const isActive = activePillar === idx;
                const accentColor = pillar.accentColor || '#FF4A1C';

                return (
                  <div
                    key={pillar.id || idx}
                    onClick={() => setActivePillar(idx)}
                    className={`p-2 sm:p-2.5 lg:p-2.5 xl:p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#FAF8F5] border-[#0B0D12] shadow-xs' 
                        : 'bg-white border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div 
                        className="w-7 h-7 sm:w-7.5 sm:h-7.5 lg:w-7.5 lg:h-7.5 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-[#0B0D12]">
                            {pillar.orderNumber} {pillar.title}
                          </span>
                          {isActive && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4A1C] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#5A5E6E] leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card Footer Micro Bar */}
            <div className="pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-caption font-mono text-[#5A5E6E]">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>24/7 Global Uptime</span>
              </span>
              <span>100% In-House</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

