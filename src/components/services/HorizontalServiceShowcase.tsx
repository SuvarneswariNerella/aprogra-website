import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ServiceItem, ServicesFeaturesSection, DEFAULT_SERVICES_PAGE_CONTENT, DEFAULT_SERVICES_LIST } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalServiceShowcaseProps {
  services?: ServiceItem[];
  features?: ServicesFeaturesSection;
  onActiveChange?: (index: number) => void;
}

export default function HorizontalServiceShowcase({ 
  services = DEFAULT_SERVICES_LIST, 
  features = DEFAULT_SERVICES_PAGE_CONTENT.features, 
  onActiveChange 
}: HorizontalServiceShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || services.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth + 60);
      };

      if (!prefersReducedMotion) {
        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight, track.scrollWidth - window.innerWidth + 80)}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgress(p);
              const idx = Math.min(
                services.length - 1,
                Math.max(0, Math.floor(p * services.length + 0.15))
              );
              setActiveIndex(idx);
              onActiveChange?.(idx);
            },
          },
        });

        scrollTriggerInstance.current = tween.scrollTrigger || null;
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [services, onActiveChange]);

  // Jump directly to card via Tab Click or Arrow
  const scrollToCard = (index: number) => {
    if (!containerRef.current || !trackRef.current) return;
    const st = scrollTriggerInstance.current;
    if (st) {
      const targetProgress = index / (services.length - 1);
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const card = trackRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
      setActiveIndex(index);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#F4F1EA] text-[#0B0D12] overflow-hidden border-b border-[#0B0D12]/10"
    >
      <div className="w-full min-h-screen flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP HEADER & DYNAMIC NAVIGATION TABS                                      */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0B0D12]/10 pb-6">
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-[#0B0D12]/15 text-xs font-mono font-bold tracking-wider text-[#0B0D12] uppercase shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>{features.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-[#0B0D12]">
                {features.headline} <span className="text-[#FF4A1C]">{features.highlight}</span>
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button 
                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-xl bg-white border border-[#0B0D12]/20 flex items-center justify-center text-[#0B0D12] hover:bg-[#0B0D12] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
                aria-label="Previous Feature"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToCard(Math.min(services.length - 1, activeIndex + 1))}
                disabled={activeIndex === services.length - 1}
                className="w-10 h-10 rounded-xl bg-white border border-[#0B0D12]/20 flex items-center justify-center text-[#0B0D12] hover:bg-[#0B0D12] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
                aria-label="Next Feature"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* DYNAMIC NAVIGATION TABS (Adjusts dynamically to 4, 5, 6, 7, 8 etc.) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {services.map((service, idx) => (
              <button
                key={`tab-${service.id || idx}`}
                onClick={() => scrollToCard(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-[#0B0D12] text-white shadow-sm'
                    : 'bg-white/80 border border-[#0B0D12]/15 text-[#5A5E6E] hover:text-[#0B0D12] hover:bg-white'
                }`}
              >
                <span className="text-[#FF4A1C] mr-1.5">0{idx + 1}.</span>
                <span>{service.tabLabel || service.title}</span>
              </button>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL CARDS TRACK: Editable Content (Left) + Image (Right)            */}
        {/* ========================================================================= */}
        <div className="w-full my-auto py-6">
          <div 
            ref={trackRef} 
            className="flex gap-8 sm:gap-12 w-max items-center pl-2 pr-12"
          >
            {services.map((service, idx) => {
              const imgSrc = service.imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80';
              const isActive = activeIndex === idx;

              return (
                <div 
                  key={`card-${service.id || idx}`}
                  className={`w-[88vw] sm:w-[75vw] lg:w-[65vw] max-w-5xl rounded-3xl bg-white border border-[#0B0D12]/15 p-6 sm:p-10 shadow-lg shadow-[#0B0D12]/5 transition-all duration-500 shrink-0 ${
                    isActive ? 'ring-2 ring-[#FF4A1C]/20 border-[#0B0D12]' : 'opacity-90'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* LEFT SIDE: Editable Content, Deliverables, Tags, Link */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="flex items-center justify-between border-b border-[#0B0D12]/10 pb-4">
                        <span className="text-xs font-mono font-bold tracking-wider text-[#FF4A1C] uppercase px-3 py-1 rounded bg-[#FF4A1C]/10">
                          FEATURE 0{service.cardOrder || idx + 1} • {service.category}
                        </span>
                        {service.kpiNumber && (
                          <span className="text-xs font-mono font-bold text-[#0B0D12] bg-[#FAF8F5] px-3 py-1 rounded border border-[#0B0D12]/10">
                            {service.kpiNumber} {service.kpiLabel}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0B0D12]">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#5A5E6E] leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Deliverables Checklist */}
                      <div className="space-y-2.5 pt-2">
                        <span className="text-xs font-mono font-bold text-[#0B0D12] uppercase tracking-wider block">
                          Core Deliverables & Architecture:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.deliverables?.map((del, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#0B0D12]">
                              <CheckCircle2 className="w-4 h-4 text-[#FF4A1C] shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Tags & CTA Link */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0B0D12]/10">
                        <div className="flex flex-wrap gap-1.5">
                          {service.tags?.map((tag, tIdx) => (
                            <span 
                              key={tIdx}
                              className="text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-[#FAF8F5] text-[#0B0D12] border border-[#0B0D12]/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          to={service.customUrl || `/services/architecture/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF4A1C] hover:text-[#0B0D12] transition-colors"
                        >
                          <span>Explore Deep Dive</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                    </div>

                    {/* RIGHT SIDE: High-Resolution Feature Image Frame */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#0B0D12]/10 shadow-md group">
                        <img 
                          src={imgSrc} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                        
                        <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-mono bg-[#0B0D12]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 flex items-center justify-between">
                          <span>{service.title}</span>
                          <span className="text-[#FF4A1C] font-bold">Verified</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar at Bottom */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#0B0D12]/10 text-xs font-mono text-[#5A5E6E]">
          <div className="flex items-center gap-3">
            <span>01</span>
            <div className="w-32 sm:w-48 h-1.5 rounded-full bg-[#0B0D12]/10 overflow-hidden">
              <div 
                className="h-full bg-[#FF4A1C] transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
              />
            </div>
            <span>0{services.length}</span>
          </div>

          <span>Feature {activeIndex + 1} of {services.length}</span>
        </div>

      </div>
    </div>
  );
}
