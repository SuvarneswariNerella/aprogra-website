import React, { useEffect, useState } from 'react';

interface EditorialScrollProgressProps {
  activeSectionIndex: number;
  totalSections: number;
}

export default function EditorialScrollProgress({ activeSectionIndex, totalSections }: EditorialScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = window.scrollY / totalHeight;
        setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Track Background */}
      <div className="relative w-[2px] h-48 bg-[#0B0D12]/15 rounded-full overflow-hidden">
        {/* Dynamic Progress Fill */}
        <div
          className="w-full bg-gradient-to-b from-[#3B82F6] via-[#EC4899] to-[#FF4A1C] transition-all duration-150 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating Monospace Index Indicator */}
      <span className="mt-3 text-[10px] font-mono font-bold text-[#5A5E6E]">
        0{Math.min(5, Math.max(1, activeSectionIndex + 1))} / 05
      </span>
    </div>
  );
}
