import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Bus, 
  Users, 
  Calendar, 
  CreditCard, 
  Bot, 
  Smartphone, 
  ArrowRight, 
  Clock, 
  FileText, 
  HeartHandshake, 
  ChevronDown, 
  Sparkles, 
  BookOpen, 
  BarChart3, 
  Award, 
  X, 
  Check, 
  ArrowUpRight,
  Layers,
  Building2,
  CalendarCheck,
  UserCheck,
  Activity,
  Lock,
  HelpCircle
} from 'lucide-react';

import Testimonials from '@/components/home/Testimonials';
import StartProjectCta from '@/components/home/StartProjectCta';
import { useProduct, useSchoolErpPage } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, any> = {
  BookOpen,
  Users,
  UserCheck,
  Clock,
  Calendar,
  CreditCard,
  Bus,
  Building2,
  HeartHandshake,
  Bot,
  Smartphone,
  FileText,
  BarChart3,
  CalendarCheck,
  GraduationCap,
  Sparkles,
  Layers,
  ShieldCheck,
  Activity,
  Award,
  Lock,
};

function getModuleIcon(iconName?: string) {
  if (!iconName) return Layers;
  if (ICON_MAP[iconName]) return ICON_MAP[iconName];
  const normalized = iconName.toLowerCase();
  if (normalized.includes('report') || normalized.includes('chart') || normalized.includes('analytic')) return BarChart3;
  if (normalized.includes('user') || normalized.includes('admiss')) return Users;
  if (normalized.includes('attend') || normalized.includes('clock') || normalized.includes('time')) return Clock;
  if (normalized.includes('exam') || normalized.includes('book') || normalized.includes('acad')) return BookOpen;
  if (normalized.includes('fee') || normalized.includes('pay') || normalized.includes('card')) return CreditCard;
  if (normalized.includes('bus') || normalized.includes('transport') || normalized.includes('gps')) return Bus;
  if (normalized.includes('app') || normalized.includes('phone') || normalized.includes('mobile')) return Smartphone;
  if (normalized.includes('hr') || normalized.includes('staff') || normalized.includes('pay')) return FileText;
  if (normalized.includes('daycare') || normalized.includes('child') || normalized.includes('care')) return HeartHandshake;
  if (normalized.includes('ai') || normalized.includes('bot') || normalized.includes('saraswati')) return Bot;
  if (normalized.includes('appointment') || normalized.includes('calendar')) return CalendarCheck;
  return Layers;
}

// ----------------------------------------------------
// MODULE CATEGORIES DATA
// ----------------------------------------------------
interface ERPModuleCategory {
  id: string;
  name: string;
  badge: string;
  icon: any;
  tagline: string;
  description: string;
  accentColor: string;
  features: { title: string; desc: string }[];
  highlightMetric: string;
  metricLabel: string;
}

