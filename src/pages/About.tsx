import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import ParallaxStack from '@/components/about/ParallaxStack';
import ClientLogos from '@/components/home/ClientLogos';
import Team from '@/components/about/Team';
import Testimonials from '@/components/home/Testimonials';
import AboutFAQ from '@/components/about/AboutFAQ';
import AboutContact from '@/components/about/AboutContact';

export default function About() {
  return (
    <div className="w-full relative min-h-screen bg-[#F4F1EA] text-[#0B0D12] font-sans antialiased pt-16 md:pt-20">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. About + Mission + Vision (3-panel parallax stack) */}
      <ParallaxStack />

      {/* 3. Our Clients (Logos) */}
      <ClientLogos />

      {/* 4. Team Section (Kept as existing) */}
      <Team />

      {/* 5. Testimonials Section */}
      <Testimonials />

      {/* 6. FAQs Section */}
      <AboutFAQ />

      {/* 7. Contact Section */}
      <AboutContact />
    </div>
  );
}
