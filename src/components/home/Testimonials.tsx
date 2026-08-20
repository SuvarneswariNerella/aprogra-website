import React, { useRef, useState, useEffect } from 'react';
import { Component as TestimonialSlider } from '@/components/ui/testimonial-slider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "AProgra delivered our entire school ERP from scratch in 4 months. The quality was exceptional and the team felt like our own.",
    name: "Ravi K.",
    role: "Director, SmartSchool",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "Working with AProgra transformed how we communicate with customers. OmniChat cut our response time by 60%.",
    name: "Priya M.",
    role: "Operations Head, RetailCo",
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    quote: "They didn't just build what we asked — they improved on it with deep technical ingenuity. That's the AProgra difference.",
    name: "James L.",
    role: "Founder, EdTech Startup UK",
  },
  {
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote: "Our web platform went from 3-second load times to under 0.8 seconds. Pure engineering excellence from start to finish.",
    name: "Ananya S.",
    role: "CTO, SaaS Company",
  },
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote: "The in-house engineering model means zero miscommunication and rapid execution. Simply outstanding results.",
    name: "Mohammed A.",
    role: "CEO, Logistics Startup UAE",
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto advance active index
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleActiveChange = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  return (
    <section 
      className="relative w-full bg-[#FAF8F5] text-[#0B0D12] border-b border-[#0B0D12]/10 py-20 sm:py-28 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
        
        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-badge text-[#0B0D12]">
            Client Feedback
          </span>
          <h2 className="text-h2 text-[#0B0D12]">
            Clients Don't Just Say It. They Mean It.
          </h2>
          <p className="text-body text-[#5A5E6E]">
            Real feedback from partners who scale with AProgra.
          </p>
        </div>

        {/* TESTIMONIAL SLIDER */}
        <div className="pt-2">
          <TestimonialSlider 
            testimonials={TESTIMONIALS} 
            activeIndex={activeIndex} 
            onActiveChange={handleActiveChange}
          />
        </div>

      </div>
    </section>
  );
}
