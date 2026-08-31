import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTestimonials } from '@/lib/strapi';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  highlight: string;
  projectTag: string;
}

export default function AboutTestimonials() {
  const { testimonials: apiTestimonials } = useTestimonials();
  const TESTIMONIALS: Testimonial[] = apiTestimonials.map(t => ({
    id: t.id,
    name: t.authorName,
    role: t.authorRole,
    company: t.authorCompany,
    avatar: t.avatarUrl || 'https://picsum.photos/seed/524317474/1200/800',
    content: t.quote,
    rating: t.rating,
    highlight: t.highlight,
    projectTag: t.projectTag
  }));
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-purple-100/60 m-0 mt-0 mb-0">
      <div className="space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLIENT REVIEWS & FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E1129] font-space">
            What Leaders Say About Aprogra
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real experiences from CTOs, Founders, and Engineering VPs who scale their platforms with Aprogra.
          </p>
        </motion.div>

        {/* Highlight Featured Carousel Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#0E1129] to-[#1A1E40] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-purple-500/20"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-mono font-bold uppercase tracking-wider">
                {TESTIMONIALS[activeIndex].projectTag}
              </span>

              <div className="flex items-center gap-1">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl font-medium font-sans text-purple-50 leading-relaxed italic">
              "{TESTIMONIALS[activeIndex].content}"
            </blockquote>

            {/* Highlight Banner */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Outcome: {TESTIMONIALS[activeIndex].highlight}</span>
            </div>

            {/* Author Info & Navigation Controls */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={TESTIMONIALS[activeIndex].avatar} 
                  alt={TESTIMONIALS[activeIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/40" 
                />
                <div>
                  <div className="text-base font-bold text-white">{TESTIMONIALS[activeIndex].name}</div>
                  <div className="text-xs text-purple-300">
                    {TESTIMONIALS[activeIndex].role} • <span className="font-semibold text-white">{TESTIMONIALS[activeIndex].company}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-purple-300 px-2">
                  {activeIndex + 1} / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Small Testimonial Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-30px' }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TESTIMONIALS.map((item, idx) => (
            <motion.div 
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              onClick={() => setActiveIndex(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                activeIndex === idx
                  ? 'bg-purple-50/90 border-purple-400 shadow-md ring-2 ring-purple-500/20'
                  : 'bg-white border-purple-100 hover:border-purple-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-4 h-4 text-purple-300" />
              </div>

              <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed">
                "{item.content}"
              </p>

              <div className="pt-2 flex items-center gap-2.5">
                <img 
                  src={item.avatar} 
                  alt={item.name}
                  className="w-8 h-8 rounded-full object-cover border border-purple-200" 
                />
                <div>
                  <div className="text-xs font-bold text-[#0E1129]">{item.name}</div>
                  <div className="text-[10px] text-slate-500">{item.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
