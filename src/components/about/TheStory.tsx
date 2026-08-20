import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "Aprogra was born from a realization: too many agencies operate in silos, forcing clients to piece together solutions from fragmented vendors.",
  "We wanted to build something different. A true engineering partner capable of seeing the whole picture—from the first line of code to the overarching brand narrative.",
  "Our team is an assembly of obsessives: engineers, designers, and strategists who believe that the best products feel inevitable, intuitive, and deeply human.",
  "Whether we are crafting a new digital flagship, deploying autonomous AI agents, or building our own products like School ERP, our standard remains the same: relentless quality."
];

export default function TheStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paras = gsap.utils.toArray('.story-para').filter(Boolean);
      
      paras.forEach((para: any) => {
        if (para) {
          gsap.fromTo(para, 
            { opacity: 0, y: 40 },
            {
              opacity: 1, 
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: para,
                start: "top 85%",
              }
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} data-snap-section className="min-h-screen py-20 md:py-32 px-6 bg-white text-navy relative flex flex-col justify-center">
      <div className="max-w-4xl mx-auto space-y-16">
        <div>
          <span className="text-electric text-xs font-bold uppercase tracking-wider block mb-2">Our Origins</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight">
            How Aprogra <span className="text-gradient">Came to Be</span>
          </h2>
        </div>
        
        <div className="space-y-12 md:space-y-16">
          {paragraphs.map((text, idx) => (
            <div key={idx} className="story-para p-8 rounded-3xl bg-offwhite border border-navy/5 shadow-soft hover:shadow-deep transition-all">
              <p className="text-xl md:text-3xl text-navy leading-relaxed font-semibold">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
