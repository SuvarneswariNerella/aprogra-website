import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Infinity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgInfinityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current || !containerRef.current) return;
      
      const words = gsap.utils.toArray<HTMLElement>(textRef.current.children).filter(Boolean);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Background scale up
      if (bgInfinityRef.current) {
        tl.fromTo(bgInfinityRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1.2, opacity: 0.15, duration: 1 },
          0
        );
      }

      // Words reveal sequentially starting from COMPLETE INVISIBILITY
      if (words.length > 0) {
        tl.fromTo(words, 
          { opacity: 0, y: 50, scale: 0.8, filter: 'blur(12px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            stagger: 0.12,
            duration: 1,
            ease: "power2.out",
          },
          0.2
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const phrase1 = "We started with a simple belief — that";
  const phrase2 = "possibilities should have";
  const phrase3 = "no limits.";

  return (
    <section ref={containerRef} data-snap-section data-no-snap="true" data-interactive-section="true" className="h-screen min-h-screen flex items-center justify-center px-6 bg-white text-navy relative overflow-hidden border-b border-navy/5">
      <div ref={bgInfinityRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Infinity className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-electric/15 blur-2xl" />
      </div>
      
      <div className="max-w-5xl relative z-10 text-center">
        <h1 ref={textRef} className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-snug md:leading-tight">
          {phrase1.split(" ").map((word, i) => (
            <span key={`p1-${i}`} className="inline-block mr-3 md:mr-5 opacity-0">{word}</span>
          ))}
          <br className="hidden md:inline" />
          {phrase2.split(" ").map((word, i) => (
            <span key={`p2-${i}`} className="inline-block mr-3 md:mr-5 opacity-0">{word}</span>
          ))}
          <span className="inline-block opacity-0 text-gradient font-black underline decoration-electric/30 underline-offset-8">
            {phrase3}
          </span>
        </h1>
      </div>
    </section>
  );
}
