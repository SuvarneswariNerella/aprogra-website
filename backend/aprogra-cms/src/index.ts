import type { Core } from '@strapi/strapi';

const STRUCTURED_CONTACT_PAGE_SEED_DATA = {

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
      { name: 'Web Apps' },
      { name: 'Mobile Apps' },
      { name: 'AI & Automation' },
      { name: 'Content & Marketing' },
      { name: 'Design Systems' },
      { name: 'Enterprise ERP' },
    ],
    budgetQuestion: 'Expected Investment Range',
    budgetRangesList: [
      { name: '< $15K' },
      { name: '$15K – $25K' },
      { name: '$25K – $75K' },
      { name: '$75K+' },
    ],
    timelineQuestion: 'Target Timeline',
    timelineRangesList: [
      { name: '< 1 Month' },
      { name: '1–3 Months' },
      { name: '3–6 Months' },
      { name: 'Flexible' },
    ],
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
      { name: 'System Architecture' },
      { name: 'AI & Automation' },
      { name: 'Project Rescue' },
      { name: 'Team Augmentation' },
    ],
    timeSlots: [
      { name: 'Tomorrow, 10:00 AM EST' },
      { name: 'Tomorrow, 2:30 PM EST' },
      { name: 'Thursday, 11:00 AM EST' },
      { name: 'Friday, 4:00 PM EST' },
    ],
    submitButtonText: 'Confirm Calendar Reservation',
    successTitle: 'Call Reserved!',
  },
};

const CONTACT_CHANNELS_SEED_DATA = [
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
];


const BLOG_PAGE_SEED_DATA = {
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
  },
  spotlight: {
    headerTitle: 'FEATURED SPOTLIGHT',
    editionBadge: 'Aug 2026 Edition',
    category: 'AI & Automation',
    readTime: '6 min read',
    title: 'Building Production Agentic AI Workflows with TypeScript & Gemini 1.5',
    excerpt:
      'How we architect autonomous agentic pipelines that run function calling, multi-step orchestration, and real-time state synchronization with sub-second latency.',
    point1: 'Decoupling decision loops from execution engines using typed schemas.',
    point2: 'Implementing exponential backoff and dynamic prompt re-try strategies.',
    authorName: 'Alex Rivera',
    authorRole: 'Principal AI Architect',
    authorAvatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    buttonText: 'Read Article',
  },
  nav: {
    showingPrefix: 'Showing',
    articlesSuffix: 'articles',
  },
  featuredSection: {
    badge: 'FEATURED ARTICLE',
    sideCardTitle: 'ARCHITECTURE INSIGHTS',
    sideCardDesc: 'Production-tested implementation patterns for engineering teams.',
    sideCardBadge: 'Verified Code Snippets Included',
  },
  metaTitle: 'Technical Blog & Engineering Insights | Aprogra',
  metaDescription:
    'Deep architectural breakdowns, AI workflows, web performance, and engineering dispatch from Aprogra.',
};

const SERVICES_PAGE_SEED_DATA = {
  hero: {
    topMetaBadge: 'FULL-CYCLE ENGINEERING • PRODUCTION PODS',
    countryBadge: '12+ Countries Served',
    complianceBadge: 'SOC2 & Enterprise Aligned',
    badge: 'FULL-CYCLE ENGINEERING',
    headline: 'Services Built to Ship,',
    highlight: 'Not Just Scope.',
    description:
      'One unified team with zero handoffs, from foundational architecture to global production launch.',
    primaryCta: {
      label: 'Start a Project',
      url: '/contact',
    },
    secondaryCta: {
      label: 'View Our Work',
      url: '/products',
    },
    statItems: [
      { item: '5 core service lines' },
      { item: '60+ engagements delivered' },
      { item: '100% in-house engineering' },
    ],
    stackTitle: 'SERVICE STACK',
    stackBadge: 'Live Pods',
    stackFooterLeft: 'Direct Access to Senior Architects',
    stackFooterRight: 'Zero Hand-offs',
    slaCardTitle: 'Engineering Velocity & SLAs',
    slaCardDesc: '99.98% Historical Uptime • 2-Week Sprints',
    slaCardMetric: '98.4%',
    slaCardMetricLabel: 'Retention Rate',
    scrollAnchorText: 'Scroll to Explore Disciplines',
  },
  kpi: {
    badge: 'PRODUCTION ARCHITECTURE',
    title: '5 Core Engineering Disciplines',
    subtitle:
      'Hover over or tap any card to inspect stack deliverables, verified performance metrics, and system capabilities.',
  },
  showcase: {
    badge: '02 / CAPABILITIES & ARCHITECTURE',
    subBadge: 'HORIZONTAL REVEAL',
    title: 'Core Engineering Disciplines',
    scrollText: 'SCROLL DOWN TO REVEAL DISCIPLINES',
  },
  closingCta: {
    badge: 'DIRECT ACCESS TO LEAD ARCHITECTS',
    headline: "Let's build what's next.",
    subtitle:
      'Eliminate vendor fragmentation. Aprogra takes single-source ownership of your software engineering lifecycle.',
    primaryCta: {
      label: 'Start a Project',
      url: '/contact',
    },
    secondaryCta: {
      label: 'Explore Products',
      url: '/products',
    },
    copyright: '© 2026 Aprogra Engineering Group.',
    standardsNote: 'SOC2 Type II & ISO 27001 Aligned Process',
  },
  metaTitle: 'Software Engineering Services | Aprogra',
  metaDescription:
    'Full-cycle engineering services: Web & Mobile, AI & Agentic Systems, Cloud-Native SaaS, Design Systems, and DevOps Infrastructure.',
};

