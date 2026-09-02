import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeServiceSlide } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ servicesSlides = [] }: { servicesSlides?: HomeServiceSlide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const slides = servicesSlides && servicesSlides.length > 0
    ? servicesSlides
    : [
        {
          id: "1",
          orderNumber: "01",
          badgeText: "Core Service",
          title: "Product Engineering",
          description: "We don't just build features — we engineer products. From architecture decisions to deployment pipelines, every choice we make is deliberate, scalable, and built to last.",
          tags: ["Discovery", "Architecture", "Development", "QA", "Launch"],
          serviceUrl: "/services",
          serviceUrlText: "Explore Service",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "2",
          orderNumber: "02",
          badgeText: "Mobile Systems",
          title: "Mobile Development",
          description: "iOS, Android, or cross-platform. We build mobile experiences that feel native, perform flawlessly, and keep users coming back. Offline-first, animation-rich, crash-free.",
          tags: ["iOS & Android", "React Native", "Flutter", "Offline-First", "App Store Ops"],
          serviceUrl: "/services",
          serviceUrlText: "Explore Service",
          imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "3",
          orderNumber: "03",
          badgeText: "Applied AI",
          title: "AI Integration & Automation",
          description: "From custom LLM integrations to intelligent workflow automations — we make AI work for your actual business, not just your marketing copy.",
          tags: ["LLM Pipelines", "RAG Systems", "Agents & Swarms", "Data Triage", "Fine-Tuning"],
          serviceUrl: "/services",
          serviceUrlText: "Explore Service",
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "4",
          orderNumber: "04",
          badgeText: "Product Design",
          title: "UI/UX & Design Systems",
          description: "Design that converts. Interfaces that feel effortless. We craft design systems, component libraries, and end-to-end user journeys that elevate your brand.",
          tags: ["Design Systems", "Component Libraries", "Wireframing", "Motion Design", "Figma to Code"],
          serviceUrl: "/services",
          serviceUrlText: "Explore Service",
          imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "5",
          orderNumber: "05",
          badgeText: "Cloud & SRE",
          title: "Cloud Architecture & DevOps",
          description: "Infrastructure that scales without drama. CI/CD pipelines that deploy with confidence. Cloud architectures engineered for 99.99% uptime and zero maintenance headaches.",
          tags: ["AWS / GCP", "Docker & K8s", "CI/CD Pipelines", "Zero-Downtime", "24/7 Monitoring"],
          serviceUrl: "/services",
          serviceUrlText: "Explore Service",
          imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "6",
          orderNumber: "06",
          badgeText: "Modernization",
          title: "Legacy Modernization & Audits",
          description: "Inherited a codebase that gives you nightmares? We audit, refactor, and migrate legacy systems into clean, modern architectures without disrupting your live operations.",
          tags: ["Architecture Audits", "Codebase Refactoring", "Database Migration", "Performance Tuning", "Zero-Downtime"],
          serviceUrl: "/services",
          serviceUrlText: "Explore Service",
          imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80"
        }
      ];

  const totalCards = slides.length + 1; // + 1 for final CTA card

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const totalWidth = (totalCards - 1) * 100; // in vw

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalWidth * 12}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * totalCards),
              totalCards - 1
            );
            setActiveCardIndex(index);
          }
        }
      });

      // Entrance animation for Card 1
      if (leftContentRef.current) {
        gsap.fromTo(leftContentRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1, x: 0, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: container, start: "top 30%", once: true }
          }
        );
      }

      if (rightContentRef.current) {
        gsap.fromTo(rightContentRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.4,
            scrollTrigger: { trigger: container, start: "top 30%", once: true }
          }
        );
      }

      // Horizontal Scroll Animation
      tl.to(track, {
        x: `-${(totalCards - 1) * 100}vw`,
        ease: "none"
      }, 0);

      // Progress bar fill
      if (progressBarRef.current) {
        tl.to(progressBarRef.current, {
          scaleX: 1,
          ease: "none"
        }, 0);
      }

    }, containerRef);

    return () => ctx.revert();
  }, [totalCards]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-[#F4F1EA] overflow-hidden border-b border-[#0B0D12]/10"
    >
      {/* STICKY HEADER */}
      <div className="absolute top-6 inset-x-6 sm:inset-x-12 z-30 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 shadow-xs text-xs font-bold uppercase tracking-wider text-[#0B0D12] font-mono">
          <span>Our Services</span>
        </div>

        <div className="px-3.5 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 shadow-xs text-xs font-bold uppercase tracking-wider text-[#0B0D12] font-mono">
          <span>0{Math.min(activeCardIndex + 1, totalCards)} / 0{totalCards}</span>
        </div>
      </div>

      {/* HORIZONTAL CARDS TRACK */}
      <div 
        ref={trackRef}
        style={{ width: `${totalCards * 100}vw` }}
        className="flex h-full will-change-transform"
      >
        {slides.map((slide, idx) => (
          <div 
            key={slide.id || idx}
            className={`w-[100vw] h-full shrink-0 p-6 sm:p-12 md:p-20 flex items-center justify-center relative ${
              idx % 2 === 0 ? 'bg-[#F4F1EA]' : 'bg-[#FAF8F5]'
            } ${idx !== 0 ? 'border-l border-[#0B0D12]/10' : ''}`}
          >
            <div className="absolute top-8 left-12 text-[200px] sm:text-[260px] font-bold font-display text-[#0B0D12]/5 select-none pointer-events-none leading-none">
              {slide.orderNumber || (idx + 1 < 10 ? `0${idx + 1}` : idx + 1)}
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-12">
              <div ref={idx === 0 ? leftContentRef : undefined} className={`space-y-5`}>
                <span className="px-2.5 py-0.5 rounded bg-[#0B0D12] text-white text-badge uppercase">
                  {slide.badgeText || "Core Service"}
                </span>
                <h2 className="text-h2 text-[#0B0D12]">
                  {slide.title}
                </h2>
                <p className="text-body-lg text-[#5A5E6E]">
                  {slide.description}
                </p>

                {slide.tags && slide.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {slide.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-label-mono text-[#0B0D12]">
                        • {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link to={slide.serviceUrl || "/services"} className="inline-flex items-center gap-2 text-[#0B0D12] text-badge hover:text-[#FF4A1C] transition-colors pt-4">
                  <span>{slide.serviceUrlText || "Explore Service"}</span>
                  <ArrowRight className="w-4 h-4 text-[#FF4A1C]" />
                </Link>
              </div>

              {/* Right Image */}
              <div ref={idx === 0 ? rightContentRef : undefined} className={`w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#0B0D12]/15 bg-[#FAF8F5] shadow-lg group`}>
                <img 
                  src={slide.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"} 
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}

        {/* FINAL CARD: Full Dark TAKEOVER */}
        <div className="w-[100vw] h-full shrink-0 bg-[#0B0D12] text-[#F4F1EA] p-6 sm:p-12 md:p-20 flex flex-col items-center justify-center relative text-center space-y-8">
          <h2 className="text-h2 max-w-3xl text-white">
            Ready to build something remarkable?
          </h2>

          <div className="flex flex-col items-center gap-4">
            <Link 
              to="/contact"
              className="h-12 px-8 rounded bg-[#FF4A1C] text-white hover:bg-[#FF4A1C]/90 text-badge transition-colors flex items-center gap-3 shadow-xs"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link to="/services" className="text-caption text-[#F4F1EA]/70 hover:text-white underline pt-2">
              or explore all services
            </Link>
          </div>
        </div>

      </div>

      {/* BOTTOM PROGRESS LINE */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-[#0B0D12]/10 z-30">
        <div 
          ref={progressBarRef}
          className="h-full bg-[#FF4A1C] w-full origin-left scale-x-0" 
        />
      </div>
    </section>
  );
}
