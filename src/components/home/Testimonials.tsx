import React, { useRef, useState, useEffect } from 'react';
import { Component as TestimonialSlider } from '@/components/ui/testimonial-slider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTestimonials } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { testimonials: apiTestimonials } = useTestimonials();
  const TESTIMONIALS = apiTestimonials.map(t => ({
    img: t.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: t.quote,
    name: t.authorName,
    role: t.authorCompany ? `${t.authorRole}, ${t.authorCompany}` : t.authorRole,
  }));

  useEffect(() => {
    if (!containerRef.current || TESTIMONIALS.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const count = TESTIMONIALS.length;
          const newIndex = Math.min(
            count - 1,
            Math.max(0, Math.floor(self.progress * count))
          );
          setActiveIndex(newIndex);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [TESTIMONIALS.length]);

  const handleActiveChange = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-16 px-4 sm:px-6 md:px-12 bg-[#FAF8F5] text-[#0B0D12] border-b border-[#0B0D12]/10 overflow-hidden"
    >
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

        {/* TESTIMONIAL SLIDER */}
        <div className="pt-2">
          <TestimonialSlider 
            testimonials={TESTIMONIALS} 
            activeIndex={activeIndex} 
            onActiveChange={handleActiveChange}
          />
        </div>

      </div>
    </section>
  );
}
