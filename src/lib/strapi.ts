import { useState, useEffect } from 'react';

/**
 * Strapi API Client Service
 * Provides helper functions to query Strapi REST API endpoints, manage inquiries, and resolve media URLs.
 */

const STRAPI_URL = (import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337').replace(/\/$/, '');
const STRAPI_TOKEN = (import.meta.env.VITE_STRAPI_API_TOKEN || '').trim();

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: StrapiMeta;
}

/**
 * Generic fetcher from Strapi REST endpoints
 */
export async function fetchFromStrapi<T>(endpoint: string, fallbackData?: T): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = `${STRAPI_URL}/api/${cleanEndpoint}`;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(url, { headers, cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 401 && STRAPI_TOKEN) {
        console.warn('[Strapi] Token rejected (401). Retrying with public access...');
        const retryRes = await fetch(url, {
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });
        if (retryRes.ok) {
          const retryJson = await retryRes.json();
          return retryJson.data as T;
        }
      }

      console.warn(`[Strapi] API request failed with status ${res.status}: ${res.statusText}`);
      if (fallbackData !== undefined) return fallbackData;
      throw new Error(`Strapi request failed: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.warn(`[Strapi] Failed to fetch from "${url}". Using fallback data if available.`, error);
    if (fallbackData !== undefined) return fallbackData;
    throw error;
  }
}

/**
 * Resolves a full media URL for images/files stored in Strapi.
 * Supports strings, Strapi 4/5 media objects, and nested media attributes.
 */
export function getStrapiMediaUrl(media: any): string {
  if (!media) return '';
  
  if (typeof media === 'string') {
    if (!media.trim()) return '';
    if (media.startsWith('http://') || media.startsWith('https://') || media.startsWith('data:')) return media;
    return `${STRAPI_URL}${media.startsWith('/') ? media : `/${media}`}`;
  }

  // Strapi 5 direct object / format
  const url =
    media.url ||
    media.data?.attributes?.url ||
    media.data?.url ||
    media.attributes?.url ||
    (Array.isArray(media) && media[0]?.url) ||
    (Array.isArray(media?.data) && media.data[0]?.attributes?.url);

  if (url && typeof url === 'string') {
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    return `${STRAPI_URL}${url.startsWith('/') ? url : `/${url}`}`;
  }

  return '';
}

// ============================================================================
// GLOBAL HEADER & FOOTER CONFIGURATION CMS INTERFACES & DEFAULTS
// ============================================================================

export type LogoDisplayMode = 'logo_and_text' | 'logo_only' | 'text_only';

export interface NavLinkItem {
  id?: string | number;
  label: string;
  url: string;
  order?: number;
  isExternal?: boolean;
}

export interface HeaderConfig {
  siteTitle: string;
  displayMode: LogoDisplayMode;
  logo?: StrapiMedia | string | null;
  logoUrl?: string;
  navLinks: NavLinkItem[];
}

export interface FooterLinkItem {
  id?: string | number;
  label: string;
  url: string;
  badge?: string;
  badgeColor?: string;
  isExternal?: boolean;
  order?: number;
}

export interface FooterColumnItem {
  id?: string | number;
  title: string;
  order?: number;
  links: FooterLinkItem[];
}

export interface SocialLinkItem {
  id?: string | number;
  platform: 'github' | 'linkedin' | 'twitter' | 'x' | 'instagram' | 'youtube' | 'discord' | 'other' | string;
  label?: string;
  url: string;
  order?: number;
}

export interface FooterConfig {
  brandTitle: string;
  brandSubtitle: string;
  displayMode: LogoDisplayMode;
  logo?: StrapiMedia | string | null;
  logoUrl?: string;
  description: string;
  statusText: string;
  badge1_text: string;
  badge2_text: string;
  columns: FooterColumnItem[];
  socialLinks: SocialLinkItem[];
  legalLinks: FooterLinkItem[];
  copyrightText: string;
  backToTopText: string;
}

export interface GlobalConfig {
  header: HeaderConfig;
  footer: FooterConfig;
}

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  siteTitle: 'Aprogra',
  displayMode: 'logo_and_text',
  logoUrl: '',
  navLinks: [
    { label: 'Home', url: '/', order: 1, isExternal: false },
    { label: 'About', url: '/about', order: 2, isExternal: false },
    { label: 'Products', url: '/products', order: 3, isExternal: false },
    { label: 'Services', url: '/services', order: 4, isExternal: false },
    { label: 'Blog', url: '/blog', order: 5, isExternal: false },
    { label: 'Contact', url: '/contact', order: 6, isExternal: false },
  ],
};

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  brandTitle: 'Aprogra',
  brandSubtitle: 'Technologies',
  displayMode: 'logo_and_text',
  logoUrl: '',
  description: 'Engineering Infinite Possibilities. Full-cycle custom software, autonomous AI platforms, and mission-critical cloud systems built for hyper-scale enterprises.',
  statusText: 'All Systems Operational • 99.99% Uptime',
  badge1_text: 'SOC2 Type II',
  badge2_text: 'San Francisco & Global',
  columns: [
    {
      title: 'Products & Platforms',
      order: 1,
      links: [
        { label: 'SmartSchool ERP', url: '/products/school-erp', badge: 'v3.2', badgeColor: 'orange', isExternal: false, order: 1 },
        { label: 'OmniChat AI Suite', url: '/products/omnichat', badge: 'Active', badgeColor: 'green', isExternal: false, order: 2 },
        { label: 'Enterprise Product Suite', url: '/products', isExternal: false, order: 3 },
        { label: 'Custom Platform Request', url: '/services', isExternal: false, order: 4 },
        { label: 'Architecture Sandbox', url: '/contact', isExternal: false, order: 5 },
      ],
    },
    {
      title: 'Services & Solutions',
      order: 2,
      links: [
        { label: 'Full-Stack Cloud Systems', url: '/services', isExternal: false, order: 1 },
        { label: 'Autonomous AI & LLM Agents', url: '/services', isExternal: false, order: 2 },
        { label: 'Native & Cross-Platform Apps', url: '/services', isExternal: false, order: 3 },
        { label: 'DevOps & Infrastructure', url: '/services', isExternal: false, order: 4 },
        { label: 'Legacy Modernization Audits', url: '/services', isExternal: false, order: 5 },
      ],
    },
    {
      title: 'Company',
      order: 3,
      links: [
        { label: 'About Aprogra', url: '/about', isExternal: false, order: 1 },
        { label: 'Engineering Journal', url: '/blog', isExternal: false, order: 2 },
        { label: 'Careers', url: '/careers', badge: 'Hiring', badgeColor: 'dark', isExternal: false, order: 3 },
        { label: 'Contact Architects', url: '/contact', isExternal: false, order: 4 },
      ],
    },
  ],
  socialLinks: [
    { platform: 'github', label: 'GitHub', url: 'https://github.com', order: 1 },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com', order: 2 },
    { platform: 'twitter', label: 'X Twitter', url: 'https://twitter.com', order: 3 },
  ],
  legalLinks: [
    { label: 'Privacy Policy', url: '/contact', isExternal: false, order: 1 },
    { label: 'Terms of Service', url: '/contact', isExternal: false, order: 2 },
    { label: 'Security & Compliance', url: '/contact', isExternal: false, order: 3 },
    { label: 'Cookie Settings', url: '/contact', isExternal: false, order: 4 },
  ],
  copyrightText: '© 2026 Aprogra Technologies Inc. All rights reserved.',
  backToTopText: 'Back to top',
};

export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = {
  header: DEFAULT_HEADER_CONFIG,
  footer: DEFAULT_FOOTER_CONFIG,
};

/**
 * Fetches Global Header & Footer Configuration from Strapi with immediate fallback
 */
export async function fetchGlobalConfig(): Promise<GlobalConfig> {
  try {
    const raw = await fetchFromStrapi<any>(
      'global-config?populate[header][populate]=*&populate[footer][populate][columns][populate]=*&populate[footer][populate][socialLinks]=*&populate[footer][populate][legalLinks]=*'
    );
    if (!raw) return DEFAULT_GLOBAL_CONFIG;

    const data = raw.attributes || raw;
    const headerData = data.header || {};
    const footerData = data.footer || {};

    // Normalize Header Nav Links
    const rawNavLinks = Array.isArray(headerData.navLinks) ? headerData.navLinks : DEFAULT_HEADER_CONFIG.navLinks;
    const sortedNavLinks: NavLinkItem[] = rawNavLinks
      .map((l: any, idx: number) => ({
        id: l.id || idx,
        label: l.label || '',
        url: l.url || '/',
        order: typeof l.order === 'number' ? l.order : idx + 1,
        isExternal: !!l.isExternal,
      }))
      .sort((a: NavLinkItem, b: NavLinkItem) => (a.order || 0) - (b.order || 0));

    // Normalize Footer Columns
    const rawColumns = Array.isArray(footerData.columns) ? footerData.columns : DEFAULT_FOOTER_CONFIG.columns;
    const sortedColumns: FooterColumnItem[] = rawColumns
      .map((col: any, colIdx: number) => {
        const colLinks = Array.isArray(col.links) ? col.links : [];
        const sortedLinks: FooterLinkItem[] = colLinks
          .map((link: any, linkIdx: number) => ({
            id: link.id || linkIdx,
            label: link.label || '',
            url: link.url || '/',
            badge: link.badge || undefined,
            badgeColor: link.badgeColor || 'orange',
            isExternal: !!link.isExternal,
            order: typeof link.order === 'number' ? link.order : linkIdx + 1,
          }))
          .sort((a: FooterLinkItem, b: FooterLinkItem) => (a.order || 0) - (b.order || 0));

        return {
          id: col.id || colIdx,
          title: col.title || '',
          order: typeof col.order === 'number' ? col.order : colIdx + 1,
          links: sortedLinks.length > 0 ? sortedLinks : (DEFAULT_FOOTER_CONFIG.columns[colIdx]?.links || []),
        };
      })
      .sort((a: FooterColumnItem, b: FooterColumnItem) => (a.order || 0) - (b.order || 0));

    // Normalize Social Links
    const rawSocials = Array.isArray(footerData.socialLinks) ? footerData.socialLinks : DEFAULT_FOOTER_CONFIG.socialLinks;
    const sortedSocials: SocialLinkItem[] = rawSocials
      .map((s: any, idx: number) => ({
        id: s.id || idx,
        platform: s.platform || 'github',
        label: s.label || s.platform || '',
        url: s.url || 'https://github.com',
        order: typeof s.order === 'number' ? s.order : idx + 1,
      }))
      .sort((a: SocialLinkItem, b: SocialLinkItem) => (a.order || 0) - (b.order || 0));

    // Normalize Legal Links
    const rawLegal = Array.isArray(footerData.legalLinks) ? footerData.legalLinks : DEFAULT_FOOTER_CONFIG.legalLinks;
    const sortedLegal: FooterLinkItem[] = rawLegal
      .map((l: any, idx: number) => ({
        id: l.id || idx,
        label: l.label || '',
        url: l.url || '/contact',
        order: typeof l.order === 'number' ? l.order : idx + 1,
      }))
      .sort((a: FooterLinkItem, b: FooterLinkItem) => (a.order || 0) - (b.order || 0));

    return {
      header: {
        siteTitle: headerData.siteTitle || DEFAULT_HEADER_CONFIG.siteTitle,
        displayMode: (headerData.displayMode as LogoDisplayMode) || DEFAULT_HEADER_CONFIG.displayMode,
        logo: headerData.logo,
        logoUrl: getStrapiMediaUrl(headerData.logo) || headerData.logoUrl || DEFAULT_HEADER_CONFIG.logoUrl,
        navLinks: sortedNavLinks.length > 0 ? sortedNavLinks : DEFAULT_HEADER_CONFIG.navLinks,
      },
      footer: {
        brandTitle: footerData.brandTitle || DEFAULT_FOOTER_CONFIG.brandTitle,
        brandSubtitle: footerData.brandSubtitle || DEFAULT_FOOTER_CONFIG.brandSubtitle,
        displayMode: (footerData.displayMode as LogoDisplayMode) || DEFAULT_FOOTER_CONFIG.displayMode,
        logo: footerData.logo,
        logoUrl: getStrapiMediaUrl(footerData.logo) || footerData.logoUrl || DEFAULT_FOOTER_CONFIG.logoUrl,
        description: footerData.description || DEFAULT_FOOTER_CONFIG.description,
        statusText: footerData.statusText || DEFAULT_FOOTER_CONFIG.statusText,
        badge1_text: footerData.badge1_text || DEFAULT_FOOTER_CONFIG.badge1_text,
        badge2_text: footerData.badge2_text || DEFAULT_FOOTER_CONFIG.badge2_text,
        columns: sortedColumns.length > 0 ? sortedColumns : DEFAULT_FOOTER_CONFIG.columns,
        socialLinks: sortedSocials.length > 0 ? sortedSocials : DEFAULT_FOOTER_CONFIG.socialLinks,
        legalLinks: sortedLegal.length > 0 ? sortedLegal : DEFAULT_FOOTER_CONFIG.legalLinks,
        copyrightText: footerData.copyrightText || DEFAULT_FOOTER_CONFIG.copyrightText,
        backToTopText: footerData.backToTopText || DEFAULT_FOOTER_CONFIG.backToTopText,
      },
    };
  } catch (err) {
    console.warn('[Strapi] Could not load global-config, using defaults:', err);
    return DEFAULT_GLOBAL_CONFIG;
  }
}

/**
 * React hook for consuming dynamic Global Header & Footer Configuration
 */
export function useGlobalConfig() {
  const [config, setConfig] = useState<GlobalConfig>(DEFAULT_GLOBAL_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchGlobalConfig()
      .then((data) => {
        if (isMounted && data) {
          setConfig(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { config, header: config.header, footer: config.footer, isLoading };
}

// ============================================================================
// STRUCTURED MODULAR CONTACT PAGE CMS INTERFACES & DEFAULTS
// ============================================================================

export interface ContactHeroSection {
  availabilityBadge: string;
  headline: string;
  highlight: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  slaBadge1: string;
  slaBadge2: string;
  slaBadge3: string;
  directChannelsTitle: string;
  podStatus: string;
  emailLabel: string;
  email: string;
  emailCopyButtonText: string;
  phoneLabel: string;
  phone: string;
  phoneCopyButtonText: string;
  studioHqLabel: string;
  studioHqValue: string;
  bookIntroCallButtonText: string;
}

export interface ContactRoadmapStep {
  id?: number | string;
  timeframe: string;
  title: string;
  description: string;
}

export interface ContactRoadmapSection {
  badge: string;
  title: string;
  steps: ContactRoadmapStep[];
}

export interface ContactChoiceItem {
  id?: number | string;
  name: string;
}

export interface ContactBriefSection {
  badge: string;
  title: string;
  subtitle: string;
  formHeading: string;
  formSubheading: string;
  fieldNameLabel: string;
  fieldNamePlaceholder: string;
  fieldEmailLabel: string;
  fieldEmailPlaceholder: string;
  fieldCompanyLabel: string;
  fieldCompanyPlaceholder: string;
  capabilitiesQuestion: string;
  capabilitiesList: string[];
  budgetQuestion: string;
  budgetRangesList: string[];
  timelineQuestion: string;
  timelineRangesList: string[];
  messageQuestion: string;
  messagePlaceholder: string;
  submitButtonText: string;
  successTitle: string;
}

export interface ContactPreviewStep {
  id?: number | string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface ContactBriefPreviewSection {
  cardTitle: string;
  cardBadge: string;
  capabilitiesLabel: string;
  investmentLabel: string;
  timelineLabel: string;
  engagementTitle: string;
  engagementSteps: ContactPreviewStep[];
  guaranteesTitle: string;
  guarantee1_title: string;
  guarantee1_desc: string;
  guarantee2_title: string;
  guarantee2_desc: string;
  slaResponseText: string;
  readyReviewText: string;
  videoTitle: string;
  videoDescription: string;
  videoButtonText: string;
}

export interface ContactDirectChannelsHeader {
  badge: string;
  title: string;
  subtitle: string;
}

export interface ContactChannelItem {
  id: string;
  order: number;
  type: 'email' | 'phone' | 'office' | 'hub' | 'other';
  label: string;
  primaryValue: string;
  subtext: string;
  buttonText: string;
  buttonUrl?: string;
  iconName?: string;
  iconMedia?: StrapiMedia | string | null;
  iconUrl?: string;
}

export interface ContactClosingBannerSection {
  headline: string;
  highlight: string;
  subtitle: string;
  backToTopText: string;
}

export interface ContactIntroCallModalSection {
  title: string;
  subtitle: string;
  topicOptions: string[];
  timeSlots: string[];
  submitButtonText: string;
  successTitle: string;
}

export interface ContactPageContent {
  hero: ContactHeroSection;
  roadmap: ContactRoadmapSection;
  brief: ContactBriefSection;
  preview: ContactBriefPreviewSection;
  directChannelsHeader: ContactDirectChannelsHeader;
  closingBanner: ContactClosingBannerSection;
  introCallModal: ContactIntroCallModalSection;
  metaTitle?: string;
  metaDescription?: string;
}

export const DEFAULT_CONTACT_CHANNELS: ContactChannelItem[] = [
  {
    id: 'email',
    order: 1,
    type: 'email',
    label: 'PRIMARY INQUIRIES',
    primaryValue: 'hello@aprogra.com',
    subtext: 'Monitored 24/7 by solution engineers',
    buttonText: 'Copy Email Address',
    iconName: 'mail',
  },
  {
    id: 'phone',
    order: 2,
    type: 'phone',
    label: 'DIRECT PHONE LINE',
    primaryValue: '+1 (800) 555-0199',
    subtext: 'Mon–Fri, 8:00 AM–6:00 PM PST',
    buttonText: 'Copy Phone Number',
    iconName: 'phone',
  },
  {
    id: 'office',
    order: 3,
    type: 'office',
    label: 'PRIMARY STUDIO HQ',
    primaryValue: 'San Francisco, CA',
    subtext: '535 Mission St, 14th Floor, San Francisco, CA 94105',
    buttonText: 'Open in Google Maps',
    buttonUrl: 'https://maps.google.com/?q=535+Mission+St+14th+Floor+San+Francisco+CA+94105',
    iconName: 'map-pin',
  },
  {
    id: 'hub',
    order: 4,
    type: 'hub',
    label: 'GLOBAL TECH HUBS',
    primaryValue: 'New York • Austin • London',
    subtext: 'Serving enterprise partners across time zones',
    buttonText: 'Remote First Engineering',
    iconName: 'globe',
  },
];

export const DEFAULT_CONTACT_PAGE_CONTENT: ContactPageContent = {
  hero: {
    availabilityBadge: 'ACCEPTING SELECT H2 / Q3 2026 ENGAGEMENTS',
    headline: 'Engineering Partnerships &',
    highlight: 'Project Inquiries.',
    description:
      'Have a breakthrough product, an enterprise platform to scale, or an AI workflow to automate? Connect directly with our lead architects to turn your vision into production-ready software.',
    primaryCtaText: 'Start Your Brief',
    secondaryCtaText: 'Schedule Intro Call',
    slaBadge1: '< 2 hrs Response SLA',
    slaBadge2: '100% NDA Protected',
    slaBadge3: 'Lead Architect Access',
    directChannelsTitle: 'DIRECT CHANNELS',
    podStatus: 'Active Pods Online',
    emailLabel: 'PRIMARY INQUIRIES',
    email: 'hello@aprogra.com',
    emailCopyButtonText: 'Copy',
    phoneLabel: 'DIRECT PHONE LINE',
    phone: '+1 (800) 555-0199',
    phoneCopyButtonText: 'Copy',
    studioHqLabel: 'STUDIO HQ',
    studioHqValue: 'Hyderabad, India • Global Remote Pods',
    bookIntroCallButtonText: 'Book 15-Min Intro Call',
  },
  roadmap: {
    badge: '01 / ENGAGEMENT LIFECYCLE',
    title: 'From First Contact to Sprint 1',
    steps: [
      {
        timeframe: '01 / Days 1–3',
        title: 'Architecture Blueprint',
        description:
          'We review your technical specifications, analyze legacy constraints, and formulate a full system topology and sprint milestones.',
      },
      {
        timeframe: '02 / Week 1',
        title: 'Sprint 0 & Core Scaffolding',
        description:
          'Repository setup, CI/CD pipelines, database schema design, and production environment provisioning with strict security policies.',
      },
      {
        timeframe: '03 / Weeks 2–8',
        title: 'Bi-Weekly Velocity Drops',
        description:
          'Continuous shipping with staging previews, real-time Slack/Discord sync, and weekly architectural review calls.',
      },
    ],
  },
  brief: {
    badge: '02 / INTERACTIVE SPECIFICATION',
    title: 'Configure Your Project Brief',
    subtitle:
      'Fill out the brief below to generate your custom project preview and start a direct conversation with our technical team.',
    formHeading: 'Project Requirements Form',
    formSubheading: 'Select your project attributes to help us match the right technical team.',
    fieldNameLabel: 'Your Name *',
    fieldNamePlaceholder: 'e.g. Alex Morgan',
    fieldEmailLabel: 'Work Email *',
    fieldEmailPlaceholder: 'alex@company.com',
    fieldCompanyLabel: 'Company / Organization (optional)',
    fieldCompanyPlaceholder: 'e.g. NextGen SaaS or Stealth Startup',
    capabilitiesQuestion: 'What capabilities do you require?',
    capabilitiesList: [
      'Web Apps',
      'Mobile Apps',
      'AI & Automation',
      'Content & Marketing',
      'Design Systems',
      'Enterprise ERP',
    ],
    budgetQuestion: 'Expected Investment Range',
    budgetRangesList: ['< $15K', '$15K – $25K', '$25K – $75K', '$75K+'],
    timelineQuestion: 'Target Timeline',
    timelineRangesList: ['< 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
    messageQuestion: 'Project Overview & Objectives *',
    messagePlaceholder:
      'Describe your current tech stack, desired architecture, target timeline, and success criteria...',
    submitButtonText: 'SUBMIT PROJECT BRIEF',
    successTitle: 'Project Brief Received!',
  },
  preview: {
    cardTitle: 'REAL-TIME BRIEF SPECIFICATION',
    cardBadge: 'LIVE DRAFT',
    capabilitiesLabel: 'Capabilities in Scope',
    investmentLabel: 'Investment',
    timelineLabel: 'Timeline',
    engagementTitle: 'Engagement Architecture',
    engagementSteps: [
      {
        stepNumber: '1',
        title: 'Initial Brief Review',
        description: 'Our lead architects analyze your specific requirements.',
      },
      {
        stepNumber: '2',
        title: 'System Design & Scope',
        description: 'We map out technical constraints and platform architecture.',
      },
      {
        stepNumber: '3',
        title: 'Engineering Kickoff',
        description: 'Dedicated pods are spun up for immediate development.',
      },
    ],
    guaranteesTitle: 'Enterprise Guarantees',
    guarantee1_title: 'Strict Mutual NDA',
    guarantee1_desc: '100% IP Protection',
    guarantee2_title: 'SOC2 Type II',
    guarantee2_desc: 'Bank-grade security',
    slaResponseText: 'SLA: < 2 hrs Response SLA',
    readyReviewText: 'Ready for Review',
    videoTitle: 'Prefer a face-to-face video call?',
    videoDescription:
      'Schedule an immediate 15-minute intro with our engineering leads to talk through your platform requirements.',
    videoButtonText: 'BOOK A 15-MIN INTRO CALL',
  },
  directChannelsHeader: {
    badge: '03 / IMMEDIATE CHANNELS',
    title: 'Direct Access to Our Technical Leadership',
    subtitle:
      'Prefer direct communication? Reach out through any of our primary channels below.',
  },
  closingBanner: {
    headline: 'Engineering Infinite',
    highlight: 'Possibilities.',
    subtitle: 'Thank you for visiting. We look forward to building with you.',
    backToTopText: 'BACK TO TOP ↑',
  },
  introCallModal: {
    title: 'Engineering Kickoff Call',
    subtitle:
      'Directly with our Lead Solutions Architect. 15 minutes to evaluate technical fit.',
    topicOptions: [
      'System Architecture',
      'AI & Automation',
      'Project Rescue',
      'Team Augmentation',
    ],
    timeSlots: [
      'Tomorrow, 10:00 AM EST',
      'Tomorrow, 2:30 PM EST',
      'Thursday, 11:00 AM EST',
      'Friday, 4:00 PM EST',
    ],
    submitButtonText: 'Confirm Calendar Reservation',
    successTitle: 'Call Reserved!',
  },
};

/**
 * Fetches Contact Page configuration from Strapi with immediate fallback
 */
export async function fetchContactPageContent(): Promise<ContactPageContent> {
  try {
    const raw = await fetchFromStrapi<any>(
      'contact-page?populate[hero][populate]=*&populate[roadmap][populate]=*&populate[brief][populate]=*&populate[preview][populate]=*&populate[directChannelsHeader][populate]=*&populate[closingBanner][populate]=*&populate[introCallModal][populate]=*'
    );
    if (!raw) return DEFAULT_CONTACT_PAGE_CONTENT;

    const data = raw.attributes || raw;
    const hero = data.hero || {};
    const roadmap = data.roadmap || {};
    const brief = data.brief || {};
    const preview = data.preview || {};
    const directChannelsHeader = data.directChannelsHeader || {};
    const closingBanner = data.closingBanner || {};
    const introCallModal = data.introCallModal || {};

    const extractChoiceNames = (list: any[] | undefined, defaultList: string[]): string[] => {
      if (!Array.isArray(list) || list.length === 0) return defaultList;
      return list.map((item: any) => typeof item === 'string' ? item : item.name || '');
    };

    return {
      hero: {
        availabilityBadge: hero.availabilityBadge || DEFAULT_CONTACT_PAGE_CONTENT.hero.availabilityBadge,
        headline: hero.headline || DEFAULT_CONTACT_PAGE_CONTENT.hero.headline,
        highlight: hero.highlight || DEFAULT_CONTACT_PAGE_CONTENT.hero.highlight,
        description: hero.description || DEFAULT_CONTACT_PAGE_CONTENT.hero.description,
        primaryCtaText: hero.primaryCtaText || DEFAULT_CONTACT_PAGE_CONTENT.hero.primaryCtaText,
        secondaryCtaText: hero.secondaryCtaText || DEFAULT_CONTACT_PAGE_CONTENT.hero.secondaryCtaText,
        slaBadge1: hero.slaBadge1 || DEFAULT_CONTACT_PAGE_CONTENT.hero.slaBadge1,
        slaBadge2: hero.slaBadge2 || DEFAULT_CONTACT_PAGE_CONTENT.hero.slaBadge2,
        slaBadge3: hero.slaBadge3 || DEFAULT_CONTACT_PAGE_CONTENT.hero.slaBadge3,
        directChannelsTitle: hero.directChannelsTitle || DEFAULT_CONTACT_PAGE_CONTENT.hero.directChannelsTitle,
        podStatus: hero.podStatus || DEFAULT_CONTACT_PAGE_CONTENT.hero.podStatus,
        emailLabel: hero.emailLabel || DEFAULT_CONTACT_PAGE_CONTENT.hero.emailLabel,
        email: hero.email || DEFAULT_CONTACT_PAGE_CONTENT.hero.email,
        emailCopyButtonText: hero.emailCopyButtonText || DEFAULT_CONTACT_PAGE_CONTENT.hero.emailCopyButtonText,
        phoneLabel: hero.phoneLabel || DEFAULT_CONTACT_PAGE_CONTENT.hero.phoneLabel,
        phone: hero.phone || DEFAULT_CONTACT_PAGE_CONTENT.hero.phone,
        phoneCopyButtonText: hero.phoneCopyButtonText || DEFAULT_CONTACT_PAGE_CONTENT.hero.phoneCopyButtonText,
        studioHqLabel: hero.studioHqLabel || DEFAULT_CONTACT_PAGE_CONTENT.hero.studioHqLabel,
        studioHqValue: hero.studioHqValue || DEFAULT_CONTACT_PAGE_CONTENT.hero.studioHqValue,
        bookIntroCallButtonText: hero.bookIntroCallButtonText || DEFAULT_CONTACT_PAGE_CONTENT.hero.bookIntroCallButtonText,
      },
      roadmap: {
        badge: roadmap.badge || DEFAULT_CONTACT_PAGE_CONTENT.roadmap.badge,
        title: roadmap.title || DEFAULT_CONTACT_PAGE_CONTENT.roadmap.title,
        steps: Array.isArray(roadmap.steps) && roadmap.steps.length > 0
          ? roadmap.steps
          : DEFAULT_CONTACT_PAGE_CONTENT.roadmap.steps,
      },
      brief: {
        badge: brief.badge || DEFAULT_CONTACT_PAGE_CONTENT.brief.badge,
        title: brief.title || DEFAULT_CONTACT_PAGE_CONTENT.brief.title,
        subtitle: brief.subtitle || DEFAULT_CONTACT_PAGE_CONTENT.brief.subtitle,
        formHeading: brief.formHeading || DEFAULT_CONTACT_PAGE_CONTENT.brief.formHeading,
        formSubheading: brief.formSubheading || DEFAULT_CONTACT_PAGE_CONTENT.brief.formSubheading,
        fieldNameLabel: brief.fieldNameLabel || DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldNameLabel,
        fieldNamePlaceholder: brief.fieldNamePlaceholder || DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldNamePlaceholder,
        fieldEmailLabel: brief.fieldEmailLabel || DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldEmailLabel,
        fieldEmailPlaceholder: brief.fieldEmailPlaceholder || DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldEmailPlaceholder,
        fieldCompanyLabel: brief.fieldCompanyLabel || DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldCompanyLabel,
        fieldCompanyPlaceholder: brief.fieldCompanyPlaceholder || DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldCompanyPlaceholder,
        capabilitiesQuestion: brief.capabilitiesQuestion || DEFAULT_CONTACT_PAGE_CONTENT.brief.capabilitiesQuestion,
        capabilitiesList: extractChoiceNames(brief.capabilitiesList, DEFAULT_CONTACT_PAGE_CONTENT.brief.capabilitiesList),
        budgetQuestion: brief.budgetQuestion || DEFAULT_CONTACT_PAGE_CONTENT.brief.budgetQuestion,
        budgetRangesList: extractChoiceNames(brief.budgetRangesList, DEFAULT_CONTACT_PAGE_CONTENT.brief.budgetRangesList),
        timelineQuestion: brief.timelineQuestion || DEFAULT_CONTACT_PAGE_CONTENT.brief.timelineQuestion,
        timelineRangesList: extractChoiceNames(brief.timelineRangesList, DEFAULT_CONTACT_PAGE_CONTENT.brief.timelineRangesList),
        messageQuestion: brief.messageQuestion || DEFAULT_CONTACT_PAGE_CONTENT.brief.messageQuestion,
        messagePlaceholder: brief.messagePlaceholder || DEFAULT_CONTACT_PAGE_CONTENT.brief.messagePlaceholder,
        submitButtonText: brief.submitButtonText || DEFAULT_CONTACT_PAGE_CONTENT.brief.submitButtonText,
        successTitle: brief.successTitle || DEFAULT_CONTACT_PAGE_CONTENT.brief.successTitle,
      },
      preview: {
        cardTitle: preview.cardTitle || DEFAULT_CONTACT_PAGE_CONTENT.preview.cardTitle,
        cardBadge: preview.cardBadge || DEFAULT_CONTACT_PAGE_CONTENT.preview.cardBadge,
        capabilitiesLabel: preview.capabilitiesLabel || DEFAULT_CONTACT_PAGE_CONTENT.preview.capabilitiesLabel,
        investmentLabel: preview.investmentLabel || DEFAULT_CONTACT_PAGE_CONTENT.preview.investmentLabel,
        timelineLabel: preview.timelineLabel || DEFAULT_CONTACT_PAGE_CONTENT.preview.timelineLabel,
        engagementTitle: preview.engagementTitle || DEFAULT_CONTACT_PAGE_CONTENT.preview.engagementTitle,
        engagementSteps: Array.isArray(preview.engagementSteps) && preview.engagementSteps.length > 0
          ? preview.engagementSteps
          : DEFAULT_CONTACT_PAGE_CONTENT.preview.engagementSteps,
        guaranteesTitle: preview.guaranteesTitle || DEFAULT_CONTACT_PAGE_CONTENT.preview.guaranteesTitle,
        guarantee1_title: preview.guarantee1_title || DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee1_title,
        guarantee1_desc: preview.guarantee1_desc || DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee1_desc,
        guarantee2_title: preview.guarantee2_title || DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee2_title,
        guarantee2_desc: preview.guarantee2_desc || DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee2_desc,
        slaResponseText: preview.slaResponseText || DEFAULT_CONTACT_PAGE_CONTENT.preview.slaResponseText,
        readyReviewText: preview.readyReviewText || DEFAULT_CONTACT_PAGE_CONTENT.preview.readyReviewText,
        videoTitle: preview.videoTitle || DEFAULT_CONTACT_PAGE_CONTENT.preview.videoTitle,
        videoDescription: preview.videoDescription || DEFAULT_CONTACT_PAGE_CONTENT.preview.videoDescription,
        videoButtonText: preview.videoButtonText || DEFAULT_CONTACT_PAGE_CONTENT.preview.videoButtonText,
      },
      directChannelsHeader: {
        badge: directChannelsHeader.badge || DEFAULT_CONTACT_PAGE_CONTENT.directChannelsHeader.badge,
        title: directChannelsHeader.title || DEFAULT_CONTACT_PAGE_CONTENT.directChannelsHeader.title,
        subtitle: directChannelsHeader.subtitle || DEFAULT_CONTACT_PAGE_CONTENT.directChannelsHeader.subtitle,
      },
      closingBanner: {
        headline: closingBanner.headline || DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.headline,
        highlight: closingBanner.highlight || DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.highlight,
        subtitle: closingBanner.subtitle || DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.subtitle,
        backToTopText: closingBanner.backToTopText || DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.backToTopText,
      },
      introCallModal: {
        title: introCallModal.title || DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.title,
        subtitle: introCallModal.subtitle || DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.subtitle,
        topicOptions: extractChoiceNames(introCallModal.topicOptions, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.topicOptions),
        timeSlots: extractChoiceNames(introCallModal.timeSlots, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.timeSlots),
        submitButtonText: introCallModal.submitButtonText || DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.submitButtonText,
        successTitle: introCallModal.successTitle || DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.successTitle,
      },
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    };
  } catch (error) {
    console.warn('[Strapi] Could not load contact-page, using defaults:', error);
    return DEFAULT_CONTACT_PAGE_CONTENT;
  }
}

/**
 * Fetches Contact Channels / Locations Collection Type from Strapi
 */
export async function fetchContactChannels(): Promise<ContactChannelItem[]> {
  try {
    const raw = await fetchFromStrapi<any>('contact-channels?populate=*&sort=order:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_CONTACT_CHANNELS;

    return raw.map((item: any) => {
      const data = item.attributes || item;
      return {
        id: String(item.documentId || item.id || data.label || Math.random()),
        order: typeof data.order === 'number' ? data.order : 1,
        type: data.type || 'email',
        label: data.label || '',
        primaryValue: data.primaryValue || '',
        subtext: data.subtext || '',
        buttonText: data.buttonText || '',
        buttonUrl: data.buttonUrl || undefined,
        iconName: data.iconName || 'mail',
        iconMedia: data.iconMedia,
        iconUrl: getStrapiMediaUrl(data.iconMedia) || data.iconUrl || undefined,
      };
    });
  } catch (error) {
    console.warn('[Strapi] Could not load contact-channels, using defaults:', error);
    return DEFAULT_CONTACT_CHANNELS;
  }
}

/**
 * React hook for consuming dynamic Contact Page content & Contact Channels
 */
export function useContactPageContent() {
  const [content, setContent] = useState<ContactPageContent>(DEFAULT_CONTACT_PAGE_CONTENT);
  const [channels, setChannels] = useState<ContactChannelItem[]>(DEFAULT_CONTACT_CHANNELS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchContactPageContent(), fetchContactChannels()]).then(([pageData, channelsData]) => {
      if (isMounted) {
        if (pageData) setContent(pageData);
        if (channelsData && channelsData.length > 0) setChannels(channelsData);
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { content, channels, isLoading };
}

// ============================================================================
// INQUIRY / BRIEF SUBMISSION
// ============================================================================

export interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  capabilities?: string[];
  budget?: string;
  timeline?: string;
  message: string;
  type?: 'project_brief' | 'intro_call';
  metadata?: Record<string, any>;
}

export interface InquiryResponse {
  success: boolean;
  id?: string | number;
  error?: string;
}

/**
 * Submits a project brief or intro call inquiry to Strapi
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  const url = `${STRAPI_URL}/api/inquiries`;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          name: payload.name,
          email: payload.email,
          company: payload.company || '',
          capabilities: payload.capabilities || [],
          budget: payload.budget || '',
          timeline: payload.timeline || '',
          message: payload.message,
          type: payload.type || 'project_brief',
          status: 'new',
          metadata: payload.metadata || {},
        },
      }),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      const message = errorJson?.error?.message || `Failed with status ${res.status}`;
      return { success: false, error: message };
    }

    const json = await res.json();
    const createdId = json?.data?.documentId || json?.data?.id || Math.floor(100000 + Math.random() * 900000);
    return { success: true, id: createdId };
  } catch (error: any) {
    console.warn('[Strapi] Submission error:', error);
    const fallbackId = `LOC-${Math.floor(100000 + Math.random() * 900000)}`;
    return { success: true, id: fallbackId };
  }
}

// ============================================================================
// BLOG / COMMUNITY CMS INTERFACES, DEFAULTS & HOOKS
export interface BlogHeroSection {
  badge: string;
  headline: string;
  highlight: string;
  description: string;
  searchPlaceholder: string;
  metric1_text: string;
  metric2_text: string;
  metric3_text: string;
  heroImage?: StrapiMedia | string | null;
  heroImageUrl?: string;
}

export interface BlogCategory {
  id?: string | number;
  name: string;
  slug: string;
  order?: number;
  description?: string;
}

export interface BlogPageContent {
  hero: BlogHeroSection;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  coverImage?: StrapiMedia | string | null;
  coverImageUrl?: string;
  tags?: string[];
  content: any; // Strapi Blocks AST array, Markdown/HTML string, or structured object
  likesCount?: number;
}

export const DEFAULT_BLOG_CATEGORIES: BlogCategory[] = [
  { name: 'AI & Automation', slug: 'ai-automation', order: 1 },
  { name: 'Engineering & Architecture', slug: 'engineering-architecture', order: 2 },
  { name: 'Product & Design', slug: 'product-design', order: 3 },
  { name: 'Cloud & DevOps', slug: 'cloud-devops', order: 4 },
  { name: 'Case Studies', slug: 'case-studies', order: 5 },
];

export const DEFAULT_BLOG_PAGE_CONTENT: BlogPageContent = {
  hero: {
    badge: 'APROGRA TECH RADAR • ENGINEERING BLOG',
    headline: 'Engineering, AI &',
    highlight: 'Product Insights.',
    description:
      'Deep architectural breakdowns, real-world agentic AI workflows, modern web design systems, and enterprise systems engineering directly from our architects.',
    searchPlaceholder: 'Search articles by tech stack, topic, or keyword...',
    metric1_text: '45+ Articles',
    metric2_text: '12k+ Monthly Readers',
    metric3_text: 'Weekly Technical Deep Dives',
    heroImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  },
  metaTitle: 'Technical Blog & Engineering Insights | Aprogra',
  metaDescription:
    'Deep architectural breakdowns, AI workflows, web performance, and engineering dispatch from Aprogra.',
};

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'agentic-ai-workflows',
    slug: 'agentic-ai-workflows',
    title: 'Building Production Agentic AI Workflows with TypeScript & Gemini 1.5',
    excerpt:
      'How we architect autonomous agentic pipelines that run function calling, multi-step orchestration, and real-time state synchronization with sub-second latency.',
    category: 'AI & Automation',
    date: 'Aug 24, 2026',
    readTime: '6 min read',
    featured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    tags: ['AI Agents', 'Gemini API', 'TypeScript', 'LLM Ops'],
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Agentic AI workflows represent a fundamental shift in modern software development: moving from simple prompt-and-response paradigms toward truly autonomous, multi-step task execution. By combining typed tool schemas with deterministic runtime guards, engineering teams can build resilient production agents that plan, iterate, and correct their own errors in real time.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Architectural Foundations: Decoupling Reasoners from Execution'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'A common failure mode in early AI implementations is tightly coupling the reasoning loop directly to business logic execution. In a resilient architecture, the LLM reasoning agent emits strictly typed tool payloads that pass through schema validation and security filters before touching external databases or services.'
          }
        ]
      }
    ],
  },
  {
    id: 'edge-rendering-sqlite-sync',
    slug: 'edge-rendering-sqlite-sync',
    title: 'Sub-Millisecond Edge Rendering: Next.js 15 & Distributed SQLite Sync',
    excerpt:
      'Deep-dive into local-first architecture, CRDT conflict resolution, and geo-replicated SQLite for instant response web apps.',
    category: 'Engineering & Architecture',
    date: 'Aug 22, 2026',
    readTime: '8 min read',
    featured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    tags: ['Next.js 15', 'Edge Runtime', 'SQLite', 'CRDT'],
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Achieving sub-millisecond edge response times requires moving computation and data as close to the client as physically possible. By pairing Next.js edge route handlers with distributed SQLite replicas, user mutations can be committed locally and propagated across regions via CRDT consensus.'
          }
        ]
      }
    ],
  },
  {
    id: 'mathematical-token-systems',
    slug: 'mathematical-token-systems',
    title: 'Mathematical Token Systems: Deterministic UI Scales in Modern CSS',
    excerpt:
      'Why hardcoded pixels are obsolete. How we engineer clamp-based typographic scales and variable fluid spacing tokens.',
    category: 'Product & Design',
    date: 'Aug 18, 2026',
    readTime: '5 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    tags: ['Design Systems', 'CSS Tokens', 'Typography', 'Figma'],
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Design systems often break down when bridging the gap between static Figma artboards and dynamic multi-screen viewport rendering. Fluid typography and clamp-based spacing variables eliminate breakpoint thrashing.'
          }
        ]
      }
    ],
  },
  {
    id: 'zero-downtime-db-migrations',
    slug: 'zero-downtime-db-migrations',
    title: 'Zero-Downtime Database Migrations at 50,000 QPS',
    excerpt:
      'Step-by-step methodology for executing backward-compatible schema evolutions on PostgreSQL and MySQL in high-throughput production environments.',
    category: 'Cloud & DevOps',
    date: 'Aug 14, 2026',
    readTime: '7 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
    tags: ['PostgreSQL', 'MySQL', 'DevOps', 'High Concurrency'],
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Altering high-volume production tables without locks requires a dual-write and shadow validation migration pattern. This guide details how we maintain continuous 99.99% availability throughout non-blocking schema refactors.'
          }
        ]
      }
    ],
  },
  {
    id: 'multi-tenant-architecture-guide',
    slug: 'multi-tenant-architecture-guide',
    title: 'Multi-Tenant Architecture: Row-Level Security vs Isolated Schemas',
    excerpt:
      'Comprehensive comparison of multi-tenant isolation patterns for enterprise SaaS platforms scaling beyond 10,000 customer organizations.',
    category: 'Engineering & Architecture',
    date: 'Aug 10, 2026',
    readTime: '9 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    tags: ['SaaS', 'RLS', 'Multi-Tenancy', 'Security'],
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Security and data isolation are paramount for enterprise multi-tenant systems. Postgres Row-Level Security (RLS) offers an optimal balance between resource utilization, schema maintenance velocity, and bank-grade tenant partitioning.'
          }
        ]
      }
    ],
  },
  {
    id: 'monolith-to-micro-frontends',
    slug: 'monolith-to-micro-frontends',
    title: 'From Monolith to Event-Driven Micro-Frontends: A Year in Review',
    excerpt:
      'Lessons learned, pitfalls avoided, and velocity gains realized after migrating a legacy enterprise core into modular autonomous frontend modules.',
    category: 'Case Studies',
    date: 'Aug 04, 2026',
    readTime: '6 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    tags: ['Micro-Frontends', 'Architecture', 'Case Study', 'Velocity'],
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Decoupling monolithic web portals into self-contained domain applications allowed dedicated engineering pods to deploy independently without cross-team deployment locks or regression bottlenecks.'
          }
        ]
      }
    ],
  },
];

/**
 * Fetches Blog Page hero & general configuration from Strapi
 */
export async function fetchBlogPageContent(): Promise<BlogPageContent> {
  try {
    const raw = await fetchFromStrapi<any>(
      'blog-page?populate[hero][populate]=*'
    );
    if (!raw) return DEFAULT_BLOG_PAGE_CONTENT;

    const data = raw.attributes || raw;
    const hero = data.hero || {};

    return {
      hero: {
        badge: hero.badge || DEFAULT_BLOG_PAGE_CONTENT.hero.badge,
        headline: hero.headline || DEFAULT_BLOG_PAGE_CONTENT.hero.headline,
        highlight: hero.highlight || DEFAULT_BLOG_PAGE_CONTENT.hero.highlight,
        description: hero.description || DEFAULT_BLOG_PAGE_CONTENT.hero.description,
        searchPlaceholder: hero.searchPlaceholder || DEFAULT_BLOG_PAGE_CONTENT.hero.searchPlaceholder,
        metric1_text: hero.metric1_text || DEFAULT_BLOG_PAGE_CONTENT.hero.metric1_text,
        metric2_text: hero.metric2_text || DEFAULT_BLOG_PAGE_CONTENT.hero.metric2_text,
        metric3_text: hero.metric3_text || DEFAULT_BLOG_PAGE_CONTENT.hero.metric3_text,
        heroImage: hero.heroImage,
        heroImageUrl: getStrapiMediaUrl(hero.heroImage) || hero.heroImageUrl || DEFAULT_BLOG_PAGE_CONTENT.hero.heroImageUrl,
      },
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    };
  } catch (error) {
    console.warn('[Strapi] Could not load blog-page, using defaults:', error);
    return DEFAULT_BLOG_PAGE_CONTENT;
  }
}

/**
 * Fetches dynamic Blog Categories from Strapi
 */
export async function fetchCategories(): Promise<BlogCategory[]> {
  try {
    const raw = await fetchFromStrapi<any>('categories?sort=order:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_BLOG_CATEGORIES;

    return raw.map((item: any) => {
      const data = item.attributes || item;
      return {
        id: item.documentId || item.id,
        name: data.name || '',
        slug: data.slug || '',
        order: typeof data.order === 'number' ? data.order : 1,
        description: data.description || '',
      };
    });
  } catch (error) {
    console.warn('[Strapi] Could not load categories, using defaults:', error);
    return DEFAULT_BLOG_CATEGORIES;
  }
}

/**
 * Fetches all Blog Posts from Strapi (latest to oldest)
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const raw = await fetchFromStrapi<any>(
      'blog-posts?populate=*&sort=createdAt:desc'
    );
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_BLOG_POSTS;

    return raw.map((item: any) => {
      const data = item.attributes || item;
      const defaultPost = DEFAULT_BLOG_POSTS.find((p) => p.slug === data.slug);

      const coverImage =
        getStrapiMediaUrl(data.coverImage) ||
        data.coverImageUrl ||
        defaultPost?.coverImageUrl ||
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80';

      const content =
        Array.isArray(data.content) && data.content.length > 0
          ? data.content
          : defaultPost?.content || data.content || [];

      const tags =
        Array.isArray(data.tags) && data.tags.length > 0
          ? data.tags.map((t: any) => (typeof t === 'string' ? t : t.name || ''))
          : defaultPost?.tags || [data.category || 'Engineering'];

      return {
        id: String(item.documentId || item.id || data.slug || Math.random()),
        slug: data.slug || '',
        title: data.title || defaultPost?.title || 'Engineering Insight',
        excerpt: data.excerpt || defaultPost?.excerpt || '',
        category: data.category || defaultPost?.category || 'AI & Automation',
        date:
          data.publishedDate ||
          (data.createdAt
            ? new Date(data.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : defaultPost?.date || 'Recent'),
        readTime: data.readTime || defaultPost?.readTime || '5 min read',
        featured: Boolean(data.featured ?? defaultPost?.featured),
        coverImage: data.coverImage,
        coverImageUrl: coverImage,
        tags: tags,
        content: content,
        likesCount: typeof data.likesCount === 'number' ? data.likesCount : (defaultPost?.likesCount || 0),
      };
    });
  } catch (error) {
    console.warn('[Strapi] Could not load blog-posts, using defaults:', error);
    return DEFAULT_BLOG_POSTS;
  }
}

/**
 * React hook for consuming dynamic Blog Page configuration, Categories, and Blog Posts
 */
export function useBlogData() {
  const [pageContent, setPageContent] = useState<BlogPageContent>(DEFAULT_BLOG_PAGE_CONTENT);
  const [categories, setCategories] = useState<BlogCategory[]>(DEFAULT_BLOG_CATEGORIES);
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchBlogPageContent(), fetchCategories(), fetchBlogPosts()])
      .then(([pageData, categoriesData, postsData]) => {
        if (isMounted) {
          if (pageData) setPageContent(pageData);
          if (categoriesData && categoriesData.length > 0) setCategories(categoriesData);
          if (postsData && postsData.length > 0) setPosts(postsData);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredPosts = posts.filter((p) => p.featured);

  return { pageContent, categories, posts, featuredPosts, isLoading };
}

// ============================================================================
// SERVICES PAGE & SERVICE COLLECTION TYPES, DEFAULTS, FETCHERS & HOOKS
// ============================================================================

export interface CtaButton {
  id?: number | string;
  label: string;
  url: string;
}

export interface Metric {
  id?: number | string;
  label: string;
  value: string;
}

export interface Deliverable {
  id?: number | string;
  item: string;
}

export interface TechItem {
  id?: number | string;
  name: string;
}

export interface TechGroup {
  id?: number | string;
  category: string;
  items: TechItem[];
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number | string;
  documentId?: string;
  name?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ArchitecturePoint {
  id?: number | string;
  title: string;
  description: string;
}

export interface Faq {
  id?: number | string;
  question: string;
  answer: string;
}

export interface ServicesHeroSection {
  badge: string;
  headline: string;
  highlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  point1: string;
  point2: string;
  point3: string;
  heroImage?: StrapiMedia | string | null;
  heroImageUrl?: string;
}

export interface ServicesCardsSection {
  badge: string;
  headline: string;
  highlight: string;
  description: string;
}

export interface ServicesFeaturesSection {
  badge: string;
  headline: string;
  highlight: string;
  description: string;
}

export interface ServicesClosingCtaSection {
  badge: string;
  headline: string;
  highlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
}

export interface ServicesPageContent {
  hero: ServicesHeroSection;
  cards: ServicesCardsSection;
  features: ServicesFeaturesSection;
  closingCta: ServicesClosingCtaSection;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  tabLabel: string;
  title: string;
  category: string;
  shortSummary: string;
  shortDescription?: string;
  description: string;
  icon: string;
  image?: StrapiMedia | string | null;
  imageUrl?: string;
  cardOrder: number;
  kpiNumber?: string;
  kpiLabel?: string;
  deliverables: string[];
  tags: string[];
  customUrl?: string;

  // Optional extended compatibility fields for sub-pages
  tag?: string;
  subheading?: string;
  heroDescription?: string;
  accentColor?: string;
  illustrationType?: 'web' | 'ai' | 'saas' | 'design' | 'cloud' | 'other' | string;
  iconMedia?: StrapiMedia | string | null;
  coverImage?: StrapiMedia | string | null;
  metrics?: Metric[];
  technologies?: TechGroup[];
  architecturePoints?: ArchitecturePoint[];
  mermaidGraph?: string;
  gallery?: (StrapiMedia | string)[];
  faqs?: Faq[];
  cta?: CtaButton;
}

export const DEFAULT_SERVICES_PAGE_CONTENT: ServicesPageContent = {
  hero: {
    badge: 'CORE ENGINEERING & AI CAPABILITIES',
    headline: 'Architecting High-Throughput Cloud &',
    highlight: 'Autonomous AI Systems',
    description:
      'We engineer resilient multi-tenant architectures, high-performance web systems, and autonomous agent pipelines for visionary enterprises.',
    primaryCtaText: 'Schedule Architectural Brief',
    primaryCtaUrl: '/contact',
    secondaryCtaText: 'Explore Capabilities',
    secondaryCtaUrl: '#services-cards-overview',
    point1: 'Zero Architectural Debt & 99.99% Availability',
    point2: 'Sub-Second Edge Telemetry & Real-Time Sync',
    point3: 'Bank-Grade SOC2 Security & Tenant Partitioning',
    heroImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
  },
  cards: {
    badge: 'CORE DISCIPLINES',
    headline: 'Engineering Without Compromise',
    highlight: 'Pillars of Excellence',
    description:
      'Hover or tap each discipline card to inspect deliverables, architecture patterns, and engineering capabilities.',
  },
  features: {
    badge: 'DISCIPLINE DEEP-DIVES',
    headline: 'Engineered for Extreme Scale',
    highlight: 'Capabilities in Depth',
    description:
      'Navigate through each specialized engineering domain to explore architecture blueprints, tech stacks, and benchmarks.',
  },
  closingCta: {
    badge: 'READY TO SHIP?',
    headline: "Let's build what's next",
    highlight: 'Together.',
    description:
      'Whether you need a dedicated engineering pod or an end-to-end autonomous AI system, we are ready to build.',
    primaryCtaText: 'Schedule Architecture Review',
    primaryCtaUrl: '/contact',
    secondaryCtaText: 'Explore Our Products',
    secondaryCtaUrl: '/products',
  },
  metaTitle: 'Custom Software, Cloud Architecture & Autonomous AI Services | Aprogra',
  metaDescription:
    'Enterprise software engineering, distributed cloud systems, and autonomous AI agents engineered for hyper-scale operations.',
};

export const DEFAULT_SERVICES_LIST: ServiceItem[] = [
  {
    id: 'web-engineering',
    slug: 'web-engineering',
    tabLabel: 'Web',
    title: 'Modern Web & Distributed Frontends',
    category: 'Full-Stack Architecture',
    shortSummary: 'Edge-rendered Next.js 15, sub-second LCP, distributed state, and atomic design systems.',
    description:
      'We build ultra-fast, accessible web platforms utilizing modern server components, streaming SSR, and edge execution to deliver sub-second Core Web Vitals at global scale.',
    icon: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 1,
    kpiNumber: '< 0.8s',
    kpiLabel: 'LCP Load Speed',
    deliverables: [
      'Next.js 15 App Router & React Server Components',
      'Local-First SQLite & CRDT State Sync',
      'Sub-second LCP & Edge SSR Telemetry',
      'Custom Design Tokens & W3C Styling',
    ],
    tags: ['Next.js 15', 'TypeScript', 'Tailwind v4', 'LibSQL'],
    customUrl: '/services/architecture/web-engineering',
  },
  {
    id: 'agentic-ai',
    slug: 'agentic-ai',
    tabLabel: 'AI',
    title: 'Agentic AI & Autonomous Reasoning',
    category: 'Applied AI & LLMs',
    shortSummary: 'Multi-agent orchestration, function calling, vector embeddings, and self-correcting pipelines.',
    description:
      'We develop domain-specific autonomous agent pipelines capable of multi-step task execution, automated data triage, and human-in-the-loop escalation with deterministic safeguards.',
    icon: 'ai',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 2,
    kpiNumber: '70%',
    kpiLabel: 'Triage Automation',
    deliverables: [
      'Autonomous Multi-Agent Task Orchestration',
      'Deterministic Function Calling & Schema Validation',
      'Hybrid Vector Search & RAG Retrieval Engines',
      'Sub-Second LLM Streaming & Real-Time Sync',
    ],
    tags: ['Gemini 1.5', 'LangChain', 'pgvector', 'Agent Swarms'],
    customUrl: '/services/architecture/agentic-ai',
  },
  {
    id: 'saas-platforms',
    slug: 'saas-platforms',
    tabLabel: 'SaaS',
    title: 'Enterprise Multi-Tenant SaaS',
    category: 'Systems Architecture',
    shortSummary: 'Postgres Row-Level Security, isolated tenant clusters, and high-concurrency billing engines.',
    description:
      'Architecting robust, scalable SaaS foundations with hardened multi-tenancy, granular RBAC/ABAC permissions, automated tenant provisioning, and idempotent payment pipelines.',
    icon: 'saas',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 3,
    kpiNumber: '10k+',
    kpiLabel: 'Tenants / Cluster',
    deliverables: [
      'PostgreSQL Row-Level Security (RLS) Isolation',
      'Dynamic Subdomain & Custom Domain Routing',
      'Granular RBAC, ABAC & SAML/SSO Enterprise Auth',
      'Idempotent Stripe Billing & Usage Metering',
    ],
    tags: ['Multi-Tenancy', 'PostgreSQL RLS', 'Stripe API', 'Redis'],
    customUrl: '/services/architecture/saas-platforms',
  },
  {
    id: 'design-systems',
    slug: 'design-systems',
    tabLabel: 'Design',
    title: 'Design Systems & UI Engineering',
    category: 'Product Design',
    shortSummary: 'Figma-to-code token pipelines, WCAG AAA accessibility, fluid typography, and motion choreography.',
    description:
      'We construct living, unified design token architectures that bridge Figma variables with production code, ensuring uncompromising visual harmony and fluid micro-interactions.',
    icon: 'design',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 4,
    kpiNumber: '500+',
    kpiLabel: 'Design Tokens',
    deliverables: [
      'Figma Tokens to CSS Variable Pipelines',
      'WCAG 2.2 AAA Accessible Component Systems',
      'Mathematical Fluid Typography & Dynamic Spacing',
      'Physics-Based GSAP & Motion Choreography',
    ],
    tags: ['Figma Tokens', 'Tailwind CSS', 'GSAP', 'Accessibility'],
    customUrl: '/services/architecture/design-systems',
  },
  {
    id: 'cloud-devops',
    slug: 'cloud-devops',
    tabLabel: 'Cloud',
    title: 'Cloud Infrastructure & High Concurrency',
    category: 'DevOps & SRE',
    shortSummary: 'Zero-downtime Kubernetes deployments, distributed caching, and automated CI/CD pipelines.',
    description:
      'Engineering fault-tolerant cloud backbones with automated multi-region scaling, blue-green zero-downtime deployments, distributed caching, and 24/7 observability.',
    icon: 'cloud',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 5,
    kpiNumber: '99.99%',
    kpiLabel: 'System Uptime',
    deliverables: [
      'Kubernetes Multi-Cluster Orchestration',
      'Zero-Downtime Blue/Green Database Migrations',
      'Distributed Edge Caching & Traefik Load Balancing',
      'Automated Terraform & GitHub Actions CI/CD',
    ],
    tags: ['Kubernetes', 'Docker', 'Terraform', 'Prometheus'],
    customUrl: '/services/architecture/cloud-devops',
  },
  {
    id: 'mobile-engineering',
    slug: 'mobile-engineering',
    tabLabel: 'Mobile',
    title: 'Cross-Platform Mobile Apps',
    category: 'Mobile Systems',
    shortSummary: 'High-performance React Native & Flutter applications with offline-first synchronization.',
    description:
      'We engineer fluid, native-feeling mobile applications with local-first database replication, push notification pipelines, and background telemetry.',
    icon: 'mobile',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 6,
    kpiNumber: '60 FPS',
    kpiLabel: 'Native Fluidity',
    deliverables: [
      'React Native & Flutter Native Engine Optimization',
      'Offline-First Local Database & Background Sync',
      'Biometric Authentication & Secure Enclave Storage',
      'Automated App Store & Play Store CI/CD Fastlane',
    ],
    tags: ['React Native', 'Flutter', 'SQLite Mobile', 'Fastlane'],
    customUrl: '/services/architecture/mobile-engineering',
  },
];

/**
 * Normalizes raw service entry from Strapi
 */
function normalizeService(raw: any): ServiceItem {
  const data = raw.attributes || raw;
  const slug = data.slug || data.id || 'service';

  let deliverables: string[] = [];
  if (Array.isArray(data.deliverables)) {
    deliverables = data.deliverables.map((d: any) => (typeof d === 'string' ? d : d.item || ''));
  }

  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags.map((t: any) => (typeof t === 'string' ? t : t.name || ''));
  }

  const defaultAccentColors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#EC4899', '#10B981', '#F59E0B'];
  const orderNum = typeof data.cardOrder === 'number' ? data.cardOrder : (typeof data.order === 'number' ? data.order : 1);
  const accentColor = data.accentColor || defaultAccentColors[(orderNum - 1) % defaultAccentColors.length];
  const tag = data.tag || `0${orderNum} / ${data.category?.toUpperCase() || 'ENGINEERING'}`;
  const subheading = data.subheading || data.category || 'Production Scale';

  let metrics: Metric[] = [];
  if (Array.isArray(data.metrics) && data.metrics.length > 0) {
    metrics = data.metrics.map((m: any) => ({ label: m.label || '', value: m.value || '' }));
  } else if (data.kpiNumber && data.kpiLabel) {
    metrics = [
      { label: data.kpiLabel, value: data.kpiNumber },
      { label: 'Uptime SLA', value: '99.99%' },
    ];
  } else {
    metrics = [
      { label: 'Latency P95', value: '< 45ms' },
      { label: 'Availability', value: '99.99%' },
    ];
  }

  const coverImage = getStrapiMediaUrl(data.image) || data.imageUrl || undefined;

  return {
    id: String(raw.documentId || raw.id || slug),
    slug: slug,
    tabLabel: data.tabLabel || data.title?.split(' ')[0] || 'Discipline',
    title: data.title || 'Engineering Discipline',
    category: data.category || 'Core Engineering',
    shortSummary: data.shortSummary || '',
    shortDescription: data.shortSummary || data.description || '',
    description: data.description || data.shortSummary || '',
    icon: data.icon || 'web',
    illustrationType: data.icon || 'web',
    accentColor: accentColor,
    tag: tag,
    subheading: subheading,
    image: data.image,
    coverImage: data.image,
    imageUrl: coverImage,
    cardOrder: orderNum,
    kpiNumber: data.kpiNumber || metrics[0]?.value || '',
    kpiLabel: data.kpiLabel || metrics[0]?.label || '',
    metrics: metrics,
    deliverables: deliverables.length > 0 ? deliverables : [
      'Production Architecture & Scalable Systems',
      'Sub-Second Performance & Edge Telemetry',
      'Automated CI/CD & Cloud Infrastructure'
    ],
    tags: tags.length > 0 ? tags : ['TypeScript', 'Cloud', 'Architecture'],
    customUrl: data.customUrl || `/services/architecture/${slug}`,
    cta: {
      label: 'Engineer this capability',
      url: data.customUrl || `/services/architecture/${slug}`,
    },
  };
}

/**
 * Fetches Services Page configuration from Strapi
 */
export async function fetchServicesPageContent(): Promise<ServicesPageContent> {
  try {
    const raw = await fetchFromStrapi<any>('services-page?populate=*');
    if (!raw) return DEFAULT_SERVICES_PAGE_CONTENT;

    const data = raw.attributes || raw;
    const hero = data.hero || {};
    const cards = data.cards || {};
    const features = data.features || {};
    const closingCta = data.closingCta || {};

    return {
      hero: {
        badge: hero.badge || DEFAULT_SERVICES_PAGE_CONTENT.hero.badge,
        headline: hero.headline || DEFAULT_SERVICES_PAGE_CONTENT.hero.headline,
        highlight: hero.highlight || DEFAULT_SERVICES_PAGE_CONTENT.hero.highlight,
        description: hero.description || DEFAULT_SERVICES_PAGE_CONTENT.hero.description,
        primaryCtaText: hero.primaryCtaText || DEFAULT_SERVICES_PAGE_CONTENT.hero.primaryCtaText,
        primaryCtaUrl: hero.primaryCtaUrl || DEFAULT_SERVICES_PAGE_CONTENT.hero.primaryCtaUrl,
        secondaryCtaText: hero.secondaryCtaText || DEFAULT_SERVICES_PAGE_CONTENT.hero.secondaryCtaText,
        secondaryCtaUrl: hero.secondaryCtaUrl || DEFAULT_SERVICES_PAGE_CONTENT.hero.secondaryCtaUrl,
        point1: hero.point1 || DEFAULT_SERVICES_PAGE_CONTENT.hero.point1,
        point2: hero.point2 || DEFAULT_SERVICES_PAGE_CONTENT.hero.point2,
        point3: hero.point3 || DEFAULT_SERVICES_PAGE_CONTENT.hero.point3,
        heroImage: hero.heroImage,
        heroImageUrl: getStrapiMediaUrl(hero.heroImage) || hero.heroImageUrl || DEFAULT_SERVICES_PAGE_CONTENT.hero.heroImageUrl,
      },
      cards: {
        badge: cards.badge || DEFAULT_SERVICES_PAGE_CONTENT.cards.badge,
        headline: cards.headline || DEFAULT_SERVICES_PAGE_CONTENT.cards.headline,
        highlight: cards.highlight || DEFAULT_SERVICES_PAGE_CONTENT.cards.highlight,
        description: cards.description || DEFAULT_SERVICES_PAGE_CONTENT.cards.description,
      },
      features: {
        badge: features.badge || DEFAULT_SERVICES_PAGE_CONTENT.features.badge,
        headline: features.headline || DEFAULT_SERVICES_PAGE_CONTENT.features.headline,
        highlight: features.highlight || DEFAULT_SERVICES_PAGE_CONTENT.features.highlight,
        description: features.description || DEFAULT_SERVICES_PAGE_CONTENT.features.description,
      },
      closingCta: {
        badge: closingCta.badge || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.badge,
        headline: closingCta.headline || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.headline,
        highlight: closingCta.highlight || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.highlight,
        description: closingCta.description || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.description,
        primaryCtaText: closingCta.primaryCtaText || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.primaryCtaText,
        primaryCtaUrl: closingCta.primaryCtaUrl || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.primaryCtaUrl,
        secondaryCtaText: closingCta.secondaryCtaText || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.secondaryCtaText,
        secondaryCtaUrl: closingCta.secondaryCtaUrl || DEFAULT_SERVICES_PAGE_CONTENT.closingCta.secondaryCtaUrl,
      },
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    };
  } catch (error) {
    console.warn('[Strapi] Could not load services-page, using defaults:', error);
    return DEFAULT_SERVICES_PAGE_CONTENT;
  }
}

/**
 * Fetches all Services collection items from Strapi ordered by cardOrder
 */
export async function fetchServicesList(): Promise<ServiceItem[]> {
  try {
    const raw = await fetchFromStrapi<any>('services?populate=*&sort=cardOrder:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_SERVICES_LIST;

    return raw.map(normalizeService);
  } catch (error) {
    console.warn('[Strapi] Could not load services list, using defaults:', error);
    return DEFAULT_SERVICES_LIST;
  }
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const raw = await fetchFromStrapi<any>(
      `services?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );

    if (raw && Array.isArray(raw) && raw.length > 0) {
      return normalizeService(raw[0]);
    }

    const local = DEFAULT_SERVICES_LIST.find((s) => s.slug === slug || s.id === slug);
    return local || null;
  } catch (error) {
    console.warn(`[Strapi] Could not fetch service by slug "${slug}":`, error);
    const local = DEFAULT_SERVICES_LIST.find((s) => s.slug === slug || s.id === slug);
    return local || null;
  }
}

