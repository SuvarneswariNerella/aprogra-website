import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  Copy, Check, Lock, ArrowRight, Sparkles, Globe 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  'Full-Stack Web App',
  'Mobile Application',
  'Enterprise ERP / SaaS',
  'Cloud Architecture',
  'AI / ML Integration'
];

const BUDGET_RANGES = [
  'Under $15k',
  '$15k – $35k',
  '$35k – $75k',
  '$75k+',
  "Flexible / Let's Discuss"
];

export default function StartProjectCta() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Full-Stack Web App',
    budget: '$15k – $35k',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Refs for ScrollTrigger animations
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        });
      }

      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 80%',
          }
        });
      }

      if (infoColRef.current) {
        gsap.from(infoColRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoColRef.current,
            start: 'top 80%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@aprogra.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section 
      ref={sectionRef} 
      
      id="contact" 
      className="w-full bg-[#F4F1EA] text-[#0B0D12] pt-20 md:pt-28 pb-20 sm:pb-28 overflow-hidden font-sans border-t border-[#0B0D12]/10 relative"
    >
      {/* TOP HEADING BLOCK */}
      <div ref={headingRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto space-y-3 pb-12 sm:pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-xs font-semibold uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
          <span>Start Your Next Project</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B0D12] font-display leading-[1.15]">
          Let's Build Something <br />
          <span className="text-[#FF4A1C]">Extraordinary Together.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#5A5E6E] leading-relaxed max-w-xl mx-auto font-sans">
          Whether you need a full-scale web application, custom school ERP, or technical architecture advisory — our dedicated engineering team is ready to deliver.
        </p>
      </div>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-20">
        
        {/* LEFT COLUMN: INTERACTIVE FORM CARD */}
        <div 
          ref={formCardRef} 
          className="lg:col-span-7 bg-[#FAF8F5] rounded-lg p-6 sm:p-10 shadow-xs border border-[#0B0D12]/15 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#0B0D12]/10">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B0D12] font-display">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5E6E] mt-0.5">
                Fill out the details below and we'll reply within 24 hours.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-[#FAF8F5] text-[#0B0D12] text-xs font-mono font-medium border border-[#0B0D12]/15">
              <span className="w-2 h-2 rounded-full bg-[#FF4A1C] animate-pulse" />
              <span>Available for New Projects</span>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 px-6 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/20 text-center space-y-4 my-4">
              <div className="w-12 h-12 bg-[#0B0D12] text-white rounded-lg flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6 text-[#FF4A1C]" />
              </div>
              <h4 className="text-2xl font-bold font-display text-[#0B0D12]">Inquiry Received!</h4>
              <p className="text-sm text-[#5A5E6E] leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#0B0D12]">{formData.name}</span>. An engineering lead from AProgra will review your project details and reach out to <span className="font-semibold text-[#FF4A1C]">{formData.email}</span> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    projectType: 'Full-Stack Web App',
                    budget: '$15k – $35k',
                    message: ''
                  });
                }}
                className="mt-4 px-6 py-2 bg-[#0B0D12] text-white hover:bg-[#FF4A1C] rounded text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shadow-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Project Type Selectors */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0B0D12] font-mono">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData(prev => ({ ...prev, projectType: type }))}
                      className={`px-3 py-1.5 rounded text-xs font-medium font-mono transition-all cursor-pointer ${
                        formData.projectType === type
                          ? 'bg-[#0B0D12] text-white shadow-xs font-semibold'
                          : 'bg-[#FAF8F5] text-[#0B0D12] hover:border-[#0B0D12] border border-[#0B0D12]/15'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0B0D12]">
                    Your Name <span className="text-[#FF4A1C]">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3.5 py-2.5 border border-[#0B0D12]/20 rounded text-sm text-[#0B0D12] bg-[#FAF8F5] placeholder-[#5A5E6E]/60 outline-none transition-all duration-200 focus:border-[#0B0D12] focus:ring-1 focus:ring-[#0B0D12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0B0D12]">
                    Work Email <span className="text-[#FF4A1C]">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 border border-[#0B0D12]/20 rounded text-sm text-[#0B0D12] bg-[#FAF8F5] placeholder-[#5A5E6E]/60 outline-none transition-all duration-200 focus:border-[#0B0D12] focus:ring-1 focus:ring-[#0B0D12]"
                  />
                </div>
              </div>

              {/* Company Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#0B0D12]">
                  Company or Organization <span className="text-[#5A5E6E] font-normal">(Optional)</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Acme Health or Startup Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3.5 py-2.5 border border-[#0B0D12]/20 rounded text-sm text-[#0B0D12] bg-[#FAF8F5] placeholder-[#5A5E6E]/60 outline-none transition-all duration-200 focus:border-[#0B0D12] focus:ring-1 focus:ring-[#0B0D12]"
                />
              </div>

              {/* Budget Range Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0B0D12] font-mono">
                  Estimated Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData(prev => ({ ...prev, budget: b }))}
                      className={`px-3 py-1.5 rounded text-xs font-medium font-mono transition-all cursor-pointer ${
                        formData.budget === b
                          ? 'bg-[#0B0D12] text-white shadow-xs font-semibold'
                          : 'bg-[#FAF8F5] text-[#0B0D12] hover:border-[#0B0D12] border border-[#0B0D12]/15'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#0B0D12]">
                  Project Overview & Goals
                </label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about the key features, expected timelines, or technical requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3.5 py-2.5 border border-[#0B0D12]/20 rounded text-sm text-[#0B0D12] bg-[#FAF8F5] placeholder-[#5A5E6E]/60 outline-none transition-all duration-200 focus:border-[#0B0D12] focus:ring-1 focus:ring-[#0B0D12] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all duration-200 disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Inquiry'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Security guarantee footer */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#5A5E6E] border-t border-[#0B0D12]/10 font-mono">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#0B0D12]" />
                  <span>Strict NDA & Data Privacy Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0B0D12] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span>Response SLA: &lt; 2 hrs</span>
                </div>
              </div>

            </form>
          )}
        </div>

        {/* RIGHT COLUMN: CONTACT DETAILS & HUB */}
        <div ref={infoColRef} className="lg:col-span-5 space-y-5">
          
          {/* Direct Channels Card */}
          <div className="bg-[#FAF8F5] rounded-lg p-6 sm:p-8 border border-[#0B0D12]/15 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#0B0D12] font-display pb-3 border-b border-[#0B0D12]/10">
              Direct Contact Channels
            </h3>

            <div className="space-y-4">
              
              {/* Email Item */}
              <div className="flex items-start gap-3.5 group p-3 rounded-md hover:bg-[#F4F1EA] transition-all border border-transparent hover:border-[#0B0D12]/15">
                <div className="w-9 h-9 rounded bg-[#0B0D12]/5 text-[#0B0D12] flex items-center justify-center shrink-0 group-hover:bg-[#0B0D12] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#5A5E6E] font-mono">Email Us Directly</div>
                  <div className="text-sm font-bold text-[#0B0D12] truncate font-mono">hello@aprogra.com</div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-xs text-[#FF4A1C] font-mono font-semibold mt-0.5 hover:underline cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-[#0B0D12]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                  </button>
                </div>
              </div>

              {/* Phone Item */}
              <div className="flex items-start gap-3.5 group p-3 rounded-md hover:bg-[#F4F1EA] transition-all border border-transparent hover:border-[#0B0D12]/15">
                <div className="w-9 h-9 rounded bg-[#0B0D12]/5 text-[#0B0D12] flex items-center justify-center shrink-0 group-hover:bg-[#0B0D12] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#5A5E6E] font-mono">Phone / WhatsApp</div>
                  <div className="text-sm font-bold text-[#0B0D12] font-mono">+1 (800) 555-0199</div>
                  <div className="text-xs text-[#5A5E6E]">Mon – Fri, 9:00 AM – 7:00 PM EST</div>
                </div>
              </div>

              {/* HQ Item */}
              <div className="flex items-start gap-3.5 group p-3 rounded-md hover:bg-[#F4F1EA] transition-all border border-transparent hover:border-[#0B0D12]/15">
                <div className="w-9 h-9 rounded bg-[#0B0D12]/5 text-[#0B0D12] flex items-center justify-center shrink-0 group-hover:bg-[#0B0D12] group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#5A5E6E] font-mono">Global Headquarters</div>
                  <div className="text-sm font-bold text-[#0B0D12]">500 Howard St, Suite 400</div>
                  <div className="text-xs text-[#5A5E6E]">San Francisco, CA 94105</div>
                </div>
              </div>

            </div>
          </div>

          {/* Global Operations Hub Banner */}
          <div className="bg-[#0B0D12] text-[#F4F1EA] rounded-lg p-6 sm:p-7 space-y-4 shadow-xs border border-[#0B0D12] relative overflow-hidden">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF4A1C] font-mono uppercase tracking-wider">
              <Globe className="w-4 h-4 text-[#FF4A1C]" />
              <span>Global Presence</span>
            </div>

            <h4 className="text-lg font-bold font-display text-white">
              Engineering Across Global Time Zones
            </h4>

            <p className="text-xs text-[#FAF8F5]/80 leading-relaxed font-sans">
              Operating hub networks in <span className="text-white font-medium">San Francisco, London, and Hyderabad</span> to provide uninterrupted product velocity and active support.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
              <div className="bg-[#0B0D12] p-2 rounded border border-white/15">
                <div className="text-[10px] text-[#FF4A1C] font-mono">USA</div>
                <div className="text-xs font-bold text-white mt-0.5 font-display">San Francisco</div>
              </div>
              <div className="bg-[#0B0D12] p-2 rounded border border-white/15">
                <div className="text-[10px] text-[#FF4A1C] font-mono">UK</div>
                <div className="text-xs font-bold text-white mt-0.5 font-display">London</div>
              </div>
              <div className="bg-[#0B0D12] p-2 rounded border border-white/15">
                <div className="text-[10px] text-[#FF4A1C] font-mono">INDIA</div>
                <div className="text-xs font-bold text-white mt-0.5 font-display">Hyderabad</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
