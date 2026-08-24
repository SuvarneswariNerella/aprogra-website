import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBrands, useTestimonials } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  name: string;
}

function MagneticClientCard({ name }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;

    setTransform({
      x: Math.max(-8, Math.min(8, deltaX)),
      y: Math.max(-8, Math.min(8, deltaY)),
      scale: 1.05
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${transform.scale})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      className={`w-[180px] sm:w-[200px] h-[70px] sm:h-[80px] shrink-0 bg-white border rounded-xl flex items-center justify-center p-4 cursor-pointer text-center font-space font-semibold text-sm sm:text-base transition-colors duration-200 ${
        isHovered
          ? 'border-[#3B4FCF] text-[#3B4FCF] shadow-lg shadow-[#3B4FCF]/10'
          : 'border-[#E4E8FF] text-[#0D0F1C] shadow-sm'
      }`}
    >
      <span>{name}</span>
    </div>
  );
}

export default function ClientsAndPartnersServices() {
  const { row1Brands, row2Brands } = useBrands();
  const { testimonials } = useTestimonials();
  const row1Names = row1Brands.map(b => b.name);
  const row2Names = row2Brands.map(b => b.name);
  const row3Names = [...row1Names];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Counter Refs
  const count1Ref = useRef<HTMLSpanElement>(null);
  const count2Ref = useRef<HTMLSpanElement>(null);
  const count3Ref = useRef<HTMLSpanElement>(null);
  const count4Ref = useRef<HTMLSpanElement>(null);

  const testimonialsList = testimonials.map(t => ({
    img: t.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: t.quote,
    name: t.authorName,
    role: t.authorCompany ? `${t.authorRole}, ${t.authorCompany}` : t.authorRole,
  }));

  // Auto rotate testimonials
  useEffect(() => {
    if (testimonialsList.length === 0) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonialsList.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Counters Animation
      const counters = [
        { ref: count1Ref, val: 60, suffix: '+' },
        { ref: count2Ref, val: 12, suffix: '' },
        { ref: count3Ref, val: 40, suffix: '+' },
        { ref: count4Ref, val: 7, suffix: '+' }
      ];

      counters.forEach((item) => {
        if (!item.ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.val,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
          onUpdate: () => {
            if (item.ref.current) {
              item.ref.current.textContent = `${Math.floor(obj.val)}${item.suffix}`;
            }
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = testimonialsList[activeTestimonial] || testimonialsList[0] || {
    img: '',
    quote: '',
    name: '',
    role: ''
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-white text-[#0D0F1C] py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-b border-[#E4E8FF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* 1. SECTION LABEL, HEADING, AND SUBTITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3B4FCF] font-mono block">
            CLIENTS & PARTNERS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0D0F1C] font-space leading-tight">
            Brands That Chose to Build Different
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed">
            We've partnered with startups, scaleups, and enterprises who believe great software changes everything.
          </p>
        </div>

        {/* 2. TESTIMONIAL / PROFILE LAYER */}
        {testimonialsList.length > 0 && (
          <div className="max-w-3xl mx-auto bg-[#F7F8FF] border border-[#E4E8FF] rounded-3xl p-6 sm:p-10 text-center shadow-sm space-y-6 relative">
            
            {/* Avatar Profile Image */}
            <div className="flex justify-center">
              <img 
                src={current.img} 
                alt={current.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white shadow-md transition-all duration-300"
              />
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-lg sm:text-2xl font-bold text-[#0D0F1C] font-space leading-relaxed px-2 sm:px-6 min-h-[80px] sm:min-h-[90px] flex items-center justify-center transition-opacity duration-300">
              "{current.quote}"
            </blockquote>

            {/* Author Name and Role */}
            <div className="space-y-1">
              <p className="text-base font-bold text-[#3B4FCF] font-space">
                {current.name}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#6B7280] font-mono uppercase tracking-wider">
                {current.role}
              </p>
            </div>

            {/* Testimonial Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {testimonialsList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeTestimonial === idx
                      ? 'bg-[#3B4FCF] text-white font-bold shadow-sm scale-105'
                      : 'bg-white border border-[#E4E8FF] text-[#6B7280] hover:text-[#0D0F1C] hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* 3. CLIENT & PARTNER CARDS LAYER */}
        <div className="space-y-6 overflow-hidden py-4">
          
          {/* ROW 1: Scrolls LEFT */}
          <div className="flex gap-6 animate-marquee-fast hover:[animation-play-state:paused]">
            {[...row1Names, ...row1Names, ...row1Names].map((client, idx) => (
              <MagneticClientCard key={`r1-${idx}`} name={client} />
            ))}
          </div>

          {/* ROW 2: Scrolls RIGHT */}
          <div className="flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...row2Names, ...row2Names, ...row2Names].map((client, idx) => (
              <MagneticClientCard key={`r2-${idx}`} name={client} />
            ))}
          </div>

          {/* ROW 3: Scrolls LEFT */}
          <div className="flex gap-6 animate-marquee-medium hover:[animation-play-state:paused]">
            {[...row3Names, ...row3Names, ...row3Names].map((client, idx) => (
              <MagneticClientCard key={`r3-${idx}`} name={client} />
            ))}
          </div>

        </div>

        {/* 4. BOTTOM COUNTER ROW */}
        <div className="pt-12 border-t border-[#E4E8FF] grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
          
          <div className="space-y-1">
            <span ref={count1Ref} className="block text-4xl sm:text-5xl font-bold text-[#3B4FCF] font-space">
              0+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
              Clients
            </span>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-[#E4E8FF]">
            <span ref={count2Ref} className="block text-4xl sm:text-5xl font-bold text-[#3B4FCF] font-space">
              0
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
              Countries
            </span>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-[#E4E8FF]">
            <span ref={count3Ref} className="block text-4xl sm:text-5xl font-bold text-[#3B4FCF] font-space">
              0+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
              Products
            </span>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-[#E4E8FF]">
            <span ref={count4Ref} className="block text-4xl sm:text-5xl font-bold text-[#F0A500] font-space">
              0+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
              Years Experience
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
