import React, { useEffect, useRef, useState } from 'react';
import { Component as TestimonialSlider } from '@/components/ui/testimonial-slider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTestimonials } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

// Scroll distance per testimonial (px) — shorter = snappier transitions
const PX_PER_TESTIMONIAL = 400;

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { testimonials: apiTestimonials } = useTestimonials();
  const TESTIMONIALS = apiTestimonials.map(t => ({
    img: t.avatarUrl || 'https://picsum.photos/seed/191650684/1200/800',
    quote: t.quote,
    name: t.authorName,
    role: t.authorCompany ? `${t.authorRole}, ${t.authorCompany}` : t.authorRole,
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || TESTIMONIALS.length === 0) return;

    // Only pin on desktop — mobile just scrolls normally
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const totalScrollDistance = (TESTIMONIALS.length - 1) * PX_PER_TESTIMONIAL;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top+=76',
        end: `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const rawIdx = self.progress * (TESTIMONIALS.length - 1);
          const newIndex = Math.min(TESTIMONIALS.length - 1, Math.max(0, Math.round(rawIdx)));
          setActiveIndex(newIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [TESTIMONIALS.length]);

  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100vh-76px)] flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#FAF8F5] text-[#0B0D12] border-b border-[#0B0D12]/10"
    >
      <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">

        {/* HEADING */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-badge text-[#0B0D12] block">
            Client Feedback
          </span>
          <h2 className="text-h2 text-[#0B0D12]">
            Clients Don't Just Say It. They Mean It.
          </h2>
          <p className="text-body text-[#5A5E6E]">
            Real feedback from partners who scale with AProgra.
          </p>
        </ScrollReveal>

        {/* TESTIMONIAL SLIDER — driven by scroll on desktop, interactive on mobile */}
        <div className="pt-2">
          <TestimonialSlider
            testimonials={TESTIMONIALS}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </div>

      </div>
    </section>
  );
}
