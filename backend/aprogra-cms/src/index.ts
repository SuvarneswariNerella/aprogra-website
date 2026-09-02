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
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
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
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
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
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
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

      // 16. Products Page Single Type
      const defaultProductsPageData = {
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
          { name: "In-House Codebase", target: 100, suffix: "%", decimals: 0, badge: "Zero Subcontracting", title: "Battle-Tested In Production", href: "/products/school-erp", actionText: "Explore codebase architecture" },
          { name: "Production SLA", target: 99.98, suffix: "%", decimals: 2, badge: "Cloud-Native HA", title: "Multi-Tenant Architecture", href: "/services", actionText: "View uptime & infra SLA" },
          { name: "Daily Active Users", target: 120, suffix: "K+", decimals: 0, badge: "Enterprise Scale", title: "Proven Real-World Volume", href: "/products/omnichat", actionText: "View scale benchmarks" },
          { name: "Response Time SLA", target: 24, suffix: "/7", decimals: 0, badge: "Guaranteed SLA", title: "Direct Core Team Support", href: "/contact", actionText: "Connect with lead architects" }
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

      const existingProductsPage = await strapiAny.documents('api::products-page.products-page').findFirst();
      if (!existingProductsPage) {
        await strapiAny.documents('api::products-page.products-page').create({
          data: defaultProductsPageData,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created initial default Products Page in Strapi.');
      }

      // 17. Products Collection Type (SmartSchool ERP & OmniChat AI)
      const defaultProducts = [
          {
            name: "SmartSchool ERP",
            slug: "school-erp",
            tagline: "Education & Daycare SaaS",
            shortDescription: "A unified multi-tenant campus operating system engineered to digitize admissions CRM, biometric attendance, fee gateways, live GPS fleet telemetry, and Saraswati AI lesson planning.",
            heroBadgeText: "Product #1 · Education & Daycare SaaS",
            heroTitle: "SmartSchool ERP",
            heroSubtitle: "11 Core Modules & Campus OS",
            order: 1,
            kpiStats: [
              { label: "MODULES", value: "11" },
              { label: "SCREENS", value: "480+" },
              { label: "UPTIME", value: "99.9%" },
              { label: "STUDENTS", value: "120K+" }
            ],
            features: [
              { order: 1, icon: "Users", title: "Admissions CRM", description: "Enquiry-to-enrollment pipeline with lead scoring, document verification, and conversion tracking.", tag: "ADMISSIONS & ENROLMENT", metricLabel: "Pipeline Tracking", metricValue: "Lead Scoring", highlights: "End-to-end inquiry-to-enrollment funnel with automated stage updates\nDynamic lead scoring, source attribution & conversion analytics\nDigital document verification & instant seat reservation" },
              { order: 2, icon: "Clock", title: "Attendance & Biometrics", description: "Daily student registers and staff clock-in with biometric and RFID integration, all in-app.", tag: "HARDWARE INTEGRATED", metricLabel: "Biometric Sync", metricValue: "99.8% Accuracy", highlights: "Real-time student & faculty biometric + RFID hardware synchronization\nAutomated daily SMS, WhatsApp & in-app parent absence alerts\nCBSE/ICSE compliant monthly registers & staff leave logs" },
              { order: 3, icon: "Calendar", title: "Timetable & Exams", description: "Conflict-free schedules, dynamic seating plans, marks entry, and automated transcripts generation.", tag: "EXAMINATION ENGINE", metricLabel: "Conflict-Free", metricValue: "Auto-Transcripts", highlights: "AI conflict-free scheduling engine for faculty, classrooms & labs\nDynamic hall ticket generator & invigilation seating planner\nContinuous Assessment (CCE) marks entry & automated report cards" },
              { order: 4, icon: "CreditCard", title: "Fees & Online Payments", description: "Custom fee structures, sibling discounts, instant digital invoices, and secure parent payments in-app.", tag: "PAYMENT GATEWAY", metricLabel: "Razorpay & Stripe", metricValue: "Auto-Receipts", highlights: "Custom recurring fee structures, installments & sibling discounts\nInstant payment links via UPI, NetBanking, Cards & Wallets\nAutomated digital receipts, live fee ledger & auto overdue reminders" },
              { order: 5, icon: "Bus", title: "Live Transport Tracking", description: "Real-time bus GPS tracking, dynamic routes, geofenced stops, and automated parent arrival alerts.", tag: "FLEET TELEMETRY", metricLabel: "Live Bus GPS", metricValue: "Real-Time Alerts", highlights: "Real-time vehicle GPS telemetry with live map route tracking\nGeofenced bus stops with 5-minute parent arrival push alerts\nDriver speed tracking, SOS emergency triggers & trip logs" },
              { order: 6, icon: "Smartphone", title: "Student & Parent Mobile Apps", description: "Dedicated native mobile experiences tailored for every stakeholder role with biometric authentication.", tag: "MULTI-STAKEHOLDER", metricLabel: "iOS & Android", metricValue: "Role-Based Access", highlights: "Dedicated native mobile experiences for parents, teachers & students\nRole-based dashboards for homework, fee payments & circulars\nBiometric authentication, multi-child switching & offline cache" },
              { order: 7, icon: "Users", title: "HR & Staff Payroll", description: "Complete employee directory, multi-tier leave workflows, automated pay scales, and PDF payslips.", tag: "HR MANAGEMENT", metricLabel: "Tax Deductions", metricValue: "1-Click Disbursal", highlights: "Comprehensive employee records, biometric payroll & shift management\nConfigurable salary structures, allowances, PF & tax deductions\nOne-click digital payslip generation & direct bank transfer batches" },
              { order: 8, icon: "HeartHandshake", title: "Daycare & Creche Care", description: "Real-time meals, nap schedules, restroom logs, secure QR pickup passes, and shared media moments.", tag: "DAYCARE & CRECHE", metricLabel: "Live Media Logs", metricValue: "QR Pickup Check", highlights: "Real-time timeline logs for meals, naps, potty & activity updates\nSecure QR-code authentication for authorized parent/guardian pickups\nDaily shared photo/video moments & direct 1-to-1 teacher messaging" },
              { order: 9, icon: "UserCheck", title: "Appointments & Gate Pass", description: "Seamless parent-teacher meeting booking with staff, digital reception logs, and visitor pass badges.", tag: "VISITOR SECURITY", metricLabel: "Digital Reception", metricValue: "Staff Sync", highlights: "Self-service parent-teacher meeting (PTM) booking with staff sync\nDigital visitor management with instant thermal badge printing\nGate pass workflows, courier logs & centralized inquiry register" },
              { order: 10, icon: "Bot", title: "Saraswati AI Assistant", description: "Built-in enterprise AI for syllabus-aligned lesson planning, automated quiz generation, and fast semantic search.", tag: "NEXT-GEN AI", metricLabel: "Autonomous LLM", metricValue: "Instant Planner", highlights: "Syllabus-aligned lesson plan & pedagogical worksheet generator\nAutomated quiz & rubric creator with Bloom's taxonomy mapping\nInstant multi-lingual query resolution across school policies" },
              { order: 11, icon: "BarChart3", title: "Analytics & Executive Reports", description: "Role-based executive dashboards, customizable KPI widgets, and one-click CBSE/ICSE regulatory exports.", tag: "EXECUTIVE SUITE", metricLabel: "PDF/Excel Exports", metricValue: "CBSE Compliant", highlights: "Executive KPI dashboards for admissions, collections & retention\nOne-click government, CBSE & state board compliance exports\nAutomated scheduled PDF/Excel reports to management & directors" }
            ]
          },
          {
            name: "OmniChat AI",
            slug: "omnichat",
            tagline: "WhatsApp & Omnichannel AI",
            shortDescription: "Centralize WhatsApp Business API, Instagram DMs, Messenger, and Telegram into a single unified workspace powered by autonomous AI chatbots.",
            heroBadgeText: "Product #2 · Conversational AI & Telemetry",
            heroTitle: "OmniChat AI",
            heroSubtitle: "6 Core Channels & Conversational AI",
            order: 2,
            kpiStats: [
              { label: "CHANNELS", value: "4" },
              { label: "AUTOMATION", value: "100%" },
              { label: "RESPONSE TIME", value: "<1s" },
              { label: "CONVERSIONS", value: "3.4x" }
            ],
            features: [
              { order: 1, icon: "MessageSquare", title: "4 Connected Channels", description: "WhatsApp Business API, Instagram, Messenger, and Telegram centralized into one unified team inbox.", tag: "CHANNEL INTEGRATIONS", metricLabel: "Unified Inbox", metricValue: "Multi-Agent Routing", highlights: "Official WhatsApp Business API integration with verified green tick support\nInstagram DMs, Story replies & Facebook Messenger unified in real-time\nTelegram bot connectivity with multi-agent concurrent assignments" },
              { order: 2, icon: "Zap", title: "No-Code Automation Builder", description: "Visual drag-and-drop flowchart builder to design complex multi-step customer journeys and triggers.", tag: "VISUAL WORKFLOWS", metricLabel: "Drag & Drop Canvas", metricValue: "Zero Coding", highlights: "Visual flowchart builder with conditional branching & delay timers\nCustom user attributes, tags & auto-assignment to sales agents\nWebhooks & REST API triggers for instant CRM data synchronization" },
              { order: 3, icon: "Bot", title: "Cross-Channel AI Chatbot", description: "Autonomous conversational AI trained on your custom knowledge base, delivering instant 24/7 answers.", tag: "CONVERSATIONAL AI", metricLabel: "Autonomous LLM", metricValue: "24/7 Instant Answers", highlights: "RAG architecture trained on PDFs, websites & product catalogs\nSmart sentiment analysis with graceful human-agent escalation\nMulti-lingual support across 50+ languages with contextual memory" },
              { order: 4, icon: "Headphones", title: "AI Call & Chat Answering", description: "Intelligent voice answering and automated chat routing to capture leads even outside business hours.", tag: "INBOUND TELEPHONY", metricLabel: "Zero Missed Leads", metricValue: "Smart Call Routing", highlights: "AI-driven automated voice responses & appointment booking\nInstant transcriptions with automatic customer summary generation\nRound-the-clock lead qualification and CRM contact creation" },
              { order: 5, icon: "Sparkles", title: "Instagram Comment → DM", description: "Auto-reply to post/reel comments instantly and trigger private DM sequences with special discount links.", tag: "SOCIAL GROWTH", metricLabel: "Instant Comment Capture", metricValue: "High Conversion", highlights: "Keyword-based instant auto-replies to Instagram feed & reels comments\nImmediate private DM dispatch with checkout links or lead magnets\nPrevents comment spam while boosting algorithmic engagement" },
              { order: 6, icon: "FileText", title: "WhatsApp Meta Template Engine", description: "Design, preview, test, and submit rich WhatsApp templates directly to Meta for rapid compliance approval.", tag: "META BROADCASTS", metricLabel: "Meta Verified", metricValue: "Instant Template Sync", highlights: "Rich media templates with CTA buttons, carousels & quick replies\nOne-click direct submission to Meta Graph API for fast approval\nScheduled bulk promotional broadcasts with delivery analytics" }
            ]
          }
        ];

        for (const prodData of defaultProducts) {
          const existing = await strapiAny.documents('api::product.product').findFirst({
            filters: { slug: prodData.slug }
          });
          if (!existing) {
            await strapiAny.documents('api::product.product').create({
              data: prodData,
              status: 'published',
            });
          }
        }
        strapi.log.info('[Bootstrap] Initialized default Products if missing in Strapi.');

      // 18. Career Page Single Type
      const defaultCareerPageData = {
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

      const existingCareerPage = await strapiAny.documents('api::career-page.career-page').findFirst();
      if (!existingCareerPage) {
        await strapiAny.documents('api::career-page.career-page').create({
          data: defaultCareerPageData,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created initial default Career Page in Strapi.');
      }

      // 19. Career Collection Type (Job Openings)
      const defaultCareers = [
        {
          slug: 'lead-ai-engineer',
          title: 'Senior AI & LLM Systems Engineer',
          team: 'AI & Machine Intelligence',
          location: 'San Francisco, CA / Remote',
          type: 'Full-time',
          description: 'Lead the architecture of our agentic AI infrastructure, multi-agent workflows, and custom enterprise fine-tuning pipelines.',
          tags: 'Python, PyTorch, LangChain, vLLM, Distributed Systems',
          order: 1
        },
        {
          slug: 'staff-fullstack-engineer',
          title: 'Staff Full-Stack Architect (React / Node)',
          team: 'Core Platform Engineering',
          location: 'New York, NY / Remote',
          type: 'Full-time',
          description: 'Design and scale resilient high-throughput cloud web applications, real-time sync systems, and modular component ecosystems.',
          tags: 'React, TypeScript, Node.js, PostgreSQL, Tailwind',
          order: 2
        },
        {
          slug: 'lead-mobile-architect',
          title: 'Lead Mobile Engineer (React Native / Flutter)',
          team: 'Mobile Experiences',
          location: 'Remote (Global)',
          type: 'Full-time',
          description: 'Craft buttery-smooth 60fps mobile applications for enterprise clients across iOS and Android with offline-first sync architecture.',
          tags: 'React Native, Swift, Kotlin, SQLite, WebSockets',
          order: 3
        },
        {
          slug: 'product-designer',
          title: 'Senior Product & UI/UX Designer',
          team: 'Product Design & Brand',
          location: 'San Francisco, CA / Remote',
          type: 'Full-time',
          description: 'Establish thoughtful design systems, spatial layouts, and high-fidelity prototypes for next-generation digital products.',
          tags: 'Figma, Design Systems, Prototyping, User Research',
          order: 4
        }
      ];

      for (const carData of defaultCareers) {
        const existing = await strapiAny.documents('api::career.career').findFirst({
          filters: { slug: carData.slug }
        });
        if (!existing) {
          await strapiAny.documents('api::career.career').create({
            data: carData,
            status: 'published',
          });
        }
      }
      strapi.log.info('[Bootstrap] Initialized default Careers if missing in Strapi.');

      // --- NEW SCHOOL ERP PAGE SEEDING ---
      const schoolErpCount = await strapiAny.documents('api::school-erp-page.school-erp-page').count();
      let shouldSeedData = false;

      if (schoolErpCount === 0) {
        shouldSeedData = true;
      }

      if (shouldSeedData) {
        const dataPayload = {
            heroBadge: 'SmartSchool ERP · Unified Campus OS',
            heroTitle: 'The Complete Multi-Tenant Operating System for Modern Schools & Daycares.',
            heroHighlight: 'Modern Schools & Daycares.',
            heroDescription: 'Digitize every campus touchpoint — admissions CRM, attendance automation, fee collections, live GPS transport tracking, daycare logs, and AI-powered Saraswati lesson planning in one unified platform.',
            primaryButtonText: 'Request Campus Demo',
            primaryButtonLink: '/contact',
            secondaryButtonText: 'Explore 11 Core Modules',
            secondaryButtonLink: '#module-breakdown',
            heroMetrics: [
              { value: '480+', label: 'Campus Screens', isPrimary: false },
              { value: '120K+', label: 'Active Students', isPrimary: true },
              { value: '99.9%', label: 'Uptime SLA', isPrimary: false },
              { value: '60+', label: 'Institutions', isPrimary: false }
            ],
            modulesBadge: 'Comprehensive Feature Architecture',
            modulesTitle: '8 Specialized Modules for Every Department',
            modulesDescription: 'Click through the modules below to explore how SmartSchool ERP transforms every aspect of campus management.',
            modules: [
              { title: 'Academics & Exams', description: 'Digitize timetable allocation, syllabus progress tracking, digital report card generation, and online examination workflows.', icon: 'BookOpen', tag: 'Core Academic Engine', metricLabel: 'Report Card Generation', metricValue: '100% Automated', highlights: 'Interactive Timetable Generator: Auto-resolve teacher clashes and room capacity constraints instantly.\nSyllabus & Lesson Progress Tracker: Real-time visibility into curriculum completion across classes and branches.\nDigital Exam & Grading Matrix: Supports CBSE, ICSE, IB, and custom weighted grading standards.\nOnline Assessment & Quiz Portal: Students submit assignments and take timed online quizzes via web or app.' },
              { title: 'Admissions CRM', description: 'Streamline prospective student inquiries, online application forms, document verification, interview scheduling, and fee deposits.', icon: 'Users', tag: 'Student Acquisition', metricLabel: 'Higher Lead Conversion', metricValue: '+38%', highlights: 'Multi-Channel Lead Capture: Auto-ingest inquiries from website forms, social campaigns, and walk-ins.\nDigital Document Verification: Parents upload birth certificates and past transcripts securely.\nAutomated Interview Scheduling: Parents pick interview time slots with instant SMS/WhatsApp reminders.\nDirect Deposit Gateway: Collect application and seat reservation fees online immediately.' },
              { title: 'Attendance & Tracking', description: 'Real-time student and staff attendance monitoring with instant parent notification triggers for absentees.', icon: 'UserCheck', tag: 'Campus Security', metricLabel: 'Parent Absence Alert Speed', metricValue: '< 2 Sec', highlights: 'Biometric & RFID Turnstile Sync: Automated gate check-in logs hardware data directly to cloud servers.\nTeacher One-Tap App Attendance: Classroom teachers log daily attendance in seconds from mobile devices.\nAutomated SMS / WhatsApp Alerts: Instant automated notification sent to parents if a student is marked absent.\nStaff Leave & Shift Management: Track teacher leaves, substitute allocations, and monthly attendance logs.' },
              { title: 'Fees & Online Payments', description: 'Eliminate manual ledger errors with recurring fee structures, online payment gateway integrations, and instant digital receipts.', icon: 'CreditCard', tag: 'Financial Operations', metricLabel: 'On-Time Fee Collections', metricValue: '99.4%', highlights: 'Customizable Fee Structures: Support installment plans, sibling discounts, and late payment penalties.\nIntegrated Payment Gateway: Collect fees via Credit Card, Debit, UPI, NetBanking, and Stripe.\nAutomated Digital Receipts: Parents instantly receive official PDF fee receipts via email & app.\nDefaulter Tracking & Reminders: Automated scheduled payment reminder broadcasts prior to due dates.' },
              { title: 'Live GPS Transport', description: 'Live GPS vehicle tracking for parents and transport managers, with speed alerts and geo-fenced arrival notifications.', icon: 'Bus', tag: 'Fleet Telemetry', metricLabel: 'Fleet GPS Visibility', metricValue: '100% Live', highlights: 'Parent Live Bus Radar App: Parents view real-time vehicle movement on map as the bus approaches.\nDriver Mobile Assistant: Driver receives route stop lists and student boarding/drop checklists.\nGeo-Fence Proximity Alerts: Automated alert sent 5 minutes before bus arrives at student stop.\nSpeeding & Delay Warnings: Transport manager receives instant alerts for over-speeding or delays.' },
              { title: 'HR & Staff Payroll', description: 'Manage employee profiles, leave applications, monthly salary slip calculation, tax deductions, and performance reviews.', icon: 'Building2', tag: 'Staff Operations', metricLabel: 'Automated Payroll Engine', metricValue: 'Zero Error', highlights: 'One-Click Monthly Payroll: Automatically compute salary based on attendance, allowances, and taxes.\nEmployee Self-Service Portal: Staff apply for leaves, view payslips, and check PF balances directly.\nRole-Based Granular Security: Control precise viewing and editing permissions across departments.\nPerformance & Training Logs: Maintain annual staff appraisal records and professional certification histories.' },
              { title: 'Daycare & Early Childhood', description: 'Specialized early childhood care module for meal tracking, nap logs, diaper changes, photo moments, and authorized pickup passes.', icon: 'HeartHandshake', tag: 'Childcare Management', metricLabel: 'Parent Satisfaction Score', metricValue: '4.9★', highlights: 'Real-Time Activity Timeline: Caregivers post meal consumption, sleep times, and potty activities.\nMedia Moments Gallery: Share high-resolution daily activity photos and videos securely with parents.\nAuthorized Pickup Passcode: QR code verification system to ensure children leave only with approved guardians.\nInfant Health & Feeding Tracker: Log bottle times, medication schedules, and temperature checks.' },
              { title: 'Saraswati AI Assistant', description: 'Built-in Gemini 1.5 powered AI assistant helping teachers craft lesson plans, generate quizzes, and answer parent policy queries.', icon: 'Bot', tag: 'Generative AI', metricLabel: 'Lesson Plan Creation', metricValue: '10x Faster', highlights: 'Instant Lesson Plan Generation: Input topic and grade level to generate structured pedagogical plans in seconds.\nCustom Quiz & Question Bank Engine: Create multiple-choice and descriptive questions tailored to curriculum.\nCampus Policy Q&A Bot: Instant answers for parents and staff regarding fee rules, leaves, and dress codes.\nMulti-Lingual Translation: Translates school notices and reports into 15+ regional languages automatically.' }
            ],
            screenshotsBadge: 'Interface Showcase',
            screenshotsTitle: 'Designed for Speed & Clarity',
            screenshotsDescription: 'Explore actual operational screens from the SmartSchool ERP ecosystem.',
            screenshots: [
              { title: 'Super Admin Operational Hub', category: 'Admin Portal', description: 'Real-time telemetry showing total campus attendance, fee collections, route updates, and staff status.' },
              { title: 'Parent & Student Native Mobile App', category: 'Mobile App', description: 'Clean iOS/Android interface for parents to view marks, pay fees via UPI/Credit Card, and chat with teachers.' },
              { title: 'Live GPS Bus Tracking Radar', category: 'Transport App', description: 'Map display tracking bus route velocity, stop arrival predictions, and automated speed alerts.' },
              { title: 'Daycare Daily Moments & Activity Feed', category: 'Daycare Module', description: 'Activity timeline for infant care, meal consumption metrics, nap duration logs, and photo updates.' },
              { title: 'Saraswati AI Teacher Workspace', category: 'AI Suite', description: 'AI studio interface where educators generate lesson plans, unit tests, and personalized remedial notes.' }
            ],
            pricingBadge: 'Flexible Subscriptions',
            pricingTitle: 'Simple, Transparent Pricing',
            pricingDescription: 'Choose the plan that fits your campus size. All plans include automated cloud updates and SSL encryption.',
            pricingTiers: [
              { name: 'Starter School', price: '$299', period: '/ month', tagline: 'Ideal for single campuses up to 500 students.', badge: 'Single Campus', isPopular: false, cta: 'Get Started Starter', features: [{label:'Up to 500 Active Students'},{label:'Admissions CRM & Student Records'},{label:'Student & Staff Attendance Module'},{label:'Fees & Online Payment Gateway'},{label:'Parent & Student Mobile Apps'},{label:'Standard Email & Ticket Support'},{label:'99.5% Uptime SLA Guarantee'}] },
              { name: 'Professional Campus', price: '$699', period: '/ month', tagline: 'Comprehensive suite for growing institutions up to 2,500 students.', badge: 'Most Popular Choice', isPopular: true, cta: 'Request Demo & Quote', features: [{label:'Up to 2,500 Active Students'},{label:'All Starter School Features'},{label:'Live GPS Bus Tracking & Driver App'},{label:'Daycare & Early Childhood Module'},{label:'Saraswati AI Lesson Plan Assistant'},{label:'Exams, Grading & Digital Report Cards'},{label:'Payroll & HR Operations Module'},{label:'24/7 Priority Phone & WhatsApp Support'}] },
              { name: 'Enterprise Network', price: 'Custom', period: '', tagline: 'Designed for multi-branch school groups & daycare chains.', badge: 'Multi-Branch Group', isPopular: false, cta: 'Contact Enterprise Sales', features: [{label:'Unlimited Students & Multi-Branches'},{label:'All Professional Features Included'},{label:'Dedicated Isolated Cloud Instance'},{label:'White-Label Custom Branded Mobile Apps'},{label:'Custom API Integrations & Webhooks'},{label:'Dedicated Account Manager & SLA'},{label:'On-Site Staff Training & Data Migration'}] }
            ],
            faqsBadge: 'Got Questions?',
            faqsTitle: 'Frequently Asked Questions',
            faqsDescription: 'Everything you need to know about implementation, deployment, and security.',
            faqs: [
              { question: 'How long does campus onboarding and data migration take?', answer: 'Our dedicated migration team can ingest student records, past fee ledgers, and staff profiles within 3 to 5 business days. We provide complete Excel/CSV data importing tools and run parallel validation to guarantee 100% accuracy.' },
              { question: 'Are the parent and teacher mobile apps available on iOS and Android?', answer: 'Yes! SmartSchool ERP includes native iOS and Android mobile apps for parents, students, teachers, transport drivers, and daycare caregivers. For Enterprise plans, we can also publish white-label apps under your school’s own App Store developer account.' },
              { question: 'Is student and financial data isolated and secure?', answer: 'Security is paramount. SmartSchool ERP utilizes multi-tenant schema isolation, 256-bit AES encryption at rest, and TLS 1.3 in transit. Data is hosted in SOC2 Type II certified Cloud Run and PostgreSQL environments with automated daily backups.' },
              { question: 'How does Saraswati AI Assistant help our teaching staff?', answer: 'Saraswati AI allows educators to type a topic (e.g., "Photosynthesis for Grade 7") and generates structured 45-minute lesson plans, recommended homework assignments, and multiple-choice quizzes in under 10 seconds, saving teachers up to 15 hours per week.' },
              { question: 'Can we customize fee structures and grading rules for our school board?', answer: 'Absolutely. The platform supports complex CBSE, ICSE, IB, Cambridge, and custom state board grading frameworks. Fee engines accommodate installment schedules, sibling discounts, scholarship deductions, and custom late fine logic.' }
            ],
            contactCtaBadge: 'START YOUR NEXT PROJECT',
            contactCtaTitle: "Let's Build Something Extraordinary Together.",
            contactCtaHighlight: 'Extraordinary Together.',
            contactCtaDescription: 'Whether you need a full-scale web application, custom school ERP, or technical architecture advisory — our dedicated engineering team is ready to deliver.',
            contactFormTitle: 'Send Us a Message',
            contactFormSubtitle: "Fill out the details below and we'll reply within 24 hours.",
            contactFormStatus: 'Available for New Projects',
            contactEmail: 'hello@aprogra.com',
            contactPhone: '+1 (800) 555-0199',
            contactPhoneHours: 'Mon – Fri, 9:00 AM – 7:00 PM EST',
            contactAddress: '500 Howard St, Suite 400',
            contactCity: 'San Francisco, CA 94105',
            contactPresenceBadge: 'Global Presence',
            contactPresenceTitle: 'Engineering Across Global Time Zones',
            contactPresenceDescription: 'Operating hub networks in San Francisco, London, and Hyderabad to provide uninterrupted product velocity and active support.'
        };

        await strapiAny.documents('api::school-erp-page.school-erp-page').create({
          data: dataPayload,
          status: 'published'
        });
        strapi.log.info('[Bootstrap] Seeded default School ERP Page content.');
      }
      // ------------------------------------

      // --- NEW OMNICHAT PAGE SEEDING ---
      const omnichatCount = await strapiAny.documents('api::omnichat-page.omnichat-page').count();
      if (omnichatCount === 0) {
        const omnichatPayload = {
          heroBadge: 'OmniChat · Multichannel AI Platform',
          heroTitle: 'Multichannel Messaging & Automation, Powered by the WhatsApp Business API.',
          heroHighlight: 'the WhatsApp Business API.',
          heroDescription: 'Unify WhatsApp, Instagram DMs, Messenger, and Telegram into one shared inbox equipped with visual no-code flowcharts and autonomous Gemini AI conversational agents.',
          primaryButtonText: 'Book OmniChat Demo',
          primaryButtonLink: '/contact',
          secondaryButtonText: 'Explore 4 Channels',
          secondaryButtonLink: '#channels-breakdown',
          heroMetrics: [
            { value: '4', label: 'Connected Channels', isPrimary: true },
            { value: '60%', label: 'Faster Support', isPrimary: false },
            { value: '1.2M+', label: 'Monthly Messages', isPrimary: false },
            { value: '24/7', label: 'AI Response SLA', isPrimary: false }
          ],
          channelsBadge: 'Multi-Channel Connectivity',
          channelsTitle: 'One Inbox. All Customer Touchpoints.',
          channelsDescription: 'Switch between channels below to view native messaging capabilities.',
          channels: [
            {
              channelId: 'whatsapp',
              name: 'WhatsApp Business API',
              badge: 'Official Meta Partner',
              icon: 'MessageCircle',
              tagline: 'Direct WhatsApp Marketing & Support at Scale',
              description: 'Broadcast promotional templates, send automated transactional order updates, and run AI customer support via official WhatsApp API.',
              metric: '98% Open Rate',
              metricLabel: 'Average WhatsApp Message Engagement',
              features: [
                { label: 'Official Green Tick Badge Verification' },
                { label: 'In-App Meta Template Submission & Approval' },
                { label: 'Interactive Quick-Reply & CTA Button Messages' },
                { label: '24-Hour Session Messaging Window Compliance' }
              ]
            },
            {
              channelId: 'instagram',
              name: 'Instagram DMs & Comments',
              badge: 'Meta Graph API',
              icon: 'Sparkles',
              tagline: 'Turn Comments & Story Mentions into Direct Revenue',
              description: 'Auto-reply to Instagram post comments and trigger immediate private DMs with discount codes or product links.',
              metric: '3.8x More DMs',
              metricLabel: 'Converted from Post Comments',
              features: [
                { label: 'Comment-to-DM Instant Automated Triggers' },
                { label: 'Story Mention Recognition & Automated Thank-You' },
                { label: 'Influencer Campaign Inbound Routing' },
                { label: 'Product Catalog Link Integration in DMs' }
              ]
            },
            {
              channelId: 'messenger',
              name: 'Facebook Messenger',
              badge: 'Meta Page Sync',
              icon: 'MessageSquare',
              tagline: 'Instant Lead Qualification from Facebook Ads',
              description: 'Capture inbound leads directly from Facebook Lead Ads or page messaging with zero response delay.',
              metric: '< 10 Sec',
              metricLabel: 'First Response Time',
              features: [
                { label: 'Facebook Lead Ads Instant Form Capture' },
                { label: 'Shared Team Inbox across Multiple Pages' },
                { label: 'Automated FAQ & Menu Cards' },
                { label: 'Seamless Live Agent Handover' }
              ]
            },
            {
              channelId: 'telegram',
              name: 'Telegram Bot API',
              badge: 'Unlimited Broadcasts',
              icon: 'Send',
              tagline: 'High-Volume Community & Channel Broadcasting',
              description: 'Manage Telegram channels and groups with automated subscription bots, broadcasts, and file sharing.',
              metric: 'Unlimited',
              metricLabel: 'Broadcast Subscriber Capacity',
              features: [
                { label: 'High-Speed Broadcast Messages to Channels' },
                { label: 'Automated Member Onboarding & Verification' },
                { label: 'File, Media & Document Delivery Bots' },
                { label: 'Command-Based Custom Bot Logic' }
              ]
            }
          ],
          automationBadge: 'No-Code Engine',
          automationTitle: 'Visual Automation Flowchart Builder',
          automationDescription: 'Map complex user journeys, conditional decision trees, and CRM webhooks on a drag-and-drop visual canvas.',
          automationNodes: [
            { icon: 'Workflow', title: 'Visual Flowchart Canvas', description: 'Drag-and-drop node builder to map complex customer journeys without writing a single line of code.' },
            { icon: 'Zap', title: 'Conditional Branching', description: 'Route conversations based on user keywords, past purchase history, or customer tag attributes.' },
            { icon: 'Share2', title: 'API Webhooks & Zapier', description: 'Trigger external CRM actions (Shopify, HubSpot, Salesforce) directly from chat interaction nodes.' },
            { icon: 'Clock', title: 'Smart Delay & Drip Sequences', description: 'Schedule follow-up messages after 1 hour, 24 hours, or 3 days to re-engage warm prospects.' }
          ],
          aiBadge: 'Autonomous Intelligence',
          aiTitle: 'AI Conversational Intelligence',
          aiDescription: 'Powered by Gemini 1.5 LLM vector embeddings to resolve up to 80% of routine customer support inquiries automatically.',
          aiCapabilities: [
            { icon: 'Bot', title: 'Autonomous Gemini 1.5 LLM Engine', description: 'Trained on your company knowledge base, documentation, and product catalogs to answer complex queries.' },
            { icon: 'Headphones', title: 'Seamless Human Handover', description: 'When AI detects high lead sentiment or complex issues, it seamlessly alerts and transfers to human agents.' },
            { icon: 'UserCheck', title: 'Automated Lead Qualification', description: 'AI gathers customer name, email, budget, and requirements before scheduling a calendar call.' },
            { icon: 'PhoneCall', title: 'AI Voice & Chat Answering', description: 'Intelligent fallback system handling both written chats and voice calls around the clock.' }
          ],
          pricingBadge: 'Subscription Plans',
          pricingTitle: 'Simple, Predictable Pricing',
          pricingDescription: 'Choose the plan that matches your monthly active contact volume.',
          pricingTiers: [
            {
              name: 'Starter Inbox',
              price: '$149',
              period: '/ month',
              tagline: 'For growing brands looking to automate WhatsApp & Instagram.',
              badge: 'Single Brand',
              isPopular: false,
              cta: 'Get Started Starter',
              features: [
                { label: 'Up to 5,000 Monthly Active Contacts' },
                { label: '2 Connected Channels (WhatsApp & Instagram)' },
                { label: 'Shared Team Inbox for 3 Agent Seats' },
                { label: 'No-Code Automation Builder' },
                { label: 'Meta Template Submission Engine' },
                { label: 'Standard Email & Chat Support' }
              ]
            },
            {
              name: 'Growth Automation',
              price: '$399',
              period: '/ month',
              tagline: 'Comprehensive suite for scaling retail & e-commerce operations.',
              badge: 'Most Popular Choice',
              isPopular: true,
              cta: 'Request Demo & Quote',
              features: [
                { label: 'Up to 25,000 Monthly Active Contacts' },
                { label: 'All 4 Connected Channels Included' },
                { label: 'Shared Team Inbox for 10 Agent Seats' },
                { label: 'Autonomous Gemini AI Chatbot Integration' },
                { label: 'Instagram Comment-to-DM Automation' },
                { label: 'Shopify & CRM API Webhooks' },
                { label: '24/7 Priority WhatsApp Support' }
              ]
            },
            {
              name: 'Enterprise Scale',
              price: 'Custom',
              period: '',
              tagline: 'Custom high-volume broadcasting & dedicated throughput.',
              badge: 'Enterprise Volume',
              isPopular: false,
              cta: 'Contact Enterprise Sales',
              features: [
                { label: 'Unlimited Monthly Active Contacts' },
                { label: 'Unlimited Agent Seats & Department Queues' },
                { label: 'Dedicated WhatsApp API High-Throughput Node' },
                { label: 'Custom LLM Fine-Tuning & Knowledge Base' },
                { label: 'Dedicated Account Manager & 99.9% SLA' },
                { label: 'Custom On-Premise / Isolated Cloud Deploy' }
              ]
            }
          ],
          faqsBadge: 'Got Questions?',
          faqsTitle: 'Frequently Asked Questions',
          faqs: [
            { question: 'How long does Meta WhatsApp Business API approval take?', answer: 'With OmniChat, official Meta WhatsApp Business API approval typically takes between 24 and 48 hours. We handle business verification assistance, phone number porting, and Meta display name guidelines directly.' },
            { question: 'How do we train the AI chatbot on our company data?', answer: 'Simply paste your website URL, upload PDF product manuals, or sync your Notion/Google Drive knowledge base. OmniChat automatically indexes your documents using vector embeddings and starts answering customer questions immediately.' },
            { question: 'Can human support agents intervene during an AI conversation?', answer: 'Yes! Human agents can monitor live AI conversations in the shared inbox and jump in at any time with a single click. The AI immediately pauses and hands over complete control to the agent.' },
            { question: 'How does Instagram Comment-to-DM automation work?', answer: 'When a user leaves a comment on your Instagram post containing trigger keywords (e.g., "PRICE", "DEMO", "INFO"), OmniChat instantly posts a public reply and sends a direct private message to that user with your link.' },
            { question: 'Can we migrate our existing WhatsApp Business number to OmniChat?', answer: 'Yes. You can migrate your existing phone number to the official WhatsApp Business Cloud API. Our onboarding specialists assist with OTP verification to ensure zero downtime during transfer.' }
          ],
          contactCtaBadge: 'START YOUR NEXT PROJECT',
          contactCtaTitle: "Let's Build Something Extraordinary Together.",
          contactCtaHighlight: 'Extraordinary Together.',
          contactCtaDescription: 'Whether you need a full-scale web application, custom school ERP, or technical architecture advisory — our dedicated engineering team is ready to deliver.',
          contactFormTitle: 'Send Us a Message',
          contactFormSubtitle: "Fill out the details below and we'll reply within 24 hours.",
          contactFormStatus: 'Available for New Projects',
          contactEmail: 'hello@aprogra.com',
          contactPhone: '+1 (800) 555-0199',
          contactPhoneHours: 'Mon – Fri, 9:00 AM – 7:00 PM EST',
          contactAddress: '500 Howard St, Suite 400',
          contactCity: 'San Francisco, CA 94105',
          contactPresenceBadge: 'Global Presence',
          contactPresenceTitle: 'Engineering Across Global Time Zones',
          contactPresenceDescription: 'Operating hub networks in San Francisco, London, and Hyderabad to provide uninterrupted product velocity and active support.'
        };

        await strapiAny.documents('api::omnichat-page.omnichat-page').create({
          data: omnichatPayload,
          status: 'published'
        });
        strapi.log.info('[Bootstrap] Seeded default OmniChat Page content.');
      }

      // Update existing omnichat-page if contact fields are missing
      const existingOmnichat = (await strapiAny.documents('api::omnichat-page.omnichat-page').findFirst({ status: 'draft' })) || (await strapiAny.documents('api::omnichat-page.omnichat-page').findFirst({ status: 'published' }));
      if (existingOmnichat && !existingOmnichat.contactCtaBadge) {
        await strapiAny.documents('api::omnichat-page.omnichat-page').update({
          documentId: existingOmnichat.documentId,
          data: {
            contactCtaBadge: 'START YOUR NEXT PROJECT',
            contactCtaTitle: "Let's Build Something Extraordinary Together.",
            contactCtaHighlight: 'Extraordinary Together.',
            contactCtaDescription: 'Whether you need a full-scale web application, custom school ERP, or technical architecture advisory — our dedicated engineering team is ready to deliver.',
            contactFormTitle: 'Send Us a Message',
            contactFormSubtitle: "Fill out the details below and we'll reply within 24 hours.",
            contactFormStatus: 'Available for New Projects',
            contactEmail: 'hello@aprogra.com',
            contactPhone: '+1 (800) 555-0199',
            contactPhoneHours: 'Mon – Fri, 9:00 AM – 7:00 PM EST',
            contactAddress: '500 Howard St, Suite 400',
            contactCity: 'San Francisco, CA 94105',
            contactPresenceBadge: 'Global Presence',
            contactPresenceTitle: 'Engineering Across Global Time Zones',
            contactPresenceDescription: 'Operating hub networks in San Francisco, London, and Hyderabad to provide uninterrupted product velocity and active support.'
          }
        });
        strapi.log.info('[Bootstrap] Updated existing OmniChat Page with contact CTA fields.');
      }

      // Update existing school-erp-page if contact fields are missing
      const existingSchoolErp = (await strapiAny.documents('api::school-erp-page.school-erp-page').findFirst({ status: 'draft' })) || (await strapiAny.documents('api::school-erp-page.school-erp-page').findFirst({ status: 'published' }));
      if (existingSchoolErp && !existingSchoolErp.contactCtaBadge) {
        await strapiAny.documents('api::school-erp-page.school-erp-page').update({
          documentId: existingSchoolErp.documentId,
          data: {
            contactCtaBadge: 'START YOUR NEXT PROJECT',
            contactCtaTitle: "Let's Build Something Extraordinary Together.",
            contactCtaHighlight: 'Extraordinary Together.',
            contactCtaDescription: 'Whether you need a full-scale web application, custom school ERP, or technical architecture advisory — our dedicated engineering team is ready to deliver.',
            contactFormTitle: 'Send Us a Message',
            contactFormSubtitle: "Fill out the details below and we'll reply within 24 hours.",
            contactFormStatus: 'Available for New Projects',
            contactEmail: 'hello@aprogra.com',
            contactPhone: '+1 (800) 555-0199',
            contactPhoneHours: 'Mon – Fri, 9:00 AM – 7:00 PM EST',
            contactAddress: '500 Howard St, Suite 400',
            contactCity: 'San Francisco, CA 94105',
            contactPresenceBadge: 'Global Presence',
            contactPresenceTitle: 'Engineering Across Global Time Zones',
            contactPresenceDescription: 'Operating hub networks in San Francisco, London, and Hyderabad to provide uninterrupted product velocity and active support.'
          }
        });
        strapi.log.info('[Bootstrap] Updated existing School ERP Page with contact CTA fields.');
      }
      // ------------------------------------

      // Auto-configure Public Role permissions for products-page, product, career-page, career, school-erp-page & omnichat-page
      try {
        const publicRole = await strapiAny.query('plugin::users-permissions.role').findOne({
          where: { type: 'public' },
        });

        if (publicRole) {
          const existingPerms = await strapiAny.query('plugin::users-permissions.permission').findMany({
            where: { role: publicRole.id },
          });

          const requiredPermissions = [
            'api::products-page.products-page.find',
            'api::product.product.find',
            'api::product.product.findOne',
            'api::career-page.career-page.find',
            'api::career.career.find',
            'api::career.career.findOne',
            'api::school-erp-page.school-erp-page.find',
            'api::omnichat-page.omnichat-page.find',
          ];

          for (const action of requiredPermissions) {
            const hasPerm = existingPerms?.some((p: any) => p.action === action);
            if (!hasPerm) {
              await strapiAny.query('plugin::users-permissions.permission').create({
                data: {
                  action: action,
                  role: publicRole.id,
                },
              });
            }
          }
          strapi.log.info('[Bootstrap] Configured Public permissions for products-page, product, career-page, career, school-erp-page, and omnichat-page.');
        }
      } catch (permErr) {
        strapi.log.warn('[Bootstrap] Public permissions auto-config notice:', permErr);
      }

    } catch (err: any) {
      strapi.log.warn('[Bootstrap] Auto-setup notice:', err?.message || err);
    }
  },
};