const SERVICES_COLLECTION_SEED_DATA = [
  {
    title: 'Web & Mobile Engineering',
    slug: 'web-app',
    order: 1,
    tag: '01 / WEB & MOBILE',
    subheading: 'Sub-45ms Edge Response',
    shortDescription:
      'High-speed web platforms and native mobile apps with offline-first synchronization.',
    heroDescription:
      'Our Web & Mobile architecture focuses on delivering sub-second edge applications and cross-platform native experiences engineered for instantaneous response and maximum reliability.',
    accentColor: '#3B82F6',
    illustrationType: 'web',
    deliverables: [
      { item: 'Next.js & React 19' },
      { item: 'React Native & Expo' },
      { item: 'Real-Time WebSockets' },
      { item: 'CRDT & SQLite Offline Sync' },
    ],
    metrics: [
      { label: 'P95 Latency', value: '< 45ms' },
      { label: 'Lighthouse', value: '100/100' },
    ],
    technologies: [
      {
        category: 'Frontend',
        items: [
          { name: 'React 19' },
          { name: 'Next.js 15 App Router' },
          { name: 'Tailwind CSS' },
          { name: 'Framer Motion' },
        ],
      },
      {
        category: 'Mobile',
        items: [
          { name: 'React Native' },
          { name: 'Expo' },
          { name: 'Flutter' },
        ],
      },
      {
        category: 'Edge Computing',
        items: [
          { name: 'Vercel Edge Functions' },
          { name: 'Cloudflare Workers' },
        ],
      },
      {
        category: 'State & Sync',
        items: [
          { name: 'Zustand' },
          { name: 'CRDTs' },
          { name: 'SQLite Offline Sync' },
        ],
      },
    ],
    architecturePoints: [
      {
        title: 'Edge-First Rendering',
        description:
          'Server components rendered at the edge to guarantee sub-45ms TTFB globally.',
      },
      {
        title: 'Local-First Offline Sync',
        description:
          'Data is written locally to SQLite and synced seamlessly in the background using CRDT conflict resolution.',
      },
      {
        title: 'Native Performance',
        description:
          'React Native pipelines utilizing the new architecture (Fabric) and JSI for 60fps concurrent rendering.',
      },
    ],
    mermaidGraph: `graph TD
    Client[Client Device] -->|Edge Request| CDN[Global Edge Network]
    CDN -->|Cache Miss| EdgeRuntime[Edge Server Components]
    EdgeRuntime -->|Read/Write| EdgeDB[(Edge Replica DB)]
    EdgeDB -.->|Sync| PrimaryDB[(Primary Database)]
    Client -->|Local Mutate| LocalDB[(Local SQLite)]
    LocalDB -->|Background Sync| PrimaryDB
    
    classDef client fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef edge fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef db fill:#f3e5f5,stroke:#8e24aa,stroke-width:2px;
    
    class Client,LocalDB client;
    class CDN,EdgeRuntime,EdgeDB edge;
    class PrimaryDB db;`,
    faqs: [
      {
        question: 'How do you guarantee sub-45ms response times?',
        answer:
          'We combine Edge middleware, server-side streaming rendering, and global replica caching on distributed CDNs.',
      },
    ],
    cta: {
      label: 'Start a Project Brief',
      url: '/contact',
    },
    metaTitle: 'Web & Mobile Engineering | Aprogra',
    metaDescription:
      'Sub-45ms edge web applications and cross-platform native mobile experiences.',
  },
  {
    title: 'AI & Agentic Solutions',
    slug: 'ai-agents',
    order: 2,
    tag: '02 / AI & AGENTIC',
    subheading: 'Autonomous Workflows',
    shortDescription:
      'Multi-agent execution loops with structured schema generation and air-gapped SLMs.',
    heroDescription:
      'Moving beyond generic chat wrappers into verifiable tool-calling pipelines, structured schema outputs, and local SLM inference for complex task execution.',
    accentColor: '#8B5CF6',
    illustrationType: 'ai',
    deliverables: [
      { item: 'Multi-Agent Loops' },
      { item: 'Dense Vector RAG' },
      { item: 'Air-Gapped SLMs' },
      { item: 'Guardrails & Eval Suites' },
    ],
    metrics: [
      { label: 'RAG Retrieval', value: '< 180ms' },
      { label: 'Accuracy', value: '99.4%' },
    ],
    technologies: [
      {
        category: 'Language Models',
        items: [
          { name: 'Gemini 1.5 Pro/Flash' },
          { name: 'Claude 3.5 Sonnet' },
          { name: 'Llama 3' },
          { name: 'Local SLMs' },
        ],
      },
      {
        category: 'Frameworks',
        items: [
          { name: 'LangChain' },
          { name: 'LlamaIndex' },
          { name: 'AutoGen' },
          { name: 'Custom Reasoning Loops' },
        ],
      },
      {
        category: 'Vector Stores',
        items: [
          { name: 'Pinecone' },
          { name: 'Qdrant' },
          { name: 'pgvector' },
        ],
      },
      {
        category: 'Observability',
        items: [
          { name: 'LangSmith' },
          { name: 'PromptFoo Eval' },
          { name: 'DataDog' },
        ],
      },
    ],
    architecturePoints: [
      {
        title: 'Multi-Agent Orchestration',
        description:
          'Hierarchical agent architectures where planner agents delegate specialized tasks to worker agents with specific tool access.',
      },
      {
        title: 'Structured Output Enforcement',
        description:
          'Constrained generation techniques guaranteeing 100% adherence to complex JSON schemas for API ingestion.',
      },
      {
        title: 'Air-Gapped SLM Inference',
        description:
          'Locally deployed Small Language Models on secure VPCs ensuring zero data leakage for highly sensitive PII.',
      },
    ],
    mermaidGraph: `graph TD
    User[User Request] --> Orchestrator[Planner Agent]
    Orchestrator -->|Decomposes Task| Router{Task Router}
    
    Router -->|RAG| WorkerA[Research Agent]
    Router -->|Code Execution| WorkerB[Code Interpreter Agent]
    Router -->|External API| WorkerC[Action Agent]
    
    WorkerA --> VectorDB[(Vector DB)]
    WorkerB --> Sandbox[Secure Docker Sandbox]
    WorkerC --> APIs[External APIs]
    
    WorkerA -->|Result| Orchestrator
    WorkerB -->|Result| Orchestrator
    WorkerC -->|Result| Orchestrator
    
    Orchestrator -->|Synthesized JSON| Output[Structured Response]
    
    classDef ai fill:#ede7f6,stroke:#673ab7,stroke-width:2px;
    classDef data fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    
    class Orchestrator,WorkerA,WorkerB,WorkerC,Router ai;
    class VectorDB,Output data;`,
    faqs: [
      {
        question: 'How do you prevent hallucinations in critical business pipelines?',
        answer:
          'We implement deterministic validation schemas, dual-pass verification agents, and strict grounding retrieval.',
      },
    ],
    cta: {
      label: 'Deploy Agentic Architecture',
      url: '/contact',
    },
    metaTitle: 'AI & Agentic Solutions | Aprogra',
    metaDescription:
      'Autonomous cognitive workflows, multi-agent loops, and air-gapped SLM deployment.',
  },
  {
    title: 'Product & SaaS Engines',
    slug: 'saas-product',
    order: 3,
    tag: '03 / SAAS & APIS',
    subheading: 'Multi-Tenant Systems',
    shortDescription:
      'Multi-tenant platforms with row-level security, event-driven pipelines, and automated metering.',
    heroDescription:
      'Full-lifecycle software engineering from raw data schema to scalable multi-tenant execution with automated Stripe metering and subscription logic.',
    accentColor: '#06B6D4',
    illustrationType: 'saas',
    deliverables: [
      { item: 'Row-Level Security' },
      { item: 'Stripe Metering' },
      { item: 'GraphQL & gRPC' },
      { item: 'PostgreSQL & Distributed DB' },
    ],
    metrics: [
      { label: 'Daily Ops', value: '25M+' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    technologies: [
      {
        category: 'Backend Engine',
        items: [
          { name: 'Node.js' },
          { name: 'Go' },
          { name: 'PostgreSQL' },
          { name: 'Redis' },
        ],
      },
      {
        category: 'Billing & Identity',
        items: [
          { name: 'Stripe Billing' },
          { name: 'Clerk / Auth0' },
          { name: 'RBAC Middleware' },
        ],
      },
      {
        category: 'Queues & Events',
        items: [
          { name: 'RabbitMQ' },
          { name: 'Kafka' },
          { name: 'BullMQ' },
        ],
      },
      {
        category: 'APIs',
        items: [
          { name: 'GraphQL' },
          { name: 'tRPC' },
          { name: 'RESTful OpenAPI' },
        ],
      },
    ],
    architecturePoints: [
      {
        title: 'Row-Level Security (RLS)',
        description:
          'Hardened multi-tenancy utilizing PostgreSQL RLS policies guaranteeing absolute data isolation between tenant organizations.',
      },
      {
        title: 'Event-Driven Microservices',
        description:
          'Asynchronous event bus architecture enabling highly decoupled, scalable background processing for intensive tasks.',
      },
      {
        title: 'Real-Time Usage Metering',
        description:
          'High-throughput time-series event ingestion engine accurately aggregating tenant consumption for automated tiered billing.',
      },
    ],
    mermaidGraph: `graph TD
    Client[Web/Mobile Client] --> API[API Gateway / Envoy]
    API --> Auth[Auth & Tenant Resolver]
    
    Auth --> ServiceA[Core SaaS Engine]
    Auth --> ServiceB[Async Job Workers]
    
    ServiceA --> DB[(PostgreSQL with RLS)]
    ServiceA --> Cache[(Redis Cluster)]
    
    ServiceB --> Queue[(BullMQ / Kafka)]
    ServiceB --> Stripe[Stripe Metering API]
    
    classDef saas fill:#e0f7fa,stroke:#00838f,stroke-width:2px;
    classDef infra fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    
    class API,Auth,ServiceA,ServiceB saas;
    class DB,Cache,Queue,Stripe infra;`,
    faqs: [
      {
        question: 'How is tenant data isolated?',
        answer:
          'PostgreSQL Row-Level Security ensures that tenant queries cannot access data belonging to other organizations under any circumstance.',
      },
    ],
    cta: {
      label: 'Architect SaaS Engine',
      url: '/contact',
    },
    metaTitle: 'Product & SaaS Engines | Aprogra',
    metaDescription:
      'Multi-tenant cloud architecture, automated Stripe metering, and high-throughput event processing.',
  },
  {
    title: 'Mathematical Design Systems',
    slug: 'design-systems',
    order: 4,
    tag: '04 / DESIGN SYSTEMS',
    subheading: 'Systematic Tokens',
    shortDescription:
      'Tokenized component ecosystems engineered with fluid typography and WCAG AA accessibility.',
    heroDescription:
      'Token-based design infrastructure translating Figma variables directly into cross-platform UI primitives with deterministic typographic hierarchy.',
    accentColor: '#F43F5E',
    illustrationType: 'design',
    deliverables: [
      { item: 'Token CI/CD' },
      { item: 'Accessible Primitives' },
      { item: 'WCAG AA Standard' },
      { item: 'Fluid Micro-Interactions' },
    ],
    metrics: [
      { label: 'Primitives', value: '120+' },
      { label: 'Compliance', value: 'WCAG AA' },
    ],
    technologies: [
      {
        category: 'Design Architecture',
        items: [
          { name: 'Figma Variables' },
          { name: 'Token Studio' },
          { name: 'Style Dictionary' },
        ],
      },
      {
        category: 'Component Engine',
        items: [
          { name: 'Radix UI' },
          { name: 'React Aria' },
          { name: 'Tailwind CSS v4' },
          { name: 'Storybook 8' },
        ],
      },
      {
        category: 'Animation & Motion',
        items: [
          { name: 'GSAP 3' },
          { name: 'Framer Motion' },
          { name: 'Lenis Smooth Scroll' },
        ],
      },
      {
        category: 'Quality & Testing',
        items: [
          { name: 'Axe Core A11y' },
          { name: 'Chromatic Visual Diff' },
          { name: 'Playwright E2E' },
        ],
      },
    ],
    architecturePoints: [
      {
        title: 'Automated Token Sync',
        description:
          'Bidirectional CI/CD pipeline converting Figma design tokens into production CSS custom properties upon PR merge.',
      },
      {
        title: 'Headless Accessibility',
        description:
          'All interactive components built upon battle-tested WAI-ARIA patterns supporting full keyboard navigation and screen readers.',
      },
      {
        title: 'Fluid Typography Scale',
        description:
          'Mathematical clamp-based font sizing ensuring smooth responsive scaling without jarring layout shifts across viewport widths.',
      },
    ],
    mermaidGraph: `graph TD
    Figma[Figma Token Variables] -->|Webhook on Publish| GitHubActions[Token Build Pipeline]
    GitHubActions --> StyleDictionary[Style Dictionary Engine]
    
    StyleDictionary --> CSSTokens[CSS Custom Properties]
    StyleDictionary --> TSTokens[TypeScript Design Constants]
    StyleDictionary --> TailwindConfig[Tailwind Preset Plugin]
    
    CSSTokens --> UIComponents[React Primitives Kit]
    TSTokens --> UIComponents
    TailwindConfig --> UIComponents
    
    UIComponents --> Storybook[Visual Regression Tests]
    UIComponents --> ProductionApp[Production Web & Mobile App]
    
    classDef figma fill:#fce4ec,stroke:#c2185b,stroke-width:2px;
    classDef build fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    classDef prod fill:#e8f5e9,stroke:#388e3c,stroke-width:2px;
    
    class Figma figma;
    class GitHubActions,StyleDictionary build;
    class UIComponents,Storybook,ProductionApp prod;`,
    faqs: [
      {
        question: 'How are tokens synced from design to code?',
        answer:
          'We set up GitHub Actions that listen to Figma webhooks and automatically transform tokens into CSS/TypeScript variables.',
      },
    ],
    cta: {
      label: 'Build Design System',
      url: '/contact',
    },
    metaTitle: 'Mathematical Design Systems | Aprogra',
    metaDescription:
      'Token-based UI ecosystems, fluid typography scales, and WCAG AA accessible components.',
  },
  {
    title: 'Edge & GitOps Infrastructure',
    slug: 'cloud-devops',
    order: 5,
    tag: '05 / CLOUD & DEVOPS',
    subheading: 'Zero-Trust Ops',
    shortDescription:
      'Resilient cloud infrastructure with declarative IaC, self-healing Kubernetes, and zero-downtime CI.',
    heroDescription:
      'Enterprise-grade cloud architectures built on immutable infrastructure-as-code, automated blue-green deployments, and proactive telemetry.',
    accentColor: '#10B981',
    illustrationType: 'cloud',
    deliverables: [
      { item: 'Terraform & Pulumi' },
      { item: 'Self-Healing K8s' },
      { item: 'Zero-Downtime CI' },
      { item: 'Distributed Telemetry' },
    ],
    metrics: [
      { label: 'Deploy Time', value: '< 3m' },
      { label: 'MTTR Recovery', value: '< 90s' },
    ],
    technologies: [
      {
        category: 'Infrastructure as Code',
        items: [
          { name: 'Terraform' },
          { name: 'OpenTofu' },
          { name: 'Pulumi' },
          { name: 'AWS CDK' },
        ],
      },
      {
        category: 'Orchestration',
        items: [
          { name: 'Kubernetes (EKS/GKE)' },
          { name: 'Docker' },
          { name: 'Helm' },
          { name: 'ArgoCD' },
        ],
      },
      {
        category: 'CI/CD & GitOps',
        items: [
          { name: 'GitHub Actions' },
          { name: 'GitLab CI' },
          { name: 'Kaniko' },
          { name: 'Trivy Security' },
        ],
      },
      {
        category: 'Monitoring & Telemetry',
        items: [
          { name: 'Prometheus' },
          { name: 'Grafana' },
          { name: 'OpenTelemetry' },
          { name: 'Loki' },
        ],
      },
    ],
    architecturePoints: [
      {
        title: 'Declarative GitOps Delivery',
        description:
          'ArgoCD reconciling Kubernetes cluster state continuously against version-controlled Git manifests.',
      },
      {
        title: 'Zero-Downtime Deployments',
        description:
          'Automated progressive canary releases with metric-based rollbacks on error budget breach.',
      },
      {
        title: 'Zero-Trust Security Mesh',
        description:
          'mTLS encrypted inter-service communication with Istio service mesh and automated certificate rotation.',
      },
    ],
    mermaidGraph: `graph TD
    GitRepo[Git Repository / Main Branch] -->|Commit Push| GitHubActions[CI Pipeline: Lint, Test, Scan]
    GitHubActions --> ContainerRegistry[ECR / Artifact Registry]
    GitHubActions -->|Update Manifest| ManifestRepo[GitOps Manifests Repo]
    
    ManifestRepo -->|Sync Trigger| ArgoCD[ArgoCD Controller]
    ArgoCD -->|Progressive Rollout| K8sCluster[Kubernetes Cluster / EKS]
    
    K8sCluster --> PromTelemetry[Prometheus & OpenTelemetry]
    PromTelemetry -->|Alert Breach| ArgoCD
    ArgoCD -.->|Auto Rollback if Error| K8sCluster
    
    classDef git fill:#eceff1,stroke:#455a64,stroke-width:2px;
    classDef ci fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef k8s fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    
    class GitRepo,ManifestRepo git;
    class GitHubActions,ContainerRegistry ci;
    class ArgoCD,K8sCluster,PromTelemetry k8s;`,
    faqs: [
      {
        question: 'How is zero-downtime achieved during deployments?',
        answer:
          'We employ canary releases and blue-green clusters managed with ArgoCD and health checks.',
      },
    ],
    cta: {
      label: 'Modernize Cloud Infra',
      url: '/contact',
    },
    metaTitle: 'Edge & GitOps Infrastructure | Aprogra',
    metaDescription:
      'Zero-trust cloud infrastructure, self-healing Kubernetes clusters, and GitOps CI/CD delivery.',
  },
];

const TESTIMONIALS_SEED_DATA = [
  {
    authorName: 'Marcus Vance',
    authorRole: 'Chief Technology Officer',
    authorCompany: 'SaaSify Platforms',
    quote: 'Aprogra delivered our micro-services backend ahead of schedule with zero architectural debt. Their engineers operated like a natural extension of our staff.',
    rating: 5,
    highlight: 'Zero architectural debt & ahead of schedule',
    projectTag: 'Cloud Architecture & Kubernetes',
  },
  {
    authorName: 'Elena Rostova',
    authorRole: 'Founder & CEO',
    authorCompany: 'Horizon AI',
    quote: 'The agentic AI pipelines built by Aprogra automated 70% of our internal data triage workflows. Their mastery of Gemini 1.5 gave us a massive competitive edge.',
    rating: 5,
    highlight: 'Automated 70% of internal triage workflows',
    projectTag: 'Agentic AI & Function Calling',
  },
  {
    authorName: 'Devon Hayes',
    authorRole: 'VP of Engineering',
    authorCompany: 'CloudScale Inc',
    quote: 'From initial brief to production launch in just 6 weeks. The team’s velocity, clean React code, and proactive communication set a new benchmark.',
    rating: 5,
    highlight: 'Production launch in 6 weeks',
    projectTag: 'Full-Stack React & Node.js',
  },
  {
    authorName: 'Priya Patel',
    authorRole: 'Head of Digital Products',
    authorCompany: 'FinTech One',
    quote: 'Their design system and Tailwind CSS component library made our web app lightning fast, accessible, and effortlessly maintainable.',
    rating: 5,
    highlight: 'Lightning fast & accessible design system',
    projectTag: 'Design System & UX/UI',
  },
  {
    authorName: 'Ravi K.',
    authorRole: 'Director',
    authorCompany: 'SmartSchool',
    quote: 'AProgra delivered our entire school ERP from scratch in 4 months. The quality was exceptional and the team felt like our own.',
    rating: 5,
    highlight: 'School ERP in 4 months',
    projectTag: 'Enterprise Software',
  }
];

const PRODUCTS_SEED_DATA = [
  {
    name: 'Aprogra School ERP',
    slug: 'school-erp',
    tagline: 'Next-Gen Operating System for K-12, Higher Ed & Multi-Branch Campuses',
    shortDescription: 'Unified campus management platform covering admissions, attendance, fees, RFID biometrics, and Saraswati AI lesson generation.',
    accentColorPrimary: '#3B4FCF',
    accentColorSecondary: '#8B5CF6',
    order: 1,
    status: 'active',
    isFeaturedOnHub: true,
    heroTitle: 'Unified Campus Intelligence & Autonomous Operations',
    heroSubtitle: 'Complete digital management for modern educational institutions — from RFID attendance turnstiles and live bus GPS radar to automated CBSE/ICSE exam engines and Saraswati AI.',
    heroBadgeText: 'NEXT-GEN CAMPUS OPERATING SYSTEM',
    heroTelemetryPills: [
      { label: 'Live RFID Sync', value: '99.8% Accuracy', icon: 'ShieldCheck' },
      { label: 'Parent Alert Latency', value: '< 2 Sec', icon: 'Clock' },
      { label: 'Fleet GPS Radar', value: '100% Live', icon: 'Bus' },
    ],
    features: [
      {
        title: 'Admissions CRM',
        description: 'Enquiry-to-enrollment pipeline with lead scoring, document verification, and conversion tracking.',
        icon: 'Users',
        category: 'module',
        tag: 'Admissions & Enrolment',
        metricLabel: 'Higher Lead Conversion',
        metricValue: '+38%',
        highlights: 'End-to-end inquiry-to-enrollment funnel\nDynamic lead scoring & attribution\nDigital document verification',
        order: 1,
      },
      {
        title: 'Attendance & Biometrics',
        description: 'Daily student registers and staff clock-in with biometric and RFID integration, all in-app.',
        icon: 'Clock',
        category: 'module',
        tag: 'Hardware Integrated',
        metricLabel: 'Absence Alert Speed',
        metricValue: '< 2 Sec',
        highlights: 'Real-time biometric + RFID turnstiles\nAutomated SMS/WhatsApp parent alerts\nCBSE/ICSE monthly registers',
        order: 2,
      },
      {
        title: 'Timetable & Exams',
        description: 'Conflict-free schedules, dynamic seating plans, marks entry, and automated transcripts generation.',
        icon: 'Calendar',
        category: 'module',
        tag: 'Examination Engine',
        metricLabel: 'Report Card Automation',
        metricValue: '100%',
        highlights: 'AI conflict-free scheduling engine\nDynamic hall tickets & seating planner\nContinuous Assessment (CCE) report cards',
        order: 3,
      },
      {
        title: 'Fees & Online Payments',
        description: 'Custom fee structures, sibling discounts, instant digital invoices, and secure parent payments in-app.',
        icon: 'CreditCard',
        category: 'module',
        tag: 'Payment Gateway',
        metricLabel: 'On-Time Collections',
        metricValue: '99.4%',
        highlights: 'Custom recurring fee structures & sibling discounts\nUPI, Cards & NetBanking integration\nAutomated receipts & ledger sync',
        order: 4,
      },
      {
        title: 'Live Transport Tracking',
        description: 'Real-time bus GPS tracking, dynamic routes, geofenced stops, and automated parent arrival alerts.',
        icon: 'Bus',
        category: 'module',
        tag: 'Fleet Telemetry',
        metricLabel: 'GPS Fleet Visibility',
        metricValue: '100% Live',
        highlights: 'Real-time GPS telemetry on live map\n5-minute geofenced arrival notifications\nDriver speed tracking & SOS triggers',
        order: 5,
      },
      {
        title: 'Student, Teacher & Parent Apps',
        description: 'Dedicated native mobile experiences tailored for every stakeholder role with biometric authentication.',
        icon: 'Smartphone',
        category: 'module',
        tag: 'Multi-Stakeholder',
        metricLabel: 'App Store Rating',
        metricValue: '4.9★',
        highlights: 'Native iOS & Android apps\nHomework, fee payments & circulars\nMulti-child switching & biometric login',
        order: 6,
      },
      {
        title: 'HR & Staff Payroll',
        description: 'Complete employee directory, multi-tier leave workflows, automated pay scales, and PDF payslips.',
        icon: 'FileText',
        category: 'module',
        tag: 'HR Management',
        metricLabel: 'Payroll Accuracy',
        metricValue: 'Zero Error',
        highlights: 'Biometric shift & leave management\nConfigurable salary structures & PF/tax deductions\n1-click payslips & bank export',
        order: 7,
      },
      {
        title: 'Daycare Suite',
        description: 'Real-time meals, nap schedules, restroom logs, secure QR pickup passes, and shared media moments.',
        icon: 'HeartHandshake',
        category: 'module',
        tag: 'Daycare & Creche',
        metricLabel: 'Parent Satisfaction',
        metricValue: '4.9★',
        highlights: 'Real-time daily activity logs (meals, naps, potty)\nSecure QR pickup authorization\nDaily photo & video moments feed',
        order: 8,
      },
      {
        title: 'Appointments & Front Office',
        description: 'Seamless parent-teacher meeting booking with staff, digital reception logs, and visitor pass badges.',
        icon: 'CalendarCheck',
        category: 'module',
        tag: 'Visitor Security',
        metricLabel: 'Reception Speed',
        metricValue: '3x Faster',
        highlights: 'Self-service PTM booking calendar\nDigital visitor pass with thermal badge printing\nGate pass and courier registers',
        order: 9,
      },
      {
        title: 'Saraswati AI Assistant',
        description: 'Built-in enterprise AI for syllabus-aligned lesson planning, automated quiz generation, and fast semantic search.',
        icon: 'Bot',
        category: 'capability',
        tag: 'Next-Gen AI',
        metricLabel: 'Lesson Planning Speed',
        metricValue: '10x Faster',
        highlights: 'Curriculum-aligned lesson planner\nAutomated quiz & worksheet generator\nMulti-lingual school policy bot',
        order: 10,
      },
      {
        title: 'Reports & Analytics',
        description: 'Role-based executive dashboards, customizable KPI widgets, and one-click CBSE/ICSE regulatory exports.',
        icon: 'BarChart3',
        category: 'module',
        tag: 'Executive Suite',
        metricLabel: 'Compliance Ready',
        metricValue: '100%',
        highlights: 'Executive KPI dashboards\n1-click board & state compliance exports\nScheduled automated management reports',
        order: 11,
      },
    ],
    pricingTiers: [
      {
        name: 'Starter School',
        price: '$299',
        billingPeriod: 'monthly',
        tagline: 'Ideal for single campuses up to 500 students.',
        badge: 'Single Campus',
        isFeatured: false,
        ctaLabel: 'Get Started Starter',
        ctaLink: '/contact',
        order: 1,
        features: [
          { text: 'Up to 500 Active Students', included: true },
          { text: 'Admissions CRM & Student Records', included: true },
          { text: 'Student & Staff Attendance Module', included: true },
          { text: 'Fees & Online Payment Gateway', included: true },
          { text: 'Parent & Student Mobile Apps', included: true },
          { text: 'Standard Email & Ticket Support', included: true },
          { text: '99.5% Uptime SLA Guarantee', included: true },
        ],
      },
      {
        name: 'Professional Campus',
        price: '$699',
        billingPeriod: 'monthly',
        tagline: 'Comprehensive suite for growing institutions up to 2,500 students.',
        badge: 'Most Popular Choice',
        isFeatured: true,
        ctaLabel: 'Request Demo & Quote',
        ctaLink: '/contact',
        order: 2,
        features: [
          { text: 'Up to 2,500 Active Students', included: true },
          { text: 'All Starter School Features Included', included: true },
          { text: 'Live GPS Bus Tracking & Driver App', included: true },
          { text: 'Daycare & Early Childhood Module', included: true },
          { text: 'Saraswati AI Lesson Plan Assistant', included: true },
          { text: 'Exams, Grading & Digital Report Cards', included: true },
          { text: 'Payroll & HR Operations Module', included: true },
          { text: '24/7 Priority Phone & WhatsApp Support', included: true },
        ],
      },
      {
        name: 'Enterprise Network',
        price: 'Custom',
        billingPeriod: 'custom',
        tagline: 'Designed for multi-branch school groups & daycare chains.',
        badge: 'Multi-Branch Group',
        isFeatured: false,
        ctaLabel: 'Contact Enterprise Sales',
        ctaLink: '/contact',
        order: 3,
        features: [
          { text: 'Unlimited Students & Multi-Branches', included: true },
          { text: 'All Professional Features Included', included: true },
          { text: 'Dedicated Isolated Cloud Instance', included: true },
          { text: 'White-Label Custom Branded Mobile Apps', included: true },
          { text: 'Custom API Integrations & Webhooks', included: true },
          { text: 'Dedicated Account Manager & SLA', included: true },
          { text: 'On-Site Staff Training & Data Migration', included: true },
        ],
      },
    ],
    faqs: [
      {
        question: 'How quickly can our school campus migrate existing student records?',
        answer: 'Most schools complete full data onboarding within 3 to 5 business days. Our dedicated migration team imports legacy Excel/CSV records and configures fee slabs without downtime.',
        order: 1,
      },
      {
        question: 'Does the system integrate with physical biometric turnstiles and RFID readers?',
        answer: 'Yes, Aprogra School ERP supports direct TCP/IP and cloud sync with major biometric, RFID, and facial recognition turnstile manufacturers.',
        order: 2,
      },
      {
        question: 'Can we generate board-compliant report cards (CBSE, ICSE, IB, State)?',
        answer: 'Yes. The examination engine has pre-configured templates for CBSE Continuous Assessment (CCE), ICSE 9-point scale, and international IB grading rubrics.',
        order: 3,
      },
    ],
    kpiStats: [
      { icon: 'ShieldCheck', title: 'Hardware Uptime', value: '99.8%', description: 'Biometric & RFID synchronization reliability' },
      { icon: 'Clock', title: 'Alert Latency', value: '< 2 Sec', description: 'Automated absentee WhatsApp and SMS alerts' },
      { icon: 'CreditCard', title: 'Collection Rate', value: '99.4%', description: 'On-time fee collections via integrated payment links' },
    ],
    primaryCta: { label: 'Book Campus Demo', link: '/contact', style: 'primary' },
    secondaryCta: { label: 'Explore Modules', link: '#modules', style: 'secondary' },
    seo: {
      metaTitle: 'Aprogra School ERP | Enterprise Campus Management',
      metaDescription: 'Next-Gen School ERP platform for K-12 and multi-branch campuses with RFID attendance, GPS tracking, and Saraswati AI.',
    },
  },
  {
    name: 'OmniChat AI',
    slug: 'omnichat',
    tagline: 'Multi-Channel Conversational AI & Unified Support Platform',
    shortDescription: 'Centralize WhatsApp, Instagram, Messenger, and Telegram with autonomous AI chatbots and no-code automation flows.',
    accentColorPrimary: '#EC4899',
    accentColorSecondary: '#3B4FCF',
    order: 2,
    status: 'active',
    isFeaturedOnHub: true,
    heroTitle: 'Turn Multi-Channel Conversations into Loyal Customers',
    heroSubtitle: 'Unify WhatsApp Business API, Instagram DMs, Facebook Messenger, and Telegram into one collaborative inbox powered by autonomous AI and visual no-code workflows.',
    heroBadgeText: 'OFFICIAL META CLOUD PARTNER',
    heroTelemetryPills: [
      { label: 'Connected Channels', value: '4 Live', icon: 'MessageSquare' },
      { label: 'Average Open Rate', value: '98%', icon: 'Sparkles' },
      { label: 'Comment-to-DM Lift', value: '3.8x More DMs', icon: 'Zap' },
    ],
    features: [
      {
        title: '4 Connected Channels',
        description: 'WhatsApp Business API, Instagram, Messenger, and Telegram centralized into one unified team inbox.',
        icon: 'MessageSquare',
        category: 'channel',
        tag: 'Channel Integrations',
        metricLabel: 'Open Rate',
        metricValue: '98%',
        highlights: 'Official WhatsApp Business API with green tick\nInstagram DMs & story replies unified\nTelegram bot connectivity with multi-agent routing',
        order: 1,
      },
      {
        title: 'No-Code Automation Builder',
        description: 'Visual drag-and-drop flowchart builder to design complex multi-step customer journeys and triggers.',
        icon: 'Zap',
        category: 'capability',
        tag: 'Visual Workflows',
        metricLabel: 'Coding Required',
        metricValue: 'Zero',
        highlights: 'Visual flowchart builder with conditional branching\nCustom user attributes, tags & auto-assignment\nWebhooks & REST API triggers for CRM sync',
        order: 2,
      },
      {
        title: 'Cross-Channel AI Chatbot',
        description: 'Autonomous conversational AI trained on your custom knowledge base, delivering instant 24/7 answers.',
        icon: 'Bot',
        category: 'capability',
        tag: 'Conversational AI',
        metricLabel: 'First Response Time',
        metricValue: '< 5 Sec',
        highlights: 'RAG architecture trained on PDFs, websites & catalogs\nSmart sentiment analysis with graceful human escalation\n50+ language support with contextual memory',
        order: 3,
      },
      {
        title: 'AI Call & Chat Answering',
        description: 'Intelligent voice answering and automated chat routing to capture leads even outside business hours.',
        icon: 'Headphones',
        category: 'capability',
        tag: 'Inbound Telephony',
        metricLabel: 'Missed Leads',
        metricValue: '0%',
        highlights: 'AI-driven voice responses & appointment booking\nInstant transcriptions & automated CRM summaries\n24/7 lead qualification & routing',
        order: 4,
      },
      {
        title: 'Instagram Comment → DM',
        description: 'Auto-reply to post/reel comments instantly and trigger private DM sequences with special discount links.',
        icon: 'Sparkles',
        category: 'capability',
        tag: 'Social Growth',
        metricLabel: 'Conversion Lift',
        metricValue: '3.8x',
        highlights: 'Instant keyword-based replies on feed & reels\nImmediate private DM dispatch with checkout links\nAutomated lead magnet delivery',
        order: 5,
      },
      {
        title: 'WhatsApp Meta Template Engine',
        description: 'Design, preview, test, and submit rich WhatsApp templates directly to Meta for rapid compliance approval.',
        icon: 'FileText',
        category: 'capability',
        tag: 'Meta Broadcasts',
        metricLabel: 'Approval Speed',
        metricValue: '< 24 Hrs',
        highlights: 'Rich media templates with CTA buttons & carousels\n1-click direct Meta Graph API submission\nScheduled bulk promotional broadcasts with analytics',
        order: 6,
      },
    ],
    pricingTiers: [
      {
        name: 'Starter Inbox',
        price: '$149',
        billingPeriod: 'monthly',
        tagline: 'For growing brands looking to automate WhatsApp & Instagram.',
        badge: 'Single Brand',
        isFeatured: false,
        ctaLabel: 'Get Started Starter',
        ctaLink: '/contact',
        order: 1,
        features: [
          { text: 'Up to 5,000 Monthly Active Contacts', included: true },
          { text: '2 Connected Channels (WhatsApp & Instagram)', included: true },
          { text: 'Shared Team Inbox for 3 Agent Seats', included: true },
          { text: 'No-Code Automation Builder', included: true },
          { text: 'Meta Template Submission Engine', included: true },
          { text: 'Standard Email & Chat Support', included: true },
        ],
      },
      {
        name: 'Growth Automation',
        price: '$399',
        billingPeriod: 'monthly',
        tagline: 'Comprehensive suite for scaling retail & e-commerce operations.',
        badge: 'Most Popular Choice',
        isFeatured: true,
        ctaLabel: 'Request Demo & Quote',
        ctaLink: '/contact',
        order: 2,
        features: [
          { text: 'Up to 25,000 Monthly Active Contacts', included: true },
          { text: 'All 4 Connected Channels Included', included: true },
          { text: 'Shared Team Inbox for 10 Agent Seats', included: true },
          { text: 'Autonomous Gemini AI Chatbot Integration', included: true },
          { text: 'Instagram Comment-to-DM Automation', included: true },
          { text: 'Shopify & CRM API Webhooks', included: true },
          { text: '24/7 Priority WhatsApp Support', included: true },
        ],
      },
      {
        name: 'Enterprise Scale',
        price: 'Custom',
        billingPeriod: 'custom',
        tagline: 'Custom high-volume broadcasting & dedicated throughput.',
        badge: 'Enterprise Volume',
        isFeatured: false,
        ctaLabel: 'Contact Enterprise Sales',
        ctaLink: '/contact',
        order: 3,
        features: [
          { text: 'Unlimited Monthly Active Contacts', included: true },
          { text: 'Unlimited Agent Seats & Department Queues', included: true },
          { text: 'Dedicated WhatsApp API High-Throughput Node', included: true },
          { text: 'Custom LLM Fine-Tuning & Knowledge Base', included: true },
          { text: 'Dedicated Account Manager & 99.9% SLA', included: true },
          { text: 'Custom On-Premise / Isolated Cloud Deploy', included: true },
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does Meta WhatsApp Business API approval take?',
        answer: 'With OmniChat, official Meta WhatsApp Business API approval typically takes between 24 and 48 hours. We handle business verification and number porting directly.',
        order: 1,
      },
      {
        question: 'How do we train the AI chatbot on our company data?',
        answer: 'Simply paste your website URL or upload PDF product manuals. OmniChat automatically indexes your documents using vector embeddings and starts answering questions immediately.',
        order: 2,
      },
      {
        question: 'Can human support agents intervene during an AI conversation?',
        answer: 'Yes! Human agents can monitor live AI conversations in the shared inbox and jump in at any time with a single click. The AI immediately pauses and hands over control.',
        order: 3,
      },
    ],
    kpiStats: [
      { icon: 'Sparkles', title: 'Open Rate', value: '98%', description: 'Average WhatsApp message read and engagement rate' },
      { icon: 'Zap', title: 'Conversion Lift', value: '3.8x', description: 'Increase in DMs generated from Instagram comments' },
      { icon: 'Headphones', title: 'Lead Capture', value: '24/7', description: 'Autonomous round-the-clock lead qualification' },
    ],
    primaryCta: { label: 'Start Free Trial', link: '/contact', style: 'primary' },
    secondaryCta: { label: 'View Integrations', link: '#channels', style: 'secondary' },
    seo: {
      metaTitle: 'OmniChat AI | Multi-Channel Customer Engagement Platform',
      metaDescription: 'Automate WhatsApp, Instagram, Messenger, and Telegram with Gemini-powered AI chatbots and visual automation flows.',
    },
  },
];

const PRODUCT_PAGE_SEED_DATA = {
  heroBadge: 'ENTERPRISE SOFTWARE SUITE',
  heroHeadline: 'Enterprise Software Engineered for Hyper-Scale & Operational Flow.',
  heroSubheadline: 'Explore our purpose-built product ecosystem — combining mission-critical campus management with autonomous conversational AI to power institutional and commercial growth.',
  trustBadges: [
    {
      icon: 'ShieldCheck',
      title: 'SOC 2 Type II Certified',
      value: '100% Compliant',
      description: 'Annual third-party audited security controls and rigorous data isolation policies.',
    },
    {
      icon: 'Lock',
      title: 'ISO 27001 & GDPR Aligned',
      value: 'Zero-Trust',
      description: 'End-to-end data residency, encrypted backups, and granular role-based access control.',
    },
    {
      icon: 'Activity',
      title: 'High-Availability SLA',
      value: '99.99% Uptime',
      description: 'Multi-region failover architecture with active load balancing and automated rollback.',
    },
    {
      icon: 'Cpu',
      title: 'Encrypted at Rest & In-Transit',
      value: 'AES-256 / TLS 1.3',
      description: 'Bank-grade cryptographic standards applied to all database records and API streams.',
    },
  ],
  seo: {
    metaTitle: 'Products Ecosystem | Aprogra Enterprise Software',
    metaDescription: 'Explore Aprogra School ERP and OmniChat AI — purpose-built platforms engineered for operational speed, reliability, and growth.',
  },
};

function createImageBlock(url: string, caption: string) {
  return {
    type: 'image',
    image: {
      name: 'illustration.jpg',
      alternativeText: caption,
      caption: caption,
      url: url,
      width: 1000,
      height: 600,
      hash: 'img_' + Math.random().toString(36).substring(2, 9),
      ext: '.jpg',
      mime: 'image/jpeg',
      size: 150.0,
      provider: 'local',
      createdAt: '2026-08-23T00:00:00.000Z',
      updatedAt: '2026-08-23T00:00:00.000Z',
    },
    children: [{ type: 'text', text: '' }],
  };
}

const BLOG_POSTS_SEED_DATA = [
  {
    title: 'Building Production Agentic AI Workflows with TypeScript & Gemini 1.5',
    slug: 'agentic-ai-workflows',
    excerpt:
      'How we architect autonomous agentic pipelines that run function calling, multi-step orchestration, and real-time state synchronization with sub-second latency.',
    category: 'AI & Automation',
    publishedDate: 'Aug 8, 2026',
    readTime: '6 min read',
    featured: true,
    authorName: 'Alex Rivera',
    authorRole: 'Principal AI Architect',
    likesCount: 38,
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
      },
      createImageBlock(
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&auto=format&fit=crop&q=80',
        'Figure 1: Decoupled Multi-Agent Decision Engine and Tool Bus Topology'
      ),
      {
        type: 'quote',
        children: [
          {
            type: 'text',
            text: 'Decoupling reasoning from execution guarantees deterministic retries, strict token budgets, and complete audit trails across high-volume enterprise pipelines.'
          }
        ]
      },
      {
        type: 'heading',
        level: 3,
        children: [
          {
            type: 'text',
            text: 'Key Tenets for Production Reliability'
          }
        ]
      },
      {
        type: 'list',
        format: 'unordered',
        children: [
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Typed Tool Declarations: Strict JSON schema contracts preventing parameter hallucinations.' }]
          },
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Memory Summarization: Incremental context compression preserving token budget across 50+ turns.' }]
          },
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Dynamic Backoff & Self-Healing: Automated prompt correction when tool errors occur.' }]
          }
        ]
      },
      {
        type: 'heading',
        level: 3,
        children: [
          {
            type: 'text',
            text: 'TypeScript Agent Dispatcher Example'
          }
        ]
      },
      {
        type: 'code',
        children: [
          {
            type: 'text',
            text: `import { GoogleGenAI } from '@google/genai';

export async function executeAgentWorkflow(userTask: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-pro',
    contents: [{ role: 'user', parts: [{ text: userTask }] }],
    config: {
      tools: [{ functionDeclarations: [queryDatabaseTool, dispatchWebhookTool] }]
    }
  });
  return response;
}`
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'By adhering to deterministic schema boundaries and client-side guards, you can build enterprise-grade agentic features that scale predictably without operational surprises.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Building Production Agentic AI Workflows | Aprogra',
      metaDescription: 'Architecting resilient autonomous agentic workflows with TypeScript, function calling, and Gemini 1.5.'
    }
  },
  {
    title: 'Designing Zero-Downtime Microservices on Kubernetes & GitOps',
    slug: 'zero-downtime-kubernetes',
    excerpt:
      'How to engineer resilient cloud infrastructures using self-healing Kubernetes clusters, ArgoCD automated canary deployments, and zero-trust Istio service meshes.',
    category: 'Cloud & DevOps',
    publishedDate: 'Aug 5, 2026',
    readTime: '8 min read',
    featured: false,
    authorName: 'Elena Rostova',
    authorRole: 'Staff Infrastructure Engineer',
    likesCount: 29,
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'In high-throughput microservice ecosystems, deploying code without interrupting ongoing client connections requires tight coordination between edge load balancers, container orchestration, and stateful databases.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Canary Deployments with Argo Rollouts'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Traditional rolling updates cannot detect subtle error spikes or memory leaks before replacing 100% of pods. With Argo Rollouts and Prometheus metrics analysis, traffic is shifted incrementally (5% -> 20% -> 50% -> 100%) while verifying error rate thresholds.'
          }
        ]
      },
      createImageBlock(
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&auto=format&fit=crop&q=80',
        'Figure 2: Multi-Region Ingress Controller and Canary Traffic Split'
      ),
      {
        type: 'quote',
        children: [
          {
            type: 'text',
            text: 'Automated rollbacks based on P99 latency and error budgets eliminate manual on-call firefighting during deployment windows.'
          }
        ]
      },
      {
        type: 'heading',
        level: 3,
        children: [
          {
            type: 'text',
            text: 'Zero-Downtime Deployment Checklist'
          }
        ]
      },
      {
        type: 'list',
        format: 'unordered',
        children: [
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Graceful Shutdown (SIGTERM Handling): Allow pods 30s to finish active inflight HTTP/gRPC requests.' }]
          },
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Readiness Probe Configuration: Guard traffic until internal connection pools and caches are warm.' }]
          },
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Database Schema Migrations: Follow expand/contract schema evolution to support dual versions concurrently.' }]
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Investing in automated progressive delivery transforms deployments from high-stress late-night events into routine, autonomous background processes.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Zero-Downtime Microservices on Kubernetes | Aprogra',
      metaDescription: 'Deploying high-resilience Kubernetes applications with ArgoCD and progressive canary rollouts.'
    }
  },
  {
    title: 'Next-Gen School Campus Architecture: RFID Biometrics & Real-Time GPS Sync',
    slug: 'school-erp-telemetry-architecture',
    excerpt:
      'Case study on how Aprogra School ERP processes tens of thousands of daily turnstile taps, live vehicle telemetry feeds, and instant parent notifications with <2s latency.',
    category: 'Case Studies',
    publishedDate: 'Aug 1, 2026',
    readTime: '7 min read',
    featured: false,
    authorName: 'Marcus Vance',
    authorRole: 'Lead Solutions Architect',
    likesCount: 45,
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Managing campus safety across thousands of students requires instantaneous hardware integration. Every morning between 7:30 AM and 8:30 AM, our turnstile gates handle over 20,000 biometric and RFID swipe events across 12 branch locations.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Hardware Edge Ingestion with MQTT & WebSockets'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Rather than polling central servers, physical gate controllers communicate via lightweight MQTT protocols with local edge micro-gateways. An offline SQLite buffer ensures turnstiles open in under 200 milliseconds even during broadband outages.'
          }
        ]
      },
      createImageBlock(
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80',
        'Figure 3: Real-Time Fleet Radar and Geofenced Arrival Alert Dispatcher'
      ),
      {
        type: 'quote',
        children: [
          {
            type: 'text',
            text: 'Parents receive push notifications and WhatsApp messages within 1.8 seconds of their child passing the campus security perimeter.'
          }
        ]
      },
      {
        type: 'heading',
        level: 3,
        children: [
          {
            type: 'text',
            text: 'Core Operational Benefits'
          }
        ]
      },
      {
        type: 'list',
        format: 'unordered',
        children: [
          {
            type: 'list-item',
            children: [{ type: 'text', text: '99.8% Biometric and RFID hardware uptime with zero morning attendance bottlenecks.' }]
          },
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Automated WhatsApp absence alerts eliminating thousands of daily manual phone calls.' }]
          },
          {
            type: 'list-item',
            children: [{ type: 'text', text: 'Live GPS route telemetry with geofenced 5-minute parent pickup warnings.' }]
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Campus Telemetry & RFID Architecture | Aprogra',
      metaDescription: 'Scalable IoT attendance and vehicle tracking architecture for modern school groups.'
    }
  },
  {
    title: 'Multi-Channel Conversational AI: Scaling WhatsApp & Instagram Meta Graph',
    slug: 'scaling-omnichannel-ai-chatbots',
    excerpt:
      'Engineering the OmniChat platform to ingest thousands of concurrent WhatsApp, Instagram DM, and Messenger threads with zero response delay and seamless agent takeover.',
    category: 'AI & Automation',
    publishedDate: 'Jul 28, 2026',
    readTime: '5 min read',
    featured: false,
    authorName: 'Priya Patel',
    authorRole: 'Senior Full-Stack Engineer',
    likesCount: 52,
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Social commerce and instant messaging have replaced traditional web contact forms. When an Instagram Reel goes viral, brands receive thousands of comment inquiries within minutes. Converting these interactions into revenue demands instant automated fulfillment.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Comment-to-DM Trigger Engine'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'OmniChat connects directly to the Meta Webhook stream. When a keyword like "PRICE" or "DEMO" is detected on an Instagram post or reel, our queue dispatcher immediately triggers a personalized private DM with checkout links and product catalogs.'
          }
        ]
      },
      createImageBlock(
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&auto=format&fit=crop&q=80',
        'Figure 4: Unified Multi-Agent Shared Inbox and Human Escalation Queue'
      ),
      {
        type: 'quote',
        children: [
          {
            type: 'text',
            text: 'Automated comment-to-DM triggers boost direct social conversion rates by 3.8x compared to standard bio link redirections.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'With vector-embedded knowledge bases and real-time human agent monitoring, companies maintain 24/7 lead qualification while preserving high-touch customer relationships.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Scaling WhatsApp & Instagram AI | Aprogra',
      metaDescription: 'Handling viral social customer inquiries with automated Meta Graph triggers and AI agents.'
    }
  },
  {
    title: 'Design Systems at Scale: Bridging Figma Tokens to Tailored Tailwind CSS',
    slug: 'design-systems-tokens-tailwind',
    excerpt:
      'A practical guide to synchronizing typography, color palettes, motion easing curves, and dark mode tokens across multidisciplinary design and engineering teams.',
    category: 'Product & Design',
    publishedDate: 'Jul 22, 2026',
    readTime: '6 min read',
    featured: false,
    authorName: 'Jordan Lee',
    authorRole: 'Staff Product Designer',
    likesCount: 31,
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Design tokens are the atomic DNA of any scalable enterprise application. Without automated token synchronization, engineering teams constantly battle color drift, inconsistent spacing units, and diverging component variants.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Automated Token Pipelines via Style Dictionary'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'We export design tokens directly from Figma using GitHub Actions. The pipeline compiles W3C Design Token JSON into CSS custom properties and typed Tailwind v4 themes, guaranteeing 100% visual consistency between design files and production builds.'
          }
        ]
      },
      createImageBlock(
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&auto=format&fit=crop&q=80',
        'Figure 5: Design Token Synchronizer from Figma Variables to Production CSS Variables'
      ),
      {
        type: 'quote',
        children: [
          {
            type: 'text',
            text: 'When design tokens are treated as code, updating global brand aesthetics across 500+ components takes seconds instead of sprints.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Modern web platforms achieve true craftsmanship when engineering and design collaborate around a shared, immutable vocabulary.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Design Systems at Scale with Tailwind | Aprogra',
      metaDescription: 'Automated Figma design token compilation for enterprise design systems.'
    }
  },
  {
    title: 'High-Throughput Edge Databases & Reactive Real-Time State Management',
    slug: 'high-throughput-edge-databases',
    excerpt:
      'Deep dive into SQLite at the edge, LibSQL replication, Zustand stores, and optimistic UI updates for hyper-responsive enterprise applications.',
    category: 'Engineering & Architecture',
    publishedDate: 'Jul 15, 2026',
    readTime: '7 min read',
    featured: false,
    authorName: 'David Chen',
    authorRole: 'VP of Engineering',
    likesCount: 42,
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Traditional centralized databases introduce latency hurdles for globally distributed users. By placing read replicas at edge points of presence (PoPs) alongside optimistic client-side state engines, web applications achieve instant UI response times.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Optimistic UI Updates with Zustand'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'By pairing local state transitions with background API sync, user actions (e.g. status changes, filters, live diagram edits) render with 0ms visual latency while reconciliation happens asynchronously.'
          }
        ]
      },
      createImageBlock(
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80',
        'Figure 6: Global Edge Replication and Reactive Local Cache Pipeline'
      ),
      {
        type: 'quote',
        children: [
          {
            type: 'text',
            text: 'Sub-millisecond read access at the edge empowers applications to feel physical and tactile rather than sluggish.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Embracing distributed SQLite and optimistic state architectures bridges the gap between web applications and native desktop responsiveness.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Edge Databases & Real-Time State | Aprogra',
      metaDescription: 'Sub-millisecond latency architectures using distributed edge databases and optimistic UI updates.'
    }
  }
];

