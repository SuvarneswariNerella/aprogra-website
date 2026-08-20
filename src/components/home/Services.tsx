import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const totalCards = 7;
      const totalWidth = (totalCards - 1) * 100; // in vw

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalWidth * 12}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * totalCards),
              totalCards - 1
            );
            setActiveCardIndex(index);
          }
        }
      });

      // Horizontal Scroll Animation
      tl.to(track, {
        x: `-${(totalCards - 1) * 100}vw`,
        ease: "none"
      }, 0);

      // Progress bar fill
      tl.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-[#F4F1EA] overflow-hidden border-b border-[#0B0D12]/10"
    >
      {/* STICKY HEADER */}
      <div className="absolute top-6 inset-x-6 sm:inset-x-12 z-30 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 shadow-xs text-xs font-bold uppercase tracking-wider text-[#0B0D12] font-mono">
          <span>Our Services</span>
        </div>

        <div className="px-3.5 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 shadow-xs text-xs font-bold uppercase tracking-wider text-[#0B0D12] font-mono">
          <span>0{Math.min(activeCardIndex + 1, 6)} / 06</span>
        </div>
      </div>

      {/* HORIZONTAL CARDS TRACK */}
      <div 
        ref={trackRef}
        className="flex h-full w-[700vw] will-change-transform"
      >
        
        {/* CARD 1: Product Engineering */}
        <div className="w-[100vw] h-full shrink-0 bg-[#F4F1EA] p-6 sm:p-12 md:p-20 flex items-center justify-center relative">
          <div className="absolute top-8 left-12 text-[200px] sm:text-[260px] font-bold font-display text-[#0B0D12]/5 select-none pointer-events-none leading-none">
            01
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-12">
            <div className="space-y-5">
              <span className="px-2.5 py-0.5 rounded bg-[#0B0D12] text-white text-badge">
                Core Service
              </span>
              <h2 className="text-h2 text-[#0B0D12]">
                Product Engineering
              </h2>
              <p className="text-body-lg text-[#5A5E6E]">
                We don't just build features — we engineer products. From architecture decisions to deployment pipelines, every choice we make is deliberate, scalable, and built to last.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Discovery", "Architecture", "Development", "QA", "Launch"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-label-mono text-[#0B0D12]">
                    • {tag}
                  </span>
                ))}
              </div>

              <Link to="/services" className="inline-flex items-center gap-2 text-[#0B0D12] text-badge hover:text-[#FF4A1C] transition-colors pt-4">
                <span>Explore Service</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </Link>
            </div>

            {/* Right SVG Diagram */}
            <div className="bg-[#FAF8F5] p-8 rounded-lg border border-[#0B0D12]/15 shadow-sm flex flex-col justify-center space-y-4">
              <div className="text-xs font-mono uppercase text-[#0B0D12] font-bold">Lifecycle Pipeline</div>
              <div className="flex items-center justify-between gap-2 border-b border-[#0B0D12]/10 pb-4">
                {["Idea", "Design", "Build", "Test", "Deploy"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded bg-[#0B0D12] text-white font-bold text-xs flex items-center justify-center font-mono">
                      {i + 1}
                    </div>
                    <span className="text-[10px] font-semibold text-[#0B0D12] font-mono">{step}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#5A5E6E] font-mono">Automated CI/CD with 99.9% uptime guarantees.</p>
            </div>
          </div>
        </div>

        {/* CARD 2: Mobile Development */}
        <div className="w-[100vw] h-full shrink-0 bg-[#FAF8F5] p-6 sm:p-12 md:p-20 flex items-center justify-center relative border-l border-[#0B0D12]/10">
          <div className="absolute top-8 left-12 text-[200px] sm:text-[260px] font-bold font-display text-[#0B0D12]/5 select-none pointer-events-none leading-none">
            02
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-12">
            <div className="space-y-5">
              <span className="px-2.5 py-0.5 rounded bg-[#0B0D12] text-white text-badge">
                Mobile First
              </span>
              <h2 className="text-h2 text-[#0B0D12]">
                Mobile Development
              </h2>
              <p className="text-body-lg text-[#5A5E6E]">
                Flutter, React Native, native iOS and Android. We build mobile apps that feel native, perform flawlessly, and users actually love using.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Flutter", "React Native", "iOS", "Android", "Cross-platform"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded bg-[#F4F1EA] border border-[#0B0D12]/15 text-label-mono text-[#0B0D12]">
                    • {tag}
                  </span>
                ))}
              </div>

              <Link to="/services" className="inline-flex items-center gap-2 text-[#0B0D12] text-badge hover:text-[#FF4A1C] transition-colors pt-4">
                <span>Explore Mobile Solutions</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </Link>
            </div>

            {/* Right Phone Frames */}
            <div className="flex justify-center items-center gap-6 perspective-[800px]">
              <div className="w-36 h-64 bg-[#0B0D12] rounded-xl p-2 shadow-md transform -rotate-6 border-2 border-[#0B0D12] flex flex-col justify-between">
                <div className="w-12 h-1.5 bg-[#5A5E6E] rounded-full mx-auto my-1" />
                <div className="h-full bg-[#FAF8F5] rounded p-2 flex flex-col gap-2">
                  <div className="w-10 h-2 bg-[#0B0D12] rounded" />
                  <div className="w-full h-12 bg-[#F4F1EA] rounded border border-[#0B0D12]/10" />
                  <div className="w-full h-12 bg-[#F4F1EA] rounded border border-[#0B0D12]/10" />
                </div>
              </div>

              <div className="w-36 h-64 bg-[#0B0D12] rounded-xl p-2 shadow-md transform rotate-6 border-2 border-[#0B0D12] flex flex-col justify-between">
                <div className="w-12 h-1.5 bg-[#5A5E6E] rounded-full mx-auto my-1" />
                <div className="h-full bg-[#FAF8F5] rounded p-2 flex flex-col gap-2">
                  <div className="w-10 h-2 bg-[#FF4A1C] rounded" />
                  <div className="w-full h-12 bg-[#F4F1EA] rounded border border-[#0B0D12]/10" />
                  <div className="w-full h-12 bg-[#F4F1EA] rounded border border-[#0B0D12]/10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Web Development */}
        <div className="w-[100vw] h-full shrink-0 bg-[#F4F1EA] p-6 sm:p-12 md:p-20 flex items-center justify-center relative border-l border-[#0B0D12]/10">
          <div className="absolute top-8 left-12 text-[200px] sm:text-[260px] font-bold font-display text-[#0B0D12]/5 select-none pointer-events-none leading-none">
            03
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-12">
            <div className="space-y-5">
              <span className="px-2.5 py-0.5 rounded bg-[#0B0D12] text-white text-badge">
                Web Excellence
              </span>
              <h2 className="text-h2 text-[#0B0D12]">
                Web Development
              </h2>
              <p className="text-body-lg text-[#5A5E6E]">
                From marketing sites to complex SaaS platforms — we build for performance, accessibility, and scale. React, Next.js, Node.js, and beyond.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-label-mono text-[#0B0D12]">
                    • {tag}
                  </span>
                ))}
              </div>

              <Link to="/services" className="inline-flex items-center gap-2 text-[#0B0D12] text-badge hover:text-[#FF4A1C] transition-colors pt-4">
                <span>Build Modern Web</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </Link>
            </div>

            {/* Right Browser Frame Simulation */}
            <div className="bg-[#FAF8F5] rounded-lg border border-[#0B0D12]/15 shadow-sm overflow-hidden">
              <div className="bg-[#F4F1EA] px-4 py-2.5 border-b border-[#0B0D12]/10 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0B0D12]/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0B0D12]/10" />
                </div>
                <div className="bg-white px-3 py-0.5 rounded text-label-mono text-[#5A5E6E] w-full max-w-xs ml-2 border border-[#0B0D12]/10">
                  https://aprogra.com/app
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-5 bg-[#0B0D12]/10 rounded w-3/4" />
                <div className="h-4 bg-[#0B0D12]/5 rounded w-1/2" />
                <div className="h-20 bg-white rounded border border-[#0B0D12]/10 p-4 flex items-center justify-between">
                  <span className="text-label-mono font-bold text-[#0B0D12]">Lighthouse Score: 100/100</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: AI & Automation */}
        <div className="w-[100vw] h-full shrink-0 bg-[#FAF8F5] p-6 sm:p-12 md:p-20 flex items-center justify-center relative border-l border-[#0B0D12]/10">
          <div className="absolute top-8 left-12 text-[200px] sm:text-[260px] font-bold font-display text-[#0B0D12]/5 select-none pointer-events-none leading-none">
            04
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-12">
            <div className="space-y-5">
              <span className="px-2.5 py-0.5 rounded bg-[#0B0D12] text-white text-badge">
                Intelligent Systems
              </span>
              <h2 className="text-h2 text-[#0B0D12]">
                AI & Automation
              </h2>
              <p className="text-body-lg text-[#5A5E6E]">
                Custom AI agents, ML pipelines, LLM integrations, and workflow automation that turns repetitive work into zero work. Built for your specific business logic.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["LLMs", "Custom Agents", "Python", "ML", "Automation"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded bg-[#F4F1EA] border border-[#0B0D12]/15 text-label-mono text-[#0B0D12]">
                    • {tag}
                  </span>
                ))}
              </div>

              <Link to="/services" className="inline-flex items-center gap-2 text-[#0B0D12] text-badge hover:text-[#FF4A1C] transition-colors pt-4">
                <span>Deploy AI Agents</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </Link>
            </div>

            {/* Neural Network SVG Visual */}
            <div className="bg-white p-8 rounded-lg border border-[#0B0D12]/15 shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 300 200" className="w-full h-48">
                <circle cx="50" cy="100" r="10" fill="#0B0D12" />
                <circle cx="150" cy="50" r="10" fill="#0B0D12" />
                <circle cx="150" cy="150" r="10" fill="#FF4A1C" />
                <circle cx="250" cy="100" r="10" fill="#0B0D12" />

                <line x1="50" y1="100" x2="150" y2="50" stroke="#0B0D12" strokeWidth="1.5" />
                <line x1="50" y1="100" x2="150" y2="150" stroke="#0B0D12" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="50" x2="250" y2="100" stroke="#0B0D12" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="150" x2="250" y2="100" stroke="#FF4A1C" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* CARD 5: UI/UX Design */}
        <div className="w-[100vw] h-full shrink-0 bg-[#F4F1EA] p-6 sm:p-12 md:p-20 flex items-center justify-center relative border-l border-[#0B0D12]/10">
          <div className="absolute top-8 left-12 text-[200px] sm:text-[260px] font-bold font-display text-[#0B0D12]/5 select-none pointer-events-none leading-none">
            05
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-12">
            <div className="space-y-5">
              <span className="px-2.5 py-0.5 rounded bg-[#0B0D12] text-white text-badge">
                Design Systems
              </span>
              <h2 className="text-h2 text-[#0B0D12]">
                UI/UX Design
              </h2>
              <p className="text-body-lg text-[#5A5E6E]">
                We design with intent. Not just beautiful — functional, accessible, and conversion-optimized. Every screen is a decision. We make sure each one is the right one.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Figma", "Prototyping", "Design Systems", "User Research", "Accessibility"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-label-mono text-[#0B0D12]">
                    • {tag}
                  </span>
                ))}
              </div>

              <Link to="/services" className="inline-flex items-center gap-2 text-[#0B0D12] text-badge hover:text-[#FF4A1C] transition-colors pt-4">
                <span>View Design Systems</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </Link>
            </div>

            {/* Figma Component Swatches */}
            <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#0B0D12]/15 shadow-sm space-y-4">
              <div className="text-badge text-[#5A5E6E]">Design Tokens & UI Swatches</div>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded bg-[#0B0D12] flex items-center justify-center text-white text-[10px] font-mono">Ink</div>
                <div className="w-12 h-12 rounded bg-[#FF4A1C] flex items-center justify-center text-white text-[10px] font-mono">Accent</div>
                <div className="w-12 h-12 rounded bg-[#F4F1EA] border border-[#0B0D12]/20 flex items-center justify-center text-[#0B0D12] text-[10px] font-mono">Paper</div>
              </div>
              <div className="p-3 rounded bg-white border border-[#0B0D12]/10 flex justify-between items-center text-label-mono font-bold">
                <span>Button Component</span>
                <button className="px-4 py-1.5 rounded bg-[#0B0D12] text-white font-bold text-xs">Click Me</button>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 6: Cloud & DevOps */}
        <div className="w-[100vw] h-full shrink-0 bg-[#FAF8F5] p-6 sm:p-12 md:p-20 flex items-center justify-center relative border-l border-[#0B0D12]/10">
          <div className="absolute top-8 left-12 text-[200px] sm:text-[260px] font-bold font-display text-[#0B0D12]/5 select-none pointer-events-none leading-none">
            06
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-12">
            <div className="space-y-5">
              <span className="px-2.5 py-0.5 rounded bg-[#0B0D12] text-white text-badge">
                Infrastructure
              </span>
              <h2 className="text-h2 text-[#0B0D12]">
                Cloud & DevOps
              </h2>
              <p className="text-body-lg text-[#5A5E6E]">
                We architect cloud infrastructure that scales with your business. CI/CD pipelines, containerization, monitoring, and zero-downtime deployments — handled.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded bg-[#F4F1EA] border border-[#0B0D12]/15 text-label-mono text-[#0B0D12]">
                    • {tag}
                  </span>
                ))}
              </div>

              <Link to="/services" className="inline-flex items-center gap-2 text-[#0B0D12] text-badge hover:text-[#FF4A1C] transition-colors pt-4">
                <span>Explore Infrastructure</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </Link>
            </div>

            {/* Infrastructure Diagram */}
            <div className="bg-white p-6 rounded-lg border border-[#0B0D12]/15 shadow-sm grid grid-cols-2 gap-3">
              <div className="p-4 rounded bg-[#FAF8F5] border border-[#0B0D12]/10 text-center text-label-mono font-bold text-[#0B0D12]">EC2 / Compute</div>
              <div className="p-4 rounded bg-[#FAF8F5] border border-[#0B0D12]/10 text-center text-label-mono font-bold text-[#0B0D12]">S3 Storage</div>
              <div className="p-4 rounded bg-[#FAF8F5] border border-[#0B0D12]/10 text-center text-label-mono font-bold text-[#0B0D12]">RDS Postgres</div>
              <div className="p-4 rounded bg-[#FAF8F5] border border-[#0B0D12]/10 text-center text-label-mono font-bold text-[#0B0D12]">CloudFront CDN</div>
            </div>
          </div>
        </div>

        {/* FINAL CARD: Full Dark TAKEOVER */}
        <div className="w-[100vw] h-full shrink-0 bg-[#0B0D12] text-[#F4F1EA] p-6 sm:p-12 md:p-20 flex flex-col items-center justify-center relative text-center space-y-8">
          <h2 className="text-h2 max-w-3xl text-white">
            Ready to build something remarkable?
          </h2>

          <div className="flex flex-col items-center gap-4">
            <Link 
              to="/contact"
              className="h-12 px-8 rounded bg-[#FF4A1C] text-white hover:bg-[#FF4A1C]/90 text-badge transition-colors flex items-center gap-3 shadow-xs"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link to="/services" className="text-caption text-[#F4F1EA]/70 hover:text-white underline pt-2">
              or explore all services
            </Link>
          </div>
        </div>

      </div>

      {/* BOTTOM PROGRESS LINE */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-[#0B0D12]/10 z-30">
        <div 
          ref={progressBarRef}
          className="h-full bg-[#FF4A1C] w-full origin-left scale-x-0" 
        />
      </div>
    </section>
  );
}
