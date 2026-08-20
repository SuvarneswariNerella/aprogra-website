import { useEffect, useRef, DependencyList } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGlobalScrollReveal, ScrollRevealOptions } from '@/utils/scrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type { ScrollRevealOptions };

/**
 * Hook to apply global scroll-triggered reveals across all marked elements
 * inside a component or the full page.
 */
export function useGlobalScrollReveal<T extends HTMLElement = HTMLDivElement>(
  deps: DependencyList = [],
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current || (typeof document !== 'undefined' ? document.body : null);
    if (!el) return;

    // Allow DOM to settle before scanning elements
    const timer = setTimeout(() => {
      const ctx = initGlobalScrollReveal(el, options);
      ScrollTrigger.refresh();

      return () => {
        if (ctx) ctx.revert();
      };
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, deps);

  return containerRef;
}

/**
 * Hook to apply a scroll-triggered reveal to a single DOM element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    y = 28,
    x = 0,
    duration = 0.75,
    delay = 0,
    start = 'top 85%',
    ease = 'power2.out',
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          x,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, x, duration, delay, start, ease, once]);

  return ref;
}

export default useScrollReveal;
