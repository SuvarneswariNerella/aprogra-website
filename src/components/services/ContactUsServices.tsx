import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ContactUsServices() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('$10k - $25k');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  return (
    <section
      className="relative bg-[#F7F8FF] text-[#0D0F1C] pt-24 pb-0 overflow-hidden m-0 mt-0 mb-0 border-b border-[#E4E8FF]"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: INFO CARDS & HEADING */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#3B4FCF]/10 border border-[#3B4FCF]/20 text-[#3B4FCF] font-semibold text-xs uppercase tracking-widest font-mono">
                Contact Us
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0D0F1C] font-space leading-tight">
                Let's Build Something Exceptional.
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed">
                Have a project in mind, need technical advice, or want to discuss scaling your architecture? We respond within 4 hours.
              </p>
            </div>

            {/* 3 INFO CARDS */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E4E8FF] shadow-sm flex items-start gap-4 hover:border-[#3B4FCF] transition-colors">
                <div className="p-3 rounded-xl bg-[#3B4FCF]/10 text-[#3B4FCF] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono font-semibold uppercase text-[#6B7280]">
                    General Inquiries
                  </span>
                  <a
                    href="mailto:hello@aprogra.com"
                    className="text-base font-bold font-space text-[#0D0F1C] hover:text-[#3B4FCF] transition-colors"
                  >
                    hello@aprogra.com
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E4E8FF] shadow-sm flex items-start gap-4 hover:border-[#3B4FCF] transition-colors">
                <div className="p-3 rounded-xl bg-[#3B4FCF]/10 text-[#3B4FCF] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono font-semibold uppercase text-[#6B7280]">
                    Direct Line
                  </span>
                  <a
                    href="tel:+18005550199"
                    className="text-base font-bold font-space text-[#0D0F1C] hover:text-[#3B4FCF] transition-colors"
                  >
                    +1 (800) 555-0199
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E4E8FF] shadow-sm flex items-start gap-4 hover:border-[#3B4FCF] transition-colors">
                <div className="p-3 rounded-xl bg-[#3B4FCF]/10 text-[#3B4FCF] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono font-semibold uppercase text-[#6B7280]">
                    Global Headquarters
                  </span>
                  <span className="text-base font-bold font-space text-[#0D0F1C]">
                    San Francisco, CA & London, UK
                  </span>
                </div>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="pt-2 flex items-center gap-4">
              {['LinkedIn', 'GitHub', 'Twitter / X', 'Dribbble'].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="px-4 py-2 rounded-full bg-white border border-[#E4E8FF] text-xs font-semibold text-[#374151] hover:bg-[#3B4FCF] hover:text-white hover:border-[#3B4FCF] transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7 bg-white border border-[#E4E8FF] rounded-3xl p-8 md:p-10 shadow-xl relative">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#3B4FCF] mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold font-space text-[#0D0F1C]">
                  Message Received!
                </h3>
                <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                  Thank you for reaching out to AProgra. An engineering lead will review your message and reply within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold font-space text-[#0D0F1C]">
                  Send a Project Brief
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#6B7280] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F8FF] border border-[#E4E8FF] text-sm text-[#0D0F1C] focus:outline-none focus:border-[#3B4FCF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#6B7280] mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F8FF] border border-[#E4E8FF] text-sm text-[#0D0F1C] focus:outline-none focus:border-[#3B4FCF] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#6B7280] mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F8FF] border border-[#E4E8FF] text-sm text-[#0D0F1C] focus:outline-none focus:border-[#3B4FCF] transition-colors"
                  />
                </div>

                {/* BUDGET SELECTOR */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#6B7280] mb-2">
                    Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['<$10k', '$10k - $25k', '$25k - $50k', '$50k+'].map(
                      (budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setSelectedBudget(budget)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedBudget === budget
                              ? 'bg-[#3B4FCF] text-white border-[#3B4FCF]'
                              : 'bg-[#F7F8FF] text-[#6B7280] border-[#E4E8FF] hover:border-[#3B4FCF]'
                          }`}
                        >
                          {budget}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#6B7280] mb-2">
                    Project Scope & Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your goals, timeline, and key technical requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F8FF] border border-[#E4E8FF] text-sm text-[#0D0F1C] focus:outline-none focus:border-[#3B4FCF] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#3B4FCF] text-white font-space font-semibold text-base shadow-lg shadow-[#3B4FCF]/30 hover:bg-[#2D3EB8] hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Project Brief</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FULL WIDTH GOOGLE MAP STRIP */}
      <div className="w-full h-[380px] bg-[#E4E8FF] relative border-t border-[#E4E8FF]">
        <iframe
          title="AProgra Global HQ Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017932688!3d37.757815000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* DARK FOOTER STRIP */}
      <footer className="w-full bg-[#0D0F1C] text-white py-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-white font-space font-bold text-lg">AProgra</span>
            <span>© {new Date().getFullYear()} AProgra Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
