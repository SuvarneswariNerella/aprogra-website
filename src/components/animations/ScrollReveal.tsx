import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  yOffset?: number;
}

export default function ScrollReveal({ 
  children, 
  className = '',
  stagger = 0.15,
  yOffset = 40
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get all direct DOM children that are actual elements
    const elements = Array.from(container.children);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 70%', // Trigger when the element is 30% up from the bottom of the screen
          once: true
        }
      });

      tl.fromTo(
        elements,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, stagger: stagger, duration: 1.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, yOffset]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
