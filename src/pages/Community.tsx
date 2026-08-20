import React, { useState } from 'react';
import { 
  Sparkles, Search, Calendar, Clock, User, ArrowRight, 
  ChevronRight, BookOpen, CheckCircle2, 
  X, ThumbsUp, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'AI & Automation' | 'Engineering & Architecture' | 'Product & Design' | 'Case Studies';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
  tags: string[];
  content: {
    introduction: string;
    keyPoints: string[];
    codeSnippet?: string;
    conclusion: string;
  };
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'agentic-ai-workflows',
    title: 'Building Production Agentic AI Workflows with TypeScript & Gemini 1.5',
    excerpt: 'How we architect autonomous agentic pipelines that run function calling, multi-step orchestration, and real-time state synchronization with sub-second latency.',
    category: 'AI & Automation',
    date: 'Aug 8, 2026',
    readTime: '6 min read',
    featured: true,
    author: {
      name: 'Alex Rivera',
      role: 'Principal AI Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    tags: ['AI Agents', 'Gemini API', 'TypeScript', 'LLM Ops'],
    content: {
      introduction: 'Agentic AI workflows are shifting software development from prompt-and-response paradigms toward truly autonomous task execution. In this deep dive, we explore how to build resilient multi-agent systems that handle tool calling, state memory, and self-correcting error loops.',
      keyPoints: [
        'Decoupling decision loops from execution engines using typed schemas.',
        'Implementing exponential backoff and dynamic prompt re-try strategies.',
        'Managing context window limits through structured memory summaries.',
        'Securing server-side API proxy routes to prevent credential leaks.'
      ],
      codeSnippet: `// Example Agentic Tool Execution Function
import { GoogleGenAI } from '@google/genai';

export async function executeAgentTask(taskPrompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-pro',
    contents: [{ role: 'user', parts: [{ text: taskPrompt }] }],
    config: {
      tools: [{ functionDeclarations: [searchDatabaseSchema, dispatchNotification] }]
    }
  });
  return response;
}`,
      conclusion: 'By structuring AI interactions with deterministic function declarations and client-side guards, you can build enterprise-grade AI features that remain robust and predictable under heavy loads.'
    }
  },
  {
    id: 'micro-frontends-architecture',
    title: 'Architecting High-Performance Micro-Frontends for Scalable Enterprise Apps',
    excerpt: 'Explore domain-driven module federation, shared design tokens, and independent deployment strategies for multi-team SaaS platforms.',
    category: 'Engineering & Architecture',
    date: 'Aug 2, 2026',
    readTime: '8 min read',
    author: {
      name: 'David Chen',
      role: 'VP of Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    tags: ['Micro-Frontends', 'Vite', 'React', 'Architecture'],
    content: {
      introduction: 'As software teams grow past 50 engineers, monolithic frontend codebases suffer from build bottlenecks and tight coupling. Micro-frontends allow independent feature domains to ship without blocking the main pipeline.',
      keyPoints: [
        'Domain-Driven Design (DDD) to establish boundary contexts.',
        'Module Federation using Vite & ES Modules for fast runtime stitching.',
        'Shared UI design token contracts to preserve visual coherence.',
        'Micro-frontend CI/CD pipelines with automated smoke testing.'
      ],
      codeSnippet: `// vite.config.ts module federation setup
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'host_app',
      remotes: {
        analyticsApp: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'tailwindcss']
    })
  ]
});`,
      conclusion: 'Adopting module federation requires upfront alignment on core dependencies, but unlocks unmatched velocity for distributed engineering organizations.'
    }
  },
  {
    id: 'design-systems-tailwind-v4',
    title: 'Crafting Modern Design Systems: Token-Based Styling with Tailwind CSS v4',
    excerpt: 'A comprehensive guide to constructing scalable, WCAG AA compliant design tokens, fluid typography scales, and seamless dark-mode themes.',
    category: 'Product & Design',
    date: 'Jul 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Sophia Martinez',
      role: 'Head of Design Systems',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    tags: ['Tailwind CSS', 'Design Systems', 'UX/UI', 'Accessibility'],
    content: {
      introduction: 'Design systems are the bridge between design intent and engineering reality. With modern Tailwind CSS, utility-first styling scales seamlessly across complex multi-brand software products.',
      keyPoints: [
        'Mathematical type scale ratios for high typographic hierarchy.',
        'Nested border-radius calculations for optical harmony.',
        'Accessible color palettes meeting 4.5:1 WCAG AA contrast standards.',
        'Encapsulated component variants with clean tailwind-merge utilities.'
      ],
      conclusion: 'By strictly defining design tokens at the theme level, teams eliminate visual debt and guarantee visual polish across every screen size.'
    }
  },
  {
    id: 'crdts-realtime-collaboration',
    title: 'Scaling Real-Time Collaboration with WebSockets, Yjs, and CRDTs',
    excerpt: 'Learn how to build conflict-free collaborative canvas tools, multiplayer document editors, and instant multi-user synchronization.',
    category: 'Engineering & Architecture',
    date: 'Jul 20, 2026',
    readTime: '7 min read',
    author: {
      name: 'Marcus Vance',
      role: 'Staff Infrastructure Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    tags: ['WebSockets', 'CRDTs', 'Real-time', 'Distributed Systems'],
    content: {
      introduction: 'Building multiplayer web applications used to require complex server lock mechanisms. Conflict-free Replicated Data Types (CRDTs) enable peer-to-peer and server-authoritative state convergence effortlessly.',
      keyPoints: [
        'Understanding State-based vs. Operation-based CRDTs.',
        'Setting up Yjs document providers over WebSocket channels.',
        'Optimistic client rendering with offline delta caching.',
        'Presence indicators, cursor broadcasting, and awareness protocols.'
      ],
      conclusion: 'CRDTs eliminate data overwrite bugs and deliver ultra-responsive multiplayer experiences even on variable network latency.'
    }
  },
  {
    id: 'zero-downtime-database-migrations',
    title: 'Zero-Downtime Database Schema Migrations in Cloud SQL & PostgreSQL',
    excerpt: 'Step-by-step strategies for expanding, migrating, and contracting database schemas without dropping active user connections.',
    category: 'Case Studies',
    date: 'Jul 14, 2026',
    readTime: '9 min read',
    author: {
      name: 'David Chen',
      role: 'VP of Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    tags: ['Cloud SQL', 'PostgreSQL', 'DevOps', 'Databases'],
    content: {
      introduction: 'In mission-critical applications, taking a database offline for migrations is not an option. The expand-contract pattern allows safe schema refactoring in live production environments.',
      keyPoints: [
        'The Expand-Contract Migration lifecycle stages.',
        'Non-blocking DDL statements and index creation (`CONCURRENTLY`).',
        'Dual-writing application data during transitional phases.',
        'Automating schema checks with Drizzle ORM in CI/CD pipelines.'
      ],
      conclusion: 'Zero-downtime migrations protect business continuity while allowing continuous database evolution.'
    }
  },
  {
    id: 'school-erp-automation-case-study',
    title: 'Automating Multi-Tenant Workflows: Lessons from Scaling School ERP',
    excerpt: 'How Aprogra engineered a unified multi-tenant platform serving 50+ educational institutions with dynamic role RBAC and custom report engines.',
    category: 'Case Studies',
    date: 'Jul 05, 2026',
    readTime: '6 min read',
    author: {
      name: 'Sophia Martinez',
      role: 'Head of Product',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    tags: ['Case Study', 'Multi-Tenant', 'ERP', 'EduTech'],
    content: {
      introduction: 'Educational institutions require highly flexible permission models, real-time grading pipelines, and automated parent-teacher communication portals.',
      keyPoints: [
        'Tenant isolation strategies: Row-Level Security (RLS) vs Separate Schemas.',
        'Role-Based Access Control (RBAC) with dynamic scope policies.',
        'Automating fee generation and SMS/WhatsApp notifications.',
        'Blazing fast PDF generation for academic report cards.'
      ],
      conclusion: 'By building modular micro-services, educational administrators spend 80% less time on manual data entry and compliance reports.'
    }
  }
];

const CATEGORIES = [
  'All Articles',
  'AI & Automation',
  'Engineering & Architecture',
  'Product & Design',
  'Case Studies'
] as const;

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  // Filter logic
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All Articles' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const handleLike = (id: string) => {
    setLikedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] font-sans antialiased pt-16">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION (2-PART LEFT & RIGHT LAYOUT - SINGLE SCREEN) */}
      {/* ========================================================= */}
      <section className="relative px-4 sm:px-6 md:px-10 py-6 sm:py-8 lg:py-4 overflow-hidden border-b border-[#0B0D12]/10 bg-[#F4F1EA] text-[#0B0D12] min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] lg:max-h-[calc(100vh-64px)] flex flex-col justify-center">
        {/* Ambient Engineering Grid & Glow in Background */}
        <div className="absolute inset-0 pointer-events-none -z-0 opacity-40">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #0B0D12 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
          {/* Soft Radial Ambient Glow */}
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF4A1C]/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ======================================================= */}
          {/* LEFT COLUMN: Headings, Search & Topic Quick Filters    */}
          {/* ======================================================= */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#0B0D12]/12 text-[#0B0D12] text-xs font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span>APROGRA TECH RADAR • ENGINEERING BLOG</span>
            </div>

            {/* Main Headline (Single H1) */}
            <div className="space-y-1">
              <h1 className="text-h1 text-[#0B0D12]">
                Engineering, AI & <br />
                <span className="text-[#FF4A1C]">
                  Product Insights.
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-[#5A5E6E] max-w-xl leading-relaxed">
              Deep architectural breakdowns, real-world agentic AI workflows, modern web design systems, and enterprise systems engineering directly from our architects.
            </p>

            {/* Search Input Box */}
            <div className="pt-0.5 max-w-xl">
              <div className="relative flex items-center bg-white rounded-xl border border-[#0B0D12]/15 shadow-xs p-1 focus-within:border-[#0B0D12] focus-within:shadow-md transition-all">
                <Search className="w-4 h-4 text-[#5A5E6E] ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search articles by tech stack, topic, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#0B0D12] bg-transparent outline-none placeholder-[#5A5E6E]/60 font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full text-[#5A5E6E] hover:text-[#0B0D12] mr-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics & Trust Line */}
            <div className="pt-2.5 border-t border-[#0B0D12]/10 flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono text-[#5A5E6E]">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span className="font-bold text-[#0B0D12]">45+ Articles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0B0D12]" />
                <span>12k+ Monthly Readers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>Weekly Technical Deep Dives</span>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN: Interactive Featured Deep Dive Card       */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl bg-white border border-[#0B0D12]/15 p-4 sm:p-5 shadow-md space-y-3">
              
              {/* Header row */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-[11px] font-mono font-bold text-[#0B0D12] uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span>FEATURED SPOTLIGHT</span>
                </span>
                
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Aug 2026 Edition</span>
                </span>
              </div>

              {/* Featured Content Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/10 text-[10px] font-mono font-bold text-[#FF4A1C]">
                    {featuredPost.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#5A5E6E]">
                    {featuredPost.readTime}
                  </span>
                </div>

                <h3 
                  onClick={() => setActiveArticle(featuredPost)}
                  className="text-base sm:text-lg font-bold font-display text-[#0B0D12] hover:text-[#FF4A1C] transition-colors cursor-pointer leading-snug truncate"
                >
                  {featuredPost.title}
                </h3>

                <p className="text-xs text-[#5A5E6E] line-clamp-2 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {/* Key Points Micro List */}
                <div className="space-y-1 pt-0.5">
                  {featuredPost.content.keyPoints.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-[#0B0D12]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4A1C] shrink-0 mt-0.5" />
                      <span className="line-clamp-1 text-[11px] sm:text-xs">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author & Action Footer */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#0B0D12]/10 shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#0B0D12] truncate">{featuredPost.author.name}</div>
                    <div className="text-[10px] text-[#5A5E6E] font-mono truncate">{featuredPost.author.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredPost)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. BLOGS LIST SECTION                                    */}
      {/* ========================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#0B0D12]/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0B0D12] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#0B0D12] hover:bg-white border border-[#0B0D12]/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#5A5E6E] font-semibold">
            Showing <span className="text-[#FF4A1C] font-bold">{filteredPosts.length}</span> articles
          </div>
        </div>

        {/* Featured Post Card (Shows when 'All Articles' is selected or featured post matches query) */}
        {selectedCategory === 'All Articles' && !searchQuery && (
          <div className="group bg-[#0B0D12] text-[#F4F1EA] rounded-lg p-6 sm:p-10 shadow-md relative overflow-hidden border border-[#0B0D12] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-white/10 text-white border border-white/15 text-xs font-mono font-bold uppercase tracking-wider">
                  Featured Article
                </span>
                <span className="text-xs text-[#F4F1EA]/70 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#FF4A1C]" /> {featuredPost.date}
                </span>
                <span className="text-xs text-[#F4F1EA]/70 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#FF4A1C]" /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-h2 text-white group-hover:text-[#FF4A1C] transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-body text-[#F4F1EA]/80 max-w-2xl">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredPost.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded bg-white/10 text-[#F4F1EA] text-caption font-mono border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="text-h4 text-white">{featuredPost.author.name}</div>
                    <div className="text-caption text-[#FF4A1C] font-mono">{featuredPost.author.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredPost)}
                  className="px-6 py-3 rounded-lg bg-[#FF4A1C] hover:bg-white hover:text-[#0B0D12] text-white text-badge flex items-center gap-2 cursor-pointer shadow-xs transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Graphic Badge Column */}
            <div className="lg:col-span-4 relative z-10 hidden lg:flex flex-col items-center justify-center p-8 bg-white/5 rounded-lg border border-white/10 text-center space-y-4">
              <div className="w-16 h-16 rounded-lg bg-[#FAF8F5] text-[#0B0D12] flex items-center justify-center shadow-xs">
                <Code className="w-8 h-8 text-[#FF4A1C]" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-white uppercase">Architecture Insights</div>
                <div className="text-xs text-[#F4F1EA]/70 font-sans">Production-tested implementation patterns for engineering teams.</div>
              </div>
              <div className="text-[10px] font-mono bg-white/10 text-white px-3 py-1 rounded border border-white/15">
                Verified Code Snippets Included
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-[#FAF8F5] rounded-lg p-6 sm:p-7 border border-[#0B0D12]/15 shadow-xs hover:shadow-md hover:border-[#0B0D12] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between text-xs font-mono text-[#5A5E6E]">
                  <span className="px-2.5 py-1 rounded bg-white text-[#0B0D12] font-bold border border-[#0B0D12]/15">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5A5E6E]" /> {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 
                  onClick={() => setActiveArticle(post)}
                  className="text-h4 text-[#0B0D12] group-hover:text-[#FF4A1C] transition-colors leading-snug cursor-pointer line-clamp-2"
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-body text-[#5A5E6E] line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-white text-[#5A5E6E] text-caption font-mono border border-[#0B0D12]/10">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Author Footer & Read Button */}
              <div className="pt-6 mt-6 border-t border-[#0B0D12]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-8 h-8 rounded-full object-cover border border-[#0B0D12]/15"
                  />
                  <div>
                    <div className="text-h4 text-[#0B0D12]">{post.author.name}</div>
                    <div className="text-caption text-[#5A5E6E] font-mono">{post.date}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(post)}
                  className="inline-flex items-center gap-1 text-label-mono text-[#0B0D12] group-hover:text-[#FF4A1C] hover:underline cursor-pointer"
                >
                  <span>Read</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center bg-white rounded-lg border border-[#0B0D12]/15 p-8 space-y-3 shadow-xs">
            <Search className="w-10 h-10 text-[#5A5E6E] mx-auto" />
            <h3 className="text-h4 text-[#0B0D12]">No articles found</h3>
            <p className="text-xs text-[#5A5E6E] max-w-sm mx-auto font-sans">
              We couldn't find any blog posts matching "{searchQuery}". Try searching for another topic or reset filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All Articles'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded text-xs font-bold font-mono cursor-pointer transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}

      </section>

      {/* ========================================================= */}
      {/* READ ARTICLE MODAL                                        */}
      {/* ========================================================= */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-lg max-w-3xl w-full my-8 p-6 sm:p-10 space-y-6 shadow-2xl relative border border-[#0B0D12]/20 max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#5A5E6E] hover:text-[#0B0D12] hover:bg-white cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Article Top Category & Date */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5A5E6E] pt-2">
              <span className="px-3 py-1 rounded bg-white text-[#0B0D12] font-bold border border-[#0B0D12]/15">
                {activeArticle.category}
              </span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>

            {/* Title */}
            <h2 className="text-h2 text-[#0B0D12]">
              {activeArticle.title}
            </h2>

            {/* Author Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#0B0D12]/10">
              <div className="flex items-center gap-3">
                <img 
                  src={activeArticle.author.avatar} 
                  alt={activeArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#0B0D12]/15" 
                />
                <div>
                  <div className="text-h4 text-[#0B0D12]">{activeArticle.author.name}</div>
                  <div className="text-caption text-[#5A5E6E] font-mono">{activeArticle.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleLike(activeArticle.id)}
                  className={`p-2 rounded-lg border text-caption font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                    likedArticles[activeArticle.id] 
                      ? 'bg-[#0B0D12] text-white border-[#0B0D12]' 
                      : 'bg-white text-[#0B0D12] border-[#0B0D12]/15 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span>{likedArticles[activeArticle.id] ? 'Liked!' : 'Like'}</span>
                </button>
              </div>
            </div>

            {/* Article Content Body */}
            <div className="space-y-6 text-[#0B0D12] text-body">
              <p className="text-body-lg text-[#0B0D12] bg-white p-4 rounded-lg border-l-4 border-[#FF4A1C]">
                {activeArticle.content.introduction}
              </p>

              <div className="space-y-3">
                <h3 className="text-h4 text-[#0B0D12]">Key Engineering Takeaways:</h3>
                <ul className="space-y-2">
                  {activeArticle.content.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-body">
                      <CheckCircle2 className="w-4 h-4 text-[#FF4A1C] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet Box */}
              {activeArticle.content.codeSnippet && (
                <div className="space-y-2">
                  <div className="text-label-mono text-[#5A5E6E]">Implementation Example</div>
                  <pre className="p-4 rounded-lg bg-[#0B0D12] text-[#F4F1EA] font-mono text-caption overflow-x-auto border border-[#0B0D12] leading-relaxed">
                    <code>{activeArticle.content.codeSnippet}</code>
                  </pre>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <h3 className="text-h4 text-[#0B0D12]">Conclusion & Summary</h3>
                <p className="text-body text-[#5A5E6E]">
                  {activeArticle.content.conclusion}
                </p>
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-6 border-t border-[#0B0D12]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs text-[#5A5E6E] font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>Want to build something similar?</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-semibold text-[#0B0D12] hover:bg-white cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to="/contact"
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-lg bg-[#0B0D12] hover:bg-[#FF4A1C] text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <span>Start Project Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
