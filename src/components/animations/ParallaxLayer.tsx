import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // Relative shift factor. e.g. 0.5 = move slower, -0.5 = move reverse, 1 = standard shift
  direction?: 'vertical' | 'horizontal';
  className?: string;
  as?: React.ElementType;
}

export default function ParallaxLayer({
  children,
  speed = 0.4,
  direction = 'vertical',
  className,
  as: Component = 'div',
  ...rest
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLElement>(null);
  const Tag = Component as any;

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    // Respect user's prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const shiftAmount = speed * 120; // Calculate pixel shift distance based on speed

      if (direction === 'vertical') {
        gsap.to(el, {
          y: -shiftAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      } else {
        gsap.to(el, {
          x: -shiftAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <Tag ref={layerRef} className={cn('will-change-transform', className)} {...rest}>
      {children}
    </Tag>
  );
}