const ABOUT_PAGE_SEED_DATA = {
  hero: {
    badgeText: 'Full-Stack Engineering & AI Studio',
    headline: 'Architecting the Future of High-Scale Software & Autonomous Intelligence',
    subheadline:
      'We combine senior-only engineering pods with proprietary SaaS engines to build mission-critical web platforms, AI agents, and enterprise design systems for ambitious global businesses.',
    primaryCtaLabel: 'Start Your Brief',
    primaryCtaUrl: '/contact',
    secondaryCtaLabel: 'Explore Our Story',
    secondaryCtaUrl: '#story',
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
      { title: 'In-House Engineers', value: '100%' },
      { title: 'Clutch / G2 Rating', value: '4.9★' },
      { title: 'Avg API Latency', value: '<100ms' },
      { title: 'Production SLA', value: '99.98%' },
    ],
  },
  panelWhoWeAre: {
    badge: 'Who We Are',
    headline: 'Not just another dev shop.',
    description:
      'AProgra was built on a single belief — that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.',
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
  },
  panelVision: {
    badge: '2030 Vision',
    headline: 'Empowering the next generation of digital empires.',
    description:
      'We envision a world where ambitious software ventures scale frictionlessly from idea to global impact, powered by autonomous multi-agent engineering pods and mathematically sound design systems.',
    visionBadgeYear: '2030 Vision',
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
  seo: {
    metaTitle: 'About AProgra — Engineering & AI Studio',
    metaDescription:
      'Meet the engineers and architects behind AProgra. 100% in-house software engineering based in Hyderabad serving clients across 12+ countries.',
  },
};

