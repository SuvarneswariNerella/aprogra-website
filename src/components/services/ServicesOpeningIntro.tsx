import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface ServicesOpeningIntroProps {
  onScrollDown?: () => void;
}

export default function ServicesOpeningIntro({ onScrollDown }: ServicesOpeningIntroProps) {
  return (
    <section 
      id="chapter-scene-0"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 z-20"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-12">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C] animate-pulse shadow-[0_0_10px_#FF4A1C]" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/70">
            CHAPTER 00 / GENESIS
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
          <span>Interactive 3D Narrative Flow</span>
        </div>
      </div>

      {/* Center Kinetic Headline */}
      <div className="max-w-5xl space-y-6 my-auto py-12">
        <div className="inline-block">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#FF4A1C] font-bold">
            [ ARCHITECTURAL SERVICES & CAPABILITIES ]
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-white leading-[1.02]">
          We don't just deliver services. <br />
          <span className="bg-gradient-to-r from-white via-[#8B5CF6] via-[#EC4899] to-[#FF4A1C] bg-clip-text text-transparent">
            We engineer outcomes.
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-white/70 font-sans max-w-3xl leading-relaxed font-normal">
          A continuous guided descent through Aprogra’s multi-layered engineering stack — connected by the thread of infinite possibility.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-mono text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Zero Outsourcing</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>In-House Specialized Pods</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />
            <span>Multi-Year Production SLAs</span>
          </span>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex items-end justify-between pb-4">
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block">
            SCROLL TO COMMENCE NARRATIVE
          </span>
          <span className="text-xs font-mono text-white/70">
            Phase 1: Architecture & Interfaces ↓
          </span>
        </div>

        <button
          onClick={onScrollDown}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-white transition-all cursor-pointer"
        >
          <span>Begin Descent</span>
          <ArrowDown className="w-4 h-4 text-[#FF4A1C] transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
