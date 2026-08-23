import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useAboutFaqs, AboutFaqItem } from '@/lib/strapi';

export default function AboutFAQ() {
  const { faqs } = useAboutFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#F4F1EA] text-[#0B0D12] py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-b border-[#0B0D12]/10 m-0 mt-0 mb-0">
      <div className="max-w-[860px] mx-auto space-y-10 sm:space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-3 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-badge shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-h2 text-[#0B0D12]">
            Questions We Actually Get Asked
          </h2>
          <p className="text-body-lg text-[#5A5E6E]">
            And honest answers to all of them.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#0B0D12] shadow-md'
                    : 'bg-[#FAF8F5] border-[#0B0D12]/15 hover:border-[#0B0D12]/40 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-h4 transition-colors ${
                    isOpen ? 'text-[#FF4A1C]' : 'text-[#0B0D12] group-hover:text-[#FF4A1C]'
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Rotating Chevron Icon Indicator */}
                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#0B0D12] text-white border-[#0B0D12]' 
                      : 'bg-white text-[#0B0D12] border-[#0B0D12]/15 group-hover:border-[#0B0D12]/40 group-hover:text-[#FF4A1C]'
                  }`}>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180 text-[#FF4A1C]' : 'rotate-0'
                      }`} 
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-[#0B0D12]/10 mt-1">
                        <p className="text-body text-[#5A5E6E] pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
