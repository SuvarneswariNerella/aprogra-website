import type { Core } from '@strapi/strapi';

const DEFAULT_GLOBAL_CONFIG_SEED_DATA = {
  header: {
    siteTitle: 'Aprogra',
    displayMode: 'logo_and_text' as const,
    logoUrl: '',
    navLinks: [
      { label: 'Home', url: '/', order: 1, isExternal: false },
      { label: 'About', url: '/about', order: 2, isExternal: false },
      { label: 'Products', url: '/products', order: 3, isExternal: false },
      { label: 'Services', url: '/services', order: 4, isExternal: false },
      { label: 'Blog', url: '/blog', order: 5, isExternal: false },
      { label: 'Contact', url: '/contact', order: 6, isExternal: false },
    ],
  },
  footer: {
    brandTitle: 'Aprogra',
    brandSubtitle: 'Technologies',
    displayMode: 'logo_and_text' as const,
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
      { platform: 'github' as const, label: 'GitHub', url: 'https://github.com', order: 1 },
      { platform: 'linkedin' as const, label: 'LinkedIn', url: 'https://linkedin.com', order: 2 },
      { platform: 'twitter' as const, label: 'X Twitter', url: 'https://twitter.com', order: 3 },
    ],
    legalLinks: [
      { label: 'Privacy Policy', url: '/contact', isExternal: false, order: 1 },
      { label: 'Terms of Service', url: '/contact', isExternal: false, order: 2 },
      { label: 'Security & Compliance', url: '/contact', isExternal: false, order: 3 },
      { label: 'Cookie Settings', url: '/contact', isExternal: false, order: 4 },
    ],
    copyrightText: '© 2026 Aprogra Technologies Inc. All rights reserved.',
    backToTopText: 'Back to top',
  },
};

const DEFAULT_CATEGORIES_SEED_DATA = [
  { name: 'AI & Automation', slug: 'ai-automation', order: 1, description: 'LLMs, agentic workflows, autonomous reasoning engines' },
  { name: 'Engineering & Architecture', slug: 'engineering-architecture', order: 2, description: 'Distributed systems, database topologies, microservices' },
  { name: 'Product & Design', slug: 'product-design', order: 3, description: 'Design systems, micro-interactions, UX choreography' },
  { name: 'Cloud & DevOps', slug: 'cloud-devops', order: 4, description: 'Kubernetes, CI/CD pipelines, zero-downtime deployments' },
  { name: 'Case Studies', slug: 'case-studies', order: 5, description: 'Real-world customer production milestones and scale benchmarks' },
];

const DEFAULT_BLOG_PAGE_SEED_DATA = {
  hero: {
    badge: 'APROGRA TECH RADAR • ENGINEERING BLOG',
    headline: 'Engineering, AI &',
    highlight: 'Product Insights.',
    description: 'Deep architectural breakdowns, real-world agentic AI workflows, modern web design systems, and enterprise systems engineering directly from our architects.',
    searchPlaceholder: 'Search articles by tech stack, topic, or keyword...',
    metric1_text: '45+ Articles',
    metric2_text: '12k+ Monthly Readers',
    metric3_text: 'Weekly Technical Deep Dives',
    heroImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  },
  metaTitle: 'Technical Blog & Engineering Insights | Aprogra',
  metaDescription: 'Deep architectural breakdowns, AI workflows, web performance, and engineering dispatch from Aprogra.',
};

const DEFAULT_BLOG_POSTS_SEED_DATA = [
  {
    title: 'Building Production Agentic AI Workflows with TypeScript & Gemini 1.5',
    slug: 'agentic-ai-workflows',
    excerpt: 'How we architect autonomous agentic pipelines that run function calling, multi-step orchestration, and real-time state synchronization with sub-second latency.',
    category: 'AI & Automation',
    readTime: '6 min read',
    featured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    tags: ['AI Agents', 'Gemini API', 'TypeScript', 'LLM Ops'],
    content: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Agentic AI workflows represent a fundamental shift in modern software development: moving from simple prompt-and-response paradigms toward truly autonomous, multi-step task execution.' }]
      }
    ],
  },
  {
    title: 'Sub-Millisecond Edge Rendering: Next.js 15 & Distributed SQLite Sync',
    slug: 'edge-rendering-sqlite-sync',
    excerpt: 'Deep-dive into local-first architecture, CRDT conflict resolution, and geo-replicated SQLite for instant response web apps.',
    category: 'Engineering & Architecture',
    readTime: '8 min read',
    featured: true,
    coverImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    tags: ['Next.js 15', 'Edge Runtime', 'SQLite', 'CRDT'],
    content: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Achieving sub-millisecond edge response times requires moving computation and data as close to the client as physically possible.' }]
      }
    ],
  },
  {
    title: 'Mathematical Token Systems: Deterministic UI Scales in Modern CSS',
    slug: 'mathematical-token-systems',
    excerpt: 'Why hardcoded pixels are obsolete. How we engineer clamp-based typographic scales and variable fluid spacing tokens.',
    category: 'Product & Design',
    readTime: '5 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    tags: ['Design Systems', 'CSS Tokens', 'Typography', 'Figma'],
    content: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Design systems often break down when bridging the gap between static Figma artboards and dynamic multi-screen viewport rendering.' }]
      }
    ],
  },
  {
    title: 'Zero-Downtime Database Migrations at 50,000 QPS',
    slug: 'zero-downtime-db-migrations',
    excerpt: 'Step-by-step methodology for executing backward-compatible schema evolutions on PostgreSQL and MySQL in high-throughput production environments.',
    category: 'Cloud & DevOps',
    readTime: '7 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
    tags: ['PostgreSQL', 'MySQL', 'DevOps', 'High Concurrency'],
    content: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Altering high-volume production tables without locks requires a dual-write and shadow validation migration pattern.' }]
      }
    ],
  },
  {
    title: 'Multi-Tenant Architecture: Row-Level Security vs Isolated Schemas',
    slug: 'multi-tenant-architecture-guide',
    excerpt: 'Comprehensive comparison of multi-tenant isolation patterns for enterprise SaaS platforms scaling beyond 10,000 customer organizations.',
    category: 'Engineering & Architecture',
    readTime: '9 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    tags: ['SaaS', 'RLS', 'Multi-Tenancy', 'Security'],
    content: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Security and data isolation are paramount for enterprise multi-tenant systems.' }]
      }
    ],
  },
  {
    title: 'From Monolith to Event-Driven Micro-Frontends: A Year in Review',
    slug: 'monolith-to-micro-frontends',
    excerpt: 'Lessons learned, pitfalls avoided, and velocity gains realized after migrating a legacy enterprise core into modular autonomous frontend modules.',
    category: 'Case Studies',
    readTime: '6 min read',
    featured: false,
    coverImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    tags: ['Micro-Frontends', 'Architecture', 'Case Study', 'Velocity'],
    content: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Decoupling monolithic web portals into self-contained domain applications allowed dedicated engineering pods to deploy independently.' }]
      }
    ],
  },
];

