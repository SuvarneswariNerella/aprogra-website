import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function RippleCanvasLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let ripples: { x: number, y: number, r: number, maxR: number, alpha: number }[] = [];
    let mouse = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
      if (dist > 15) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          r: 5,
          maxR: 80 + Math.random() * 80,
          alpha: 0.15 + Math.random() * 0.05
        });
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const p = ripples[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        ctx.strokeStyle = `rgba(11, 13, 18, ${p.alpha})`;
        ctx.lineWidth = Math.max(1, 2 * (1 - p.r / p.maxR));
        ctx.stroke();

        p.r += 2.5;
        p.alpha -= 0.003;

        if (p.alpha <= 0 || p.r >= p.maxR) {
          ripples.splice(i, 1);
        }
      }

      requestAnimationFrame(draw);
    };

    const animFrame = requestAnimationFrame(draw);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none opacity-50"
    />
  );
}

export default function WhyAprogra() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted && containerRef.current ? containerRef : undefined,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        }
      });

      const elements = gsap.utils.toArray('.statement-group') as Element[];
      const totalSteps = elements.length - 1;
      
      // Progress line
      tl.to(lineRef.current, { scaleY: 1, ease: 'none', duration: totalSteps }, 0);

      // Setup initial states
      elements.forEach((el, i) => {
        gsap.set(el, { 
          y: i * 200, 
          opacity: i === 0 ? 1 : 0.2, 
          scale: i === 0 ? 1 : 0.8, 
          filter: i === 0 ? 'blur(0px)' : 'blur(8px)' 
        });
      });

      for (let step = 0; step < totalSteps; step++) {
        const startTime = step;
        
        for (let i = 0; i < elements.length; i++) {
          const relativePos = i - (step + 1);
          
          let y = relativePos * 200;
          let opacity = 0.25;
          let scale = 0.8;
          let blur = 8;

          if (relativePos === 0) {
            opacity = 1;
            scale = 1;
            blur = 0;
          } else if (Math.abs(relativePos) > 1) {
            opacity = 0;
            scale = 0.6;
            blur = 16;
            y = relativePos * 200; 
          }

          tl.to(elements[i], {
            y: y,
            opacity: opacity,
            scale: scale,
            filter: `blur(${blur}px)`,
            duration: 1,
            ease: 'power2.inOut'
          }, startTime);
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      data-snap-section
      data-no-snap="true"
      data-interactive-section="true"
      
      className="h-screen min-h-screen w-full bg-[#F4F1EA] text-[#0B0D12] flex items-center justify-center overflow-hidden relative border-b border-[#0B0D12]/10"
    >
      {/* Canvas Ripples */}
      <RippleCanvasLight />

      {/* Progress Line */}
      <div className="absolute left-6 md:left-16 top-1/4 h-1/2 w-[2px] bg-[#0B0D12]/10 hidden md:block z-10">
        <div ref={lineRef} className="w-full h-full bg-[#FF4A1C] origin-top scale-y-0" />
      </div>
      
      {/* Text Container */}
      <div ref={textContainerRef} className="w-full max-w-5xl mx-auto px-6 relative z-10 h-full flex items-center justify-center">
        
        <div className="statement-group absolute w-full text-center flex flex-col items-center">
          <h2 className="main-text text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-extrabold tracking-tighter text-[#0B0D12] leading-none font-display">
            100%
          </h2>
          <p className="sub-text mt-4 md:mt-8 text-lg sm:text-2xl md:text-3xl font-bold text-[#FF4A1C] tracking-wider uppercase font-mono">
            In-house Talent
          </p>
        </div>

        <div className="statement-group absolute w-full text-center flex flex-col items-center">
          <h2 className="main-text text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-extrabold tracking-tighter text-[#0B0D12] leading-none font-display">
            Infinite
          </h2>
          <p className="sub-text mt-4 md:mt-8 text-lg sm:text-2xl md:text-3xl font-bold text-[#FF4A1C] tracking-wider uppercase font-mono">
            Possibilities
          </p>
        </div>

        <div className="statement-group absolute w-full text-center flex flex-col items-center">
          <h2 className="main-text text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-extrabold tracking-tighter text-[#0B0D12] leading-none font-display">
            One
          </h2>
          <p className="sub-text mt-4 md:mt-8 text-lg sm:text-2xl md:text-3xl font-bold text-[#FF4A1C] tracking-wider uppercase font-mono">
            Partner
          </p>
        </div>

      </div>
    </section>
  );
}
