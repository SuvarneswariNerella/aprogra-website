import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InfinityMeaning() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
          }
        });
        
        gsap.fromTo(textRef.current, 
          { opacity: 0, scale: 0.9, y: 30 },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=100%",
              scrub: true,
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-snap-section data-no-snap="true" data-interactive-section="true" className="h-screen min-h-screen w-full bg-offwhite text-navy relative flex items-center justify-center overflow-hidden border-y border-navy/5">
      
      {/* SVG Infinity */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 50" className="w-[150vw] h-[150vw] md:w-[70vw] md:h-[70vw] max-w-none transform rotate-[-10deg]">
          <defs>
            <linearGradient id="infinityGradientAbout" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B5BFF" />
              <stop offset="100%" stopColor="#E01E8B" />
            </linearGradient>
            <filter id="glowAbout">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            ref={pathRef}
            d="M 25,25 C 10,10 10,40 25,25 C 40,10 60,40 75,25 C 90,10 90,40 75,25 C 60,10 40,40 25,25 Z"
            fill="none"
            stroke="url(#infinityGradientAbout)"
            strokeWidth="0.8"
            strokeLinecap="round"
            filter="url(#glowAbout)"
          />
        </svg>
      </div>

      <div ref={textRef} className="relative z-10 max-w-4xl px-6 text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-navy">
          The Meaning of <span className="text-gradient">Infinity</span>
        </h2>
        <p className="text-xl md:text-3xl text-muted leading-relaxed font-medium">
          It represents our core philosophy: there are no dead ends, only new directions. Technology is an endless loop of iteration, improvement, and possibility. We build systems that evolve seamlessly.
        </p>
      </div>
    </section>
  );
}
