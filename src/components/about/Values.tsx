import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenTool, Target, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: PenTool, title: "Craft", desc: "We are artisans of code and design, sweating the details that others overlook.", color: "group-hover:border-electric" },
  { icon: Target, title: "Relentless Quality", desc: "Good enough never is. We pursue excellence as a baseline, not a stretch goal.", color: "group-hover:border-magenta" },
  { icon: Users, title: "True Partnership", desc: "We don't work for you, we work with you. Your wins are our wins.", color: "group-hover:border-electric" },
  { icon: Zap, title: "Curiosity", desc: "In a rapidly shifting landscape, our desire to learn is our greatest asset.", color: "group-hover:border-magenta" }
];

export default function Values() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-snap-section className="min-h-screen py-20 md:py-32 px-6 bg-offwhite text-navy flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16 text-center space-y-3">
          <span className="text-electric text-xs font-bold uppercase tracking-wider">What We Believe</span>
          <h3 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight">Our Core <span className="text-gradient">Principles</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <div 
                key={i}
                ref={el => { if (el) cardsRef.current[i] = el; }}
                className="group p-8 md:p-12 bg-white border border-navy/5 rounded-3xl shadow-soft hover:shadow-deep transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-offwhite border border-navy/10 flex items-center justify-center text-navy group-hover:text-electric group-hover:border-electric/30 shadow-sm transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-bold text-navy">{val.title}</h4>
                  <p className="text-muted text-base leading-relaxed">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
