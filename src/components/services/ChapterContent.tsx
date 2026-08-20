import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenTool, Megaphone, Presentation, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(visualRef.current, {
        y: 150,
        rotation: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-snap-section className="relative min-h-screen bg-offwhite text-navy py-20 md:py-32 px-6 md:px-24 xl:pl-40 overflow-hidden border-t border-navy/5 flex flex-col justify-center">
      <div className="absolute top-12 right-12 text-sm uppercase tracking-widest text-magenta font-bold z-10 hidden md:block">
        04 // Content & Marketing
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 relative z-10">
        
        <div className="flex-1 w-full relative h-[500px] hidden md:block">
           <div ref={visualRef} className="absolute inset-0 flex items-center justify-center">
              {/* Abstract layered visual for content */}
              <div className="absolute w-[400px] h-[300px] bg-gradient-brand opacity-20 rounded-3xl blur-2xl transform rotate-12" />
              <div className="absolute w-[350px] h-[450px] bg-white border border-navy/10 rounded-3xl shadow-deep p-6 flex flex-col gap-4 transform -rotate-6">
                 <div className="w-1/2 h-8 bg-navy/10 rounded" />
                 <div className="w-full h-32 bg-offwhite border border-navy/5 rounded-2xl" />
                 <div className="w-full h-4 bg-navy/10 rounded mt-4" />
                 <div className="w-5/6 h-4 bg-navy/10 rounded" />
                 <div className="w-4/6 h-4 bg-navy/10 rounded" />
                 
                 <div className="mt-auto flex justify-between items-center">
                    <div className="w-10 h-10 bg-navy/10 rounded-full" />
                    <div className="w-24 h-10 bg-gradient-brand rounded-full opacity-90 shadow-sm" />
                 </div>
              </div>
           </div>
        </div>

        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight">
              Giving your brand a <span className="text-gradient">voice.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted leading-relaxed">
              Great engineering deserves great storytelling. We create compelling content and marketing strategies that capture attention and drive growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="group p-5 rounded-2xl bg-white border border-navy/5 shadow-soft hover:shadow-deep transition-all">
               <PenTool className="w-8 h-8 text-magenta mb-4 group-hover:scale-110 transition-transform" />
               <h4 className="font-bold text-navy mb-1">Content Creation</h4>
               <p className="text-xs text-muted leading-relaxed">High-quality copywriting, technical writing, and visual assets.</p>
             </div>
             <div className="group p-5 rounded-2xl bg-white border border-navy/5 shadow-soft hover:shadow-deep transition-all">
               <Megaphone className="w-8 h-8 text-electric mb-4 group-hover:scale-110 transition-transform" />
               <h4 className="font-bold text-navy mb-1">Brand Marketing</h4>
               <p className="text-xs text-muted leading-relaxed">Strategic positioning and campaigns that resonate with your audience.</p>
             </div>
             <div className="group p-5 rounded-2xl bg-white border border-navy/5 shadow-soft hover:shadow-deep transition-all">
               <Video className="w-8 h-8 text-electric mb-4 group-hover:scale-110 transition-transform" />
               <h4 className="font-bold text-navy mb-1">Media Production</h4>
               <p className="text-xs text-muted leading-relaxed">Video content, animations, and interactive media.</p>
             </div>
             <div className="group p-5 rounded-2xl bg-white border border-navy/5 shadow-soft hover:shadow-deep transition-all">
               <Presentation className="w-8 h-8 text-magenta mb-4 group-hover:scale-110 transition-transform" />
               <h4 className="font-bold text-navy mb-1">Social Strategy</h4>
               <p className="text-xs text-muted leading-relaxed">Building communities and driving engagement across platforms.</p>
             </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
