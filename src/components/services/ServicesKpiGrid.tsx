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
  Sparkles,
  Zap
} from 'lucide-react';
import CardFlip from '@/components/ui/flip-card';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ServicesKpiSection, ServiceItem, DEFAULT_SERVICES_PAGE_CONTENT, DEFAULT_SERVICES_LIST, getStrapiMediaUrl } from '@/lib/strapi';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, React.ElementType> = {
  web: Code2,
  ai: Cpu,
  saas: Layers,
  design: PenTool,
  cloud: Cloud,
  other: Zap,
};

interface ServicesKpiGridProps {
  kpi?: ServicesKpiSection;
  services?: ServiceItem[];
}

export default function ServicesKpiGrid({
  kpi = DEFAULT_SERVICES_PAGE_CONTENT.kpi,
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
      id="services-kpi-overview"
      className="relative z-10 w-full py-16 sm:py-20 lg:py-24 border-b border-[#0B0D12]/10 bg-[#FAF8F5]"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#0B0D12]/15 text-[#0B0D12] text-badge shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{kpi.badge || 'PRODUCTION ARCHITECTURE'}</span>
          </div>

          <h2 className="text-h2 text-[#0B0D12]">
            {kpi.title || `${services.length} Core Engineering Disciplines`}
          </h2>
          <p className="mt-4 text-body-lg text-[#5A5E6E]">
            {kpi.subtitle || 'Hover over or tap any card to inspect stack deliverables, verified performance metrics, and system capabilities.'}
          </p>
        </ScrollReveal>

        {/* Dynamic Responsive Multi-Card Symmetrical Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 items-stretch justify-items-center"
        >
          {services.map((item, index) => {
            const colSpanClass = getColSpanClass(index, services.length);
            const IconComponent = ICON_MAP[item.illustrationType] || Sparkles;
            const iconMediaUrl = getStrapiMediaUrl(item.iconMedia);
            const coverImageUrl = getStrapiMediaUrl(item.coverImage) || (typeof item.coverImage === 'string' ? item.coverImage : undefined);

            return (
              <div
                key={item.slug || item.id || index}
                className={`kpi-card-wrapper w-full flex justify-center ${colSpanClass}`}
              >
                <CardFlip
                  title={item.title}
                  subtitle={item.subheading || 'Enterprise Scale'}
                  description={item.shortDescription}
                  features={item.deliverables ? item.deliverables.map((d: any) => typeof d === 'string' ? d : d.item) : []}
                  color={item.accentColor}
                  number={`0${index + 1} /`}
                  tag={item.tag || `0${index + 1} / SERVICE`}
                  icon={IconComponent}
                  iconMediaUrl={iconMediaUrl}
                  coverImageUrl={coverImageUrl}
                  actionText={item.cta?.label || 'Inspect Architecture'}
                  onActionClick={handleCardAction(item.slug || item.id, item.cta?.url)}
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
