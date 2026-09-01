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
import { useOmniChatPage, OmniChatChannelItem, OmniChatFeatureCardItem } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, any> = {
  MessageCircle,
  Sparkles,
  MessageSquare,
  Send,
  Workflow,
  Zap,
  Share2,
  Clock,
  Bot,
  Headphones,
  UserCheck,
  PhoneCall,
  ShieldCheck,
  Cpu,
  BarChart3,
  Layers,
  FileText
};

const resolveIcon = (iconNameOrComponent: any, fallback: any = MessageSquare) => {
  if (!iconNameOrComponent) return fallback;
  if (typeof iconNameOrComponent === 'string') {
    return ICON_MAP[iconNameOrComponent] || fallback;
  }
  return iconNameOrComponent;
};

// ----------------------------------------------------
// CHANNEL DATA
// ----------------------------------------------------
const CHANNELS: OmniChatChannelItem[] = [
  {
    channelId: 'whatsapp',
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    badge: 'Official Meta Partner',
    icon: 'MessageCircle',
    tagline: 'Direct WhatsApp Marketing & Support at Scale',
    description: 'Broadcast promotional templates, send automated transactional order updates, and run AI customer support via official WhatsApp API.',
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
    channelId: 'instagram',
    id: 'instagram',
    name: 'Instagram DMs & Comments',
    badge: 'Meta Graph API',
    icon: 'Sparkles',
    tagline: 'Turn Comments & Story Mentions into Direct Revenue',
    description: 'Auto-reply to Instagram post comments and trigger immediate private DMs with discount codes or product links.',
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
    channelId: 'messenger',
    id: 'messenger',
    name: 'Facebook Messenger',
    badge: 'Meta Page Sync',
    icon: 'MessageSquare',
    tagline: 'Instant Lead Qualification from Facebook Ads',
    description: 'Capture inbound leads directly from Facebook Lead Ads or page messaging with zero response delay.',
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
    channelId: 'telegram',
    id: 'telegram',
    name: 'Telegram Bot API',
    badge: 'Unlimited Broadcasts',
    icon: 'Send',
    tagline: 'High-Volume Community & Channel Broadcasting',
    description: 'Manage Telegram channels and groups with automated subscription bots, broadcasts, and file sharing.',
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
const AUTOMATION_NODES: OmniChatFeatureCardItem[] = [
  {
    icon: 'Workflow',
    title: 'Visual Flowchart Canvas',
    description: 'Drag-and-drop node builder to map complex customer journeys without writing a single line of code.'
  },
  {
    icon: 'Zap',
    title: 'Conditional Branching',
    description: 'Route conversations based on user keywords, past purchase history, or customer tag attributes.'
  },
  {
    icon: 'Share2',
    title: 'API Webhooks & Zapier',
    description: 'Trigger external CRM actions (Shopify, HubSpot, Salesforce) directly from chat interaction nodes.'
  },
  {
    icon: 'Clock',
    title: 'Smart Delay & Drip Sequences',
    description: 'Schedule follow-up messages after 1 hour, 24 hours, or 3 days to re-engage warm prospects.'
  }
];

// ----------------------------------------------------
// AI CHATBOT FEATURES
// ----------------------------------------------------
const AI_CAPABILITIES: OmniChatFeatureCardItem[] = [
  {
    icon: 'Bot',
    title: 'Autonomous Gemini 1.5 LLM Engine',
    description: 'Trained on your company knowledge base, documentation, and product catalogs to answer complex queries.'
  },
  {
    icon: 'Headphones',
    title: 'Seamless Human Handover',
    description: 'When AI detects high lead sentiment or complex issues, it seamlessly alerts and transfers to human agents.'
  },
  {
    icon: 'UserCheck',
    title: 'Automated Lead Qualification',
    description: 'AI gathers customer name, email, budget, and requirements before scheduling a calendar call.'
  },
  {
    icon: 'PhoneCall',
    title: 'AI Voice & Chat Answering',
    description: 'Intelligent fallback system handling both written chats and voice calls around the clock.'
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

  const { config } = useOmniChatPage();

  const displayChannels = (config.channels && config.channels.length > 0) ? config.channels : CHANNELS;
  const displayAutomation = (config.automationNodes && config.automationNodes.length > 0) ? config.automationNodes : AUTOMATION_NODES;
  const displayAi = (config.aiCapabilities && config.aiCapabilities.length > 0) ? config.aiCapabilities : AI_CAPABILITIES;
  const displayPricing = (config.pricingTiers && config.pricingTiers.length > 0) ? config.pricingTiers : PRICING_TIERS;
  const displayFaqs = (config.faqs && config.faqs.length > 0) ? config.faqs : FAQS;
  const displayMetrics = (config.heroMetrics && config.heroMetrics.length > 0) ? config.heroMetrics : [
    { value: '4', label: 'Connected Channels', isPrimary: true },
    { value: '60%', label: 'Faster Support', isPrimary: false },
    { value: '1.2M+', label: 'Monthly Messages', isPrimary: false },
    { value: '24/7', label: 'AI Response SLA', isPrimary: false }
  ];

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

  const currentChannelObj = displayChannels.find(c => (c.channelId || (c as any).id) === activeChannel) || displayChannels[0];
  const CurrentChannelIcon = resolveIcon(currentChannelObj.icon, MessageCircle);

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
            <span>{config.heroBadge}</span>
          </div>

          <h1 className="omni-hero-anim text-h1 text-[#0B0D12] max-w-5xl mx-auto">
            {(config.heroTitle || '').replace(config.heroHighlight || '', '')}
            {config.heroHighlight && (
              <span className="text-[#FF4A1C]">
                {config.heroHighlight}
              </span>
            )}
          </h1>

          <p className="omni-hero-anim text-body-lg text-[#0B0D12]/70 max-w-3xl mx-auto">
            {config.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="omni-hero-anim pt-2 flex flex-wrap justify-center gap-4 items-center">
            <Link
              to={config.primaryButtonLink || '/contact'}
              className="px-8 py-4 rounded bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-badge shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{config.primaryButtonText || 'Book OmniChat Demo'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={config.secondaryButtonLink || '#channels-breakdown'}
              className="px-7 py-4 rounded bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-badge transition-all shadow-sm"
            >
              {config.secondaryButtonText || 'Explore 4 Channels'}
            </a>
          </div>

          {/* Highlights Ribbon */}
          <div className="omni-hero-anim grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            {displayMetrics.map((m, mIdx) => (
              <div key={mIdx} className="p-4 rounded-lg bg-white border border-[#0B0D12]/10 shadow-sm text-center">
                <span className={`block text-h3 ${m.isPrimary ? 'text-[#FF4A1C]' : 'text-[#0B0D12]'}`}>{m.value}</span>
                <span className="text-caption font-mono text-[#0B0D12]/60">{m.label}</span>
              </div>
            ))}
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
              {config.channelsBadge}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {config.channelsTitle}
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              {config.channelsDescription}
            </p>
          </div>

          {/* CHANNEL TABS SELECTOR */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {displayChannels.map((ch, idx) => {
              const chId = ch.channelId || (ch as any).id || `channel-${idx}`;
              const IconComp = resolveIcon(ch.icon, MessageCircle);
              const isActive = activeChannel === chId;

              return (
                <button
                  key={chId}
                  onClick={() => setActiveChannel(chId)}
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
                    <CurrentChannelIcon className="w-7 h-7 text-[#FF4A1C]" />
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
                  {currentChannelObj.description || (currentChannelObj as any).desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {(currentChannelObj.features || []).map((feat: any, fIdx: number) => {
                  const featText = typeof feat === 'string' ? feat : (feat.label || feat.name || String(feat));
                  return (
                    <div key={fIdx} className="p-5 rounded bg-white border border-[#0B0D12]/10 space-y-1.5 flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-[#FF4A1C]/10 text-[#FF4A1C] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-h4 text-[#0B0D12]">{featText}</span>
                    </div>
                  );
                })}
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
              {config.automationBadge}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {config.automationTitle}
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              {config.automationDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayAutomation.map((node, idx) => {
              const IconComp = resolveIcon(node.icon, Workflow);
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
                    {node.description || (node as any).desc}
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
              {config.aiBadge}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {config.aiTitle}
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              {config.aiDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayAi.map((cap, idx) => {
              const IconComp = resolveIcon(cap.icon, Bot);
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
                    {cap.description || (cap as any).desc}
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
              {config.pricingBadge}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {config.pricingTitle}
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              {config.pricingDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayPricing.map((tier: any, idx) => {
              const isPopular = tier.isPopular !== undefined ? tier.isPopular : tier.popular;
              return (
                <div 
                  key={idx}
                  className={`bg-white rounded-lg p-8 border ${
                    isPopular ? 'border-[#0B0D12] shadow-lg ring-1 ring-[#0B0D12]' : 'border-[#0B0D12]/15 shadow-sm'
                  } flex flex-col justify-between space-y-8 relative overflow-hidden`}
                >
                  {isPopular && (
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
                      {(tier.features || []).map((feat: any, fIdx: number) => {
                        const featText = typeof feat === 'string' ? feat : (feat.label || feat.name || String(feat));
                        return (
                          <div key={fIdx} className="flex items-start gap-2.5 text-body text-[#0B0D12]/80">
                            <Check className="w-3.5 h-3.5 text-[#FF4A1C] shrink-0 mt-0.5" />
                            <span>{featText}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className={`w-full py-3.5 rounded text-badge text-center transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-[#FF4A1C] hover:bg-[#E03E14] text-white shadow-md'
                        : 'bg-[#FAF8F5] text-[#0B0D12] border border-[#0B0D12]/15 hover:border-[#0B0D12]'
                    }`}
                  >
                    {tier.cta || 'Get Started'}
                  </Link>

                </div>
              );
            })}
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
              {config.faqsBadge}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {config.faqsTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {displayFaqs.map((faq, idx) => {
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
      <StartProjectCta config={config} />

    </div>
  );
}
