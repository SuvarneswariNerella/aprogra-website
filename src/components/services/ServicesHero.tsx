import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Globe2, 
  Terminal,
  Cpu,
  Layers,
  ArrowDown,
  Server,
  Layout,
  Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICE_STACK_ITEMS = [
  { tag: "01", name: "Web & Mobile Systems", pills: ["Next.js 15", "React Native", "CRDTs"], color: "#3B82F6" },
  { tag: "02", name: "AI & Agentic Solutions", pills: ["Autonomous Loops", "Vector RAG", "SLMs"], color: "#8B5CF6" },
  { tag: "03", name: "Product & SaaS Engines", pills: ["Multi-Tenant", "Metering", "PostgreSQL"], color: "#06B6D4" },
  { tag: "04", name: "UI/UX & Design Systems", pills: ["Design Tokens", "WCAG AA", "Motion"], color: "#F43F5E" },
  { tag: "05", name: "Cloud & DevOps Infra", pills: ["Kubernetes", "Terraform", "Zero-Trust"], color: "#10B981" },
];

export default function ServicesHero() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const infinityPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Line art infinity draw in on mount (once, fast)
      if (infinityPathRef.current) {
        const length = infinityPathRef.current.getTotalLength?.() || 600;
        gsap.fromTo(
          infinityPathRef.current,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', delay: 0.1 }
        );
      }

      // 2. Left Column Staggered Entrance
      if (leftColRef.current) {
        const leftElements = leftColRef.current.querySelectorAll('.hero-stagger');
        gsap.fromTo(
          leftElements,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power2.out',
            delay: 0.05,
          }
        );
      }

      // 3. Right Column Cards Slide & Fade In
      if (rightColRef.current) {
        const rightCards = rightColRef.current.querySelectorAll('.hero-card-stagger');
        gsap.fromTo(
          rightCards,
          { opacity: 0, x: 28, y: 10 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: 'power2.out',
            delay: 0.25,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToFirstService = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('services-kpi-overview') || document.getElementById('service-web-app');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative z-10 w-full min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] lg:max-h-[calc(100vh-76px)] bg-[#F4F1EA] text-[#0B0D12] pt-20 pb-4 sm:pt-24 sm:pb-6 px-4 sm:px-6 md:px-10 border-b border-[#0B0D12]/10 overflow-hidden flex flex-col justify-between"
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

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10 flex flex-col justify-between h-full">
        
        {/* Top Floating Meta Bar */}
        <div className="flex items-center justify-between w-full border-b border-[#0B0D12]/10 pb-2.5 mb-2 sm:mb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#0B0D12]">
              FULL-CYCLE ENGINEERING • PRODUCTION PODS
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3.5 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#0B0D12]" />
              <span>12+ Countries Served</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B0D12]" />
              <span>SOC2 & Enterprise Aligned</span>
            </span>
          </div>
        </div>

        {/* Asymmetric 2-Column Hero Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Headings, Value Proposition & Actions       */}
          {/* ======================================================== */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-3 sm:space-y-4">
            
            {/* Small uppercase label pill with icon */}
            <div className="hero-stagger inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#0B0D12]/15 text-[#0B0D12] text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span>FULL-CYCLE ENGINEERING</span>
            </div>

            {/* Outcome-Led Large Bold Headline */}
            <h1 className="hero-stagger text-h1 text-[#0B0D12]">
              Services Built to Ship, <br />
              <span className="bg-gradient-to-r from-[#0B0D12] via-[#3B82F6] to-[#FF4A1C] bg-clip-text text-transparent">
                Not Just Scope.
              </span>
            </h1>

            {/* One supporting sentence */}
            <p className="hero-stagger text-xs sm:text-sm lg:text-base text-gray-600 max-w-xl leading-relaxed">
              One unified team with zero handoffs, from foundational architecture to global production launch.
            </p>

            {/* Two CTAs Side-by-Side */}
            <div className="hero-stagger flex flex-wrap items-center gap-3 pt-1">
              <Link 
                to="/contact"
                className="h-10 sm:h-11 px-5 sm:px-6 rounded-lg bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link 
                to="/products"
                className="h-10 sm:h-11 px-5 sm:px-6 rounded-lg bg-white hover:bg-gray-50 border border-[#0B0D12]/15 text-[#0B0D12] text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center cursor-pointer shadow-xs"
              >
                View Our Work
              </Link>
            </div>

            {/* Trust line beneath */}
            <div className="hero-stagger pt-1 flex flex-wrap items-center gap-2.5 text-[11px] sm:text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-[#0B0D12]">5 core service lines</span>
              </span>
              <span className="text-gray-300">·</span>
              <span>60+ engagements delivered</span>
              <span className="text-gray-300">·</span>
              <span>100% in-house engineering</span>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Credibility Panels & Architecture Stack    */}
          {/* ======================================================== */}
          <div ref={rightColRef} className="lg:col-span-5 space-y-3">
            
            {/* 1. Primary Card: Architecture Service Stack */}
            <div className="hero-card-stagger rounded-2xl bg-white border border-[#0B0D12]/15 p-4 sm:p-5 shadow-md space-y-2.5">
              
              {/* Header row */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-[11px] font-mono font-bold text-[#0B0D12] uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span>SERVICE STACK</span>
                </span>
                
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Pods</span>
                </span>
              </div>

              {/* Service Categories List */}
              <div className="space-y-1.5">
                {SERVICE_STACK_ITEMS.map((item) => (
                  <div 
                    key={item.tag}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/80 transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span 
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[11px] font-bold font-mono text-[#0B0D12] truncate">
                        {item.tag} {item.name}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 shrink-0">
                      {item.pills.slice(0, 2).map((pill) => (
                        <span 
                          key={pill} 
                          className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[9px] font-mono text-gray-600 shadow-2xs"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Metric */}
              <div className="pt-1.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-gray-500 border-t border-gray-100">
                <span>Direct Access to Senior Architects</span>
                <span className="font-bold text-[#0B0D12]">Zero Hand-offs</span>
              </div>

            </div>

            {/* 2. Secondary Stacked Card: Velocity & SLA Credibility */}
            <div className="hero-card-stagger rounded-xl bg-white border border-[#0B0D12]/15 p-2.5 sm:p-3 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B0D12] text-white flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-[#FF4A1C]" />
                </div>
                <div>
                  <div className="text-xs font-bold font-display text-[#0B0D12]">
                    Engineering Velocity & SLAs
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    99.98% Historical Uptime • 2-Week Sprints
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-emerald-600 block">
                  98.4%
                </span>
                <span className="text-[9px] font-mono text-gray-400">
                  Retention Rate
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Pinned Scroll Anchor Indicator */}
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200/80 mt-auto">
          <a 
            href="#service-web-app"
            onClick={scrollToFirstService}
            className="group flex items-center gap-2 text-[11px] sm:text-xs font-mono text-gray-500 hover:text-[#0B0D12] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4A1C] group-hover:scale-125 transition-transform" />
            <span>Scroll to Explore Disciplines</span>
            <ArrowDown className="w-3 h-3 text-[#FF4A1C] transition-transform group-hover:translate-y-0.5" />
          </a>

          <div className="hidden md:flex items-center gap-2.5 text-[11px] font-mono font-bold text-[#0B0D12]">
            <span className="hover:text-[#FF4A1C] transition-colors cursor-pointer" onClick={() => document.getElementById('service-web-app')?.scrollIntoView({ behavior: 'smooth' })}>01 / WEB</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-[#FF4A1C] transition-colors cursor-pointer" onClick={() => document.getElementById('service-ai-agents')?.scrollIntoView({ behavior: 'smooth' })}>02 / AI</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-[#FF4A1C] transition-colors cursor-pointer" onClick={() => document.getElementById('service-saas-product')?.scrollIntoView({ behavior: 'smooth' })}>03 / SAAS</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-[#FF4A1C] transition-colors cursor-pointer" onClick={() => document.getElementById('service-design-systems')?.scrollIntoView({ behavior: 'smooth' })}>04 / DESIGN</span>
            <span className="text-gray-300">•</span>
            <span className="hover:text-[#FF4A1C] transition-colors cursor-pointer" onClick={() => document.getElementById('service-cloud-devops')?.scrollIntoView({ behavior: 'smooth' })}>05 / CLOUD</span>
          </div>
        </div>

      </div>
    </section>
  );
}