const DEFAULT_TESTIMONIALS_SEED_DATA = [
  {
    authorName: 'Marcus Vance',
    authorRole: 'Chief Technology Officer',
    authorCompany: 'SaaSify Platforms',
    quote: 'Aprogra delivered our micro-services backend ahead of schedule with zero architectural debt. Their engineers operated like a natural extension of our staff.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Zero architectural debt & ahead of schedule',
    projectTag: 'Cloud Architecture & Kubernetes',
    order: 1,
  },
  {
    authorName: 'Elena Rostova',
    authorRole: 'Founder & CEO',
    authorCompany: 'Horizon AI',
    quote: 'The agentic AI pipelines built by Aprogra automated 70% of our internal data triage workflows. Their mastery of Gemini 1.5 gave us a massive competitive edge.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Automated 70% of internal triage workflows',
    projectTag: 'Agentic AI & Function Calling',
    order: 2,
  },
  {
    authorName: 'Devon Hayes',
    authorRole: 'VP of Engineering',
    authorCompany: 'CloudScale Inc',
    quote: 'From initial brief to production launch in just 6 weeks. The team’s velocity, clean React code, and proactive communication set a new benchmark.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Production launch in 6 weeks',
    projectTag: 'Full-Stack React & Node.js',
    order: 3,
  },
  {
    authorName: 'Priya Patel',
    authorRole: 'Head of Digital Products',
    authorCompany: 'FinTech One',
    quote: 'Their design system and Tailwind CSS component library made our web app lightning fast, accessible, and effortlessly maintainable.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    highlight: 'Lightning fast & accessible design system',
    projectTag: 'Design System & UX/UI',
    order: 4,
  },
  {
    authorName: 'Ravi K.',
    authorRole: 'Director',
    authorCompany: 'SmartSchool',
    quote: 'AProgra delivered our entire school ERP from scratch in 4 months. The quality was exceptional and the team felt like our own.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    highlight: 'School ERP in 4 months',
    projectTag: 'Enterprise Software',
    order: 5,
  },
];

const DEFAULT_BRANDS_SECTION_SEED_DATA = {
  badge: 'CLIENTS & COLLABORATORS',
  headline: 'Brands That Chose to',
  highlight: 'Build Different',
  description: 'We partner with ambitious startups, fast-scaling venture firms, and global enterprises to architect robust, resilient, and human-centric software.',
  footprintText1: 'North America',
  footprintText2: 'United Kingdom & Europe',
  footprintText3: 'Middle East & UAE',
  footprintText4: 'Asia Pacific & India',
};

const DEFAULT_BRANDS_SEED_DATA = [
  { name: 'Noddyy', category: 'Social Platform', location: 'UK', row: 1, order: 1 },
  { name: 'Balcony Originals', category: 'Apparel & Retail', location: 'US', row: 1, order: 2 },
  { name: 'Coventry Strikers', category: 'Sports Tech', location: 'UK', row: 1, order: 3 },
  { name: 'Aguatise', category: 'CleanTech', location: 'UAE', row: 1, order: 4 },
  { name: 'PowerTech Global', category: 'Industrial IoT', location: 'Germany', row: 1, order: 5 },
  { name: 'Star Circle', category: 'Talent Platform', location: 'Singapore', row: 1, order: 6 },
  { name: 'CyberSecure Mindset', category: 'InfoSec Academy', location: 'India', row: 1, order: 7 },
  { name: 'Vertex Logic', category: 'Logistics SaaS', location: 'US', row: 1, order: 8 },
  { name: 'Kroma Intelligence', category: 'FinTech AI', location: 'UK', row: 1, order: 9 },
  { name: 'Aegis BioSystems', category: 'HealthTech', location: 'India', row: 1, order: 10 },
  { name: 'EduNura', category: 'EdTech Engine', location: 'Global', row: 2, order: 1 },
  { name: 'SmartSchool ERP', category: 'School Management', location: 'India', row: 2, order: 2 },
  { name: 'Flowdesk', category: 'Workflow Automation', location: 'US', row: 2, order: 3 },
  { name: 'Nexus Workspace', category: 'Enterprise Collab', location: 'UAE', row: 2, order: 4 },
  { name: 'samai.guru', category: 'Spiritual Tech', location: 'India', row: 2, order: 5 },
  { name: 'OmniChat AI', category: 'Omnichannel AI', location: 'Global', row: 2, order: 6 },
  { name: 'Synthetix Cloud', category: 'Cloud Orchestration', location: 'Germany', row: 2, order: 7 },
  { name: 'DataPulse Systems', category: 'Telemetry & BI', location: 'Singapore', row: 2, order: 8 },
  { name: 'FinEdge Wealth', category: 'Digital Banking', location: 'UK', row: 2, order: 9 },
  { name: 'AProgra Studio', category: 'Core Ecosystem', location: 'Global', row: 2, order: 10 },
];

const getServicesPageSeedData = (): any => ({
  hero: {
    badge: 'CORE ENGINEERING & AI CAPABILITIES',
    headline: 'Architecting High-Throughput Cloud &',
    highlight: 'Autonomous AI Systems',
    description: 'We engineer resilient multi-tenant architectures, high-performance web systems, and autonomous agent pipelines for visionary enterprises.',
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
    description: 'Hover or tap each discipline card to inspect deliverables, architecture patterns, and engineering capabilities.',
  },
  features: {
    badge: 'DISCIPLINE DEEP-DIVES',
    headline: 'Engineered for Extreme Scale',
    highlight: 'Capabilities in Depth',
    description: 'Navigate through each specialized engineering domain to explore architecture blueprints, tech stacks, and benchmarks.',
  },
  closingCta: {
    badge: 'READY TO SHIP?',
    headline: "Let's build what's next",
    highlight: 'Together.',
    description: 'Whether you need a dedicated engineering pod or an end-to-end autonomous AI system, we are ready to build.',
    primaryCtaText: 'Schedule Architecture Review',
    primaryCtaUrl: '/contact',
    secondaryCtaText: 'Explore Our Products',
    secondaryCtaUrl: '/products',
  },
  flipCards: DEFAULT_FLIP_CARDS_SEED_DATA,
  services: DEFAULT_SERVICES_SEED_DATA,
  metaTitle: 'Custom Software, Cloud Architecture & Autonomous AI Services | Aprogra',
  metaDescription: 'Enterprise software engineering, distributed cloud systems, and autonomous AI agents engineered for hyper-scale operations.',
});

