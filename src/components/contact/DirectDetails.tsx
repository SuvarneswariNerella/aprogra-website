import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Clock, Code } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly can we expect a response?',
    answer: 'Our solutions team reviews all incoming inquiries promptly. You can expect an initial response within 2 business hours during regular working hours.'
  },
  {
    question: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    answer: 'Yes. Intellectual property and confidentiality are paramount. We routinely sign standard mutual NDAs prior to discussing sensitive software requirements or codebases.'
  },
  {
    question: 'What types of projects do you take on?',
    answer: 'We specialize in modern web and mobile applications, cloud backend systems, enterprise software, and AI workflow integrations.'
  },
  {
    question: 'What engagement models do you support?',
    answer: 'We offer fixed-scope project delivery as well as dedicated engineering team augmentation depending on your timeline and resource requirements.'
  }
];

export default function DirectDetails() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 px-6 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-space">
            Common Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-sm text-slate-900 hover:text-indigo-600 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