const ERP_CATEGORIES: ERPModuleCategory[] = [
  {
    id: 'academics',
    name: 'Academics & Exams',
    badge: 'Core Academic Engine',
    icon: BookOpen,
    tagline: 'End-to-End Curriculum & Examination Control',
    description: 'Digitize timetable allocation, syllabus progress tracking, digital report card generation, and online examination workflows.',
    accentColor: 'from-[#3B4FCF] to-[#8B5CF6]',
    highlightMetric: '100% Automated',
    metricLabel: 'Report Card Generation',
    features: [
      { title: 'Interactive Timetable Generator', desc: 'Auto-resolve teacher clashes and room capacity constraints instantly.' },
      { title: 'Syllabus & Lesson Progress Tracker', desc: 'Real-time visibility into curriculum completion across classes and branches.' },
      { title: 'Digital Exam & Grading Matrix', desc: 'Supports CBSE, ICSE, IB, and custom weighted grading standards.' },
      { title: 'Online Assessment & Quiz Portal', desc: 'Students submit assignments and take timed online quizzes via web or app.' }
    ]
  },
  {
    id: 'admissions',
    name: 'Admissions CRM',
    badge: 'Student Acquisition',
    icon: Users,
    tagline: 'From Lead Capture to Final Enrollment',
    description: 'Streamline prospective student inquiries, online application forms, document verification, interview scheduling, and fee deposits.',
    accentColor: 'from-[#8B5CF6] to-[#EC4899]',
    highlightMetric: '+38%',
    metricLabel: 'Higher Lead Conversion',
    features: [
      { title: 'Multi-Channel Lead Capture', desc: 'Auto-ingest inquiries from website forms, social campaigns, and walk-ins.' },
      { title: 'Digital Document Verification', desc: 'Parents upload birth certificates and past transcripts securely.' },
      { title: 'Automated Interview Scheduling', desc: 'Parents pick interview time slots with instant SMS/WhatsApp reminders.' },
      { title: 'Direct Deposit Gateway', desc: 'Collect application and seat reservation fees online immediately.' }
    ]
  },
  {
    id: 'attendance',
    name: 'Attendance & Tracking',
    badge: 'Campus Security',
    icon: UserCheck,
    tagline: 'Biometric & RFID Attendance Automation',
    description: 'Real-time student and staff attendance monitoring with instant parent notification triggers for absentees.',
    accentColor: 'from-[#EC4899] to-[#3B4FCF]',
    highlightMetric: '< 2 Sec',
    metricLabel: 'Parent Absence Alert Speed',
    features: [
      { title: 'Biometric & RFID Turnstile Sync', desc: 'Automated gate check-in logs hardware data directly to cloud servers.' },
      { title: 'Teacher One-Tap App Attendance', desc: 'Classroom teachers log daily attendance in seconds from mobile devices.' },
      { title: 'Automated SMS / WhatsApp Alerts', desc: 'Instant automated notification sent to parents if a student is marked absent.' },
      { title: 'Staff Leave & Shift Management', desc: 'Track teacher leaves, substitute allocations, and monthly attendance logs.' }
    ]
  },
  {
    id: 'fees',
    name: 'Fees & Online Payments',
    badge: 'Financial Operations',
    icon: CreditCard,
    tagline: 'Automated Billing, Invoicing & Reconciliation',
    description: 'Eliminate manual ledger errors with recurring fee structures, online payment gateway integrations, and instant digital receipts.',
    accentColor: 'from-[#06B6D4] to-[#8B5CF6]',
    highlightMetric: '99.4%',
    metricLabel: 'On-Time Fee Collections',
    features: [
      { title: 'Customizable Fee Structures', desc: 'Support installment plans, sibling discounts, and late payment penalties.' },
      { title: 'Integrated Payment Gateway', desc: 'Collect fees via Credit Card, Debit, UPI, NetBanking, and Stripe.' },
      { title: 'Automated Digital Receipts', desc: 'Parents instantly receive official PDF fee receipts via email & app.' },
      { title: 'Defaulter Tracking & Reminders', desc: 'Automated scheduled payment reminder broadcasts prior to due dates.' }
    ]
  },
  {
    id: 'transport',
    name: 'Live GPS Transport',
    badge: 'Fleet Telemetry',
    icon: Bus,
    tagline: 'Real-Time Bus Tracking & Driver Safety',
    description: 'Live GPS vehicle tracking for parents and transport managers, with speed alerts and geo-fenced arrival notifications.',
    accentColor: 'from-[#3B4FCF] to-[#06B6D4]',
    highlightMetric: '100% Live',
    metricLabel: 'Fleet GPS Visibility',
    features: [
      { title: 'Parent Live Bus Radar App', desc: 'Parents view real-time vehicle movement on map as the bus approaches.' },
      { title: 'Driver Mobile Assistant', desc: 'Driver receives route stop lists and student boarding/drop checklists.' },
      { title: 'Geo-Fence Proximity Alerts', desc: 'Automated alert sent 5 minutes before bus arrives at student stop.' },
      { title: 'Speeding & Delay Warnings', desc: 'Transport manager receives instant alerts for over-speeding or delays.' }
    ]
  },
  {
    id: 'hr',
    name: 'HR & Staff Payroll',
    badge: 'Staff Operations',
    icon: Building2,
    tagline: 'Automated Salaries, Tax Slips & Performance',
    description: 'Manage employee profiles, leave applications, monthly salary slip calculation, tax deductions, and performance reviews.',
    accentColor: 'from-[#8B5CF6] to-[#3B4FCF]',
    highlightMetric: 'Zero Error',
    metricLabel: 'Automated Payroll Engine',
    features: [
      { title: 'One-Click Monthly Payroll', desc: 'Automatically compute salary based on attendance, allowances, and taxes.' },
      { title: 'Employee Self-Service Portal', desc: 'Staff apply for leaves, view payslips, and check PF balances directly.' },
      { title: 'Role-Based Granular Security', desc: 'Control precise viewing and editing permissions across departments.' },
      { title: 'Performance & Training Logs', desc: 'Maintain annual staff appraisal records and professional certification histories.' }
    ]
  },
  {
    id: 'daycare',
    name: 'Daycare & Early Childhood',
    badge: 'Childcare Management',
    icon: HeartHandshake,
    tagline: 'Delight Parents with Live Daycare Logs',
    description: 'Specialized early childhood care module for meal tracking, nap logs, diaper changes, photo moments, and authorized pickup passes.',
    accentColor: 'from-[#EC4899] to-[#8B5CF6]',
    highlightMetric: '4.9★',
    metricLabel: 'Parent Satisfaction Score',
    features: [
      { title: 'Real-Time Activity Timeline', desc: 'Caregivers post meal consumption, sleep times, and potty activities.' },
      { title: 'Media Moments Gallery', desc: 'Share high-resolution daily activity photos and videos securely with parents.' },
      { title: 'Authorized Pickup Passcode', desc: 'QR code verification system to ensure children leave only with approved guardians.' },
      { title: 'Infant Health & Feeding Tracker', desc: 'Log bottle times, medication schedules, and temperature checks.' }
    ]
  },
  {
    id: 'ai',
    name: 'Saraswati AI Assistant',
    badge: 'Generative AI',
    icon: Bot,
    tagline: 'Next-Gen Generative AI for Campus Intelligence',
    description: 'Built-in Gemini 1.5 powered AI assistant helping teachers craft lesson plans, generate quizzes, and answer parent policy queries.',
    accentColor: 'from-[#3B4FCF] via-[#8B5CF6] to-[#EC4899]',
    highlightMetric: '10x Faster',
    metricLabel: 'Lesson Plan Creation',
    features: [
      { title: 'Instant Lesson Plan Generation', desc: 'Input topic and grade level to generate structured pedagogical plans in seconds.' },
      { title: 'Custom Quiz & Question Bank Engine', desc: 'Create multiple-choice and descriptive questions tailored to curriculum.' },
      { title: 'Campus Policy Q&A Bot', desc: 'Instant answers for parents and staff regarding fee rules, leaves, and dress codes.' },
      { title: 'Multi-Lingual Translation', desc: 'Translates school notices and reports into 15+ regional languages automatically.' }
    ]
  }
];

