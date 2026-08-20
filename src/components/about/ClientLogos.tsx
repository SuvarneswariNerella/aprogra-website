import React from 'react';
import { Shield, Sparkles, Building2, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const CLIENT_LOGOS = [
  { name: 'Horizon AI', category: 'Agentic AI Platform', badge: 'Series B' },
  { name: 'CloudScale', category: 'DevOps & Kubernetes', badge: 'Enterprise' },
  { name: 'FinTech One', category: 'Banking & Payments', badge: 'Global 500' },
  { name: 'OmniData', category: 'Real-Time Analytics', badge: 'Series A' },
  { name: 'Apex ERP', category: 'Supply Chain SaaS', badge: 'Enterprise' },
  { name: 'VentureFlow', category: 'Deal Flow Software', badge: 'Seed' },
  { name: 'HealthPulse', category: 'HIPAA Care Portal', badge: 'Growth' },
  { name: 'EduNext', category: 'Multi-Tenant ERP', badge: 'Scaleup' },
];

export default function ClientLogos() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-purple-100/60">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/80 shadow-lg shadow-purple-900/5 space-y-10"
      >
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>ENTERPRISE TRUST</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-space text-[#0E1129]">
            Trusted by High-Growth Innovators
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            We partner with ambitious engineering leaders, venture-backed startups, and global enterprise teams.
          </p>
        </div>

        {/* Logos Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-30px' }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {CLIENT_LOGOS.map((client, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }
              }}
              className="p-5 rounded-2xl bg-[#F8F9FE] border border-purple-100/80 hover:border-purple-300 hover:bg-white hover:shadow-md transition-all text-center space-y-1.5 group cursor-default"
            >
              <div className="text-base font-bold font-space text-[#0E1129] group-hover:text-purple-600 transition-colors">
                {client.name}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {client.category}
              </div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-mono font-semibold">
                {client.badge}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Security & Compliance Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-slate-600"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>ISO 27001 Certified Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-600" />
            <span>100% Strict NDA Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>SOC2 Type II Compliant Architectures</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
