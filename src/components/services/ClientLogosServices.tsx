import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROW1_CLIENTS = [
  'Noddyy',
  'Balcony Originals',
  'Coventry Strikers',
  'Aguatise',
  'PowerTech',
  'Star Circle',
  'CyberSecure',
];

const ROW2_CLIENTS = [
  'EduNura',
  'SmartSchool',
  'Flowdesk',
  'Nexus Workspace',
  'samai.guru',
  'OmniChat',
  'AProgra Tools',
];

const ROW3_CLIENTS = [...ROW1_CLIENTS];

interface CardProps {
  name: string;
}

function MagneticClientCard({ name }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.25;
    const deltaY = (e.clientY - centerY) * 0.25;

    setTransform({
      x: Math.max(-10, Math.min(10, deltaX)),
      y: Math.max(-10, Math.min(10, deltaY)),
      scale: 1.06,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${transform.scale})`,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.3s ease-out',
      }}
      className={`w-[190px] h-[72px] shrink-0 bg-white border rounded-xl flex items-center justify-center p-4 cursor-default text-center font-space font-semibold text-sm transition-colors duration-200 ${
        isHovered
          ? 'border-[#3B4FCF] text-[#3B4FCF] shadow-[0_8px_24px_rgba(59,79,207,0.15)]'
          : 'border-[#E4E8FF] text-[#374151] shadow-sm'
      }`}
    >
      <span>{name}</span>
    </div>
  );
}

export default function ClientLogosServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  const count1Ref = useRef<HTMLSpanElement>(null);
  const count2Ref = useRef<HTMLSpanElement>(null);
  const count3Ref = useRef<HTMLSpanElement>(null);
  const count4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Horizontal Split Wipe Entry
      gsap.fromTo(
        leftCurtainRef.current,
        { xPercent: 0 },
        {
          xPercent: -100,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        rightCurtainRef.current,
        { xPercent: 0 },
        {
          xPercent: 100,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Counter Animations
      const counters = [
        { ref: count1Ref, val: 60, suffix: '+' },
        { ref: count2Ref, val: 12, suffix: '' },
        { ref: count3Ref, val: 40, suffix: '+' },
        { ref: count4Ref, val: 7, suffix: '+' },
      ];

      counters.forEach((item) => {
        if (!item.ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.val,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          },
          onUpdate: () => {
            if (item.ref.current) {
              item.ref.current.textContent = `${Math.floor(obj.val)}${item.suffix}`;
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-[#0D0F1C] py-20 overflow-hidden border-b border-[#E4E8FF] m-0 mt-0 mb-0"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      {/* Horizontal Split Wipe Curtains */}
      <div
        ref={leftCurtainRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#F7F8FF] border-r border-[#E4E8FF] z-20 pointer-events-none"
      />
      <div
        ref={rightCurtainRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#F7F8FF] border-l border-[#E4E8FF] z-20 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-12">
        {/* TOP HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#3B4FCF]/10 border border-[#3B4FCF]/20 text-[#3B4FCF] font-semibold text-xs uppercase tracking-widest font-mono">
            Trusted Partners
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[52px] font-bold tracking-tight text-[#0D0F1C] font-space leading-tight">
            Companies That Chose to Build with Us
          </h2>
          <p className="text-base sm:text-[17px] text-[#6B7280] font-normal leading-relaxed">
            From early-stage startups to scaling enterprises.
          </p>
        </div>

        {/* 3 MARQUEE ROWS */}
        <div className="space-y-4 overflow-hidden py-2">
          {/* Row 1: Scrolls LEFT (35s) */}
          <div className="flex gap-5 animate-marquee-fast hover:[animation-play-state:paused]">
            {[...ROW1_CLIENTS, ...ROW1_CLIENTS, ...ROW1_CLIENTS, ...ROW1_CLIENTS].map(
              (client, idx) => (
                <MagneticClientCard key={`r1-${idx}`} name={client} />
              )
            )}
          </div>

          {/* Row 2: Scrolls RIGHT (45s) */}
          <div className="flex gap-5 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...ROW2_CLIENTS, ...ROW2_CLIENTS, ...ROW2_CLIENTS, ...ROW2_CLIENTS].map(
              (client, idx) => (
                <MagneticClientCard key={`r2-${idx}`} name={client} />
              )
            )}
          </div>

          {/* Row 3: Scrolls LEFT (40s) */}
          <div className="flex gap-5 animate-marquee-medium hover:[animation-play-state:paused]">
            {[...ROW3_CLIENTS, ...ROW3_CLIENTS, ...ROW3_CLIENTS, ...ROW3_CLIENTS].map(
              (client, idx) => (
                <MagneticClientCard key={`r3-${idx}`} name={client} />
              )
            )}
          </div>
        </div>

        {/* BOTTOM COUNTER ROW */}
        <div className="pt-10 border-t border-[#E4E8FF] grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
          <div className="space-y-1">
            <span
              ref={count1Ref}
              className="block text-4xl sm:text-[48px] font-bold text-[#3B4FCF] font-space"
            >
              0+
            </span>
            <span className="text-sm font-semibold text-[#6B7280] font-mono uppercase tracking-wider">
              CLIENTS
            </span>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-[#E4E8FF]">
            <span
              ref={count2Ref}
              className="block text-4xl sm:text-[48px] font-bold text-[#3B4FCF] font-space"
            >
              0
            </span>
            <span className="text-sm font-semibold text-[#6B7280] font-mono uppercase tracking-wider">
              COUNTRIES
            </span>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-[#E4E8FF]">
            <span
              ref={count3Ref}
              className="block text-4xl sm:text-[48px] font-bold text-[#3B4FCF] font-space"
            >
              0+
            </span>
            <span className="text-sm font-semibold text-[#6B7280] font-mono uppercase tracking-wider">
              PRODUCTS
            </span>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-[#E4E8FF]">
            <span
              ref={count4Ref}
              className="block text-4xl sm:text-[48px] font-bold text-[#3B4FCF] font-space"
            >
              0+
            </span>
            <span className="text-sm font-semibold text-[#6B7280] font-mono uppercase tracking-wider">
              YEARS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
