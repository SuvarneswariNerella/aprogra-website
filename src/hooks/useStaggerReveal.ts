import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface StaggerRevealOptions {
  selector?: string;
  stagger?: number;
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  start?: string;
  ease?: string;
  once?: boolean;
}

/**
 * Utility function to trigger staggered animations on children of a container element when entering viewport
 */
export function staggerRevealElements(
  container: HTMLElement,
  options: StaggerRevealOptions = {}
): gsap.Context {
  const {
    selector,
    stagger = 0.12,
    y = 35,
    x = 0,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
    ease = 'power3.out',
    once = true,
  } = options;

  const ctx = gsap.context(() => {
    const items = selector
      ? container.querySelectorAll(selector)
      : Array.from(container.children).filter(
          (child) => child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
        );

    if (!items || items.length === 0) return;

    gsap.fromTo(
      items,
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
        stagger,
        ease,
        scrollTrigger: {
          trigger: container,
          start,
          once,
        },
      }
    );
  }, container);

  return ctx;
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: StaggerRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    selector,
    stagger = 0.12,
    y = 35,
    x = 0,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
    ease = 'power3.out',
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = staggerRevealElements(el, {
      selector,
      stagger,
      y,
      x,
      duration,
      delay,
      start,
      ease,
      once,
    });

    return () => ctx.revert();
  }, [selector, stagger, y, x, duration, delay, start, ease, once]);

  return ref;
}

export default useStaggerReveal;

