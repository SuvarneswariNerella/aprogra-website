import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Compass, Eye, Target, Zap, Shield, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-snap-section className="relative min-h-screen py-24 md:py-32 bg-navy text-white overflow-hidden flex flex-col justify-center border-t border-white/10">
      
      {/* Background Glow */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-electric/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-magenta/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-magenta">Purpose &amp; Ambition</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Our <span className="text-gradient">Mission &amp; Vision</span>
          </h2>
          <p className="text-base md:text-xl text-white/80 font-medium leading-relaxed">
            Guiding how we engineer software today and shaping the digital infrastructure of tomorrow.
          </p>
        </div>

        {/* Mission & Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Our Mission */}
          <div
            ref={el => { if (el) cardsRef.current[0] = el; }}
            className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-electric/50 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-electric/20 border border-electric/40 flex items-center justify-center text-electric mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-electric">01 / The Mission</span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mt-2 mb-4">
              To Build <span className="text-electric">Resilient Software</span> That Scales Without Friction.
            </h3>
            
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
              Our mission is to eliminate digital technical debt for ambitious enterprises. We combine rigorous engineering principles, sub-second performance benchmarks, and modern AI capability to deliver software that drives real business velocity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs font-semibold">
              <div className="flex items-center gap-2 text-white/90">
                <Zap className="w-4 h-4 text-electric shrink-0" />
                <span>Zero Latency Bottlenecks</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-4 h-4 text-electric shrink-0" />
                <span>Enterprise Security Standard</span>
              </div>
            </div>
          </div>

          {/* Card 2: Our Vision */}
          <div
            ref={el => { if (el) cardsRef.current[1] = el; }}
            className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-magenta/50 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-magenta/20 border border-magenta/40 flex items-center justify-center text-magenta mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-7 h-7" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-magenta">02 / The Vision</span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mt-2 mb-4">
              Engineering the <span className="text-magenta">Intelligent Ecosystem</span> of the Future.
            </h3>
            
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
              We envision a digital landscape where autonomous software, spatial design, and predictive intelligence seamlessly amplify human creativity. Through our client projects and our proprietary SaaS products, we set new global benchmarks for software elegance.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs font-semibold">
              <div className="flex items-center gap-2 text-white/90">
                <Sparkles className="w-4 h-4 text-magenta shrink-0" />
                <span>Autonomous AI Workflows</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Compass className="w-4 h-4 text-magenta shrink-0" />
                <span>Infinite Scalability</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
