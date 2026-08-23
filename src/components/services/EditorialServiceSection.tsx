import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem, getStrapiMediaUrl } from '@/lib/strapi';

interface EditorialServiceSectionProps {
  service: ServiceItem;
  index: number;
  isReversed: boolean;
}

export default function EditorialServiceSection({ service, index, isReversed }: EditorialServiceSectionProps) {
  const iconUrl = getStrapiMediaUrl(service.iconMedia);

  return (
    <section
      id={`service-${service.id}`}
      className="relative w-full py-4 sm:py-6 overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Service Card Container */}
        <div className="relative rounded-2xl bg-white border border-[#0B0D12]/10 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 sm:p-7 lg:p-8 overflow-hidden group">
          
          {/* Card Top Category Ribbon */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#0B0D12]/8 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              {iconUrl ? (
                <img 
                  src={iconUrl} 
                  alt={service.title} 
                  className="w-4 h-4 object-contain shrink-0" 
                />
              ) : (
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: service.accentColor }} 
                />
              )}
              <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[11px] font-mono font-medium text-[#0B0D12]">
                {service.tag}
              </span>
              <span className="hidden sm:inline text-px text-[#0B0D12]/20">/</span>
              <span className="hidden sm:inline text-[11px] text-[#5A5E6E]">
                {service.subheading}
              </span>
            </div>
            <span className="text-[11px] text-[#5A5E6E]/70 font-medium">DISCIPLINE 0{index + 1}</span>
          </div>

          <div
            className={`flex flex-col gap-6 lg:gap-10 items-center ${
              isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
            }`}
          >
            {/* ======================================================== */}
            {/* TEXT COLUMN                                              */}
            {/* ======================================================== */}
            <div className="w-full lg:w-1/2 space-y-4">
              
              {/* Headline */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B0D12] tracking-tight leading-snug">
                {service.title}
              </h2>

              {/* Crisp Description */}
              <p className="text-xs sm:text-sm text-[#5A5E6E] leading-relaxed max-w-md">
                {service.shortDescription || (service as any).description}
              </p>

              {/* Deliverable Tags */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {service.deliverables.map((item: any, dIdx: number) => {
                    const deliverableText = typeof item === 'string' ? item : item.item;
                    return (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#0B0D12]/8 text-[11px] font-mono text-[#0B0D12] hover:border-[#0B0D12]/20 transition-colors"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full shrink-0" 
                          style={{ backgroundColor: service.accentColor }} 
                        />
                        {deliverableText}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 gap-2.5 max-w-xs pt-1">
                {service.metrics.map((m) => (
                  <div 
                    key={m.label} 
                    className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/8"
                  >
                    <div className="text-sm sm:text-base font-bold text-[#0B0D12] leading-tight">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono text-[#5A5E6E] truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-1">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0B0D12] hover:text-[#FF4A1C] transition-colors group"
                >
                  <span>Engineer this capability</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#FF4A1C]" />
                </Link>
              </div>

            </div>

            {/* ======================================================== */}
            {/* VISUAL COLUMN (Schematic Drawing in inner canvas)        */}
            {/* ======================================================== */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/8 p-4 sm:p-5 overflow-hidden">
                
                {/* Schematic sub-header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#0B0D12]/6 text-[10px] font-mono text-[#5A5E6E]">
                  <span className="font-semibold text-[#0B0D12]">ARCHITECTURE SCHEMATIC</span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Type-Safe</span>
                  </span>
                </div>

                {/* Central Vector Line-Art Drawing */}
                <div className="my-3 min-h-[160px] sm:min-h-[180px] flex items-center justify-center relative">
                  {service.illustrationType === 'web' && (
                    <svg
                      viewBox="0 0 360 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[280px] h-auto"
                    >
                      {/* Browser & Mobile Viewport Geometry */}
                      <rect x="20" y="20" width="240" height="160" rx="8" stroke="#0A0A0F" strokeWidth="1.5" strokeOpacity="0.8" />
                      <line x1="20" y1="50" x2="260" y2="50" stroke="#E5E7EB" strokeWidth="1" />
                      <circle cx="36" cy="35" r="3" fill="#EF4444" />
                      <circle cx="48" cy="35" r="3" fill="#F59E0B" />
                      <circle cx="60" cy="35" r="3" fill="#10B981" />
                      
                      {/* Mobile Phone Mockup */}
                      <rect x="230" y="55" width="105" height="150" rx="12" stroke="#3B82F6" strokeWidth="1.75" />
                      <rect x="242" y="70" width="81" height="110" rx="4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                      
                      {/* Interactive UI Nodes & Connections */}
                      <rect x="40" y="68" width="80" height="36" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
                      <rect x="135" y="68" width="105" height="36" rx="4" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.2" />
                      <rect x="40" y="118" width="175" height="46" rx="4" fill="#FFF7ED" stroke="#FF4A1C" strokeWidth="1.2" />
                      
                      <path d="M120 86 C 180 86, 180 140, 245 140" stroke="url(#web-grad)" strokeWidth="2" strokeDasharray="4 4" />
                      <defs>
                        <linearGradient id="web-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#EC4899" />
                          <stop offset="100%" stopColor="#FF4A1C" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  {service.illustrationType === 'ai' && (
                    <svg
                      viewBox="0 0 360 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[280px] h-auto"
                    >
                      {/* Neural Synapses & Vector Embeddings */}
                      <circle cx="180" cy="110" r="42" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="180" cy="110" r="18" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
                      <circle cx="180" cy="110" r="6" fill="#8B5CF6" />

                      {/* Surrounding Agent Nodes */}
                      <g className="agent-nodes">
                        <circle cx="70" cy="60" r="22" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="1.5" />
                        <circle cx="290" cy="60" r="22" fill="#FFFFFF" stroke="#EC4899" strokeWidth="1.5" />
                        <circle cx="80" cy="170" r="22" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
                        <circle cx="280" cy="170" r="22" fill="#FFFFFF" stroke="#FF4A1C" strokeWidth="1.5" />
                      </g>

                      {/* Connecting Synapse Vector Curves */}
                      <path d="M92 68 L 162 102" stroke="#3B82F6" strokeWidth="1.5" />
                      <path d="M268 68 L 198 102" stroke="#EC4899" strokeWidth="1.5" />
                      <path d="M102 162 L 164 120" stroke="#10B981" strokeWidth="1.5" />
                      <path d="M258 162 L 196 120" stroke="#FF4A1C" strokeWidth="1.5" />
                    </svg>
                  )}

                  {service.illustrationType === 'saas' && (
                    <svg
                      viewBox="0 0 360 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[280px] h-auto"
                    >
                      {/* Isometric Multi-tenant Architecture Slabs */}
                      <g transform="translate(40, 20)">
                        <path d="M140 10 L 250 65 L 140 120 L 30 65 Z" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" />
                        <path d="M30 65 L 30 85 L 140 140 L 140 120 Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" />
                        <path d="M250 65 L 250 85 L 140 140 L 140 120 Z" fill="#99F6E4" stroke="#0D9488" strokeWidth="1.5" />

                        <path d="M140 60 L 250 115 L 140 170 L 30 115 Z" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
                        <path d="M30 115 L 30 135 L 140 190 L 140 170 Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
                        <path d="M250 115 L 250 135 L 140 190 L 140 170 Z" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5" />
                      </g>
                    </svg>
                  )}

                  {service.illustrationType === 'design' && (
                    <svg
                      viewBox="0 0 360 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[280px] h-auto"
                    >
                      {/* Design System Hierarchy & Kinetic Curve */}
                      <rect x="30" y="30" width="130" height="70" rx="8" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="8" fill="#F43F5E" />
                      <line x1="68" y1="50" x2="140" y2="50" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                      <line x1="50" y1="75" x2="120" y2="75" stroke="#FECDD3" strokeWidth="2" strokeLinecap="round" />

                      <rect x="190" y="30" width="140" height="70" rx="8" fill="#FDF4FF" stroke="#C026D3" strokeWidth="1.5" />
                      <circle cx="210" cy="50" r="8" fill="#C026D3" />
                      <line x1="228" y1="50" x2="310" y2="50" stroke="#C026D3" strokeWidth="2" strokeLinecap="round" />
                      <line x1="210" y1="75" x2="280" y2="75" stroke="#F5D0FE" strokeWidth="2" strokeLinecap="round" />

                      {/* Bezier Interpolation Curve */}
                      <path d="M40 170 C 120 170, 160 120, 320 120" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="145" cy="142" r="5" fill="#FF4A1C" />
                    </svg>
                  )}

                  {service.illustrationType === 'cloud' && (
                    <svg
                      viewBox="0 0 360 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[280px] h-auto"
                    >
                      {/* Edge Nodes & Global Orbit Matrix */}
                      <ellipse cx="180" cy="110" rx="130" ry="60" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
                      <ellipse cx="180" cy="110" rx="70" ry="85" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="180" cy="110" r="26" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
                      <circle cx="180" cy="110" r="10" fill="#10B981" />

                      <circle cx="60" cy="110" r="8" fill="#3B82F6" />
                      <circle cx="300" cy="110" r="8" fill="#3B82F6" />
                      <circle cx="180" cy="30" r="8" fill="#FF4A1C" />
                      <circle cx="180" cy="190" r="8" fill="#FF4A1C" />
                    </svg>
                  )}
                </div>

                {/* Bottom Spec Footer */}
                <div className="pt-2.5 border-t border-[#0B0D12]/6 flex items-center justify-between text-[10px] font-mono text-[#5A5E6E]">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Production Ready</span>
                  </span>
                  <span>Audited</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
