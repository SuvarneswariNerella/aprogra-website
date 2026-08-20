import React from 'react';
import { MessageSquare, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    num: "01",
    title: "1. Initial Inquiry",
    desc: "Share your requirements or schedule a introductory conversation with our team."
  },
  {
    icon: ShieldCheck,
    num: "02",
    title: "2. Technical Review",
    desc: "We review project scope, tech stack requirements, and execute NDAs as needed."
  },
  {
    icon: Rocket,
    num: "03",
    title: "3. Proposal & Execution",
    desc: "Receive a clear roadmap, milestone deliverables, and dedicated engineering team alignment."
  }
];

export default function Invitation() {
  return (
    <section className="py-12 px-6 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">{s.num}</span>
                </div>
                <h3 className="font-bold text-sm text-white font-space">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
