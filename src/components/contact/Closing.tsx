import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

export default function Closing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 px-6 bg-slate-950 text-white text-center border-t border-slate-800">
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-space text-white">
          Ready to Discuss Your Project?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Contact our team today to get started or learn more about how we can help your business grow.
        </p>

        <div className="pt-2 flex justify-center items-center gap-4">
          <a
            href="mailto:hello@aprogra.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>hello@aprogra.com</span>
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
