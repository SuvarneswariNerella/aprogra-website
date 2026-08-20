import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Infinity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} data-snap-section className="h-screen min-h-screen flex flex-col justify-center px-6 md:px-24 bg-white text-navy relative pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 flex items-center justify-center">
         <Infinity className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-electric animate-pulse blur-3xl" />
      </div>
      <div className="max-w-5xl relative z-10 xl:pl-20 space-y-4">
        <h1 className="text-5xl md:text-8xl font-extrabold text-navy tracking-tight">
           We don't offer services.
        </h1>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-gradient">
           We engineer possibilities.
        </h1>
        <p className="pt-6 text-xl md:text-2xl text-muted max-w-2xl opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
          From scalable web platforms to autonomous AI agents, we build the technology that powers your ambition.
        </p>
      </div>
    </section>
  );
}