// ----------------------------------------------------
// SCREENSHOTS / UI SHOWCASE DATA
// ----------------------------------------------------
const SCREENSHOTS = [
  {
    title: 'Super Admin Operational Hub',
    category: 'Admin Portal',
    image: 'https://picsum.photos/seed/463789605/1200/800',
    desc: 'Real-time telemetry showing total campus attendance, fee collections, route updates, and staff status.'
  },
  {
    title: 'Parent & Student Native Mobile App',
    category: 'Mobile App',
    image: 'https://picsum.photos/seed/31530046/1200/800',
    desc: 'Clean iOS/Android interface for parents to view marks, pay fees via UPI/Credit Card, and chat with teachers.'
  },
  {
    title: 'Live GPS Bus Tracking Radar',
    category: 'Transport App',
    image: 'https://picsum.photos/seed/533658531/1200/800',
    desc: 'Map display tracking bus route velocity, stop arrival predictions, and automated speed alerts.'
  },
    {
    title: 'Daycare Daily Moments & Activity Feed',
    category: 'Daycare Module',
    image: 'https://picsum.photos/seed/486150965/1200/800',
    desc: 'Activity timeline for infant care, meal consumption metrics, nap duration logs, and photo updates.'
  },
  {
    title: 'Saraswati AI Teacher Workspace',
    category: 'AI Suite',
    image: 'https://picsum.photos/seed/1502950997/1200/800',
    desc: 'AI studio interface where educators generate lesson plans, unit tests, and personalized remedial notes.'
  }
];

