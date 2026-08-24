import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HomeStatement } from '@/lib/strapi';

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

export default function WhyAprogra({ whyStatements = [] }: { whyStatements?: HomeStatement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stmt0Ref = useRef<HTMLDivElement>(null);
  const stmt1Ref = useRef<HTMLDivElement>(null);
  const stmt2Ref = useRef<HTMLDivElement>(null);

  const statements = whyStatements && whyStatements.length >= 3 
    ? whyStatements 
    : [
        { id: "1", mainText: "100%", subText: "In-house Talent" },
        { id: "2", mainText: "Infinite", subText: "Possibilities" },
        { id: "3", mainText: "One", subText: "Partner" }
      ];

  const stmt0 = statements[0] || { mainText: "100%", subText: "In-house Talent" };
  const stmt1 = statements[1] || { mainText: "Infinite", subText: "Possibilities" };
  const stmt2 = statements[2] || { mainText: "One", subText: "Partner" };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const totalScroll = 2400;

      // Initial explicit setup: Statement 0 is visible & centered, 1 & 2 are hidden below
      gsap.set(stmt0Ref.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set(stmt1Ref.current, { y: 60, opacity: 0, scale: 0.9, filter: "blur(10px)" });
      gsap.set(stmt2Ref.current, { y: 60, opacity: 0, scale: 0.9, filter: "blur(10px)" });
      gsap.set(lineRef.current, { scaleY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Progress line on the left scales from top to bottom over the entire sequence
      tl.to(lineRef.current, { scaleY: 1, ease: 'none', duration: 6 }, 0);

      // --- PHASE 1 (t = 0 to 1.0): HOLD STATEMENT 0 (100% In-house Talent) ---
      // User clearly reads "100% In-house Talent"

      // --- PHASE 2 (t = 1.0 to 2.2): TRANSITION STATEMENT 0 -> STATEMENT 1 ---
      tl.to(stmt0Ref.current, {
        y: -60,
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power2.inOut"
      }, 1.0)
      .to(stmt1Ref.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.inOut"
      }, 1.0);

      // --- PHASE 3 (t = 2.2 to 3.4): HOLD STATEMENT 1 (Infinite Possibilities) ---
      // User clearly reads "Infinite Possibilities"

      // --- PHASE 4 (t = 3.4 to 4.6): TRANSITION STATEMENT 1 -> STATEMENT 2 ---
      tl.to(stmt1Ref.current, {
        y: -60,
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power2.inOut"
      }, 3.4)
      .to(stmt2Ref.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.inOut"
      }, 3.4);

      // --- PHASE 5 (t = 4.6 to 5.8): HOLD STATEMENT 2 (One Partner) ---
      // User clearly reads "One Partner"

      // --- EXIT POLISH (t = 5.8 to 6.0) ---
      tl.to(container, {
        scale: 0.98,
        opacity: 0.9,
        duration: 0.2
      }, 5.8);

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
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 h-full flex items-center justify-center">
        
        {/* STATEMENT 0 */}
        <div ref={stmt0Ref} className="absolute w-full text-center flex flex-col items-center pointer-events-none">
          <h2 className="main-text text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-extrabold tracking-tighter text-[#0B0D12] leading-none font-display">
            {stmt0.mainText}
          </h2>
          <p className="sub-text mt-4 md:mt-8 text-lg sm:text-2xl md:text-3xl font-bold text-[#FF4A1C] tracking-wider uppercase font-mono">
            {stmt0.subText}
          </p>
        </div>

        {/* STATEMENT 1 */}
        <div ref={stmt1Ref} className="absolute w-full text-center flex flex-col items-center pointer-events-none">
          <h2 className="main-text text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-extrabold tracking-tighter text-[#0B0D12] leading-none font-display">
            {stmt1.mainText}
          </h2>
          <p className="sub-text mt-4 md:mt-8 text-lg sm:text-2xl md:text-3xl font-bold text-[#FF4A1C] tracking-wider uppercase font-mono">
            {stmt1.subText}
          </p>
        </div>

        {/* STATEMENT 2 */}
        <div ref={stmt2Ref} className="absolute w-full text-center flex flex-col items-center pointer-events-none">
          <h2 className="main-text text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-extrabold tracking-tighter text-[#0B0D12] leading-none font-display">
            {stmt2.mainText}
          </h2>
          <p className="sub-text mt-4 md:mt-8 text-lg sm:text-2xl md:text-3xl font-bold text-[#FF4A1C] tracking-wider uppercase font-mono">
            {stmt2.subText}
          </p>
        </div>

      </div>
    </section>
  );
}
