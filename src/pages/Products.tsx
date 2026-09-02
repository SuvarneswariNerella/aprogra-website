import React, { useRef } from 'react';
import { 
  GraduationCap, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Bus, 
  Users, 
  Calendar, 
  CreditCard, 
  Bot, 
  Smartphone, 
  Zap, 
  Lock, 
  Headphones, 
  MessageCircle, 
  Send, 
  Clock, 
  FileText, 
  HeartHandshake, 
  BarChart3, 
  Layers, 
  Activity, 
  UserCheck, 
  CalendarCheck, 
  Award 
} from 'lucide-react';

import ProductsHero from '@/components/products/ProductsHero';
import ProductsWhyTrust from '@/components/products/ProductsWhyTrust';
import { Component as TestimonialSlider } from '@/components/ui/testimonial-slider';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTestimonials } from '@/lib/strapi';
import AboutContact from '@/components/about/AboutContact';
import { SchoolModulesSection } from '@/components/products/SchoolModulesSection';
import { OmniChatModulesSection } from '@/components/products/OmniChatModulesSection';
import { useProduct, useProductsPage } from '@/lib/strapi';

const ICON_MAP: Record<string, any> = {
  BookOpen: FileText,
  Users,
  UserCheck,
  Clock,
  Calendar,
  CreditCard,
  Bus,
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
  MessageSquare,
  MessageCircle,
  Send,
  Workflow: Sparkles,
  Zap,
  Headphones,
};

function getModuleIcon(iconName?: string) {
  if (!iconName) return Layers;
  if (ICON_MAP[iconName]) return ICON_MAP[iconName];
  const normalized = iconName.toLowerCase();
  if (normalized.includes('whatsapp')) return MessageCircle;
  if (normalized.includes('instagram') || normalized.includes('social') || normalized.includes('dm')) return Sparkles;
  if (normalized.includes('telegram')) return Send;
  if (normalized.includes('messenger') || normalized.includes('chat') || normalized.includes('inbox')) return MessageSquare;
  if (normalized.includes('report') || normalized.includes('chart') || normalized.includes('analytic')) return BarChart3;
  if (normalized.includes('user') || normalized.includes('admiss')) return Users;
  if (normalized.includes('attend') || normalized.includes('clock') || normalized.includes('time')) return Clock;
  if (normalized.includes('exam') || normalized.includes('book') || normalized.includes('acad')) return FileText;
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
// SCHOOL ERP FEATURES (ALL 11 MODULES) — ENTERPRISE SUITE
// ----------------------------------------------------
const SCHOOL_FEATURES = [
  { 
    icon: Users, 
    title: "Admissions CRM", 
    desc: "Enquiry-to-enrollment pipeline with lead scoring, document verification, and conversion tracking.",
    kpi: "Pipeline Tracking · Lead Scoring",
    tag: "Admissions & Enrolment",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Rich media templates with CTA buttons, carousels & quick replies",
      "One-click direct submission to Meta Graph API for fast approval",
      "Scheduled bulk promotional broadcasts with delivery analytics"
    ]
  },
];


export default function Products() {
  const pageRef = useRef<HTMLDivElement>(null);

  const { product: schoolProduct } = useProduct('school-erp');
  const { product: omnichatProduct } = useProduct('omnichat');
  const { testimonials: apiTestimonials } = useTestimonials();
  const { productsPage } = useProductsPage();

  const TESTIMONIALS = apiTestimonials.map((t: any, i: number) => ({
    img: t.avatarUrl || `https://images.unsplash.com/photo-${['1507003211169-0a1dd7228f2d', '1573496359142-b8d87734a5a2', '1580489944761-15a19d654956'][i % 3]}?auto=format&fit=crop&w=200&q=80`,
    quote: t.quote,
    name: t.authorName,
    role: t.authorCompany ? `${t.authorRole}, ${t.authorCompany}` : t.authorRole,
  }));

  const schoolModules = (schoolProduct?.features && schoolProduct.features.length > 0)
    ? schoolProduct.features.map((f: any) => ({
        icon: getModuleIcon(f.icon),
        title: f.title,
        desc: f.description,
        kpi: f.metricLabel ? `${f.metricLabel} · ${f.metricValue || '100%'}` : (f.metricValue || 'Enterprise Grade'),
        tag: f.tag || 'Module',
        image: f.imageUrl,
        highlights: f.highlights ? f.highlights.split('\n').map((l: string) => l.trim()).filter(Boolean) : [f.description]
      }))
    : SCHOOL_FEATURES;

  const omnichatModules = (omnichatProduct?.features && omnichatProduct.features.length > 0)
    ? omnichatProduct.features.map((f: any) => ({
        icon: getModuleIcon(f.icon),
        title: f.title,
        desc: f.description,
        kpi: f.metricLabel ? `${f.metricLabel} · ${f.metricValue || '100%'}` : (f.metricValue || 'Official Channel'),
        tag: f.tag || 'Channel',
        image: f.imageUrl,
        highlights: f.highlights ? f.highlights.split('\n').map((l: string) => l.trim()).filter(Boolean) : [f.description]
      }))
    : OMNICHAT_FEATURES;

  return (
    <div ref={pageRef} className="w-full relative bg-[#F4F1EA] text-[#0B0D12]">
      
      {/* ---------------------------------------------------- */}
      {/* 1. PRODUCTS HERO                                      */}
      {/* ---------------------------------------------------- */}
      <ProductsHero 
        productsPage={productsPage} 
        schoolProduct={schoolProduct} 
        omnichatProduct={omnichatProduct} 
      />

      {/* ---------------------------------------------------- */}
      {/* 2. SCHOOL ERP & DYNAMIC CORE MODULES                  */}
      {/* ---------------------------------------------------- */}
      <SchoolModulesSection 
        modules={schoolModules} 
      />

      {/* ---------------------------------------------------- */}
      {/* 3. OMNICHAT & DYNAMIC MULTI-CHANNEL CAPABILITIES     */}
      {/* ---------------------------------------------------- */}
      <OmniChatModulesSection 
        modules={omnichatModules} 
      />

      {/* ---------------------------------------------------- */}
      {/* 4. WHY TEAMS TRUST OUR PRODUCTS                       */}
      {/* ---------------------------------------------------- */}
      <ProductsWhyTrust productsPage={productsPage} />

      {/* ---------------------------------------------------- */}
      {/* 5. CLIENT TESTIMONIALS (no GSAP pin — avoids conflict */}
      {/*    with the 2 pinned product sections above)          */}
      {/* ---------------------------------------------------- */}
      {TESTIMONIALS.length > 0 && (
        <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#FAF8F5] text-[#0B0D12] border-b border-[#0B0D12]/10">
          <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
            <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-badge text-[#0B0D12] block">
                Client Feedback
              </span>
              <h2 className="text-h2 text-[#0B0D12]">
                Clients Don't Just Say It. They Mean It.
              </h2>
              <p className="text-body text-[#5A5E6E]">
                Real feedback from partners who scale with AProgra.
              </p>
            </ScrollReveal>

            <div className="pt-2">
              <TestimonialSlider testimonials={TESTIMONIALS} />
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* 6. CONTACT SECTION                                    */}
      {/* ---------------------------------------------------- */}
      <AboutContact productsPage={productsPage} />

    </div>
  );
}
