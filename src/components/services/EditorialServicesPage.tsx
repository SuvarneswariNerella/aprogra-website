import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import ServicesHero from './ServicesHero';
import ServicesKpiGrid from './ServicesKpiGrid';
import HorizontalServiceShowcase from './HorizontalServiceShowcase';
import TestimonialsServices from './TestimonialsServices';
import EditorialScrollProgress from './EditorialScrollProgress';
import { initGlobalScrollReveal } from '@/utils/scrollReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useServices, useServicesPage } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialServicesPage() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  // Dynamic CMS Data from Strapi
  const { content: pageContent } = useServicesPage();
  const { services: hookServices } = useServices();
  const displayServices = pageContent.services && pageContent.services.length > 0 ? pageContent.services : hookServices;

  // Initialize Lenis smooth scroll and Global Scroll Reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const revealCtx = initGlobalScrollReveal(pageRef.current || document.body, {
      y: 26,
      duration: 0.8,
      stagger: 0.1,
      start: 'top 85%',
      ease: 'power2.out',
      once: true,
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      if (revealCtx) revealCtx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [displayServices]);

  const closingCta = pageContent.closingCta;

  return (
    <div 
      ref={pageRef}
      className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] selection:bg-[#0B0D12] selection:text-white relative font-sans antialiased"
    >
      {/* 1. Left side scroll progress line */}
      <EditorialScrollProgress 
        activeSectionIndex={activeSectionIndex}
        totalSections={displayServices.length}
      />

      {/* 2. HERO SECTION: Editable left content/points + Replaceable right image */}
      <ServicesHero 
        hero={pageContent.hero}
      />

      {/* 3. CARDS SECTION: Top heading + Dynamic Flip Cards Grid */}
      <ServicesKpiGrid 
        cards={pageContent.cards}
        flipCards={pageContent.flipCards}
      />

      {/* 4. FEATURES SECTION: Top Navigation Tabs + Dynamic Left-Content Right-Image Cards */}
      <HorizontalServiceShowcase 
        features={pageContent.features}
        services={displayServices}
        onActiveChange={setActiveSectionIndex}
      />

      {/* 5. VERIFIED CLIENT TESTIMONIALS (Connected to Global Testimonials Single Entity) */}
      <TestimonialsServices />

      {/* 6. CLOSING CTA: Fully Editable "Let's build what's next" */}
      <section className="relative z-10 w-full py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#0B0D12]/10">
        <ScrollReveal 
          className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8" 
          stagger={0.12}
        >
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#0B0D12]/15 text-xs font-mono text-[#0B0D12] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{closingCta.badge}</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-[#0B0D12]">
              {closingCta.headline}{' '}
              <span className="text-[#FF4A1C]">{closingCta.highlight}</span>
            </h2>
            <p className="text-base sm:text-lg text-[#5A5E6E] font-normal leading-relaxed max-w-2xl mx-auto">
              {closingCta.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to={closingCta.primaryCtaUrl || '/contact'}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0B0D12] text-[#FAF8F5] text-sm font-semibold hover:bg-[#FF4A1C] transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>{closingCta.primaryCtaText || 'Schedule Architecture Review'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to={closingCta.secondaryCtaUrl || '/products'}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-[#0B0D12]/20 text-[#0B0D12] text-sm font-semibold hover:bg-[#FAF8F5] transition-all duration-200 shadow-xs cursor-pointer"
            >
              <span>{closingCta.secondaryCtaText || 'Explore Our Products'}</span>
            </Link>
          </div>

        </ScrollReveal>
      </section>

    </div>
  );
}
