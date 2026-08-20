import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Bus, 
  Users, 
  Calendar, 
  CreditCard, 
  Bot, 
  Smartphone, 
  ArrowUpRight, 
  Zap, 
  Lock, 
  Server, 
  Headphones, 
  MessageCircle, 
  Send, 
  Clock, 
  FileText, 
  HeartHandshake, 
  BarChart3, 
  Check, 
  ArrowRight,
  Layers,
  Activity,
  UserCheck,
  CalendarCheck,
  Video,
  Award
} from 'lucide-react';

import ProductsHero from '@/components/products/ProductsHero';
import ProductsWhyTrust from '@/components/products/ProductsWhyTrust';
import Testimonials from '@/components/home/Testimonials';
import AboutContact from '@/components/about/AboutContact';
import { SchoolModulesSection } from '@/components/products/SchoolModulesSection';
import { OmniChatModulesSection } from '@/components/products/OmniChatModulesSection';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// SCHOOL ERP FEATURES (ALL 11 MODULES) — ENTERPRISE SUITE
// ----------------------------------------------------
const SCHOOL_FEATURES = [
  { 
    icon: Users, 
    title: "Admissions CRM", 
    desc: "Enquiry-to-enrollment pipeline with lead scoring, document verification, and conversion tracking.",
    kpi: "Pipeline Tracking · Lead Scoring",
    tag: "Admissions & Enrolment",
    highlights: [
      "End-to-end inquiry-to-enrollment funnel with automated stage updates",
      "Dynamic lead scoring, source attribution & conversion analytics",
      "Digital document verification & instant seat reservation"
    ]
  },
  { 
    icon: Clock, 
    title: "Attendance & Biometrics", 
    desc: "Daily student registers and staff clock-in with biometric and RFID integration, all in-app.",
    kpi: "Biometric & RFID Sync · 99.8% Accuracy",
    tag: "Hardware Integrated",
    highlights: [
      "Real-time student & faculty biometric + RFID hardware synchronization",
      "Automated daily SMS, WhatsApp & in-app parent absence alerts",
      "CBSE/ICSE compliant monthly registers & staff leave logs"
    ]
  },
  { 
    icon: Calendar, 
    title: "Timetable & Exams", 
    desc: "Conflict-free schedules, dynamic seating plans, marks entry, and automated transcripts generation.",
    kpi: "Conflict-Free Engine · Auto-Transcripts",
    tag: "Examination Engine",
    highlights: [
      "AI conflict-free scheduling engine for faculty, classrooms & labs",
      "Dynamic hall ticket generator & invigilation seating planner",
      "Continuous Assessment (CCE) marks entry & automated report cards"
    ]
  },
  { 
    icon: CreditCard, 
    title: "Fees & Online Payments", 
    desc: "Custom fee structures, sibling discounts, instant digital invoices, and secure parent payments in-app.",
    kpi: "Razorpay & Stripe Gateway · Auto-Receipts",
    tag: "Payment Gateway",
    highlights: [
      "Custom recurring fee structures, installments & sibling discounts",
      "Instant payment links via UPI, NetBanking, Cards & Wallets",
      "Automated digital receipts, live fee ledger & auto overdue reminders"
    ]
  },
  { 
    icon: Bus, 
    title: "Live Transport Tracking", 
    desc: "Real-time bus GPS tracking, dynamic routes, geofenced stops, and automated parent arrival alerts.",
    kpi: "Live Bus GPS · Real-Time Parent Alerts",
    tag: "Fleet Telemetry",
    highlights: [
      "Real-time vehicle GPS telemetry with live map route tracking",
      "Geofenced bus stops with 5-minute parent arrival push alerts",
      "Driver speed tracking, SOS emergency triggers & trip logs"
    ]
  },
  { 
    icon: Smartphone, 
    title: "Student, Teacher & Parent Apps", 
    desc: "Dedicated native mobile experiences tailored for every stakeholder role with biometric authentication.",
    kpi: "iOS & Android Native · Role-Based Access",
    tag: "Multi-Stakeholder",
    highlights: [
      "Dedicated native mobile experiences for parents, teachers & students",
      "Role-based dashboards for homework, fee payments & circulars",
      "Biometric authentication, multi-child switching & offline cache"
    ]
  },
  { 
    icon: FileText, 
    title: "HR & Payroll", 
    desc: "Complete employee directory, multi-tier leave workflows, automated pay scales, and PDF payslips.",
    kpi: "Tax Deductions · 1-Click Salary Disbursal",
    tag: "HR Management",
    highlights: [
      "Comprehensive employee records, biometric payroll & shift management",
      "Configurable salary structures, allowances, PF & tax deductions",
      "One-click digital payslip generation & direct bank transfer batches"
    ]
  },
  { 
    icon: HeartHandshake, 
    title: "Daycare Suite", 
    desc: "Real-time meals, nap schedules, restroom logs, secure QR pickup passes, and shared media moments.",
    kpi: "Live Media Logs · QR Pickup Verification",
    tag: "Daycare & Creche",
    highlights: [
      "Real-time timeline logs for meals, naps, potty & activity updates",
      "Secure QR-code authentication for authorized parent/guardian pickups",
      "Daily shared photo/video moments & direct 1-to-1 teacher messaging"
    ]
  },
  { 
    icon: CalendarCheck, 
    title: "Appointments & Front Office", 
    desc: "Seamless parent-teacher meeting booking with staff, digital reception logs, and visitor pass badges.",
    kpi: "Digital Reception · Staff Calendar Sync",
    tag: "Visitor Security",
    highlights: [
      "Self-service parent-teacher meeting (PTM) booking with staff sync",
      "Digital visitor management with instant thermal badge printing",
      "Gate pass workflows, courier logs & centralized inquiry register"
    ]
  },
  { 
    icon: Bot, 
    title: "Saraswati AI Assistant", 
    desc: "Built-in enterprise AI for syllabus-aligned lesson planning, automated quiz generation, and fast semantic search.",
    kpi: "Autonomous LLM · Instant Lesson Planner",
    tag: "Next-Gen AI",
    highlights: [
      "Syllabus-aligned lesson plan & pedagogical worksheet generator",
      "Automated quiz & rubric creator with Bloom's taxonomy mapping",
      "Instant multi-lingual query resolution across school policies"
    ]
  },
  { 
    icon: BarChart3, 
    title: "Reports & Analytics", 
    desc: "Role-based executive dashboards, customizable KPI widgets, and one-click CBSE/ICSE regulatory exports.",
    kpi: "PDF/Excel Exports · CBSE & ICSE Compliant",
    tag: "Executive Suite",
    highlights: [
      "Executive KPI dashboards for admissions, collections & retention",
      "One-click government, CBSE & state board compliance exports",
      "Automated scheduled PDF/Excel reports to management & directors"
    ]
  },
];

