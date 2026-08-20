import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Bot, 
  Zap, 
  ArrowRight, 
  ChevronDown, 
  Layers, 
  X, 
  Check, 
  ArrowUpRight,
  Headphones,
  Send,
  Workflow,
  Cpu,
  Share2,
  FileText,
  Clock,
  BarChart3,
  MessageCircle,
  PhoneCall,
  UserCheck
} from 'lucide-react';

import Testimonials from '@/components/home/Testimonials';
import StartProjectCta from '@/components/home/StartProjectCta';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// CHANNEL DATA
// ----------------------------------------------------
const CHANNELS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    badge: 'Official Meta Partner',
    icon: MessageCircle,
    color: 'from-emerald-500 to-teal-600',
    tagline: 'Direct WhatsApp Marketing & Support at Scale',
    desc: 'Broadcast promotional templates, send automated transactional order updates, and run AI customer support via official WhatsApp API.',
    metric: '98% Open Rate',
    metricLabel: 'Average WhatsApp Message Engagement',
    features: [
      'Official Green Tick Badge Verification',
      'In-App Meta Template Submission & Approval',
      'Interactive Quick-Reply & CTA Button Messages',
      '24-Hour Session Messaging Window Compliance'
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram DMs & Comments',
    badge: 'Meta Graph API',
    icon: Sparkles,
    color: 'from-pink-500 to-[#EC4899]',
    tagline: 'Turn Comments & Story Mentions into Direct Revenue',
    desc: 'Auto-reply to Instagram post comments and trigger immediate private DMs with discount codes or product links.',
    metric: '3.8x More DMs',
    metricLabel: 'Converted from Post Comments',
    features: [
      'Comment-to-DM Instant Automated Triggers',
      'Story Mention Recognition & Automated Thank-You',
      'Influencer Campaign Inbound Routing',
      'Product Catalog Link Integration in DMs'
    ]
  },
  {
    id: 'messenger',
    name: 'Facebook Messenger',
    badge: 'Meta Page Sync',
    icon: MessageSquare,
    color: 'from-blue-500 to-indigo-600',
    tagline: 'Instant Lead Qualification from Facebook Ads',
    desc: 'Capture inbound leads directly from Facebook Lead Ads or page messaging with zero response delay.',
    metric: '< 10 Sec',
    metricLabel: 'First Response Time',
    features: [
      'Facebook Lead Ads Instant Form Capture',
      'Shared Team Inbox across Multiple Pages',
      'Automated FAQ & Menu Cards',
      'Seamless Live Agent Handover'
    ]
  },
  {
    id: 'telegram',
    name: 'Telegram Bot API',
    badge: 'Unlimited Broadcasts',
    icon: Send,
    color: 'from-sky-400 to-blue-500',
    tagline: 'High-Volume Community & Channel Broadcasting',
    desc: 'Manage Telegram channels and groups with automated subscription bots, broadcasts, and file sharing.',
    metric: 'Unlimited',
    metricLabel: 'Broadcast Subscriber Capacity',
    features: [
      'High-Speed Broadcast Messages to Channels',
      'Automated Member Onboarding & Verification',
      'File, Media & Document Delivery Bots',
      'Command-Based Custom Bot Logic'
    ]
  }
];

// ----------------------------------------------------
// AUTOMATION BUILDER FEATURES
// ----------------------------------------------------
const AUTOMATION_NODES = [
  {
    icon: Workflow,
    title: 'Visual Flowchart Canvas',
    desc: 'Drag-and-drop node builder to map complex customer journeys without writing a single line of code.'
  },
  {
    icon: Zap,
    title: 'Conditional Branching',
    desc: 'Route conversations based on user keywords, past purchase history, or customer tag attributes.'
  },
  {
    icon: Share2,
    title: 'API Webhooks & Zapier',
    desc: 'Trigger external CRM actions (Shopify, HubSpot, Salesforce) directly from chat interaction nodes.'
  },
  {
    icon: Clock,
    title: 'Smart Delay & Drip Sequences',
    desc: 'Schedule follow-up messages after 1 hour, 24 hours, or 3 days to re-engage warm prospects.'
  }
];

