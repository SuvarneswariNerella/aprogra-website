import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, GraduationCap, MessageSquare, Bell, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { HomeProductCard } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

export default function OurProducts({ productsCards = [] }: { productsCards?: HomeProductCard[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(1);
  const stInstanceRef = useRef<ScrollTrigger | null>(null);

  const card1Data = productsCards[0] || {
    badge: "NOTIFICATION 01 / 02 • SCHOOL ERP",
    versionStatus: "v3.2 OPERATIONAL",
    category: "EdTech Platform",
    categorySubtext: "Multi-Campus Ready",
    title: "SmartSchool ERP",
    description: "The complete operational platform for modern institutions — unifying admissions, fee management, student records, and parent communication.",
    specs: ["Role-Based Portals", "Automated Fee Invoicing", "Instant SMS/WhatsApp Alerts", "Gradebook & Report Cards"],
    productUrl: "/products/school-erp",
    productUrlText: "View Product Details",
    demoUrl: "/contact",
    demoUrlText: "Request Demo →",
    imageUrl: "https://picsum.photos/seed/912714368/1200/800"
  };

  const card2Data = productsCards[1] || {
    badge: "NOTIFICATION 02 / 02 • OMNICHAT INBOX",
    versionStatus: "NEW MESSAGE",
    category: "Customer Engagement",
    categorySubtext: "AI-Assisted Inbox",
    title: "OmniChat",
    description: "Unify WhatsApp, Instagram DMs, Email, and SMS into one collaborative inbox powered by autonomous AI response suggestions.",
    specs: ["Omnichannel Inbox", "AI Smart Auto-Drafts", "Shared Team Assignments", "SLA & Analytics Tracking"],
    productUrl: "/products/omnichat",
    productUrlText: "View Product Details",
    demoUrl: "/contact",
    demoUrlText: "Request Demo →",
    imageUrl: "https://picsum.photos/seed/862930265/1200/800"
  };

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    if (!section || !stage || !card1 || !card2) return;

    const ctx = gsap.context(() => {
      // Initial setup: Card 1 fully visible at center, Card 2 positioned off-screen below
      gsap.set(card1, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", transformOrigin: "center center" });
      gsap.set(card2, { y: "120%", opacity: 0, scale: 0.98, transformOrigin: "center center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1400", // Smooth scroll distance for sticky reveal
          pin: true,     // Pin section vertically
          scrub: 0.6,    // Smooth scrubbing
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress >= 0.45) {
              setActiveCardIndex(2);
            } else {
              setActiveCardIndex(1);
            }
          }
        }
      });

      // Store scrollTrigger reference for indicator button clicks
      stInstanceRef.current = tl.scrollTrigger || null;

      // Entrance animation for Card 1
      if (leftContentRef.current) {
        gsap.fromTo(leftContentRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1, x: 0, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 30%", once: true }
          }
        );
      }

      if (rightContentRef.current) {
        gsap.fromTo(rightContentRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.4,
            scrollTrigger: { trigger: section, start: "top 30%", once: true }
          }
        );
      }

      // Phase 1 (0.0 -> 0.4): Card 1 remains fixed & fully visible while OmniChat remains hidden below
      tl.to(card1, {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4
      }, 0);

      tl.to(card2, {
        y: "120%",
        opacity: 0,
        duration: 0.4
      }, 0);

      // Phase 2 (0.4 -> 1.0): Card 2 slides up vertically & stacks over Card 1
      tl.to(card1, {
        scale: 0.94,
        y: -18,
        opacity: 0.75,
        filter: "blur(1px)",
        ease: "power2.out",
        duration: 0.6
      }, 0.4);

      tl.to(card2, {
        y: "0%",
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 0.6
      }, 0.4);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNotification = (index: number) => {
    const st = stInstanceRef.current;
    if (!st) return;

    const targetY = index === 1 ? st.start : st.end;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] py-6 sm:py-10 px-3 sm:px-6 flex flex-col justify-between items-center overflow-hidden border-b border-[#0B0D12]/10"
    >
      {/* SECTION HEADER wrapped in ScrollReveal */}
      <ScrollReveal className="text-center space-y-2 shrink-0 z-30 px-4 max-w-3xl mx-auto pt-1 sm:pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B0D12]/5 text-[#0B0D12] text-badge border border-[#0B0D12]/15">
          <Layers className="w-3.5 h-3.5 text-[#FF4A1C]" />
          <span>IN-HOUSE PRODUCTS • STACKED VIEW</span>
        </div>
        <h2 className="text-h2 text-[#0B0D12]">
          Products We Own &amp; Operate
        </h2>
        <p className="text-body text-[#5A5E6E] max-w-[540px] mx-auto hidden sm:block">
          Scroll down to reveal our stacked notification cards for enterprise digital solutions.
        </p>
      </ScrollReveal>

      {/* STACKED NOTIFICATION CARDS CONTAINER */}
      <div 
        ref={stageRef}
        className="relative w-full max-w-[1140px] h-[580px] sm:h-[600px] lg:h-[550px] my-auto flex items-center justify-center shrink-0 overflow-hidden"
      >
        
        {/* ==================== CARD 1: SmartSchool ERP (Notification #01) ==================== */}
        <div 
          ref={card1Ref}
          className="absolute inset-0 z-10 flex items-center justify-center p-1 sm:p-2"
          style={{ isolation: 'isolate', willChange: 'transform, filter, opacity' }}
        >
          {/* Notification Card Frame */}
          <div 
            className="relative w-full h-full rounded-lg p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden bg-[#FAF8F5] border border-[#0B0D12]/15 shadow-sm"
          >
            {/* Top Notification Header Bar */}
            <div className="relative z-10 flex items-center justify-between pb-3 mb-2 border-b border-[#0B0D12]/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#0B0D12] text-white">
                  <Bell className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold text-[#0B0D12] font-mono tracking-wider uppercase">
                  {card1Data.badge}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#0B0D12] bg-[#0B0D12]/5 border border-[#0B0D12]/10 px-2.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
                <span>{card1Data.versionStatus}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 h-full py-2">
              
              {/* Left Content: Minimalist & Clean */}
              <div ref={leftContentRef} className="w-full lg:w-[50%] flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B0D12] text-white text-caption font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-[#FF4A1C]" />
                      {card1Data.category}
                    </span>
                    <span className="text-caption text-[#5A5E6E] font-medium">{card1Data.categorySubtext}</span>
                  </div>

                  <h3 className="text-h2 text-[#0B0D12]">
                    {card1Data.title}
                  </h3>

                  <p className="text-body text-[#5A5E6E] max-w-[440px]">
                    {card1Data.description}
                  </p>

                  {/* Clean, Compact Key Capabilities */}
                  {card1Data.specs && card1Data.specs.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {card1Data.specs.map((spec) => (
                        <span 
                          key={spec}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#0B0D12]/10 text-caption text-[#0B0D12]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Streamlined Action */}
                <div className="pt-2 flex items-center gap-4 shrink-0">
                  <Link
                    to={card1Data.productUrl || "/products"}
                    className="px-5 py-2.5 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded font-medium text-xs transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span>{card1Data.productUrlText || "View Product Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to={card1Data.demoUrl || "/contact"}
                    className="text-xs font-semibold text-[#0B0D12] hover:text-[#FF4A1C] transition-colors"
                  >
                    {card1Data.demoUrlText || "Request Demo →"}
                  </Link>
                </div>
              </div>

              {/* Right Mockup: SmartSchool Product Image */}
              <div className="w-full lg:w-[50%] hidden sm:flex justify-center items-center">
                <div ref={rightContentRef} className="w-full max-w-[420px] aspect-[4/3] rounded-xl border border-[#0B0D12]/15 shadow-md overflow-hidden bg-white group">
                  <img 
                    src={card1Data.imageUrl || "https://picsum.photos/seed/912714368/1200/800"} 
                    alt={card1Data.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* ==================== CARD 2: OmniChat (Notification #02 - Slides up & stacks over Card 1) ==================== */}
        <div 
          ref={card2Ref}
          className="absolute inset-0 z-20 flex items-center justify-center p-1 sm:p-2"
          style={{ isolation: 'isolate', willChange: 'transform, opacity' }}
        >
          {/* Notification Card Frame */}
          <div 
            className="relative w-full h-full rounded-lg p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden bg-[#FAF8F5] border border-[#0B0D12]/20 shadow-md"
          >
            {/* Top Notification Header Bar */}
            <div className="relative z-10 flex items-center justify-between pb-3 mb-2 border-b border-[#0B0D12]/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#FF4A1C] text-white">
                  <Bell className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold text-[#0B0D12] font-mono tracking-wider uppercase">
                  {card2Data.badge}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF4A1C] bg-[#FF4A1C]/10 border border-[#FF4A1C]/20 px-2.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C] animate-pulse" />
                <span>{card2Data.versionStatus}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 h-full py-2">
              
              {/* Left Content: Minimalist & Clean */}
              <div className="w-full lg:w-[50%] flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B0D12] text-white text-caption font-medium">
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF4A1C]" />
                      {card2Data.category}
                    </span>
                    <span className="text-caption text-[#5A5E6E] font-medium">{card2Data.categorySubtext}</span>
                  </div>

                  <h3 className="text-h2 text-[#0B0D12]">
                    {card2Data.title}
                  </h3>

                  <p className="text-body text-[#5A5E6E] max-w-[440px]">
                    {card2Data.description}
                  </p>

                  {/* Clean, Compact Key Capabilities */}
                  {card2Data.specs && card2Data.specs.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {card2Data.specs.map((spec) => (
                        <span 
                          key={spec}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#0B0D12]/10 text-caption text-[#0B0D12]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Streamlined Action */}
                <div className="pt-2 flex items-center gap-4 shrink-0">
                  <Link
                    to={card2Data.productUrl || "/products"}
                    className="px-5 py-2.5 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded font-medium text-xs transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span>{card2Data.productUrlText || "View Product Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to={card2Data.demoUrl || "/contact"}
                    className="text-xs font-semibold text-[#0B0D12] hover:text-[#FF4A1C] transition-colors"
                  >
                    {card2Data.demoUrlText || "Request Demo →"}
                  </Link>
                </div>
              </div>

              {/* Right Mockup: OmniChat Product Image */}
              <div className="w-full lg:w-[50%] hidden sm:flex justify-center items-center">
                <div className="w-full max-w-[420px] aspect-[4/3] rounded-xl border border-[#0B0D12]/15 shadow-md overflow-hidden bg-white group">
                  <img 
                    src={card2Data.imageUrl || "https://picsum.photos/seed/862930265/1200/800"} 
                    alt={card2Data.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* FLOATING STACK CONTROLLER / INDICATOR */}
      <div className="z-30 shrink-0 py-1">
        <div className="inline-flex items-center gap-2 p-1.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 shadow-xs">
          <button
            onClick={() => scrollToNotification(1)}
            className={`px-3.5 py-1.5 rounded text-xs font-bold font-mono transition-colors duration-150 flex items-center gap-1.5 cursor-pointer ${
              activeCardIndex === 1
                ? 'bg-[#0B0D12] text-white'
                : 'text-[#5A5E6E] hover:text-[#0B0D12]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeCardIndex === 1 ? 'bg-[#FF4A1C]' : 'bg-[#0B0D12]/40'}`} />
            01 • {card1Data.title.split(' ')[0]}
          </button>

          <button
            onClick={() => scrollToNotification(2)}
            className={`px-3.5 py-1.5 rounded text-xs font-bold font-mono transition-colors duration-150 flex items-center gap-1.5 cursor-pointer ${
              activeCardIndex === 2
                ? 'bg-[#0B0D12] text-white'
                : 'text-[#5A5E6E] hover:text-[#0B0D12]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeCardIndex === 2 ? 'bg-[#FF4A1C]' : 'bg-[#0B0D12]/40'}`} />
            02 • {card2Data.title.split(' ')[0]}
          </button>
        </div>
      </div>

    </section>
  );
}