const TEAM_MEMBERS_SEED_DATA = [
  {
    name: 'Alexandre Vane',
    role: 'Founder & Chief Architect',
    bio: 'Ex-Google Staff Architect with 12+ years building distributed cloud platforms & high-throughput APIs.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
    skills: 'Cloud Arch, Distributed Systems, Rust & Go',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 1,
  },
  {
    name: 'Isabella Chen',
    role: 'Head of Product & Design',
    bio: 'Pioneer in motion graphics & spatial UI design. Transformed digital products for 30+ enterprise firms.',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop',
    skills: 'Design Systems, Motion Graphics, UX Strategy',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 2,
  },
  {
    name: 'Sophia Thorne',
    role: 'Director of AI Research',
    bio: 'Specializing in custom LLM fine-tuning, autonomous agentic workflows, and edge neural deployments.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    skills: 'LLMs & RAG, Machine Learning, Autonomous Agents',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 3,
  },
  {
    name: 'Mia Rostova',
    role: 'Lead Full-Stack Engineer',
    bio: 'Polyglot software leader specializing in React 19, TypeScript, WebAudio, and frontend state engines.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    skills: 'React / Next.js, TypeScript, State Engines',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 4,
  },
  {
    name: 'Charlotte Vance',
    role: 'Principal Infrastructure Lead',
    bio: 'Cloud-native infrastructure specialist building zero-downtime multi-region Kubernetes deployments.',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
    skills: 'Kubernetes, AWS / GCP, Terraform',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://twitter.com',
    order: 5,
  },
];