// ----------------------------------------------------
// AI CHATBOT FEATURES
// ----------------------------------------------------
const AI_CAPABILITIES = [
  {
    icon: Bot,
    title: 'Autonomous Gemini 1.5 LLM Engine',
    desc: 'Trained on your company knowledge base, documentation, and product catalogs to answer complex queries.'
  },
  {
    icon: Headphones,
    title: 'Seamless Human Handover',
    desc: 'When AI detects high lead sentiment or complex issues, it seamlessly alerts and transfers to human agents.'
  },
  {
    icon: UserCheck,
    title: 'Automated Lead Qualification',
    desc: 'AI gathers customer name, email, budget, and requirements before scheduling a calendar call.'
  },
  {
    icon: PhoneCall,
    title: 'AI Voice & Chat Answering',
    desc: 'Intelligent fallback system handling both written chats and voice calls around the clock.'
  }
];

// ----------------------------------------------------
// PRICING TIERS
// ----------------------------------------------------
const PRICING_TIERS = [
  {
    name: 'Starter Inbox',
    price: '$149',
    period: '/ month',
    tagline: 'For growing brands looking to automate WhatsApp & Instagram.',
    badge: 'Single Brand',
    popular: false,
    features: [
      'Up to 5,000 Monthly Active Contacts',
      '2 Connected Channels (WhatsApp & Instagram)',
      'Shared Team Inbox for 3 Agent Seats',
      'No-Code Automation Builder',
      'Meta Template Submission Engine',
      'Standard Email & Chat Support'
    ],
    cta: 'Get Started Starter',
    gradient: 'border-slate-200'
  },
  {
    name: 'Growth Automation',
    price: '$399',
    period: '/ month',
    tagline: 'Comprehensive suite for scaling retail & e-commerce operations.',
    badge: 'Most Popular Choice',
    popular: true,
    features: [
      'Up to 25,000 Monthly Active Contacts',
      'All 4 Connected Channels Included',
      'Shared Team Inbox for 10 Agent Seats',
      'Autonomous Gemini AI Chatbot Integration',
      'Instagram Comment-to-DM Automation',
      'Shopify & CRM API Webhooks',
      '24/7 Priority WhatsApp Support'
    ],
    cta: 'Request Demo & Quote',
    gradient: 'border-[#EC4899] ring-2 ring-[#EC4899]/30 shadow-2xl'
  },
  {
    name: 'Enterprise Scale',
    price: 'Custom',
    period: '',
    tagline: 'Custom high-volume broadcasting & dedicated throughput.',
    badge: 'Enterprise Volume',
    popular: false,
    features: [
      'Unlimited Monthly Active Contacts',
      'Unlimited Agent Seats & Department Queues',
      'Dedicated WhatsApp API High-Throughput Node',
      'Custom LLM Fine-Tuning & Knowledge Base',
      'Dedicated Account Manager & 99.9% SLA',
      'Custom On-Premise / Isolated Cloud Deploy'
    ],
    cta: 'Contact Enterprise Sales',
    gradient: 'border-slate-200'
  }
];

// ----------------------------------------------------
// FAQS
// ----------------------------------------------------
const FAQS = [
  {
    question: 'How long does Meta WhatsApp Business API approval take?',
    answer: 'With OmniChat, official Meta WhatsApp Business API approval typically takes between 24 and 48 hours. We handle business verification assistance, phone number porting, and Meta display name guidelines directly.'
  },
  {
    question: 'How do we train the AI chatbot on our company data?',
    answer: 'Simply paste your website URL, upload PDF product manuals, or sync your Notion/Google Drive knowledge base. OmniChat automatically indexes your documents using vector embeddings and starts answering customer questions immediately.'
  },
  {
    question: 'Can human support agents intervene during an AI conversation?',
    answer: 'Yes! Human agents can monitor live AI conversations in the shared inbox and jump in at any time with a single click. The AI immediately pauses and hands over complete control to the agent.'
  },
  {
    question: 'How does Instagram Comment-to-DM automation work?',
    answer: 'When a user leaves a comment on your Instagram post containing trigger keywords (e.g., "PRICE", "DEMO", "INFO"), OmniChat instantly posts a public reply and sends a direct private message to that user with your link.'
  },
  {
    question: 'Can we migrate our existing WhatsApp Business number to OmniChat?',
    answer: 'Yes. You can migrate your existing phone number to the official WhatsApp Business Cloud API. Our onboarding specialists assist with OTP verification to ensure zero downtime during transfer.'
  }
];

