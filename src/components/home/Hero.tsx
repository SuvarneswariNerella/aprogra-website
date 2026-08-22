import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Globe2, 
  CheckCircle2,
  Terminal,
  Zap,
  TrendingUp,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const TECH_TAGS = [
  "React / Next.js", "TypeScript", "Python / FastAPI", "Node.js", 
  "Flutter", "Docker / K8s", "PostgreSQL", "AWS / GCP", "AI & LLMs", "Redis"
];

const METRICS = [
  { value: "40+", label: "Products Shipped", sub: "Enterprise & SaaS" },
  { value: "60+", label: "Global Clients", sub: "12+ Countries" },
  { value: "99.9%", label: "Uptime SLA", sub: "Production Grade" },
  { value: "100%", label: "In-House Team", sub: "Zero Outsourcing" }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Left column states
  const state1LeftRef = useRef<HTMLDivElement>(null);
  const state2LeftRef = useRef<HTMLDivElement>(null);
  const state3LeftRef = useRef<HTMLDivElement>(null);

  // Right column states
  const state1RightRef = useRef<HTMLDivElement>(null);
  const state2RightRef = useRef<HTMLDivElement>(null);
  const state3RightRef = useRef<HTMLDivElement>(null);

  // Decorative & Progress
  const orbitRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const infinityPathRef = useRef<SVGPathElement>(null);
  const infinityPulseRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      const infinityPath = infinityPathRef.current;
      const infinityPulse = infinityPulseRef.current;
      if (!container || !wrapper) return;

      const totalScroll = 2400;

      // Prepare infinity path stroke dash for scroll drawing animation
      if (infinityPath) {
        const length = infinityPath.getTotalLength();
        gsap.set(infinityPath, { strokeDasharray: length, strokeDashoffset: length });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Infinity draw animation scrubbed with scroll
      if (infinityPath) {
        tl.to(infinityPath, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "none"
        }, 0);
      }

      // Orbit continuous slow rotation
      tl.to(orbitRef.current, {
        rotate: 360,
        duration: 3,
        ease: "none"
      }, 0);

      // Progress line fill
      tl.fromTo(progressLineRef.current, 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 3, ease: "none" }, 
        0
      );

      // --- STAGE 1 -> STAGE 2 (Products Focus) ---
      tl.to(state1LeftRef.current, {
        y: -40,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.8)
      .to(state1RightRef.current, {
        y: -40,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.8);

      tl.fromTo(state2LeftRef.current,
        { opacity: 0, y: 40, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        1.1
      )
      .fromTo(state2RightRef.current,
        { opacity: 0, y: 40, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        1.1
      );

      // --- STAGE 2 -> STAGE 3 (Scale & Engineering Focus) ---
      tl.to(state2LeftRef.current, {
        y: -40,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 1.9)
      .to(state2RightRef.current, {
        y: -40,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power2.inOut"
      }, 1.9);

      tl.fromTo(state3LeftRef.current,
        { opacity: 0, y: 40, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        2.2
      )
      .fromTo(state3RightRef.current,
        { opacity: 0, y: 40, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        2.2
      );

      // --- EXIT ANIMATION ---
      tl.to(wrapper, {
        scale: 0.95,
        opacity: 0.3,
        filter: "blur(3px)",
        duration: 0.6,
        ease: "power2.inOut"
      }, 2.85);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-[#F4F1EA] text-[#0B0D12] flex items-center justify-center overflow-hidden border-b border-[#0B0D12]/10"
    >
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(#0B0D12 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Centerpiece Infinity Symbol with Glow and Scroll Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden select-none">
        <svg 
          viewBox="0 0 1000 500" 
          className="w-[1100px] max-w-none sm:w-[1300px] lg:w-[1600px] xl:w-[1800px] h-auto opacity-20 md:opacity-30 transform rotate-[-2deg]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroInfinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF4A1C" />
              <stop offset="50%" stopColor="#0B0D12" />
              <stop offset="100%" stopColor="#FF4A1C" />
            </linearGradient>
            <filter id="heroInfinityGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Faint static guide track */}
          <path
            d="M 250,250 C 120,120 120,380 250,250 C 380,120 620,380 750,250 C 880,120 880,380 750,250 C 620,120 380,380 250,250 Z"
            stroke="#0B0D12"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="opacity-30"
          />

          {/* Scroll-drawn Infinity Path */}
          <path
            ref={infinityPathRef}
            d="M 250,250 C 120,120 120,380 250,250 C 380,120 620,380 750,250 C 880,120 880,380 750,250 C 620,120 380,380 250,250 Z"
            stroke="url(#heroInfinityGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#heroInfinityGlow)"
          />

          {/* Traveling Pulse Beam on infinity loop */}
          <path
            d="M 250,250 C 120,120 120,380 250,250 C 380,120 620,380 750,250 C 880,120 880,380 750,250 C 620,120 380,380 250,250 Z"
            stroke="#FF4A1C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="80 600"
            className="animate-[heroInfinityDash_10s_linear_infinite]"
          />

          {/* Concentric Node Rings */}
          <circle cx="250" cy="250" r="140" stroke="#0B0D12" strokeWidth="1" strokeDasharray="3 9" className="opacity-20" />
          <circle cx="750" cy="250" r="140" stroke="#0B0D12" strokeWidth="1" strokeDasharray="3 9" className="opacity-20" />
        </svg>
      </div>

      {/* Main pinned viewport wrapper */}
      <div 
        ref={wrapperRef}
        className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-between py-8 sm:py-12 z-10"
      >
        {/* Top Floating Badge Bar */}
        <div className="flex items-center justify-between w-full border-b border-[#0B0D12]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#0B0D12]">
              GLOBAL TECH STUDIO • PRODUCTION ENGINEERING
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#5A5E6E]">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#0B0D12]" />
              <span>12+ Countries Served</span>
            </span>
            <span className="text-[#0B0D12]/20">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B0D12]" />
              <span>SOC2 & Enterprise Ready</span>
            </span>
          </div>
        </div>

        {/* 2-Column Hero Storytelling Frame */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full min-h-[460px] sm:min-h-[500px]">
          
          {/* LEFT COLUMN: Headings & Copy State Transitions */}
          <div className="lg:col-span-7 relative h-full flex flex-col justify-center">
            
            {/* STATE 1: CORE VALUE PROPOSITION */}
            <div ref={state1LeftRef} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>Modern Software & AI Architecture</span>
              </div>

              <h1 className="text-h1 text-[#0B0D12]">
                We Engineer <br />
                Platforms That <br />
                <span className="text-[#FF4A1C]">
                  Scale Without Limits.
                </span>
              </h1>

              <p className="text-body-lg text-[#5A5E6E] max-w-xl">
                AProgra delivers full-cycle software engineering, intelligent AI workflows, and resilient cloud architectures for startups and global enterprises.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link 
                  to="/contact"
                  className="h-12 px-6 rounded bg-[#0B0D12] hover:bg-[#FF4A1C] text-white font-bold text-xs tracking-wider uppercase font-mono shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Build With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link 
                  to="/products"
                  className="h-12 px-6 rounded bg-[#FAF8F5] hover:bg-white border border-[#0B0D12]/15 text-[#0B0D12] font-bold text-xs tracking-wider uppercase font-mono transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                >
                  Explore Products
                </Link>
              </div>
              </motion.div>
            </div>

            {/* STATE 2: 40+ SHIPPED PRODUCTS STORY */}
            <div 
              ref={state2LeftRef} 
              className="absolute inset-y-0 left-0 w-full flex flex-col justify-center space-y-6 opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                <Layers className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>40+ Products In Production</span>
              </div>

              <div className="text-6xl sm:text-8xl font-bold text-[#0B0D12] leading-none font-display">
                40<span className="text-[#FF4A1C]">+</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-h2 text-[#0B0D12]">
                  Commercial SaaS & ERP Solutions Deployed Globally
                </h2>
                <p className="text-body text-[#5A5E6E] max-w-lg">
                  From institution-wide ERPs to real-time AI customer support suites, we build and operate commercial software powering organizations daily.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["EduNura", "SmartSchool ERP", "OmniChat AI", "Flowdesk", "+36 More"].map((item, idx) => (
                  <span key={idx} className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-badge text-[#0B0D12]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* STATE 3: SENIOR IN-HOUSE TALENT */}
            <div 
              ref={state3LeftRef} 
              className="absolute inset-y-0 left-0 w-full flex flex-col justify-center space-y-6 opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>Zero Outsourcing • Pure Technical Excellence</span>
              </div>

              <div className="text-h2 text-[#0B0D12]">
                Engineered In-House. <br />
                <span className="text-[#FF4A1C]">Delivered On Time.</span>
              </div>

              <p className="text-body text-[#5A5E6E] max-w-lg">
                Direct access to senior software architects, DevOps engineers, and UI/UX designers. No middlemen, no subcontracting, no compromises.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#FAF8F5] rounded border border-[#0B0D12]/15 space-y-1">
                  <div className="text-xs font-mono font-bold text-[#FF4A1C]">SLA 99.9%</div>
                  <div className="text-xs font-sans text-[#5A5E6E]">High Availability</div>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded border border-[#0B0D12]/15 space-y-1">
                  <div className="text-xs font-mono font-bold text-[#0B0D12]">&lt; 2hr Response</div>
                  <div className="text-xs font-sans text-[#5A5E6E]">Technical Support</div>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded border border-[#0B0D12]/15 space-y-1 col-span-2 sm:col-span-1">
                  <div className="text-xs font-mono font-bold text-[#FF4A1C]">100% In-House</div>
                  <div className="text-xs font-sans text-[#5A5E6E]">Full IP Ownership</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Tech Engine Canvas */}
          <div className="lg:col-span-5 relative h-full flex items-center justify-center min-h-[320px]">
            
            {/* Visual Orbit Graphic */}
            <div 
              ref={orbitRef}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#0B0D12]/10 pointer-events-none flex items-center justify-center"
            >
              <div className="absolute top-0 w-3 h-3 rounded-full bg-[#FF4A1C]" />
              <div className="absolute bottom-0 w-2 h-2 rounded-full bg-[#0B0D12]" />
              <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-[#0B0D12]/40" />
            </div>

            {/* STATE 1 RIGHT: Technical Stack Bento */}
            <div ref={state1RightRef} className="w-full space-y-3 relative z-10">
              <div className="bg-[#FAF8F5] rounded-lg border border-[#0B0D12]/15 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#0B0D12]/10">
                  <span className="text-xs font-mono font-bold text-[#0B0D12] uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#FF4A1C]" />
                    Architecture Stack
                  </span>
                  <span className="text-[10px] font-mono text-[#5A5E6E] font-semibold">Production Ready</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {TECH_TAGS.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded bg-white text-[#0B0D12] border border-[#0B0D12]/10 text-xs font-mono font-medium shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-white rounded-lg border border-[#0B0D12]/15 p-4 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#0B0D12] text-white flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#FF4A1C]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-display text-[#0B0D12]">Engineering Velocity</div>
                    <div className="text-[11px] text-[#5A5E6E] font-mono">Continuous Delivery Pipeline</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">Active</span>
              </div>
            </div>

            {/* STATE 2 RIGHT: Shipped Metrics Grid */}
            <div 
              ref={state2RightRef} 
              className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-3 opacity-0 pointer-events-none"
            >
              <div className="grid grid-cols-2 gap-3 w-full">
                {METRICS.map((m, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] rounded-lg border border-[#0B0D12]/15 p-4 space-y-1 shadow-xs">
                    <div className="text-2xl sm:text-3xl font-bold font-display text-[#0B0D12]">{m.value}</div>
                    <div className="text-xs font-bold font-display text-[#0B0D12]">{m.label}</div>
                    <div className="text-[10px] font-mono text-[#5A5E6E]">{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* STATE 3 RIGHT: In-House Workflow Diagram */}
            <div 
              ref={state3RightRef} 
              className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-3 opacity-0 pointer-events-none"
            >
              <div className="bg-[#FAF8F5] rounded-lg border border-[#0B0D12]/15 p-5 shadow-xs space-y-3 w-full">
                <div className="flex items-center justify-between pb-2 border-b border-[#0B0D12]/10 text-xs font-mono font-bold text-[#0B0D12]">
                  <span>Delivery Pipeline</span>
                  <span className="text-[#FF4A1C]">Zero Subcontract</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-[#0B0D12]/10 text-xs font-mono">
                    <span className="font-bold text-[#0B0D12]">1. Architecture & Design</span>
                    <span className="text-[#5A5E6E]">Week 1-2</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-[#0B0D12]/10 text-xs font-mono">
                    <span className="font-bold text-[#0B0D12]">2. Rapid Sprint Cycles</span>
                    <span className="text-[#5A5E6E]">Bi-weekly Releases</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-[#0B0D12]/10 text-xs font-mono">
                    <span className="font-bold text-[#0B0D12]">3. Cloud & DevOps Deploy</span>
                    <span className="text-[#5A5E6E]">Automated CI/CD</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Pinned Scroll Progress Indicator */}
        <div className="flex items-center justify-between pt-4 border-t border-[#0B0D12]/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5A5E6E]">
            <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
            <span>Scroll to Explore</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-[#0B0D12]">
            <span>01 / ARCHITECTURE</span>
            <span className="text-[#0B0D12]/20">•</span>
            <span>02 / PRODUCTS</span>
            <span className="text-[#0B0D12]/20">•</span>
            <span>03 / VELOCITY</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes heroInfinityDash {
          0% { stroke-dashoffset: 680; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