const DEFAULT_SERVICES_SEED_DATA = [
  {
    slug: 'web-engineering',
    tabLabel: 'Web',
    title: 'Modern Web & Distributed Frontends',
    category: 'Full-Stack Architecture',
    subheading: 'Edge-First Platforms',
    shortSummary: 'Edge-rendered Next.js 15, sub-second LCP, distributed state, and atomic design systems.',
    description: 'We build ultra-fast, accessible web platforms utilizing modern server components, streaming SSR, and edge execution to deliver sub-second Core Web Vitals at global scale.',
    icon: 'web',
    accentColor: '#3B82F6',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 1,
    kpiNumber: '< 0.8s',
    kpiLabel: 'LCP Load Speed',
    deliverables: [
      { title: 'Next.js 15 App Router & React Server Components' },
      { title: 'Local-First SQLite & CRDT State Sync' },
      { title: 'Sub-second LCP & Edge SSR Telemetry' },
      { title: 'Custom Design Tokens & W3C Styling' }
    ],
    tags: [
      { name: 'Next.js 15' },
      { name: 'TypeScript' },
      { name: 'Tailwind v4' },
      { name: 'LibSQL' }
    ],
    customUrl: '/services/architecture/web-engineering',
  },
  {
    slug: 'agentic-ai',
    tabLabel: 'AI',
    title: 'Agentic AI & Autonomous Reasoning',
    category: 'Applied AI & LLMs',
    subheading: 'Autonomous Workflows',
    shortSummary: 'Multi-agent orchestration, function calling, vector embeddings, and self-correcting pipelines.',
    description: 'We develop domain-specific autonomous agent pipelines capable of multi-step task execution, automated data triage, and human-in-the-loop escalation with deterministic safeguards.',
    icon: 'ai',
    accentColor: '#8B5CF6',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 2,
    kpiNumber: '70%',
    kpiLabel: 'Triage Automation',
    deliverables: [
      { title: 'Autonomous Multi-Agent Task Orchestration' },
      { title: 'Deterministic Function Calling & Schema Validation' },
      { title: 'Hybrid Vector Search & RAG Retrieval Engines' },
      { title: 'Sub-Second LLM Streaming & Real-Time Sync' }
    ],
    tags: [
      { name: 'Gemini 1.5' },
      { name: 'LangChain' },
      { name: 'pgvector' },
      { name: 'Agent Swarms' }
    ],
    customUrl: '/services/architecture/agentic-ai',
  },
  {
    slug: 'saas-platforms',
    tabLabel: 'SaaS',
    title: 'Enterprise Multi-Tenant SaaS',
    category: 'Systems Architecture',
    subheading: 'Multi-Tenant Systems',
    shortSummary: 'Postgres Row-Level Security, isolated tenant clusters, and high-concurrency billing engines.',
    description: 'Architecting robust, scalable SaaS foundations with hardened multi-tenancy, granular RBAC/ABAC permissions, automated tenant provisioning, and idempotent payment pipelines.',
    icon: 'saas',
    accentColor: '#06B6D4',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 3,
    kpiNumber: '10k+',
    kpiLabel: 'Tenants / Cluster',
    deliverables: [
      { title: 'PostgreSQL Row-Level Security (RLS) Isolation' },
      { title: 'Dynamic Subdomain & Custom Domain Routing' },
      { title: 'Granular RBAC, ABAC & SAML/SSO Enterprise Auth' },
      { title: 'Idempotent Stripe Billing & Usage Metering' }
    ],
    tags: [
      { name: 'Multi-Tenancy' },
      { name: 'PostgreSQL RLS' },
      { name: 'Stripe API' },
      { name: 'Redis' }
    ],
    customUrl: '/services/architecture/saas-platforms',
  },
  {
    slug: 'design-systems',
    tabLabel: 'Design',
    title: 'Design Systems & UI Engineering',
    category: 'Product Design',
    subheading: 'Design to Code',
    shortSummary: 'Figma-to-code token pipelines, WCAG AAA accessibility, fluid typography, and motion choreography.',
    description: 'We construct living, unified design token architectures that bridge Figma variables with production code, ensuring uncompromising visual harmony and fluid micro-interactions.',
    icon: 'design',
    accentColor: '#EC4899',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 4,
    kpiNumber: '500+',
    kpiLabel: 'Design Tokens',
    deliverables: [
      { title: 'Figma Tokens to CSS Variable Pipelines' },
      { title: 'WCAG 2.2 AAA Accessible Component Systems' },
      { title: 'Mathematical Fluid Typography & Dynamic Spacing' },
      { title: 'Physics-Based GSAP & Motion Choreography' }
    ],
    tags: [
      { name: 'Figma Tokens' },
      { name: 'Tailwind CSS' },
      { name: 'GSAP' },
      { name: 'Accessibility' }
    ],
    customUrl: '/services/architecture/design-systems',
  },
  {
    slug: 'cloud-devops',
    tabLabel: 'Cloud',
    title: 'Cloud Infrastructure & High Concurrency',
    category: 'DevOps & SRE',
    subheading: 'Zero-Trust Ops',
    shortSummary: 'Zero-downtime Kubernetes deployments, distributed caching, and automated CI/CD pipelines.',
    description: 'Engineering fault-tolerant cloud backbones with automated multi-region scaling, blue-green zero-downtime deployments, distributed caching, and 24/7 observability.',
    icon: 'cloud',
    accentColor: '#10B981',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 5,
    kpiNumber: '99.99%',
    kpiLabel: 'System Uptime',
    deliverables: [
      { title: 'Kubernetes Multi-Cluster Orchestration' },
      { title: 'Zero-Downtime Blue/Green Database Migrations' },
      { title: 'Distributed Edge Caching & Traefik Load Balancing' },
      { title: 'Automated Terraform & GitHub Actions CI/CD' }
    ],
    tags: [
      { name: 'Kubernetes' },
      { name: 'Docker' },
      { name: 'Terraform' },
      { name: 'Prometheus' }
    ],
    customUrl: '/services/architecture/cloud-devops',
  },
  {
    slug: 'mobile-engineering',
    tabLabel: 'Mobile',
    title: 'Cross-Platform Mobile Apps',
    category: 'Mobile Systems',
    subheading: 'Offline-First Sync',
    shortSummary: 'High-performance React Native & Flutter applications with offline-first synchronization.',
    description: 'We engineer fluid, native-feeling mobile applications with local-first database replication, push notification pipelines, and background telemetry.',
    icon: 'mobile',
    accentColor: '#F59E0B',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    cardOrder: 6,
    kpiNumber: '60 FPS',
    kpiLabel: 'Native Fluidity',
    deliverables: [
      { title: 'React Native & Flutter Native Engine Optimization' },
      { title: 'Offline-First Local Database & Background Sync' },
      { title: 'Biometric Authentication & Secure Enclave Storage' },
      { title: 'Automated App Store & Play Store CI/CD Fastlane' }
    ],
    tags: [
      { name: 'React Native' },
      { name: 'Flutter' },
      { name: 'SQLite Mobile' },
      { name: 'Fastlane' }
    ],
    customUrl: '/services/architecture/mobile-engineering',
  }
];

