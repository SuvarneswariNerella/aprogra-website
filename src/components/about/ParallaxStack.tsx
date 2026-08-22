import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  const [activePanel, setActivePanel] = useState(0);
  const [containerHeight, setContainerHeight] = useState('360vh');

  // Dynamic Height Calculation & GSAP ScrollTrigger Configuration
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const updateContainerHeight = () => {
      const vh = window.innerHeight;
      const calculatedVh = 3.6 * vh;
      setContainerHeight(`${calculatedVh}px`);
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    const ctx = gsap.context(() => {
      // 1. Primary pinning ScrollTrigger instance
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.32) {
            setActivePanel(0);
          } else if (p < 0.62) {
            setActivePanel(1);
          } else {
            setActivePanel(2);
          }
        }
      });

      // 2. Panel 2 (Mission) reveal timeline (slides up smoothly between 20% and 46%)
      if (panel2Ref.current) {
        gsap.fromTo(
          panel2Ref.current,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top+=20% top',
              end: 'top+=46% top',
              scrub: true,
              pinSpacing: false,
            }
          }
        );
      }

      // 3. Panel 3 (Vision) reveal timeline (slides up smoothly between 48% and 74%, then stays fully pinned until 100%)
      if (panel3Ref.current) {
        gsap.fromTo(
          panel3Ref.current,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top+=48% top',
              end: 'top+=74% top',
              scrub: true,
              pinSpacing: false,
            }
          }
        );
      }
    }, containerRef);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
      ctx.revert();
    };
  }, []);

  const scrollToPanel = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerStart = rect.top + scrollTop;
    const containerH = containerRef.current.offsetHeight - window.innerHeight;

    let targetP = 0;
    if (index === 1) targetP = 0.38;
    if (index === 2) targetP = 0.74;

    const targetScroll = containerStart + targetP * containerH;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef} 
      style={{ height: containerHeight, scrollSnapType: 'y mandatory' }}
      className="relative w-full bg-[#F4F1EA] m-0 mt-0 mb-0 p-0 overflow-hidden snap-y snap-mandatory"
    >
      {/* Sticky Viewport Frame */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen min-h-[100vh] w-full overflow-hidden m-0 p-0"
      >
        {/* Removed Progress Dots Indicator per user request */}

        {/* ================= PANEL 1: ABOUT COMPANY ================= */}
        <div 
          ref={panel1Ref}
          style={{ minHeight: '100vh' }}
          className="sticky-wrapper absolute inset-0 w-full h-[100vh] min-h-screen bg-[#FAF8F5] text-[#0B0D12] z-10 flex flex-col lg:flex-row overflow-hidden snap-start snap-always"
        >
          {/* LEFT: VISUAL (50%) */}
          <div className="w-full lg:w-1/2 h-56 sm:h-64 lg:h-full bg-[#F4F1EA] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#0B0D12]/10">
            {/* Decorative Number 01 */}
            <span className="absolute bottom-[-20px] left-[-20px] font-display font-extrabold text-[160px] sm:text-[180px] lg:text-[220px] leading-none text-[#0B0D12]/[0.04] select-none pointer-events-none">
              01
            </span>

            {/* Overlapping Circles Abstract Graphic */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center">
              <div className="absolute w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full border border-[#0B0D12]/20 bg-[#0B0D12]/[0.02]" />
              <div className="absolute w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border border-[#FF4A1C]/30 bg-[#FF4A1C]/[0.04] translate-x-8 -translate-y-6" />
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-white border border-[#0B0D12]/10 shadow-lg -translate-x-6 translate-y-8 flex items-center justify-center">
                <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#FF4A1C]" />
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT (50%) */}
          <ScrollReveal className="w-full lg:w-1/2 h-full p-6 sm:p-10 lg:p-16 flex flex-col justify-center space-y-5 lg:space-y-6 overflow-y-auto">
            <span className="text-badge text-[#FF4A1C]">
              Who We Are
            </span>

            <h2 className="text-h2 text-[#0B0D12]">
              Not just another dev shop.
            </h2>

            <p className="text-body-lg text-[#0B0D12]/70">
              AProgra was built on a single belief — that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.
            </p>

            {/* 3 Feature Rows */}
            <div className="space-y-3.5 pt-1">
              <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                <div className="text-h4 text-[#0B0D12]">In-house only</div>
                <div className="text-caption text-[#0B0D12]/60">Every line of code written by our team</div>
              </div>

              <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                <div className="text-h4 text-[#0B0D12]">End-to-end ownership</div>
                <div className="text-caption text-[#0B0D12]/60">Design through deployment</div>
              </div>

              <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                <div className="text-h4 text-[#0B0D12]">Hyderabad-based</div>
                <div className="text-caption text-[#0B0D12]/60">Working with clients across 12 countries</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ================= PANEL 2: MISSION ================= */}
        <div 
          ref={panel2Ref}
          style={{ minHeight: '100vh' }}
          className="sticky-wrapper absolute inset-0 w-full h-[100vh] min-h-screen bg-[#0B0D12] text-[#FAF8F5] z-20 flex flex-col lg:flex-row overflow-hidden shadow-2xl border-t border-white/10 snap-start snap-always"
        >
          {/* LEFT: TEXT (50%) */}
          <div className="w-full lg:w-1/2 h-full p-6 sm:p-10 lg:p-16 flex flex-col justify-center space-y-5 lg:space-y-6 order-2 lg:order-1 overflow-y-auto">
            <span className="text-badge text-[#FF4A1C]">
              Our Mission
            </span>

            <h2 className="text-h2 text-[#FAF8F5]">
              Build software that actually matters.
            </h2>

            <p className="text-body-lg text-[#FAF8F5]/70">
              Our mission is simple — engineer products that solve real problems, for real people, with real business impact. We measure success not in lines of code but in businesses transformed.
            </p>

            {/* Mission Statement Box */}
            <div className="mt-4 sm:mt-6 pl-4 sm:pl-6 border-l-2 border-[#FF4A1C] py-2">
              <p className="text-h3 text-[#FAF8F5] leading-snug font-normal">
                "To make world-class engineering accessible to every visionary who dares to build."
              </p>
            </div>
          </div>

          {/* RIGHT: VISUAL (50%) */}
          <div className="w-full lg:w-1/2 h-56 sm:h-64 lg:h-full bg-[#131722] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-l border-white/10 order-1 lg:order-2">
            {/* Decorative Number 02 */}
            <span className="absolute bottom-[-20px] right-[-20px] font-display font-extrabold text-[160px] sm:text-[180px] lg:text-[220px] leading-none text-white/[0.03] select-none pointer-events-none">
              02
            </span>

            {/* Target / Bullseye Visual */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center">
              <div className="absolute w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-white/10" />
              <div className="absolute w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full border border-white/15 bg-white/[0.02]" />
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border border-[#FF4A1C]/30 bg-[#FF4A1C]/[0.05]" />
              <div className="absolute w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#FF4A1C] flex items-center justify-center shadow-lg shadow-[#FF4A1C]/30">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= PANEL 3: VISION ================= */}
        <div 
          ref={panel3Ref}
          style={{ minHeight: '100vh' }}
          className="sticky-wrapper absolute inset-0 w-full h-[100vh] min-h-screen bg-[#FAF8F5] text-[#0B0D12] z-30 flex flex-col lg:flex-row overflow-hidden shadow-2xl border-t border-[#0B0D12]/10 snap-start snap-always"
        >
          {/* LEFT: VISUAL (50%) - Alternating layout matching Panel 1 */}
          <div className="w-full lg:w-1/2 h-56 sm:h-64 lg:h-full bg-[#F4F1EA] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#0B0D12]/10">
            {/* Decorative Number 03 */}
            <span className="absolute bottom-[-20px] left-[-20px] font-display font-extrabold text-[160px] sm:text-[180px] lg:text-[220px] leading-none text-[#0B0D12]/[0.04] select-none pointer-events-none">
              03
            </span>

            {/* Glowing Infinity / Futuristic Visual */}
            <div className="relative flex items-center justify-center">
              {/* Central Technical Shield */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 flex items-center justify-center bg-white rounded-lg border border-[#0B0D12]/10 shadow-lg p-6 group">
                <div className="absolute -top-3 -right-3 px-2.5 py-0.5 bg-[#0B0D12] text-white text-badge rounded">
                  2030 Vision
                </div>

                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded bg-[#FAF8F5] border border-[#0B0D12]/10 flex items-center justify-center relative overflow-hidden">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#0B0D12] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 12c-2-2.5-4-4-6.5-4A4.5 4.5 0 0 0 1 12.5 4.5 4.5 0 0 0 5.5 17c2.5 0 4.5-1.5 6.5-4zm0 0c2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 18.5 7c-2.5 0-4.5 1.5-6.5 4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT (50%) */}
          <div className="w-full lg:w-1/2 h-full p-6 sm:p-10 lg:p-16 flex flex-col justify-center space-y-5 lg:space-y-6 overflow-y-auto">
            <span className="text-badge text-[#FF4A1C]">
              Our Vision
            </span>

            <h2 className="text-h2 text-[#0B0D12]">
              The engineering partner for the next generation of global tech leaders.
            </h2>

            <p className="text-body-lg text-[#0B0D12]/70">
              We envision a world where founders and enterprises can build, scale, and transform their digital capabilities with zero compromise on engineering standards or velocity.
            </p>

            {/* 3 Vision Feature Rows (Matching Panel 1 layout) */}
            <div className="space-y-3.5 pt-1">
              <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                <div className="text-h4 text-[#0B0D12]">Global Reach</div>
                <div className="text-caption text-[#0B0D12]/60">Serving visionaries across 12+ countries with scale-ready architecture</div>
              </div>

              <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                <div className="text-h4 text-[#0B0D12]">Agentic & Autonomous Speed</div>
                <div className="text-caption text-[#0B0D12]/60">Integrating cutting-edge AI workflows with human craftsmanship</div>
              </div>

              <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                <div className="text-h4 text-[#0B0D12]">Infinite Scale</div>
                <div className="text-caption text-[#0B0D12]/60">Architected from day one to handle millions of active users</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

