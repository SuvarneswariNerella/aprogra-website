import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Apple, Combine, Fingerprint, Infinity as InfinityIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterMobile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phone1Ref = useRef<HTMLDivElement>(null);
  const phone2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(phone1Ref.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      
      gsap.to(phone2Ref.current, {
        y: -300,
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
    <section ref={sectionRef} data-snap-section className="relative min-h-screen bg-white text-navy py-20 md:py-32 px-6 md:px-24 xl:pl-40 overflow-hidden border-t border-navy/5 flex flex-col justify-center">
      <div className="absolute top-12 right-12 text-sm uppercase tracking-widest text-magenta font-bold z-10 hidden md:block">
        02 // Mobile Apps
      </div>
      
      <div className="absolute right-0 top-0 text-navy/5 pointer-events-none overflow-hidden h-full w-1/2 flex items-center justify-end">
         <InfinityIcon className="w-[150%] h-[150%] -mr-[50%] text-magenta opacity-10" />
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        <div className="flex-1 w-full relative h-[600px] hidden md:block perspective-1000">
           {/* Phone Mockup 1 (Background) */}
           <div ref={phone1Ref} className="absolute left-10 top-20 w-[240px] h-[500px] rounded-[3rem] border-8 border-navy/10 bg-offwhite shadow-deep rotate-[-5deg] overflow-hidden">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-navy rounded-b-xl z-20" />
              <div className="w-full h-full p-4 flex flex-col gap-4 opacity-70 bg-gradient-to-br from-magenta/10 to-offwhite">
                 <div className="w-12 h-12 rounded-full bg-navy/10 mt-8" />
                 <div className="w-3/4 h-4 bg-navy/20 rounded" />
                 <div className="w-1/2 h-4 bg-navy/10 rounded" />
                 <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="aspect-square rounded-xl bg-navy/10" />
                    <div className="aspect-square rounded-xl bg-navy/10" />
                 </div>
              </div>
           </div>
           
           {/* Phone Mockup 2 (Foreground) */}
           <div ref={phone2Ref} className="absolute right-10 top-40 w-[260px] h-[540px] rounded-[3rem] border-8 border-navy/20 bg-white shadow-deep rotate-[5deg] overflow-hidden z-20">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-navy rounded-b-xl z-20" />
              <div className="w-full h-full p-4 flex flex-col bg-gradient-to-tr from-electric/10 to-white">
                 <div className="w-full h-40 bg-gradient-brand rounded-2xl mt-8 opacity-90 shadow-md" />
                 <div className="w-full h-16 bg-offwhite border border-navy/5 rounded-xl mt-4" />
                 <div className="w-full h-16 bg-offwhite border border-navy/5 rounded-xl mt-4" />
                 <div className="w-full h-16 bg-offwhite border border-navy/5 rounded-xl mt-4" />
              </div>
           </div>
        </div>

        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight">
              Products people hold in their <span className="text-gradient">hands.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted leading-relaxed">
              We design and engineer native-feel mobile applications that become a seamless part of your users' daily lives. Intuitive, fast, and unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="flex items-start gap-4 p-4 rounded-2xl bg-offwhite border border-navy/5">
               <div className="p-3 bg-white rounded-xl text-navy shadow-sm">
                 <Apple className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-navy mb-1">iOS Native</h4>
                 <p className="text-xs text-muted">Swift-powered experiences built for the Apple ecosystem.</p>
               </div>
             </div>
             <div className="flex items-start gap-4 p-4 rounded-2xl bg-offwhite border border-navy/5">
               <div className="p-3 bg-white rounded-xl text-navy shadow-sm">
                 <Smartphone className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-navy mb-1">Android Native</h4>
                 <p className="text-xs text-muted">Kotlin excellence for the world's largest mobile platform.</p>
               </div>
             </div>
             <div className="flex items-start gap-4 p-4 rounded-2xl bg-offwhite border border-navy/5">
               <div className="p-3 bg-white rounded-xl text-electric shadow-sm">
                 <Combine className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-navy mb-1">Cross-Platform</h4>
                 <p className="text-xs text-muted">React Native and Flutter apps that run flawlessly anywhere.</p>
               </div>
             </div>
             <div className="flex items-start gap-4 p-4 rounded-2xl bg-offwhite border border-navy/5">
               <div className="p-3 bg-white rounded-xl text-magenta shadow-sm">
                 <Fingerprint className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-navy mb-1">UX Obsessed</h4>
                 <p className="text-xs text-muted">Micro-interactions and gestures that feel deeply human.</p>
               </div>
             </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
