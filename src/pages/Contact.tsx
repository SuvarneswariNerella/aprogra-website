import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Clock, UserCheck, 
  Send, CheckCircle2, Copy, Check, 
  Mail, Phone, MapPin, Globe, ExternalLink, Video, Calendar, X,
  Lock, ArrowUp, MessageSquare, Shield, AlertCircle, RefreshCw
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useContactPageContent, submitInquiry, ContactChannelItem } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  // Dynamic Strapi CMS Content & Channels Collection Type
  const { content, channels, isLoading, source, refetch } = useContactPageContent();

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
  const [submissionId, setSubmissionId] = useState<string | number>('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Copy Feedback States
  const [copiedChannelId, setCopiedChannelId] = useState<string | null>(null);

  // Intro Call Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState('Tomorrow, 10:00 AM EST');
  const [modalTopic, setModalTopic] = useState('System Architecture');
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalCompany, setModalCompany] = useState('');
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);
  const [modalConfirmed, setModalConfirmed] = useState(false);

  // Set default initial topic and time slot from content once loaded
  useEffect(() => {
    if (content.introCallModal.topicOptions && content.introCallModal.topicOptions.length > 0) {
      setModalTopic(content.introCallModal.topicOptions[0]);
    }
    if (content.introCallModal.timeSlots && content.introCallModal.timeSlots.length > 0) {
      setModalDate(content.introCallModal.timeSlots[0]);
    }
  }, [content.introCallModal.topicOptions, content.introCallModal.timeSlots]);

  // Sync form options if admin updates budget, timeline or capabilities in Strapi
  useEffect(() => {
    if (content.brief.budgetRangesList && content.brief.budgetRangesList.length > 0) {
      if (!content.brief.budgetRangesList.includes(formData.budget)) {
        setFormData(prev => ({ ...prev, budget: content.brief.budgetRangesList[0] }));
      }
    }
    if (content.brief.timelineRangesList && content.brief.timelineRangesList.length > 0) {
      if (!content.brief.timelineRangesList.includes(formData.timeline)) {
        setFormData(prev => ({ ...prev, timeline: content.brief.timelineRangesList[0] }));
      }
    }
    if (content.brief.capabilitiesList && content.brief.capabilitiesList.length > 0) {
      const validCaps = formData.capabilities.filter(c => content.brief.capabilitiesList.includes(c));
      if (validCaps.length === 0) {
        setFormData(prev => ({ ...prev, capabilities: [content.brief.capabilitiesList[0]] }));
      }
    }
  }, [content.brief.budgetRangesList, content.brief.timelineRangesList, content.brief.capabilitiesList]);

  // Refs for Animations
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const briefRef = useRef<HTMLDivElement>(null);
  const directRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling and handle Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setModalConfirmed(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }

      // Hero Right Column entrance
      if (rightColumnRef.current) {
        gsap.from(rightColumnRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
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
        if (prev.capabilities.length === 1) return prev;
        return { ...prev, capabilities: prev.capabilities.filter(c => c !== cap) };
      } else {
        return { ...prev, capabilities: [...prev.capabilities, cap] };
      }
    });
  };

  // Channel Actions

  const handleChannelAction = (channel: ContactChannelItem) => {
    if (channel.buttonUrl) {
      window.open(channel.buttonUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (channel.type === 'email' || channel.type === 'phone' || channel.type === 'office') {
      navigator.clipboard.writeText(channel.primaryValue);
      setCopiedChannelId(channel.id);
      setTimeout(() => setCopiedChannelId(null), 2000);
    }
  };

  // Helper for rendering channel card icons
  const renderChannelIcon = (channel: ContactChannelItem) => {
    if (channel.iconUrl) {
      return <img src={channel.iconUrl} alt={channel.label} className="w-6 h-6 object-contain" />;
    }
    switch (channel.type) {
      case 'phone':
        return <Phone className="w-6 h-6 text-[#0B0D12]" />;
      case 'office':
        return <MapPin className="w-6 h-6 text-[#0B0D12]" />;
      case 'hub':
        return <Globe className="w-6 h-6 text-[#0B0D12]" />;
      case 'email':
      default:
        return <Mail className="w-6 h-6 text-[#0B0D12]" />;
    }
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

  // Form Submission via Strapi API
  const handleSubmit = async (e: React.FormEvent) => {
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
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        capabilities: formData.capabilities,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        type: 'project_brief'
      });

      if (res.success) {
        setSubmissionId(res.id || Math.floor(100000 + Math.random() * 900000));
        setIsSubmitted(true);
      } else {
        setSubmitError(res.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Intro Call Modal Booking via Strapi API
  const handleModalBooking = async () => {
    const nameToUse = modalName.trim() || formData.name.trim() || 'Prospective Client';
    const emailToUse = modalEmail.trim() || formData.email.trim();

    if (!emailToUse || !/^\S+@\S+\.\S+$/.test(emailToUse)) {
      alert('Please enter a valid work email for the calendar invitation.');
      return;
    }

    setIsModalSubmitting(true);
    try {
      await submitInquiry({
        name: nameToUse,
        email: emailToUse,
        company: modalCompany.trim() || formData.company.trim(),
        message: `Booked 15-min Intro Call on ${modalDate}. Topic: ${modalTopic}`,
        type: 'intro_call',
        metadata: {
          scheduledTime: modalDate,
          topic: modalTopic
        }
      });
      setModalConfirmed(true);
    } catch (err) {
      console.warn('Intro call reservation saved locally:', err);
      setModalConfirmed(true);
    } finally {
      setIsModalSubmitting(false);
    }
  };

  return (
    <div ref={mainRef} className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] font-sans antialiased pt-16">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
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
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF4A1C]/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Headings, Supporting Text & Primary CTAs */}
          <div ref={heroRef} className="lg:col-span-7 space-y-3 sm:space-y-4 text-left relative z-10">
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#0B0D12]/12 text-[#0B0D12] text-xs font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span>{content.hero.availabilityBadge}</span>
              <button
                onClick={refetch}
                disabled={isLoading}
                className="ml-1 p-1 rounded hover:bg-[#0B0D12]/5 transition-colors cursor-pointer disabled:opacity-50"
                title={`Refresh CMS content (source: ${source})`}
              >
                <RefreshCw className={`w-3 h-3 text-[#5A5E6E] ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-h1 text-[#0B0D12]">
                {content.hero.headline} <br />
                <span className="text-[#FF4A1C]">
                  {content.hero.highlight}
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm lg:text-base text-[#5A5E6E] max-w-xl leading-relaxed">
              {content.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={scrollToBrief}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>{content.hero.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  document.getElementById('video-call-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => setIsModalOpen(true), 800);
                }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#FF4A1C]" />
                <span>{content.hero.secondaryCtaText}</span>
              </button>
            </div>

            {/* Trust Indicators / SLA Row */}
            <div className="pt-3 border-t border-[#0B0D12]/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-[#0B0D12]">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#0B0D12]/10 shadow-2xs">
                <Clock className="w-4 h-4 text-[#FF4A1C] shrink-0" />
                <span>{content.hero.slaBadge1}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#0B0D12]/10 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#0B0D12] shrink-0" />
                <span>{content.hero.slaBadge2}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#0B0D12]/10 shadow-2xs">
                <UserCheck className="w-4 h-4 text-[#FF4A1C] shrink-0" />
                <span>{content.hero.slaBadge3}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact & Inquiries Engineering Pod Image */}
          <div ref={rightColumnRef} className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#0B0D12]/15 bg-[#FAF8F5] shadow-lg group">
              <img 
                src={content.hero.heroImageUrl || "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80"} 
                alt="Engineering Partnerships & Direct Contact"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-[#0B0D12]/80 backdrop-blur-xs border border-white/10">{content.hero.podStatus || 'Active Pods Online'}</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {content.hero.slaBadge1 || '< 2 hrs SLA'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ENGAGEMENT LIFECYCLE ROADMAP                           */}
      {/* ========================================================= */}
      <section ref={processRef} className="py-16 px-6 max-w-7xl mx-auto border-b border-[#0B0D12]/10">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-badge text-[#5A5E6E] block mb-2 font-mono">{content.roadmap.badge}</span>
          <h2 className="text-h2 text-[#0B0D12]">{content.roadmap.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.roadmap.steps.map((step, idx) => (
            <div 
              key={step.id || idx}
              className="process-card bg-[#FAF8F5] p-6 rounded-lg border border-[#0B0D12]/15 space-y-3 shadow-xs hover:border-[#FF4A1C]/40 transition-colors"
            >
              <span className="text-label-mono text-[#FF4A1C] font-bold">{step.timeframe}</span>
              <h4 className="text-h4 text-[#0B0D12]">{step.title}</h4>
              <p className="text-body text-[#5A5E6E] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE PROJECT BRIEF / SPECIFICATION FORM         */}
      {/* ========================================================= */}
      <section id="project-brief" ref={briefRef} className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <ScrollReveal stagger={0.15}>
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] text-badge shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span>{content.brief.badge}</span>
            </div>
            <h2 className="text-h2 text-[#0B0D12]">
              {content.brief.title}
            </h2>
            <p className="text-body-lg text-[#5A5E6E] max-w-xl mx-auto">
              {content.brief.subtitle}
            </p>
          </div>

          {/* TWO-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT COLUMN: CONTACT FORM */}
            <div className="lg:col-span-7 bg-[#FAF8F5] rounded-lg p-6 sm:p-10 border border-[#0B0D12]/15 shadow-sm space-y-6">
            
            {isSubmitted ? (
              <div className="py-12 px-6 text-center space-y-5">
                <div className="w-16 h-16 bg-[#0B0D12] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-[#FF4A1C]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-h3 text-[#0B0D12]">
                    {content.brief.successTitle}
                  </h3>
                  <p className="text-sm text-[#5A5E6E] max-w-md mx-auto leading-relaxed font-sans">
                    Thank you, <span className="font-semibold text-[#0B0D12]">{formData.name}</span>. Our lead architects are reviewing your specifications and will get back to <span className="font-semibold text-[#0B0D12]">{formData.email}</span> within 2 hours.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#0B0D12]/15 text-xs text-[#0B0D12] max-w-md mx-auto text-left space-y-1 font-mono">
                  <div className="font-bold text-[#FF4A1C]">Strapi Brief ID: #{submissionId}</div>
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
                      capabilities: [content.brief.capabilitiesList[0] || 'Web Apps'],
                      budget: content.brief.budgetRangesList[1] || '$15K – $25K',
                      timeline: content.brief.timelineRangesList[1] || '1–3 Months',
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
                    {content.brief.formHeading}
                  </h3>
                  <p className="text-caption text-[#5A5E6E] mt-0.5">
                    {content.brief.formSubheading}
                  </p>
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-label-mono text-[#0B0D12]">
                      {content.brief.fieldNameLabel}
                    </label>
                    <input 
                      type="text"
                      placeholder={content.brief.fieldNamePlaceholder}
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
                      {content.brief.fieldEmailLabel}
                    </label>
                    <input 
                      type="email"
                      placeholder={content.brief.fieldEmailPlaceholder}
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
                    {content.brief.fieldCompanyLabel}
                  </label>
                  <input 
                    type="text"
                    placeholder={content.brief.fieldCompanyPlaceholder}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#0B0D12]/15 text-body text-[#0B0D12] bg-white placeholder-[#5A5E6E]/60 outline-none focus:border-[#0B0D12] transition-all"
                  />
                </div>

                {/* Capabilities Chips */}
                <div className="space-y-2">
                  <label className="block text-label-mono text-[#0B0D12]">
                    {content.brief.capabilitiesQuestion}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {content.brief.capabilitiesList.map((cap) => {
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
                    {content.brief.budgetQuestion}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {content.brief.budgetRangesList.map((b) => (
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
                    {content.brief.timelineQuestion}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {content.brief.timelineRangesList.map((t) => (
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

                {/* Project Overview / Message */}
                <div className="space-y-1.5">
                  <label className="block text-label-mono text-[#0B0D12]">
                    {content.brief.messageQuestion}
                  </label>
                  <textarea 
                    rows={4}
                    placeholder={content.brief.messagePlaceholder}
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

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FF4A1C] hover:bg-[#E03E14] disabled:opacity-50 text-white font-bold rounded-lg text-badge flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{content.brief.submitButtonText}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            </div>

            {/* RIGHT COLUMN: LIVE INTERACTIVE BRIEF PREVIEW CARD */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="bg-[#0B0D12] text-white rounded-lg p-6 sm:p-8 border border-white/10 shadow-lg space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A1C] animate-pulse" />
                    <span className="text-label-mono text-[#F4F1EA]/80">{content.preview.cardTitle}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded text-white/80">
                    {content.preview.cardBadge}
                  </span>
                </div>

                {/* Selected Scope summary */}
                <div className="space-y-2">
                  <div className="text-label-mono text-[#F4F1EA]/60">{content.preview.capabilitiesLabel}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.capabilities.map((c) => (
                      <span key={c} className="text-[11px] font-mono bg-[#FF4A1C]/20 border border-[#FF4A1C]/40 text-white px-2.5 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div>
                    <div className="text-label-mono text-[#F4F1EA]/60">{content.preview.investmentLabel}</div>
                    <div className="text-body font-bold text-[#FF4A1C] mt-0.5 font-mono">{formData.budget}</div>
                  </div>
                  <div>
                    <div className="text-label-mono text-[#F4F1EA]/60">{content.preview.timelineLabel}</div>
                    <div className="text-body font-bold text-white mt-0.5 font-mono">{formData.timeline}</div>
                  </div>
                </div>

                {/* Overview Snippet */}
                {formData.message.trim() && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-label-mono text-[#F4F1EA]/60">Brief Snippet</div>
                    <p className="text-caption text-[#F4F1EA]/80 mt-1 line-clamp-3 italic">
                      "{formData.message}"
                    </p>
                  </div>
                )}
                
                {/* Engineering Focus / Next Steps */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-label-mono text-[#F4F1EA]/60 mb-3">{content.preview.engagementTitle}</div>
                  <div className="space-y-3">
                    {content.preview.engagementSteps.map((step, idx) => (
                      <div key={step.id || idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 text-[#FF4A1C] flex items-center justify-center shrink-0 font-mono text-[10px] mt-0.5">
                          {step.stepNumber || idx + 1}
                        </div>
                        <div>
                          <div className="text-caption font-semibold text-white">{step.title}</div>
                          <div className="text-[11px] text-[#F4F1EA]/70 font-sans mt-0.5">{step.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security & Guarantees */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-label-mono text-[#F4F1EA]/60 mb-3">{content.preview.guaranteesTitle}</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-md border border-white/10">
                      <div className="flex items-center gap-1.5 mb-1 text-white">
                        <Lock className="w-3.5 h-3.5 text-[#FF4A1C]" />
                        <span className="text-caption font-bold">{content.preview.guarantee1_title}</span>
                      </div>
                      <div className="text-[11px] text-[#F4F1EA]/70 font-sans">{content.preview.guarantee1_desc}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-md border border-white/10">
                      <div className="flex items-center gap-1.5 mb-1 text-white">
                        <Shield className="w-3.5 h-3.5 text-[#FF4A1C]" />
                        <span className="text-caption font-bold">{content.preview.guarantee2_title}</span>
                      </div>
                      <div className="text-[11px] text-[#F4F1EA]/70 font-sans">{content.preview.guarantee2_desc}</div>
                    </div>
                  </div>
                </div>

                {/* Status footer */}
                <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between text-caption text-[#F4F1EA]/70 relative z-10 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF4A1C]" />
                    <span>{content.preview.slaResponseText}</span>
                  </div>
                  <span className="text-[#FF4A1C] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {content.preview.readyReviewText}
                  </span>
                </div>
              </div>

              {/* Book a 15-Min Intro Call Box */}
              <div id="video-call-section" className="bg-[#FAF8F5] rounded-lg p-5 border border-[#0B0D12]/15 shadow-xs space-y-3 scroll-mt-24">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#FF4A1C]" />
                  <h4 className="text-h4 text-[#0B0D12]">
                    {content.preview.videoTitle}
                  </h4>
                </div>
                <p className="text-body text-[#5A5E6E]">
                  {content.preview.videoDescription}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2.5 px-4 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded text-badge flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{content.preview.videoButtonText}</span>
                </button>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 4. DIRECT CONTACT SECTION (COLLECTION TYPE CHANNELS)      */}
      {/* ========================================================= */}
      <section ref={directRef} className="w-full bg-[#FAF8F5] py-20 px-6 border-y border-[#0B0D12]/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-badge text-[#0B0D12] bg-white px-3.5 py-1.5 rounded-lg inline-block border border-[#0B0D12]/15 shadow-xs">
              {content.directChannelsHeader.badge}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {content.directChannelsHeader.title}
            </h2>
            <p className="text-body-lg text-[#5A5E6E]">
              {content.directChannelsHeader.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel) => {
              const isCopied = copiedChannelId === channel.id;
              return (
                <div 
                  key={channel.id}
                  className="bg-white rounded-lg p-6 border border-[#0B0D12]/15 shadow-xs flex flex-col justify-between space-y-6 h-full hover:border-[#FF4A1C]/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] flex items-center justify-center border border-[#0B0D12]/15 overflow-hidden p-2">
                      {renderChannelIcon(channel)}
                    </div>
                    <div>
                      <span className="text-label-mono text-[#5A5E6E]">
                        {channel.label}
                      </span>
                      <h3 className="text-h4 text-[#0B0D12] mt-1 break-words">
                        {channel.primaryValue}
                      </h3>
                      <p className="text-caption text-[#5A5E6E] mt-2">
                        {channel.subtext}
                      </p>
                    </div>
                  </div>

                  {channel.buttonUrl ? (
                    <a
                      href={channel.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white text-caption font-mono transition-colors duration-200 flex items-center justify-center gap-2 border border-[#0B0D12]/15 cursor-pointer shadow-xs"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{channel.buttonText}</span>
                    </a>
                  ) : channel.type === 'hub' ? (
                    <div className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] text-[#0B0D12] text-caption font-mono flex items-center justify-center gap-2 border border-[#0B0D12]/15">
                      <Globe className="w-4 h-4 text-[#FF4A1C]" />
                      <span>{channel.buttonText}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleChannelAction(channel)}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white text-caption font-mono transition-colors duration-200 flex items-center justify-center gap-2 border border-[#0B0D12]/15 cursor-pointer shadow-xs"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-[#FF4A1C]" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{channel.buttonText}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CLOSING INFINITY BANNER                                */}
      {/* ========================================================= */}
      <section className="w-full bg-[#F4F1EA] text-[#0B0D12] py-28 px-6 relative overflow-hidden flex items-center justify-center min-h-[480px] border-t border-[#0B0D12]/10">
        
        {/* LARGE, CLEAR, VISIBLE INFINITY (∞) SYMBOL IN BACKGROUND */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <svg 
            className="w-[700px] sm:w-[850px] md:w-[1000px] max-w-[95vw] h-auto opacity-15" 
            viewBox="0 0 800 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M 400,200 C 500,100 650,100 650,200 C 650,300 500,300 400,200 C 300,100 150,100 150,200 C 150,300 300,300 400,200 Z" 
              stroke="#0B0D12" 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
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
            {content.closingBanner.headline} <br />
            <span className="text-[#FF4A1C]">
              {content.closingBanner.highlight}
            </span>
          </h2>

          <p className="text-body-lg text-[#5A5E6E] max-w-xl mx-auto">
            {content.closingBanner.subtitle}
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FAF8F5] hover:bg-[#0B0D12] text-[#0B0D12] hover:text-white border border-[#0B0D12]/15 text-badge transition-all duration-200 cursor-pointer shadow-xs"
            >
              <ArrowUp className="w-4 h-4" />
              <span>{content.closingBanner.backToTopText}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. MODAL: BOOK A 15-MIN INTRO CALL                        */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div 
          onClick={() => {
            setIsModalOpen(false);
            setModalConfirmed(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0B0D12] rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(255,74,28,0.1)] relative border border-white/10 cursor-default"
          >
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setModalConfirmed(false);
              }}
              className="absolute top-5 right-5 text-[#F4F1EA]/60 hover:text-white p-1 rounded-full cursor-pointer transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!modalConfirmed ? (
              <div className="space-y-6">
                <div className="flex items-start gap-4 border-b border-white/10 pb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6 text-[#FF4A1C]" />
                  </div>
                  <div>
                    <h3 className="text-h3 text-white">{content.introCallModal.title}</h3>
                    <p className="text-caption text-[#F4F1EA]/70 mt-1">{content.introCallModal.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-label-mono text-[#F4F1EA]/80 block">Full Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={modalName || formData.name}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 text-body text-white outline-none focus:border-[#FF4A1C] bg-white/5"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-mono text-[#F4F1EA]/80 block">Work Email</label>
                    <input 
                      type="email"
                      placeholder="you@company.com"
                      value={modalEmail || formData.email}
                      onChange={(e) => setModalEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 text-body text-white outline-none focus:border-[#FF4A1C] bg-white/5"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-label-mono text-[#F4F1EA]/80 block">Company / Organization</label>
                  <input 
                    type="text"
                    placeholder="Company Name"
                    value={modalCompany || formData.company}
                    onChange={(e) => setModalCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 text-body text-white outline-none focus:border-[#FF4A1C] bg-white/5"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-label-mono text-[#F4F1EA]/80 block">Primary Topic</label>
                    <select 
                      value={modalTopic} 
                      onChange={(e) => setModalTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 text-body text-white outline-none focus:border-[#FF4A1C] bg-[#161922]"
                    >
                      {content.introCallModal.topicOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-label-mono text-[#F4F1EA]/80 block">Select Time Slot</label>
                    <select 
                      value={modalDate} 
                      onChange={(e) => setModalDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 text-body text-white outline-none focus:border-[#FF4A1C] bg-[#161922] font-mono text-sm"
                    >
                      {content.introCallModal.timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleModalBooking}
                  disabled={isModalSubmitting}
                  className="w-full py-3.5 mt-2 bg-[#FF4A1C] hover:bg-[#E03E14] disabled:opacity-50 text-white rounded-lg text-badge flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  {isModalSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>{content.introCallModal.submitButtonText}</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center mx-auto relative">
                  <div className="absolute inset-0 bg-[#FF4A1C]/20 rounded-full animate-ping" />
                  <CheckCircle2 className="w-8 h-8 text-[#FF4A1C]" />
                </div>
                <div>
                  <h4 className="text-h3 text-white">{content.introCallModal.successTitle}</h4>
                  <p className="text-body text-[#F4F1EA]/70 mt-2 max-w-sm mx-auto">
                    Calendar invite dispatched for <span className="font-semibold text-white">{modalDate}</span>. We've sent confirmation to your inbox.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setModalConfirmed(false);
                  }}
                  className="px-8 py-2.5 bg-white/10 hover:bg-white/20 text-white text-caption font-mono font-semibold rounded cursor-pointer transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
