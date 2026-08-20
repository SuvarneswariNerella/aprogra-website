import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Clock, UserCheck, 
  Compass, FileCheck, Rocket, Send, CheckCircle2, Copy, Check, 
  Mail, Phone, MapPin, Globe, ExternalLink, Video, Calendar, X,
  Lock, ArrowUp, ChevronRight, MessageSquare, Star
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  'Web Apps',
  'Mobile Apps',
  'AI & Automation',
  'Content & Marketing',
  'Design Systems',
  'Enterprise ERP'
];

const BUDGET_RANGES = [
  '< $15K',
  '$15K – $25K',
  '$25K – $75K',
  '$75K+'
];

const TIMELINES = [
  '< 1 Month',
  '1–3 Months',
  '3–6 Months',
  'Flexible'
];

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    capabilities: ['Web Apps', 'AI & Automation'] as string[],
    budget: '$25K – $75K',
    timeline: '1–3 Months',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Copy Feedback States
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Intro Call Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState('Tomorrow, 10:00 AM EST');
  const [modalConfirmed, setModalConfirmed] = useState(false);

  // Refs for Animations
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const briefRef = useRef<HTMLDivElement>(null);
  const directRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }

      // Engagement process cards entrance
      if (processRef.current) {
        gsap.from(processRef.current.querySelectorAll('.process-card'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 80%',
          }
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Capability Toggle
  const toggleCapability = (cap: string) => {
    setFormData(prev => {
      const exists = prev.capabilities.includes(cap);
      if (exists) {
        // Keep at least one selected
        if (prev.capabilities.length === 1) return prev;
        return { ...prev, capabilities: prev.capabilities.filter(c => c !== cap) };
      } else {
        return { ...prev, capabilities: [...prev.capabilities, cap] };
      }
    });
  };

  // Copy Helpers
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@aprogra.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+1 (800) 555-0199');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Smooth Scroll Helper
  const scrollToBrief = () => {
    const briefElem = document.getElementById('project-brief');
    if (briefElem) {
      briefElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email.trim()) newErrors.email = 'Work email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.message.trim()) newErrors.message = 'Please provide a brief project overview';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  return (
    <div ref={mainRef} className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] font-sans antialiased pt-16">
      
      {/* ========================================================= */}
      {/* 2. HERO SECTION (2-PART LEFT & RIGHT LAYOUT - SINGLE SCREEN) */}
      {/* ========================================================= */}
      <section className="relative px-4 sm:px-6 md:px-10 py-6 sm:py-8 lg:py-4 overflow-hidden border-b border-[#0B0D12]/10 bg-[#F4F1EA] text-[#0B0D12] min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] lg:max-h-[calc(100vh-64px)] flex flex-col justify-center">
        {/* Ambient Engineering Grid & Glow in Background */}
        <div className="absolute inset-0 pointer-events-none -z-0 opacity-40">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #0B0D12 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
          {/* Soft Radial Ambient Glow */}
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF4A1C]/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN: Headings, Supporting Text & Primary CTAs  */}
          {/* ======================================================= */}
          <div ref={heroRef} className="lg:col-span-7 space-y-3 sm:space-y-4 text-left relative z-10">
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#0B0D12]/12 text-[#0B0D12] text-xs font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span>ACCEPTING NEW PROJECTS • Q3/Q4 ENGAGEMENTS</span>
            </div>

            {/* Main Headline (Single H1) */}
            <div className="space-y-1">
              <h1 className="text-h1 text-[#0B0D12]">
                Let’s engineer something <br />
                <span className="text-[#FF4A1C]">
                  infinite.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm lg:text-base text-[#5A5E6E] max-w-xl leading-relaxed">
              Have a breakthrough product, an enterprise platform to scale, or an AI workflow to automate? Connect directly with our lead architects to turn your vision into production-ready software.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={scrollToBrief}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Start Your Brief</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#FF4A1C]" />
                <span>Schedule Intro Call</span>
              </button>
            </div>

            {/* Trust Indicators / SLA Row */}
            <div className="pt-3 border-t border-[#0B0D12]/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-[#0B0D12]">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#0B0D12]/10 shadow-2xs">
                <Clock className="w-4 h-4 text-[#FF4A1C] shrink-0" />
                <span>&lt; 2 hrs Response SLA</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#0B0D12]/10 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#0B0D12] shrink-0" />
                <span>100% NDA Protected</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#0B0D12]/10 shadow-2xs">
                <UserCheck className="w-4 h-4 text-[#FF4A1C] shrink-0" />
                <span>Lead Architect Access</span>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN: Fast-Track Direct Channels & Pod Status   */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl bg-white border border-[#0B0D12]/15 p-4 sm:p-5 shadow-md space-y-3">
              
              {/* Header row */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-[11px] font-mono font-bold text-[#0B0D12] uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span>DIRECT CHANNELS</span>
                </span>
                
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Pod Active</span>
                </span>
              </div>

              {/* Direct Channels List with 1-Click Copy */}
              <div className="space-y-2">
                
                {/* Email item */}
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#0B0D12]/10 flex items-center justify-center text-[#FF4A1C] shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[9px] font-mono uppercase text-[#5A5E6E]">Primary Inquiries</span>
                      <span className="text-xs font-mono font-bold text-[#0B0D12] truncate">hello@aprogra.com</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2 py-0.5 rounded bg-white hover:bg-gray-50 border border-[#0B0D12]/15 text-[10px] font-mono text-[#0B0D12] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#5A5E6E]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone item */}
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#0B0D12]/10 flex items-center justify-center text-[#FF4A1C] shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[9px] font-mono uppercase text-[#5A5E6E]">Direct Phone Line</span>
                      <span className="text-xs font-mono font-bold text-[#0B0D12] truncate">+1 (800) 555-0199</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="px-2 py-0.5 rounded bg-white hover:bg-gray-50 border border-[#0B0D12]/15 text-[10px] font-mono text-[#0B0D12] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs shrink-0"
                    title="Copy Phone"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#5A5E6E]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* HQ & Location */}
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#0B0D12]/10 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#0B0D12]/10 flex items-center justify-center text-[#FF4A1C] shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-mono uppercase text-[#5A5E6E]">Studio HQ</span>
                    <span className="text-xs font-bold text-[#0B0D12] block truncate">Hyderabad, India • Global Remote Pods</span>
                  </div>
                </div>

              </div>

              {/* Action Banner */}
              <div className="pt-1">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2.5 rounded-lg bg-[#0B0D12] hover:bg-[#FF4A1C] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Book 15-Min Intro Call</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. PROJECT BRIEF / CONTACT FORM SECTION */}
      <section id="project-brief" ref={briefRef} className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-badge shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>Interactive Brief Generator</span>
          </div>
          <h2 className="text-h2 text-[#0B0D12]">
            Tell us about your project.
          </h2>
          <p className="text-body-lg text-[#5A5E6E] max-w-xl mx-auto">
            Fill out the brief below to generate your custom project preview and start a direct conversation with our technical team.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-lg p-6 sm:p-10 border border-[#0B0D12]/15 shadow-sm space-y-6">
            
            {isSubmitted ? (
              <div className="py-12 px-6 text-center space-y-5">
                <div className="w-16 h-16 bg-[#0B0D12] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-[#FF4A1C]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-h3 text-[#0B0D12]">
                    Project Brief Received!
                  </h3>
                  <p className="text-sm text-[#5A5E6E] max-w-md mx-auto leading-relaxed font-sans">
                    Thank you, <span className="font-semibold text-[#0B0D12]">{formData.name}</span>. Our lead architects are reviewing your specifications and will get back to <span className="font-semibold text-[#0B0D12]">{formData.email}</span> within 2 hours.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#0B0D12]/15 text-xs text-[#0B0D12] max-w-md mx-auto text-left space-y-1 font-mono">
                  <div className="font-bold">Brief Confirmation ID: #{Math.floor(100000 + Math.random() * 900000)}</div>
                  <div>Capabilities: {formData.capabilities.join(', ')}</div>
                  <div>Target Budget: {formData.budget} | Timeline: {formData.timeline}</div>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      capabilities: ['Web Apps'],
                      budget: '$25K – $75K',
                      timeline: '1–3 Months',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white font-bold text-xs font-mono rounded transition-all cursor-pointer shadow-xs"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border-b border-[#0B0D12]/10 pb-4">
                  <h3 className="text-h3 text-[#0B0D12]">
                    Project Requirements Form
                  </h3>
                  <p className="text-caption text-[#5A5E6E] mt-0.5">
                    Select your project attributes to help us match the right technical team.
                  </p>
                </div>

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-label-mono text-[#0B0D12]">
                      Your Name <span className="text-[#FF4A1C]">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border text-body text-[#0B0D12] bg-white placeholder-[#5A5E6E]/60 outline-none transition-all ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#0B0D12]/15 focus:border-[#0B0D12]'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-caption font-mono">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-mono text-[#0B0D12]">
                      Work Email <span className="text-[#FF4A1C]">*</span>
                    </label>
                    <input 
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border text-body text-[#0B0D12] bg-white placeholder-[#5A5E6E]/60 outline-none transition-all ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#0B0D12]/15 focus:border-[#0B0D12]'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-caption font-mono">{errors.email}</p>}
                  </div>
                </div>

                {/* Company / Organization Input */}
                <div className="space-y-1.5">
                  <label className="block text-label-mono text-[#0B0D12]">
                    Company / Organization <span className="text-[#5A5E6E] font-normal lowercase">(optional)</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. NextGen SaaS or Stealth Startup"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#0B0D12]/15 text-body text-[#0B0D12] bg-white placeholder-[#5A5E6E]/60 outline-none focus:border-[#0B0D12] transition-all"
                  />
                </div>

                {/* Capabilities Chips */}
                <div className="space-y-2">
                  <label className="block text-label-mono text-[#0B0D12]">
                    What capabilities do you require?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CAPABILITIES.map((cap) => {
                      const isSelected = formData.capabilities.includes(cap);
                      return (
                        <button
                          type="button"
                          key={cap}
                          onClick={() => toggleCapability(cap)}
                          className={`px-3.5 py-2 rounded-lg text-caption font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#0B0D12] text-white shadow-xs'
                              : 'bg-white text-[#0B0D12] hover:bg-[#FAF8F5] border border-[#0B0D12]/15'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#FF4A1C]" />}
                          <span>{cap}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range Chips */}
                <div className="space-y-2">
                  <label className="block text-label-mono text-[#0B0D12]">
                    Expected Investment Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`py-2.5 px-3 rounded-lg text-caption font-mono font-semibold transition-all text-center cursor-pointer ${
                          formData.budget === b
                            ? 'bg-[#0B0D12] text-white shadow-xs'
                            : 'bg-white text-[#0B0D12] hover:bg-[#FAF8F5] border border-[#0B0D12]/15'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline Chips */}
                <div className="space-y-2">
                  <label className="block text-label-mono text-[#0B0D12]">
                    Target Timeline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIMELINES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, timeline: t })}
                        className={`py-2.5 px-3 rounded-lg text-caption font-mono font-semibold transition-all text-center cursor-pointer ${
                          formData.timeline === t
                            ? 'bg-[#0B0D12] text-white shadow-xs'
                            : 'bg-white text-[#0B0D12] hover:bg-[#FAF8F5] border border-[#0B0D12]/15'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overview Textarea */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-label-mono text-[#0B0D12]">
                      Project Overview & Goals <span className="text-[#FF4A1C]">*</span>
                    </label>
                    <span className="text-caption text-[#5A5E6E] font-mono">
                      {formData.message.length} / 1000
                    </span>
                  </div>
                  <textarea 
                    rows={4}
                    maxLength={1000}
                    placeholder="Describe your project, key goals, target users, or tech stack requirements..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-lg border text-body text-[#0B0D12] bg-white placeholder-[#5A5E6E]/60 outline-none transition-all resize-none ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#0B0D12]/15 focus:border-[#0B0D12]'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-caption font-mono">{errors.message}</p>}
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded-lg text-badge flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all duration-200 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Brief...' : 'Submit Project Brief'}</span>
                </button>

                {/* Privacy Guarantee */}
                <div className="pt-2 flex items-center justify-center gap-1.5 text-caption text-[#5A5E6E] text-center font-mono">
                  <Lock className="w-3.5 h-3.5 text-[#0B0D12] shrink-0" />
                  <span>Submitted information is strictly protected under NDA and will never be shared.</span>
                </div>

              </form>
            )}

          </div>

          {/* RIGHT COLUMN: LIVE BRIEF SUMMARY & BOOKING CARD */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Brief Summary Card (Dark Container) */}
            <div className="bg-[#0B0D12] text-[#F4F1EA] rounded-lg p-6 sm:p-8 shadow-md relative overflow-hidden border border-[#0B0D12]">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF4A1C] animate-pulse" />
                  <span className="text-label-mono text-white">
                    Live Brief Preview
                  </span>
                </div>
                <span className="text-caption font-mono bg-white/10 text-white px-2.5 py-0.5 rounded border border-white/20">
                  Auto-Updating
                </span>
              </div>

              {/* Dynamic Content Display */}
              <div className="space-y-4 py-5 text-body relative z-10">
                
                {/* Client Name & Email */}
                <div>
                  <div className="text-label-mono text-[#F4F1EA]/60">Client Lead</div>
                  <div className="text-h4 text-white mt-0.5">
                    {formData.name.trim() || 'Your Name'}
                  </div>
                  <div className="text-caption text-[#FF4A1C] font-mono">
                    {formData.email.trim() || 'your.email@company.com'}
                  </div>
                  {formData.company.trim() && (
                    <div className="text-caption text-[#F4F1EA]/70 mt-0.5">
                      Company: <span className="text-white font-medium">{formData.company}</span>
                    </div>
                  )}
                </div>

                {/* Selected Capabilities */}
                <div>
                  <div className="text-label-mono text-[#F4F1EA]/60 mb-1.5">Capabilities</div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.capabilities.map((cap) => (
                      <span key={cap} className="px-2.5 py-1 rounded bg-white/10 text-white border border-white/15 text-caption font-mono font-medium">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div>
                    <div className="text-label-mono text-[#F4F1EA]/60">Investment</div>
                    <div className="text-body font-bold text-[#FF4A1C] mt-0.5 font-mono">{formData.budget}</div>
                  </div>
                  <div>
                    <div className="text-label-mono text-[#F4F1EA]/60">Timeline</div>
                    <div className="text-body font-bold text-white mt-0.5 font-mono">{formData.timeline}</div>
                  </div>
                </div>

                {/* Overview Snippet */}
                {formData.message.trim() && (
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-label-mono text-[#F4F1EA]/60">Brief Snippet</div>
                    <p className="text-caption text-[#F4F1EA]/80 mt-1 line-clamp-3 italic">
                      "{formData.message}"
                    </p>
                  </div>
                )}

              </div>

              {/* Status footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-caption text-[#F4F1EA]/70 relative z-10 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span>SLA Response: &lt; 2 hrs</span>
                </div>
                <span className="text-[#FF4A1C] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Review
                </span>
              </div>
            </div>

            {/* Testimonial Review Box */}
            <div className="bg-[#FAF8F5] rounded-lg p-5 border border-[#0B0D12]/15 shadow-xs space-y-2">
              <div className="flex items-center gap-1 text-[#FF4A1C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF4A1C]" />
                ))}
              </div>
              <p className="text-body text-[#5A5E6E] italic">
                "Aprogra delivered our core platform ahead of schedule with flawless architecture. Their technical team feels like an in-house extension."
              </p>
              <div className="text-caption font-bold text-[#0B0D12] font-mono">
                — Marcus Vance, CTO at SaaSify
              </div>
            </div>

            {/* Book a 15-Min Intro Call Box */}
            <div className="bg-[#FAF8F5] rounded-lg p-5 border border-[#0B0D12]/15 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#FF4A1C]" />
                <h4 className="text-h4 text-[#0B0D12]">
                  Prefer a face-to-face video call?
                </h4>
              </div>
              <p className="text-body text-[#5A5E6E]">
                Schedule an immediate 15-minute intro with our engineering leads to talk through your platform requirements.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 px-4 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded text-badge flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a 15-Min Intro Call</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. DIRECT CONTACT SECTION */}
      <section ref={directRef} className="w-full bg-[#FAF8F5] py-20 px-6 border-y border-[#0B0D12]/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-badge text-[#0B0D12] bg-white px-3.5 py-1.5 rounded-lg inline-block border border-[#0B0D12]/15 shadow-xs">
              DIRECT CHANNELS
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              Get in touch directly
            </h2>
            <p className="text-body-lg text-[#5A5E6E]">
              Prefer direct communication? Reach out through any of our primary channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1 — GENERAL INQUIRIES */}
            <div className="bg-white rounded-lg p-6 border border-[#0B0D12]/15 shadow-xs flex flex-col justify-between space-y-6 h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] flex items-center justify-center border border-[#0B0D12]/15">
                  <Mail className="w-6 h-6 text-[#0B0D12]" />
                </div>
                <div>
                  <span className="text-label-mono text-[#5A5E6E]">
                    GENERAL INQUIRIES
                  </span>
                  <h3 className="text-h4 text-[#0B0D12] mt-1 break-words">
                    hello@aprogra.com
                  </h3>
                  <p className="text-caption text-[#5A5E6E] mt-2">
                    Mentioned 24/7 by solution engineers
                  </p>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white text-caption font-mono transition-colors duration-200 flex items-center justify-center gap-2 border border-[#0B0D12]/15 cursor-pointer shadow-xs"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-[#FF4A1C]" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* CARD 2 — PHONE */}
            <div className="bg-white rounded-lg p-6 border border-[#0B0D12]/15 shadow-xs flex flex-col justify-between space-y-6 h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] flex items-center justify-center border border-[#0B0D12]/15">
                  <Phone className="w-6 h-6 text-[#0B0D12]" />
                </div>
                <div>
                  <span className="text-label-mono text-[#5A5E6E]">
                    PHONE
                  </span>
                  <h3 className="text-h4 text-[#0B0D12] mt-1 break-words">
                    +1 (800) 555-0199
                  </h3>
                  <p className="text-caption text-[#5A5E6E] mt-2">
                    Mon–Fri, 8:00 AM–6:00 PM PST
                  </p>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white text-caption font-mono transition-colors duration-200 flex items-center justify-center gap-2 border border-[#0B0D12]/15 cursor-pointer shadow-xs"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-4 h-4 text-[#FF4A1C]" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Phone Number</span>
                  </>
                )}
              </button>
            </div>

            {/* CARD 3 — GLOBAL HEADQUARTERS */}
            <div className="bg-white rounded-lg p-6 border border-[#0B0D12]/15 shadow-xs flex flex-col justify-between space-y-6 h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] flex items-center justify-center border border-[#0B0D12]/15">
                  <MapPin className="w-6 h-6 text-[#0B0D12]" />
                </div>
                <div>
                  <span className="text-label-mono text-[#5A5E6E]">
                    GLOBAL HEADQUARTERS
                  </span>
                  <h3 className="text-h4 text-[#0B0D12] mt-1 break-words">
                    San Francisco, CA
                  </h3>
                  <p className="text-caption text-[#5A5E6E] mt-2">
                    500 Howard St, Suite 420
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=San+Francisco+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white text-caption font-mono transition-colors duration-200 flex items-center justify-center gap-2 border border-[#0B0D12]/15 cursor-pointer shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* CARD 4 — REGIONAL TECH HUB */}
            <div className="bg-white rounded-lg p-6 border border-[#0B0D12]/15 shadow-xs flex flex-col justify-between space-y-6 h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] flex items-center justify-center border border-[#0B0D12]/15">
                  <Globe className="w-6 h-6 text-[#0B0D12]" />
                </div>
                <div>
                  <span className="text-label-mono text-[#5A5E6E]">
                    REGIONAL TECH HUB
                  </span>
                  <h3 className="text-h4 text-[#0B0D12] mt-1 break-words">
                    Singapore & London
                  </h3>
                  <p className="text-caption text-[#5A5E6E] mt-2">
                    Serving clients across 4 timezones
                  </p>
                </div>
              </div>
              <div className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] text-[#0B0D12] text-caption font-mono flex items-center justify-center gap-2 border border-[#0B0D12]/15">
                <Globe className="w-4 h-4" />
                <span>Remote First Engineering</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CLOSING CTA BANNER WITH VISIBLE INFINITY SYMBOL */}
      <section className="w-full bg-[#F4F1EA] text-[#0B0D12] py-28 px-6 relative overflow-hidden flex items-center justify-center min-h-[480px] border-t border-[#0B0D12]/10">
        
        {/* LARGE, CLEAR, VISIBLE INFINITY (∞) SYMBOL IN BACKGROUND */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <svg 
            className="w-[700px] sm:w-[850px] md:w-[1000px] max-w-[95vw] h-auto opacity-15" 
            viewBox="0 0 800 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Path */}
            <path 
              d="M 400,200 C 500,100 650,100 650,200 C 650,300 500,300 400,200 C 300,100 150,100 150,200 C 150,300 300,300 400,200 Z" 
              stroke="#0B0D12" 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            {/* Core Stroke Path */}
            <path 
              d="M 400,200 C 500,100 650,100 650,200 C 650,300 500,300 400,200 C 300,100 150,100 150,200 C 150,300 300,300 400,200 Z" 
              stroke="#FF4A1C" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="200"
              strokeDashoffset="100"
            />
          </svg>
        </div>

        {/* CONTENT LAYERED ABOVE THE INFINITY SYMBOL */}
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-h2 text-[#0B0D12]">
            Engineering Infinite <br />
            <span className="text-[#FF4A1C]">
              Possibilities.
            </span>
          </h2>

          <p className="text-body-lg text-[#5A5E6E] max-w-xl mx-auto">
            Thank you for visiting. We look forward to building with you.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FAF8F5] hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white border border-[#0B0D12]/15 text-badge transition-all duration-200 cursor-pointer shadow-xs"
            >
              <ArrowUp className="w-4 h-4" />
              <span>BACK TO TOP ↑</span>
            </button>
          </div>
        </div>
      </section>

      {/* MODAL: BOOK A 15-MIN INTRO CALL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-lg max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#0B0D12]/20">
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setModalConfirmed(false);
              }}
              className="absolute top-5 right-5 text-[#5A5E6E] hover:text-[#0B0D12] p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!modalConfirmed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0B0D12] text-white flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#FF4A1C]" />
                  </div>
                  <div>
                    <h3 className="text-h4 text-[#0B0D12]">Book 15-Min Intro Call</h3>
                    <p className="text-caption text-[#5A5E6E]">Directly with our Lead Solutions Architect</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-label-mono text-[#0B0D12] block">Select Preferred Time Slot</label>
                  <select 
                    value={modalDate} 
                    onChange={(e) => setModalDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#0B0D12]/15 text-body text-[#0B0D12] outline-none focus:border-[#0B0D12] bg-white font-mono"
                  >
                    <option>Tomorrow, 10:00 AM EST</option>
                    <option>Tomorrow, 2:30 PM EST</option>
                    <option>Thursday, 11:00 AM EST</option>
                    <option>Friday, 4:00 PM EST</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-label-mono text-[#0B0D12] block">Your Work Email</label>
                  <input 
                    type="email"
                    placeholder="you@company.com"
                    defaultValue={formData.email}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#0B0D12]/15 text-body text-[#0B0D12] outline-none focus:border-[#0B0D12] bg-white"
                  />
                </div>

                <button
                  onClick={() => setModalConfirmed(true)}
                  className="w-full py-3 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded-lg text-badge flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Calendar Reservation</span>
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 bg-[#0B0D12] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-[#FF4A1C]" />
                </div>
                <h4 className="text-h4 text-[#0B0D12]">Call Reserved!</h4>
                <p className="text-body text-[#5A5E6E]">
                  Calendar invite dispatched for <span className="font-semibold text-[#0B0D12]">{modalDate}</span>. We've sent a Google Meet link to your inbox.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setModalConfirmed(false);
                  }}
                  className="px-6 py-2 bg-[#0B0D12] text-white text-caption font-mono font-semibold rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