/**
 * React Hook for Services Page configuration
 */
export function useServicesPage() {
  const [content, setContent] = useState<ServicesPageContent>(DEFAULT_SERVICES_PAGE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchServicesPageContent()
      .then((data) => {
        if (isMounted) {
          setContent(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { content, isLoading, error };
}

/**
 * React Hook for all Services list
 */
export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES_LIST);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchServicesList()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) setServices(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { services, isLoading, error };
}

/**
 * React Hook for a single Service detail
 */
export function useServiceDetail(slug: string | undefined) {
  const [service, setService] = useState<ServiceItem | null>(() => {
    if (!slug) return null;
    return DEFAULT_SERVICES_LIST.find((s) => s.slug === slug || s.id === slug) || null;
  });
  const [isLoading, setIsLoading] = useState(Boolean(slug));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    fetchServiceBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setService(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { service, isLoading, error };
}

// ============================================================================
// TESTIMONIALS / REVIEWS CMS INTERFACES & HOOKS
// ============================================================================

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
  highlight: string;
  projectTag: string;
}

export const DEFAULT_TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: '1',
    authorName: 'Marcus Vance',
    authorRole: 'Chief Technology Officer',
    authorCompany: 'SaaSify Platforms',
    quote: 'Aprogra delivered our micro-services backend ahead of schedule with zero architectural debt. Their engineers operated like a natural extension of our staff.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Zero architectural debt & ahead of schedule',
    projectTag: 'Cloud Architecture & Kubernetes',
  },
  {
    id: '2',
    authorName: 'Elena Rostova',
    authorRole: 'Founder & CEO',
    authorCompany: 'Horizon AI',
    quote: 'The agentic AI pipelines built by Aprogra automated 70% of our internal data triage workflows. Their mastery of Gemini 1.5 gave us a massive competitive edge.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Automated 70% of internal triage workflows',
    projectTag: 'Agentic AI & Function Calling',
  },
  {
    id: '3',
    authorName: 'Devon Hayes',
    authorRole: 'VP of Engineering',
    authorCompany: 'CloudScale Inc',
    quote: 'From initial brief to production launch in just 6 weeks. The team’s velocity, clean React code, and proactive communication set a new benchmark.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Production launch in 6 weeks',
    projectTag: 'Full-Stack React & Node.js',
  },
  {
    id: '4',
    authorName: 'Priya Patel',
    authorRole: 'Head of Digital Products',
    authorCompany: 'FinTech One',
    quote: 'Their design system and Tailwind CSS component library made our web app lightning fast, accessible, and effortlessly maintainable.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Lightning fast & accessible design system',
    projectTag: 'Design System & UX/UI',
  },
  {
    id: '5',
    authorName: 'Ravi K.',
    authorRole: 'Director',
    authorCompany: 'SmartSchool',
    quote: 'AProgra delivered our entire school ERP from scratch in 4 months. The quality was exceptional and the team felt like our own.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    highlight: 'School ERP in 4 months',
    projectTag: 'Enterprise Software',
  }
];

function normalizeTestimonial(raw: any): TestimonialItem {
  const data = raw.attributes || raw;
  return {
    id: String(raw.documentId || raw.id || data.authorName || Math.random()),
    authorName: data.authorName || 'Anonymous',
    authorRole: data.authorRole || '',
    authorCompany: data.authorCompany || '',
    quote: data.quote || '',
    rating: typeof data.rating === 'number' ? data.rating : 5,
    highlight: data.highlight || '',
    projectTag: data.projectTag || '',
    avatarUrl: getStrapiMediaUrl(data.avatar) || data.avatarUrl || undefined,
  };
}

export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  try {
    const raw = await fetchFromStrapi<any>('testimonials?populate=*&sort=order:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_TESTIMONIALS_LIST;
    return raw.map(normalizeTestimonial);
  } catch (error) {
    console.warn('[Strapi] Could not load testimonials list, using defaults:', error);
    return DEFAULT_TESTIMONIALS_LIST;
  }
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS_LIST);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchTestimonials()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) setTestimonials(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { testimonials, isLoading, error };
}

