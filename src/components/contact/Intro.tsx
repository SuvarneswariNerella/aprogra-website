import React from 'react';
import { Mail, Phone, Clock, ShieldCheck } from 'lucide-react';

export default function Intro() {
  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16 px-6 bg-slate-900 text-white relative">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-space">
          Let's Start a Conversation
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Have a project in mind, need technical advisory, or want to learn more about our engineering services? We're here to help.
        </p>

        {/* Key Highlights */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium border-t border-slate-800/80 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Response within 2 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>hello@aprogra.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>+1 (800) 555-0199</span>
          </div>
        </div>
      </div>
    </section>
  );
}
