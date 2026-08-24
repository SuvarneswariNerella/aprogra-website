import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useAboutPage } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxStack() {
  const { aboutPage } = useAboutPage();
  const { panelWhoWeAre, panelMission, panelVision } = aboutPage;

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
          {/* LEFT: VISUAL (50%) - Panel 1 (Image on Left) */}
          <div className="w-full lg:w-1/2 h-56 sm:h-64 lg:h-full bg-[#F4F1EA] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#0B0D12]/10">
            {/* Decorative Number 01 */}
            <span className="absolute bottom-[-20px] left-[-20px] font-display font-extrabold text-[160px] sm:text-[180px] lg:text-[220px] leading-none text-[#0B0D12]/[0.04] select-none pointer-events-none">
              01
            </span>

            <img 
              src={panelWhoWeAre.coverImageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"} 
              alt={panelWhoWeAre.headline || "AProgra Engineering Team"} 
              className="w-full h-full object-cover relative z-10"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/40 via-transparent to-transparent z-15 pointer-events-none" />
          </div>

          {/* RIGHT: TEXT (50%) */}
          <ScrollReveal className="w-full lg:w-1/2 h-full p-6 sm:p-10 lg:p-16 flex flex-col justify-center space-y-5 lg:space-y-6 overflow-y-auto">
            <span className="text-badge text-[#FF4A1C]">
              {panelWhoWeAre.badge || 'Who We Are'}
            </span>

            <h2 className="text-h2 text-[#0B0D12]">
              {panelWhoWeAre.headline || 'Not just another dev shop.'}
            </h2>

            <p className="text-body-lg text-[#0B0D12]/70">
              {panelWhoWeAre.description || 'AProgra was built on a single belief — that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.'}
            </p>

            {/* Feature Rows */}
            <div className="space-y-3.5 pt-1">
              {panelWhoWeAre.highlightRows && panelWhoWeAre.highlightRows.length > 0 ? (
                panelWhoWeAre.highlightRows.map((row, idx) => (
                  <div key={row.id || idx} className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                    <div className="text-h4 text-[#0B0D12]">{row.title}</div>
                    <div className="text-caption text-[#0B0D12]/60">{row.description}</div>
                  </div>
                ))
              ) : (
                <>
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
                </>
              )}
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
              {panelMission.badge || 'Our Mission'}
            </span>

            <h2 className="text-h2 text-[#FAF8F5]">
              {panelMission.headline || 'Build software that actually matters.'}
            </h2>

            <p className="text-body-lg text-[#FAF8F5]/70">
              {panelMission.description || 'Our mission is simple — engineer products that solve real problems, for real people, with real business impact. We measure success not in lines of code but in businesses transformed.'}
            </p>

            {/* Mission Statement Box */}
            <div className="mt-4 sm:mt-6 pl-4 sm:pl-6 border-l-2 border-[#FF4A1C] py-2">
              <p className="text-h3 text-[#FAF8F5] leading-snug font-normal">
                {panelMission.missionQuote || '"To make world-class engineering accessible to every visionary who dares to build."'}
              </p>
            </div>
          </div>

          {/* RIGHT: VISUAL (50%) - Panel 2 (Image on Right) */}
          <div className="w-full lg:w-1/2 h-56 sm:h-64 lg:h-full bg-[#131722] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-l border-white/10 order-1 lg:order-2">
            {/* Decorative Number 02 */}
            <span className="absolute bottom-[-20px] right-[-20px] font-display font-extrabold text-[160px] sm:text-[180px] lg:text-[220px] leading-none text-white/[0.03] select-none pointer-events-none">
              02
            </span>

            <img 
              src={panelMission.coverImageUrl || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"} 
              alt={panelMission.headline || "Engineering Mission"} 
              className="w-full h-full object-cover relative z-10"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/60 via-transparent to-transparent z-15 pointer-events-none" />
          </div>
        </div>

        {/* ================= PANEL 3: VISION ================= */}
        <div 
          ref={panel3Ref}
          style={{ minHeight: '100vh' }}
          className="sticky-wrapper absolute inset-0 w-full h-[100vh] min-h-screen bg-[#FAF8F5] text-[#0B0D12] z-30 flex flex-col lg:flex-row overflow-hidden shadow-2xl border-t border-[#0B0D12]/10 snap-start snap-always"
        >
          {/* LEFT: VISUAL (50%) - Panel 3 (Image on Left) */}
          <div className="w-full lg:w-1/2 h-56 sm:h-64 lg:h-full bg-[#F4F1EA] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#0B0D12]/10">
            {/* Decorative Number 03 */}
            <span className="absolute bottom-[-20px] left-[-20px] font-display font-extrabold text-[160px] sm:text-[180px] lg:text-[220px] leading-none text-[#0B0D12]/[0.04] select-none pointer-events-none">
              03
            </span>

            <img 
              src={panelVision.coverImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"} 
              alt={panelVision.headline || "AProgra Future Vision"} 
              className="w-full h-full object-cover relative z-10"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/40 via-transparent to-transparent z-15 pointer-events-none" />
          </div>

          {/* RIGHT: TEXT (50%) */}
          <div className="w-full lg:w-1/2 h-full p-6 sm:p-10 lg:p-16 flex flex-col justify-center space-y-5 lg:space-y-6 overflow-y-auto">
            <span className="text-badge text-[#FF4A1C]">
              {panelVision.badge || 'Our Vision'}
            </span>

            <h2 className="text-h2 text-[#0B0D12]">
              {panelVision.headline || 'Empowering the next generation of digital empires.'}
            </h2>

            <p className="text-body-lg text-[#0B0D12]/70">
              {panelVision.description || 'We envision a world where ambitious software ventures scale frictionlessly from idea to global impact, powered by autonomous multi-agent engineering pods and mathematically sound design systems.'}
            </p>

            {/* Vision Feature Rows */}
            <div className="space-y-3.5 pt-1">
              {panelVision.highlightRows && panelVision.highlightRows.length > 0 ? (
                panelVision.highlightRows.map((row, idx) => (
                  <div key={row.id || idx} className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                    <div className="text-h4 text-[#0B0D12]">{row.title}</div>
                    <div className="text-caption text-[#0B0D12]/60">{row.description}</div>
                  </div>
                ))
              ) : (
                <>
                  <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                    <div className="text-h4 text-[#0B0D12]">Global Reach</div>
                    <div className="text-caption text-[#0B0D12]/60">Serving visionaries across 12+ countries with scale-ready architecture</div>
                  </div>

                  <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                    <div className="text-h4 text-[#0B0D12]">Agentic &amp; Autonomous Speed</div>
                    <div className="text-caption text-[#0B0D12]/60">Integrating cutting-edge AI workflows with human craftsmanship</div>
                  </div>

                  <div className="pl-4 sm:pl-5 border-l-2 border-[#0B0D12] py-1 space-y-0.5">
                    <div className="text-h4 text-[#0B0D12]">Infinite Scale</div>
                    <div className="text-caption text-[#0B0D12]/60">Architected from day one to handle millions of active users</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