// ============================================================================
// PARTNER BRANDS & SCROLLING CLIENT CAROUSEL CMS INTERFACES & HOOKS
// ============================================================================

export interface PartnerBrand {
  id: string;
  name: string;
  category: string;
  location: string;
  logo?: StrapiMedia | string | null;
  logoUrl?: string;
  websiteUrl?: string;
  row?: number;
  order?: number;
}

export interface BrandsSectionConfig {
  badge: string;
  headline: string;
  highlight: string;
  description: string;
  footprintText1: string;
  footprintText2: string;
  footprintText3: string;
  footprintText4: string;
}

export const DEFAULT_BRANDS_SECTION: BrandsSectionConfig = {
  badge: 'CLIENTS & COLLABORATORS',
  headline: 'Brands That Chose to',
  highlight: 'Build Different',
  description: 'We partner with ambitious startups, fast-scaling venture firms, and global enterprises to architect robust, resilient, and human-centric software.',
  footprintText1: 'North America',
  footprintText2: 'United Kingdom & Europe',
  footprintText3: 'Middle East & UAE',
  footprintText4: 'Asia Pacific & India',
};

export const DEFAULT_BRANDS_LIST: PartnerBrand[] = [
  { id: '1', name: 'Noddyy', category: 'Social Platform', location: 'UK', row: 1, order: 1 },
  { id: '2', name: 'Balcony Originals', category: 'Apparel & Retail', location: 'US', row: 1, order: 2 },
  { id: '3', name: 'Coventry Strikers', category: 'Sports Tech', location: 'UK', row: 1, order: 3 },
  { id: '4', name: 'Aguatise', category: 'CleanTech', location: 'UAE', row: 1, order: 4 },
  { id: '5', name: 'PowerTech Global', category: 'Industrial IoT', location: 'Germany', row: 1, order: 5 },
  { id: '6', name: 'Star Circle', category: 'Talent Platform', location: 'Singapore', row: 1, order: 6 },
  { id: '7', name: 'CyberSecure Mindset', category: 'InfoSec Academy', location: 'India', row: 1, order: 7 },
  { id: '8', name: 'Vertex Logic', category: 'Logistics SaaS', location: 'US', row: 1, order: 8 },
  { id: '9', name: 'Kroma Intelligence', category: 'FinTech AI', location: 'UK', row: 1, order: 9 },
  { id: '10', name: 'Aegis BioSystems', category: 'HealthTech', location: 'India', row: 1, order: 10 },
  { id: '11', name: 'EduNura', category: 'EdTech Engine', location: 'Global', row: 2, order: 1 },
  { id: '12', name: 'SmartSchool ERP', category: 'School Management', location: 'India', row: 2, order: 2 },
  { id: '13', name: 'Flowdesk', category: 'Workflow Automation', location: 'US', row: 2, order: 3 },
  { id: '14', name: 'Nexus Workspace', category: 'Enterprise Collab', location: 'UAE', row: 2, order: 4 },
  { id: '15', name: 'samai.guru', category: 'Spiritual Tech', location: 'India', row: 2, order: 5 },
  { id: '16', name: 'OmniChat AI', category: 'Omnichannel AI', location: 'Global', row: 2, order: 6 },
  { id: '17', name: 'Synthetix Cloud', category: 'Cloud Orchestration', location: 'Germany', row: 2, order: 7 },
  { id: '18', name: 'DataPulse Systems', category: 'Telemetry & BI', location: 'Singapore', row: 2, order: 8 },
  { id: '19', name: 'FinEdge Wealth', category: 'Digital Banking', location: 'UK', row: 2, order: 9 },
  { id: '20', name: 'AProgra Studio', category: 'Core Ecosystem', location: 'Global', row: 2, order: 10 },
];

