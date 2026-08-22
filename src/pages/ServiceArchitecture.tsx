import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Layers, LayoutGrid, Zap } from 'lucide-react';
import { architectureData } from '@/data/architectureContent';
import mermaid from 'mermaid';

export default function ServiceArchitecture() {
  const { id } = useParams();
  const data = id ? architectureData[id] : null;
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'base',
        themeVariables: {
          primaryColor: '#ffffff',
          primaryTextColor: '#0B0D12',
          primaryBorderColor: '#e5e7eb',
          lineColor: '#9ca3af',
          secondaryColor: '#f3f4f6',
          tertiaryColor: '#f9fafb',
          fontFamily: 'Inter, sans-serif'
        },
        securityLevel: 'loose',
      });
      mermaid.contentLoaded();
    }
  }, [data]);

  if (!id || !data) {
    return <Navigate to="/services" replace />;
  }

  const Icon = data.icon;

  return (
    <div className="w-full bg-[#FAF8F5] text-[#0B0D12] min-h-screen pt-24 pb-20 selection:bg-[#0B0D12] selection:text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-mono font-medium text-[#5A5E6E] mb-12">
          <Link to="/services" className="hover:text-[#0B0D12] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Services</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-[#0B0D12]/20" />
          <span className="text-[#0B0D12]">Architecture</span>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start mb-20">
          <div className="space-y-6">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider"
              style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor, borderColor: `${data.accentColor}30` }}
            >
              <Icon className="w-4 h-4" />
              <span>{data.title.toUpperCase()}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight">
              {data.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-[#5A5E6E] font-medium leading-relaxed max-w-xl">
              {data.subtitle}
            </p>
            
            <p className="text-base sm:text-lg text-[#0B0D12]/70 leading-relaxed max-w-xl border-l-4 pl-4" style={{ borderColor: data.accentColor }}>
              {data.heroDescription}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#0B0D12]/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform duration-700 group-hover:scale-150" style={{ backgroundColor: data.accentColor }} />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest text-[#0B0D12]/40 pb-4 border-b border-[#0B0D12]/10">
                <LayoutGrid className="w-4 h-4" />
                <span>Technology Stack</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {data.technologies.map((tech, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-sm font-bold text-[#0B0D12] uppercase tracking-wider">{tech.category}</h3>
                    <ul className="space-y-2">
                      {tech.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2 text-sm text-[#5A5E6E]">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.accentColor }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ARCHITECTURE DIAGRAM SECTION */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">System Architecture</h2>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0B0D12]/10 text-xs font-mono font-medium text-[#5A5E6E]">
              <Layers className="w-3.5 h-3.5" />
              <span>Flow Diagram</span>
            </div>
          </div>
          
          <div className="w-full bg-white rounded-3xl border border-[#0B0D12]/10 shadow-sm p-6 sm:p-12 overflow-x-auto overflow-y-hidden flex items-center justify-center min-h-[400px]">
            <div 
              ref={mermaidRef} 
              className="mermaid"
            >
              {data.mermaidGraph}
            </div>
          </div>
        </div>

        {/* ARCHITECTURE HIGHLIGHTS */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display mb-8">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.architecturePoints.map((point, idx) => {
              const PointIcon = point.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0B0D12]/10 shadow-sm hover:shadow-md transition-shadow group cursor-default">
                  <div 
                    className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-transform group-hover:-translate-y-1"
                    style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor }}
                  >
                    <PointIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B0D12] mb-3">{point.title}</h3>
                  <p className="text-sm text-[#5A5E6E] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
