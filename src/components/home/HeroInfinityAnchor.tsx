import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  Layers, 
  Globe2, 
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// 3 Morph path states for infinity symbol (Standard, Tighter Core, Expanded Wings)
const PATH_VARIANT_1 = "M 90,60 C 50,20 15,20 15,60 C 15,100 50,100 90,60 C 130,20 165,20 165,60 C 165,100 130,100 90,60 Z";
const PATH_VARIANT_2 = "M 90,60 C 65,30 25,25 25,60 C 25,95 65,90 90,60 C 115,30 155,25 155,60 C 155,95 115,90 90,60 Z";
const PATH_VARIANT_3 = "M 90,60 C 40,12 8,12 8,60 C 8,108 40,108 90,60 C 140,12 172,12 172,60 C 172,108 140,108 90,60 Z";

const TECH_TAGS = [
  "Next.js & React", "TypeScript", "Python & AI", "Kubernetes", "PostgreSQL", "AWS & Cloud"
];

const METRICS = [
  { value: "40+", label: "Products Shipped", sub: "Enterprise & SaaS" },
  { value: "60+", label: "Global Clients", sub: "12+ Countries" },
  { value: "99.9%", label: "Uptime SLA", sub: "Production Grade" },
  { value: "100%", label: "In-House Team", sub: "Zero Outsourcing" }
];

