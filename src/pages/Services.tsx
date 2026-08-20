import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EditorialServicesPage from '@/components/services/EditorialServicesPage';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener('load', handleLoad);
    const timer = setTimeout(() => ScrollTrigger.refresh(true), 300);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full relative bg-[#F4F1EA] text-[#0B0D12] font-sans antialiased">
      <EditorialServicesPage />
    </div>
  );
}
