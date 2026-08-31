import React, { useRef, useState, useEffect } from 'react';
import { Component as TestimonialSlider } from '@/components/ui/testimonial-slider';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTestimonials } from '@/lib/strapi';

export default function TestimonialsServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { testimonials: apiTestimonials } = useTestimonials();
  const TESTIMONIALS = apiTestimonials.map(t => ({
    img: t.avatarUrl || "https://picsum.photos/seed/191650684/1200/800",
    quote: t.quote,
    name: t.authorName,
    role: t.authorCompany ? `${t.authorRole}, ${t.authorCompany}` : t.authorRole,
  }));

  // Scroll-driven progression: change testimonial one-by-one as user scrolls down
  useEffect(() => {
    if (!containerRef.current || TESTIMONIALS.length === 0) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;
      if (totalDistance <= 0) return;

      // When container top reaches viewport top (rect.top <= 0)
      const scrollOffset = -rect.top;
      const progress = Math.min(1, Math.max(0, scrollOffset / totalDistance));

      const count = TESTIMONIALS.length;
      const newIndex = Math.min(
        count - 1,
        Math.max(0, Math.floor(progress * count))
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [TESTIMONIALS.length]);

  const handleActiveChange = (newIndex: number) => {
    setActiveIndex(newIndex);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerStart = rect.top + scrollTop;
    const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
    if (totalDistance <= 0) return;

    const step = totalDistance / Math.max(1, TESTIMONIALS.length - 1);
    const targetScroll = containerStart + newIndex * step;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      style={{ height: `${Math.max(1, TESTIMONIALS.length) * 85}vh` }}
      className="relative w-full bg-[#FAF8F5] text-[#0B0D12] border-t border-b border-[#0B0D12]/10 m-0 p-0"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 md:px-12 overflow-hidden m-0 p-0">
        <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
          
          {/* HEADING wrapped in ScrollReveal */}
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

          {/* TESTIMONIAL SLIDER (Driven by scroll activeIndex) */}
          <div className="pt-2">
            <TestimonialSlider 
              testimonials={TESTIMONIALS} 
              activeIndex={activeIndex} 
              onActiveChange={handleActiveChange}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
