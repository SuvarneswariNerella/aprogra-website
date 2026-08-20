import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Globe, Copy, Check } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Work email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.message.trim()) errs.message = 'Please enter your message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <section id="contact-form-section" className="py-16 md:py-24 px-6 bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Simple Professional Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1 pb-2 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 font-space">Send Us a Message</h2>
            <p className="text-sm text-slate-500">
              Fill out the form below and our team will get back to you within 2 business hours.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all ${
                      errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Work Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@company.com"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all ${
                      errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Topic of Interest</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Cloud & Infrastructure">Cloud &amp; Infrastructure</option>
                    <option value="AI & Automation Integration">AI &amp; Automation Integration</option>
                    <option value="Partnership / Carrier Opportunities">Partnership Opportunities</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Message <span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you? Describe your project or questions..."
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none ${
                    errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>

              <p className="text-xs text-slate-500 text-center">
                We respect your privacy. Your information is never shared with third parties.
              </p>

            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-space">Thank You for Reaching Out!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We have received your message. A member of our engineering team will respond to <span className="font-semibold text-slate-900">{formData.email}</span> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: '', email: '', company: '', subject: 'General Inquiry', message: '' });
                }}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Send another message →
              </button>
            </div>
          )}

        </div>

        {/* Right: Direct Info & Office Locations */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Details Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 font-space pb-3 border-b border-slate-100">
              Direct Contact
            </h3>

            <div className="space-y-5 text-sm text-slate-700">
              
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-500 font-medium">General Email</div>
                  <div className="font-semibold text-slate-900">hello@aprogra.com</div>
                  <button
                    onClick={() => handleCopy('hello@aprogra.com', 'email')}
                    className="text-xs text-indigo-600 hover:underline flex items-center gap-1 font-medium pt-1 cursor-pointer"
                  >
                    {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'email' ? 'Copied' : 'Copy email'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-500 font-medium">Telephone</div>
                  <div className="font-semibold text-slate-900">+1 (800) 555-0199</div>
                  <div className="text-xs text-slate-500">Mon – Fri: 8:00 AM – 6:00 PM PST</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-500 font-medium">San Francisco HQ</div>
                  <div className="font-semibold text-slate-900">500 Howard St, Suite 400</div>
                  <div className="text-xs text-slate-500">San Francisco, CA 94105</div>
                </div>
              </div>

            </div>
          </div>

          {/* Global Hubs Summary */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>Global Presence</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              With teams in San Francisco, London, and Singapore, we deliver continuous support and development coverage across all time zones.
            </p>
            <div className="pt-2 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-slate-800/80 font-medium">San Francisco</div>
              <div className="p-2 rounded bg-slate-800/80 font-medium">London</div>
              <div className="p-2 rounded bg-slate-800/80 font-medium">Singapore</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
