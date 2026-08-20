import React from 'react';
import { CHAPTERS_DATA } from '@/store/servicesStore';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesReducedMotionFallback() {
  return (
    <div className="w-full bg-[#070913] text-white py-16 px-4 sm:px-8 md:px-12 space-y-24">
      {/* Intro Header */}
      <div className="max-w-4xl mx-auto text-center space-y-6 pt-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#FF4A1C] font-bold">
          [ APROGRA ENGINEERING CAPABILITIES ]
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold font-display text-white">
          We don't just deliver services. <br />
          <span className="text-[#FF4A1C]">We engineer outcomes.</span>
        </h1>
        <p className="text-base sm:text-xl text-white/70 font-sans">
          A continuous multi-layered engineering stack designed for enterprise scalability, sub-second latency, and autonomous intelligence.
        </p>
      </div>

      {/* Chapters Stack */}
      <div className="max-w-5xl mx-auto space-y-16">
        {CHAPTERS_DATA.map((chapter) => (
          <div 
            key={chapter.id}
            className="rounded-2xl bg-white/[0.04] border border-white/10 p-8 sm:p-12 space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase text-[#FF4A1C]">
                {chapter.tag}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-mono text-white/60">
                {chapter.subtitle}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
              {chapter.title}
            </h2>

            <p className="text-sm sm:text-base text-white/80 font-sans">
              {chapter.thesis}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {chapter.bullets.map((bullet) => (
                <div 
                  key={bullet.title}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4A1C]" />
                    <h3 className="text-sm font-bold text-white">{bullet.title}</h3>
                  </div>
                  <p className="text-xs text-white/60">{bullet.description}</p>
                  <div className="pt-2">
                    <span className="text-sm font-bold font-mono text-[#FF4A1C]">{bullet.metric}</span>
                    <span className="text-[10px] font-mono text-white/40 ml-1.5">{bullet.metricLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Convergence CTA */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-orange-950/40 border border-white/15 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
          One partner. Every layer. <br />
          <span className="text-[#FF4A1C]">Infinite possibility.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
          Eliminate vendor fragmentation. Aprogra takes single-source ownership of your software engineering lifecycle.
        </p>
        <div className="pt-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FF4A1C] hover:bg-[#E03E14] text-white font-mono text-sm font-bold uppercase tracking-wider"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