// ----------------------------------------------------
// OMNICHAT FEATURES (ALL 6 CAPABILITIES) — ENTERPRISE CLOUD
// ----------------------------------------------------
const OMNICHAT_FEATURES = [
  { 
    icon: MessageSquare, 
    title: "4 Connected Channels", 
    desc: "WhatsApp Business API, Instagram, Messenger, and Telegram centralized into one unified team inbox.",
    kpi: "Unified Inbox · Multi-Agent Routing",
    tag: "Channel Integrations",
    highlights: [
      "Official WhatsApp Business API integration with verified green tick support",
      "Instagram DMs, Story replies & Facebook Messenger unified in real-time",
      "Telegram bot connectivity with multi-agent concurrent assignments"
    ]
  },
  { 
    icon: Zap, 
    title: "No-Code Automation Builder", 
    desc: "Visual drag-and-drop flowchart builder to design complex multi-step customer journeys and triggers.",
    kpi: "Drag & Drop Canvas · Zero Coding",
    tag: "Visual Workflows",
    highlights: [
      "Visual flowchart builder with conditional branching & delay timers",
      "Custom user attributes, tags & auto-assignment to sales agents",
      "Webhooks & REST API triggers for instant CRM data synchronization"
    ]
  },
  { 
    icon: Bot, 
    title: "Cross-Channel AI Chatbot", 
    desc: "Autonomous conversational AI trained on your custom knowledge base, delivering instant 24/7 answers.",
    kpi: "Autonomous LLM · 24/7 Instant Answers",
    tag: "Conversational AI",
    highlights: [
      "RAG architecture trained on PDFs, websites & product catalogs",
      "Smart sentiment analysis with graceful human-agent escalation",
      "Multi-lingual support across 50+ languages with contextual memory"
    ]
  },
  { 
    icon: Headphones, 
    title: "AI Call & Chat Answering", 
    desc: "Intelligent voice answering and automated chat routing to capture leads even outside business hours.",
    kpi: "Zero Missed Leads · Smart Call Routing",
    tag: "Inbound Telephony",
    highlights: [
      "AI-driven automated voice responses & appointment booking",
      "Instant transcriptions with automatic customer summary generation",
      "Round-the-clock lead qualification and CRM contact creation"
    ]
  },
  { 
    icon: Sparkles, 
    title: "Instagram Comment → DM", 
    desc: "Auto-reply to post/reel comments instantly and trigger private DM sequences with special discount links.",
    kpi: "Instant Comment Capture · High Conversion",
    tag: "Social Growth",
    highlights: [
      "Keyword-based instant auto-replies to Instagram feed & reels comments",
      "Immediate private DM dispatch with checkout links or lead magnets",
      "Prevents comment spam while boosting algorithmic engagement"
    ]
  },
  { 
    icon: FileText, 
    title: "WhatsApp Meta Template Engine", 
    desc: "Design, preview, test, and submit rich WhatsApp templates directly to Meta for rapid compliance approval.",
    kpi: "Meta Verified · Instant Template Sync",
    tag: "Meta Broadcasts",
    highlights: [
      "Rich media templates with CTA buttons, carousels & quick replies",
      "One-click direct submission to Meta Graph API for fast approval",
      "Scheduled bulk promotional broadcasts with delivery analytics"
    ]
  },
];

