"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  MonitorPlay
} from "lucide-react";
import { cn } from "@/lib/utils";
import SchoolErpMockup from "./SchoolErpMockup";
import OmniChatMockup from "./OmniChatMockup";

const PLATFORMS = [
  {
    id: "school-erp",
    label: "CampusOS ERP",
    category: "Education Management",
    icon: GraduationCap,
    image: "https://picsum.photos/seed/164559160/1200/800",
    description: "A comprehensive operating system for modern educational institutions, managing everything from admissions to alumni relations.",
    features: [
      "Smart attendance & RFID tracking",
      "Fee & finance management",
      "Parent-teacher communication portal",
      "Automated academic report cards"
    ]
  },
  {
    id: "omnichat",
    label: "OmniChat CRM",
    category: "Customer Engagement",
    icon: MessageSquare,
    image: "https://picsum.photos/seed/1293518339/1200/800",
    description: "Unified customer communication platform consolidating WhatsApp, Email, SMS, and Social Media into a single powerful inbox.",
    features: [
      "WhatsApp Business API integration",
      "AI-powered automated responses",
      "Unified team inbox & routing",
      "Real-time analytics & sentiment tracking"
    ]
  }
];

const AUTO_PLAY_INTERVAL = 5000;

export default function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextPlatform = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PLATFORMS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timeoutId = setTimeout(nextPlatform, AUTO_PLAY_INTERVAL);
    return () => clearTimeout(timeoutId);
  }, [nextPlatform, isPaused, activeIndex]);

  const activePlatform = PLATFORMS[activeIndex];

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] flex flex-col lg:flex-row h-auto lg:h-[850px] border border-white/10 shadow-2xl">
        
        {/* Left Panel: Navigation */}
        <div className="w-full lg:w-[35%] xl:w-[32%] relative z-30 flex flex-col p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#171B56]/50 shrink-0">
          {/* Brand Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#171B56] via-[#2F5BFF]/30 to-[#8A3FD9]/30 opacity-90 z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#5A45F2]/40 via-transparent to-transparent opacity-80 z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#E20A8B]/30 via-transparent to-transparent opacity-80 z-0" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-10">
              <h3 className="text-white font-bold text-3xl tracking-tight">Our Platforms</h3>
              <p className="text-white/60 text-base mt-2">Proprietary SaaS solutions built for scale.</p>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-center">
              {PLATFORMS.map((platform, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 text-left group w-full",
                      isActive
                        ? "bg-white text-[#171B56] shadow-[0_8px_30px_rgba(226,10,139,0.2)] scale-[1.02]"
                        : "bg-white/5 text-white/70 border border-white/5 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500 relative z-10 rounded-xl p-2.5",
                        isActive ? "bg-gradient-to-br from-[#2F5BFF] to-[#E20A8B] text-white shadow-md" : "bg-white/10 text-white/60 group-hover:text-white group-hover:bg-white/20"
                      )}
                    >
                      <platform.icon size={22} strokeWidth={2} />
                    </div>

                    <span className={cn(
                      "font-bold text-[16px] tracking-tight relative z-10 transition-colors duration-300",
                      isActive ? "text-[#171B56]" : "text-white/80 group-hover:text-white"
                    )}>
                      {platform.label}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute right-4 w-1.5 h-8 bg-gradient-to-b from-[#2F5BFF] to-[#E20A8B] rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Content Showcase */}
        <div className="flex-1 relative bg-[#FAFAFA] flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 flex flex-col w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-3xl mx-auto w-full">
                
                {/* Top: Browser Mockup Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                  className="w-full rounded-[1.25rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(23,27,86,0.15)] border border-gray-200/60 bg-white"
                >
                  {/* Browser Chrome */}
                  <div className="h-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                    </div>
                    <div className="flex-1 mx-4 bg-gray-100/80 rounded-md h-6 flex items-center justify-center text-[10px] text-gray-500 font-medium font-mono">
                      {activePlatform.id}.aprogra.com
                    </div>
                  </div>
                  {/* Image Container */}
                  <div className="aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/9] relative overflow-hidden bg-gray-100 flex items-center justify-center">
                    {activePlatform.id === 'school-erp' ? (
                      <SchoolErpMockup />
                    ) : activePlatform.id === 'omnichat' ? (
                      <OmniChatMockup />
                    ) : (
                      <img 
                        src={activePlatform.image} 
                        alt={activePlatform.label}
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Bottom: Info & Features */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                  
                  {/* Platform Info */}
                  <div className="flex-1 flex flex-col">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                    >
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#2F5BFF]/10 text-[#2F5BFF] text-[10px] font-bold tracking-widest uppercase mb-4 border border-[#2F5BFF]/20">
                        <MonitorPlay size={12} />
                        {activePlatform.category}
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-black text-[#171B56] tracking-tight mb-3 leading-tight">
                        {activePlatform.label}
                      </h2>
                      
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                        {activePlatform.description}
                      </p>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="group inline-flex items-center gap-2 bg-[#171B56] hover:bg-[#2F5BFF] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors duration-300 shadow-sm hover:shadow"
                      >
                        View Platform
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Key Features */}
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Key Features</h4>
                    <div className="space-y-4">
                      {activePlatform.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (idx * 0.1), duration: 0.4 }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 text-[#E20A8B] shrink-0 bg-[#E20A8B]/10 p-1 rounded-full">
                            <CheckCircle2 size={14} strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 text-sm font-medium leading-snug">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
