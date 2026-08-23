import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck } from 'lucide-react';
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

  // Dynamic CMS Data
  const { content: pageContent, isLoading: isPageLoading } = useServicesPage();
  const { services, isLoading: isServicesLoading } = useServices();

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

    // Initialize global scroll reveal utility across the services page
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
  }, [services]);

  const closingCta = pageContent.closingCta;

  return (
    <div 
      ref={pageRef}
      className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] selection:bg-[#0B0D12] selection:text-white relative font-sans antialiased"
    >
      {/* 1. Left side scroll progress line */}
      <EditorialScrollProgress 
        activeSectionIndex={activeSectionIndex}
        totalSections={services.length}
      />

      {/* 2. HERO INTRO SECTION - Asymmetric 2-Column with Service Stack */}
      <ServicesHero 
        hero={pageContent.hero}
        services={services}
      />

      {/* 3. KPI-CARD GRID OVERVIEW (5 Core Disciplines) */}
      <ServicesKpiGrid 
        kpi={pageContent.kpi}
        services={services}
      />

      {/* 4. PINNED HORIZONTAL SCROLL SERVICES SHOWCASE */}
      <HorizontalServiceShowcase 
        showcase={pageContent.showcase}
        services={services}
        onActiveChange={setActiveSectionIndex}
      />

      {/* 5. VERIFIED CLIENT SOCIAL PROOF */}
      <TestimonialsServices />

      {/* 6. CLOSING CTA BAND */}
      <section className="relative z-10 w-full py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#0B0D12]/10">
        <ScrollReveal 
          className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8" 
          stagger={0.12}
        >
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#0B0D12]/15 text-xs font-mono text-[#0B0D12] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{closingCta.badge}</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-[#0B0D12]">
              {closingCta.headline}
            </h2>
            <p className="text-base sm:text-lg text-[#5A5E6E] max-w-xl mx-auto font-sans leading-relaxed">
              {closingCta.subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {closingCta.primaryCta?.url.startsWith('http') ? (
              <a
                href={closingCta.primaryCta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0B0D12] hover:bg-[#FF4A1C] text-white font-mono text-sm font-bold tracking-wide uppercase shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{closingCta.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </a>
            ) : (
              <Link
                to={closingCta.primaryCta?.url || '/contact'}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0B0D12] hover:bg-[#FF4A1C] text-white font-mono text-sm font-bold tracking-wide uppercase shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{closingCta.primaryCta?.label || 'Start a Project'}</span>
                <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
              </Link>
            )}

            {closingCta.secondaryCta?.url.startsWith('http') ? (
              <a
                href={closingCta.secondaryCta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-gray-50 border border-[#0B0D12]/15 text-[#0B0D12] font-mono text-sm font-bold tracking-wide uppercase transition-all shadow-2xs cursor-pointer"
              >
                <span>{closingCta.secondaryCta.label}</span>
              </a>
            ) : (
              <Link
                to={closingCta.secondaryCta?.url || '/products'}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-gray-50 border border-[#0B0D12]/15 text-[#0B0D12] font-mono text-sm font-bold tracking-wide uppercase transition-all shadow-2xs cursor-pointer"
              >
                <span>{closingCta.secondaryCta?.label || 'Explore Products'}</span>
              </Link>
            )}
          </div>

          {/* Bottom Security & Standards Note */}
          <div className="pt-8 border-t border-[#0B0D12]/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#5A5E6E] gap-4">
            <span>{closingCta.copyright}</span>
            <span>{closingCta.standardsNote}</span>
          </div>

        </ScrollReveal>
      </section>

    </div>
  );
}
