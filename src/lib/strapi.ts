import { useState, useEffect } from 'react';

/**
 * Strapi API Client Service
 * Provides helper functions to query Strapi REST API endpoints, manage inquiries, and resolve media URLs.
 */

const ENV_STRAPI_URL = (import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337').replace(/\/$/, '');
const STRAPI_TOKEN = (import.meta.env.VITE_STRAPI_API_TOKEN || '').trim();

/**
 * In the browser during Vite dev, prefer same-origin `/api` (proxied to Strapi).
 * Avoids CORS and ensures the Contact page always hits the running CMS.
 */
function getStrapiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      ENV_STRAPI_URL.includes('localhost') ||
      ENV_STRAPI_URL.includes('127.0.0.1');
    if (isLocal) return ''; // → fetch('/api/...') via Vite proxy
  }
  return ENV_STRAPI_URL;
}

const STRAPI_URL = ENV_STRAPI_URL;

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
  
  // URL-encode square brackets to prevent HTTP 400 Bad Request rejections
  // from strict proxies (like Vite's dev server proxy) or Strapi v5 routing
  const encodedEndpoint = cleanEndpoint.replace(/\[/g, '%5B').replace(/\]/g, '%5D');
  
  const base = getStrapiBaseUrl();
  const url = `${base}/api/${encodedEndpoint}`;

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

      console.warn(`[Strapi] API request failed with status ${res.status}: ${res.statusText} (${url})`);
      if (fallbackData !== undefined) return fallbackData;
      throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    if (json?.data === undefined || json?.data === null) {
      console.warn(`[Strapi] Empty data from "${url}"`, json?.error || '');
      if (fallbackData !== undefined) return fallbackData;
      throw new Error('Strapi returned empty data');
    }
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
 * Always resolves to relative /uploads/... in the browser so it loads through the current domain.
 */