export default function OmniChatProduct() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [activeChannel, setActiveChannel] = useState<string>('whatsapp');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.omni-hero-anim', {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt handlers
  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 22;
    const tiltY = (centerX - x) / 22;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeaveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const currentChannelObj = CHANNELS.find(c => c.id === activeChannel) || CHANNELS[0];

  return (
    <div ref={pageRef} className="w-full relative bg-[#F4F1EA] text-[#0B0D12] overflow-hidden">
      
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION                                      */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-[#FAF8F5] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10 space-y-12 text-center">
          
          <div className="omni-hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#0B0D12]/15 bg-white text-[#0B0D12] text-badge">
            <MessageSquare className="w-4 h-4 text-[#FF4A1C]" />
            <span>OmniChat · Multichannel AI Platform</span>
          </div>

          <h1 className="omni-hero-anim text-h1 text-[#0B0D12] max-w-5xl mx-auto">
            Multichannel Messaging & Automation, Powered by <br />
            <span className="text-[#FF4A1C]">
              the WhatsApp Business API.
            </span>
          </h1>

          <p className="omni-hero-anim text-body-lg text-[#0B0D12]/70 max-w-3xl mx-auto">
            Unify WhatsApp, Instagram DMs, Messenger, and Telegram into one shared inbox equipped with visual no-code flowcharts and autonomous Gemini AI conversational agents.
          </p>

          {/* Action CTAs */}
          <div className="omni-hero-anim pt-2 flex flex-wrap justify-center gap-4 items-center">
            <Link
              to="/contact"
              className="px-8 py-4 rounded bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-badge shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Book OmniChat Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#channels-breakdown"
              className="px-7 py-4 rounded bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-badge transition-all shadow-sm"
            >
              Explore 4 Channels
            </a>
          </div>

          {/* Highlights Ribbon */}
          <div className="omni-hero-anim grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            <div className="p-4 rounded-lg bg-white border border-[#0B0D12]/10 shadow-sm text-center">
              <span className="block text-h3 text-[#FF4A1C]">4</span>
              <span className="text-caption font-mono text-[#0B0D12]/60">Connected Channels</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#0B0D12]/10 shadow-sm text-center">
              <span className="block text-h3 text-[#0B0D12]">60%</span>
              <span className="text-caption font-mono text-[#0B0D12]/60">Faster Support</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#0B0D12]/10 shadow-sm text-center">
              <span className="block text-h3 text-[#0B0D12]">1.2M+</span>
              <span className="text-caption font-mono text-[#0B0D12]/60">Monthly Messages</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#0B0D12]/10 shadow-sm text-center">
              <span className="block text-h3 text-[#0B0D12]">24/7</span>
              <span className="text-caption font-mono text-[#0B0D12]/60">AI Response SLA</span>
            </div>
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 2. CHANNEL BREAKDOWN SECTION                         */}
      {/* ---------------------------------------------------- */}
      <section id="channels-breakdown" className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge">
              Multi-Channel Connectivity
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              One Inbox. All Customer Touchpoints.
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              Switch between channels below to view native messaging capabilities.
            </p>
          </div>

          {/* CHANNEL TABS SELECTOR */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {CHANNELS.map((ch) => {
              const IconComp = ch.icon;
              const isActive = activeChannel === ch.id;

              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`px-5 py-3 rounded text-badge transition-all duration-200 flex items-center gap-2.5 cursor-pointer border ${
                    isActive
                      ? 'bg-[#0B0D12] text-white border-[#0B0D12] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#0B0D12]/70 border-[#0B0D12]/15 hover:border-[#0B0D12] hover:text-[#0B0D12]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#FF4A1C]' : 'text-[#0B0D12]/60'}`} />
                  <span>{ch.name}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CHANNEL DISPLAY CARD WITH 3D TILT */}
          <div>
            <div 
              onMouseMove={handleMouseMoveTilt}
              onMouseLeave={handleMouseLeaveTilt}
              style={{ transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
              className="bg-[#FAF8F5] border border-[#0B0D12]/15 rounded-lg p-8 sm:p-10 shadow-md relative overflow-hidden space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#0B0D12]/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-white border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center">
                    <currentChannelObj.icon className="w-7 h-7 text-[#FF4A1C]" />
                  </div>
                  <div>
                    <span className="text-label-mono text-[#FF4A1C] block">
                      {currentChannelObj.badge}
                    </span>
                    <h3 className="text-h3 text-[#0B0D12]">
                      {currentChannelObj.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded bg-white border border-[#0B0D12]/10 text-right">
                  <span className="block text-h3 text-[#0B0D12]">{currentChannelObj.metric}</span>
                  <span className="text-caption font-mono text-[#0B0D12]/60">{currentChannelObj.metricLabel}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-h4 text-[#0B0D12]">
                  {currentChannelObj.tagline}
                </h4>
                <p className="text-body text-[#0B0D12]/70 max-w-3xl">
                  {currentChannelObj.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {currentChannelObj.features.map((feat, fIdx) => (
                  <div key={fIdx} className="p-5 rounded bg-white border border-[#0B0D12]/10 space-y-1.5 flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[#FF4A1C]/10 text-[#FF4A1C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-h4 text-[#0B0D12]">{feat}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 3. AUTOMATION BUILDER SHOWCASE                       */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-[#FAF8F5] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-white text-[#0B0D12] text-badge">
              No-Code Engine
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              Visual Automation Flowchart Builder
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              Map complex user journeys, conditional decision trees, and CRM webhooks on a drag-and-drop visual canvas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTOMATION_NODES.map((node, idx) => {
              const IconComp = node.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-lg bg-white border border-[#0B0D12]/10 space-y-3 shadow-sm hover:border-[#0B0D12] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded bg-[#FAF8F5] border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center group-hover:bg-[#FF4A1C] group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-h4 text-[#0B0D12] group-hover:text-[#FF4A1C] transition-colors">
                    {node.title}
                  </h3>
                  <p className="text-body text-[#0B0D12]/70">
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 4. AI CHATBOT SECTION                                */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge">
              Autonomous Intelligence
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              AI Conversational Intelligence
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              Powered by Gemini 1.5 LLM vector embeddings to resolve up to 80% of routine customer support inquiries automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AI_CAPABILITIES.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-lg bg-[#FAF8F5] border border-[#0B0D12]/10 space-y-3 hover:border-[#0B0D12] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded bg-white border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center group-hover:bg-[#FF4A1C] group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-h4 text-[#0B0D12] group-hover:text-[#FF4A1C] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-body text-[#0B0D12]/70">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 5. PRICING & PLANS                                  */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-[#FAF8F5] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-white text-[#0B0D12] text-badge">
              Subscription Plans
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              Simple, Predictable Pricing
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              Choose the plan that matches your monthly active contact volume.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-lg p-8 border ${
                  tier.popular ? 'border-[#0B0D12] shadow-lg ring-1 ring-[#0B0D12]' : 'border-[#0B0D12]/15 shadow-sm'
                } flex flex-col justify-between space-y-8 relative overflow-hidden`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-[#FF4A1C] text-white text-caption font-mono font-bold uppercase px-3 py-1 rounded-bl shadow-sm">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-label-mono text-[#0B0D12]/50 block">
                      {tier.badge}
                    </span>
                    <h3 className="text-h3 text-[#0B0D12]">
                      {tier.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-h2 text-[#0B0D12]">{tier.price}</span>
                    <span className="text-caption font-mono text-[#0B0D12]/60">{tier.period}</span>
                  </div>

                  <p className="text-body text-[#0B0D12]/70">
                    {tier.tagline}
                  </p>

                  <div className="pt-4 border-t border-[#0B0D12]/10 space-y-3">
                    <span className="text-label-mono text-[#0B0D12] block">Included Features:</span>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-body text-[#0B0D12]/80">
                        <Check className="w-3.5 h-3.5 text-[#FF4A1C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3.5 rounded text-badge text-center transition-all cursor-pointer ${
                    tier.popular
                      ? 'bg-[#FF4A1C] hover:bg-[#E03E14] text-white shadow-md'
                      : 'bg-[#FAF8F5] text-[#0B0D12] border border-[#0B0D12]/15 hover:border-[#0B0D12]'
                  }`}
                >
                  {tier.cta}
                </Link>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 6. ACCORDION FAQ SECTION                              */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-20 px-6 md:px-12 bg-white border-b border-[#0B0D12]/10 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge">
              Got Questions?
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`bg-[#FAF8F5] border rounded overflow-hidden transition-all ${
                    isOpen ? 'border-[#0B0D12]' : 'border-[#0B0D12]/15 hover:border-[#0B0D12]/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="text-h4 text-[#0B0D12]">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#0B0D12]/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF4A1C]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-body text-[#0B0D12]/75 border-t border-[#0B0D12]/10 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 7. TESTIMONIALS (REUSED FROM HOME PAGE)             */}
      {/* ---------------------------------------------------- */}
      <Testimonials />


      {/* ---------------------------------------------------- */}
      {/* 8. CONTACT US (REUSED FROM HOME PAGE)                */}
      {/* ---------------------------------------------------- */}
      <StartProjectCta />

    </div>
  );
}
