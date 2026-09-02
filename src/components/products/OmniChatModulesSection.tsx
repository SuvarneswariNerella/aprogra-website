import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export interface OmniChatModuleItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  kpi: string;
  image?: string;
  color?: string;
  tag?: string;
  highlights?: string[];
}

interface OmniChatModulesSectionProps {
  modules: OmniChatModuleItem[];
  className?: string;
}

const DEFAULT_OMNICHAT_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?auto=format&fit=crop&w=1200&q=80",
];

export const OmniChatModulesSection: React.FC<OmniChatModulesSectionProps> = ({
  modules,
  className = ""
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || modules.length === 0) return;

    const scrollDistance = (modules.length - 1) * 260;

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: section,
        start: 'top top+=76',
        end: `+=${scrollDistance}`,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const rawIdx = self.progress * (modules.length - 1);
          setActiveIndex(Math.min(Math.round(rawIdx), modules.length - 1));
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [modules]);

  const scrollToModule = (index: number) => {
    setActiveIndex(index);
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop && sectionRef.current) {
      const scrollDistance = (modules.length - 1) * 260;
      const startY = sectionRef.current.getBoundingClientRect().top + window.scrollY - 76;
      const targetScroll = startY + (index / Math.max(modules.length - 1, 1)) * scrollDistance;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const handleNext = () => { if (activeIndex < modules.length - 1) scrollToModule(activeIndex + 1); };
  const handlePrev = () => { if (activeIndex > 0) scrollToModule(activeIndex - 1); };

  return (
    <section
      id="omnichat"
      ref={sectionRef}
      className={`relative w-full min-h-[calc(100vh-76px)] bg-[#FAF8F5] border-b border-[#0B0D12]/10 flex items-center justify-center py-8 px-4 sm:px-6 md:px-12 select-none ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4 text-left">
          
          <ScrollReveal className="space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-[#0B0D12]/15 bg-white text-[#0B0D12] text-xs font-semibold shadow-2xs">
                <MessageSquare className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span className="text-[#FF4A1C] font-mono font-bold">Product #2</span>
                <span className="text-[#5A5E6E]">· Omnichannel AI &amp; Meta Suite</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#0B0D12] leading-tight tracking-tight">
                OmniChat AI <br />
                <span className="text-[#FF4A1C] font-bold text-xl sm:text-2xl lg:text-3xl block mt-0.5">
                  {modules.length} Connected AI Automation Channels
                </span>
              </h2>
              
              <p className="text-xs sm:text-sm text-[#5A5E6E] leading-relaxed max-w-md">
                Unify WhatsApp Business API, Instagram DMs, Telegram bots, and Facebook Messenger into one AI-augmented workspace with visual workflow automation.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-0.5">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                <span className="block text-sm sm:text-base font-bold font-display text-[#0B0D12] group-hover:text-[#FF4A1C] transition-colors">
                  4
                </span>
                <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                  Channels
                </span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                <span className="block text-sm sm:text-base font-bold font-display text-[#FF4A1C]">
                  &lt;200ms
                </span>
                <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                  AI Latency
                </span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                <span className="block text-sm sm:text-base font-bold font-display text-[#0B0D12] group-hover:text-[#FF4A1C] transition-colors">
                  99.98%
                </span>
                <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                  SLA Uptime
                </span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#0B0D12]/12 shadow-2xs text-center group hover:border-[#FF4A1C]/35 transition-all">
                <span className="block text-sm sm:text-base font-bold font-display text-[#FF4A1C]">
                  Meta
                </span>
                <span className="text-[9px] font-mono text-[#5A5E6E] uppercase font-medium block leading-tight">
                  Verified
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-[#5A5E6E] font-bold tracking-wider block">
                Quick-Jump to Capability
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[130px] overflow-y-auto pr-1">
                {modules.map((m, mIdx) => (
                  <button
                    key={mIdx}
                    type="button"
                    onClick={() => scrollToModule(mIdx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                      mIdx === activeIndex
                        ? 'bg-[#0B0D12] text-white font-bold shadow-xs'
                        : 'bg-white text-[#5A5E6E] hover:text-[#0B0D12] border border-[#0B0D12]/10 hover:border-[#0B0D12]/30'
                    }`}
                  >
                    {String(mIdx + 1).padStart(2, '0')} {m.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-1 flex flex-wrap gap-2.5 sm:gap-3 items-center">
              <Link
                to="/contact"
                className="h-10 px-5 rounded-xl bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Deploy OmniChat AI</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products/omnichat"
                className="h-10 px-4 rounded-xl bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center"
              >
                Explore Channels
              </Link>
            </div>
          </ScrollReveal>

        </div>

        <div className="lg:col-span-7 flex flex-col justify-center items-center">
          
          <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2.5 mb-4 px-1 select-none">
            
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#0B0D12]/12 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span className="text-xs font-mono font-bold text-[#0B0D12]">
                {modules.length} Capabilities Slideshow
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-full border border-[#0B0D12]/12 shadow-2xs">
              {modules.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToModule(i)}
                  aria-label={`Jump to capability ${i + 1}`}
                  title={`Capability ${i + 1}: ${modules[i]?.title}`}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    i === activeIndex 
                      ? 'w-5 bg-[#FF4A1C]' 
                      : 'w-1.5 bg-[#0B0D12]/20 hover:bg-[#0B0D12]/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <div className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#5A5E6E] bg-white px-2.5 py-1 rounded-md border border-[#0B0D12]/10">
                {String(activeIndex + 1).padStart(2, '0')} / {String(modules.length).padStart(2, '0')}
              </div>
              <button 
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous capability"
                className="p-1.5 rounded-lg bg-white border border-[#0B0D12]/10 text-[#0B0D12] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button"
                onClick={handleNext}
                disabled={activeIndex === modules.length - 1}
                aria-label="Next capability"
                className="p-1.5 rounded-lg bg-white border border-[#0B0D12]/10 text-[#0B0D12] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[#0B0D12]/15 bg-white shadow-xl group">
              
              {modules.map((mod, index) => {
                const isActive = index === activeIndex;
                const imgSrc = mod.image || DEFAULT_OMNICHAT_IMAGES[index % DEFAULT_OMNICHAT_IMAGES.length];
                const ModIcon = mod.icon;

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      isActive 
                        ? 'opacity-100 scale-100 z-10 pointer-events-auto' 
                        : 'opacity-0 scale-98 z-0 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={imgSrc} 
                      alt={mod.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={index === 0 ? "eager" : "lazy"}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/85 via-[#0B0D12]/25 to-transparent pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B0D12]/80 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono font-bold">
                          <ModIcon className="w-3 h-3 text-[#FF4A1C]" />
                          <span>CAP {String(index + 1).padStart(2, '0')}</span>
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-[#0B0D12]/10 text-[#0B0D12] text-[10px] font-mono font-bold uppercase tracking-wider">
                          {mod.tag || "OMNICHAT"}
                        </span>
                      </div>

                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                        100% Meta Verified
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 sm:p-4 rounded-xl bg-[#0B0D12]/80 backdrop-blur-md border border-white/15 text-white space-y-1.5 shadow-lg">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                          <span>{mod.title}</span>
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-[#FF4A1C] border border-[#FF4A1C]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
                          {mod.kpi}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-[13px] text-white/80 line-clamp-2 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#5A5E6E] bg-white px-3 py-1 rounded-full border border-[#0B0D12]/12 shadow-2xs select-none">
            <ChevronDown className="w-3.5 h-3.5 text-[#FF4A1C] animate-bounce" />
            <span>
              {activeIndex === modules.length - 1 
                ? "All 6 capabilities explored · Continue scrolling" 
                : `Scroll or click to explore next capability (${activeIndex + 1}/${modules.length})`}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OmniChatModulesSection;
