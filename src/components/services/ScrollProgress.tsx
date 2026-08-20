import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Infinity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale the progress line
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });
      
      // Move the infinity icon down the line
      gsap.to(iconRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed left-6 md:left-12 top-[20%] bottom-[20%] w-[2px] bg-white/5 z-40 hidden xl:block rounded-full">
       <div 
         ref={progressRef} 
         className="absolute top-0 left-0 w-full h-full bg-gradient-brand origin-top scale-y-0 rounded-full" 
       />
       <div 
         ref={iconRef} 
         className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-electric bg-navy p-1 rounded-full border border-white/10 shadow-[0_0_15px_rgba(59,91,255,0.5)]"
       >
         <Infinity className="w-6 h-6 animate-pulse" />
       </div>
    </div>
  );
}