export function getStrapiMediaUrl(media: any): string {
  if (!media) return '';

  let rawUrl = '';
  if (typeof media === 'string') {
    rawUrl = media.trim();
  } else {
    rawUrl =
      media.url ||
      media.data?.attributes?.url ||
      media.data?.url ||
      media.attributes?.url ||
      (Array.isArray(media) && media[0]?.url) ||
      (Array.isArray(media?.data) && media.data[0]?.attributes?.url) ||
      '';
  }

  if (!rawUrl || typeof rawUrl !== 'string') return '';

  // Handle data or blob URIs
  if (rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) {
    return rawUrl;
  }

  // Strip localhost:1337, 127.0.0.1:1337, or 0.0.0.0:1337 if present in media URL
  if (
    rawUrl.startsWith('http://localhost:1337') ||
    rawUrl.startsWith('http://127.0.0.1:1337') ||
    rawUrl.startsWith('http://0.0.0.0:1337')
  ) {
    rawUrl = rawUrl.replace(/^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0):1337/, '');
  }

  // If it's an external URL (e.g., Unsplash, Cloudinary, AWS S3, Picsum)
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }

  // Ensure leading slash
  const cleanPath = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;

  // In the browser, return cleanPath so it loads seamlessly from the current origin (e.g. /uploads/...)
  if (typeof window !== 'undefined') {
    return cleanPath;
  }

  const base = ENV_STRAPI_URL && !ENV_STRAPI_URL.includes('localhost') ? ENV_STRAPI_URL : '';
  return base ? `${base}${cleanPath}` : cleanPath;
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
      'global-config?populate[header][populate][navLinks]=true&populate[header][populate][logo]=true&populate[footer][populate][columns][populate][links]=true&populate[footer][populate][socialLinks]=true&populate[footer][populate][legalLinks]=true&populate[footer][populate][logo]=true'
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
  heroImage?: StrapiMedia | string | null;
  heroImageUrl?: string;
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
  channels?: ContactChannelItem[];
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
    heroImageUrl: 'https://picsum.photos/seed/163641868/1200/800',
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
    // Strapi v5: nested repeatable components need EXPLICIT populate paths.
    // populate=* / populate=deep do NOT return steps, capabilitiesList, etc.
    const raw = await fetchFromStrapi<any>(
      'contact-page?populate[hero][populate][heroImage]=true' +
      '&populate[roadmap][populate][steps]=true' +
      '&populate[brief][populate][capabilitiesList]=true' +
      '&populate[brief][populate][budgetRangesList]=true' +
      '&populate[brief][populate][timelineRangesList]=true' +
      '&populate[preview][populate][engagementSteps]=true' +
      '&populate[channels]=true' +
      '&populate[introCallModal][populate][topicOptions]=true' +
      '&populate[introCallModal][populate][timeSlots]=true'
    );
    if (!raw) {
      console.warn('[Strapi] contact-page returned empty, using defaults');
      return DEFAULT_CONTACT_PAGE_CONTENT;
    }

    console.info('[Strapi] contact-page loaded from CMS', {
      documentId: raw.documentId || raw.id,
      publishedAt: raw.publishedAt,
      updatedAt: raw.updatedAt,
    });

    const data = raw.attributes || raw;
    const hero = data.hero || {};
    const roadmap = data.roadmap || {};
    const brief = data.brief || {};
    const preview = data.preview || {};
    const directChannelsHeader = data.directChannelsHeader || {};
    const introCallModal = data.introCallModal || {};

    const extractChoiceNames = (list: any[] | undefined, defaultList: string[]): string[] => {
      if (!Array.isArray(list) || list.length === 0) return defaultList;
      return list
        .map((item: any) => {
          if (typeof item === 'string') return item;
          // Strapi v5 repeatable component (elements.option-item): { id, label }
          return item.label || item.name || item.title || '';
        })
        .filter(Boolean);
    };

    const pick = <T,>(value: T | null | undefined, fallback: T): T =>
      value !== null && value !== undefined && value !== '' ? value : fallback;

    let channels: ContactChannelItem[] = DEFAULT_CONTACT_CHANNELS;
    if (Array.isArray(data.channels) && data.channels.length > 0) {
      channels = data.channels
        .map((ch: any, idx: number) => ({
          id: String(ch.id || ch.label || `channel-${idx + 1}`),
          order: typeof ch.order === 'number' ? ch.order : idx + 1,
          type: (ch.type === 'custom' ? 'other' : ch.type) || 'email',
          label: ch.label || '',
          primaryValue: ch.primaryValue || '',
          subtext: ch.subtext || '',
          buttonText: ch.buttonText || '',
          buttonUrl: ch.buttonUrl || undefined,
          iconName: ch.iconName || 'mail',
          iconMedia: ch.iconMedia,
          iconUrl: getStrapiMediaUrl(ch.iconMedia) || ch.iconUrl || undefined,
        }))
        .sort((a: ContactChannelItem, b: ContactChannelItem) => (a.order || 0) - (b.order || 0));
    }

    return {
      hero: {
        availabilityBadge: pick(hero.availabilityBadge, DEFAULT_CONTACT_PAGE_CONTENT.hero.availabilityBadge),
        headline: pick(hero.headline, DEFAULT_CONTACT_PAGE_CONTENT.hero.headline),
        highlight: pick(hero.highlight, DEFAULT_CONTACT_PAGE_CONTENT.hero.highlight),
        description: pick(hero.description, DEFAULT_CONTACT_PAGE_CONTENT.hero.description),
        primaryCtaText: pick(hero.primaryCtaText, DEFAULT_CONTACT_PAGE_CONTENT.hero.primaryCtaText),
        secondaryCtaText: pick(hero.secondaryCtaText, DEFAULT_CONTACT_PAGE_CONTENT.hero.secondaryCtaText),
        slaBadge1: pick(hero.slaBadge1, DEFAULT_CONTACT_PAGE_CONTENT.hero.slaBadge1),
        slaBadge2: pick(hero.slaBadge2, DEFAULT_CONTACT_PAGE_CONTENT.hero.slaBadge2),
        slaBadge3: pick(hero.slaBadge3, DEFAULT_CONTACT_PAGE_CONTENT.hero.slaBadge3),
        directChannelsTitle: pick(hero.directChannelsTitle, DEFAULT_CONTACT_PAGE_CONTENT.hero.directChannelsTitle),
        podStatus: pick(hero.podStatus, DEFAULT_CONTACT_PAGE_CONTENT.hero.podStatus),
        emailLabel: pick(hero.emailLabel, DEFAULT_CONTACT_PAGE_CONTENT.hero.emailLabel),
        email: pick(hero.email, DEFAULT_CONTACT_PAGE_CONTENT.hero.email),
        emailCopyButtonText: pick(hero.emailCopyButtonText, DEFAULT_CONTACT_PAGE_CONTENT.hero.emailCopyButtonText),
        phoneLabel: pick(hero.phoneLabel, DEFAULT_CONTACT_PAGE_CONTENT.hero.phoneLabel),
        phone: pick(hero.phone, DEFAULT_CONTACT_PAGE_CONTENT.hero.phone),
        phoneCopyButtonText: pick(hero.phoneCopyButtonText, DEFAULT_CONTACT_PAGE_CONTENT.hero.phoneCopyButtonText),
        studioHqLabel: pick(hero.studioHqLabel, DEFAULT_CONTACT_PAGE_CONTENT.hero.studioHqLabel),
        studioHqValue: pick(hero.studioHqValue, DEFAULT_CONTACT_PAGE_CONTENT.hero.studioHqValue),
        bookIntroCallButtonText: pick(hero.bookIntroCallButtonText, DEFAULT_CONTACT_PAGE_CONTENT.hero.bookIntroCallButtonText),
        heroImage: hero.heroImage,
        heroImageUrl: getStrapiMediaUrl(hero.heroImage) || pick(hero.heroImageUrl, DEFAULT_CONTACT_PAGE_CONTENT.hero.heroImageUrl || ''),
      },
      roadmap: {
        badge: pick(roadmap.badge, DEFAULT_CONTACT_PAGE_CONTENT.roadmap.badge),
        title: pick(roadmap.title, DEFAULT_CONTACT_PAGE_CONTENT.roadmap.title),
        steps: Array.isArray(roadmap.steps) && roadmap.steps.length > 0
          ? roadmap.steps.map((step: any, idx: number) => ({
              id: step.id || idx,
              timeframe: pick(step.timeframe, ''),
              title: pick(step.title, ''),
              description: pick(step.description, ''),
            }))
          : DEFAULT_CONTACT_PAGE_CONTENT.roadmap.steps,
      },
      brief: {
        badge: pick(brief.badge, DEFAULT_CONTACT_PAGE_CONTENT.brief.badge),
        title: pick(brief.title, DEFAULT_CONTACT_PAGE_CONTENT.brief.title),
        subtitle: pick(brief.subtitle, DEFAULT_CONTACT_PAGE_CONTENT.brief.subtitle),
        formHeading: pick(brief.formHeading, DEFAULT_CONTACT_PAGE_CONTENT.brief.formHeading),
        formSubheading: pick(brief.formSubheading, DEFAULT_CONTACT_PAGE_CONTENT.brief.formSubheading),
        fieldNameLabel: pick(brief.fieldNameLabel, DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldNameLabel),
        fieldNamePlaceholder: pick(brief.fieldNamePlaceholder, DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldNamePlaceholder),
        fieldEmailLabel: pick(brief.fieldEmailLabel, DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldEmailLabel),
        fieldEmailPlaceholder: pick(brief.fieldEmailPlaceholder, DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldEmailPlaceholder),
        fieldCompanyLabel: pick(brief.fieldCompanyLabel, DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldCompanyLabel),
        fieldCompanyPlaceholder: pick(brief.fieldCompanyPlaceholder, DEFAULT_CONTACT_PAGE_CONTENT.brief.fieldCompanyPlaceholder),
        capabilitiesQuestion: pick(brief.capabilitiesQuestion, DEFAULT_CONTACT_PAGE_CONTENT.brief.capabilitiesQuestion),
        capabilitiesList: extractChoiceNames(brief.capabilitiesList, DEFAULT_CONTACT_PAGE_CONTENT.brief.capabilitiesList),
        budgetQuestion: pick(brief.budgetQuestion, DEFAULT_CONTACT_PAGE_CONTENT.brief.budgetQuestion),
        budgetRangesList: extractChoiceNames(brief.budgetRangesList, DEFAULT_CONTACT_PAGE_CONTENT.brief.budgetRangesList),
        timelineQuestion: pick(brief.timelineQuestion, DEFAULT_CONTACT_PAGE_CONTENT.brief.timelineQuestion),
        timelineRangesList: extractChoiceNames(brief.timelineRangesList, DEFAULT_CONTACT_PAGE_CONTENT.brief.timelineRangesList),
        messageQuestion: pick(brief.messageQuestion, DEFAULT_CONTACT_PAGE_CONTENT.brief.messageQuestion),
        messagePlaceholder: pick(brief.messagePlaceholder, DEFAULT_CONTACT_PAGE_CONTENT.brief.messagePlaceholder),
        submitButtonText: pick(brief.submitButtonText, DEFAULT_CONTACT_PAGE_CONTENT.brief.submitButtonText),
        successTitle: pick(brief.successTitle, DEFAULT_CONTACT_PAGE_CONTENT.brief.successTitle),
      },
      preview: {
        cardTitle: pick(preview.cardTitle, DEFAULT_CONTACT_PAGE_CONTENT.preview.cardTitle),
        cardBadge: pick(preview.cardBadge, DEFAULT_CONTACT_PAGE_CONTENT.preview.cardBadge),
        capabilitiesLabel: pick(preview.capabilitiesLabel, DEFAULT_CONTACT_PAGE_CONTENT.preview.capabilitiesLabel),
        investmentLabel: pick(preview.investmentLabel, DEFAULT_CONTACT_PAGE_CONTENT.preview.investmentLabel),
        timelineLabel: pick(preview.timelineLabel, DEFAULT_CONTACT_PAGE_CONTENT.preview.timelineLabel),
        engagementTitle: pick(preview.engagementTitle, DEFAULT_CONTACT_PAGE_CONTENT.preview.engagementTitle),
        engagementSteps: Array.isArray(preview.engagementSteps) && preview.engagementSteps.length > 0
          ? preview.engagementSteps.map((step: any, idx: number) => ({
              id: step.id || idx,
              // Strapi component uses `timeframe`; UI uses `stepNumber`
              stepNumber: pick(step.stepNumber, pick(step.timeframe, String(idx + 1))),
              title: pick(step.title, ''),
              description: pick(step.description, ''),
            }))
          : DEFAULT_CONTACT_PAGE_CONTENT.preview.engagementSteps,
        guaranteesTitle: pick(preview.guaranteesTitle, DEFAULT_CONTACT_PAGE_CONTENT.preview.guaranteesTitle),
        guarantee1_title: pick(preview.guarantee1_title, DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee1_title),
        guarantee1_desc: pick(preview.guarantee1_desc, DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee1_desc),
        guarantee2_title: pick(preview.guarantee2_title, DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee2_title),
        guarantee2_desc: pick(preview.guarantee2_desc, DEFAULT_CONTACT_PAGE_CONTENT.preview.guarantee2_desc),
        slaResponseText: pick(preview.slaResponseText, DEFAULT_CONTACT_PAGE_CONTENT.preview.slaResponseText),
        readyReviewText: pick(preview.readyReviewText, DEFAULT_CONTACT_PAGE_CONTENT.preview.readyReviewText),
        videoTitle: pick(preview.videoTitle, DEFAULT_CONTACT_PAGE_CONTENT.preview.videoTitle),
        videoDescription: pick(preview.videoDescription, DEFAULT_CONTACT_PAGE_CONTENT.preview.videoDescription),
        videoButtonText: pick(preview.videoButtonText, DEFAULT_CONTACT_PAGE_CONTENT.preview.videoButtonText),
      },
      directChannelsHeader: {
        // Flat root fields on contact-page single type (not a component)
        badge: pick(data.directChannelsBadge, pick(directChannelsHeader.badge, DEFAULT_CONTACT_PAGE_CONTENT.directChannelsHeader.badge)),
        title: pick(data.directChannelsTitle, pick(directChannelsHeader.title, DEFAULT_CONTACT_PAGE_CONTENT.directChannelsHeader.title)),
        subtitle: pick(data.directChannelsSubtitle, pick(directChannelsHeader.subtitle, DEFAULT_CONTACT_PAGE_CONTENT.directChannelsHeader.subtitle)),
      },
      closingBanner: {
        headline: pick(data.closingBannerHeadline, DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.headline),
        highlight: pick(data.closingBannerHighlight, DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.highlight),
        subtitle: pick(data.closingBannerSubtitle, DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.subtitle),
        backToTopText: DEFAULT_CONTACT_PAGE_CONTENT.closingBanner.backToTopText,
      },
      introCallModal: {
        title: pick(introCallModal.title, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.title),
        subtitle: pick(introCallModal.subtitle, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.subtitle),
        topicOptions: extractChoiceNames(introCallModal.topicOptions, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.topicOptions),
        timeSlots: extractChoiceNames(introCallModal.timeSlots, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.timeSlots),
        submitButtonText: pick(introCallModal.submitButtonText, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.submitButtonText),
        successTitle: pick(introCallModal.successTitle, DEFAULT_CONTACT_PAGE_CONTENT.introCallModal.successTitle),
      },
      channels,
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
    const pageData = await fetchContactPageContent();
    if (pageData.channels && pageData.channels.length > 0) {
      return pageData.channels;
    }
    return DEFAULT_CONTACT_CHANNELS;
  } catch (error) {
    console.warn('[Strapi] Could not load contact-channels, using defaults:', error);
    return DEFAULT_CONTACT_CHANNELS;
  }
}

