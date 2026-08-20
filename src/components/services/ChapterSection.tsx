import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Activity,
  Zap,
  Boxes
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceChapterData, useServicesStore } from '@/store/servicesStore';
import { CountingNumber } from '@/components/ui/counting-number';

interface ChapterSectionProps {
  chapter: ServiceChapterData;
  isActive: boolean;
}

export default function ChapterSection({ chapter, isActive }: ChapterSectionProps) {
  const { setHoveredBullet, hoveredBulletIndex } = useServicesStore();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section
      id={`chapter-scene-${chapter.id}`}
      className="relative w-full min-h-screen flex items-center justify-center p-6 sm:p-10 md:p-14 lg:p-20 z-20 overflow-hidden"
    >
      {/* Dynamic Background Glow Layer */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 -top-10 -left-10 transition-colors duration-700"
        style={{ backgroundColor: chapter.themeColor }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-15 bottom-0 right-0 transition-colors duration-700"
        style={{ backgroundColor: chapter.accentColor }}
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: CHAPTER DOSSIER & OUTCOME BULLETS           */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          
          {/* Chapter Metadata & Tag */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C] shadow-[0_0_8px_#FF4A1C]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF4A1C]">
                {chapter.tag}
              </span>
              <span className="text-white/30 text-xs font-mono">•</span>
              <span className="text-xs font-mono text-white/60">
                {chapter.subtitle}
              </span>
            </div>

            {/* Kinetic Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.08]">
              {chapter.title}
            </h2>

            {/* One-Line Thesis */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 font-sans leading-relaxed pt-1">
              {chapter.thesis}
            </p>
          </div>

          {/* Outcome-Driven Bullet Points with Real-Time 3D Excitation */}
          <div className="space-y-3.5 pt-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/40">
              ENGINEERED OUTCOMES & VERIFIABLE METRICS
            </div>

            {chapter.bullets.map((bullet, idx) => {
              const isHovered = hoveredBulletIndex === idx;

              return (
                <div
                  key={bullet.title}
                  onMouseEnter={() => {
                    setHoveredBullet(idx, bullet.highlightId);
                    setActiveTab(idx);
                  }}
                  onMouseLeave={() => setHoveredBullet(null, null)}
                  className={`group relative rounded-xl p-4 sm:p-5 transition-all duration-300 border cursor-pointer ${
                    isHovered
                      ? 'bg-white/[0.08] border-white/30 shadow-lg translate-x-1.5'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 
                          className={`w-4 h-4 transition-colors ${
                            isHovered ? 'text-[#FF4A1C]' : 'text-white/50 group-hover:text-white'
                          }`} 
                        />
                        <h3 className="text-sm sm:text-base font-bold font-display text-white">
                          {bullet.title}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-white/60 font-sans leading-relaxed pl-6">
                        {bullet.description}
                      </p>
                    </div>

                    {/* Metric Benchmark Capsule */}
                    <div className="text-right shrink-0">
                      <div className="text-base sm:text-lg font-bold font-mono text-[#FF4A1C]">
                        {bullet.metric}
                      </div>
                      <div className="text-[10px] font-mono text-white/40">
                        {bullet.metricLabel}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tech Badges & CTA Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-white/40 mr-1">Stack:</span>
              {chapter.techBadges.map((tech) => (
                <span 
                  key={tech} 
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-[#FF4A1C] transition-colors group"
            >
              <span>Build this layer</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: INTERACTIVE 3D PROOF MATRIX & TELEMETRY    */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-end pointer-events-auto">
          <div className="relative rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md p-6 sm:p-8 space-y-6">
            
            {/* Top Telemetry Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4A1C]">
                  3D GEOMETRIC CONSTRUCT
                </span>
                <h4 className="text-base font-bold font-display text-white">
                  Infinity State: Layer 0{chapter.id}
                </h4>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-white/80">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Live Morph Node</span>
              </div>
            </div>

            {/* Middle Live Node Indicator Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">Selected Architecture Focus:</span>
                <span className="text-[#FF4A1C] font-bold">
                  {chapter.bullets[activeTab]?.title || "Active Module"}
                </span>
              </div>
              <p className="text-xs text-white/70 font-sans">
                {chapter.bullets[activeTab]?.description}
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 text-center">
                <span className="text-[10px] font-mono text-white/50 block">Uptime</span>
                <span className="text-sm font-bold font-mono text-emerald-400">99.98%</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 text-center">
                <span className="text-[10px] font-mono text-white/50 block">Throughput</span>
                <span className="text-sm font-bold font-mono text-blue-400">25M+ ops</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 text-center">
                <span className="text-[10px] font-mono text-white/50 block">Security</span>
                <span className="text-sm font-bold font-mono text-[#FF4A1C]">SOC2 / mTLS</span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-white/40 text-center">
              Hover bullet points on the left to excite 3D nodal geometries in real time.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
