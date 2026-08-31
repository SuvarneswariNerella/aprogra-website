import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServicesHeroSection, DEFAULT_SERVICES_PAGE_CONTENT } from '@/lib/strapi';

interface ServicesHeroProps {
  hero?: ServicesHeroSection;
}

export default function ServicesHero({ 
  hero = DEFAULT_SERVICES_PAGE_CONTENT.hero, 
}: ServicesHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Left Column Staggered Entrance
      if (leftColRef.current) {
        const leftElements = leftColRef.current.querySelectorAll('.hero-stagger');
        gsap.fromTo(
          leftElements,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power2.out',
            delay: 0.05,
          }
        );
      }

      // 2. Right Column Image Frame Fade & Scale
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, scale: 0.96, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToCards = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('services-cards-overview');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroImageSrc = hero.heroImageUrl || 'https://picsum.photos/seed/834844751/1200/800';

  return (
    <section 
      ref={containerRef}
      className="relative z-10 w-full min-h-[calc(100vh-76px)] bg-[#F4F1EA] text-[#0B0D12] pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 md:px-12 border-b border-[#0B0D12]/10 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Subtle Tech Dot Grid */}
      <div className="absolute inset-0 pointer-events-none -z-0 opacity-40">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #0B0D12 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Fully Editable Content, Value Points, CTA Buttons            */}
        {/* ========================================================================= */}
        <div ref={leftColRef} className="lg:col-span-7 space-y-8 text-left">
          
          {/* Eyebrow Badge */}
          <div className="hero-stagger inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/15 text-xs font-mono font-bold tracking-wider text-[#0B0D12] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{hero.badge}</span>
          </div>

          {/* Main Headline */}
          <div className="hero-stagger space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B0D12] font-display leading-[1.08]">
              {hero.headline}{' '}
              <span className="text-[#FF4A1C] inline-block">{hero.highlight}</span>
            </h1>
            <p className="text-base sm:text-lg text-[#5A5E6E] font-normal leading-relaxed max-w-2xl pt-2">
              {hero.description}
            </p>
          </div>

          {/* Value Propositions / Key Points */}
          <div className="hero-stagger space-y-3 pt-1 border-t border-[#0B0D12]/10">
            {hero.point1 && (
              <div className="flex items-center gap-3 text-sm sm:text-base font-medium text-[#0B0D12]">
                <div className="w-5 h-5 rounded-full bg-[#FF4A1C]/10 text-[#FF4A1C] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{hero.point1}</span>
              </div>
            )}
            {hero.point2 && (
              <div className="flex items-center gap-3 text-sm sm:text-base font-medium text-[#0B0D12]">
                <div className="w-5 h-5 rounded-full bg-[#FF4A1C]/10 text-[#FF4A1C] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{hero.point2}</span>
              </div>
            )}
            {hero.point3 && (
              <div className="flex items-center gap-3 text-sm sm:text-base font-medium text-[#0B0D12]">
                <div className="w-5 h-5 rounded-full bg-[#FF4A1C]/10 text-[#FF4A1C] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{hero.point3}</span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="hero-stagger flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={hero.primaryCtaUrl || '/contact'}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0B0D12] text-[#FAF8F5] text-sm font-semibold hover:bg-[#FF4A1C] transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>{hero.primaryCtaText || 'Schedule Architectural Brief'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={hero.secondaryCtaUrl || '#services-cards-overview'}
              onClick={scrollToCards}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#0B0D12]/20 text-[#0B0D12] text-sm font-semibold hover:bg-[#FAF8F5] transition-all duration-200 shadow-xs cursor-pointer"
            >
              <span>{hero.secondaryCtaText || 'Explore Capabilities'}</span>
              <ArrowDown className="w-4 h-4 text-[#5A5E6E]" />
            </a>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Replaceable High-Resolution Media Frame                     */}
        {/* ========================================================================= */}
        <div ref={rightColRef} className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-lg rounded-2xl p-3 bg-white border border-[#0B0D12]/15 shadow-xl shadow-[#0B0D12]/5 group overflow-hidden">
            
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4A1C]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#0B0D12]/10">
              <img 
                src={heroImageSrc} 
                alt={hero.headline}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/60 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Bottom Telemetry Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono bg-[#0B0D12]/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Production Telemetry Active</span>
                </div>
                <span className="text-[#FF4A1C] font-bold">99.99% SLA</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
