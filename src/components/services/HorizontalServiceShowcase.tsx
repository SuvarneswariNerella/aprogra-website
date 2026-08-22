import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ServiceItem } from './EditorialServiceSection';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalServiceShowcaseProps {
  services: ServiceItem[];
  onActiveChange?: (index: number) => void;
}

export default function HorizontalServiceShowcase({ services, onActiveChange }: HorizontalServiceShowcaseProps) {
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
            end: () => `+=${track.scrollWidth - window.innerWidth + 600}`,
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
                  02 / CAPABILITIES &amp; ARCHITECTURE
                </span>
                <span className="h-px w-3 bg-[#0B0D12]/20" />
                <span className="text-[10px] font-mono text-[#5A5E6E]">
                  HORIZONTAL REVEAL
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#0B0D12]">
                Core Engineering Disciplines
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
                      <span
                        className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                          isCurrent ? 'scale-125 animate-pulse' : ''
                        }`}
                        style={{ backgroundColor: service.accentColor }}
                      />
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
                        {service.description}
                      </p>

                      {/* Deliverables tags */}
                      <div className="space-y-1 pt-0.5">
                        <div className="flex flex-wrap gap-1.5">
                          {service.deliverables.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#0B0D12]/8 text-[11px] font-mono text-[#0B0D12] hover:border-[#0B0D12]/20 transition-colors"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: service.accentColor }}
                              />
                              {item}
                            </span>
                          ))}
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
                          to="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0B0D12] hover:text-[#FF4A1C] transition-colors group"
                        >
                          <span>Engineer this capability</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#FF4A1C]" />
                        </Link>
                      </div>

                    </div>

                    {/* Right Column: Architectural Vector Drawing */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/8 p-4 sm:p-5 overflow-hidden">
                        
                        {/* Schematic sub-header */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#0B0D12]/6 text-[10px] font-mono text-[#5A5E6E]">
                          <span className="font-semibold text-[#0B0D12]">ARCHITECTURE SCHEMATIC</span>
                          <span className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Type-Safe</span>
                          </span>
                        </div>

                        {/* Vector Line-Art Drawing */}
                        <div className="my-2 min-h-[150px] sm:min-h-[170px] flex items-center justify-center relative">
                          {service.illustrationType === 'web' && (
                            <svg
                              viewBox="0 0 360 220"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full max-w-[260px] h-auto"
                            >
                              <rect x="20" y="20" width="240" height="160" rx="8" stroke="#0A0A0F" strokeWidth="1.5" strokeOpacity="0.8" />
                              <line x1="20" y1="50" x2="260" y2="50" stroke="#E5E7EB" strokeWidth="1" />
                              <circle cx="36" cy="35" r="3" fill="#EF4444" />
                              <circle cx="48" cy="35" r="3" fill="#F59E0B" />
                              <circle cx="60" cy="35" r="3" fill="#10B981" />
                              
                              <rect x="230" y="55" width="105" height="150" rx="12" stroke="#3B82F6" strokeWidth="1.75" />
                              <rect x="242" y="70" width="81" height="110" rx="4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                              
                              <rect x="40" y="68" width="80" height="36" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                              <rect x="135" y="68" width="105" height="36" rx="4" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.2" />
                              <rect x="40" y="118" width="175" height="46" rx="4" fill="#FFF7ED" stroke="#FF4A1C" strokeWidth="1.2" />
                              
                              <path d="M120 86 C 180 86, 180 140, 245 140" stroke="url(#web-grad-h)" strokeWidth="2" strokeDasharray="4 4" />
                              <defs>
                                <linearGradient id="web-grad-h" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#3B82F6" />
                                  <stop offset="50%" stopColor="#EC4899" />
                                  <stop offset="100%" stopColor="#FF4A1C" />
                                </linearGradient>
                              </defs>
                            </svg>
                          )}

                          {service.illustrationType === 'ai' && (
                            <svg
                              viewBox="0 0 360 220"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full max-w-[260px] h-auto"
                            >
                              <circle cx="180" cy="110" r="42" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
                              <circle cx="180" cy="110" r="18" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
                              <circle cx="180" cy="110" r="6" fill="#8B5CF6" />

                              <g>
                                <circle cx="70" cy="60" r="22" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="1.5" />
                                <circle cx="290" cy="60" r="22" fill="#FFFFFF" stroke="#EC4899" strokeWidth="1.5" />
                                <circle cx="80" cy="170" r="22" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
                                <circle cx="280" cy="170" r="22" fill="#FFFFFF" stroke="#FF4A1C" strokeWidth="1.5" />
                              </g>

                              <path d="M92 68 L 162 102" stroke="#3B82F6" strokeWidth="1.5" />
                              <path d="M268 68 L 198 102" stroke="#EC4899" strokeWidth="1.5" />
                              <path d="M102 162 L 164 120" stroke="#10B981" strokeWidth="1.5" />
                              <path d="M258 162 L 196 120" stroke="#FF4A1C" strokeWidth="1.5" />
                            </svg>
                          )}

                          {service.illustrationType === 'saas' && (
                            <svg
                              viewBox="0 0 360 220"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full max-w-[260px] h-auto"
                            >
                              <g transform="translate(40, 20)">
                                <path d="M140 10 L 250 65 L 140 120 L 30 65 Z" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" />
                                <path d="M30 65 L 30 85 L 140 140 L 140 120 Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" />
                                <path d="M250 65 L 250 85 L 140 140 L 140 120 Z" fill="#99F6E4" stroke="#0D9488" strokeWidth="1.5" />

                                <path d="M140 60 L 250 115 L 140 170 L 30 115 Z" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
                                <path d="M30 115 L 30 135 L 140 190 L 140 170 Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
                                <path d="M250 115 L 250 135 L 140 190 L 140 170 Z" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5" />
                              </g>
                            </svg>
                          )}

                          {service.illustrationType === 'design' && (
                            <svg
                              viewBox="0 0 360 220"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full max-w-[260px] h-auto"
                            >
                              <rect x="30" y="30" width="130" height="70" rx="8" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="1.5" />
                              <circle cx="50" cy="50" r="8" fill="#F43F5E" />
                              <line x1="68" y1="50" x2="140" y2="50" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                              <line x1="50" y1="75" x2="120" y2="75" stroke="#FECDD3" strokeWidth="2" strokeLinecap="round" />

                              <rect x="190" y="30" width="140" height="70" rx="8" fill="#FDF4FF" stroke="#C026D3" strokeWidth="1.5" />
                              <circle cx="210" cy="50" r="8" fill="#C026D3" />
                              <line x1="228" y1="50" x2="310" y2="50" stroke="#C026D3" strokeWidth="2" strokeLinecap="round" />
                              <line x1="210" y1="75" x2="280" y2="75" stroke="#F5D0FE" strokeWidth="2" strokeLinecap="round" />

                              <path d="M40 170 C 120 170, 160 120, 320 120" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" />
                              <circle cx="145" cy="142" r="5" fill="#FF4A1C" />
                            </svg>
                          )}

                          {service.illustrationType === 'cloud' && (
                            <svg
                              viewBox="0 0 360 220"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full max-w-[260px] h-auto"
                            >
                              <ellipse cx="180" cy="110" rx="130" ry="60" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
                              <ellipse cx="180" cy="110" rx="70" ry="85" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
                              <circle cx="180" cy="110" r="26" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
                              <circle cx="180" cy="110" r="10" fill="#10B981" />

                              <circle cx="60" cy="110" r="8" fill="#3B82F6" />
                              <circle cx="300" cy="110" r="8" fill="#3B82F6" />
                              <circle cx="180" cy="30" r="8" fill="#FF4A1C" />
                              <circle cx="180" cy="190" r="8" fill="#FF4A1C" />
                            </svg>
                          )}
                        </div>

                        {/* Bottom Spec Footer */}
                        <div className="pt-2 border-t border-[#0B0D12]/6 flex items-center justify-between text-[10px] font-mono text-[#5A5E6E]">
                          <span className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Production Ready</span>
                          </span>
                          <span>Audited</span>
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
              <span className="text-[11px]">SCROLL DOWN TO REVEAL DISCIPLINES</span>
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
