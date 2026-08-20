import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesClosingConvergence() {
  return (
    <section 
      id="chapter-scene-6"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 z-20 overflow-hidden"
    >
      {/* Dynamic Ambient Background Aura */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none bg-[#FF4A1C]/15 -top-20 right-10" />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none bg-[#8B5CF6]/15 bottom-0 left-10" />

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pt-12 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C] shadow-[0_0_10px_#FF4A1C]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/70">
            CHAPTER 06 / CONVERGENCE
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Unified Full-Stack Pods</span>
        </div>
      </div>

      {/* Center Closing Statement & Action Core */}
      <div className="max-w-4xl space-y-8 my-auto py-12">
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#FF4A1C] font-bold">
            [ ARCHITECTURAL CONVERGENCE ]
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.05]">
            One partner. Every layer. <br />
            <span className="bg-gradient-to-r from-white via-[#EC4899] to-[#FF4A1C] bg-clip-text text-transparent">
              Infinite possibility.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-white/75 font-sans max-w-2xl leading-relaxed">
            Eliminate vendor fragmentation. From system design and autonomous AI workflows to zero-trust cloud pipelines, Aprogra takes single-source ownership of your digital evolution.
          </p>
        </div>

        {/* 4 Outcome Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-xl font-bold font-mono text-white">100%</span>
            <p className="text-xs text-white/60 font-sans">In-House Pods</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-xl font-bold font-mono text-emerald-400">99.98%</span>
            <p className="text-xs text-white/60 font-sans">Historical Uptime</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-xl font-bold font-mono text-[#FF4A1C]">&lt;45ms</span>
            <p className="text-xs text-white/60 font-sans">Global P95 Latency</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-xl font-bold font-mono text-blue-400">Zero</span>
            <p className="text-xs text-white/60 font-sans">Tech Debt Policy</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#FF4A1C] hover:bg-[#E03E14] text-white font-mono text-sm font-bold tracking-wide uppercase shadow-[0_0_25px_rgba(255,74,28,0.4)] transition-all hover:scale-105"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-sm font-bold tracking-wide uppercase transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#FF4A1C]" />
            <span>Explore Built Products</span>
          </Link>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/50 gap-4">
        <span>© {new Date().getFullYear()} Aprogra Engineering Group. All rights reserved.</span>
        <span>ISO 27001 & SOC2 Type II Certified Process</span>
      </div>
    </section>
  );
}
