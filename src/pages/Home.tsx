import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHomePage } from '@/lib/strapi';
import HeroInfinityAnchor from '@/components/home/HeroInfinityAnchor';
import ClientLogos from '@/components/home/ClientLogos';
import StatsCounters from '@/components/home/StatsCounters';
import AboutCompany from '@/components/home/AboutCompany';
import Services from '@/components/home/Services';
import WhyAprogra from '@/components/home/WhyAprogra';
import OurProducts from '@/components/home/OurProducts';
import Testimonials from '@/components/home/Testimonials';
import AboutContact from '@/components/about/AboutContact';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { homePage, isLoading } = useHomePage();

  useEffect(() => {
    // When home page data loads, refresh all ScrollTriggers to re-calculate exact pin spacer offsets
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, [homePage, isLoading]);

  return (
    <div className="w-full">
      {/* 1. Hero Infinity Anchor with Pinned Center & Scroll Sequence */}
      <HeroInfinityAnchor slides={homePage.heroSlides} />

      {/* 2. Full-Bleed Continuous Client Logos Marquee */}
      <ClientLogos />

      {/* 3. Redesigned Premium Statistics & Counters */}
      <StatsCounters statsSection={homePage.statsSection} />

      {/* 4. About Company Interactive Architecture */}
      <AboutCompany storyPhases={homePage.storyPhases} />

      {/* 5. Services Ecosystem */}
      <Services servicesSlides={homePage.servicesSlides} />

      {/* 6. In-House Senior Engineering & Culture */}
      <WhyAprogra whyStatements={homePage.whyStatements} />

      {/* 7. Our In-House Shipped Products */}
      <OurProducts productsCards={homePage.productsCards} />

      {/* 8. Client Testimonials & Case Reviews */}
      <Testimonials />

      {/* 9. Contact & Inquiry Section */}
      <AboutContact />
    </div>
  );
}
