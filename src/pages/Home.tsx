import React from 'react';
import HeroInfinityAnchor from '@/components/home/HeroInfinityAnchor';
import ClientLogos from '@/components/home/ClientLogos';
import StatsCounters from '@/components/home/StatsCounters';
import AboutCompany from '@/components/home/AboutCompany';
import Services from '@/components/home/Services';
import WhyAprogra from '@/components/home/WhyAprogra';
import OurProducts from '@/components/home/OurProducts';
import Testimonials from '@/components/home/Testimonials';
import AboutContact from '@/components/about/AboutContact';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero Infinity Anchor with Pinned Center & Scroll Sequence */}
      <HeroInfinityAnchor />

      {/* 2. Full-Bleed Continuous Client Logos Marquee */}
      <ClientLogos />

      {/* 3. Redesigned Premium Statistics & Counters */}
      <StatsCounters />

      {/* 4. About Company Interactive Architecture */}
      <AboutCompany />

      {/* 5. Services Ecosystem */}
      <Services />

      {/* 6. In-House Senior Engineering & Culture */}
      <WhyAprogra />

      {/* 7. Our In-House Shipped Products */}
      <OurProducts />

      {/* 8. Client Testimonials & Case Reviews */}
      <Testimonials />

      {/* 9. Contact & Inquiry Section */}
      <AboutContact />
    </div>
  );
}