// Motion Reveal Variants
const headerRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const }
  }
};

const gridRevealVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    }
  }
};

const cardRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1] as const
    }
  }
};

// ----------------------------------------------------
// PRODUCT GRID SKELETON LOADER
// ----------------------------------------------------
function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx}
          className="bg-white border border-[#0B0D12]/10 p-6 rounded-lg space-y-4 shadow-sm animate-pulse relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded bg-[#0B0D12]/5 border border-[#0B0D12]/10" />
          <div className="h-5 bg-[#0B0D12]/10 rounded w-3/4" />
          <div className="space-y-2 pt-1">
            <div className="h-3.5 bg-[#0B0D12]/5 rounded w-full" />
            <div className="h-3.5 bg-[#0B0D12]/5 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Products() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isLoadingGrid, setIsLoadingGrid] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingGrid(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={pageRef} className="w-full relative bg-[#F4F1EA] text-[#0B0D12] overflow-hidden pt-16 md:pt-20">
      
      {/* ---------------------------------------------------- */}
      {/* 1. DISTINCT, REDESIGNED PRODUCTS HERO                */}
      {/* ---------------------------------------------------- */}
      <ProductsHero />

      {/* ---------------------------------------------------- */}
      {/* 2. SCHOOL ERP & 11 CORE MODULES — UNIFIED SECTION   */}
      {/* ---------------------------------------------------- */}
      <SchoolModulesSection 
        modules={SCHOOL_FEATURES} 
      />

      {/* ---------------------------------------------------- */}
      {/* 3. OMNICHAT & 6 MULTI-CHANNEL CAPABILITIES — UNIFIED */}
      {/* ---------------------------------------------------- */}
      <OmniChatModulesSection 
        modules={OMNICHAT_FEATURES} 
      />

      {/* ---------------------------------------------------- */}
      {/* 4. REDESIGNED HIGH-IMPACT KPI CARDS                  */}
      {/* ---------------------------------------------------- */}
      <ProductsWhyTrust />

      {/* ---------------------------------------------------- */}
      {/* 5. TESTIMONIALS                                     */}
      {/* ---------------------------------------------------- */}
      <Testimonials />

      {/* ---------------------------------------------------- */}
      {/* 6. UNIFIED CONTACT SECTION (MATCHING ABOUT & HOME)   */}
      {/* ---------------------------------------------------- */}
      <AboutContact />

    </div>
  );
}
