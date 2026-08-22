import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  ease?: string;
  once?: boolean;
  scale?: number;
}

/**
 * Checks if the user has requested reduced motion in their OS / browser settings.
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Global GSAP ScrollTrigger reveal initialization utility.
 * Scans for `.reveal-fade-up`, `.reveal-group`, `.reveal-heading`, `.reveal-card`,
 * or `[data-reveal]` / `[data-reveal-group]` elements and creates subtle, high-performance
 * scroll-triggered entrance animations.
 *
 * @param root Target DOM container or Document (defaults to document.body)
 * @param defaultOptions Default animation parameters
 * @returns GSAP Context object with a .revert() cleanup method
 */
export function initGlobalScrollReveal(
  root: HTMLElement | Document = typeof document !== 'undefined' ? document.body : (null as unknown as HTMLElement),
  defaultOptions: ScrollRevealOptions = {}
): gsap.Context | null {
  if (typeof window === 'undefined' || !root) return null;

  const {
    y: defaultY = 24,
    duration: defaultDuration = 0.75,
    ease: defaultEase = 'power2.out',
    start: defaultStart = 'top 85%',
    once: defaultOnce = true,
    stagger: defaultStagger = 0.1,
  } = defaultOptions;

  const reducedMotion = isReducedMotion();

  // If reduced motion is requested, immediately ensure all elements are visible
  if (reducedMotion) {
    const allRevealElements = root.querySelectorAll(
      '.reveal-fade-up, .reveal-group, .reveal-heading, .reveal-card, [data-reveal], [data-reveal-group]'
    );
    allRevealElements.forEach((el) => {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 });
      const children = el.querySelectorAll('.reveal-item, [data-reveal-item]');
      if (children.length > 0) {
        gsap.set(children, { opacity: 1, y: 0, x: 0, scale: 1 });
      }
    });
    return null;
  }

  const ctx = gsap.context(() => {
    // 1. Group / Staggered reveals (.reveal-group, [data-reveal-group])
    const groupContainers = root.querySelectorAll<HTMLElement>(
      '.reveal-group, [data-reveal-group]'
    );

    groupContainers.forEach((container) => {
      // Find explicit items or direct children
      let items = container.querySelectorAll<HTMLElement>(
        '.reveal-item, [data-reveal-item], .stagger-reveal'
      );
      if (items.length === 0) {
        items = container.querySelectorAll<HTMLElement>(':scope > *');
      }
      if (items.length === 0) return;

      const groupY = parseFloat(container.dataset.revealY || '') || defaultY;
      const groupDuration = parseFloat(container.dataset.revealDuration || '') || defaultDuration;
      const groupStagger = parseFloat(container.dataset.revealStagger || '') || defaultStagger;
      const groupDelay = parseFloat(container.dataset.revealDelay || '') || 0;
      const groupStart = container.dataset.revealStart || defaultStart;
      const groupEase = container.dataset.revealEase || defaultEase;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: groupY,
        },
        {
          opacity: 1,
          y: 0,
          duration: groupDuration,
          stagger: groupStagger,
          delay: groupDelay,
          ease: groupEase,
          scrollTrigger: {
            trigger: container,
            start: groupStart,
            end: 'top 75%',
            scrub: true,
          },
        }
      );
    });

    // 2. Individual headings (.reveal-heading, [data-reveal-heading])
    const headings = root.querySelectorAll<HTMLElement>(
      '.reveal-heading, [data-reveal-heading]'
    );

    headings.forEach((heading) => {
      // Skip if heading is already managed by a parent reveal-group
      if (heading.closest('.reveal-group, [data-reveal-group]')) return;

      const headingY = parseFloat(heading.dataset.revealY || '') || (defaultY + 6);
      const headingDuration = parseFloat(heading.dataset.revealDuration || '') || (defaultDuration + 0.1);
      const headingDelay = parseFloat(heading.dataset.revealDelay || '') || 0;
      const headingStart = heading.dataset.revealStart || defaultStart;
      const headingEase = heading.dataset.revealEase || 'power3.out';

      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: headingY,
        },
        {
          opacity: 1,
          y: 0,
          duration: headingDuration,
          delay: headingDelay,
          ease: headingEase,
          scrollTrigger: {
            trigger: heading,
            start: 'top 95%',
            end: 'top 75%',
            scrub: true,
          },
        }
      );
    });

    // 3. Card & Visual components (.reveal-card, [data-reveal-card])
    const cards = root.querySelectorAll<HTMLElement>(
      '.reveal-card, [data-reveal-card]'
    );

    cards.forEach((card) => {
      if (card.closest('.reveal-group, [data-reveal-group]')) return;

      const cardY = parseFloat(card.dataset.revealY || '') || (defaultY + 8);
      const cardScale = parseFloat(card.dataset.revealScale || '') || 0.98;
      const cardDuration = parseFloat(card.dataset.revealDuration || '') || (defaultDuration + 0.15);
      const cardDelay = parseFloat(card.dataset.revealDelay || '') || 0.05;
      const cardStart = card.dataset.revealStart || defaultStart;
      const cardEase = card.dataset.revealEase || 'power2.out';

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: cardY,
          scale: cardScale,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: cardDuration,
          delay: cardDelay,
          ease: cardEase,
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'top 75%',
            scrub: true,
          },
        }
      );
    });

    // 4. General individual fade-up elements (.reveal-fade-up, [data-reveal])
    const standaloneElements = root.querySelectorAll<HTMLElement>(
      '.reveal-fade-up, [data-reveal]'
    );

    standaloneElements.forEach((el) => {
      if (
        el.closest('.reveal-group, [data-reveal-group]') ||
        el.matches('.reveal-heading, [data-reveal-heading], .reveal-card, [data-reveal-card]')
      ) {
        return;
      }

      const itemY = parseFloat(el.dataset.revealY || '') || defaultY;
      const itemDuration = parseFloat(el.dataset.revealDuration || '') || defaultDuration;
      const itemDelay = parseFloat(el.dataset.revealDelay || '') || 0;
      const itemStart = el.dataset.revealStart || defaultStart;
      const itemEase = el.dataset.revealEase || defaultEase;

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: itemY,
        },
        {
          opacity: 1,
          y: 0,
          duration: itemDuration,
          delay: itemDelay,
          ease: itemEase,
          scrollTrigger: {
            trigger: el,
            start: itemStart === 'top 85%' ? 'top 95%' : itemStart,
            end: 'top 75%',
            scrub: true,
          },
        }
      );
    });

    // 5. Global Auto-Discovery for True Scroll Scrub Reveal
    // Automatically find all content sections and apply a physics-based scrub to their text elements
    const allSections = root.querySelectorAll<HTMLElement>('main section:not(:first-of-type)');
    
    allSections.forEach((section) => {
      // Skip sections that opt-out or manage their own complex pinning
      if (
        section.hasAttribute('data-no-reveal') ||
        section.classList.contains('reveal-group') ||
        section.hasAttribute('data-reveal-group')
      ) {
        return;
      }

      // Deep query for actual semantic content elements inside this section
      // This ensures we animate the text/content, not just the layout wrappers
      const itemsToReveal = section.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, h5, h6, p, img, button, .card, blockquote, .reveal-target'
      );

      // Filter out elements that shouldn't be animated individually
      const filteredItems = Array.from(itemsToReveal).filter(item => {
         const hasNoReveal = item.hasAttribute('data-no-reveal') || item.closest('[data-no-reveal]');
         const isAbsolute = item.classList.contains('absolute') || window.getComputedStyle(item).position === 'absolute';
         const isManualReveal = item.matches('.reveal-item, [data-reveal], .reveal-fade-up, .reveal-heading, .reveal-card') || item.closest('.reveal-group, [data-reveal-group]');
         const isTooSmall = item.tagName === 'IMG' && (item.clientWidth < 40 && item.clientWidth > 0); // Skip tiny decorative icons if they are imgs
         
         // Prevent double-animation: If this item is inside another item that is ALSO being revealed in this batch
         const hasRevealedAncestor = Array.from(itemsToReveal).some(ancestor => ancestor !== item && ancestor.contains(item) && !ancestor.classList.contains('absolute'));

         return !hasNoReveal && !isAbsolute && !isManualReveal && !isTooSmall && !hasRevealedAncestor;
      });

      if (filteredItems.length === 0) return;

      // Create a Timeline for the section.
      // The timeline's progress is scrubbed by the section's scroll position.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 30%', // By the time section top reaches 30% from top of viewport, animation completes
          scrub: true,    // True scroll scrub: 1:1 instantaneous, no smoothing/lag
        }
      });

      // Add all filtered content elements to this timeline with a stagger.
      // Because they are in an array, GSAP will naturally stagger them in DOM order:
      // (e.g. Heading -> Paragraph -> Button)
      tl.fromTo(
        filteredItems,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15, // 0.15 seconds of timeline progress between each element
          ease: 'none',  // Linear ease is best for scrubbed animations
        }
      );
    });

  }, root);

  return ctx;
}

export default initGlobalScrollReveal;
