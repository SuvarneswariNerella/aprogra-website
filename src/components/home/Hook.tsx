import AnimatedText from '../ui/AnimatedText';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Hook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configure scrollerProxy for window viewport sync
      ScrollTrigger.scrollerProxy(window, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            window.scrollTo(0, value);
          }
          return window.scrollY;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      // Reveal & Parallax text bounded to section element height
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: window,
              start: 'top 80%',
              end: () => `+=${sectionRef.current?.offsetHeight || window.innerHeight}`,
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={sectionRef} 
      data-snap-section
      className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-[#FAF8F5] text-[#0B0D12] border-b border-[#0B0D12]/10"
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={textRef}
        className="max-w-5xl mx-auto text-center relative z-10 space-y-4"
      >
        <AnimatedText 
          text="Most agencies pick a lane." 
          className="text-2xl sm:text-4xl md:text-5xl font-medium text-[#5A5E6E] mb-4 tracking-tight font-sans" 
        />
        <div className="relative inline-block">
          <AnimatedText 
            text="We engineer without limits." 
            className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-[#0B0D12] tracking-tight font-display relative z-10" 
          />
        </div>
      </div>
    </section>
  );
}