// ----------------------------------------------------
// PRICING TIERS DATA
// ----------------------------------------------------
const PRICING_TIERS = [
  {
    name: 'Starter School',
    price: '$299',
    period: '/ month',
    tagline: 'Ideal for single campuses up to 500 students.',
    badge: 'Single Campus',
    popular: false,
    features: [
      'Up to 500 Active Students',
      'Admissions CRM & Student Records',
      'Student & Staff Attendance Module',
      'Fees & Online Payment Gateway',
      'Parent & Student Mobile Apps',
      'Standard Email & Ticket Support',
      '99.5% Uptime SLA Guarantee'
    ],
    cta: 'Get Started Starter',
    gradient: 'border-slate-200'
  },
  {
    name: 'Professional Campus',
    price: '$699',
    period: '/ month',
    tagline: 'Comprehensive suite for growing institutions up to 2,500 students.',
    badge: 'Most Popular Choice',
    popular: true,
    features: [
      'Up to 2,500 Active Students',
      'All Starter School Features',
      'Live GPS Bus Tracking & Driver App',
      'Daycare & Early Childhood Module',
      'Saraswati AI Lesson Plan Assistant',
      'Exams, Grading & Digital Report Cards',
      'Payroll & HR Operations Module',
      '24/7 Priority Phone & WhatsApp Support'
    ],
    cta: 'Request Demo & Quote',
    gradient: 'border-[#3B4FCF] ring-2 ring-[#3B4FCF]/30 shadow-2xl'
  },
  {
    name: 'Enterprise Network',
    price: 'Custom',
    period: '',
    tagline: 'Designed for multi-branch school groups & daycare chains.',
    badge: 'Multi-Branch Group',
    popular: false,
    features: [
      'Unlimited Students & Multi-Branches',
      'All Professional Features Included',
      'Dedicated Isolated Cloud Instance',
      'White-Label Custom Branded Mobile Apps',
      'Custom API Integrations & Webhooks',
      'Dedicated Account Manager & SLA',
      'On-Site Staff Training & Data Migration'
    ],
    cta: 'Contact Enterprise Sales',
    gradient: 'border-slate-200'
  }
];

// ----------------------------------------------------
// FAQS DATA
// ----------------------------------------------------
const FAQS = [
  {
    question: 'How long does campus onboarding and data migration take?',
    answer: 'Our dedicated migration team can ingest student records, past fee ledgers, and staff profiles within 3 to 5 business days. We provide complete Excel/CSV data importing tools and run parallel validation to guarantee 100% accuracy.'
  },
  {
    question: 'Are the parent and teacher mobile apps available on iOS and Android?',
    answer: 'Yes! SmartSchool ERP includes native iOS and Android mobile apps for parents, students, teachers, transport drivers, and daycare caregivers. For Enterprise plans, we can also publish white-label apps under your school’s own App Store developer account.'
  },
  {
    question: 'Is student and financial data isolated and secure?',
    answer: 'Security is paramount. SmartSchool ERP utilizes multi-tenant schema isolation, 256-bit AES encryption at rest, and TLS 1.3 in transit. Data is hosted in SOC2 Type II certified Cloud Run and PostgreSQL environments with automated daily backups.'
  },
  {
    question: 'How does Saraswati AI Assistant help our teaching staff?',
    answer: 'Saraswati AI allows educators to type a topic (e.g., "Photosynthesis for Grade 7") and generates structured 45-minute lesson plans, recommended homework assignments, and multiple-choice quizzes in under 10 seconds, saving teachers up to 15 hours per week.'
  },
  {
    question: 'Can we customize fee structures and grading rules for our school board?',
    answer: 'Absolutely. The platform supports complex CBSE, ICSE, IB, Cambridge, and custom state board grading frameworks. Fee engines accommodate installment schedules, sibling discounts, scholarship deductions, and custom late fine logic.'
  }
];

