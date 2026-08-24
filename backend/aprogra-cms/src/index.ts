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
  // Row 1 (Moving Left -> Right)
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

  // Row 2 (Moving Right -> Left)
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

      // 1. Initialize or sync Global Config Single Type
      const existingConfig = await strapiAny.documents('api::global-config.global-config').findFirst();
      if (!existingConfig) {
        await strapiAny.documents('api::global-config.global-config').create({
          data: DEFAULT_GLOBAL_CONFIG_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Header & Footer Global Configuration in Strapi.');
      }

      // 2. Initialize or sync Blog Categories
      for (const cat of DEFAULT_CATEGORIES_SEED_DATA) {
        const existingCat = await strapiAny.documents('api::category.category').findFirst({
          filters: { slug: cat.slug },
        });
        if (!existingCat) {
          await strapiAny.documents('api::category.category').create({
            data: cat,
            status: 'published',
          });
          strapi.log.info(`[Bootstrap] Created Blog Category: ${cat.name}`);
        }
      }

      // 3. Initialize or sync Blog Page Single Type
      const existingBlogPage = await strapiAny.documents('api::blog-page.blog-page').findFirst();
      if (!existingBlogPage) {
        await strapiAny.documents('api::blog-page.blog-page').create({
          data: DEFAULT_BLOG_PAGE_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Blog Page Settings in Strapi.');
      }

      // 4. Initialize or sync Blog Posts
      for (const post of DEFAULT_BLOG_POSTS_SEED_DATA) {
        const existingPost = await strapiAny.documents('api::blog-post.blog-post').findFirst({
          filters: { slug: post.slug },
        });
        if (!existingPost) {
          await strapiAny.documents('api::blog-post.blog-post').create({
            data: post,
            status: 'published',
          });
          strapi.log.info(`[Bootstrap] Created Blog Post: "${post.title}" (featured: ${post.featured})`);
        }
      }

      // 5. Initialize or sync Global Testimonials
      for (const t of DEFAULT_TESTIMONIALS_SEED_DATA) {
        const existingTestimonial = await strapiAny.documents('api::testimonial.testimonial').findFirst({
          filters: { authorName: t.authorName },
        });
        if (!existingTestimonial) {
          await strapiAny.documents('api::testimonial.testimonial').create({
            data: t,
            status: 'published',
          });
          strapi.log.info(`[Bootstrap] Created Global Testimonial: "${t.authorName}" (${t.authorCompany})`);
        }
      }

      // 6. Initialize or sync Global Brands Section Settings
      const existingBrandsSection = await strapiAny.documents('api::brands-section.brands-section').findFirst();
      if (!existingBrandsSection) {
        await strapiAny.documents('api::brands-section.brands-section').create({
          data: DEFAULT_BRANDS_SECTION_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Brands Section Settings in Strapi.');
      }

      // 7. Initialize or sync Partner Brands
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

    } catch (err: any) {
      strapi.log.warn('[Bootstrap] Auto-setup notice:', err?.message || err);
    }
  },
};
