import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCompany() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Left Side Visuals
  const vis1Ref = useRef<HTMLDivElement>(null);
  const vis1ContentRef = useRef<HTMLDivElement>(null);
  const vis2Ref = useRef<HTMLDivElement>(null);
  const vis3Ref = useRef<HTMLDivElement>(null);
  const vis4Ref = useRef<HTMLDivElement>(null);

  // Right Side Text
  const txt1Ref = useRef<HTMLDivElement>(null);
  const txt1ContentRef = useRef<HTMLDivElement>(null);
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

      // ENTRANCE ANIMATION FOR PHASE 1
      gsap.fromTo(vis1ContentRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 30%", once: true }
        }
      );

      gsap.fromTo(txt1ContentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.4,
          scrollTrigger: { trigger: container, start: "top 30%", once: true }
        }
      );

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
        <div className="relative w-full h-full flex items-center justify-center bg-[#FAF8F5] rounded-xl border border-[#0B0D12]/15 shadow-sm overflow-hidden">
          
          {/* VISUAL 1: Full-Size Container Image */}
          <div ref={vis1Ref} className="absolute inset-0 transition-opacity">
            <div ref={vis1ContentRef} className="w-full h-full opacity-0">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
                alt="Engineering Operations & Craft"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* VISUAL 2: Full-Size Container Image */}
          <div ref={vis2Ref} className="absolute inset-0 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" 
              alt="Full-Stack Product Lifecycle"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* VISUAL 3: Full-Size Container Image */}
          <div ref={vis3Ref} className="absolute inset-0 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
              alt="In-House Engineering Specialists"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* VISUAL 4: Full-Size Container Image */}
          <div ref={vis4Ref} className="absolute inset-0 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" 
              alt="Global Operations & Shipped Software"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>

        {/* RIGHT COLUMN: STORY TEXT PHASES */}
        <div className="relative w-full h-full flex items-center p-6">
          
          {/* PHASE 1 TEXT */}
          <div ref={txt1Ref} className="absolute inset-0 flex flex-col justify-center">
            <div ref={txt1ContentRef} className="space-y-5 opacity-0">
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