const DEFAULT_FLIP_CARDS_SEED_DATA = [
  {
    title: 'Web & Mobile Systems',
    subtitle: 'Sub-45ms Edge Response',
    description: 'High-speed web platforms and native mobile apps with offline-first synchronization.',
    tag: '01 / WEB & MOBILE',
    icon: 'web',
    color: '#3B82F6',
    cardOrder: 1,
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    deliverables: [
      { title: 'Next.js & React 19' },
      { title: 'React Native & Expo' },
      { title: 'Real-Time WebSockets' },
      { title: 'CRDT & SQLite Offline Sync' }
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/web-engineering',
  },
  {
    title: 'AI Agents & Neural RAG',
    subtitle: 'Autonomous Workflows',
    description: 'Multi-agent execution loops with structured schema generation and air-gapped SLMs.',
    tag: '02 / AI & AGENTIC',
    icon: 'ai',
    color: '#8B5CF6',
    cardOrder: 2,
    coverImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
    deliverables: [
      { title: 'Multi-Agent Loops' },
      { title: 'Dense Vector RAG' },
      { title: 'Air-Gapped SLMs' },
      { title: 'Guardrails & Eval Suites' }
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/agentic-ai',
  },
  {
    title: 'Cloud-Native SaaS & APIs',
    subtitle: 'Multi-Tenant Systems',
    description: 'Multi-tenant platforms with row-level security, event-driven pipelines, and automated metering.',
    tag: '03 / SAAS & APIS',
    icon: 'saas',
    color: '#06B6D4',
    cardOrder: 3,
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    deliverables: [
      { title: 'Row-Level Security' },
      { title: 'Stripe Metering' },
      { title: 'GraphQL & gRPC' },
      { title: 'PostgreSQL & Distributed DB' }
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/saas-platforms',
  },
  {
    title: 'Mathematical Design Systems',
    subtitle: 'Design to Code',
    description: 'Living component tokens, fluid typography scales, and WCAG AA accessibility built for engineering teams.',
    tag: '04 / DESIGN SYSTEMS',
    icon: 'design',
    color: '#EC4899',
    cardOrder: 4,
    coverImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
    deliverables: [
      { title: 'Fluid Typographic Scales' },
      { title: 'Design Token Engine' },
      { title: 'WCAG AAA Contrast' },
      { title: 'Motion & GSAP Easing' }
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/design-systems',
  },
  {
    title: 'Edge & GitOps Infrastructure',
    subtitle: 'Zero-Trust Ops',
    description: 'Resilient cloud infrastructure with declarative IaC, self-healing Kubernetes, and zero-downtime CI.',
    tag: '05 / CLOUD & DEVOPS',
    icon: 'cloud',
    color: '#10B981',
    cardOrder: 5,
    coverImageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    deliverables: [
      { title: 'Terraform & Pulumi' },
      { title: 'Self-Healing K8s' },
      { title: 'Zero-Downtime CI' },
      { title: 'Distributed Telemetry' }
    ],
    actionText: 'Inspect Architecture',
    actionUrl: '/services/architecture/cloud-devops',
  },
];

const DEFAULT_CONTACT_PAGE_SEED_DATA = {
  hero: {
    availabilityBadge: 'ACCEPTING SELECT H2 / Q3 2026 ENGAGEMENTS',
    headline: 'Engineering Partnerships &',
    highlight: 'Project Inquiries.',
    description: 'Have a breakthrough product, an enterprise platform to scale, or an AI workflow to automate? Connect directly with our lead architects to turn your vision into production-ready software.',
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
        description: 'We review your technical specifications, analyze legacy constraints, and formulate a full system topology and sprint milestones.',
      },
      {
        timeframe: '02 / Week 1',
        title: 'Sprint 0 & Core Scaffolding',
        description: 'Repository setup, CI/CD pipelines, database schema design, and production environment provisioning with strict security policies.',
      },
      {
        timeframe: '03 / Weeks 2–8',
        title: 'Bi-Weekly Velocity Drops',
        description: 'Continuous shipping with staging previews, real-time Slack/Discord sync, and weekly architectural review calls.',
      },
    ],
  },
  brief: {
    badge: '02 / INTERACTIVE SPECIFICATION',
    title: 'Configure Your Project Brief',
    subtitle: 'Fill out the brief below to generate your custom project preview and start a direct conversation with our technical team.',
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
      { label: 'Web Apps' },
      { label: 'Mobile Apps' },
      { label: 'AI & Automation' },
      { label: 'Content & Marketing' },
      { label: 'Design Systems' },
      { label: 'Enterprise ERP' },
    ],
    budgetQuestion: 'Expected Investment Range',
    budgetRangesList: [
      { label: '< $15K' },
      { label: '$15K – $25K' },
      { label: '$25K – $75K' },
      { label: '$75K+' },
    ],
    timelineQuestion: 'Target Timeline',
    timelineRangesList: [
      { label: '< 1 Month' },
      { label: '1–3 Months' },
      { label: '3–6 Months' },
      { label: 'Flexible' },
    ],
    messageQuestion: 'Project Overview & Objectives *',
    messagePlaceholder: 'Describe your current tech stack, desired architecture, target timeline, and success criteria...',
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
        timeframe: '1',
        title: 'Initial Brief Review',
        description: 'Our lead architects analyze your specific requirements.',
      },
      {
        timeframe: '2',
        title: 'System Design & Scope',
        description: 'We map out technical constraints and platform architecture.',
      },
      {
        timeframe: '3',
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
    videoDescription: 'Schedule an immediate 15-minute intro with our engineering leads to talk through your platform requirements.',
    videoButtonText: 'BOOK A 15-MIN INTRO CALL',
  },
  channels: [
    {
      order: 1,
      type: 'email',
      label: 'PRIMARY INQUIRIES',
      primaryValue: 'hello@aprogra.com',
      subtext: 'Monitored 24/7 by solution engineers',
      buttonText: 'Copy Email Address',
      iconName: 'mail',
    },
    {
      order: 2,
      type: 'phone',
      label: 'DIRECT PHONE LINE',
      primaryValue: '+1 (800) 555-0199',
      subtext: 'Mon–Fri, 8:00 AM–6:00 PM PST',
      buttonText: 'Copy Phone Number',
      iconName: 'phone',
    },
    {
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
      order: 4,
      type: 'hub',
      label: 'GLOBAL TECH HUBS',
      primaryValue: 'New York • Austin • London',
      subtext: 'Serving enterprise partners across time zones',
      buttonText: 'Remote First Engineering',
      iconName: 'globe',
    },
  ],
  introCallModal: {
    title: 'Engineering Kickoff Call',
    subtitle: 'Directly with our Lead Solutions Architect. 15 minutes to evaluate technical fit.',
    topicOptions: [
      { label: 'System Architecture' },
      { label: 'AI & Automation' },
      { label: 'Project Rescue' },
      { label: 'Team Augmentation' },
    ],
    timeSlots: [
      { label: 'Tomorrow, 10:00 AM EST' },
      { label: 'Tomorrow, 2:30 PM EST' },
      { label: 'Thursday, 11:00 AM EST' },
      { label: 'Friday, 4:00 PM EST' },
    ],
    submitButtonText: 'Confirm Calendar Reservation',
    successTitle: 'Call Reserved!',
  },
  closingBannerHeadline: 'Engineering Infinite',
  closingBannerHighlight: 'Possibilities.',
  closingBannerSubtitle: 'Thank you for visiting. We look forward to building with you.',
  metaTitle: 'Contact Lead Architects | Aprogra',
  metaDescription: 'Connect directly with Aprogra lead architects for enterprise custom software, agentic AI, and scalable cloud systems.',
};

const DEFAULT_HOME_PAGE_SEED_DATA = {
  title: "Home Page",
  heroSlides: [
    {
      badgeText: "Modern Software & AI",
      title: "Engineering Software Without Limits.",
      subtitle: "Full-cycle software engineering, architectural consulting, and autonomous AI systems for scale-ups and global enterprises.",
      tags: [
        { label: "High-Performance Computing" },
        { label: "Enterprise AI" },
        { label: "Cloud Native" }
      ],
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      imageLabel: "Architecture Stack",
      imageSublabel: "Production Ready",
    },
    {
      badgeText: "Production Deployments",
      title: "Commercial SaaS & ERP Platforms",
      primaryValue: "40+",
      subtitle: "We don't just build MVPs. We engineer and maintain mission-critical platforms that run real businesses with 99.99% SLA guarantees.",
      tags: [
        { label: "Multi-Tenant SaaS" },
        { label: "ERP Systems" },
        { label: "High Availability" }
      ],
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      imageLabel: "Global Footprint",
      imageSublabel: "12 Countries",
    },
    {
      badgeText: "Zero Outsourcing",
      title: "Engineered In-House.",
      subtitle: "Every line of code, every system architecture, every pixel—built entirely by our full-stack engineering pods based in our own studios.",
      tags: [
        { label: "100% In-House" },
        { label: "Dedicated Pods" },
        { label: "Direct Access" }
      ],
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      imageLabel: "Engineering Pods",
      imageSublabel: "25+ Specialists",
    }
  ],
  statsSection: {
    badgeText: "PROVEN PERFORMANCE & GLOBAL FOOTPRINT",
    title: "Engineered with Mathematical Precision.",
    stats: [
      { target: 60, suffix: "+", label: "Enterprise Partners" },
      { target: 40, suffix: "+", label: "Production Systems" },
      { target: 12, suffix: "+", label: "Sovereign Regions" },
      { target: 7, suffix: "+", label: "Years of Craft" }
    ]
  },
  storyPhases: [
    {
      badgeText: "Our Story",
      title: "Not just another dev shop.",
      description: "AProgra was built on one belief — that exceptional software requires exceptional people working in exceptional ways. No outsourcing. No guesswork. Just craft.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      showMetricsGrid: false
    },
    {
      badgeText: "How We Work",
      title: "Full-stack. Full-cycle. Full-ownership.",
      description: "From the first discovery call to post-launch support, our in-house team owns every layer. Design. Frontend. Backend. QA. DevOps. All under one roof — your one point of contact.",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      showMetricsGrid: false
    },
    {
      badgeText: "Our Team",
      title: "25+ specialists. Zero strangers.",
      description: "Designers who code. Engineers who think about UX. PMs who understand business. Everyone at AProgra is a specialist — and everyone cares about your product like it's their own.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      showMetricsGrid: false
    },
    {
      badgeText: "Our Reach",
      title: "Built here. Shipped everywhere.",
      description: "40+ products live in market. 60+ clients across 12 countries. From Hyderabad to Houston, our software runs real businesses.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      showMetricsGrid: true
    }
  ],
  whyStatements: [
    { mainText: "100%", subText: "In-house Talent" },
    { mainText: "Infinite", subText: "Possibilities" },
    { mainText: "One", subText: "Partner" }
  ],
  servicesSlides: [
    {
      orderNumber: "01",
      badgeText: "Core Service",
      title: "Product Engineering",
      description: "We don't just build features — we engineer products. From architecture decisions to deployment pipelines, every choice we make is deliberate, scalable, and built to last.",
      tags: [
        { label: "Discovery" },
        { label: "Architecture" },
        { label: "Development" },
        { label: "QA" },
        { label: "Launch" }
      ],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
    },
    {
      orderNumber: "02",
      badgeText: "Mobile Systems",
      title: "Mobile Development",
      description: "iOS, Android, or cross-platform. We build mobile experiences that feel native, perform flawlessly, and keep users coming back. Offline-first, animation-rich, crash-free.",
      tags: [
        { label: "iOS & Android" },
        { label: "React Native" },
        { label: "Flutter" },
        { label: "Offline-First" },
        { label: "App Store Ops" }
      ],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80"
    },
    {
      orderNumber: "03",
      badgeText: "Applied AI",
      title: "AI Integration & Automation",
      description: "From custom LLM integrations to intelligent workflow automations — we make AI work for your actual business, not just your marketing copy.",
      tags: [
        { label: "LLM Pipelines" },
        { label: "RAG Systems" },
        { label: "Agents & Swarms" },
        { label: "Data Triage" },
        { label: "Fine-Tuning" }
      ],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80"
    },
    {
      orderNumber: "04",
      badgeText: "Product Design",
      title: "UI/UX & Design Systems",
      description: "Design that converts. Interfaces that feel effortless. We craft design systems, component libraries, and end-to-end user journeys that elevate your brand.",
      tags: [
        { label: "Design Systems" },
        { label: "Component Libraries" },
        { label: "Wireframing" },
        { label: "Motion Design" },
        { label: "Figma to Code" }
      ],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80"
    },
    {
      orderNumber: "05",
      badgeText: "Cloud & SRE",
      title: "Cloud Architecture & DevOps",
      description: "Infrastructure that scales without drama. CI/CD pipelines that deploy with confidence. Cloud architectures engineered for 99.99% uptime and zero maintenance headaches.",
      tags: [
        { label: "AWS / GCP" },
        { label: "Docker & K8s" },
        { label: "CI/CD Pipelines" },
        { label: "Zero-Downtime" },
        { label: "24/7 Monitoring" }
      ],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80"
    },
    {
      orderNumber: "06",
      badgeText: "Modernization",
      title: "Legacy Modernization & Audits",
      description: "Inherited a codebase that gives you nightmares? We audit, refactor, and migrate legacy systems into clean, modern architectures without disrupting your live operations.",
      tags: [
        { label: "Architecture Audits" },
        { label: "Codebase Refactoring" },
        { label: "Database Migration" },
        { label: "Performance Tuning" },
        { label: "Zero-Downtime" }
      ],
      serviceUrl: "/services",
      serviceUrlText: "Explore Service",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80"
    }
  ],
  productsCards: [
    {
      badge: "NOTIFICATION 01 / 02 • SCHOOL ERP",
      versionStatus: "v3.2 OPERATIONAL",
      category: "EdTech Platform",
      categorySubtext: "Multi-Campus Ready",
      title: "SmartSchool ERP",
      description: "The complete operational platform for modern institutions — unifying admissions, fee management, student records, and parent communication.",
      specs: [
        { label: "Role-Based Portals" },
        { label: "Automated Fee Invoicing" },
        { label: "Instant SMS/WhatsApp Alerts" },
        { label: "Gradebook & Report Cards" }
      ],
      productUrl: "/products/school-erp",
      productUrlText: "View Product Details",
      demoUrl: "/contact",
      demoUrlText: "Request Demo →",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
    },
    {
      badge: "NOTIFICATION 02 / 02 • OMNICHAT INBOX",
      versionStatus: "NEW MESSAGE",
      category: "Customer Engagement",
      categorySubtext: "AI-Assisted Inbox",
      title: "OmniChat",
      description: "Unify WhatsApp, Instagram DMs, Email, and SMS into one collaborative inbox powered by autonomous AI response suggestions.",
      specs: [
        { label: "Omnichannel Inbox" },
        { label: "AI Smart Auto-Drafts" },
        { label: "Shared Team Assignments" },
        { label: "SLA & Analytics Tracking" }
      ],
      productUrl: "/products/omnichat",
      productUrlText: "View Product Details",
      demoUrl: "/contact",
      demoUrlText: "Request Demo →",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
    }
  ]
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
        populate: ['permissions'],
      });

      if (publicRole) {
        const actions = [
          'api::global-config.global-config.find',
          'api::blog-page.blog-page.find',
          'api::category.category.find',
          'api::category.category.findOne',
          'api::blog-post.blog-post.find',
          'api::blog-post.blog-post.findOne',
          'api::testimonial.testimonial.find',
          'api::testimonial.testimonial.findOne',
          'api::brands-section.brands-section.find',
          'api::brand.brand.find',
          'api::brand.brand.findOne',
          'api::services-page.services-page.find',
          'api::contact-page.contact-page.find',
          'api::contact-inquiry.contact-inquiry.create',
          'api::contact-inquiry.contact-inquiry.find',
          'api::about-page.about-page.find',
          'api::team-member.team-member.find',
          'api::home-page.home-page.find',
        ];

        for (const action of actions) {
          const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: publicRole.id, action },
          });

          if (!existing) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
              },
            });
            strapi.log.info(`[Bootstrap] Granted Public permission for ${action}`);
          }
        }
      }

      const strapiAny = strapi as any;

      // 1. Global Config Single Type
      const existingConfig = await strapiAny.documents('api::global-config.global-config').findFirst();
      if (!existingConfig) {
        await strapiAny.documents('api::global-config.global-config').create({
          data: DEFAULT_GLOBAL_CONFIG_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Header & Footer Global Configuration in Strapi.');
      }

      // 2. Blog Categories
      for (const cat of DEFAULT_CATEGORIES_SEED_DATA) {
        const existingCat = await strapiAny.documents('api::category.category').findFirst({
          filters: { slug: cat.slug },
        });
        if (!existingCat) {
          await strapiAny.documents('api::category.category').create({
            data: cat,
            status: 'published',
          });
          strapi.log.info(`[Bootstrap] Created Blog Category: "${cat.name}"`);
        }
      }

      // 3. Blog Page Settings Single Type
      const existingBlogPage = await strapiAny.documents('api::blog-page.blog-page').findFirst();
      if (!existingBlogPage) {
        await strapiAny.documents('api::blog-page.blog-page').create({
          data: DEFAULT_BLOG_PAGE_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Blog Page Settings in Strapi.');
      }

      // 4. Blog Posts
      for (const post of DEFAULT_BLOG_POSTS_SEED_DATA) {
        const existingPost = await strapiAny.documents('api::blog-post.blog-post').findFirst({
          filters: { slug: post.slug },
        });
        if (!existingPost) {
          await strapiAny.documents('api::blog-post.blog-post').create({
            data: post,
            status: 'published',
          });
          strapi.log.info(`[Bootstrap] Created Blog Post: "${post.title}"`);
        }
      }

      // 5. Testimonials
      for (const t of DEFAULT_TESTIMONIALS_SEED_DATA) {
        const existingTestimonial = await strapiAny.documents('api::testimonial.testimonial').findFirst({
          filters: { authorName: t.authorName },
        });
        if (!existingTestimonial) {
          await strapiAny.documents('api::testimonial.testimonial').create({
            data: t,
            status: 'published',
          });
          strapi.log.info(`[Bootstrap] Created Testimonial: "${t.authorName}" (${t.authorCompany})`);
        }
      }

      // 6. Brands Section Settings Single Type
      const existingBrandsSection = await strapiAny.documents('api::brands-section.brands-section').findFirst();
      if (!existingBrandsSection) {
        await strapiAny.documents('api::brands-section.brands-section').create({
          data: DEFAULT_BRANDS_SECTION_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Brands Section Settings in Strapi.');
      }

      // 7. Partner Brands
      for (const b of DEFAULT_BRANDS_SEED_DATA) {
        const existingBrand = await strapiAny.documents('api::brand.brand').findFirst({
          filters: { name: b.name },
        });
        if (!existingBrand) {
          await strapiAny.documents('api::brand.brand').create({
            data: b,
            status: 'published',
          });
          strapi.log.info(`[Bootstrap] Created Brand: "${b.name}" (${b.location}, Row: ${b.row})`);
        }
      }

      // 8. Services Page Settings Single Type
      const existingServicesPage = await strapiAny.documents('api::services-page.services-page').findFirst();
      if (!existingServicesPage) {
        await strapi.documents('api::services-page.services-page').create({
          data: getServicesPageSeedData(),
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Services Page Settings in Strapi.');
      } else {
        await strapiAny.documents('api::services-page.services-page').update({
          documentId: existingServicesPage.documentId,
          data: {
            flipCards: DEFAULT_FLIP_CARDS_SEED_DATA,
            services: DEFAULT_SERVICES_SEED_DATA,
          },
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Updated Services Page Settings with flipCards and services in Strapi.');
      }

      // 9. Contact Page Settings Single Type
      const existingContactPage = await strapiAny.documents('api::contact-page.contact-page').findFirst();
      if (!existingContactPage) {
        await strapiAny.documents('api::contact-page.contact-page').create({
          data: DEFAULT_CONTACT_PAGE_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Contact Page Settings in Strapi.');
      }

      // 12. About Page Settings Single Type
      const existingAboutPage = await strapiAny.documents('api::about-page.about-page').findFirst();
      const aboutStorySlidesSeed = [
        {
          orderNumber: '01',
          badge: 'Who We Are',
          headline: 'Not just another dev shop.',
          description: 'AProgra was built on a single belief — that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.',
          highlights: [
            { title: 'In-house only', description: 'Every line of code written by our team' },
            { title: 'End-to-end ownership', description: 'Design through deployment' },
            { title: 'Hyderabad-based', description: 'Working with clients across 12 countries' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        },
        {
          orderNumber: '02',
          badge: 'Our Mission',
          headline: 'Build software that actually matters.',
          description: 'Our mission is simple — engineer products that solve real problems, for real people, with real business impact. We measure success not in lines of code but in businesses transformed.',
          quote: '"To make world-class engineering accessible to every visionary who dares to build."',
          highlights: [],
          imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        },
        {
          orderNumber: '03',
          badge: 'Our Vision',
          headline: 'The engineering partner for the next generation of global tech leaders.',
          description: 'We envision a world where founders and enterprises can build, scale, and transform their digital capabilities with zero compromise on engineering standards or velocity.',
          highlights: [
            { title: 'Global Reach', description: 'Serving visionaries across 12+ countries with scale-ready architecture' },
            { title: 'Agentic & Autonomous Speed', description: 'Integrating cutting-edge AI workflows with human craftsmanship' },
            { title: 'Infinite Scale', description: 'Architected from day one to handle millions of active users' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        },
      ];

      const aboutFaqsSeed = [
        { question: 'How is AProgra different from a typical software agency?', answer: 'Most agencies outsource or use freelancers for parts of your project. At AProgra, every single person who touches your product is on our in-house team. No handoffs to strangers. No quality loss in translation. You get one point of contact and a team that treats your product like their own.', category: 'Company & Team', order: 1 },
        { question: 'What types of projects do you take on?', answer: 'We work on product engineering (web, mobile, SaaS), AI and automation systems, UI/UX design, and cloud infrastructure. From early-stage MVPs to scaling enterprise platforms — if it involves building software, we can help.', category: 'Capabilities', order: 2 },
        { question: 'How long does it take to start a project?', answer: 'After an initial discovery call, we typically scope and onboard within 1–2 weeks. For urgent projects, we’ve started within days. We don’t believe in unnecessary delays.', category: 'Engagement', order: 3 },
        { question: 'Do you work with international clients?', answer: 'Absolutely. We’ve partnered with clients across 12 countries including the US, UK, UAE, Singapore, and Australia. We work async-first and adapt to your timezone for key meetings.', category: 'Global Delivery', order: 4 },
        { question: 'What does your development process look like?', answer: 'We follow an iterative, milestone-driven approach: Discovery → Design → Build → Test → Launch → Support. You’re involved at every stage with regular demos, Slack updates, and transparent timelines.', category: 'Process', order: 5 },
        { question: 'Can you take over an existing project or codebase?', answer: 'Yes — and we do it often. We conduct a thorough code audit first, document what we find, then propose a clear path forward. We’ve rescued several projects that were over-budget and behind schedule.', category: 'Engineering', order: 6 },
        { question: 'What is your pricing model?', answer: 'We offer project-based pricing for fixed-scope work and monthly retainers for ongoing development. We’ll share a detailed quote after a discovery call. We believe in transparent pricing — no hidden fees, no scope creep surprises.', category: 'Commercial', order: 7 },
        { question: 'How do we get started?', answer: 'Simply fill out the contact form on this page or email us at hello@aprogra.com. We’ll schedule a discovery call within 24 hours, understand your project, and come back with a clear proposal.', category: 'Onboarding', order: 8 },
      ];

      const aboutFaqSectionSeed = {
        badge: 'Got Questions?',
        headline: 'Questions We Actually Get Asked',
        description: 'And honest answers to all of them.',
        faqs: aboutFaqsSeed,
      };

      if (!existingAboutPage) {
        await strapiAny.documents('api::about-page.about-page').create({
          data: {
            hero: {
              badgeText: 'Full-Stack Engineering & AI Studio',
              headline: 'Architecting the Future of High-Scale Software & Autonomous Intelligence',
              subheadline: 'We combine senior-only engineering pods with proprietary SaaS engines to build mission-critical web platforms, AI agents, and enterprise design systems for ambitious global businesses.',
              primaryCtaLabel: 'Start Your Brief',
              primaryCtaUrl: '/contact',
              secondaryCtaLabel: 'Explore Our Story',
              secondaryCtaUrl: '#story',
              pillars: [
                { orderNumber: '01', title: 'Full-Spectrum Architecture', description: 'Zero-handoff engineering from cloud infrastructure to 60fps responsive interfaces.', icon: 'Layers', accentColor: '#FF4A1C' },
                { orderNumber: '02', title: 'Dual-Engine Innovation', description: 'High-velocity bespoke client pods alongside our proprietary commercial SaaS products.', icon: 'Server', accentColor: '#3B82F6' },
                { orderNumber: '03', title: 'Autonomous AI Integration', description: 'Production-ready LLM agents, vector retrieval RAG pipelines, and automated CRM workflows.', icon: 'Cpu', accentColor: '#10B981' },
                { orderNumber: '04', title: 'Global Delivery Standards', description: 'Hyderabad engineering headquarters with 99.98% production SLA across 12+ countries.', icon: 'Globe2', accentColor: '#8B5CF6' },
              ],
              kpiStats: [
                { label: 'In-House Engineers', value: '100%' },
                { label: 'Clutch / G2 Rating', value: '4.9★' },
                { label: 'Avg API Latency', value: '<100ms' },
                { label: 'Production SLA', value: '99.98%' },
              ],
            },
            storySlides: aboutStorySlidesSeed,
            faqSection: aboutFaqSectionSeed,
            contactCta: {
              badge: "LET'S CONNECT", headline: 'Ready to Build Something Infinite?',
              description: 'Whether you have a fully scoped product brief or just an ambitious concept, our technical architects are standing by to explore your vision.',
              email: 'hello@aprogra.com', phone: '+1 (800) 555-0199',
              officeLocation: 'Hyderabad, India • Global Remote Pods',
              ctaLabel: 'Submit Project Brief', ctaUrl: '/contact',
            },
          },
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published About Page Settings in Strapi.');
      } else {
        await strapiAny.documents('api::about-page.about-page').update({
          documentId: existingAboutPage.documentId,
          data: {
            storySlides: aboutStorySlidesSeed,
            faqSection: aboutFaqSectionSeed,
          },
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Updated About Page Settings with storySlides & faqSection in Strapi.');
      }

      // 13. Team Members Collection Type
      const existingTeamMember = await strapiAny.documents('api::team-member.team-member').findFirst();
      if (!existingTeamMember) {
        const teamMembers = [
          { name: 'Alexandre Vane', role: 'Founder & Chief Architect', bio: 'Ex-Google Staff Architect with 12+ years building distributed cloud platforms & high-throughput APIs.', skills: [{ name: 'Cloud Arch' }, { name: 'Distributed Systems' }, { name: 'Rust & Go' }], linkedinUrl: 'https://linkedin.com', githubUrl: 'https://github.com', twitterUrl: 'https://twitter.com', order: 1 },
          { name: 'Isabella Chen', role: 'Head of Product & Design', bio: 'Pioneer in motion graphics & spatial UI design. Transformed digital products for 30+ enterprise firms.', skills: [{ name: 'Design Systems' }, { name: 'Motion Graphics' }, { name: 'UX Strategy' }], linkedinUrl: 'https://linkedin.com', githubUrl: 'https://github.com', twitterUrl: 'https://twitter.com', order: 2 },
          { name: 'Sophia Thorne', role: 'Director of AI Research', bio: 'Specializing in custom LLM fine-tuning, autonomous agentic workflows, and edge neural deployments.', skills: [{ name: 'LLMs & RAG' }, { name: 'Machine Learning' }, { name: 'Autonomous Agents' }], linkedinUrl: 'https://linkedin.com', githubUrl: 'https://github.com', twitterUrl: 'https://twitter.com', order: 3 },
          { name: 'Mia Rostova', role: 'Lead Full-Stack Engineer', bio: 'Polyglot software leader specializing in React 19, TypeScript, WebAudio, and frontend state engines.', skills: [{ name: 'React / Next.js' }, { name: 'TypeScript' }, { name: 'State Engines' }], linkedinUrl: 'https://linkedin.com', githubUrl: 'https://github.com', twitterUrl: 'https://twitter.com', order: 4 },
          { name: 'Charlotte Vance', role: 'Principal Infrastructure Lead', bio: 'Cloud-native infrastructure specialist building zero-downtime multi-region Kubernetes deployments.', skills: [{ name: 'Kubernetes' }, { name: 'AWS / GCP' }, { name: 'Terraform' }], linkedinUrl: 'https://linkedin.com', githubUrl: 'https://github.com', twitterUrl: 'https://twitter.com', order: 5 },
        ];
        for (const member of teamMembers) {
          await strapiAny.documents('api::team-member.team-member').create({
            data: member, status: 'published',
          });
        }
        strapi.log.info('[Bootstrap] Created Team Members in Strapi.');
      }

      // 15. Home Page Single Type
      const existingHomePage = await strapiAny.documents('api::home-page.home-page').findFirst();
      if (!existingHomePage) {
        await strapiAny.documents('api::home-page.home-page').create({
          data: DEFAULT_HOME_PAGE_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Home Page in Strapi.');
      } else {
        await strapiAny.documents('api::home-page.home-page').update({
          documentId: existingHomePage.documentId,
          data: {
            servicesSlides: DEFAULT_HOME_PAGE_SEED_DATA.servicesSlides,
            productsCards: DEFAULT_HOME_PAGE_SEED_DATA.productsCards,
          },
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Updated Home Page with ServicesSlides & ProductsCards in Strapi.');
      }

    } catch (err: any) {
      strapi.log.warn('[Bootstrap] Auto-setup notice:', err?.message || err);
    }
  },
};

