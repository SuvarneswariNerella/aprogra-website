import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  GraduationCap
} from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export interface SchoolModuleItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  kpi: string;
  color?: string;
  tag?: string;
  highlights?: string[];
}

interface SchoolModulesSectionProps {
  modules: SchoolModuleItem[];
  className?: string;
}

export const SchoolModulesSection: React.FC<SchoolModulesSectionProps> = ({
  modules,
  className = ""
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    const pinContainer = pinContainerRef.current;
    if (!trigger || !pinContainer || modules.length === 0) return;

    // Calculate total scroll distance: 540px per module transition
    const scrollDistance = (modules.length - 1) * 540;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top top+=80",
        end: `+=${scrollDistance}`,
        pin: pinContainer,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Calculate precise active index
          const rawIdx = progress * (modules.length - 1);
          const currentIdx = Math.min(Math.round(rawIdx), modules.length - 1);
          setActiveIndex(currentIdx);

          // Animate cards sequentially based on scroll progress
          modules.forEach((_, idx) => {
            const cardEl = cardRefs.current[idx];
            if (!cardEl) return;

            const diff = rawIdx - idx;

            if (diff < -1) {
              // UPCOMING CARDS: waiting below, hidden cleanly without overflowing container
              gsap.set(cardEl, {
                y: 40,
                scale: 0.96,
                opacity: 0,
                zIndex: 1,
                pointerEvents: "none"
              });
            } else if (diff >= -1 && diff < 0) {
              // ENTERING CARD: transitioning smoothly onto top of stack
              const t = diff + 1; // 0 to 1
              const y = (1 - t) * 35;
              const scale = 0.97 + t * 0.03;
              const opacity = Math.min(t * 1.5, 1);
              const zIndex = 30 + idx;

              gsap.set(cardEl, {
                y: y,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: t > 0.7 ? "auto" : "none"
              });
            } else {
              // ACTIVE & PAST CARDS: stacked tightly and cleanly behind without colliding with header
              const stackOffset = Math.min(diff, 3);
              const y = -7 * stackOffset;
              const scale = 1 - 0.015 * stackOffset;
              const zIndex = 10 + idx;
              // Maintain crisp solid opacity
              const opacity = stackOffset > 2 ? Math.max(1 - (diff - 2) * 0.3, 0) : 1;

              gsap.set(cardEl, {
                y: y,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: diff < 0.4 ? "auto" : "none"
              });
            }
          });
        }
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [modules]);

  const scrollToModule = (index: number) => {
    if (!triggerRef.current) return;
    const trigger = triggerRef.current;
    const scrollDistance = (modules.length - 1) * 540;
    const startY = trigger.getBoundingClientRect().top + window.scrollY - 80;
    const targetScroll = startY + (index / (modules.length - 1)) * scrollDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (activeIndex < modules.length - 1) {
      scrollToModule(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToModule(activeIndex - 1);
    }
  };

  const currentModule = modules[activeIndex] || modules[0];

  return (
    <section 
      id="school-erp"
      ref={triggerRef} 
      className={`relative w-full bg-white border-b border-[#0B0D12]/10 overflow-hidden ${className}`}
    >
      {/* PINNED SECTION VIEWPORT CONTAINER (Both Left and Right Columns Stay Fixed & Fit in Single Screen) */}
      <div 
        ref={pinContainerRef} 
        className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center py-6 px-4 sm:px-6 md:px-12 select-none"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ========================================================= */}
          {/* 1. PERSISTENT LEFT INFORMATION PANEL (UNIFIED SCHOOL ERP) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-3.5 text-left">
            
            <ScrollReveal className="space-y-6">
              {/* Header Block with Product Badge */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-xs font-semibold shadow-2xs">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span className="text-[#FF4A1C] font-mono font-bold">Product #1</span>
                  <span className="text-[#5A5E6E]">· Education &amp; Daycare SaaS</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#0B0D12] leading-tight tracking-tight">
                  SmartSchool ERP <br />
                  <span className="text-[#FF4A1C] font-bold text-xl sm:text-2xl lg:text-3xl block mt-0.5">
                    11 Core Modules &amp; Campus OS
                  </span>
                </h2>
                
                <p className="text-xs sm:text-sm text-[#5A5E6E] leading-relaxed max-w-md">
                  A unified multi-tenant campus operating system engineered to digitize admissions CRM, biometric attendance, fee gateways, live GPS fleet telemetry, and Saraswati AI lesson planning.
                </p>
              </div>

              {/* 4 Unified Enterprise KPI Metrics - Clean Horizontal Row */}
              <div className="grid grid-cols-4 gap-2 pt-0.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                  <span className="block text-sm sm:text-base font-bold font-display text-[#0B0D12] group-hover:text-[#FF4A1C] transition-colors">
                    11
                  </span>
                  <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                    Modules
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                  <span className="block text-sm sm:text-base font-bold font-display text-[#FF4A1C]">
                    480+
                  </span>
                  <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                    Screens
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                  <span className="block text-sm sm:text-base font-bold font-display text-[#0B0D12] group-hover:text-[#FF4A1C] transition-colors">
                    99.9%
                  </span>
                  <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                    Uptime
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                  <span className="block text-sm sm:text-base font-bold font-display text-[#FF4A1C]">
                    120K+
                  </span>
                  <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                    Students
                  </span>
                </div>
              </div>

              {/* Live Synchronized Focus Card */}
              <div className="p-3 rounded-xl bg-white border border-[#0B0D12]/12 space-y-1.5 shadow-2xs hover:border-[#FF4A1C]/35 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#5A5E6E] font-bold tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#FF4A1C]" />
                    Active Module in Stack
                  </span>
                  <span className="text-[10px] font-mono text-[#0B0D12] font-semibold bg-[#FAF8F5] border border-[#0B0D12]/10 px-2 py-0.5 rounded">
                    {activeIndex + 1} / {modules.length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold font-display text-[#0B0D12] leading-snug truncate">
                    {String(activeIndex + 1).padStart(2, "0")}. {currentModule?.title}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF8F5] text-[#FF4A1C] border border-[#FF4A1C]/20 shrink-0">
                    {currentModule?.tag || 'CORE'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
                  <span className="text-[11px] sm:text-xs font-mono text-[#FF4A1C] font-semibold truncate">
                    {currentModule?.kpi}
                  </span>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-0.5 flex flex-wrap gap-2.5 sm:gap-3 items-center">
                <Link
                  to="/contact"
                  className="h-10 px-5 rounded-xl bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Request Campus Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products/school-erp"
                  className="h-10 px-4 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </ScrollReveal>

          </div>

          {/* ========================================================= */}
          {/* 2. INTERACTIVE MODULE STACK & LIVE PREVIEW SHOWCASE       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center">
            
            {/* Top Control Bar: Modules Stack Badge + Step Indicators + Arrows */}
            <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2.5 mb-8 px-1 select-none">
              
              {/* Stack Badge */}
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#0B0D12]/12 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span className="text-xs font-mono font-bold text-[#0B0D12]">11 Core Modules Stack</span>
              </div>

              {/* Clickable Step Pills */}
              <div className="hidden sm:flex items-center gap-1 bg-[#FAF8F5] px-2.5 py-1.5 rounded-full border border-[#0B0D12]/12 shadow-2xs">
                {modules.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToModule(i)}
                    aria-label={`Jump to module ${i + 1}`}
                    title={`Module ${i + 1}: ${modules[i]?.title}`}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      i === activeIndex 
                        ? 'w-5 bg-[#FF4A1C]' 
                        : 'w-1.5 bg-[#0B0D12]/20 hover:bg-[#0B0D12]/50'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Progress and Arrows */}
              <div className="flex items-center gap-1.5">
                <div className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#5A5E6E] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#0B0D12]/10">
                  {Math.round(scrollProgress * 100)}%
                </div>
                <button 
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous module"
                  className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/10 text-[#0B0D12] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={activeIndex === modules.length - 1}
                  aria-label="Next module"
                  className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/10 text-[#0B0D12] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* STACK VIEWPORT */}
            <div className="relative w-full max-w-2xl min-h-[385px] sm:min-h-[365px] flex items-center justify-center">
              <div 
                className="relative w-full h-[385px] sm:h-[365px] flex items-center justify-center"
                style={{ perspective: 1200 }}
              >
                {modules.map((mod, index) => {
                  const Icon = mod.icon;
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={index}
                      ref={(el) => { cardRefs.current[index] = el; }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        maxWidth: '672px',
                        borderRadius: '16px',
                        top: 0,
                        willChange: 'transform, opacity'
                      }}
                      className="select-none"
                    >
                      {/* Enterprise Module Card Body */}
                      <div 
                        className={`relative w-full rounded-2xl bg-[#FAF8F5] border border-[#0B0D12]/15 border-t-[3px] border-t-[#FF4A1C] p-4 sm:p-5 space-y-3 transition-shadow duration-200 ${
                          isActive 
                            ? 'shadow-[0_16px_36px_-10px_rgba(11,13,18,0.12),0_2px_8px_rgba(11,13,18,0.04)] bg-white' 
                            : 'shadow-[0_10px_24px_-8px_rgba(11,13,18,0.08)] bg-[#FAF8F5]'
                        }`}
                      >
                        {/* Top Row: Icon + Module Number + Category Tag */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#FFF5F2] border border-[#FF4A1C]/25 flex items-center justify-center text-[#FF4A1C] shadow-2xs">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="inline-block px-2 py-0.5 rounded bg-[#FFF5F2] text-[#FF4A1C] border border-[#FF4A1C]/20 text-[10px] font-mono font-bold">
                                  MOD {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A5E6E]">
                                  {mod.tag || "ERP CORE"}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-[#0B0D12]/70 font-semibold block mt-0.5">
                                SmartSchool ERP Suite
                              </span>
                            </div>
                          </div>

                          {/* Large Module Numeric Accent */}
                          <div className="text-right">
                            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#0B0D12]/20 select-none">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Title & Description */}
                        <div className="space-y-1">
                          <h4 className="text-base sm:text-lg font-bold font-display text-[#0B0D12] tracking-tight">
                            {mod.title}
                          </h4>
                          <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed line-clamp-2">
                            {mod.desc}
                          </p>
                        </div>

                        {/* Key Capabilities Checklist */}
                        {mod.highlights && mod.highlights.length > 0 && (
                          <div className="space-y-1 pt-1 border-t border-[#0B0D12]/8">
                            <span className="text-[9px] font-mono uppercase text-[#5A5E6E] font-bold tracking-wider block">
                              Core Capabilities
                            </span>
                            <div className="grid grid-cols-1 gap-1">
                              {mod.highlights.map((point, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-1.5 text-xs text-[#374151]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4A1C] shrink-0 mt-0.5" />
                                  <span className="leading-snug text-[11px] sm:text-xs">{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Bottom Footer: KPI Metric Badge */}
                        <div className="pt-2 border-t border-[#0B0D12]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                          <div className="inline-flex items-center gap-1.5 text-[#0B0D12] font-semibold bg-white px-2.5 py-1 rounded-lg border border-[#0B0D12]/10 shadow-2xs text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
                            <span>{mod.kpi}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#5A5E6E] uppercase font-bold">
                            100% Cloud Native
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Scroll Helper Prompt */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#5A5E6E] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#0B0D12]/12 shadow-2xs select-none">
              <ChevronDown className="w-3.5 h-3.5 text-[#FF4A1C] animate-bounce" />
              <span>
                {activeIndex === modules.length - 1 
                  ? "All 11 modules explored · Continue to OmniChat" 
                  : `Scroll or click to explore next module (${activeIndex + 1}/${modules.length})`}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SchoolModulesSection;
