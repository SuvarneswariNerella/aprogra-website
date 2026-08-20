import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, CheckCircle2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const METRICS = [
  { value: '99.9%', label: 'Uptime & Reliability Standard', icon: ShieldCheck },
  { value: '120+', label: 'Production Systems Shipped', icon: Zap },
  { value: '< 2 hrs', label: 'Average Client Response SLA', icon: Award },
  { value: '100%', label: 'On-Time Delivery Guarantee', icon: CheckCircle2 }
];

export default function AboutCompany() {
  return (
    <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-12 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="space-y-16">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wider uppercase font-mono shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>ABOUT APROGRA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E1129] font-space leading-[1.12]">
            Pioneering High-Performance Software & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Infinite Possibilities.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Aprogra is a premier software engineering & product studio. We partner with ambitious startups and industry leaders to design, build, and scale resilient enterprise systems, AI agentic workflows, and cloud applications.
          </p>
        </motion.div>

        {/* Story & Core Focus Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/80 shadow-xl shadow-purple-900/5"
        >
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold font-mono text-purple-600 uppercase tracking-widest">
                OUR GENESIS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-space text-[#0E1129]">
                Engineered with Precision, Driven by Craftsmanship.
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded by former Google Staff Architects and product leads, Aprogra was built on a singular conviction: enterprise software should be fast, resilient, and beautifully designed without architectural debt.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We eliminate traditional agency bloat. Instead, you get direct access to seasoned architects, rapid weekly sprints, transparent code repositories, and production-tested design systems.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-space text-xs font-bold shadow-md shadow-purple-500/20 hover:opacity-95 transition-all"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200/80 font-space text-xs font-bold transition-all"
              >
                <span>Explore Products</span>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-[#0E1129] to-[#1A1E40] text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold font-space text-purple-200 uppercase tracking-wider">
                Engineering Standard
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white">Full-Stack Cloud Native</div>
                <p className="text-slate-400 text-xs">TypeScript, React, Node.js, Go, Rust & Multi-Region Cloud Infrastructure.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white">Agentic AI & LLM Systems</div>
                <p className="text-slate-400 text-xs">Custom RAG architectures, Gemini 1.5 integrations, & autonomous agent orchestration.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white">Zero-Debt Design Systems</div>
                <p className="text-slate-400 text-xs">Tokenized Tailwind CSS, responsive layouts, and WCAG AA accessibility.</p>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Key Metrics Banner */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
                }}
                className="bg-white rounded-2xl p-6 border border-purple-100/80 shadow-md shadow-purple-900/5 text-center space-y-2 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-space text-[#0E1129]">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-snug">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
