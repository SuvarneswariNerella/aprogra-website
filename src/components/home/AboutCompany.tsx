import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCompany() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Left Visual Refs
  const vis1Ref = useRef<HTMLDivElement>(null);
  const vis2Ref = useRef<HTMLDivElement>(null);
  const vis3Ref = useRef<HTMLDivElement>(null);
  const vis4Ref = useRef<HTMLDivElement>(null);

  // Right Text Refs
  const txt1Ref = useRef<HTMLDivElement>(null);
  const txt2Ref = useRef<HTMLDivElement>(null);
  const txt3Ref = useRef<HTMLDivElement>(null);
  const txt4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const totalScroll = 3000;

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

      // Initial Setup
      gsap.set([txt2Ref.current, txt3Ref.current, txt4Ref.current], { 
        clipPath: "inset(100% 0 0 0)", 
        opacity: 0 
      });
      gsap.set(txt1Ref.current, { 
        clipPath: "inset(0% 0 0 0)", 
        opacity: 1 
      });

      gsap.set([vis2Ref.current, vis3Ref.current, vis4Ref.current], { opacity: 0 });
      gsap.set(vis1Ref.current, { opacity: 1 });

      // PHASE 1 -> PHASE 2
      tl.to(txt1Ref.current, { clipPath: "inset(100% 0 0 0)", opacity: 0, duration: 1 }, 1)
        .to(vis1Ref.current, { opacity: 0, duration: 1 }, 1)
        .to(txt2Ref.current, { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1 }, 1.5)
        .to(vis2Ref.current, { opacity: 1, duration: 1 }, 1.5);

      // PHASE 2 -> PHASE 3
      tl.to(txt2Ref.current, { clipPath: "inset(100% 0 0 0)", opacity: 0, duration: 1 }, 3)
        .to(vis2Ref.current, { opacity: 0, duration: 1 }, 3)
        .to(txt3Ref.current, { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1 }, 3.5)
        .to(vis3Ref.current, { opacity: 1, duration: 1 }, 3.5);

      // PHASE 3 -> PHASE 4
      tl.to(txt3Ref.current, { clipPath: "inset(100% 0 0 0)", opacity: 0, duration: 1 }, 5)
        .to(vis3Ref.current, { opacity: 0, duration: 1 }, 5)
        .to(txt4Ref.current, { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1 }, 5.5)
        .to(vis4Ref.current, { opacity: 1, duration: 1 }, 5.5);

      // EXIT: Halves slide towards center & fold
      tl.to(container, {
        scale: 0.96,
        opacity: 0.5,
        duration: 1
      }, 7);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-[#F4F1EA] text-[#0B0D12] overflow-hidden border-b border-[#0B0D12]/10 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full h-[80vh] grid grid-cols-1 lg:grid-cols-2 gap-12 relative items-center">
        
        {/* CRISP 1PX VERTICAL DIVIDER */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#0B0D12]/15 z-20 -translate-x-1/2" />

        {/* LEFT COLUMN: VISUAL ENGINE */}
        <div className="relative w-full h-full flex items-center justify-center p-6 bg-[#FAF8F5] rounded-lg border border-[#0B0D12]/15 shadow-xs overflow-hidden">
          
          {/* VISUAL 1: Geometric Nodes Blueprint SVG */}
          <div ref={vis1Ref} className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-opacity">
            <svg viewBox="0 0 400 300" className="w-full h-full max-h-80">
              {/* Lines */}
              <line x1="80" y1="80" x2="200" y2="150" stroke="#0B0D12" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="320" y1="80" x2="200" y2="150" stroke="#0B0D12" strokeWidth="1.5" />
              <line x1="200" y1="150" x2="120" y2="240" stroke="#0B0D12" strokeWidth="1.5" />
              <line x1="200" y1="150" x2="280" y2="240" stroke="#0B0D12" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Nodes */}
              <circle cx="80" cy="80" r="10" fill="#0B0D12" />
              <circle cx="320" cy="80" r="10" fill="#0B0D12" />
              <circle cx="200" cy="150" r="16" fill="#0B0D12" stroke="#FF4A1C" strokeWidth="3" />
              <circle cx="120" cy="240" r="12" fill="#FF4A1C" />
              <circle cx="280" cy="240" r="12" fill="#0B0D12" />

              {/* Core */}
              <circle cx="200" cy="150" r="6" fill="#FFFFFF" />
            </svg>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0B0D12] mt-2 font-bold">Architecture Blueprint</span>
          </div>

          {/* VISUAL 2: Pipeline Visualization Bars */}
          <div ref={vis2Ref} className="absolute inset-0 p-12 flex flex-col justify-center space-y-6 transition-opacity">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold font-mono text-[#0B0D12]">
                <span>DESIGN</span>
                <span>100%</span>
              </div>
              <div className="w-full h-3 rounded bg-[#0B0D12]/10 overflow-hidden">
                <div className="h-full bg-[#0B0D12] w-full rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold font-mono text-[#0B0D12]">
                <span>ENGINEER</span>
                <span>100%</span>
              </div>
              <div className="w-full h-3 rounded bg-[#0B0D12]/10 overflow-hidden">
                <div className="h-full bg-[#0B0D12] w-full rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold font-mono text-[#0B0D12]">
                <span>LAUNCH & SCALE</span>
                <span>100%</span>
              </div>
              <div className="w-full h-3 rounded bg-[#0B0D12]/10 overflow-hidden">
                <div className="h-full bg-[#FF4A1C] w-full rounded" />
              </div>
            </div>
          </div>

          {/* VISUAL 3: 12 Avatar Circles Grid */}
          <div ref={vis3Ref} className="absolute inset-0 p-8 flex items-center justify-center transition-opacity">
            <div className="grid grid-cols-4 gap-4 w-full max-w-xs">
              {[
                '#0B0D12', '#FF4A1C', '#0B0D12', '#0B0D12',
                '#0B0D12', '#0B0D12', '#FF4A1C', '#0B0D12',
                '#0B0D12', '#0B0D12', '#0B0D12', '#FF4A1C'
              ].map((color, idx) => (
                <div 
                  key={idx}
                  style={{ backgroundColor: color }}
                  className="w-12 h-12 rounded border border-[#0B0D12]/20 shadow-xs flex items-center justify-center text-white text-xs font-bold font-mono"
                >
                  {`T${idx + 1}`}
                </div>
              ))}
            </div>
          </div>

          {/* VISUAL 4: World Map SVG Outline */}
          <div ref={vis4Ref} className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-opacity">
            <svg viewBox="0 0 500 250" className="w-full h-auto opacity-90">
              <path 
                d="M150,80 Q200,50 250,80 T350,80 M100,140 Q200,180 300,140 T420,120" 
                fill="none" 
                stroke="#0B0D12" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
              />
              {/* City Dots */}
              <circle cx="280" cy="110" r="5" fill="#FF4A1C" /> {/* Hyderabad */}
              <circle cx="120" cy="90" r="4" fill="#0B0D12" /> {/* US */}
              <circle cx="220" cy="70" r="4" fill="#0B0D12" /> {/* UK */}
              <circle cx="310" cy="100" r="4" fill="#FF4A1C" /> {/* UAE */}
              <circle cx="380" cy="130" r="4" fill="#0B0D12" /> {/* SG */}
            </svg>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0B0D12] mt-2 font-bold">Global Presence</span>
          </div>

        </div>

        {/* RIGHT COLUMN: STORY TEXT PHASES */}
        <div className="relative w-full h-full flex items-center p-6">
          
          {/* PHASE 1 TEXT */}
          <div ref={txt1Ref} className="absolute inset-0 flex flex-col justify-center space-y-5">
            <span className="text-badge text-[#0B0D12]">
              Our Story
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              Not just another dev shop.
            </h2>
            <p className="text-body-lg text-[#5A5E6E]">
              AProgra was built on one belief — that exceptional software requires exceptional people working in exceptional ways. No outsourcing. No guesswork. Just craft.
            </p>
          </div>

          {/* PHASE 2 TEXT */}
          <div ref={txt2Ref} className="absolute inset-0 flex flex-col justify-center space-y-5">
            <span className="text-badge text-[#0B0D12]">
              How We Work
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              Full-stack. Full-cycle. Full-ownership.
            </h2>
            <p className="text-body-lg text-[#5A5E6E]">
              From the first discovery call to post-launch support, our in-house team owns every layer. Design. Frontend. Backend. QA. DevOps. All under one roof — your one point of contact.
            </p>
          </div>

          {/* PHASE 3 TEXT */}
          <div ref={txt3Ref} className="absolute inset-0 flex flex-col justify-center space-y-5">
            <span className="text-badge text-[#0B0D12]">
              Our Team
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              25+ specialists. Zero strangers.
            </h2>
            <p className="text-body-lg text-[#5A5E6E]">
              Designers who code. Engineers who think about UX. PMs who understand business. Everyone at AProgra is a specialist — and everyone cares about your product like it's their own.
            </p>
          </div>

          {/* PHASE 4 TEXT */}
          <div ref={txt4Ref} className="absolute inset-0 flex flex-col justify-center space-y-5">
            <span className="text-badge text-[#0B0D12]">
              Our Reach
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              Built here. Shipped everywhere.
            </h2>
            <p className="text-body text-[#5A5E6E]">
              40+ products live in market. 60+ clients across 12 countries. From Hyderabad to Houston, our software runs real businesses.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#0B0D12]/10">
              <div>
                <span className="block text-h3 text-[#0B0D12]">40+</span>
                <span className="text-caption text-[#5A5E6E]">Products Live</span>
              </div>
              <div>
                <span className="block text-h3 text-[#0B0D12]">60+</span>
                <span className="text-caption text-[#5A5E6E]">Global Clients</span>
              </div>
              <div>
                <span className="block text-h3 text-[#0B0D12]">12</span>
                <span className="text-caption text-[#5A5E6E]">Countries</span>
              </div>
              <div>
                <span className="block text-h3 text-[#FF4A1C]">25+</span>
                <span className="text-caption text-[#5A5E6E]">Team Specialists</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
