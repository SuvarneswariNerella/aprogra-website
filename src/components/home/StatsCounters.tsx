import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CountingNumber } from '@/components/ui/counting-number';
import ScrollReveal from '@/components/animations/ScrollReveal';

const stats = [
  { target: 60, suffix: "+", label: "Enterprise Partners" },
  { target: 40, suffix: "+", label: "Production Systems" },
  { target: 12, suffix: "+", label: "Sovereign Regions" },
  { target: 7, suffix: "+", label: "Years of Craft" },
];

export default function StatsCounters() {
  return (
    <section 
      id="proven-performance-section"
      className="relative bg-[#F4F1EA] text-[#0B0D12] py-20 sm:py-28 overflow-hidden border-b border-[#0B0D12]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-14 sm:space-y-16">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0B0D12]/10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4A1C] animate-pulse" />
              <span className="text-badge text-[#0B0D12]/70">PROVEN PERFORMANCE & GLOBAL FOOTPRINT</span>
            </div>
            
            <h2 className="text-h2 text-[#0B0D12]">
              Engineered with <span className="text-[#FF4A1C]">Mathematical Precision.</span>
            </h2>
          </div>

          <Link 
            to="/about"
            className="inline-flex items-center gap-1.5 text-badge text-[#0B0D12] hover:text-[#FF4A1C] transition-colors group self-start md:self-end"
          >
            <span>Learn our engineering ethos</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </ScrollReveal>

        {/* ======================================================== */}
        {/* COUNTING NUMBER STATS STRIP (Minimal & Simple)           */}
        {/* ======================================================== */}
        <div className="w-full rounded-2xl bg-white/70 backdrop-blur-xs border border-[#0B0D12]/10 p-8 sm:p-12 shadow-2xs">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#0B0D12]/10">
            {stats.map((stat, idx) => (
              <div key={stat.label} className={`text-center ${idx !== 0 ? 'pt-6 sm:pt-0 sm:px-6' : 'sm:pr-6'}`}>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0D12] flex items-baseline justify-center">
                  <CountingNumber target={stat.target} transition={{ duration: 2.2, ease: "easeOut", type: "tween" }} />
                  <span className="text-[#FF4A1C] ml-0.5">{stat.suffix}</span>
                </div>
                <p className="mt-2 text-body text-[#5A5E6E]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