export default function HeroInfinityAnchor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedCenterRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Storytelling Content Panels
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel1ContentRef = useRef<HTMLDivElement>(null); // Inner ref for entrance animation
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  // Right Side Companion Panels
  const sidePanel1Ref = useRef<HTMLDivElement>(null);
  const sidePanel1ContentRef = useRef<HTMLDivElement>(null); // Inner ref for entrance animation
  const sidePanel2Ref = useRef<HTMLDivElement>(null);
  const sidePanel3Ref = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      // Fallback for reduced motion: static drawn state, no pinning morphs
      if (pathRef.current) {
        gsap.set(pathRef.current, { opacity: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const path = pathRef.current;

      if (!container || !path) return;

      // 1. Initial fade-in of the infinity stroke on mount
      gsap.fromTo(path, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" }
      );

      // --- PAGE LOAD ENTRANCE ANIMATION FOR FIRST PANELS ---
      gsap.fromTo(panel1ContentRef.current, 
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 2.2, ease: "power3.out", delay: 0.4 }
      );
      
      gsap.fromTo(sidePanel1ContentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 2.2, ease: "power3.out", delay: 1.2 }
      );

      // 2. ScrollTrigger Pinned Sequence
      const totalScrollDistance = 2600;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalScrollDistance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      // --- SCROLL PHASE 1: Variant 1 -> Variant 2 ---
      tl.to(path, {
        attr: { d: PATH_VARIANT_2 },
        strokeWidth: 4,
        ease: "none",
        duration: 1
      }, 0);

      // Panel 1 -> Panel 2 transition
      tl.to(panel1Ref.current, {
        y: -24,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.6)
      .to(sidePanel1Ref.current, {
        y: -24,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.6);

      tl.fromTo(panel2Ref.current,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        1.1
      )
      .fromTo(sidePanel2Ref.current,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        1.1
      );

      // --- SCROLL PHASE 2: Variant 2 -> Variant 3 ---
      tl.to(path, {
        attr: { d: PATH_VARIANT_3 },
        strokeWidth: 4.5,
        ease: "none",
        duration: 1
      }, 1.2);

      // Panel 2 -> Panel 3 transition
      tl.to(panel2Ref.current, {
        y: -24,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 1.8)
      .to(sidePanel2Ref.current, {
        y: -24,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 1.8);

      tl.fromTo(panel3Ref.current,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        2.1
      )
      .fromTo(sidePanel3Ref.current,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        2.1
      );

      // --- SCROLL PHASE 3: Subtle Exit Polish ---
      tl.to(pinnedCenterRef.current, {
        scale: 0.96,
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.inOut"
      }, 2.7);

    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[580px] max-h-[1080px] w-full bg-[#F4F1EA] text-[#0B0D12] flex flex-col justify-between overflow-hidden border-b border-[#0B0D12]/10 pt-16 md:pt-20 pb-3 md:pb-4"
    >
      {/* Background Dot Matrix Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(#0B0D12 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* ======================================================== */}
      {/* PINNED CENTER INFINITY ANCHOR (SINGLE CLEAN MOVING TRAIL)*/}
      {/* ======================================================== */}
      <div 
        ref={pinnedCenterRef}
        className="absolute inset-0 top-16 md:top-20 bottom-3 md:bottom-4 flex items-center justify-center pointer-events-none z-[15] select-none will-change-transform"
      >
        {/* Soft Blurred Ambient Glow Halo Behind Infinity */}
        <div 
          className="absolute w-56 h-40 sm:w-72 sm:h-48 rounded-full bg-[#FF4A1C]/15 blur-3xl pointer-events-none -z-10"
        />

        {/* Centered SVG Infinity Symbol (Single clean infinity path with moving gradient trail) */}
        <div className="relative w-[150px] sm:w-[180px] lg:w-[190px] h-auto flex items-center justify-center">
          <svg 
            viewBox="0 0 180 120" 
            className="w-full h-auto overflow-visible drop-shadow-md"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Aprogra Moving Trail Gradient (Dark navy/black fading into solid orange) */}
              <linearGradient id="aprograInfinityTrail" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B0D12" stopOpacity="0.15" />
                <stop offset="40%" stopColor="#0B0D12" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#FF4A1C" />
                <stop offset="100%" stopColor="#FF7A50" />
              </linearGradient>
            </defs>

            {/* Single Clean Infinity Path with Complete Self-Drawing/Forming Infinite Loop */}
            <path
              ref={pathRef}
              d={PATH_VARIANT_1}
              stroke="url(#aprograInfinityTrail)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              strokeDasharray="100"
              strokeDashoffset="100"
              className="animate-[infinityFormDrawLoop_3.4s_cubic-bezier(0.45,0,0.55,1)_infinite] drop-shadow-[0_0_12px_rgba(255,74,28,0.5)] will-change-[stroke-dashoffset,d]"
            />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN VIEWPORT WRAPPER: Surrounding Text Panels Crossfade */}
      {/* ======================================================== */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col justify-between z-20">
        
        {/* Top Header Floating Badge */}
        <div className="flex items-center justify-between w-full border-b border-[#0B0D12]/10 pb-2 sm:pb-2.5 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#0B0D12]">
              GLOBAL TECH STUDIO • PRODUCTION ENGINEERING
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#5A5E6E]">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#0B0D12]" />
              <span>12+ Countries</span>
            </span>
            <span className="text-[#0B0D12]/20">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B0D12]" />
              <span>SOC2 Aligned</span>
            </span>
          </div>
        </div>

        {/* 3-Part Layout: Left Column (5 cols), Center Spacer (2 cols for Infinity), Right Column (5 cols) */}
        <div className="my-auto py-1 sm:py-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full grow">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN: Cleanly bounded to prevent center overlap   */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 relative h-full flex flex-col justify-center max-w-lg lg:pr-2 z-20">
            
            {/* PANEL 1: CORE VALUE PROPOSITION */}
            <div ref={panel1Ref} className="will-change-[transform,opacity] w-full">
              <div ref={panel1ContentRef} className="space-y-4 opacity-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>Modern Software &amp; AI</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-h1 text-[#0B0D12]">
                  Engineering Software <br />
                  <span className="text-[#FF4A1C]">
                    Without Limits.
                  </span>
                </h1>
              </div>

              <p className="text-body-lg text-[#5A5E6E] max-w-md leading-relaxed">
                Full-cycle software engineering, intelligent AI workflows, and resilient architectures.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link 
                  to="/contact"
                  className="h-10 px-5 rounded-lg bg-[#FF4A1C] hover:bg-[#E03A0F] text-white text-badge shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
                >
                  <span>Build With Us</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link 
                  to="/products"
                  className="h-10 px-5 rounded-lg bg-[#FAF8F5] hover:bg-white border border-[#0B0D12]/15 text-[#0B0D12] text-badge transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                >
                  Explore Products
                </Link>
              </div>
            </div>
            </div>

            {/* PANEL 2: 40+ SHIPPED PRODUCTS STORY */}
            <div 
              ref={panel2Ref} 
              className="absolute inset-y-0 left-0 w-full flex flex-col justify-center space-y-4 opacity-0 pointer-events-none will-change-[transform,opacity]"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>Production Deployments</span>
              </div>

              <div className="text-5xl sm:text-6xl font-bold text-[#0B0D12] leading-none font-display">
                40<span className="text-[#FF4A1C]">+</span>
              </div>

              <div className="space-y-1.5">
                <h2 className="text-h2 text-[#0B0D12]">
                  Commercial SaaS &amp; ERP Platforms
                </h2>
                <p className="text-body-lg text-[#5A5E6E] max-w-sm">
                  From campus ERPs to real-time AI suites, we build and run production systems globally.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["EduNura", "SmartSchool ERP", "OmniChat AI", "+37 More"].map((item, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-xs font-mono text-[#0B0D12]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* PANEL 3: END-TO-END SENIOR IN-HOUSE TALENT */}
            <div 
              ref={panel3Ref} 
              className="absolute inset-y-0 left-0 w-full flex flex-col justify-center space-y-4 opacity-0 pointer-events-none will-change-[transform,opacity]"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>Zero Outsourcing</span>
              </div>

              <h2 className="text-h2 text-[#0B0D12]">
                Engineered In-House. <br />
                <span className="text-[#FF4A1C]">Delivered On Time.</span>
              </h2>

              <p className="text-body-lg text-[#5A5E6E] max-w-sm">
                Direct access to principal software architects and DevOps specialists.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-0.5 max-w-xs">
                <div className="p-2 bg-[#FAF8F5] rounded-lg border border-[#0B0D12]/15">
                  <div className="text-xs font-bold font-mono text-[#FF4A1C]">99.9% SLA</div>
                  <div className="text-[10px] text-[#5A5E6E] font-mono">Availability</div>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded-lg border border-[#0B0D12]/15">
                  <div className="text-xs font-bold font-mono text-[#0B0D12]">100% In-House</div>
                  <div className="text-[10px] text-[#5A5E6E] font-mono">Senior Team</div>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* CENTER GAP (2 Columns for Infinity to breathe visibly)  */}
          {/* ======================================================= */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

          {/* ======================================================= */}
          {/* RIGHT COLUMN: Interactive Tech Companion Bento Modules */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 relative h-full flex items-center justify-end min-h-[280px] max-w-lg ml-auto w-full lg:pl-2 z-20">
            
            {/* SIDE PANEL 1: Technical Stack Bento */}
            <div ref={sidePanel1Ref} className="w-full relative z-10 will-change-[transform,opacity]">
              <div ref={sidePanel1ContentRef} className="space-y-2 sm:space-y-2.5 opacity-0">
              <div className="bg-[#FAF8F5] rounded-xl border border-[#0B0D12]/15 p-3.5 sm:p-4 shadow-xs space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#0B0D12]/10">
                  <span className="text-xs font-mono font-bold text-[#0B0D12] uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#FF4A1C]" />
                    Architecture Stack
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold">Production Ready</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {TECH_TAGS.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white text-[#0B0D12] border border-[#0B0D12]/10 text-xs font-mono font-medium shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-white rounded-xl border border-[#0B0D12]/15 px-3 py-2 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#0B0D12] text-white flex items-center justify-center shrink-0">
                    <Activity className="w-3 h-3 text-[#FF4A1C]" />
                  </div>
                  <div className="text-xs font-mono text-[#0B0D12]">
                    <span className="font-bold">Continuous Delivery</span> • CI/CD Active
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </div>
            </div>
            </div>

            {/* SIDE PANEL 2: Shipped Metrics Grid */}
            <div 
              ref={sidePanel2Ref} 
              className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-2 opacity-0 pointer-events-none will-change-[transform,opacity]"
            >
              <div className="grid grid-cols-2 gap-2 w-full">
                {METRICS.map((m, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] rounded-xl border border-[#0B0D12]/15 p-2.5 sm:p-3 space-y-0.5 shadow-xs">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-[#0B0D12]">{m.value}</div>
                    <div className="text-xs font-bold font-display text-[#0B0D12]">{m.label}</div>
                    <div className="text-[10px] font-mono text-[#5A5E6E]">{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDE PANEL 3: In-House Workflow Diagram */}
            <div 
              ref={sidePanel3Ref} 
              className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-2 opacity-0 pointer-events-none will-change-[transform,opacity]"
            >
              <div className="bg-[#FAF8F5] rounded-xl border border-[#0B0D12]/15 p-3.5 sm:p-4 shadow-xs space-y-2 w-full">
                <div className="flex items-center justify-between pb-1 border-b border-[#0B0D12]/10 text-xs font-mono font-bold text-[#0B0D12]">
                  <span>Delivery Pipeline</span>
                  <span className="text-[#FF4A1C]">In-House</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg bg-white border border-[#0B0D12]/10 text-xs font-mono">
                    <span className="font-bold text-[#0B0D12]">1. Architecture &amp; Design</span>
                    <span className="text-[#5A5E6E]">Week 1-2</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg bg-white border border-[#0B0D12]/10 text-xs font-mono">
                    <span className="font-bold text-[#0B0D12]">2. Rapid Sprints</span>
                    <span className="text-[#5A5E6E]">Bi-weekly</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg bg-white border border-[#0B0D12]/10 text-xs font-mono">
                    <span className="font-bold text-[#0B0D12]">3. Cloud &amp; DevOps</span>
                    <span className="text-[#5A5E6E]">Automated CI/CD</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Pinned Scroll Progress Indicator */}
        <div className="flex items-center justify-between pt-2 sm:pt-2.5 border-t border-[#0B0D12]/10 z-20 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5A5E6E]">
            <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
            <span>Scroll to Explore</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono font-bold text-[#0B0D12]">
            <span>01 / ARCHITECTURE</span>
            <span className="text-[#0B0D12]/20">•</span>
            <span>02 / PRODUCTS</span>
            <span className="text-[#0B0D12]/20">•</span>
            <span>03 / VELOCITY</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes infinityFormDrawLoop {
          0% {
            stroke-dashoffset: 100;
            opacity: 0.2;
          }
          10% {
            opacity: 1;
          }
          45%, 55% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -100;
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
}
