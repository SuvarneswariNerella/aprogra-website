import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MapPin, Clock, Briefcase, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSITIONS = [
  {
    id: 'lead-ai-engineer',
    title: 'Senior AI & LLM Systems Engineer',
    team: 'AI & Machine Intelligence',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    description: 'Lead the architecture of our agentic AI infrastructure, multi-agent workflows, and custom enterprise fine-tuning pipelines.',
    tags: ['Python', 'PyTorch', 'LangChain', 'vLLM', 'Distributed Systems']
  },
  {
    id: 'staff-fullstack-engineer',
    title: 'Staff Full-Stack Architect (React / Node)',
    team: 'Core Platform Engineering',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    description: 'Design and scale resilient high-throughput cloud web applications, real-time sync systems, and modular component ecosystems.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind']
  },
  {
    id: 'lead-mobile-architect',
    title: 'Lead Mobile Engineer (React Native / Flutter)',
    team: 'Mobile Experiences',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Craft buttery-smooth 60fps mobile applications for enterprise clients across iOS and Android with offline-first sync architecture.',
    tags: ['React Native', 'Swift', 'Kotlin', 'SQLite', 'WebSockets']
  },
  {
    id: 'product-designer',
    title: 'Senior Product & UI/UX Designer',
    team: 'Product Design & Brand',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    description: 'Establish thoughtful design systems, spatial layouts, and high-fidelity prototypes for next-generation digital products.',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research']
  }
];

export default function Careers() {
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
            <span className="text-badge text-[#0B0D12]">Careers at Aprogra</span>
          </div>

          <h1 className="text-h1">
            Build the software that defines <br className="hidden sm:inline" />
            <span className="text-[#FF4A1C]">the next decade.</span>
          </h1>

          <p className="text-body-lg text-[#5A5E6E] max-w-2xl">
            We are a tight-knit collective of systems architects, AI engineers, and product designers obsessed with craftsmanship, performance, and engineering velocity.
          </p>
        </motion.div>
      </section>

      {/* 2. OPEN ROLES */}
      <section className="px-6 max-w-7xl mx-auto py-12 border-t border-[#0B0D12]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-badge text-[#5A5E6E] block mb-2">Open Positions</span>
            <h2 className="text-h2">Join our engineering squad</h2>
          </div>
          <p className="text-body text-[#5A5E6E] max-w-md">
            We review every submission carefully. All roles are available for high-performing remote contributors globally.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {POSITIONS.map((pos) => (
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

                <div className="flex flex-wrap gap-2 pt-2">
                  {pos.tags.map((t) => (
                    <span key={t} className="text-label-mono bg-white px-2.5 py-1 rounded border border-[#0B0D12]/10 text-[#0B0D12]">
                      {t}
                    </span>
                  ))}
                </div>
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
          <span className="text-badge text-[#5A5E6E] block mb-2">Our Operating Principles</span>
          <h2 className="text-h2">How we work together</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#0B0D12]/15 space-y-3">
            <span className="text-label-mono text-[#FF4A1C]">01 / FIRST PRINCIPLES</span>
            <h4 className="text-h4">Substance Over Noise</h4>
            <p className="text-body text-[#5A5E6E]">
              We avoid resume-driven development. Every architectural choice is made for speed, reliability, and real-world user value.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#0B0D12]/15 space-y-3">
            <span className="text-label-mono text-[#FF4A1C]">02 / HIGH AUTONOMY</span>
            <h4 className="text-h4">Ownership Mentality</h4>
            <p className="text-body text-[#5A5E6E]">
              Engineers own their systems from initial whiteboarding to production telemetry. No bureaucratic layers or endless standups.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#0B0D12]/15 space-y-3">
            <span className="text-label-mono text-[#FF4A1C]">03 / COMPENSATIVE VALUE</span>
            <h4 className="text-h4">Top-of-Market Comp</h4>
            <p className="text-body text-[#5A5E6E]">
              We offer competitive base salaries, equity participation, top-tier health coverage, and modern home office allowances.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
