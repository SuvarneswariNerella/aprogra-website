import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  MessageSquare, 
  Activity, 
  ShieldCheck, 
  Bot, 
  Bus, 
  Zap, 
  Server, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Database,
  Lock
} from 'lucide-react';

export default function ProductsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeStageProduct, setActiveStageProduct] = useState<'smartschool' | 'omnichat'>('smartschool');

  // Mouse parallax tracker for 3D stage depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[calc(100vh-76px)] bg-[#F4F1EA] text-[#0B0D12] pt-20 pb-8 sm:pt-24 sm:pb-10 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-[#0B0D12]/10 overflow-hidden flex flex-col justify-center"
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

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center my-auto">
        
        {/* LEFT COLUMN: Strategic Product Positioning & CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -35 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-6 space-y-3 sm:space-y-3.5 lg:space-y-3 xl:space-y-4 text-left"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF4A1C] animate-pulse" />
            <span>Proprietary SaaS Ecosystem</span>
          </div>

          {/* Main Display Headline */}
          <div className="space-y-1">
            <h1 className="text-h1 text-[#0B0D12]">
              Software We Built. <br />
              <span className="text-[#FF4A1C]">
                Powering Real Scale.
              </span>
            </h1>
          </div>

          {/* Subheading / Description */}
          <p className="text-xs sm:text-sm lg:text-[13px] xl:text-[14px] text-[#5A5E6E] max-w-xl leading-relaxed">
            We engineer, operate, and scale proprietary SaaS platforms and AI automation engines running in 24/7 live production.
          </p>

          {/* Jump to Products Quick Switcher */}
          <div className="flex flex-wrap gap-2 pt-0.5">
            <a 
              href="#school-erp"
              onClick={() => setActiveStageProduct('smartschool')}
              className={`px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl border text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeStageProduct === 'smartschool'
                  ? 'bg-white border-[#0B0D12] text-[#0B0D12] shadow-md -translate-y-0.5'
                  : 'bg-[#FAF8F5] border-[#0B0D12]/15 text-[#5A5E6E] hover:border-[#0B0D12]/50 hover:text-[#0B0D12]'
              }`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/10 flex items-center justify-center text-[#0B0D12]">
                <GraduationCap className="w-3.5 h-3.5 text-[#FF4A1C]" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-xs sm:text-sm text-[#0B0D12]">SmartSchool ERP</span>
                <span className="block text-[9px] sm:text-[10px] text-[#5A5E6E]">11 Campus Modules</span>
              </div>
            </a>

            <a 
              href="#omnichat"
              onClick={() => setActiveStageProduct('omnichat')}
              className={`px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl border text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeStageProduct === 'omnichat'
                  ? 'bg-white border-[#0B0D12] text-[#0B0D12] shadow-md -translate-y-0.5'
                  : 'bg-[#FAF8F5] border-[#0B0D12]/15 text-[#5A5E6E] hover:border-[#0B0D12]/50 hover:text-[#0B0D12]'
              }`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/10 flex items-center justify-center text-[#0B0D12]">
                <MessageSquare className="w-3.5 h-3.5 text-[#FF4A1C]" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-xs sm:text-sm text-[#0B0D12]">OmniChat AI</span>
                <span className="block text-[9px] sm:text-[10px] text-[#5A5E6E]">WhatsApp &amp; Omnichannel</span>
              </div>
            </a>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
            <Link
              to="/contact"
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Schedule Live Demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#school-erp"
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center"
            >
              Explore Products
            </a>
          </div>

          {/* Micro Telemetry Ticker */}
          <div className="pt-2.5 sm:pt-3 border-t border-[#0B0D12]/10 grid grid-cols-3 gap-2.5 max-w-lg">
            <div>
              <span className="block text-base sm:text-lg lg:text-xl font-bold font-display text-[#0B0D12]">2</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#5A5E6E] uppercase tracking-wider">SaaS Ecosystems</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg lg:text-xl font-bold font-display text-[#FF4A1C]">17</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#5A5E6E] uppercase tracking-wider">Live Modules</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg lg:text-xl font-bold font-display text-[#0B0D12]">480+</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#5A5E6E] uppercase tracking-wider">Campuses &amp; Clients</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Main Product Showcase Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-6 relative flex items-center justify-center w-full"
        >
          <div 
            style={{
              transform: `perspective(1200px) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)'
            }}
            className="w-full max-w-[540px] space-y-2.5"
          >
            {/* Top Product Tabs Bar */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4A1C] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B0D12]">
                  {activeStageProduct === 'smartschool' ? 'SmartSchool ERP Preview' : 'OmniChat AI Preview'}
                </span>
              </div>
              <div className="flex gap-1 bg-white/90 backdrop-blur-sm p-0.5 rounded-lg border border-[#0B0D12]/15 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveStageProduct('smartschool')}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    activeStageProduct === 'smartschool'
                      ? 'bg-[#0B0D12] text-white shadow-xs'
                      : 'text-[#5A5E6E] hover:text-[#0B0D12]'
                  }`}
                >
                  SmartSchool
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStageProduct('omnichat')}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    activeStageProduct === 'omnichat'
                      ? 'bg-[#0B0D12] text-white shadow-xs'
                      : 'text-[#5A5E6E] hover:text-[#0B0D12]'
                  }`}
                >
                  OmniChat AI
                </button>
              </div>
            </div>

            {/* Main Product Image Container */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[#0B0D12]/15 bg-white shadow-xl group">
              <img 
                src={
                  activeStageProduct === 'smartschool'
                    ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                }
                alt={activeStageProduct === 'smartschool' ? "SmartSchool ERP Platform Interface" : "OmniChat AI Communication Hub"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/70 via-[#0B0D12]/10 to-transparent pointer-events-none" />

              {/* Top Status Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B0D12]/80 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE PRODUCTION · 99.98% SLA
                </span>
              </div>

              {/* Bottom Info Bar Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 text-[11px] font-bold">
                    {activeStageProduct === 'smartschool' ? 'SmartSchool • 11 Modules' : 'OmniChat • 4 Channels'}
                  </span>
                </div>
                <span className="text-[10px] text-white/80 font-mono">
                  {activeStageProduct === 'smartschool' ? '480+ Campuses Active' : 'Meta & AI Verified'}
                </span>
              </div>
            </div>

            {/* Bottom Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-0.5 justify-center">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-[#0B0D12]/12 text-[#0B0D12] text-[10px] font-mono font-semibold shadow-2xs">
                <Database className="w-3 h-3 text-[#FF4A1C]" />
                Multi-Tenant Postgres
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-[#0B0D12]/12 text-[#0B0D12] text-[10px] font-mono font-semibold shadow-2xs">
                <Lock className="w-3 h-3 text-[#FF4A1C]" />
                SOC-2 Certified
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-[#0B0D12]/12 text-[#0B0D12] text-[10px] font-mono font-semibold shadow-2xs">
                <Cpu className="w-3 h-3 text-[#FF4A1C]" />
                Autonomous AI Models
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
