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
              <span className="block text-base sm:text-lg lg:text-xl font-bold font-display text-[#0B0D12]">120K+</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#5A5E6E] uppercase tracking-wider">Active Users</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg lg:text-xl font-bold font-display text-[#FF4A1C]">99.98%</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#5A5E6E] uppercase tracking-wider">Production SLA</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg lg:text-xl font-bold font-display text-[#0B0D12]">100%</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#5A5E6E] uppercase tracking-wider">In-House Code</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Layered Technology Ecosystem Stage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-6 relative flex items-center justify-center w-full"
        >
          {/* Main 3D Container with Parallax Tilt */}
          <div 
            style={{
              transform: `perspective(1200px) rotateX(${mousePos.y * 0.7}deg) rotateY(${mousePos.x * 0.7}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)'
            }}
            className="w-full max-w-[480px] lg:max-w-[440px] xl:max-w-[480px] relative space-y-2"
          >
            {/* Top Product Switch Tabs on Stage */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B0D12]">
                  Live Production Stream
                </span>
              </div>
              <div className="flex gap-1 bg-white/80 backdrop-blur-sm p-0.5 rounded-lg border border-[#0B0D12]/15 shadow-2xs">
                <button
                  onClick={() => setActiveStageProduct('smartschool')}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md text-[10px] font-mono font-bold transition-all ${
                    activeStageProduct === 'smartschool'
                      ? 'bg-[#0B0D12] text-white shadow-xs'
                      : 'text-[#5A5E6E] hover:text-[#0B0D12]'
                  }`}
                >
                  SmartSchool
                </button>
                <button
                  onClick={() => setActiveStageProduct('omnichat')}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md text-[10px] font-mono font-bold transition-all ${
                    activeStageProduct === 'omnichat'
                      ? 'bg-[#0B0D12] text-white shadow-xs'
                      : 'text-[#5A5E6E] hover:text-[#0B0D12]'
                  }`}
                >
                  OmniChat AI
                </button>
              </div>
            </div>

            {/* Core Display Dashboard Screen */}
            <div className="bg-white border border-[#0B0D12]/20 rounded-2xl p-3 sm:p-3.5 lg:p-3.5 xl:p-4 shadow-lg relative overflow-hidden backdrop-blur-md">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-[#0B0D12]/10 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF4A1C]/20 border border-[#FF4A1C]" />
                    <span className="w-2 h-2 rounded-full bg-[#0B0D12]/20 border border-[#0B0D12]/40" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400/30 border border-emerald-500" />
                  </div>
                  <span className="ml-1 text-[10px] font-mono font-medium text-[#5A5E6E]">
                    {activeStageProduct === 'smartschool' ? 'smartschool.aprogra.app/live' : 'omnichat.aprogra.app/bridge'}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                  ONLINE · 99.98%
                </span>
              </div>

              {/* Dynamic Product Viewport */}
              {activeStageProduct === 'smartschool' ? (
                <div className="space-y-2 animate-in fade-in duration-300">
                  
                  {/* Top Stats Grid */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="p-1.5 sm:p-2 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10 space-y-0.5">
                      <span className="text-[8px] sm:text-[9px] font-mono text-[#5A5E6E] uppercase">Campuses</span>
                      <span className="block text-sm sm:text-base lg:text-lg font-extrabold font-display text-[#0B0D12]">480+</span>
                      <span className="text-[7.5px] sm:text-[8px] text-emerald-600 font-mono font-semibold">↑ Synchronized</span>
                    </div>

                    <div className="p-1.5 sm:p-2 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10 space-y-0.5">
                      <span className="text-[8px] sm:text-[9px] font-mono text-[#5A5E6E] uppercase">Attendance</span>
                      <span className="block text-sm sm:text-base lg:text-lg font-extrabold font-display text-[#FF4A1C]">98.4%</span>
                      <span className="text-[7.5px] sm:text-[8px] text-[#5A5E6E] font-mono">Biometric Sync</span>
                    </div>

                    <div className="p-1.5 sm:p-2 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10 space-y-0.5">
                      <span className="text-[8px] sm:text-[9px] font-mono text-[#5A5E6E] uppercase">Fee Invoicing</span>
                      <span className="block text-sm sm:text-base lg:text-lg font-extrabold font-display text-[#0B0D12]">$1.4M+</span>
                      <span className="text-[7.5px] sm:text-[8px] text-emerald-600 font-mono">Automated</span>
                    </div>
                  </div>

                  {/* Live Bus Fleet GPS Tracking Node */}
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-[#0B0D12]/15 flex items-center justify-center text-[#FF4A1C]">
                        <Bus className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="block text-[11px] sm:text-xs font-bold font-display text-[#0B0D12]">Fleet Route #18</span>
                        <span className="block text-[8px] sm:text-[9px] font-mono text-[#5A5E6E]">42 Students · GPS Active</span>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-600 px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      ETA 4 min
                    </span>
                  </div>

                  {/* Saraswati AI Assistant Pill */}
                  <div className="p-2 rounded-xl bg-[#0B0D12] text-white space-y-0.5 shadow-md">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#FF4A1C]">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Bot className="w-3 h-3" /> Saraswati AI Engine
                      </span>
                      <span className="text-white/60 text-[8px]">Latency: 38ms</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-white/90 font-sans italic">
                      "Autonomous exam paper generation complete for Grade 10 Physics."
                    </p>
                  </div>

                </div>
              ) : (
                <div className="space-y-2 animate-in fade-in duration-300">
                  
                  {/* Channels Bar */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#0B0D12]">Connected Channels</span>
                    <div className="flex gap-1">
                      {['WhatsApp', 'Instagram', 'Telegram'].map((ch) => (
                        <span key={ch} className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold bg-white border border-[#0B0D12]/15 text-[#0B0D12]">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Live Multi-channel Chat Simulation */}
                  <div className="space-y-1.5 bg-[#FAF8F5] p-2 rounded-xl border border-[#0B0D12]/10 text-xs">
                    <div className="flex justify-start">
                      <div className="bg-white border border-[#0B0D12]/10 px-2.5 py-1 rounded-xl text-[#0B0D12] max-w-[90%] space-y-0.5 shadow-2xs">
                        <span className="block text-[8px] font-mono text-[#5A5E6E]">WhatsApp Official API</span>
                        <p className="text-[10px] sm:text-[11px]">Hi! We need an enterprise license for 15 agents. Can we integrate our CRM?</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-[#0B0D12] text-white px-2.5 py-1.5 rounded-xl text-left max-w-[90%] space-y-0.5 shadow-md">
                        <div className="flex items-center justify-between text-[8px] font-mono text-[#FF4A1C]">
                          <span className="flex items-center gap-1 font-bold">
                            <Bot className="w-2.5 h-2.5" /> OmniChat AI Copilot
                          </span>
                          <span className="text-white/60">Resolved</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-white/90">
                          Yes! Webhook &amp; REST APIs connect in &lt;5 mins. Let's schedule a call!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meta Template Engine Verification */}
                  <div className="p-2 rounded-xl bg-white border border-[#0B0D12]/15 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-[#0B0D12] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-[#FF4A1C]" /> Meta Template Engine
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-emerald-600 font-bold">APPROVED &amp; LIVE</span>
                  </div>

                </div>
              )}

            </div>

            {/* Floating Layered Tech Badges with 3D Depth Offsets */}
            <div className="flex flex-wrap gap-1.5 pt-0.5 justify-center">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/95 border border-[#0B0D12]/15 text-[#0B0D12] text-[9px] sm:text-[10px] font-mono font-bold shadow-xs hover:border-[#FF4A1C] transition-colors">
                <Database className="w-3 h-3 text-[#FF4A1C]" />
                Multi-Tenant Postgres
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/95 border border-[#0B0D12]/15 text-[#0B0D12] text-[9px] sm:text-[10px] font-mono font-bold shadow-xs hover:border-[#FF4A1C] transition-colors">
                <Lock className="w-3 h-3 text-[#FF4A1C]" />
                SOC-2 Architecture
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/95 border border-[#0B0D12]/15 text-[#0B0D12] text-[9px] sm:text-[10px] font-mono font-bold shadow-xs hover:border-[#FF4A1C] transition-colors">
                <Cpu className="w-3 h-3 text-[#FF4A1C]" />
                Proprietary AI Models
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
