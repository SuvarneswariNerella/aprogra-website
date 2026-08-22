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
  Sparkles
} from 'lucide-react';
import CardFlip from '@/components/ui/flip-card';
import ScrollReveal from '@/components/animations/ScrollReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface KpiServiceItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  accentColor: string;
  targetId: string;
}

export const KPI_SERVICES: KpiServiceItem[] = [
  {
    id: 'web-app',
    number: '01 /',
    tag: '01 / WEB & MOBILE',
    title: 'Web & Mobile Engineering',
    subtitle: 'Sub-45ms Edge & Native Mobile Systems',
    description: 'Sub-second edge web applications and cross-platform native mobile experiences engineered for instantaneous response.',
    features: [
      'Next.js 15 & React 19',
      'React Native & Flutter',
      'Sub-45ms TTFB Edge',
      'CRDT & SQLite Offline Sync',
    ],
    icon: Code2,
    accentColor: '#3B82F6',
    targetId: 'web-app',
  },
  {
    id: 'ai-agents',
    number: '02 /',
    tag: '02 / AI & AGENTIC',
    title: 'AI & Agentic Solutions',
    subtitle: 'Autonomous Cognitive Workflows',
    description: 'Moving beyond generic chat wrappers into verifiable tool-calling pipelines, structured schema outputs, and local SLM inference.',
    features: [
      'Multi-Agent Loops',
      'Dense & Sparse RAG',
      'Air-Gapped SLMs',
      'Guardrails & Eval Suites',
    ],
    icon: Cpu,
    accentColor: '#8B5CF6',
    targetId: 'ai-agents',
  },
  {
    id: 'saas-product',
    number: '03 /',
    tag: '03 / PRODUCT & SAAS',
    title: 'Product & SaaS Engines',
    subtitle: 'Multi-Tenant Cloud Architecture',
    description: 'Full-lifecycle software engineering from raw data schema to scalable multi-tenant execution with automated Stripe metering.',
    features: [
      'Multi-Tenant Row Security',
      'Automated Metering & Billing',
      'Microservice Pipelines',
      'PostgreSQL & Distributed DB',
    ],
    icon: Layers,
    accentColor: '#06B6D4',
    targetId: 'saas-product',
  },
  {
    id: 'design-systems',
    number: '04 /',
    tag: '04 / UI/UX & DESIGN',
    title: 'UI/UX & Design Systems',
    subtitle: 'Systematic Visual Foundations',
    description: 'Tokenized, multi-platform component ecosystems with mathematical typography scaling and fluid kinetic micro-interactions.',
    features: [
      'Figma Token CI/CD',
      'Headless A11y Kits',
      'Fluid Micro-Interactions',
      'WCAG AA Standard',
    ],
    icon: PenTool,
    accentColor: '#F43F5E',
    targetId: 'design-systems',
  },
  {
    id: 'cloud-devops',
    number: '05 /',
    tag: '05 / CLOUD & DEVOPS',
    title: 'Cloud & DevOps Infra',
    subtitle: 'Zero-Trust Sovereign Operations',
    description: 'Resilient cloud infrastructure with declarative Terraform IaC, self-healing Kubernetes clusters, and blue-green deployments.',
    features: [
      'Terraform Declarative IaC',
      'Kubernetes Clusters',
      'Zero-Downtime CI/CD',
      'Zero-Trust Edge Security',
    ],
    icon: Cloud,
    accentColor: '#10B981',
    targetId: 'cloud-devops',
  },
];

export default function ServicesKpiGrid() {
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
  }, []);

  const handleCardAction = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/services/architecture/${targetId}`);
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
            <span>DISCIPLINE MATRIX</span>
          </div>

          <h2 className="text-h2 text-[#0B0D12]">
            5 core capabilities engineered for high velocity.
          </h2>
          <p className="mt-4 text-body-lg text-[#5A5E6E]">
            Hover or tap any card to reveal core deliverables and inspect verified architecture schematics.
          </p>
        </ScrollReveal>

        {/* 5-Card Symmetrical Grid (3 on Top Row, 2 Centered on Bottom Row for Desktop) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 items-stretch justify-items-center"
        >
          {KPI_SERVICES.map((item, index) => {
            // Layout alignment:
            // Desktop: Top 3 cards span 2 cols each (cols 1-2, 3-4, 5-6)
            // Bottom 2 cards span 2 cols each, with the 4th card starting at col 2 to center both!
            const colSpanClass =
              index < 3
                ? 'lg:col-span-2'
                : index === 3
                ? 'lg:col-span-2 lg:col-start-2'
                : 'lg:col-span-2';

            return (
              <div
                key={item.id}
                className={`kpi-card-wrapper w-full flex justify-center ${colSpanClass}`}
              >
                <CardFlip
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  features={item.features}
                  color={item.accentColor}
                  number={item.number}
                  tag={item.tag}
                  icon={item.icon}
                  actionText="Inspect Architecture"
                  onActionClick={handleCardAction(item.targetId)}
                  className="w-full max-w-[340px] h-[390px]"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
