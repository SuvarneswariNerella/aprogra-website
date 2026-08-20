import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Network, Cpu, Workflow } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterAI() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.ai-node').filter(Boolean);
      nodes.forEach((node: any, i) => {
        if (node) {
          gsap.to(node, {
            y: (i % 2 === 0 ? -200 : 200) * (Math.random() + 0.5),
            x: (i % 3 === 0 ? 100 : -100) * (Math.random() + 0.5),
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-snap-section className="relative min-h-screen bg-navy text-white py-20 md:py-32 px-6 md:px-24 overflow-hidden border-t border-white/10 flex flex-col justify-center">
      <div className="absolute top-12 right-12 text-sm uppercase tracking-widest text-electric font-bold z-10 hidden md:block">
        03 // AI & Automation
      </div>
      
      {/* Background Animated Nodes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
         {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="ai-node absolute w-2 h-2 rounded-full bg-electric"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 20px 2px rgba(59,91,255,0.8)'
              }}
            />
         ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12 xl:pr-12">
        <div className="space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-magenta">AI Intelligence Spotlight</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Software that thinks, works, and <span className="text-gradient">never sleeps.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Move beyond static software. We engineer intelligent agents and automated workflows that learn, adapt, and operate autonomously to scale your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
           <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-electric/50 transition-colors">
             <Bot className="w-8 h-8 text-electric mb-6" />
             <h3 className="text-xl font-bold mb-3 text-white">AI Agents</h3>
             <p className="text-white/70 text-sm leading-relaxed">Custom LLM-powered agents capable of reasoning, planning, and executing complex tasks.</p>
           </div>
           <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-magenta/50 transition-colors lg:translate-y-8">
             <Workflow className="w-8 h-8 text-magenta mb-6" />
             <h3 className="text-xl font-bold mb-3 text-white">Automations</h3>
             <p className="text-white/70 text-sm leading-relaxed">Seamless integrations connecting your entire tech stack to eliminate manual data entry.</p>
           </div>
           <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-electric/50 transition-colors">
             <Network className="w-8 h-8 text-electric mb-6" />
             <h3 className="text-xl font-bold mb-3 text-white">Agentic Workflows</h3>
             <p className="text-white/70 text-sm leading-relaxed">Multi-agent systems where AI workers collaborate to solve multi-step business problems.</p>
           </div>
           <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-magenta/50 transition-colors lg:translate-y-8">
             <Cpu className="w-8 h-8 text-magenta mb-6" />
             <h3 className="text-xl font-bold mb-3 text-white">RAG Systems</h3>
             <p className="text-white/70 text-sm leading-relaxed">Retrieval-Augmented Generation systems to ground AI in your private enterprise data.</p>
           </div>
        </div>
      </div>
    </section>
  );
}
