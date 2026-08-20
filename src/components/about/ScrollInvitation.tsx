import React, { useState, useEffect } from 'react';

export default function ScrollInvitation() {
  const [faded, setFaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setFaded(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (faded) {
      const timer = setTimeout(() => {
        setRemoved(true);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [faded]);

  if (removed) return null;

  const handleClick = () => {
    setFaded(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-[100] bg-[#0B0D12] flex flex-col items-center justify-center cursor-pointer select-none transition-opacity duration-700 ease-out ${
        faded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-6">
        <p className="font-mono text-xs uppercase tracking-widest text-[#F4F1EA]/60 font-semibold">
          Scroll to explore
        </p>

        {/* Animated Scroll Indicator */}
        <div className="relative w-0.5 h-16 bg-white/20 mx-auto overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FF4A1C] rounded-full animate-scroll-dot" />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }
        .animate-scroll-dot {
          animation: scrollDot 1.8s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
      `}</style>
    </div>
  );
}
