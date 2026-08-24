import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Cpu, 
  Layers, 
  PenTool, 
  Cloud, 
  Smartphone,
  Sparkles,
  Zap
} from 'lucide-react';
import CardFlip from '@/components/ui/flip-card';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { 
  ServicesCardsSection, 
  ServiceFlipCardItem, 
  DEFAULT_SERVICES_PAGE_CONTENT, 
  DEFAULT_SERVICE_FLIP_CARDS, 
  useServiceFlipCards,
  getStrapiMediaUrl 
} from '@/lib/strapi';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, React.ElementType> = {
  web: Code2,
  ai: Cpu,
  saas: Layers,
  design: PenTool,
  cloud: Cloud,
  mobile: Smartphone,
  nlp: Zap,
  math: Sparkles,
  other: Zap,
};

interface ServicesKpiGridProps {
  cards?: ServicesCardsSection;
  flipCards?: ServiceFlipCardItem[];
}

export default function ServicesKpiGrid({
  cards = DEFAULT_SERVICES_PAGE_CONTENT.cards,
  flipCards: propFlipCards,
}: ServicesKpiGridProps) {
  const { flipCards: hookFlipCards } = useServiceFlipCards();
  const flipCards = propFlipCards && propFlipCards.length > 0 ? propFlipCards : hookFlipCards;

  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cardWrappers = grid.querySelectorAll<HTMLElement>('.kpi-card-wrapper');
    if (cardWrappers.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(cardWrappers, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Set initial hidden states
    gsap.set(cardWrappers, {
      opacity: 0,
      y: 40,
      scale: 0.97,
    });

    const ctx = gsap.context(() => {
      // Use ScrollTrigger.batch() on the card elements
      ScrollTrigger.batch(cardWrappers, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [flipCards]);

  const handleCardAction = (targetUrl?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (targetUrl && targetUrl.startsWith('http')) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else if (targetUrl) {
      navigate(targetUrl);
    } else {
      navigate('/services');
    }
  };

  /**
   * Calculates symmetric column spans across any number of cards
   */
  const getColSpanClass = (index: number, total: number) => {
    if (total === 5) {
      return index < 3
        ? 'lg:col-span-2'
        : index === 3
        ? 'lg:col-span-2 lg:col-start-2'
        : 'lg:col-span-2';
    }
    if (total % 3 === 1 && index === total - 1) {
      // 1 leftover card centered on the last row
      return 'lg:col-span-2 lg:col-start-3';
    }
    if (total % 3 === 2 && index === total - 2) {
      // 2 leftover cards centered on the last row
      return 'lg:col-span-2 lg:col-start-2';
    }
    return 'lg:col-span-2';
  };

  return (
    <section
      ref={containerRef}
      id="services-cards-overview"
      className="relative z-10 w-full py-16 sm:py-20 lg:py-24 border-b border-[#0B0D12]/10 bg-[#FAF8F5]"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#0B0D12]/15 text-[#0B0D12] text-xs font-mono font-bold tracking-wider uppercase shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{cards.badge || 'PRODUCTION ARCHITECTURE'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#0B0D12]">
            {cards.headline || `${flipCards.length} Core Engineering Disciplines`}{' '}
            {cards.highlight && <span className="text-[#FF4A1C]">{cards.highlight}</span>}
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#5A5E6E] font-normal leading-relaxed">
            {cards.description || 'Hover over or tap any card to inspect stack deliverables, verified performance metrics, and system capabilities.'}
          </p>
        </ScrollReveal>

        {/* Dynamic Responsive Multi-Card Symmetrical Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 items-stretch justify-items-center"
        >
          {flipCards.map((item, index) => {
            const colSpanClass = getColSpanClass(index, flipCards.length);
            const coverImageUrl =
              (item.coverImage ? getStrapiMediaUrl(item.coverImage) : null) ||
              item.coverImageUrl ||
              DEFAULT_SERVICE_FLIP_CARDS[index % DEFAULT_SERVICE_FLIP_CARDS.length]?.coverImageUrl;

            const deliverableItems = Array.isArray(item.deliverables)
              ? item.deliverables.map((d: any) => (typeof d === 'string' ? d : d.item || ''))
              : [];

            return (
              <div
                key={item.id || index}
                className={`kpi-card-wrapper w-full flex justify-center ${colSpanClass}`}
              >
                <CardFlip
                  title={item.title}
                  subtitle={item.subtitle || 'Enterprise Scale'}
                  description={item.description}
                  features={deliverableItems.length > 0 ? deliverableItems : ['Production Architecture', 'Edge Telemetry', 'Cloud Ops']}
                  color={item.color || '#3B82F6'}
                  number={`0${index + 1} /`}
                  tag={item.tag || `0${index + 1} / SERVICE`}
                  icon={Sparkles}
                  coverImageUrl={coverImageUrl}
                  actionText={item.actionText || 'Inspect Architecture'}
                  onActionClick={handleCardAction(item.actionUrl)}
                  className="w-full max-w-[340px] h-[400px]"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
