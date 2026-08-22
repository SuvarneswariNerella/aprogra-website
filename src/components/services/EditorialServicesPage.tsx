import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

import ServicesHero from './ServicesHero';
import ServicesKpiGrid from './ServicesKpiGrid';
import { ServiceItem } from './EditorialServiceSection';
import HorizontalServiceShowcase from './HorizontalServiceShowcase';
import EditorialScrollProgress from './EditorialScrollProgress';
import { initGlobalScrollReveal } from '@/utils/scrollReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const EDITORIAL_SERVICES: ServiceItem[] = [
  {
    id: 'web-app',
    tag: '01 / WEB & MOBILE',
    subheading: 'Sub-45ms Edge Response',
    title: 'Web & Mobile Systems',
    description:
      'High-speed web platforms and native mobile apps with offline-first synchronization.',
    deliverables: [
      'Next.js & React 19',
      'React Native & Expo',
      'Real-Time WebSockets',
    ],
    metrics: [
      { label: 'P95 Latency', value: '< 45ms' },
      { label: 'Lighthouse', value: '100/100' },
    ],
    accentGradient: 'from-blue-500 to-indigo-600',
    accentColor: '#3B82F6',
    illustrationType: 'web',
  },
  {
    id: 'ai-agents',
    tag: '02 / AI & AGENTIC',
    subheading: 'Autonomous Workflows',
    title: 'AI Agents & Neural RAG',
    description:
      'Multi-agent execution loops with structured schema generation and air-gapped SLMs.',
    deliverables: [
      'Multi-Agent Loops',
      'Dense Vector RAG',
      'Air-Gapped SLMs',
    ],
    metrics: [
      { label: 'RAG Retrieval', value: '< 180ms' },
      { label: 'Accuracy', value: '99.4%' },
    ],
    accentGradient: 'from-purple-500 to-pink-500',
    accentColor: '#8B5CF6',
    illustrationType: 'ai',
  },
  {
    id: 'saas-product',
    tag: '03 / SAAS & APIS',
    subheading: 'Multi-Tenant Systems',
    title: 'Cloud-Native SaaS & APIs',
    description:
      'Multi-tenant platforms with row-level security, event-driven pipelines, and automated metering.',
    deliverables: [
      'Row-Level Security',
      'Stripe Metering',
      'GraphQL & gRPC',
    ],
    metrics: [
      { label: 'Daily Ops', value: '25M+' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    accentGradient: 'from-cyan-500 to-blue-600',
    accentColor: '#06B6D4',
    illustrationType: 'saas',
  },
  {
    id: 'design-systems',
    tag: '04 / DESIGN SYSTEMS',
    subheading: 'Systematic Tokens',
    title: 'Mathematical Design Systems',
    description:
      'Tokenized component ecosystems engineered with fluid typography and WCAG AA accessibility.',
    deliverables: [
      'Token CI/CD',
      'Accessible Primitives',
      'WCAG AA Standard',
    ],
    metrics: [
      { label: 'Primitives', value: '120+' },
      { label: 'Compliance', value: 'WCAG AA' },
    ],
    accentGradient: 'from-rose-500 to-orange-500',
    accentColor: '#F43F5E',
    illustrationType: 'design',
  },
  {
    id: 'cloud-devops',
    tag: '05 / CLOUD & DEVOPS',
    subheading: 'Zero-Trust Ops',
    title: 'Edge & GitOps Infrastructure',
    description:
      'Resilient cloud infrastructure with declarative IaC, self-healing Kubernetes, and zero-downtime CI.',
    deliverables: [
      'Terraform & Pulumi',
      'Self-Healing K8s',
      'Zero-Downtime CI',
    ],
    metrics: [
      { label: 'Deploy Time', value: '< 3m' },
      { label: 'MTTR Recovery', value: '< 90s' },
    ],
    accentGradient: 'from-emerald-500 to-teal-600',
    accentColor: '#10B981',
    illustrationType: 'cloud',
  },
];

export default function EditorialServicesPage() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

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

    ScrollTrigger.refresh();

    return () => {
      if (revealCtx) revealCtx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div 
      ref={pageRef}
      className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] selection:bg-[#0B0D12] selection:text-white relative font-sans antialiased"
    >
      {/* 1. Left side scroll progress line */}
      <EditorialScrollProgress 
        activeSectionIndex={activeSectionIndex}
        totalSections={EDITORIAL_SERVICES.length}
      />

      {/* 3. HERO INTRO SECTION - Asymmetric 2-Column with Service Stack */}
      <ServicesHero />

      {/* 4. KPI-CARD GRID OVERVIEW (5 Core Disciplines) */}
      <ServicesKpiGrid />

      {/* 5. PINNED HORIZONTAL SCROLL SERVICES SHOWCASE */}
      <HorizontalServiceShowcase 
        services={EDITORIAL_SERVICES}
        onActiveChange={setActiveSectionIndex}
      />

      {/* 6. CLOSING CTA BAND */}
      <section className="relative z-10 w-full py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#0B0D12]/10">
        <ScrollReveal 
          className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8" 
          stagger={0.12}
        >
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#0B0D12]/15 text-xs font-mono text-[#0B0D12] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>DIRECT ACCESS TO LEAD ARCHITECTS</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-[#0B0D12]">
              Let's build what's next.
            </h2>
            <p className="text-base sm:text-lg text-[#5A5E6E] max-w-xl mx-auto font-sans leading-relaxed">
              Eliminate vendor fragmentation. Aprogra takes single-source ownership of your software engineering lifecycle.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0B0D12] hover:bg-[#FF4A1C] text-white font-mono text-sm font-bold tracking-wide uppercase shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-gray-50 border border-[#0B0D12]/15 text-[#0B0D12] font-mono text-sm font-bold tracking-wide uppercase transition-all shadow-2xs cursor-pointer"
            >
              <span>Explore Products</span>
            </Link>
          </div>

          {/* Bottom Security & Standards Note */}
          <div className="pt-8 border-t border-[#0B0D12]/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#5A5E6E] gap-4">
            <span>© {new Date().getFullYear()} Aprogra Engineering Group.</span>
            <span>SOC2 Type II & ISO 27001 Aligned Process</span>
          </div>

        </ScrollReveal>
      </section>

    </div>
  );
}