/**
 * React hook for consuming dynamic Contact Page content & Contact Channels.
 * Renders defaults immediately, then always applies live CMS data when it arrives.
 * A late successful fetch must never be blocked by a prior timeout/default.
 */
export function useContactPageContent() {
  const [content, setContent] = useState<ContactPageContent>(DEFAULT_CONTACT_PAGE_CONTENT);
  const [channels, setChannels] = useState<ContactChannelItem[]>(DEFAULT_CONTACT_CHANNELS);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [source, setSource] = useState<'defaults' | 'cms'>('defaults');

  const applyPageData = (
    pageData: ContactPageContent | null | undefined,
    from: 'defaults' | 'cms'
  ) => {
    if (!pageData) return;
    setContent(pageData);
    if (pageData.channels && pageData.channels.length > 0) {
      setChannels(pageData.channels);
    }
    setSource(from);
    if (from === 'cms') setLastFetched(new Date());
  };

  const load = async () => {
    setIsLoading(true);
    try {
      const pageData = await fetchContactPageContent();
      applyPageData(pageData, 'cms');
      return pageData;
    } catch (error) {
      console.warn('[Strapi] Failed to fetch contact page content:', error);
      applyPageData(DEFAULT_CONTACT_PAGE_CONTENT, 'defaults');
      return DEFAULT_CONTACT_PAGE_CONTENT;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      try {
        const pageData = await fetchContactPageContent();
        if (cancelled) return;
        applyPageData(pageData, 'cms');
        console.info('[Contact] CMS content applied', {
          availabilityBadge: pageData.hero?.availabilityBadge,
          step0: pageData.roadmap?.steps?.[0]?.timeframe,
        });
      } catch (error) {
        if (cancelled) return;
        console.warn('[Contact] CMS fetch failed, showing defaults', error);
        applyPageData(DEFAULT_CONTACT_PAGE_CONTENT, 'defaults');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, channels, isLoading, lastFetched, source, refetch: load };
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
 * Submits a project brief or intro call inquiry to Strapi contact-inquiries
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  const url = `${getStrapiBaseUrl()}/api/contact-inquiries`;

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
          message: payload.message || '',
          inquiryType: payload.type === 'intro_call' ? 'call_booking' : 'brief',
          preferredTopic: payload.metadata?.topic || '',
          preferredTime: payload.metadata?.timeSlot || '',
          status: 'new',
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
    heroImageUrl: 'https://picsum.photos/seed/2043984064/1200/800',
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
    coverImageUrl: 'https://picsum.photos/seed/1502950997/1200/800',
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
    coverImageUrl: 'https://picsum.photos/seed/834844751/1200/800',
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
    coverImageUrl: 'https://picsum.photos/seed/314078390/1200/800',
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
    coverImageUrl: 'https://picsum.photos/seed/1984026769/1200/800',
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
    coverImageUrl: 'https://picsum.photos/seed/1495104188/1200/800',
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
    coverImageUrl: 'https://picsum.photos/seed/1485262105/1200/800',
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
      'blog-page?populate[hero]=true'
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
        'https://picsum.photos/seed/1502950997/1200/800';

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
  flipCards: ServiceFlipCardItem[];
  features: ServicesFeaturesSection;
  services: ServiceItem[];
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

export interface ServiceFlipCardItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tag?: string;
  icon?: string;
  iconMedia?: StrapiMedia | string | null;
  color?: string;
  cardOrder: number;
  deliverables: string[];
  coverImage?: StrapiMedia | string | null;
  coverImageUrl?: string;
  actionText?: string;
  actionUrl?: string;
}

export const DEFAULT_SERVICE_FLIP_CARDS: ServiceFlipCardItem[] = [
  {
    id: 'web-mobile',
    title: 'Web & Mobile Systems',
    subtitle: 'Sub-45ms Edge Response',
    description: 'High-speed web platforms and native mobile apps with offline-first synchronization.',
    tag: '01 / WEB & MOBILE',
    color: '#3B82F6',
    cardOrder: 1,
    coverImageUrl: 'https://picsum.photos/seed/1882134225/1200/800',
    deliverables: [
      'Next.js & React 19',
      'React Native & Expo',
      'Real-Time WebSockets',
      'CRDT & SQLite Offline Sync',
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/web-engineering',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents & Neural RAG',
    subtitle: 'Autonomous Workflows',
    description: 'Multi-agent execution loops with structured schema generation and air-gapped SLMs.',
    tag: '02 / AI & AGENTIC',
    color: '#8B5CF6',
    cardOrder: 2,
    coverImageUrl: 'https://picsum.photos/seed/646225886/1200/800',
    deliverables: [
      'Multi-Agent Loops',
      'Dense Vector RAG',
      'Air-Gapped SLMs',
      'Guardrails & Eval Suites',
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/agentic-ai',
  },
  {
    id: 'saas-apis',
    title: 'Cloud-Native SaaS & APIs',
    subtitle: 'Multi-Tenant Systems',
    description: 'Multi-tenant platforms with row-level security, event-driven pipelines, and automated metering.',
    tag: '03 / SAAS & APIS',
    color: '#06B6D4',
    cardOrder: 3,
    coverImageUrl: 'https://picsum.photos/seed/611021275/1200/800',
    deliverables: [
      'Row-Level Security',
      'Stripe Metering',
      'GraphQL & gRPC',
      'PostgreSQL & Distributed DB',
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/saas-platforms',
  },
  {
    id: 'design-systems',
    title: 'Mathematical Design Systems',
    subtitle: 'Design to Code',
    description: 'Living component tokens, fluid typography scales, and WCAG AA accessibility built for engineering teams.',
    tag: '04 / DESIGN SYSTEMS',
    color: '#EC4899',
    cardOrder: 4,
    coverImageUrl: 'https://picsum.photos/seed/468325482/1200/800',
    deliverables: [
      'Fluid Typographic Scales',
      'Design Token Engine',
      'WCAG AAA Contrast',
      'Motion & GSAP Easing',
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/design-systems',
  },
  {
    id: 'cloud-devops',
    title: 'Edge & GitOps Infrastructure',
    subtitle: 'Zero-Trust Ops',
    description: 'Resilient cloud infrastructure with declarative IaC, self-healing Kubernetes, and zero-downtime CI.',
    tag: '05 / CLOUD & DEVOPS',
    color: '#10B981',
    cardOrder: 5,
    coverImageUrl: 'https://picsum.photos/seed/54940735/1200/800',
    deliverables: [
      'Terraform & Pulumi',
      'Self-Healing K8s',
      'Zero-Downtime CI',
      'Distributed Telemetry',
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/cloud-devops',
  },
];

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
    imageUrl: 'https://picsum.photos/seed/1615007644/1200/800',
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
    imageUrl: 'https://picsum.photos/seed/646225886/1200/800',
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
    imageUrl: 'https://picsum.photos/seed/611021275/1200/800',
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
    imageUrl: 'https://picsum.photos/seed/468325482/1200/800',
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
    imageUrl: 'https://picsum.photos/seed/54940735/1200/800',
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
    imageUrl: 'https://picsum.photos/seed/1897555988/1200/800',
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
    heroImageUrl: 'https://picsum.photos/seed/834844751/1200/800',
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
  flipCards: DEFAULT_SERVICE_FLIP_CARDS,
  services: DEFAULT_SERVICES_LIST,
  metaTitle: 'Custom Software, Cloud Architecture & Autonomous AI Services | Aprogra',
  metaDescription:
    'Enterprise software engineering, distributed cloud systems, and autonomous AI agents engineered for hyper-scale operations.',
};

/**
 * Normalizes raw service entry from Strapi
 */
function normalizeService(raw: any): ServiceItem {
  const data = raw.attributes || raw;
  const slug = data.slug || data.id || 'service';

  let deliverables: string[] = [];
  if (Array.isArray(data.deliverables)) {
    deliverables = data.deliverables.map((d: any) => (typeof d === 'string' ? d : d.title || d.item || ''));
  }

  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags.map((t: any) => (typeof t === 'string' ? t : t.name || t.title || ''));
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
    const raw = await fetchFromStrapi<any>(
      'services-page?populate[hero][populate]=*&populate[cards][populate]=*&populate[flipCards][populate]=*&populate[features][populate]=*&populate[services][populate]=*&populate[closingCta][populate]=*'
    );
    if (!raw) return DEFAULT_SERVICES_PAGE_CONTENT;

    const data = raw.attributes || raw;
    const hero = data.hero || {};
    const cards = data.cards || {};
    const rawFlipCards = data.flipCards;
    const features = data.features || {};
    const rawServices = data.services;
    const closingCta = data.closingCta || {};

    const flipCards: ServiceFlipCardItem[] = Array.isArray(rawFlipCards) && rawFlipCards.length > 0
      ? rawFlipCards.map(normalizeServiceFlipCard)
      : DEFAULT_SERVICE_FLIP_CARDS;

    const services: ServiceItem[] = Array.isArray(rawServices) && rawServices.length > 0
      ? rawServices.map(normalizeService)
      : DEFAULT_SERVICES_LIST;

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
      flipCards,
      features: {
        badge: features.badge || DEFAULT_SERVICES_PAGE_CONTENT.features.badge,
        headline: features.headline || DEFAULT_SERVICES_PAGE_CONTENT.features.headline,
        highlight: features.highlight || DEFAULT_SERVICES_PAGE_CONTENT.features.highlight,
        description: features.description || DEFAULT_SERVICES_PAGE_CONTENT.features.description,
      },
      services,
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
    const page = await fetchServicesPageContent();
    return page.services && page.services.length > 0 ? page.services : DEFAULT_SERVICES_LIST;
  } catch (error) {
    console.warn('[Strapi] Could not load services list from Single Type, using defaults:', error);
    return DEFAULT_SERVICES_LIST;
  }
}

/**
 * Normalizes raw service flip card entry from Strapi
 */
function normalizeServiceFlipCard(raw: any, index: number): ServiceFlipCardItem {
  const data = raw.attributes || raw;
  const id = String(raw.documentId || raw.id || `flip-card-${index + 1}`);

  let deliverables: string[] = [];
  if (Array.isArray(data.deliverables)) {
    deliverables = data.deliverables.map((d: any) => (typeof d === 'string' ? d : d.title || d.item || ''));
  }

  const defaultColors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#EC4899', '#10B981', '#F59E0B'];
  const order = typeof data.cardOrder === 'number' ? data.cardOrder : index + 1;
  const color = data.color || defaultColors[(order - 1) % defaultColors.length];

  return {
    id: id,
    title: data.title || 'Engineering Discipline',
    subtitle: data.subtitle || 'Enterprise Scale',
    description: data.description || '',
    tag: data.tag || `0${order} / SERVICE`,
    icon: data.icon || 'web',
    iconMedia: data.iconMedia,
    color: color,
    cardOrder: order,
    deliverables: deliverables.length > 0 ? deliverables : [
      'Next.js 15 & React 19',
      'Production Architecture',
      'Real-Time Telemetry',
      'Zero-Downtime Deployment',
    ],
    coverImage: data.coverImage,
    coverImageUrl: getStrapiMediaUrl(data.coverImage) || data.coverImageUrl || undefined,
    actionText: data.actionText || 'Inspect Architecture',
    actionUrl: data.actionUrl || `/services`,
  };
}

/**
 * Fetches all separate Service Flip Cards from Strapi
 */
export async function fetchServiceFlipCards(): Promise<ServiceFlipCardItem[]> {
  try {
    const page = await fetchServicesPageContent();
    return page.flipCards && page.flipCards.length > 0 ? page.flipCards : DEFAULT_SERVICE_FLIP_CARDS;
  } catch (error) {
    console.warn('[Strapi] Could not load service flip cards from Single Type, using defaults:', error);
    return DEFAULT_SERVICE_FLIP_CARDS;
  }
}

/**
 * React Hook for Service Flip Cards
 */
export function useServiceFlipCards() {
  const [flipCards, setFlipCards] = useState<ServiceFlipCardItem[]>(DEFAULT_SERVICE_FLIP_CARDS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchServiceFlipCards()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) setFlipCards(data);
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

  return { flipCards, isLoading, error };
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const page = await fetchServicesPageContent();
    const found = page.services.find((s) => s.slug === slug || s.id === slug);
    if (found) return found;

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
    avatarUrl: 'https://picsum.photos/seed/524317474/1200/800',
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
    avatarUrl: 'https://picsum.photos/seed/310472034/1200/800',
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
    avatarUrl: 'https://picsum.photos/seed/970296839/1200/800',
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
    avatarUrl: 'https://picsum.photos/seed/1942862530/1200/800',
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
    avatarUrl: 'https://picsum.photos/seed/1557439118/1200/800',
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
  imageUrl?: string;
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
          imageUrl: getStrapiMediaUrl(f.image) || f.imageUrl || undefined,
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
      'products?populate[features][populate]=*&populate[kpiStats][populate]=*&populate[heroMedia][populate]=*&sort=order:asc'
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
      `products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[features][populate]=*&populate[kpiStats][populate]=*&populate[heroMedia][populate]=*`
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
  kpiStats: { label: string; value: string }[];
}

export interface AboutStorySlide {
  id?: number | string;
  orderNumber?: string;
  badge: string;
  headline: string;
  description: string;
  quote?: string;
  highlights?: { id?: string | number; title: string; description: string }[];
  imageUrl?: string;
}

export interface AboutFaqSectionData {
  badge: string;
  headline: string;
  description: string;
  faqs: AboutFaqItem[];
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
  storySlides: AboutStorySlide[];
  faqSection: AboutFaqSectionData;
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
    kpiStats: [
      { label: 'In-House Engineers', value: '100%' },
      { label: 'Clutch / G2 Rating', value: '4.9★' },
      { label: 'Avg API Latency', value: '<100ms' },
      { label: 'Production SLA', value: '99.98%' },
    ],
  },
  storySlides: [
    {
      id: '1',
      orderNumber: '01',
      badge: 'Who We Are',
      headline: 'Not just another dev shop.',
      description:
        'AProgra was built on a single belief — that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.',
      highlights: [
        { id: '1', title: 'In-house only', description: 'Every line of code written by our team' },
        { id: '2', title: 'End-to-end ownership', description: 'Design through deployment' },
        { id: '3', title: 'Hyderabad-based', description: 'Working with clients across 12 countries' },
      ],
      imageUrl: 'https://picsum.photos/seed/1693179706/1200/800',
    },
    {
      id: '2',
      orderNumber: '02',
      badge: 'Our Mission',
      headline: 'Build software that actually matters.',
      description:
        'Our mission is simple — engineer products that solve real problems, for real people, with real business impact. We measure success not in lines of code but in businesses transformed.',
      quote: '"To make world-class engineering accessible to every visionary who dares to build."',
      highlights: [],
      imageUrl: 'https://picsum.photos/seed/160668355/1200/800',
    },
    {
      id: '3',
      orderNumber: '03',
      badge: 'Our Vision',
      headline: 'The engineering partner for the next generation of global tech leaders.',
      description:
        'We envision a world where founders and enterprises can build, scale, and transform their digital capabilities with zero compromise on engineering standards or velocity.',
      highlights: [
        { id: '1', title: 'Global Reach', description: 'Serving visionaries across 12+ countries with scale-ready architecture' },
        { id: '2', title: 'Agentic & Autonomous Speed', description: 'Integrating cutting-edge AI workflows with human craftsmanship' },
        { id: '3', title: 'Infinite Scale', description: 'Architected from day one to handle millions of active users' },
      ],
      imageUrl: 'https://picsum.photos/seed/1243328472/1200/800',
    },
  ],
  faqSection: {
    badge: 'Got Questions?',
    headline: 'Questions We Actually Get Asked',
    description: 'And honest answers to all of them.',
    faqs: [
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
    photoUrl: 'https://picsum.photos/seed/2107961656/1200/800',
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
    photoUrl: 'https://picsum.photos/seed/1328796596/1200/800',
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
    photoUrl: 'https://picsum.photos/seed/2067071718/1200/800',
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
    photoUrl: 'https://picsum.photos/seed/240679240/1200/800',
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
    photoUrl: 'https://picsum.photos/seed/755434489/1200/800',
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

      kpiStats: Array.isArray(hero.kpiStats) && hero.kpiStats.length > 0
        ? hero.kpiStats.map((k: any) => ({
            label: k.label || '',
            value: k.value || '',
          }))
        : DEFAULT_ABOUT_PAGE_DATA.hero.kpiStats,
    },
    storySlides: Array.isArray(data.storySlides) && data.storySlides.length > 0
      ? data.storySlides.map((s: any, idx: number) => ({
          id: s.id || `slide-${idx}`,
          orderNumber: s.orderNumber || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`),
          badge: s.badge || '',
          headline: s.headline || '',
          description: s.description || '',
          quote: s.quote || undefined,
          highlights: Array.isArray(s.highlights)
            ? s.highlights.map((h: any) => ({
                id: h.id,
                title: h.title || '',
                description: h.description || '',
              }))
            : [],
          imageUrl: getStrapiMediaUrl(s.image) || s.imageUrl || undefined,
        }))
      : DEFAULT_ABOUT_PAGE_DATA.storySlides,
    faqSection: data.faqSection
      ? {
          badge: data.faqSection.badge || DEFAULT_ABOUT_PAGE_DATA.faqSection.badge,
          headline: data.faqSection.headline || DEFAULT_ABOUT_PAGE_DATA.faqSection.headline,
          description: data.faqSection.description || DEFAULT_ABOUT_PAGE_DATA.faqSection.description,
          faqs: Array.isArray(data.faqSection.faqs) && data.faqSection.faqs.length > 0
            ? data.faqSection.faqs.map((f: any, idx: number) => ({
                id: String(f.id || idx + 1),
                question: f.question || '',
                answer: f.answer || '',
                category: f.category || 'General',
                order: f.order ?? idx + 1,
              }))
            : DEFAULT_ABOUT_PAGE_DATA.faqSection.faqs,
        }
      : DEFAULT_ABOUT_PAGE_DATA.faqSection,
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
      'about-page?populate[hero][populate]=*&populate[storySlides][populate]=*&populate[faqSection][populate]=*&populate[contactCta][populate]=*'
    );
    
    console.log('[Strapi] fetchAboutPage raw response:', raw);
    if (!raw) {
      console.warn('[Strapi] fetchAboutPage: raw is null/undefined, using defaults');
      return DEFAULT_ABOUT_PAGE_DATA;
    }
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
    ? skillsRaw.map((s: any) => {
        if (typeof s === 'string') return s;
        if (s.name) return s.name;
        return '';
      }).filter(Boolean)
    : typeof skillsRaw === 'string'
    ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  return {
    id: String(raw.documentId || raw.id || data.name),
    name: data.name || 'Team Member',
    role: data.role || 'Software Engineer',
    bio: data.bio || '',
    photoUrl: getStrapiMediaUrl(data.photo) || data.photoUrl || 'https://picsum.photos/seed/2107961656/1200/800',
    skills: skillsArray.length > 0 ? skillsArray : ['Engineering', 'Architecture'],
    linkedinUrl: data.linkedinUrl || undefined,
    githubUrl: data.githubUrl || undefined,
    twitterUrl: data.twitterUrl || undefined,
    order: typeof data.order === 'number' ? data.order : 0,
  };
}

export async function fetchTeamMembers(): Promise<TeamMemberItem[]> {
  try {
    const raw = await fetchFromStrapi<any>('team-members?populate[photo]=true&populate[skills]=true&sort=order:asc');
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
    const page = await fetchAboutPage();
    return page.faqSection.faqs || DEFAULT_ABOUT_FAQS;
  } catch (error) {
    console.warn('[Strapi] Could not load About FAQs from Single Type, using defaults:', error);
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

export interface HomeHeroSlide {
  id: string;
  badgeText: string;
  title: string;
  subtitle: string;
  primaryValue?: string;
  tags: string[];
  imageUrl?: string;
  imageLabel?: string;
  imageSublabel?: string;
}

export interface HomeStat {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

export interface HomeStatsSection {
  badgeText: string;
  title: string;
  stats: HomeStat[];
}

export interface HomeStoryPhase {
  id: string;
  badgeText: string;
  title: string;
  description: string;
  imageUrl?: string;
  showMetricsGrid: boolean;
}

export interface HomeStatement {
  id: string;
  mainText: string;
  subText: string;
}

export interface HomeServiceSlide {
  id: string;
  orderNumber: string;
  badgeText: string;
  title: string;
  description: string;
  tags: string[];
  serviceUrl: string;
  serviceUrlText: string;
  imageUrl?: string;
}

export interface HomeProductCard {
  id: string;
  badge: string;
  versionStatus: string;
  category: string;
  categorySubtext: string;
  title: string;
  description: string;
  specs: string[];
  productUrl: string;
  productUrlText: string;
  demoUrl: string;
  demoUrlText: string;
  imageUrl?: string;
}

export interface HomePageData {
  title: string;
  heroSlides: HomeHeroSlide[];
  statsSection: HomeStatsSection;
  storyPhases: HomeStoryPhase[];
  whyStatements: HomeStatement[];
  servicesSlides: HomeServiceSlide[];
  productsCards: HomeProductCard[];
}

export const DEFAULT_HOME_PAGE_DATA: HomePageData = {
  title: "Home Page",
  heroSlides: [
    {
      id: "1",
      badgeText: "Modern Software & AI",
      title: "Engineering Software Without Limits.",
      subtitle: "Full-cycle software engineering, architectural consulting, and autonomous AI systems for scale-ups and global enterprises.",
      tags: ["High-Performance Computing", "Enterprise AI", "Cloud Native"],
      imageUrl: "https://picsum.photos/seed/2083954623/1200/800",
      imageLabel: "Architecture Stack",
      imageSublabel: "Production Ready",
    },
    {
      id: "2",
      badgeText: "Production Deployments",
      title: "Commercial SaaS & ERP Platforms",
      primaryValue: "40+",
      subtitle: "We don't just build MVPs. We engineer and maintain mission-critical platforms that run real businesses with 99.99% SLA guarantees.",
      tags: ["Multi-Tenant SaaS", "ERP Systems", "High Availability"],
      imageUrl: "https://picsum.photos/seed/1243328472/1200/800",
      imageLabel: "Global Footprint",
      imageSublabel: "12 Countries",
    },
    {
      id: "3",
      badgeText: "Zero Outsourcing",
      title: "Engineered In-House.",
      subtitle: "Every line of code, every system architecture, every pixel—built entirely by our full-stack engineering pods based in our own studios.",
      tags: ["100% In-House", "Dedicated Pods", "Direct Access"],
      imageUrl: "https://picsum.photos/seed/1693179706/1200/800",
      imageLabel: "Engineering Pods",
      imageSublabel: "25+ Specialists",
    }
  ],
  statsSection: {
    badgeText: "PROVEN PERFORMANCE & GLOBAL FOOTPRINT",
    title: "Engineered with Mathematical Precision.",
    stats: [
      { id: "1", target: 60, suffix: "+", label: "Enterprise Partners" },
      { id: "2", target: 40, suffix: "+", label: "Production Systems" },
      { id: "3", target: 12, suffix: "+", label: "Sovereign Regions" },
      { id: "4", target: 7, suffix: "+", label: "Years of Craft" }
    ]
  },
  storyPhases: [
    {
      id: "1",
      badgeText: "Our Story",
      title: "Not just another dev shop.",
      description: "AProgra was built on one belief — that exceptional software requires exceptional people working in exceptional ways. No outsourcing. No guesswork. Just craft.",
      imageUrl: "https://picsum.photos/seed/1323529153/1200/800",
      showMetricsGrid: false
    },
    {
      id: "2",
      badgeText: "How We Work",
      title: "Full-stack. Full-cycle. Full-ownership.",
      description: "From the first discovery call to post-launch support, our in-house team owns every layer. Design. Frontend. Backend. QA. DevOps. All under one roof — your one point of contact.",
      imageUrl: "https://picsum.photos/seed/1678069599/1200/800",
      showMetricsGrid: false
    },
    {
      id: "3",
      badgeText: "Our Team",
      title: "25+ specialists. Zero strangers.",
      description: "Designers who code. Engineers who think about UX. PMs who understand business. Everyone at AProgra is a specialist — and everyone cares about your product like it's their own.",
      imageUrl: "https://picsum.photos/seed/1693179706/1200/800",
      showMetricsGrid: false
    },
    {
      id: "4",
      badgeText: "Our Reach",
      title: "Built here. Shipped everywhere.",
      description: "40+ products live in market. 60+ clients across 12 countries. From Hyderabad to Houston, our software runs real businesses.",
      imageUrl: "https://picsum.photos/seed/1243328472/1200/800",
      showMetricsGrid: true
    }
  ],
  whyStatements: [
    { id: "1", mainText: "100%", subText: "In-house Talent" },
    { id: "2", mainText: "Infinite", subText: "Possibilities" },
    { id: "3", mainText: "One", subText: "Partner" }
  ],
  servicesSlides: [
    {
      id: "1",
      orderNumber: "01",
      badgeText: "Core Service",
      title: "Product Engineering",
      description: "We don't just build features — we engineer products. From architecture decisions to deployment pipelines, every choice we make is deliberate, scalable, and built to last.",
      tags: ["Discovery", "Architecture", "Development", "QA", "Launch"],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://picsum.photos/seed/611021275/1200/800"
    },
    {
      id: "2",
      orderNumber: "02",
      badgeText: "Mobile Systems",
      title: "Mobile Development",
      description: "iOS, Android, or cross-platform. We build mobile experiences that feel native, perform flawlessly, and keep users coming back. Offline-first, animation-rich, crash-free.",
      tags: ["iOS & Android", "React Native", "Flutter", "Offline-First", "App Store Ops"],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://picsum.photos/seed/1897555988/1200/800"
    },
    {
      id: "3",
      orderNumber: "03",
      badgeText: "Applied AI",
      title: "AI Integration & Automation",
      description: "From custom LLM integrations to intelligent workflow automations — we make AI work for your actual business, not just your marketing copy.",
      tags: ["LLM Pipelines", "RAG Systems", "Agents & Swarms", "Data Triage", "Fine-Tuning"],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://picsum.photos/seed/646225886/1200/800"
    },
    {
      id: "4",
      orderNumber: "04",
      badgeText: "Product Design",
      title: "UI/UX & Design Systems",
      description: "Design that converts. Interfaces that feel effortless. We craft design systems, component libraries, and end-to-end user journeys that elevate your brand.",
      tags: ["Design Systems", "Component Libraries", "Wireframing", "Motion Design", "Figma to Code"],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://picsum.photos/seed/468325482/1200/800"
    },
    {
      id: "5",
      orderNumber: "05",
      badgeText: "Cloud & SRE",
      title: "Cloud Architecture & DevOps",
      description: "Infrastructure that scales without drama. CI/CD pipelines that deploy with confidence. Cloud architectures engineered for 99.99% uptime and zero maintenance headaches.",
      tags: ["AWS / GCP", "Docker & K8s", "CI/CD Pipelines", "Zero-Downtime", "24/7 Monitoring"],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://picsum.photos/seed/54940735/1200/800"
    },
    {
      id: "6",
      orderNumber: "06",
      badgeText: "Modernization",
      title: "Legacy Modernization & Audits",
      description: "Inherited a codebase that gives you nightmares? We audit, refactor, and migrate legacy systems into clean, modern architectures without disrupting your live operations.",
      tags: ["Architecture Audits", "Codebase Refactoring", "Database Migration", "Performance Tuning", "Zero-Downtime"],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://picsum.photos/seed/1531036511/1200/800"
    }
  ],
  productsCards: [
    {
      id: "1",
      badge: "NOTIFICATION 01 / 02 • SCHOOL ERP",
      versionStatus: "v3.2 OPERATIONAL",
      category: "EdTech Platform",
      categorySubtext: "Multi-Campus Ready",
      title: "SmartSchool ERP",
      description: "The complete operational platform for modern institutions — unifying admissions, fee management, student records, and parent communication.",
      specs: ["Role-Based Portals", "Automated Fee Invoicing", "Instant SMS/WhatsApp Alerts", "Gradebook & Report Cards"],
      productUrl: "/products/school-erp",
      productUrlText: "View Product Details",
      demoUrl: "/contact",
      demoUrlText: "Request Demo →",
      imageUrl: "https://picsum.photos/seed/912714368/1200/800"
    },
    {
      id: "2",
      badge: "NOTIFICATION 02 / 02 • OMNICHAT INBOX",
      versionStatus: "NEW MESSAGE",
      category: "Customer Engagement",
      categorySubtext: "AI-Assisted Inbox",
      title: "OmniChat",
      description: "Unify WhatsApp, Instagram DMs, Email, and SMS into one collaborative inbox powered by autonomous AI response suggestions.",
      specs: ["Omnichannel Inbox", "AI Smart Auto-Drafts", "Shared Team Assignments", "SLA & Analytics Tracking"],
      productUrl: "/products/omnichat",
      productUrlText: "View Product Details",
      demoUrl: "/contact",
      demoUrlText: "Request Demo →",
      imageUrl: "https://picsum.photos/seed/862930265/1200/800"
    }
  ]
};

export async function fetchHomePage(): Promise<HomePageData> {
  try {
    const raw = await fetchFromStrapi<any>(
      'home-page?populate[heroSlides][populate]=*&populate[statsSection][populate]=*&populate[storyPhases][populate]=*&populate[whyStatements][populate]=*&populate[servicesSlides][populate]=*&populate[productsCards][populate]=*'
    );
    
    if (!raw) {
      return DEFAULT_HOME_PAGE_DATA;
    }
    
    const data = raw.attributes || raw;
    
    // Normalize heroSlides
    const rawHeroSlides = data.heroSlides;
    const heroSlides = Array.isArray(rawHeroSlides) && rawHeroSlides.length > 0 ? rawHeroSlides.map((slide: any, idx: number) => ({
      id: String(slide.id),
      badgeText: slide.badgeText || '',
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      primaryValue: slide.primaryValue || undefined,
      tags: Array.isArray(slide.tags) ? slide.tags.map((t: any) => t.label || t.name || '').filter(Boolean) : [],
      imageUrl: getStrapiMediaUrl(slide.image) || slide.imageUrl || DEFAULT_HOME_PAGE_DATA.heroSlides[idx]?.imageUrl || "https://picsum.photos/seed/default/1200/800",
      imageLabel: slide.imageLabel || undefined,
      imageSublabel: slide.imageSublabel || undefined,
    })) : DEFAULT_HOME_PAGE_DATA.heroSlides;

    // Normalize statsSection
    const rawStatsSection = data.statsSection || {};
    const statsSection = {
      badgeText: rawStatsSection.badgeText || DEFAULT_HOME_PAGE_DATA.statsSection.badgeText,
      title: rawStatsSection.title || DEFAULT_HOME_PAGE_DATA.statsSection.title,
      stats: Array.isArray(rawStatsSection.stats) && rawStatsSection.stats.length > 0 ? rawStatsSection.stats.map((s: any) => ({
        id: String(s.id),
        target: s.target || 0,
        suffix: s.suffix || '',
        label: s.label || ''
      })) : DEFAULT_HOME_PAGE_DATA.statsSection.stats
    };

    // Normalize storyPhases
    const rawStoryPhases = data.storyPhases;
    const storyPhases = Array.isArray(rawStoryPhases) && rawStoryPhases.length > 0 ? rawStoryPhases.map((phase: any, idx: number) => ({
      id: String(phase.id),
      badgeText: phase.badgeText || '',
      title: phase.title || '',
      description: phase.description || '',
      imageUrl: getStrapiMediaUrl(phase.image) || phase.imageUrl || DEFAULT_HOME_PAGE_DATA.storyPhases[idx]?.imageUrl || "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
      showMetricsGrid: !!phase.showMetricsGrid
    })) : DEFAULT_HOME_PAGE_DATA.storyPhases;

    // Normalize whyStatements
    const rawWhyStatements = data.whyStatements;
    const whyStatements = Array.isArray(rawWhyStatements) && rawWhyStatements.length > 0 ? rawWhyStatements.map((stmt: any) => ({
      id: String(stmt.id),
      mainText: stmt.mainText || '',
      subText: stmt.subText || ''
    })) : DEFAULT_HOME_PAGE_DATA.whyStatements;

    // Normalize servicesSlides
    const rawServicesSlides = data.servicesSlides;
    const servicesSlides = Array.isArray(rawServicesSlides) && rawServicesSlides.length > 0 ? rawServicesSlides.map((s: any, idx: number) => ({
      id: String(s.id),
      orderNumber: s.orderNumber || '01',
      badgeText: s.badgeText || '',
      title: s.title || '',
      description: s.description || '',
      tags: Array.isArray(s.tags) ? s.tags.map((t: any) => t.label || t.name || '').filter(Boolean) : [],
      serviceUrl: s.serviceUrl || '/services',
      serviceUrlText: s.serviceUrlText || 'Explore Service',
      imageUrl: getStrapiMediaUrl(s.image) || s.imageUrl || DEFAULT_HOME_PAGE_DATA.servicesSlides[idx]?.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    })) : DEFAULT_HOME_PAGE_DATA.servicesSlides;

    // Normalize productsCards
    const rawProductsCards = data.productsCards;
    const productsCards = Array.isArray(rawProductsCards) && rawProductsCards.length > 0 ? rawProductsCards.map((p: any, idx: number) => ({
      id: String(p.id),
      badge: p.badge || '',
      versionStatus: p.versionStatus || '',
      category: p.category || '',
      categorySubtext: p.categorySubtext || '',
      title: p.title || '',
      description: p.description || '',
      specs: Array.isArray(p.specs) ? p.specs.map((sp: any) => sp.label || sp.name || '').filter(Boolean) : [],
      productUrl: p.productUrl || '/products',
      productUrlText: p.productUrlText || 'View Product Details',
      demoUrl: p.demoUrl || '/contact',
      demoUrlText: p.demoUrlText || 'Request Demo →',
      imageUrl: getStrapiMediaUrl(p.image) || p.imageUrl || DEFAULT_HOME_PAGE_DATA.productsCards[idx]?.imageUrl || "https://picsum.photos/seed/default/1200/800",
    })) : DEFAULT_HOME_PAGE_DATA.productsCards;
    
    return {
      title: data.title || DEFAULT_HOME_PAGE_DATA.title,
      heroSlides,
      statsSection,
      storyPhases,
      whyStatements,
      servicesSlides,
      productsCards
    };
  } catch (error) {
    console.warn('[Strapi] Could not load Home Page content, using defaults:', error);
    return DEFAULT_HOME_PAGE_DATA;
  }
}

export function useHomePage() {
  const [homePage, setHomePage] = useState<HomePageData>(DEFAULT_HOME_PAGE_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchHomePage()
      .then((data) => {
        if (isMounted) {
          if (data) setHomePage(data);
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

  return { homePage, isLoading, error };
}

// ---------------------------------------------------------------------------
// PRODUCTS PAGE
// ---------------------------------------------------------------------------

export interface TrustItem {
  name: string;
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  badge?: string;
  title: string;
  href: string;
  actionText: string;
}

export interface ProductsPageConfig {
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  kpi1Value: string;
  kpi1Label: string;
  kpi2Value: string;
  kpi2Label: string;
  kpi3Value: string;
  kpi3Label: string;
  smartSchoolImageUrl?: string;
  omnichatImageUrl?: string;
  trustBadge: string;
  trustHeadline: string;
  trustDescription: string;
  trustItems: TrustItem[];
  contactBadge: string;
  contactHeadline: string;
  contactDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  inquiryFormTitle: string;
  inquiryFormSubtitle: string;
  inquiryButtonText: string;
}

const DEFAULT_PRODUCTS_PAGE: ProductsPageConfig = {
  heroBadge: "Proprietary SaaS Ecosystem",
  heroHeadline: "Software We Built. Powering Real Scale.",
  heroDescription: "We engineer, operate, and scale proprietary SaaS platforms and AI automation engines running in 24/7 live production.",
  kpi1Value: "2",
  kpi1Label: "SAAS ECOSYSTEMS",
  kpi2Value: "17",
  kpi2Label: "LIVE MODULES",
  kpi3Value: "480+",
  kpi3Label: "CAMPUSES & CLIENTS",
  trustBadge: "Reliability & Craft Standards",
  trustHeadline: "Why Teams Trust Aprogra Products",
  trustDescription: "We don't build vaporware or speculative prototypes. Every system is engineered with founder-level devotion, multi-layered reliability, and real-time observability.",
  trustItems: [
    {
      name: "In-House Codebase",
      target: 100,
      suffix: "%",
      decimals: 0,
      badge: "Zero Subcontracting",
      title: "Battle-Tested In Production",
      href: "/products/school-erp",
      actionText: "Explore codebase architecture",
    },
    {
      name: "Production SLA",
      target: 99.98,
      suffix: "%",
      decimals: 2,
      badge: "Cloud-Native HA",
      title: "Multi-Tenant Architecture",
      href: "/services",
      actionText: "View uptime & infra SLA",
    },
    {
      name: "Daily Active Users",
      target: 120,
      suffix: "K+",
      decimals: 0,
      badge: "Enterprise Scale",
      title: "Proven Real-World Volume",
      href: "/products/omnichat",
      actionText: "View scale benchmarks",
    },
    {
      name: "Response Time SLA",
      target: 24,
      suffix: "/7",
      decimals: 0,
      badge: "Guaranteed SLA",
      title: "Direct Core Team Support",
      href: "/contact",
      actionText: "Connect with lead architects",
    }
  ],
  contactBadge: "LET'S CONNECT",
  contactHeadline: "Ready to Build Something Infinite?",
  contactDescription: "Whether you have a fully scoped product brief or just an ambitious concept, our technical architects are standing by to explore your vision.",
  contactEmail: "hello@aprogra.com",
  contactPhone: "+1 (800) 555-0199",
  contactLocation: "Hyderabad, India • Global Remote Pods",
  inquiryFormTitle: "Quick Inquiry",
  inquiryFormSubtitle: "Direct line to our technical architecture pod.",
  inquiryButtonText: "Send Inquiry"
};

export async function fetchProductsPage(): Promise<ProductsPageConfig> {
  try {
    const raw = await fetchFromStrapi<any>('products-page?populate[trustItems][populate]=*&populate[smartSchoolImage][populate]=*&populate[omnichatImage][populate]=*');
    if (!raw) return DEFAULT_PRODUCTS_PAGE;
    
    const data = raw.attributes || raw;
    
    const rawTrustItems = data.trustItems;
    const trustItems = Array.isArray(rawTrustItems) && rawTrustItems.length > 0 ? rawTrustItems.map((item: any, idx: number) => ({
      name: item.name || DEFAULT_PRODUCTS_PAGE.trustItems[idx]?.name || 'Metric',
      target: typeof item.target === 'number' ? item.target : (parseFloat(item.target) || 100),
      prefix: item.prefix || '',
      suffix: item.suffix || '',
      decimals: typeof item.decimals === 'number' ? item.decimals : 0,
      badge: item.badge || '',
      title: item.title || '',
      href: item.href || '/contact',
      actionText: item.actionText || 'Learn More',
    })) : DEFAULT_PRODUCTS_PAGE.trustItems;

    return {
      heroBadge: data.heroBadge || DEFAULT_PRODUCTS_PAGE.heroBadge,
      heroHeadline: data.heroHeadline || DEFAULT_PRODUCTS_PAGE.heroHeadline,
      heroDescription: data.heroDescription || DEFAULT_PRODUCTS_PAGE.heroDescription,
      kpi1Value: data.kpi1Value || DEFAULT_PRODUCTS_PAGE.kpi1Value,
      kpi1Label: data.kpi1Label || DEFAULT_PRODUCTS_PAGE.kpi1Label,
      kpi2Value: data.kpi2Value || DEFAULT_PRODUCTS_PAGE.kpi2Value,
      kpi2Label: data.kpi2Label || DEFAULT_PRODUCTS_PAGE.kpi2Label,
      kpi3Value: data.kpi3Value || DEFAULT_PRODUCTS_PAGE.kpi3Value,
      kpi3Label: data.kpi3Label || DEFAULT_PRODUCTS_PAGE.kpi3Label,
      smartSchoolImageUrl: getStrapiMediaUrl(data.smartSchoolImage) || undefined,
      omnichatImageUrl: getStrapiMediaUrl(data.omnichatImage) || undefined,
      trustBadge: data.trustBadge || DEFAULT_PRODUCTS_PAGE.trustBadge,
      trustHeadline: data.trustHeadline || DEFAULT_PRODUCTS_PAGE.trustHeadline,
      trustDescription: data.trustDescription || DEFAULT_PRODUCTS_PAGE.trustDescription,
      trustItems,
      contactBadge: data.contactBadge || DEFAULT_PRODUCTS_PAGE.contactBadge,
      contactHeadline: data.contactHeadline || DEFAULT_PRODUCTS_PAGE.contactHeadline,
      contactDescription: data.contactDescription || DEFAULT_PRODUCTS_PAGE.contactDescription,
      contactEmail: data.contactEmail || DEFAULT_PRODUCTS_PAGE.contactEmail,
      contactPhone: data.contactPhone || DEFAULT_PRODUCTS_PAGE.contactPhone,
      contactLocation: data.contactLocation || DEFAULT_PRODUCTS_PAGE.contactLocation,
      inquiryFormTitle: data.inquiryFormTitle || DEFAULT_PRODUCTS_PAGE.inquiryFormTitle,
      inquiryFormSubtitle: data.inquiryFormSubtitle || DEFAULT_PRODUCTS_PAGE.inquiryFormSubtitle,
      inquiryButtonText: data.inquiryButtonText || DEFAULT_PRODUCTS_PAGE.inquiryButtonText,
    };
  } catch (error) {
    console.warn('[Strapi] Could not load Products Page content, using defaults:', error);
    return DEFAULT_PRODUCTS_PAGE;
  }
}

export function useProductsPage() {
  const [productsPage, setProductsPage] = useState<ProductsPageConfig>(DEFAULT_PRODUCTS_PAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchProductsPage()
      .then((data) => {
        if (isMounted) {
          if (data) setProductsPage(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { productsPage, isLoading };
}

// ============================================================================
// CAREERS & CAREER PAGE CMS INTERFACES & HOOKS
// ============================================================================

export interface CultureItem {
  number: string;
  title: string;
  description: string;
}

export interface CareerPageConfig {
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  positionsBadge: string;
  positionsTitle: string;
  positionsDescription: string;
  cultureBadge: string;
  cultureTitle: string;
  cultureItems: CultureItem[];
}

export interface CareerRole {
  id: string | number;
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
  order: number;
}

const DEFAULT_CAREER_PAGE: CareerPageConfig = {
  heroBadge: "Careers at Aprogra",
  heroHeadline: "Build the software that defines the next decade.",
  heroDescription: "We are a tight-knit collective of systems architects, AI engineers, and product designers obsessed with craftsmanship, performance, and engineering velocity.",
  positionsBadge: "Open Positions",
  positionsTitle: "Join our engineering squad",
  positionsDescription: "We review every submission carefully. All roles are available for high-performing remote contributors globally.",
  cultureBadge: "Our Operating Principles",
  cultureTitle: "How we work together",
  cultureItems: [
    { number: "01 / FIRST PRINCIPLES", title: "Substance Over Noise", description: "We avoid resume-driven development. Every architectural choice is made for speed, reliability, and real-world user value." },
    { number: "02 / HIGH AUTONOMY", title: "Ownership Mentality", description: "Engineers own their systems from initial whiteboarding to production telemetry. No bureaucratic layers or endless standups." },
    { number: "03 / COMPENSATIVE VALUE", title: "Top-of-Market Comp", description: "We offer competitive base salaries, equity participation, top-tier health coverage, and modern home office allowances." }
  ]
};

const DEFAULT_CAREERS: CareerRole[] = [
  {
    id: 'lead-ai-engineer',
    slug: 'lead-ai-engineer',
    title: 'Senior AI & LLM Systems Engineer',
    team: 'AI & Machine Intelligence',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    description: 'Lead the architecture of our agentic AI infrastructure, multi-agent workflows, and custom enterprise fine-tuning pipelines.',
    tags: ['Python', 'PyTorch', 'LangChain', 'vLLM', 'Distributed Systems'],
    order: 1
  },
  {
    id: 'staff-fullstack-engineer',
    slug: 'staff-fullstack-engineer',
    title: 'Staff Full-Stack Architect (React / Node)',
    team: 'Core Platform Engineering',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    description: 'Design and scale resilient high-throughput cloud web applications, real-time sync systems, and modular component ecosystems.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
    order: 2
  },
  {
    id: 'lead-mobile-architect',
    slug: 'lead-mobile-architect',
    title: 'Lead Mobile Engineer (React Native / Flutter)',
    team: 'Mobile Experiences',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Craft buttery-smooth 60fps mobile applications for enterprise clients across iOS and Android with offline-first sync architecture.',
    tags: ['React Native', 'Swift', 'Kotlin', 'SQLite', 'WebSockets'],
    order: 3
  },
  {
    id: 'product-designer',
    slug: 'product-designer',
    title: 'Senior Product & UI/UX Designer',
    team: 'Product Design & Brand',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    description: 'Establish thoughtful design systems, spatial layouts, and high-fidelity prototypes for next-generation digital products.',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    order: 4
  }
];

export async function fetchCareerPage(): Promise<CareerPageConfig> {
  try {
    const raw = await fetchFromStrapi<any>('career-page?populate[cultureItems][populate]=*');
    if (!raw) return DEFAULT_CAREER_PAGE;

    const data = raw.attributes || raw;
    const rawCultureItems = data.cultureItems;
    const cultureItems = Array.isArray(rawCultureItems) && rawCultureItems.length > 0
      ? rawCultureItems.map((c: any, idx: number) => ({
          number: c.number || DEFAULT_CAREER_PAGE.cultureItems[idx]?.number || `0${idx + 1}`,
          title: c.title || DEFAULT_CAREER_PAGE.cultureItems[idx]?.title || 'Principle',
          description: c.description || DEFAULT_CAREER_PAGE.cultureItems[idx]?.description || '',
        }))
      : DEFAULT_CAREER_PAGE.cultureItems;

    return {
      heroBadge: data.heroBadge || DEFAULT_CAREER_PAGE.heroBadge,
      heroHeadline: data.heroHeadline || DEFAULT_CAREER_PAGE.heroHeadline,
      heroDescription: data.heroDescription || DEFAULT_CAREER_PAGE.heroDescription,
      positionsBadge: data.positionsBadge || DEFAULT_CAREER_PAGE.positionsBadge,
      positionsTitle: data.positionsTitle || DEFAULT_CAREER_PAGE.positionsTitle,
      positionsDescription: data.positionsDescription || DEFAULT_CAREER_PAGE.positionsDescription,
      cultureBadge: data.cultureBadge || DEFAULT_CAREER_PAGE.cultureBadge,
      cultureTitle: data.cultureTitle || DEFAULT_CAREER_PAGE.cultureTitle,
      cultureItems,
    };
  } catch (error) {
    console.warn('[Strapi] Could not load Career Page content, using defaults:', error);
    return DEFAULT_CAREER_PAGE;
  }
}

export async function fetchCareers(): Promise<CareerRole[]> {
  try {
    const raw = await fetchFromStrapi<any>('careers?sort=order:asc');
    if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_CAREERS;

    return raw.map((item: any, idx: number) => {
      const data = item.attributes || item;
      const rawTags = data.tags;
      let tags: string[] = [];
      if (Array.isArray(rawTags)) {
        tags = rawTags.map((t: any) => (typeof t === 'string' ? t : t.label || t.name || String(t)));
      } else if (typeof rawTags === 'string') {
        tags = rawTags.split(',').map((t) => t.trim()).filter(Boolean);
      } else {
        tags = DEFAULT_CAREERS[idx]?.tags || [];
      }

      return {
        id: data.id || item.id || data.slug || idx,
        slug: data.slug || `role-${idx}`,
        title: data.title || 'Career Role',
        team: data.team || 'Engineering',
        location: data.location || 'Remote',
        type: data.type || 'Full-time',
        description: data.description || '',
        tags,
        order: typeof data.order === 'number' ? data.order : idx + 1,
      };
    });
  } catch (error) {
    console.warn('[Strapi] Could not load Careers list, using defaults:', error);
    return DEFAULT_CAREERS;
  }
}

export function useCareerPage() {
  const [careerPage, setCareerPage] = useState<CareerPageConfig>(DEFAULT_CAREER_PAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchCareerPage()
      .then((data) => {
        if (isMounted) {
          if (data) setCareerPage(data);
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

  return { careerPage, isLoading };
}

export function useCareers() {
  const [careers, setCareers] = useState<CareerRole[]>(DEFAULT_CAREERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchCareers()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) setCareers(data);
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

  return { careers, isLoading };
}
