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
  Zap,
} from 'lucide-react';
import CardFlip from '@/components/ui/flip-card';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ServicesCardsSection, ServiceItem, DEFAULT_SERVICES_PAGE_CONTENT, DEFAULT_SERVICES_LIST } from '@/lib/strapi';

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
  services?: ServiceItem[];
}

export default function ServicesKpiGrid({
  cards = DEFAULT_SERVICES_PAGE_CONTENT.cards,
  services = DEFAULT_SERVICES_LIST,
}: ServicesKpiGridProps) {
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

    gsap.set(cardWrappers, {
      opacity: 0,
      y: 40,
      scale: 0.97,
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(cardWrappers, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [services]);

  const handleCardAction = (targetId: string, customUrl?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (customUrl && customUrl.startsWith('http')) {
      window.open(customUrl, '_blank', 'noopener,noreferrer');
    } else if (customUrl) {
      navigate(customUrl);
    } else {
      navigate(`/services/architecture/${targetId}`);
    }
  };

  return (
    <section 
      id="services-cards-overview"
      ref={containerRef}
      className="relative z-10 w-full py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-[#FAF8F5] text-[#0B0D12] border-b border-[#0B0D12]/10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: Fully Editable from Strapi                                */}
        {/* ========================================================================= */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#0B0D12]/15 text-xs font-mono font-bold tracking-wider text-[#0B0D12] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{cards.badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D12] font-display">
            {cards.headline} <span className="text-[#FF4A1C]">{cards.highlight}</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-[#5A5E6E] font-normal leading-relaxed">
            {cards.description}
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* DYNAMIC FLIP CARDS GRID (Supports 5, 6, 7, 8+ cards gracefully)            */}
        {/* ========================================================================= */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || ICON_MAP.web;
            const imgSrc = service.imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80';

            return (
              <div 
                key={service.id || service.slug || index}
                className="kpi-card-wrapper w-full flex justify-center"
              >
                <CardFlip
                  title={service.title}
                  subtitle={service.shortSummary}
                  description={service.description}
                  features={service.deliverables}
                  color="#FF4A1C"
                  tag={service.category}
                  number={`0${service.cardOrder || index + 1}`}
                  icon={Icon}
                  coverImageUrl={imgSrc}
                  actionText="Explore Architecture"
                  onActionClick={handleCardAction(service.slug, service.customUrl)}
                  className="w-full max-w-none h-[490px]"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
