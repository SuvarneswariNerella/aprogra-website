import React, { useRef, useState } from 'react';
import { Sparkles, Building2 } from 'lucide-react';

interface Client {
  name: string;
  category: string;
  location: string;
}

const ROW1_CLIENTS: Client[] = [
  { name: "Noddyy", category: "Social Platform", location: "UK" },
  { name: "Balcony Originals", category: "Apparel & Retail", location: "US" },
  { name: "Coventry Strikers", category: "Sports Tech", location: "UK" },
  { name: "Aguatise", category: "CleanTech", location: "UAE" },
  { name: "PowerTech Global", category: "Industrial IoT", location: "Germany" },
  { name: "Star Circle", category: "Talent Platform", location: "Singapore" },
  { name: "CyberSecure Mindset", category: "InfoSec Academy", location: "India" },
  { name: "Vertex Logic", category: "Logistics SaaS", location: "US" },
  { name: "Kroma Intelligence", category: "FinTech AI", location: "UK" },
  { name: "Aegis BioSystems", category: "HealthTech", location: "India" }
];

const ROW2_CLIENTS: Client[] = [
  { name: "EduNura", category: "EdTech Engine", location: "Global" },
  { name: "SmartSchool ERP", category: "School Management", location: "India" },
  { name: "Flowdesk", category: "Workflow Automation", location: "US" },
  { name: "Nexus Workspace", category: "Enterprise Collab", location: "UAE" },
  { name: "samai.guru", category: "Spiritual Tech", location: "India" },
  { name: "OmniChat AI", category: "Omnichannel AI", location: "Global" },
  { name: "Synthetix Cloud", category: "Cloud Orchestration", location: "Germany" },
  { name: "DataPulse Systems", category: "Telemetry & BI", location: "Singapore" },
  { name: "FinEdge Wealth", category: "Digital Banking", location: "UK" },
  { name: "AProgra Studio", category: "Core Ecosystem", location: "Global" }
];

interface CardProps {
  client: Client;
}

function ClientCard({ client }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;

    setTransform({
      x: Math.max(-6, Math.min(6, deltaX)),
      y: Math.max(-6, Math.min(6, deltaY)),
      scale: 1.03
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${transform.scale})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      className={`w-[240px] sm:w-[280px] h-[84px] sm:h-[92px] shrink-0 bg-[#FAF8F5] border rounded-xl flex items-center justify-between px-5 cursor-pointer text-left transition-all duration-200 select-none ${
        isHovered
          ? 'border-[#0B0D12] bg-white shadow-md'
          : 'border-[#0B0D12]/15 shadow-xs'
      }`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className={`font-display font-bold text-sm sm:text-base transition-colors ${
            isHovered ? 'text-[#FF4A1C]' : 'text-[#0B0D12]'
          }`}>
            {client.name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#5A5E6E]">
          <span>{client.category}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0B0D12]/5 text-[#0B0D12] border border-[#0B0D12]/10">
          {client.location}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
      </div>
    </div>
  );
}

export default function ClientLogos() {
  // Multiply arrays to ensure seamless, infinite looping across all viewport widths
  const row1List = [...ROW1_CLIENTS, ...ROW1_CLIENTS, ...ROW1_CLIENTS, ...ROW1_CLIENTS];
  const row2List = [...ROW2_CLIENTS, ...ROW2_CLIENTS, ...ROW2_CLIENTS, ...ROW2_CLIENTS];

  return (
    <section className="relative w-full bg-[#F4F1EA] text-[#0B0D12] py-20 sm:py-24 overflow-hidden border-b border-[#0B0D12]/10">
      
      {/* Background Subtle Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
          <Building2 className="w-3.5 h-3.5 text-[#FF4A1C]" />
          <span>CLIENTS & COLLABORATORS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B0D12] font-display">
          Brands That Chose to <span className="text-[#FF4A1C]">Build Different</span>
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-[#5A5E6E] font-normal leading-relaxed font-sans max-w-3xl mx-auto">
          We partner with ambitious startups, fast-scaling venture firms, and global enterprises to architect robust, resilient, and human-centric software.
        </p>
      </div>

      {/* FULL VIEWPORT WIDTH CONTINUOUS MARQUEES CONTAINER */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-6">
        
        {/* Left & Right Gradient Mask Edges for Smooth Infinite Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 md:w-56 bg-gradient-to-r from-[#F4F1EA] via-[#F4F1EA]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 md:w-56 bg-gradient-to-l from-[#F4F1EA] via-[#F4F1EA]/80 to-transparent z-20" />

        {/* ROW 1: Smooth Continuous Left → Right */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="flex gap-4 sm:gap-6 animate-marquee-reverse min-w-max">
            {row1List.map((client, idx) => (
              <ClientCard key={`row1-${idx}`} client={client} />
            ))}
          </div>
        </div>

        {/* ROW 2: Smooth Continuous Right → Left */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="flex gap-4 sm:gap-6 animate-marquee min-w-max">
            {row2List.map((client, idx) => (
              <ClientCard key={`row2-${idx}`} client={client} />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Global Footprint Micro-Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-12 sm:mt-16">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono font-semibold text-[#5A5E6E] border-t border-[#0B0D12]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
            <span>North America</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B0D12]" />
            <span>United Kingdom & Europe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
            <span>Middle East & UAE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B0D12]" />
            <span>Asia Pacific & India</span>
          </div>
        </div>
      </div>

    </section>
  );
}
