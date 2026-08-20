import React from 'react';
import { Target, Eye, Sparkles, CheckCircle2, Shield, Cpu, Layers, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

const MISSION_PILLARS = [
  'Architectural Rigor: Zero technical compromise from day one.',
  'Speed & Transparency: Rapid weekly releases with live staging access.',
  'Client Ownership: 100% IP ownership and clean, maintainable code.'
];

const VISION_HORIZONS = [
  'Autonomous AI Workflows that augment human developer workflows.',
  'Global Multi-Region Deployments with sub-second latency.',
  'Unified Design Systems that scale seamlessly across web, desktop, & mobile.'
];

export default function MissionVision() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-100/60">
      <div className="space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PURPOSE & FUTURE DIRECTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E1129] font-space">
            Our Mission & Vision
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The foundational principles that guide every line of code we write and every product we architect.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-100/80 shadow-lg shadow-purple-900/5 space-y-6 hover:shadow-xl hover:border-purple-300 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-purple-600 uppercase tracking-widest">
                  OUR MISSION
                </span>
                <h3 className="text-2xl font-bold font-space text-[#0E1129]">
                  Powering Digital Excellence
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To empower ambitious startups and global enterprises with resilient, high-throughput software systems built to scale infinitely without architectural bottlenecks or security compromises.
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">Core Mission Pillars</div>
              {MISSION_PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gradient-to-br from-[#0E1129] to-[#1A1E40] text-white rounded-3xl p-8 sm:p-10 border border-purple-500/20 shadow-xl space-y-6 hover:border-purple-400/40 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <Eye className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
                  OUR VISION
                </span>
                <h3 className="text-2xl font-bold font-space text-white">
                  Defining the Next Horizon
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10">
              To pioneer a software engineering era where human design craftsmanship and agentic artificial intelligence converge seamlessly to eliminate repetitive engineering toil and accelerate human innovation.
            </p>

            <div className="space-y-3 pt-2 relative z-10">
              <div className="text-xs font-mono font-bold text-purple-300 uppercase">Future Horizons</div>
              {VISION_HORIZONS.map((horizon, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <Rocket className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>{horizon}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