const ABOUT_FAQS_SEED_DATA = [
  {
    question: 'How is AProgra different from a typical software agency?',
    answer: 'Most agencies outsource or use freelancers for parts of your project. At AProgra, every single person who touches your product is on our in-house team. No handoffs to strangers. No quality loss in translation. You get one point of contact and a team that treats your product like their own.',
    category: 'Company & Team',
    order: 1,
  },
  {
    question: 'What types of projects do you take on?',
    answer: 'We work on product engineering (web, mobile, SaaS), AI and automation systems, UI/UX design, and cloud infrastructure. From early-stage MVPs to scaling enterprise platforms — if it involves building software, we can help.',
    category: 'Capabilities',
    order: 2,
  },
  {
    question: 'How long does it take to start a project?',
    answer: 'After an initial discovery call, we typically scope and onboard within 1–2 weeks. For urgent projects, we’ve started within days. We don’t believe in unnecessary delays.',
    category: 'Engagement',
    order: 3,
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely. We’ve partnered with clients across 12 countries including the US, UK, UAE, Singapore, and Australia. We work async-first and adapt to your timezone for key meetings.',
    category: 'Global Delivery',
    order: 4,
  },
  {
    question: 'What does your development process look like?',
    answer: 'We follow an iterative, milestone-driven approach: Discovery → Design → Build → Test → Launch → Support. You’re involved at every stage with regular demos, Slack updates, and transparent timelines.',
    category: 'Process',
    order: 5,
  },
  {
    question: 'Can you take over an existing project or codebase?',
    answer: 'Yes — and we do it often. We conduct a thorough code audit first, document what we find, then propose a clear path forward. We’ve rescued several projects that were over-budget and behind schedule.',
    category: 'Engineering',
    order: 6,
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer project-based pricing for fixed-scope work and monthly retainers for ongoing development. We’ll share a detailed quote after a discovery call. We believe in transparent pricing — no hidden fees, no scope creep surprises.',
    category: 'Commercial',
    order: 7,
  },
  {
    question: 'How do we get started?',
    answer: 'Simply fill out the contact form on this page or email us at hello@aprogra.com. We’ll schedule a discovery call within 24 hours, understand your project, and come back with a clear proposal.',
    category: 'Onboarding',
    order: 8,
  },
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // 1. Grant public permissions for Contact, Inquiry, Blog, and Services
      const strapiAny = strapi as any;
      const publicRole = await strapiAny
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const requiredPermissions = [
          { action: 'api::contact-page.contact-page.find' },
          { action: 'api::contact-channel.contact-channel.find' },
          { action: 'api::contact-channel.contact-channel.findOne' },
          { action: 'api::inquiry.inquiry.create' },
          { action: 'api::blog-page.blog-page.find' },
          { action: 'api::blog-post.blog-post.find' },
          { action: 'api::blog-post.blog-post.findOne' },
          { action: 'api::services-page.services-page.find' },
          { action: 'api::service.service.find' },
          { action: 'api::service.service.findOne' },
          { action: 'api::product-page.product-page.find' },
          { action: 'api::product.product.find' },
          { action: 'api::product.product.findOne' },
          { action: 'api::testimonial.testimonial.find' },
          { action: 'api::testimonial.testimonial.findOne' },
          { action: 'api::about-page.about-page.find' },
          { action: 'api::team-member.team-member.find' },
          { action: 'api::team-member.team-member.findOne' },
          { action: 'api::about-faq.about-faq.find' },
          { action: 'api::about-faq.about-faq.findOne' },
        ];

        for (const reqPerm of requiredPermissions) {
          const existing = await strapiAny
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                role: publicRole.id,
                action: reqPerm.action,
              },
            });

          if (!existing) {
            await strapiAny.query('plugin::users-permissions.permission').create({
              data: {
                action: reqPerm.action,
                role: publicRole.id,
              },
            });
            strapi.log.info(`[Bootstrap] Granted public permission: ${reqPerm.action}`);
          }
        }
      }

      // 2. Seed / Update Contact Page Single Type data
      const existingContactPage = await strapiAny.documents('api::contact-page.contact-page').findFirst();
      if (!existingContactPage) {
        await strapiAny.documents('api::contact-page.contact-page').create({
          data: STRUCTURED_CONTACT_PAGE_SEED_DATA,
        });
        strapi.log.info('[Bootstrap] Initialized structured Contact Page content in Strapi.');
      } else {
        await strapiAny.documents('api::contact-page.contact-page').update({
          documentId: existingContactPage.documentId,
          data: STRUCTURED_CONTACT_PAGE_SEED_DATA,
        });
        strapi.log.info('[Bootstrap] Synchronized structured Contact Page fields in Strapi.');
      }

      // 2b. Seed / Upsert Contact Channels Collection Type data
      for (const channelData of CONTACT_CHANNELS_SEED_DATA) {
        try {
          const existingChannel = await strapiAny.documents('api::contact-channel.contact-channel').findFirst({
            filters: { label: channelData.label },
          });

          if (!existingChannel) {
            await strapiAny.documents('api::contact-channel.contact-channel').create({
              data: channelData,
            });
            strapi.log.info(`[Bootstrap] Created contact channel: ${channelData.label}`);
          } else {
            await strapiAny.documents('api::contact-channel.contact-channel').update({
              documentId: existingChannel.documentId,
              data: channelData,
            });
            strapi.log.info(`[Bootstrap] Updated contact channel: ${channelData.label}`);
          }
        } catch (channelErr) {
          strapi.log.warn(`[Bootstrap] Error seeding contact channel "${channelData.label}":`, channelErr);
        }
      }


      // 3. Seed / Update Blog Page Single Type data
      const existingBlogPage = await strapiAny.documents('api::blog-page.blog-page').findFirst();
      if (!existingBlogPage) {
        await strapiAny.documents('api::blog-page.blog-page').create({
          data: BLOG_PAGE_SEED_DATA,
        });
        strapi.log.info('[Bootstrap] Initialized Blog Page configuration in Strapi.');
      } else {
        await strapiAny.documents('api::blog-page.blog-page').update({
          documentId: existingBlogPage.documentId,
          data: BLOG_PAGE_SEED_DATA,
        });
        strapi.log.info('[Bootstrap] Synchronized all Blog Page fields in Strapi.');
      }

      // 4. Seed / Upsert Blog Posts Collection Type data by slug
      const validBlogSlugs = BLOG_POSTS_SEED_DATA.map(p => p.slug);
      try {
        const allExistingPosts = await strapiAny.documents('api::blog-post.blog-post').findMany();
        if (Array.isArray(allExistingPosts)) {
          for (const p of allExistingPosts) {
            if (!validBlogSlugs.includes(p.slug)) {
              await strapiAny.documents('api::blog-post.blog-post').delete({
                documentId: p.documentId,
              });
              strapi.log.info(`[Bootstrap] Removed legacy blog post: ${p.title} (${p.slug})`);
            }
          }
        }
      } catch (cleanErr) {
        strapi.log.warn('[Bootstrap] Could not clean legacy blog posts:', cleanErr);
      }

      for (const postData of BLOG_POSTS_SEED_DATA) {
        try {
          const existingPost = await strapiAny.documents('api::blog-post.blog-post').findFirst({
            filters: { slug: postData.slug },
          });

          if (!existingPost) {
            await strapiAny.documents('api::blog-post.blog-post').create({
              data: postData,
            });
            strapi.log.info(`[Bootstrap] Created blog post: ${postData.title}`);
          } else {
            await strapiAny.documents('api::blog-post.blog-post').update({
              documentId: existingPost.documentId,
              data: postData,
            });
            strapi.log.info(`[Bootstrap] Updated blog post: ${postData.title}`);
          }
        } catch (postErr: any) {
          strapi.log.warn(`[Bootstrap] Error seeding post "${postData.title}": ${postErr?.message || postErr}`);
          if (postErr?.details) {
            strapi.log.warn(`[Bootstrap] Error details for "${postData.title}": ${JSON.stringify(postErr.details, null, 2)}`);
          }
        }
      }

      // 5. Seed / Update Services Page Single Type
      const existingServicesPage = await strapiAny.documents('api::services-page.services-page').findFirst();
      if (!existingServicesPage) {
        await strapiAny.documents('api::services-page.services-page').create({
          data: SERVICES_PAGE_SEED_DATA,
        });
        strapi.log.info('[Bootstrap] Initialized Services Page content in Strapi.');
      } else {
        await strapiAny.documents('api::services-page.services-page').update({
          documentId: existingServicesPage.documentId,
          data: SERVICES_PAGE_SEED_DATA,
        });
        strapi.log.info('[Bootstrap] Synchronized Services Page fields in Strapi.');
      }

      // 6. Seed / Upsert Services Collection Type data by slug
      for (const serviceData of SERVICES_COLLECTION_SEED_DATA) {
        try {
          const existingService = await strapiAny.documents('api::service.service').findFirst({
            filters: { slug: serviceData.slug },
          });

          if (!existingService) {
            await strapiAny.documents('api::service.service').create({
              data: serviceData,
            });
            strapi.log.info(`[Bootstrap] Created service: ${serviceData.title}`);
          } else {
            await strapiAny.documents('api::service.service').update({
              documentId: existingService.documentId,
              data: serviceData,
            });
            strapi.log.info(`[Bootstrap] Updated service: ${serviceData.title}`);
          }
        } catch (serviceErr) {
          strapi.log.warn(`[Bootstrap] Error seeding service "${serviceData.title}":`, serviceErr);
        }
      }

      // 7. Seed / Upsert Testimonials
      const seededReviewDocIds: string[] = [];
      for (const testimonialData of TESTIMONIALS_SEED_DATA) {
        try {
          const existing = await strapiAny.documents('api::testimonial.testimonial').findFirst({
            filters: { authorName: testimonialData.authorName },
          });

          if (!existing) {
            const created = await strapiAny.documents('api::testimonial.testimonial').create({
              data: testimonialData,
            });
            seededReviewDocIds.push(created.documentId);
            strapi.log.info(`[Bootstrap] Created testimonial: ${testimonialData.authorName}`);
          } else {
            const updated = await strapiAny.documents('api::testimonial.testimonial').update({
              documentId: existing.documentId,
              data: testimonialData,
            });
            seededReviewDocIds.push(updated.documentId);
            strapi.log.info(`[Bootstrap] Updated testimonial: ${testimonialData.authorName}`);
          }
        } catch (testimonialErr) {
          strapi.log.warn(`[Bootstrap] Error seeding testimonial "${testimonialData.authorName}":`, testimonialErr);
        }
      }

      // 8. Seed / Upsert Products Collection Type (School ERP & OmniChat)
      const seededProductDocIds: string[] = [];
      for (const prodData of PRODUCTS_SEED_DATA) {
        try {
          const existingProd = await strapiAny.documents('api::product.product').findFirst({
            filters: { slug: prodData.slug },
          });

          if (!existingProd) {
            const createdProd = await strapiAny.documents('api::product.product').create({
              data: {
                ...prodData,
                relatedTestimonials: seededReviewDocIds,
              },
            });
            seededProductDocIds.push(createdProd.documentId);
            strapi.log.info(`[Bootstrap] Created product: ${prodData.name} (slug: ${prodData.slug})`);
          } else {
            const updatedProd = await strapiAny.documents('api::product.product').update({
              documentId: existingProd.documentId,
              data: {
                ...prodData,
                relatedTestimonials: seededReviewDocIds,
              },
            });
            seededProductDocIds.push(updatedProd.documentId);
            strapi.log.info(`[Bootstrap] Synchronized product: ${prodData.name} (slug: ${prodData.slug})`);
          }
        } catch (prodErr) {
          strapi.log.warn(`[Bootstrap] Error seeding product "${prodData.name}":`, prodErr);
        }
      }

      // 9. Seed / Update Products Hub Single Type (product-page)
      const existingProductPage = await strapiAny.documents('api::product-page.product-page').findFirst();
      const productPagePayload = {
        ...PRODUCT_PAGE_SEED_DATA,
        heroSwitcherProducts: seededProductDocIds,
        featuredTestimonials: seededReviewDocIds,
      };

      if (!existingProductPage) {
        await strapiAny.documents('api::product-page.product-page').create({
          data: productPagePayload,
        });
        strapi.log.info('[Bootstrap] Initialized Products Hub Page content in Strapi.');
      } else {
        await strapiAny.documents('api::product-page.product-page').update({
          documentId: existingProductPage.documentId,
          data: productPagePayload,
        });
        strapi.log.info('[Bootstrap] Synchronized Products Hub Page fields in Strapi.');
      }

      // 10. Seed / Upsert Blog Posts (Doc Editor / Strapi Blocks AST)
      for (const postData of BLOG_POSTS_SEED_DATA) {
        try {
          const existingPost = await strapiAny.documents('api::blog-post.blog-post').findFirst({
            filters: { slug: postData.slug },
          });

          if (!existingPost) {
            await strapiAny.documents('api::blog-post.blog-post').create({
              data: postData,
            });
            strapi.log.info(`[Bootstrap] Created blog post: ${postData.title} (slug: ${postData.slug})`);
          } else {
            await strapiAny.documents('api::blog-post.blog-post').update({
              documentId: existingPost.documentId,
              data: postData,
            });
            strapi.log.info(`[Bootstrap] Synchronized blog post: ${postData.title} (slug: ${postData.slug})`);
          }
        } catch (postErr) {
          strapi.log.warn(`[Bootstrap] Error seeding blog post "${postData.title}":`, postErr);
        }
      }

      // 11. Seed / Update About Page Single Type
      try {
        const existingAboutPage = await strapiAny.documents('api::about-page.about-page').findFirst();
        if (!existingAboutPage) {
          await strapiAny.documents('api::about-page.about-page').create({
            data: ABOUT_PAGE_SEED_DATA,
          });
          strapi.log.info('[Bootstrap] Initialized structured About Page content in Strapi.');
        } else {
          await strapiAny.documents('api::about-page.about-page').update({
            documentId: existingAboutPage.documentId,
            data: ABOUT_PAGE_SEED_DATA,
          });
          strapi.log.info('[Bootstrap] Synchronized structured About Page fields in Strapi.');
        }
      } catch (aboutPageErr: any) {
        strapi.log.warn('[Bootstrap] Error seeding About Page:', aboutPageErr?.message || aboutPageErr);
        if (aboutPageErr?.details) {
          strapi.log.warn('[Bootstrap] Details for About Page:', JSON.stringify(aboutPageErr.details, null, 2));
        }
      }

      // 12. Seed / Upsert Team Members Collection Type
      for (const memberData of TEAM_MEMBERS_SEED_DATA) {
        try {
          const existingMember = await strapiAny.documents('api::team-member.team-member').findFirst({
            filters: { name: memberData.name },
          });

          if (!existingMember) {
            await strapiAny.documents('api::team-member.team-member').create({
              data: memberData,
            });
            strapi.log.info(`[Bootstrap] Created team member: ${memberData.name}`);
          } else {
            await strapiAny.documents('api::team-member.team-member').update({
              documentId: existingMember.documentId,
              data: memberData,
            });
            strapi.log.info(`[Bootstrap] Synchronized team member: ${memberData.name}`);
          }
        } catch (memberErr) {
          strapi.log.warn(`[Bootstrap] Error seeding team member "${memberData.name}":`, memberErr);
        }
      }

      // 13. Seed / Upsert About FAQs Collection Type
      for (const faqData of ABOUT_FAQS_SEED_DATA) {
        try {
          const existingFaq = await strapiAny.documents('api::about-faq.about-faq').findFirst({
            filters: { question: faqData.question },
          });

          if (!existingFaq) {
            await strapiAny.documents('api::about-faq.about-faq').create({
              data: faqData,
            });
            strapi.log.info(`[Bootstrap] Created about FAQ: ${faqData.question}`);
          } else {
            await strapiAny.documents('api::about-faq.about-faq').update({
              documentId: existingFaq.documentId,
              data: faqData,
            });
            strapi.log.info(`[Bootstrap] Synchronized about FAQ: ${faqData.question}`);
          }
        } catch (faqErr) {
          strapi.log.warn(`[Bootstrap] Error seeding about FAQ "${faqData.question}":`, faqErr);
        }
      }
    } catch (err) {
      strapi.log.warn('[Bootstrap] Auto-setup encountered an error:', err);
    }
  },
};
