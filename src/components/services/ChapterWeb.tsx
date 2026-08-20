import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Code, Zap, ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterWeb() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;
      
      const scrollAmount = track.scrollWidth - window.innerWidth;
      
      gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollAmount}`,
        }
      });

      // Browser mockup parallax while scrolling horizontally
      gsap.to(mockupRef.current, {
        x: 300,
        y: 100,
        rotation: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollAmount}`,
          scrub: true,
        }
      });
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-snap-section data-no-snap="true" data-interactive-section="true" className="relative min-h-screen bg-offwhite text-navy overflow-hidden border-t border-navy/5 pt-20 lg:pt-0">
      <div className="absolute top-12 right-12 text-sm uppercase tracking-widest text-electric font-bold z-10 hidden lg:block">
        01 // Web Development
      </div>
      
      <div ref={trackRef} className="flex flex-col lg:flex-row lg:h-screen w-full lg:w-[200vw]">
        
        {/* Panel 1: Intro */}
        <div className="w-full lg:w-screen h-auto lg:h-screen flex flex-col justify-center px-6 md:px-24 xl:px-40 relative py-32 lg:py-0">
          <div className="max-w-4xl relative z-10 space-y-6">
            <h2 className="text-4xl md:text-7xl font-extrabold text-navy tracking-tight">
              The web is your <span className="text-gradient">digital flagship.</span>
            </h2>
            <p className="text-lg md:text-2xl text-muted max-w-2xl leading-relaxed">
              We build scalable, high-performance web platforms that demand attention and drive action. Not just websites—experiences.
            </p>
          </div>
          
          <div ref={mockupRef} className="absolute right-[-10%] md:right-12 top-1/2 -translate-y-1/2 w-64 md:w-[600px] aspect-[16/10] bg-white border border-navy/10 rounded-2xl overflow-hidden shadow-deep backdrop-blur-sm z-0 hidden md:block">
            {/* Browser chrome */}
            <div className="w-full h-9 bg-offwhite flex items-center px-4 gap-2 border-b border-navy/10">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            {/* Mockup content */}
            <div className="w-full h-full p-8 flex flex-col gap-4 opacity-70">
               <div className="w-1/3 h-8 bg-navy/10 rounded-md" />
               <div className="w-full h-32 bg-gradient-brand opacity-20 rounded-md mt-2" />
               <div className="flex gap-4">
                 <div className="w-1/2 h-24 bg-navy/5 rounded-md" />
                 <div className="w-1/2 h-24 bg-navy/5 rounded-md" />
               </div>
            </div>
          </div>
        </div>
        
        {/* Panel 2: Features */}
        <div className="w-full lg:w-screen h-auto lg:h-screen flex items-center px-6 md:px-24 xl:px-40 py-20 lg:py-0 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
            <div className="p-8 rounded-3xl bg-offwhite border border-navy/5 shadow-soft hover:shadow-deep transition-all group">
              <Monitor className="w-10 h-10 text-electric mb-6" />
              <h3 className="text-xl font-bold mb-3 text-navy">Custom Websites</h3>
              <p className="text-muted text-sm leading-relaxed">Immersive, story-driven marketing sites built with modern frameworks like Next.js and GSAP.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-offwhite border border-navy/5 shadow-soft hover:shadow-deep transition-all group md:translate-y-12">
              <Code className="w-10 h-10 text-magenta mb-6" />
              <h3 className="text-xl font-bold mb-3 text-navy">Web Apps</h3>
              <p className="text-muted text-sm leading-relaxed">Complex, data-heavy web applications, SaaS products, and internal tools engineered for scale.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-offwhite border border-navy/5 shadow-soft hover:shadow-deep transition-all group">
              <ShoppingCart className="w-10 h-10 text-electric mb-6" />
              <h3 className="text-xl font-bold mb-3 text-navy">E-Commerce</h3>
              <p className="text-muted text-sm leading-relaxed">High-converting digital storefronts that seamlessly blend brand storytelling with frictionless checkout.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-offwhite border border-navy/5 shadow-soft hover:shadow-deep transition-all group md:translate-y-12">
              <Zap className="w-10 h-10 text-magenta mb-6" />
              <h3 className="text-xl font-bold mb-3 text-navy">Performance</h3>
              <p className="text-muted text-sm leading-relaxed">Sub-second load times, flawless Core Web Vitals, and buttery smooth animations across all devices.</p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
