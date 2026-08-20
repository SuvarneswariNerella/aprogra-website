import React from 'react';
import { useServicesStore } from '@/store/servicesStore';

const CHAPTER_NAV_ITEMS = [
  { id: 0, tag: "00", label: "Genesis" },
  { id: 1, tag: "01", label: "Web & Mobile" },
  { id: 2, tag: "02", label: "AI & Agents" },
  { id: 3, tag: "03", label: "SaaS Platform" },
  { id: 4, tag: "04", label: "Design Systems" },
  { id: 5, tag: "05", label: "Cloud & DevOps" },
  { id: 6, tag: "06", label: "Convergence" },
];

interface ServicesNavigationDotsProps {
  onSelectChapter?: (id: number) => void;
}

export default function ServicesNavigationDots({ onSelectChapter }: ServicesNavigationDotsProps) {
  const { currentChapter, scrollProgress } = useServicesStore();

  const handleJump = (id: number) => {
    if (onSelectChapter) {
      onSelectChapter(id);
    } else {
      const targetElement = document.getElementById(`chapter-scene-${id}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3.5 select-none pointer-events-auto"
      aria-label="Story chapter progress"
    >
      {/* Scroll Progress Bar */}
      <div className="absolute right-1.5 top-0 bottom-0 w-[2px] bg-white/10 rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-[#3B82F6] via-[#EC4899] to-[#FF4A1C] transition-all duration-150"
          style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {CHAPTER_NAV_ITEMS.map((item) => {
        const isActive = currentChapter === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleJump(item.id)}
            className="group flex items-center gap-3 py-1 cursor-pointer focus:outline-hidden"
            title={`Jump to ${item.tag} ${item.label}`}
          >
            {/* Chapter Label (Expands on active/hover) */}
            <span 
              className={`text-[11px] font-mono tracking-wider transition-all duration-300 ${
                isActive 
                  ? 'text-white font-bold opacity-100 translate-x-0' 
                  : 'text-white/40 opacity-0 group-hover:opacity-100 group-hover:text-white/80 translate-x-2 group-hover:translate-x-0'
              }`}
            >
              <span className="text-[#FF4A1C] mr-1.5">{item.tag}</span>
              <span>{item.label}</span>
            </span>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center w-4 h-4">
              {isActive && (
                <span className="absolute w-5 h-5 rounded-full bg-[#FF4A1C]/30 animate-ping" />
              )}
              <span 
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-3 h-3 bg-[#FF4A1C] shadow-[0_0_12px_#FF4A1C]' 
                    : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70 group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