export default function SchoolERP() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const screenshotsRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('academics');
  const [activeScreenshot, setActiveScreenshot] = useState<number>(0);
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Prevent background scrolling and handle Escape key when image modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImageModal) {
        setSelectedImageModal(null);
      }
    };

    if (selectedImageModal) {
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
  }, [selectedImageModal]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.erp-hero-anim', {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Modules scroll reveal
      if (modulesRef.current) {
        gsap.from('.erp-module-anim', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: modulesRef.current,
            start: 'top 75%'
          }
        });
      }

      // Screenshots scroll reveal
      if (screenshotsRef.current) {
        gsap.from('.erp-shot-anim', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: screenshotsRef.current,
            start: 'top 75%'
          }
        });
      }
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

  const { product } = useProduct('school-erp');
  const { config } = useSchoolErpPage();

  const dynamicCategories: ERPModuleCategory[] = (config.modules && config.modules.length > 0)
    ? config.modules.map((f: any, index: number) => {
        const IconComponent = getModuleIcon(f.icon);
        const highlightLines = f.highlights ? f.highlights.split('\n').map(l => l.trim()).filter(Boolean) : [];
        const featureList = highlightLines.length > 0
          ? highlightLines.map((line) => {
              const [first, ...rest] = line.split(':');
              if (rest.length > 0) {
                return { title: first.trim(), desc: rest.join(':').trim() };
              }
              return { title: line, desc: f.description || '' };
            })
          : [
              { title: f.title, desc: f.description || '' }
            ];

        return {
          id: String(f.id || `module-${index}`),
          name: f.title,
          badge: f.tag || 'Enterprise Module',
          icon: IconComponent,
          tagline: f.description || f.title,
          description: f.description || '',
          accentColor: 'from-[#3B4FCF] to-[#8B5CF6]',
          highlightMetric: f.metricValue || '100%',
          metricLabel: f.metricLabel || 'Automated',
          features: featureList,
        };
      })
    : ERP_CATEGORIES;

  useEffect(() => {
    if (dynamicCategories.length > 0 && !dynamicCategories.some(c => c.id === activeCategory)) {
      setActiveCategory(dynamicCategories[0].id);
    }
  }, [dynamicCategories, activeCategory]);

  const currentCategoryObj = dynamicCategories.find(c => c.id === activeCategory) || dynamicCategories[0] || ERP_CATEGORIES[0];

  const displayScreenshots = (config.screenshots && config.screenshots.length > 0) ? config.screenshots : SCREENSHOTS;
  const displayPricingTiers = (config.pricingTiers && config.pricingTiers.length > 0)
    ? config.pricingTiers.map((tier: any, idx: number) => ({
        ...tier,
        features: (tier.features && Array.isArray(tier.features) && tier.features.length > 0)
          ? tier.features
          : (PRICING_TIERS[idx]?.features || [])
      }))
    : PRICING_TIERS;
  const displayFaqs = (config.faqs && config.faqs.length > 0) ? config.faqs : FAQS;
  
  // Helper to resolve Strapi images
  const getImageUrl = (img: any, fallback: string) => {
    if (!img) return fallback;
    if (typeof img === 'string') return img;
    if (img.url) {
      if (img.url.startsWith('http')) return img.url;
      return `${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}${img.url}`;
    }
    return fallback;
  };

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
          
          <div className="erp-hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#0B0D12]/15 bg-white text-[#0B0D12] text-badge">
            <GraduationCap className="w-4 h-4 text-[#FF4A1C]" />
            <span>{config.heroBadge}</span>
          </div>

          <h1 className="erp-hero-anim text-h1 text-[#0B0D12] max-w-5xl mx-auto">
            {(config.heroTitle || '').replace(config.heroHighlight || '', '')}
            {config.heroHighlight && (
              <span className="text-[#FF4A1C]">
                {config.heroHighlight}
              </span>
            )}
          </h1>

          <p className="erp-hero-anim text-body-lg text-[#0B0D12]/70 max-w-3xl mx-auto">
            {config.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="erp-hero-anim pt-2 flex flex-wrap justify-center gap-4 items-center">
            <Link
              to={config.primaryButtonLink || '/contact'}
              className="px-8 py-4 rounded bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-badge shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{config.primaryButtonText || 'Request Campus Demo'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={config.secondaryButtonLink || '#module-breakdown'}
              className="px-7 py-4 rounded bg-white border border-[#0B0D12]/15 hover:border-[#0B0D12] text-[#0B0D12] text-badge transition-all shadow-sm"
            >
              {(config.secondaryButtonText || 'Explore 11 Core Modules').replace('11', dynamicCategories.length.toString())}
            </a>
          </div>

          {/* Metrics Ribbon */}
          <div className="erp-hero-anim grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            {(config.heroMetrics || []).map((metric, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white border border-[#0B0D12]/10 shadow-sm text-center">
                <span className={`block text-h3 ${metric.isPrimary ? 'text-[#FF4A1C]' : 'text-[#0B0D12]'}`}>{metric.value}</span>
                <span className="text-caption font-mono text-[#0B0D12]/60">{metric.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 2. FULL MODULE BREAKDOWN BY CATEGORY                  */}
      {/* ---------------------------------------------------- */}
      <section 
        id="module-breakdown"
        ref={modulesRef}
        className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="erp-module-anim inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge">
              {config.modulesBadge || 'Comprehensive Feature Architecture'}
            </span>
            <h2 className="erp-module-anim text-h2 text-[#0B0D12]">
              {(config.modulesTitle || '{count} Specialized Modules for Every Department')
                .replace('{count}', dynamicCategories.length.toString())
                .replace('8', dynamicCategories.length.toString())
                .replace('11', dynamicCategories.length.toString())}
            </h2>
            <p className="erp-module-anim text-body text-[#0B0D12]/70">
              {config.modulesDescription || 'Click through the modules below to explore how SmartSchool ERP transforms every aspect of campus management.'}
            </p>
          </div>

          {/* CATEGORY TABS SELECTOR */}
          <div className="erp-module-anim flex flex-wrap gap-2 justify-center">
            {dynamicCategories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded text-badge transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-[#0B0D12] text-white border-[#0B0D12] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#0B0D12]/70 border-[#0B0D12]/15 hover:border-[#0B0D12] hover:text-[#0B0D12]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#FF4A1C]' : 'text-[#0B0D12]/60'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CATEGORY SHOWCASE CARD WITH 3D TILT */}
          <div className="erp-module-anim">
            <div 
              onMouseMove={handleMouseMoveTilt}
              onMouseLeave={handleMouseLeaveTilt}
              style={{ transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
              className="bg-[#FAF8F5] border border-[#0B0D12]/15 rounded-lg p-8 sm:p-10 shadow-md relative overflow-hidden space-y-8"
            >
              {/* Header Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#0B0D12]/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-white border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center">
                    <currentCategoryObj.icon className="w-7 h-7 text-[#FF4A1C]" />
                  </div>
                  <div>
                    <span className="text-label-mono text-[#FF4A1C] block">
                      {currentCategoryObj.badge}
                    </span>
                    <h3 className="text-h3 text-[#0B0D12]">
                      {currentCategoryObj.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded bg-white border border-[#0B0D12]/10 text-right">
                  <span className="block text-h3 text-[#0B0D12]">{currentCategoryObj.highlightMetric}</span>
                  <span className="text-caption font-mono text-[#0B0D12]/60">{currentCategoryObj.metricLabel}</span>
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="space-y-2">
                <h4 className="text-h4 text-[#0B0D12]">
                  {currentCategoryObj.tagline}
                </h4>
                <p className="text-body text-[#0B0D12]/70 max-w-3xl">
                  {currentCategoryObj.description}
                </p>
              </div>

              {/* Feature Grid inside Active Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {currentCategoryObj.features.map((feat, fIdx) => (
                  <div key={fIdx} className="p-5 rounded bg-white border border-[#0B0D12]/10 space-y-1.5 flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[#FF4A1C]/10 text-[#FF4A1C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="text-h4 text-[#0B0D12]">{feat.title}</h5>
                      <p className="text-body text-[#0B0D12]/70">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 3. SCREENSHOTS & UI SHOWCASE GALLERY                 */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={screenshotsRef}
        className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-[#FAF8F5] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="erp-shot-anim inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-white text-[#0B0D12] text-badge">
              {config.screenshotsBadge || 'Interface Showcase'}
            </span>
            <h2 className="erp-shot-anim text-h2 text-[#0B0D12]">
              {config.screenshotsTitle || 'Designed for Speed & Clarity'}
            </h2>
            <p className="erp-shot-anim text-body text-[#0B0D12]/70">
              {config.screenshotsDescription || 'Explore actual operational screens from the SmartSchool ERP ecosystem.'}
            </p>
          </div>

          {/* SCREENSHOT SELECTOR THUMBNAILS */}
          <div className="erp-shot-anim grid grid-cols-1 md:grid-cols-5 gap-3">
            {displayScreenshots.map((shot: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveScreenshot(idx)}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  activeScreenshot === idx 
                    ? 'bg-white border-[#0B0D12] shadow-sm' 
                    : 'bg-white/60 border-[#0B0D12]/15 hover:border-[#0B0D12]/40 text-[#0B0D12]/70'
                }`}
              >
                <span className="text-caption font-mono font-semibold text-[#FF4A1C] uppercase block">{shot.category}</span>
                <span className="text-caption font-bold text-[#0B0D12] line-clamp-1">{shot.title}</span>
              </button>
            ))}
          </div>

          {/* MAIN FEATURED SCREENSHOT PREVIEW WITH LIGHTBOX TRIGGER */}
          <div className="erp-shot-anim">
            <div 
              onClick={() => setSelectedImageModal(getImageUrl(displayScreenshots[activeScreenshot].image, SCREENSHOTS[activeScreenshot]?.image))}
              className="bg-white border border-[#0B0D12]/15 rounded-lg p-4 shadow-md relative overflow-hidden group cursor-pointer"
            >
              <div className="relative h-80 sm:h-[450px] w-full rounded overflow-hidden bg-[#FAF8F5]">
                <img 
                  src={getImageUrl(displayScreenshots[activeScreenshot].image, SCREENSHOTS[activeScreenshot]?.image)} 
                  alt={displayScreenshots[activeScreenshot].title}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500" 
                />
                
                {/* Lightbox Badge */}
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="px-3.5 py-1.5 rounded text-badge bg-[#0B0D12] text-white shadow flex items-center gap-1.5">
                    <span>Click to Enlarge</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="text-h4 text-[#0B0D12]">{displayScreenshots[activeScreenshot]?.title}</h4>
                <p className="text-body text-[#0B0D12]/70">{displayScreenshots[activeScreenshot]?.description || displayScreenshots[activeScreenshot]?.desc}</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 4. PRICING & PLANS                                  */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 border-b border-[#0B0D12]/10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-[#FAF8F5] text-[#0B0D12] text-badge">
              {config.pricingBadge || 'Flexible Subscriptions'}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {config.pricingTitle || 'Simple, Transparent Pricing'}
            </h2>
            <p className="text-body text-[#0B0D12]/70">
              {config.pricingDescription || 'Choose the plan that fits your campus size. All plans include automated cloud updates and SSL encryption.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayPricingTiers.map((tier: any, idx: number) => {
              const isPopular = tier.popular !== undefined ? tier.popular : tier.isPopular;
              return (
              <div 
                key={idx}
                className={`bg-[#FAF8F5] rounded-lg p-8 border ${
                  isPopular ? 'border-[#0B0D12] shadow-lg bg-white ring-1 ring-[#0B0D12]' : 'border-[#0B0D12]/15 shadow-sm'
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
                    {(tier.features || []).map((feat: any, fIdx: number) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-body text-[#0B0D12]/80">
                        <Check className="w-3.5 h-3.5 text-[#FF4A1C] shrink-0 mt-0.5" />
                        <span>{typeof feat === 'string' ? feat : (feat?.label || feat?.name || feat?.title || '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3.5 rounded text-badge text-center transition-all cursor-pointer ${
                    isPopular
                      ? 'bg-[#FF4A1C] hover:bg-[#E03E14] text-white shadow-md'
                      : 'bg-white text-[#0B0D12] border border-[#0B0D12]/15 hover:border-[#0B0D12]'
                  }`}
                >
                  {tier.cta}
                </Link>

              </div>
            )})}
          </div>

        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 5. ACCORDION FAQ SECTION                              */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-20 px-6 md:px-12 bg-[#FAF8F5] border-b border-[#0B0D12]/10 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1 rounded border border-[#0B0D12]/15 bg-white text-[#0B0D12] text-badge">
              {config.faqsBadge || 'Got Questions?'}
            </span>
            <h2 className="text-h2 text-[#0B0D12]">
              {config.faqsTitle || 'Frequently Asked Questions'}
            </h2>
            {config.faqsDescription && (
              <p className="text-body text-[#0B0D12]/70 max-w-xl mx-auto">
                {config.faqsDescription}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {(displayFaqs || []).map((faq: any, idx: number) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`bg-white border rounded overflow-hidden transition-all ${
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
      {/* 6. TESTIMONIALS (REUSED FROM HOME PAGE)             */}
      {/* ---------------------------------------------------- */}
      <Testimonials />


      {/* ---------------------------------------------------- */}
      {/* 7. CONTACT US (REUSED FROM HOME PAGE)                */}
      {/* ---------------------------------------------------- */}
      <StartProjectCta config={config} />


      {/* LIGHTBOX MODAL */}
      {selectedImageModal && (
        <div 
          onClick={() => setSelectedImageModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0D12]/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden shadow-2xl p-2 border border-[#0B0D12]/20" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImageModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded bg-[#0B0D12] text-white flex items-center justify-center cursor-pointer z-10 hover:bg-[#FF4A1C] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={selectedImageModal} alt="Enlarged UI" className="w-full h-auto rounded object-cover max-h-[85vh]" />
          </div>
        </div>
      )}

    </div>
  );
}
