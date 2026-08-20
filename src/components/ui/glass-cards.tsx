import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CardItem {
  id?: number | string;
  title: string;
  description?: string;
  desc?: string;
  color?: string;
  icon?: React.ElementType;
  kpi?: string;
  tag?: string;
  highlights?: string[];
}

export interface GlassCardStackProps {
  cards: CardItem[];
  className?: string;
  onActiveCardChange?: (index: number) => void;
}

export const GlassCardStack: React.FC<GlassCardStackProps> = ({
  cards,
  className = "",
  onActiveCardChange
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    const pinContainer = pinContainerRef.current;
    if (!trigger || !pinContainer || cards.length === 0) return;

    const scrollDistance = (cards.length - 1) * 580;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top top+=80",
        end: `+=${scrollDistance}`,
        pin: pinContainer,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          const rawIdx = progress * (cards.length - 1);
          const currentIdx = Math.min(Math.round(rawIdx), cards.length - 1);
          setActiveIndex(currentIdx);
          if (onActiveCardChange) {
            onActiveCardChange(currentIdx);
          }

          cards.forEach((_, idx) => {
            const cardEl = cardRefs.current[idx];
            if (!cardEl) return;

            const diff = rawIdx - idx;

            if (diff < -1) {
              gsap.set(cardEl, {
                y: 160,
                scale: 0.94,
                opacity: 0,
                zIndex: 1,
                pointerEvents: "none"
              });
            } else if (diff >= -1 && diff < 0) {
              const t = diff + 1;
              const y = (1 - t) * 130;
              const scale = 0.96 + t * 0.04;
              const opacity = Math.min(t * 1.6, 1);
              const zIndex = 30 + idx;

              gsap.set(cardEl, {
                y: y,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: t > 0.7 ? "auto" : "none"
              });
            } else {
              const stackOffset = Math.min(diff, 3);
              const y = -12 * stackOffset;
              const scale = 1 - 0.02 * stackOffset;
              const zIndex = 10 + idx;
              const opacity = stackOffset > 2 ? Math.max(1 - (diff - 2) * 0.25, 0) : 1;

              gsap.set(cardEl, {
                y: y,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: diff < 0.4 ? "auto" : "none"
              });
            }
          });
        }
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [cards, onActiveCardChange]);

  const scrollToCard = (index: number) => {
    if (!triggerRef.current) return;
    const trigger = triggerRef.current;
    const scrollDistance = (cards.length - 1) * 580;
    const startY = trigger.getBoundingClientRect().top + window.scrollY - 80;
    const targetScroll = startY + (index / (cards.length - 1)) * scrollDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={triggerRef} className={`relative w-full ${className}`}>
      <div 
        ref={pinContainerRef} 
        className="w-full flex flex-col justify-center items-center py-4"
      >
        {/* Top Status Pill */}
        <div className="w-full max-w-2xl flex items-center justify-between gap-3 mb-4 px-1 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#0B0D12]">
              Module {String(activeIndex + 1).padStart(2, "0")} of {String(cards.length).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#0B0D12]/12 shadow-2xs">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to module ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  i === activeIndex 
                    ? 'w-6 bg-[#FF4A1C]' 
                    : 'w-2 bg-[#0B0D12]/20 hover:bg-[#0B0D12]/40'
                }`}
              />
            ))}
          </div>

          <div className="text-[11px] font-mono font-semibold text-[#5A5E6E] bg-white px-2.5 py-0.5 rounded-md border border-[#0B0D12]/10">
            {Math.round(scrollProgress * 100)}%
          </div>
        </div>

        {/* Stack Container */}
        <div 
          className="relative w-full max-w-2xl h-[420px] sm:h-[400px] flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={card.id || index}
                ref={(el) => { cardRefs.current[index] = el; }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '672px',
                  borderRadius: '16px',
                  top: 0,
                  willChange: 'transform, opacity'
                }}
                className="select-none"
              >
                <div 
                  className={`relative w-full rounded-2xl bg-white border border-[#0B0D12]/12 border-t-[3px] border-t-[#FF4A1C] p-6 sm:p-7 md:p-8 space-y-5 transition-shadow duration-200 ${
                    isActive 
                      ? 'shadow-[0_16px_36px_-10px_rgba(11,13,18,0.12),0_2px_8px_rgba(11,13,18,0.04)]' 
                      : 'shadow-[0_10px_24px_-8px_rgba(11,13,18,0.08)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      {Icon && (
                        <div className="w-12 h-12 rounded-xl bg-[#FFF5F2] border border-[#FF4A1C]/25 flex items-center justify-center text-[#FF4A1C] shadow-2xs">
                          <Icon className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2 py-0.5 rounded bg-[#FFF5F2] text-[#FF4A1C] border border-[#FF4A1C]/20 text-[11px] font-mono font-bold">
                            MOD {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A5E6E]">
                            {card.tag || "ERP CORE"}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#0B0D12]/70 font-semibold block mt-0.5">
                          Aprogra Enterprise Suite
                        </span>
                      </div>
                    </div>

                    <span className="text-3xl sm:text-4xl font-mono font-extrabold text-[#0B0D12]/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-bold font-display text-[#0B0D12] tracking-tight">
                      {card.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      {card.description || card.desc}
                    </p>
                  </div>

                  {card.kpi && (
                    <div className="pt-3 border-t border-[#0B0D12]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="inline-flex items-center gap-2 text-[#0B0D12] font-semibold bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#0B0D12]/10 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
                        <span>{card.kpi}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#5A5E6E] uppercase font-bold">
                        100% Integrated
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#5A5E6E] bg-white px-3.5 py-1.5 rounded-full border border-[#0B0D12]/12 shadow-2xs">
          <ChevronDown className="w-3.5 h-3.5 text-[#FF4A1C] animate-bounce" />
          <span>Scroll to reveal next module ({activeIndex + 1}/{cards.length})</span>
        </div>
      </div>
    </div>
  );
};

export default GlassCardStack;
