import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import ParallaxStack from '@/components/about/ParallaxStack';
import ClientLogos from '@/components/home/ClientLogos';
import Team from '@/components/about/Team';
import AboutFAQ from '@/components/about/AboutFAQ';
import AboutContact from '@/components/about/AboutContact';

export default function About() {
  return (
    <div className="w-full relative min-h-screen bg-[#F4F1EA] text-[#0B0D12] font-sans antialiased pt-16 md:pt-20">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Parallax Stack: 3-Panel Scroll Transition (Who We Are -> Mission -> Vision) */}
      <ParallaxStack />

      {/* 3. Client Partner Logos */}
      <ClientLogos />

      {/* 4. Interactive Leadership & Architect Photo Stack (Collection Type: Team Members) */}
      <Team />

      {/* 5. Accordion FAQs: Transparent Answers (Collection Type: About FAQs) */}
      <AboutFAQ />

      {/* 6. Direct Lead Conversion & Project Brief Form */}
      <AboutContact />
    </div>
  );
}
