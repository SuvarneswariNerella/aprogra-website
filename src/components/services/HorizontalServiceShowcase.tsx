import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ServiceItem, ServicesShowcaseSection, getStrapiMediaUrl } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_IMAGES: Record<string, string> = {
  web: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
  saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
  design: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
  cloud: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
};

const DEFAULT_IMAGES_BY_INDEX = [
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
];

interface HorizontalServiceShowcaseProps {
  services: ServiceItem[];
  showcase?: ServicesShowcaseSection;
  onActiveChange?: (index: number) => void;
}

export default function HorizontalServiceShowcase({ services, showcase, onActiveChange }: HorizontalServiceShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance
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

  // Jump to specific card index
  const scrollToCard = (index: number) => {
    if (!containerRef.current || !trackRef.current) return;
    const st = scrollTriggerInstance.current;
    if (st) {
      const targetProgress = index / (services.length - 1);
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      // Mobile fallback horizontal scroll
      const card = trackRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setActiveIndex(index);
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < services.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section 
      ref={containerRef}
      id="capabilities"
      className="relative w-full bg-[#F4F1EA] text-[#0B0D12] overflow-hidden"
    >
      {/* Pinned Showcase Viewport */}
      <div className="relative w-full min-h-screen py-8 sm:py-12 flex flex-col justify-between overflow-hidden">
        
        {/* Top Header & Navigation Strip */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0B0D12]/10 pb-4">
            
            {/* Title & Category */}
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[10px] font-mono font-medium text-[#0B0D12]">
                  {showcase?.badge || '02 / CAPABILITIES & ARCHITECTURE'}
                </span>
                <span className="h-px w-3 bg-[#0B0D12]/20" />
                <span className="text-[10px] font-mono text-[#5A5E6E]">
                  {showcase?.subBadge || 'HORIZONTAL REVEAL'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#0B0D12]">
                {showcase?.title || 'Core Engineering Disciplines'}
              </h2>
            </ScrollReveal>

            {/* Navigation Pills & Arrow Controls */}
            <div className="flex items-center gap-3">
              {/* Discipline Quick Jump Pills */}
              <div className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-xs p-1 rounded-xl border border-[#0B0D12]/10 shadow-2xs">
                {services.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToCard(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                      activeIndex === idx
                        ? 'bg-[#0B0D12] text-white font-semibold shadow-xs'
                        : 'text-[#5A5E6E] hover:text-[#0B0D12] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    0{idx + 1} {s.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Progress Count & Arrows */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#0B0D12] px-2 py-1 bg-white border border-[#0B0D12]/10 rounded-md">
                  0{activeIndex + 1} / 0{services.length}
                </span>

                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous card"
                  className="w-8 h-8 rounded-lg bg-white border border-[#0B0D12]/10 flex items-center justify-center text-[#0B0D12] hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={activeIndex === services.length - 1}
                  aria-label="Next card"
                  className="w-8 h-8 rounded-lg bg-white border border-[#0B0D12]/10 flex items-center justify-center text-[#0B0D12] hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* HORIZONTAL CARDS TRACK                                   */}
        {/* ======================================================== */}
        <div className="relative w-full my-auto py-2 overflow-x-auto lg:overflow-visible scrollbar-none flex">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 px-4 sm:px-8 lg:px-12 will-change-transform"
          >
            {services.map((service, index) => {
              const isCurrent = activeIndex === index;

              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className={`relative shrink-0 w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[780px] rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md p-5 sm:p-6 lg:p-7 ${
                    isCurrent
                      ? 'border-[#0B0D12]/20 ring-1 ring-[#0B0D12]/10 scale-100'
                      : 'border-[#0B0D12]/8 opacity-90 scale-[0.98]'
                  }`}
                >
                  {/* Card Top Ribbon */}
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#0B0D12]/8 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      {service.iconMedia ? (
                        <img 
                          src={getStrapiMediaUrl(service.iconMedia)} 
                          alt={service.title} 
                          className="w-4 h-4 object-contain shrink-0" 
                        />
                      ) : (
                        <span
                          className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                            isCurrent ? 'scale-125 animate-pulse' : ''
                          }`}
                          style={{ backgroundColor: service.accentColor }}
                        />
                      )}
                      <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[11px] font-medium text-[#0B0D12]">
                        {service.tag}
                      </span>
                      <span className="hidden sm:inline text-px text-[#0B0D12]/20">/</span>
                      <span className="hidden sm:inline text-[11px] text-[#5A5E6E]">
                        {service.subheading}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#5A5E6E]/70 font-medium">DISCIPLINE 0{index + 1}</span>
                  </div>

                  {/* 2-Column Split: Text Content & Visual Schematic */}
                  <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center">
                    
                    {/* Left Column: Info & Metrics */}
                    <div className="w-full lg:w-1/2 space-y-3.5">
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] tracking-tight leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#5A5E6E] leading-relaxed">
                        {service.shortDescription || (service as any).description}
                      </p>

                      {/* Deliverables tags */}
                      <div className="space-y-1 pt-0.5">
                        <div className="flex flex-wrap gap-1.5">
                          {service.deliverables.map((item: any, dIdx: number) => {
                            const deliverableText = typeof item === 'string' ? item : item.item;
                            return (
                              <span
                                key={dIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#0B0D12]/8 text-[11px] font-mono text-[#0B0D12] hover:border-[#0B0D12]/20 transition-colors"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: service.accentColor }}
                                />
                                {deliverableText}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Verified Metrics Strip */}
                      <div className="grid grid-cols-2 gap-2.5 max-w-xs pt-1">
                        {service.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/8"
                          >
                            <div className="text-sm sm:text-base font-bold text-[#0B0D12] leading-tight">
                              {m.value}
                            </div>
                            <div className="text-[10px] font-mono text-[#5A5E6E] truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Contact Action */}
                      <div className="pt-1">
                        <Link
                          to={service.cta?.url || `/services/architecture/${service.slug || service.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0B0D12] hover:text-[#FF4A1C] transition-colors group"
                        >
                          <span>{service.cta?.label || "Engineer this capability"}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#FF4A1C]" />
                        </Link>
                      </div>

                    </div>

                    {/* Right Column: Service Engineering Image */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#0B0D12]/12 bg-[#FAF8F5] shadow-xs group">
                        <img 
                          src={
                            (service.coverImage ? getStrapiMediaUrl(service.coverImage) : null) ||
                            SERVICE_IMAGES[service.illustrationType || ''] ||
                            DEFAULT_IMAGES_BY_INDEX[index % DEFAULT_IMAGES_BY_INDEX.length]
                          }
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-[#0B0D12]/80 backdrop-blur-xs border border-white/10">{service.tag}</span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Production Ready</span>
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                );
              })}
          </div>
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 pt-4">
          <div className="flex items-center justify-between gap-4 text-xs font-mono text-[#5A5E6E]">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span className="text-[11px]">{showcase?.scrollText || 'SCROLL DOWN TO REVEAL DISCIPLINES'}</span>
            </div>
            
            {/* Smooth Track Indicator */}
            <div className="flex-1 max-w-xs h-1.5 bg-[#0B0D12]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0B0D12] transition-all duration-100 rounded-full"
                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              />
            </div>

            <span className="text-[11px] font-mono font-medium">
              {Math.round(scrollProgress * 100)}% EXPLORED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