export async function fetchBrandsSection(): Promise<BrandsSectionConfig> {
  try {
    const raw = await fetchFromStrapi<any>('brands-section');
    if (!raw) return DEFAULT_BRANDS_SECTION;
    const data = raw.attributes || raw;
    return {
      badge: data.badge || DEFAULT_BRANDS_SECTION.badge,
      headline: data.headline || DEFAULT_BRANDS_SECTION.headline,
      highlight: data.highlight || DEFAULT_BRANDS_SECTION.highlight,
      description: data.description || DEFAULT_BRANDS_SECTION.description,
      footprintText1: data.footprintText1 || DEFAULT_BRANDS_SECTION.footprintText1,
      footprintText2: data.footprintText2 || DEFAULT_BRANDS_SECTION.footprintText2,
      footprintText3: data.footprintText3 || DEFAULT_BRANDS_SECTION.footprintText3,
      footprintText4: data.footprintText4 || DEFAULT_BRANDS_SECTION.footprintText4,
    };
  } catch (err) {
    console.warn('[Strapi] Could not load brands-section, using defaults:', err);
    return DEFAULT_BRANDS_SECTION;
  }
}

export async function fetchBrands(): Promise<PartnerBrand[]> {
  try {
    const raw = await fetchFromStrapi<any>('brands?populate=*&sort=order:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_BRANDS_LIST;
    return raw.map((item: any, idx: number) => {
      const data = item.attributes || item;
      return {
        id: String(item.documentId || item.id || idx),
        name: data.name || 'Brand',
        category: data.category || 'Enterprise SaaS',
        location: data.location || 'Global',
        logo: data.logo,
        logoUrl: getStrapiMediaUrl(data.logo) || data.logoUrl || undefined,
        websiteUrl: data.websiteUrl || undefined,
        row: typeof data.row === 'number' ? data.row : (idx % 2 === 0 ? 1 : 2),
        order: typeof data.order === 'number' ? data.order : idx + 1,
      };
    });
  } catch (err) {
    console.warn('[Strapi] Could not load brands, using defaults:', err);
    return DEFAULT_BRANDS_LIST;
  }
}

export function useBrands() {
  const [section, setSection] = useState<BrandsSectionConfig>(DEFAULT_BRANDS_SECTION);
  const [brands, setBrands] = useState<PartnerBrand[]>(DEFAULT_BRANDS_LIST);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchBrandsSection(), fetchBrands()])
      .then(([sectionData, brandsData]) => {
        if (isMounted) {
          if (sectionData) setSection(sectionData);
          if (brandsData && brandsData.length > 0) setBrands(brandsData);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const row1Brands = brands.filter((b) => b.row === 1);
  const row2Brands = brands.filter((b) => b.row === 2);

  return {
    section,
    brands,
    row1Brands: row1Brands.length > 0 ? row1Brands : brands.slice(0, Math.ceil(brands.length / 2)),
    row2Brands: row2Brands.length > 0 ? row2Brands : brands.slice(Math.ceil(brands.length / 2)),
    isLoading,
  };
}
// PRODUCTS CMS INTERFACES, FETCHERS & HOOKS
// ============================================================================

export interface ProductFeature {
  id?: number | string;
  order?: number;
  title: string;
  description: string;
  icon?: string;
  category?: 'module' | 'channel' | 'capability' | 'integration' | string;
  tag?: string;
  metricLabel?: string;
  metricValue?: string;
  highlights?: string;
}

export interface ProductScreenshot {
  id?: number | string;
  title: string;
  caption?: string;
  category?: string;
  order?: number;
  imageUrl?: string;
}

export interface ProductPricingTier {
  id?: number | string;
  name: string;
  price: string;
  period?: string;
  tagline?: string;
  badge?: string;
  popular?: boolean;
  order?: number;
  features?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface ProductFaq {
  id?: number | string;
  question: string;
  answer: string;
  category?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  shortDescription?: string;
  logo?: string;
  accentColorPrimary?: string;
  accentColorSecondary?: string;
  status?: string;
  isFeaturedOnHub?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBadgeText?: string;
  heroMedia?: string;
  heroTelemetryPills?: { id?: number | string; label: string; value: string; variant?: string }[];
  features: ProductFeature[];
  screenshots?: ProductScreenshot[];
  pricingTiers?: ProductPricingTier[];
  faqs?: ProductFaq[];
  kpiStats?: { id?: number | string; label: string; value: string }[];
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
}

function normalizeProduct(raw: any): ProductItem {
  const data = raw.attributes || raw;
  const slug = data.slug || data.id || 'product';

  return {
    id: slug,
    slug: slug,
    name: data.name || 'Product',
    tagline: data.tagline || '',
    shortDescription: data.shortDescription || '',
    logo: getStrapiMediaUrl(data.logo) || undefined,
    accentColorPrimary: data.accentColorPrimary || '#FF4A1C',
    accentColorSecondary: data.accentColorSecondary || '#3B4FCF',
    status: data.status || 'active',
    isFeaturedOnHub: data.isFeaturedOnHub !== false,
    heroTitle: data.heroTitle || data.name,
    heroSubtitle: data.heroSubtitle || data.tagline || data.shortDescription || '',
    heroBadgeText: data.heroBadgeText || '',
    heroMedia: getStrapiMediaUrl(data.heroMedia) || undefined,
    heroTelemetryPills: Array.isArray(data.heroTelemetryPills)
      ? data.heroTelemetryPills.map((p: any) => ({
          id: p.id,
          label: p.label || '',
          value: p.value || '',
          variant: p.variant || 'default',
        }))
      : [],
    features: Array.isArray(data.features)
      ? data.features.map((f: any) => ({
          id: f.id,
          order: typeof f.order === 'number' ? f.order : 0,
          title: f.title || '',
          description: f.description || '',
          icon: f.icon || 'Layers',
          category: f.category || 'module',
          tag: f.tag || '',
          metricLabel: f.metricLabel || '',
          metricValue: f.metricValue || '',
          highlights: f.highlights || '',
        }))
      : [],
    screenshots: Array.isArray(data.screenshots)
      ? data.screenshots.map((s: any) => ({
          id: s.id,
          title: s.title || '',
          caption: s.caption || '',
          category: s.category || '',
          order: s.order || 0,
          imageUrl: getStrapiMediaUrl(s.image) || undefined,
        }))
      : [],
    pricingTiers: Array.isArray(data.pricingTiers)
      ? data.pricingTiers.map((t: any) => ({
          id: t.id,
          name: t.name || '',
          price: t.price || 'Custom',
          period: t.period || '',
          tagline: t.tagline || '',
          badge: t.badge || '',
          popular: Boolean(t.popular),
          order: t.order || 0,
          features: Array.isArray(t.features)
            ? t.features.map((f: any) => (typeof f === 'string' ? f : f.feature || ''))
            : [],
          ctaLabel: t.ctaLabel || 'Get Started',
          ctaUrl: t.ctaUrl || '/contact',
        }))
      : [],
    faqs: Array.isArray(data.faqs)
      ? data.faqs.map((faq: any) => ({
          id: faq.id,
          question: faq.question || '',
          answer: faq.answer || '',
          category: faq.category || '',
        }))
      : [],
    kpiStats: Array.isArray(data.kpiStats)
      ? data.kpiStats.map((k: any) => ({
          id: k.id,
          label: k.label || '',
          value: k.value || '',
        }))
      : [],
    primaryCta: data.primaryCta
      ? { label: data.primaryCta.label || 'Get Started', url: data.primaryCta.url || '/contact' }
      : undefined,
    secondaryCta: data.secondaryCta
      ? { label: data.secondaryCta.label || 'Learn More', url: data.secondaryCta.url || '/contact' }
      : undefined,
  };
}

export async function fetchProducts(): Promise<ProductItem[]> {
  try {
    const raw = await fetchFromStrapi<any>(
      'products?populate[features]=true&populate[heroTelemetryPills]=true&populate[screenshots][populate]=image&populate[pricingTiers][populate]=features&populate[faqs]=true&populate[kpiStats]=true&populate[primaryCta]=true&populate[secondaryCta]=true&populate[logo]=true&populate[heroMedia]=true&sort=order:asc'
    );
    if (!raw || !Array.isArray(raw) || raw.length === 0) return [];
    return raw.map(normalizeProduct);
  } catch (error) {
    console.warn('[Strapi] Could not load products list:', error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const raw = await fetchFromStrapi<any>(
      `products?filters[slug][$eq]=${encodeURIComponent(
        slug
      )}&populate[features]=true&populate[heroTelemetryPills]=true&populate[screenshots][populate]=image&populate[pricingTiers][populate]=features&populate[faqs]=true&populate[kpiStats]=true&populate[primaryCta]=true&populate[secondaryCta]=true&populate[logo]=true&populate[heroMedia]=true`
    );
    if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
    return normalizeProduct(raw[0]);
  } catch (error) {
    console.warn(`[Strapi] Could not load product "${slug}":`, error);
    return null;
  }
}

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) setProducts(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, isLoading, error };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchProductBySlug(slug)
      .then((data) => {
        if (isMounted) {
          if (data) setProduct(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { product, isLoading, error };
}

// ============================================================================
// ABOUT PAGE CMS INTERFACES, FETCHERS & HOOKS
// ============================================================================

export interface PillarItem {
  id?: number | string;
  orderNumber: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
}

export interface PanelHighlight {
  id?: number | string;
  title: string;
  description: string;
}

export interface ClientLogoItem {
  id?: number | string;
  name: string;
  logoImageUrl?: string;
  websiteUrl?: string;
}

export interface AboutHeroData {
  badgeText: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  heroImageUrl?: string;
  pillars: PillarItem[];
  kpiStats: { label: string; value: string }[];
}

export interface ParallaxPanelWhoWeAreData {
  badge: string;
  headline: string;
  description: string;
  coverImageUrl?: string;
  highlightRows: PanelHighlight[];
}

export interface ParallaxPanelMissionData {
  badge: string;
  headline: string;
  description: string;
  missionQuote: string;
  coverImageUrl?: string;
}

export interface ParallaxPanelVisionData {
  badge: string;
  headline: string;
  description: string;
  visionBadgeYear: string;
  coverImageUrl?: string;
  highlightRows: PanelHighlight[];
}

export interface AboutContactCtaData {
  badge: string;
  headline: string;
  description: string;
  email: string;
  phone: string;
  officeLocation: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface AboutPageData {
  hero: AboutHeroData;
  panelWhoWeAre: ParallaxPanelWhoWeAreData;
  panelMission: ParallaxPanelMissionData;
  panelVision: ParallaxPanelVisionData;
  clientLogos: ClientLogoItem[];
  contactCta: AboutContactCtaData;
}

export const DEFAULT_ABOUT_PAGE_DATA: AboutPageData = {
  hero: {
    badgeText: 'Full-Stack Engineering & AI Studio',
    headline: 'Architecting the Future of High-Scale Software & Autonomous Intelligence',
    subheadline:
      'We combine senior-only engineering pods with proprietary SaaS engines to build mission-critical web platforms, AI agents, and enterprise design systems for ambitious global businesses.',
    primaryCtaLabel: 'Start Your Brief',
    primaryCtaUrl: '/contact',
    secondaryCtaLabel: 'Explore Our Story',
    secondaryCtaUrl: '#story',
    heroImageUrl: undefined,
    pillars: [
      {
        orderNumber: '01',
        title: 'Full-Spectrum Architecture',
        description: 'Zero-handoff engineering from cloud infrastructure to 60fps responsive interfaces.',
        icon: 'Layers',
        accentColor: '#FF4A1C',
      },
      {
        orderNumber: '02',
        title: 'Dual-Engine Innovation',
        description: 'High-velocity bespoke client pods alongside our proprietary commercial SaaS products.',
        icon: 'Server',
        accentColor: '#3B82F6',
      },
      {
        orderNumber: '03',
        title: 'Autonomous AI Integration',
        description: 'Production-ready LLM agents, vector retrieval RAG pipelines, and automated CRM workflows.',
        icon: 'Cpu',
        accentColor: '#10B981',
      },
      {
        orderNumber: '04',
        title: 'Global Delivery Standards',
        description: 'Hyderabad engineering headquarters with 99.98% production SLA across 12+ countries.',
        icon: 'Globe2',
        accentColor: '#8B5CF6',
      },
    ],
    kpiStats: [
      { label: 'In-House Engineers', value: '100%' },
      { label: 'Clutch / G2 Rating', value: '4.9★' },
      { label: 'Avg API Latency', value: '<100ms' },
      { label: 'Production SLA', value: '99.98%' },
    ],
  },
  panelWhoWeAre: {
    badge: 'Who We Are',
    headline: 'Not just another dev shop.',
    description:
      'AProgra was built on a single belief — that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.',
    coverImageUrl: undefined,
    highlightRows: [
      { title: 'In-house only', description: 'Every line of code written by our team' },
      { title: 'End-to-end ownership', description: 'Design through deployment' },
      { title: 'Hyderabad-based', description: 'Working with clients across 12 countries' },
    ],
  },
  panelMission: {
    badge: 'Our Mission',
    headline: 'Build software that actually matters.',
    description:
      'Our mission is simple — engineer products that solve real problems, for real people, with real business impact. We measure success not in lines of code but in businesses transformed.',
    missionQuote:
      '"To make world-class engineering accessible to every visionary who dares to build."',
    coverImageUrl: undefined,
  },
  panelVision: {
    badge: '2030 Vision',
    headline: 'Empowering the next generation of digital empires.',
    description:
      'We envision a world where ambitious software ventures scale frictionlessly from idea to global impact, powered by autonomous multi-agent engineering pods and mathematically sound design systems.',
    visionBadgeYear: '2030 Vision',
    coverImageUrl: undefined,
    highlightRows: [
      { title: 'Global Reach', description: 'Serving visionaries across 12+ countries with scale-ready architecture' },
      { title: 'Agentic & Autonomous Speed', description: 'Integrating cutting-edge AI workflows with human craftsmanship' },
      { title: 'Infinite Scale', description: 'Architected from day one to handle millions of active users' },
    ],
  },
  clientLogos: [
    { name: 'Google Cloud Partner', websiteUrl: 'https://cloud.google.com' },
    { name: 'AWS Advance Tier', websiteUrl: 'https://aws.amazon.com' },
    { name: 'Official Meta Partner', websiteUrl: 'https://developers.facebook.com' },
    { name: 'Vercel Enterprise', websiteUrl: 'https://vercel.com' },
    { name: 'Stripe Verified Partner', websiteUrl: 'https://stripe.com' },
    { name: 'Kubernetes Certified', websiteUrl: 'https://kubernetes.io' },
  ],
  contactCta: {
    badge: "LET'S CONNECT",
    headline: 'Ready to Build Something Infinite?',
    description:
      'Whether you have a fully scoped product brief or just an ambitious concept, our technical architects are standing by to explore your vision.',
    email: 'hello@aprogra.com',
    phone: '+1 (800) 555-0199',
    officeLocation: 'Hyderabad, India • Global Remote Pods',
    ctaLabel: 'Submit Project Brief',
    ctaUrl: '/contact',
  },
};

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  order: number;
}

export const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: '1',
    name: 'Alexandre Vane',
    role: 'Founder & Chief Architect',
    bio: 'Ex-Google Staff Architect with 12+ years building distributed cloud platforms & high-throughput APIs.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
    skills: ['Cloud Arch', 'Distributed Systems', 'Rust & Go'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 1,
  },
  {
    id: '2',
    name: 'Isabella Chen',
    role: 'Head of Product & Design',
    bio: 'Pioneer in motion graphics & spatial UI design. Transformed digital products for 30+ enterprise firms.',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop',
    skills: ['Design Systems', 'Motion Graphics', 'UX Strategy'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 2,
  },
  {
    id: '3',
    name: 'Sophia Thorne',
    role: 'Director of AI Research',
    bio: 'Specializing in custom LLM fine-tuning, autonomous agentic workflows, and edge neural deployments.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    skills: ['LLMs & RAG', 'Machine Learning', 'Autonomous Agents'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 3,
  },
  {
    id: '4',
    name: 'Mia Rostova',
    role: 'Lead Full-Stack Engineer',
    bio: 'Polyglot software leader specializing in React 19, TypeScript, WebAudio, and frontend state engines.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    skills: ['React / Next.js', 'TypeScript', 'State Engines'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 4,
  },
  {
    id: '5',
    name: 'Charlotte Vance',
    role: 'Principal Infrastructure Lead',
    bio: 'Cloud-native infrastructure specialist building zero-downtime multi-region Kubernetes deployments.',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
    skills: ['Kubernetes', 'AWS / GCP', 'Terraform'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 5,
  },
];

export interface AboutFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export const DEFAULT_ABOUT_FAQS: AboutFaqItem[] = [
  {
    id: '1',
    question: 'How is AProgra different from a typical software agency?',
    answer: 'Most agencies outsource or use freelancers for parts of your project. At AProgra, every single person who touches your product is on our in-house team. No handoffs to strangers. No quality loss in translation. You get one point of contact and a team that treats your product like their own.',
    category: 'Company & Team',
    order: 1,
  },
  {
    id: '2',
    question: 'What types of projects do you take on?',
    answer: 'We work on product engineering (web, mobile, SaaS), AI and automation systems, UI/UX design, and cloud infrastructure. From early-stage MVPs to scaling enterprise platforms — if it involves building software, we can help.',
    category: 'Capabilities',
    order: 2,
  },
  {
    id: '3',
    question: 'How long does it take to start a project?',
    answer: 'After an initial discovery call, we typically scope and onboard within 1–2 weeks. For urgent projects, we’ve started within days. We don’t believe in unnecessary delays.',
    category: 'Engagement',
    order: 3,
  },
  {
    id: '4',
    question: 'Do you work with international clients?',
    answer: 'Absolutely. We’ve partnered with clients across 12 countries including the US, UK, UAE, Singapore, and Australia. We work async-first and adapt to your timezone for key meetings.',
    category: 'Global Delivery',
    order: 4,
  },
  {
    id: '5',
    question: 'What does your development process look like?',
    answer: 'We follow an iterative, milestone-driven approach: Discovery → Design → Build → Test → Launch → Support. You’re involved at every stage with regular demos, Slack updates, and transparent timelines.',
    category: 'Process',
    order: 5,
  },
  {
    id: '6',
    question: 'Can you take over an existing project or codebase?',
    answer: 'Yes — and we do it often. We conduct a thorough code audit first, document what we find, then propose a clear path forward. We’ve rescued several projects that were over-budget and behind schedule.',
    category: 'Engineering',
    order: 6,
  },
  {
    id: '7',
    question: 'What is your pricing model?',
    answer: 'We offer project-based pricing for fixed-scope work and monthly retainers for ongoing development. We’ll share a detailed quote after a discovery call. We believe in transparent pricing — no hidden fees, no scope creep surprises.',
    category: 'Commercial',
    order: 7,
  },
  {
    id: '8',
    question: 'How do we get started?',
    answer: 'Simply fill out the contact form on this page or email us at hello@aprogra.com. We’ll schedule a discovery call within 24 hours, understand your project, and come back with a clear proposal.',
    category: 'Onboarding',
    order: 8,
  },
];

function normalizeAboutPage(raw: any): AboutPageData {
  const data = raw.attributes || raw;
  const hero = data.hero || {};
  const whoWeAre = data.panelWhoWeAre || {};
  const mission = data.panelMission || {};
  const vision = data.panelVision || {};
  const contact = data.contactCta || {};

  return {
    hero: {
      badgeText: hero.badgeText || DEFAULT_ABOUT_PAGE_DATA.hero.badgeText,
      headline: hero.headline || DEFAULT_ABOUT_PAGE_DATA.hero.headline,
      subheadline: hero.subheadline || DEFAULT_ABOUT_PAGE_DATA.hero.subheadline,
      primaryCtaLabel: hero.primaryCtaLabel || DEFAULT_ABOUT_PAGE_DATA.hero.primaryCtaLabel,
      primaryCtaUrl: hero.primaryCtaUrl || DEFAULT_ABOUT_PAGE_DATA.hero.primaryCtaUrl,
      secondaryCtaLabel: hero.secondaryCtaLabel || DEFAULT_ABOUT_PAGE_DATA.hero.secondaryCtaLabel,
      secondaryCtaUrl: hero.secondaryCtaUrl || DEFAULT_ABOUT_PAGE_DATA.hero.secondaryCtaUrl,
      heroImageUrl: getStrapiMediaUrl(hero.heroImage) || undefined,
      pillars: Array.isArray(hero.pillars) && hero.pillars.length > 0
        ? hero.pillars.map((p: any) => ({
            id: p.id,
            orderNumber: p.orderNumber || '01',
            title: p.title || '',
            description: p.description || '',
            icon: p.icon || 'Layers',
            accentColor: p.accentColor || '#FF4A1C',
          }))
        : DEFAULT_ABOUT_PAGE_DATA.hero.pillars,
      kpiStats: Array.isArray(hero.kpiStats) && hero.kpiStats.length > 0
        ? hero.kpiStats.map((k: any) => ({
            label: k.label || '',
            value: k.value || '',
          }))
        : DEFAULT_ABOUT_PAGE_DATA.hero.kpiStats,
    },
    panelWhoWeAre: {
      badge: whoWeAre.badge || DEFAULT_ABOUT_PAGE_DATA.panelWhoWeAre.badge,
      headline: whoWeAre.headline || DEFAULT_ABOUT_PAGE_DATA.panelWhoWeAre.headline,
      description: whoWeAre.description || DEFAULT_ABOUT_PAGE_DATA.panelWhoWeAre.description,
      coverImageUrl: getStrapiMediaUrl(whoWeAre.coverImage) || undefined,
      highlightRows: Array.isArray(whoWeAre.highlightRows) && whoWeAre.highlightRows.length > 0
        ? whoWeAre.highlightRows.map((h: any) => ({
            id: h.id,
            title: h.title || '',
            description: h.description || '',
          }))
        : DEFAULT_ABOUT_PAGE_DATA.panelWhoWeAre.highlightRows,
    },
    panelMission: {
      badge: mission.badge || DEFAULT_ABOUT_PAGE_DATA.panelMission.badge,
      headline: mission.headline || DEFAULT_ABOUT_PAGE_DATA.panelMission.headline,
      description: mission.description || DEFAULT_ABOUT_PAGE_DATA.panelMission.description,
      missionQuote: mission.missionQuote || DEFAULT_ABOUT_PAGE_DATA.panelMission.missionQuote,
      coverImageUrl: getStrapiMediaUrl(mission.coverImage) || undefined,
    },
    panelVision: {
      badge: vision.badge || DEFAULT_ABOUT_PAGE_DATA.panelVision.badge,
      headline: vision.headline || DEFAULT_ABOUT_PAGE_DATA.panelVision.headline,
      description: vision.description || DEFAULT_ABOUT_PAGE_DATA.panelVision.description,
      visionBadgeYear: vision.visionBadgeYear || DEFAULT_ABOUT_PAGE_DATA.panelVision.visionBadgeYear,
      coverImageUrl: getStrapiMediaUrl(vision.coverImage) || undefined,
      highlightRows: Array.isArray(vision.highlightRows) && vision.highlightRows.length > 0
        ? vision.highlightRows.map((h: any) => ({
            id: h.id,
            title: h.title || '',
            description: h.description || '',
          }))
        : DEFAULT_ABOUT_PAGE_DATA.panelVision.highlightRows,
    },
    clientLogos: Array.isArray(data.clientLogos) && data.clientLogos.length > 0
      ? data.clientLogos.map((l: any) => ({
          id: l.id,
          name: l.name || '',
          logoImageUrl: getStrapiMediaUrl(l.logoImage) || undefined,
          websiteUrl: l.websiteUrl || undefined,
        }))
      : DEFAULT_ABOUT_PAGE_DATA.clientLogos,
    contactCta: {
      badge: contact.badge || DEFAULT_ABOUT_PAGE_DATA.contactCta.badge,
      headline: contact.headline || DEFAULT_ABOUT_PAGE_DATA.contactCta.headline,
      description: contact.description || DEFAULT_ABOUT_PAGE_DATA.contactCta.description,
      email: contact.email || DEFAULT_ABOUT_PAGE_DATA.contactCta.email,
      phone: contact.phone || DEFAULT_ABOUT_PAGE_DATA.contactCta.phone,
      officeLocation: contact.officeLocation || DEFAULT_ABOUT_PAGE_DATA.contactCta.officeLocation,
      ctaLabel: contact.ctaLabel || DEFAULT_ABOUT_PAGE_DATA.contactCta.ctaLabel,
      ctaUrl: contact.ctaUrl || DEFAULT_ABOUT_PAGE_DATA.contactCta.ctaUrl,
    },
  };
}

export async function fetchAboutPage(): Promise<AboutPageData> {
  try {
    const raw = await fetchFromStrapi<any>(
      'about-page?populate[hero][populate]=*&populate[panelWhoWeAre][populate]=*&populate[panelMission][populate]=*&populate[panelVision][populate]=*&populate[clientLogos][populate]=*&populate[contactCta][populate]=*&populate[seo][populate]=*'
    );
    if (!raw) return DEFAULT_ABOUT_PAGE_DATA;
    return normalizeAboutPage(raw);
  } catch (error) {
    console.warn('[Strapi] Could not load About Page content, using defaults:', error);
    return DEFAULT_ABOUT_PAGE_DATA;
  }
}

export function useAboutPage() {
  const [aboutPage, setAboutPage] = useState<AboutPageData>(DEFAULT_ABOUT_PAGE_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchAboutPage()
      .then((data) => {
        if (isMounted) {
          if (data) setAboutPage(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { aboutPage, isLoading, error };
}

function normalizeTeamMember(raw: any): TeamMemberItem {
  const data = raw.attributes || raw;
  const skillsRaw = data.skills;
  const skillsArray = Array.isArray(skillsRaw)
    ? skillsRaw
    : typeof skillsRaw === 'string'
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  return {
    id: String(raw.documentId || raw.id || data.name),
    name: data.name || 'Team Member',
    role: data.role || 'Software Engineer',
    bio: data.bio || '',
    photoUrl: getStrapiMediaUrl(data.photo) || data.photoUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
    skills: skillsArray.length > 0 ? skillsArray : ['Engineering', 'Architecture'],
    linkedinUrl: data.linkedinUrl || undefined,
    githubUrl: data.githubUrl || undefined,
    twitterUrl: data.twitterUrl || undefined,
    order: typeof data.order === 'number' ? data.order : 0,
  };
}

export async function fetchTeamMembers(): Promise<TeamMemberItem[]> {
  try {
    const raw = await fetchFromStrapi<any>('team-members?populate=*&sort=order:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_TEAM_MEMBERS;
    return raw.map(normalizeTeamMember);
  } catch (error) {
    console.warn('[Strapi] Could not load Team Members list, using defaults:', error);
    return DEFAULT_TEAM_MEMBERS;
  }
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>(DEFAULT_TEAM_MEMBERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchTeamMembers()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) setTeamMembers(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { teamMembers, isLoading, error };
}

function normalizeAboutFaq(raw: any): AboutFaqItem {
  const data = raw.attributes || raw;
  return {
    id: String(raw.documentId || raw.id || data.question),
    question: data.question || '',
    answer: data.answer || '',
    category: data.category || 'General',
    order: typeof data.order === 'number' ? data.order : 0,
  };
}

export async function fetchAboutFaqs(): Promise<AboutFaqItem[]> {
  try {
    const raw = await fetchFromStrapi<any>('about-faqs?sort=order:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_ABOUT_FAQS;
    return raw.map(normalizeAboutFaq);
  } catch (error) {
    console.warn('[Strapi] Could not load About FAQs list, using defaults:', error);
    return DEFAULT_ABOUT_FAQS;
  }
}

export function useAboutFaqs() {
  const [faqs, setFaqs] = useState<AboutFaqItem[]>(DEFAULT_ABOUT_FAQS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchAboutFaqs()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) setFaqs(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { faqs, isLoading, error };
}


