import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCareerPage, useCareers } from '@/lib/strapi';

export default function Careers() {
  const { careerPage } = useCareerPage();
  const { careers } = useCareers();

  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] pt-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 max-w-7xl mx-auto py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span className="text-badge text-[#0B0D12]">{careerPage.heroBadge}</span>
          </div>

          <h1 className="text-h1">
            {careerPage.heroHeadline}
          </h1>

          <p className="text-body-lg text-[#5A5E6E] max-w-2xl">
            {careerPage.heroDescription}
          </p>
        </motion.div>
      </section>

      {/* 2. OPEN ROLES */}
      <section className="px-6 max-w-7xl mx-auto py-12 border-t border-[#0B0D12]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-badge text-[#5A5E6E] block mb-2">{careerPage.positionsBadge}</span>
            <h2 className="text-h2">{careerPage.positionsTitle}</h2>
          </div>
          <p className="text-body text-[#5A5E6E] max-w-md">
            {careerPage.positionsDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {careers.map((pos) => (
            <div 
              key={pos.id}
              className="bg-[#FAF8F5] p-6 sm:p-8 rounded-lg border border-[#0B0D12]/15 hover:border-[#FF4A1C]/50 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-badge text-[#FF4A1C] bg-[#FF4A1C]/10 px-2.5 py-0.5 rounded">
                    {pos.team}
                  </span>
                  <div className="flex items-center gap-1.5 text-caption text-[#5A5E6E]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{pos.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-caption text-[#5A5E6E]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pos.type}</span>
                  </div>
                </div>

                <h3 className="text-h3 text-[#0B0D12]">{pos.title}</h3>
                <p className="text-body text-[#5A5E6E]">{pos.description}</p>

                {pos.tags && pos.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {pos.tags.map((t, idx) => (
                      <span key={idx} className="text-label-mono bg-white px-2.5 py-1 rounded border border-[#0B0D12]/10 text-[#0B0D12]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded text-badge transition-colors"
                >
                  <span>Apply for Role</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CULTURE & VALUES */}
      <section className="px-6 max-w-7xl mx-auto py-16 border-t border-[#0B0D12]/10">
        <div className="mb-10">
          <span className="text-badge text-[#5A5E6E] block mb-2">{careerPage.cultureBadge}</span>
          <h2 className="text-h2">{careerPage.cultureTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerPage.cultureItems.map((item, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-6 rounded-lg border border-[#0B0D12]/15 space-y-3">
              <span className="text-label-mono text-[#FF4A1C]">{item.number}</span>
              <h4 className="text-h4">{item.title}</h4>
              <p className="text-body text-[#5A5E6E]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
