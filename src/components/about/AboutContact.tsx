import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useContactPageContent, useAboutPage, submitInquiry } from '@/lib/strapi';

export default function AboutContact() {
  const { content } = useContactPageContent();
  const { aboutPage } = useAboutPage();
  const contactData = aboutPage.contactCta;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | number>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitInquiry({
        name: formState.name,
        email: formState.email,
        company: formState.company,
        message: formState.message,
        type: 'project_brief'
      });

      if (res.success) {
        setSubmissionId(res.id || '');
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || 'Failed to send inquiry.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#0B0D12]/10 m-0 mt-0 mb-0">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="bg-[#0B0D12] text-[#FAF8F5] rounded-xl p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >

        {/* Left Info Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5 space-y-6 relative z-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-white/15 bg-white/10 text-white text-badge">
            <MessageSquare className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>{contactData.badge || "LET'S CONNECT"}</span>
          </div>

          <h2 className="text-h2 text-white">
            {contactData.headline || 'Ready to Build Something Infinite?'}
          </h2>

          <p className="text-white/70 text-body">
            {contactData.description || 'Whether you have a fully scoped product brief or just an ambitious concept, our technical architects are standing by to explore your vision.'}
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                <Mail className="w-4 h-4 text-[#FF4A1C]" />
              </div>
              <div>
                <span className="text-white/50 block text-caption uppercase font-mono">Direct Inquiry</span>
                <span className="font-bold text-white text-body">{contactData?.email || content?.hero?.email || 'hello@aprogra.com'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                <Phone className="w-4 h-4 text-[#FF4A1C]" />
              </div>
              <div>
                <span className="text-white/50 block text-caption uppercase font-mono">Phone Support</span>
                <span className="font-bold text-white text-body">{contactData?.phone || content?.hero?.phone || '+1 (800) 555-0199'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                <MapPin className="w-4 h-4 text-[#FF4A1C]" />
              </div>
              <div>
                <span className="text-white/50 block text-caption uppercase font-mono">Global Headquarters</span>
                <span className="font-bold text-white text-body">
                  {contactData?.officeLocation || content?.hero?.studioHqValue || 'Hyderabad, India • Global Remote Pods'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-badge text-[#FF4A1C] hover:text-white underline transition-colors"
            >
              <span>Or go to our Interactive Contact Brief Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-7 bg-[#FAF8F5] text-[#0B0D12] p-6 sm:p-8 rounded-lg shadow-lg relative z-10 border border-[#0B0D12]/10"
        >
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-12 h-12 bg-[#FF4A1C]/10 text-[#FF4A1C] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-h3 text-[#0B0D12]">Inquiry Received!</h3>
              <p className="text-caption text-[#0B0D12]/70 max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-[#0B0D12]">{formState.name}</span>. An Aprogra principal architect will reach out to <span className="font-semibold text-[#FF4A1C]">{formState.email}</span> within 2 hours.
              </p>
              {submissionId && (
                <div className="text-[11px] font-mono text-[#5A5E6E]">
                  Strapi Lead ID: #{submissionId}
                </div>
              )}
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-[#0B0D12] text-white rounded text-badge cursor-pointer hover:bg-[#FF4A1C] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-h3 text-[#0B0D12]">Quick Inquiry</h3>
                <p className="text-caption text-[#5A5E6E]">Direct line to our technical architecture pod.</p>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-label-mono text-[#0B0D12] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3 py-2 text-body bg-white border border-[#0B0D12]/15 rounded focus:border-[#0B0D12] outline-none"
                  />
                </div>
                <div>
                  <label className="text-label-mono text-[#0B0D12] block mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-3 py-2 text-body bg-white border border-[#0B0D12]/15 rounded focus:border-[#0B0D12] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-label-mono text-[#0B0D12] block mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp (Optional)"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  className="w-full px-3 py-2 text-body bg-white border border-[#0B0D12]/15 rounded focus:border-[#0B0D12] outline-none"
                />
              </div>

              <div>
                <label className="text-label-mono text-[#0B0D12] block mb-1">Message / Requirements *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what you are building..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-3 py-2 text-body bg-white border border-[#0B0D12]/15 rounded focus:border-[#0B0D12] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#FF4A1C] hover:bg-[#E03E14] disabled:opacity-50 text-white rounded text-badge font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

      </motion.div>
    </section>
  );
}
