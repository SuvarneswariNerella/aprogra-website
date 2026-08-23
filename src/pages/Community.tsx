import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Search, Calendar, Clock, User, ArrowRight, 
  ChevronRight, BookOpen, CheckCircle2, 
  X, ThumbsUp, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useBlogData, BlogPost, getStrapiMediaUrl } from '@/lib/strapi';
import BlocksRenderer from '@/components/blog/BlocksRenderer';

const CATEGORIES = [
  'All Articles',
  'AI & Automation',
  'Engineering & Architecture',
  'Product & Design',
  'Case Studies'
] as const;

export default function Community() {
  const { pageContent, posts } = useBlogData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});
  const articleRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling and handle Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeArticle) {
        setActiveArticle(null);
      }
    };

    if (activeArticle) {
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
  }, [activeArticle]);

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All Articles' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(tag => (typeof tag === 'string' ? tag : (tag as any).name || '').toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.featured) || posts[0] || filteredPosts[0];

  const handleLike = (id: string) => {
    setLikedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const hero = pageContent.hero;
  const spotlight = pageContent.spotlight;
  const nav = pageContent.nav;
  const featuredSection = pageContent.featuredSection;

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
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-3 sm:space-y-4 text-left"
          >
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#0B0D12]/12 text-[#0B0D12] text-xs font-semibold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span>{hero.badge}</span>
            </div>

            {/* Main Headline (Single H1) */}
            <div className="space-y-1">
              <h1 className="text-h1 text-[#0B0D12]">
                {hero.headline} <br />
                <span className="text-[#FF4A1C]">
                  {hero.highlight}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-[#5A5E6E] max-w-xl leading-relaxed">
              {hero.description}
            </p>

            {/* Search Input Box */}
            <div className="pt-0.5 max-w-xl">
              <div className="relative flex items-center bg-white rounded-xl border border-[#0B0D12]/15 shadow-xs p-1 focus-within:border-[#0B0D12] focus-within:shadow-md transition-all">
                <Search className="w-4 h-4 text-[#5A5E6E] ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder={hero.searchPlaceholder || "Search articles by tech stack, topic, or keyword..."}
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
                <span className="font-bold text-[#0B0D12]">{hero.metric1_text}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0B0D12]" />
                <span>{hero.metric2_text}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
                <span>{hero.metric3_text}</span>
              </div>
            </div>

          </motion.div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN: Interactive Featured Deep Dive Card       */}
          {/* ======================================================= */}
          <ScrollReveal className="lg:col-span-5 space-y-3" stagger={0.15}>
            <div className="rounded-2xl bg-white border border-[#0B0D12]/15 p-4 sm:p-5 shadow-md space-y-3">
              
              {/* Header row */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-[11px] font-mono font-bold text-[#0B0D12] uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#FF4A1C]" />
                  <span>{spotlight.headerTitle}</span>
                </span>
                
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{spotlight.editionBadge}</span>
                </span>
              </div>

              {/* Featured Content Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#0B0D12]/10 text-[10px] font-mono font-bold text-[#FF4A1C]">
                    {featuredPost?.category || spotlight.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#5A5E6E]">
                    {featuredPost?.readTime || spotlight.readTime}
                  </span>
                </div>

                <h3 
                  onClick={() => setActiveArticle(featuredPost || posts[0])}
                  className="text-base sm:text-lg font-bold font-display text-[#0B0D12] hover:text-[#FF4A1C] transition-colors cursor-pointer leading-snug truncate"
                >
                  {featuredPost?.title || spotlight.title}
                </h3>

                <p className="text-xs text-[#5A5E6E] line-clamp-2 leading-relaxed">
                  {featuredPost?.excerpt || spotlight.excerpt}
                </p>

                {/* Key Points Micro List */}
                <div className="space-y-1 pt-0.5">
                  {(featuredPost?.content?.keyPoints?.length 
                    ? featuredPost.content.keyPoints.slice(0, 2) 
                    : [spotlight.point1, spotlight.point2]
                  ).map((point, idx) => (
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
                    src={getStrapiMediaUrl(spotlight.authorAvatar) || featuredPost?.author?.avatar || spotlight.authorAvatarUrl} 
                    alt={featuredPost?.author?.name || spotlight.authorName}
                    className="w-7 h-7 rounded-full object-cover border border-[#0B0D12]/10 shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#0B0D12] truncate">
                      {featuredPost?.author?.name || spotlight.authorName}
                    </div>
                    <div className="text-[10px] text-[#5A5E6E] font-mono truncate">
                      {featuredPost?.author?.role || spotlight.authorRole}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredPost || posts[0])}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF4A1C] hover:bg-[#E03E14] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
                >
                  <span>{spotlight.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. BLOGS LIST SECTION                                    */}
      {/* ========================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#0B0D12]/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {(nav.categoriesList || CATEGORIES).map((cat) => {
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
            {nav.showingPrefix}{' '}
            <span className="text-[#FF4A1C] font-bold">{filteredPosts.length}</span>{' '}
            {nav.articlesSuffix}
          </div>
        </div>

        {/* Featured Post Card (Shows when 'All Articles' is selected or featured post matches query) */}
        {selectedCategory === 'All Articles' && !searchQuery && (
          <ScrollReveal>
            <div className="group bg-[#0B0D12] text-[#F4F1EA] rounded-lg p-6 sm:p-10 shadow-md relative overflow-hidden border border-[#0B0D12] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-white/10 text-white border border-white/15 text-xs font-mono font-bold uppercase tracking-wider">
                  {featuredSection.badge}
                </span>
                <span className="text-xs text-[#F4F1EA]/70 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#FF4A1C]" /> {featuredPost?.date}
                </span>
                <span className="text-xs text-[#F4F1EA]/70 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#FF4A1C]" /> {featuredPost?.readTime}
                </span>
              </div>

              <h2 className="text-h2 text-white group-hover:text-[#FF4A1C] transition-colors">
                {featuredPost?.title}
              </h2>

              <p className="text-body text-[#F4F1EA]/80 max-w-2xl">
                {featuredPost?.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {(featuredPost?.tags || []).map((tag: any) => {
                  const tagText = typeof tag === 'string' ? tag : tag.name || '';
                  return (
                    <span key={tagText} className="px-2.5 py-1 rounded bg-white/10 text-[#F4F1EA] text-caption font-mono border border-white/10">
                      #{tagText}
                    </span>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredPost?.author?.avatar || spotlight.authorAvatarUrl} 
                    alt={featuredPost?.author?.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="text-h4 text-white">{featuredPost?.author?.name}</div>
                    <div className="text-caption text-[#FF4A1C] font-mono">{featuredPost?.author?.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredPost || posts[0])}
                  className="px-6 py-3 rounded-lg bg-[#FF4A1C] hover:bg-white hover:text-[#0B0D12] text-white text-badge flex items-center gap-2 cursor-pointer shadow-xs transition-all"
                >
                  <span>READ ARTICLE</span>
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
                <div className="text-xs font-mono font-bold text-white uppercase">{featuredSection.sideCardTitle}</div>
                <div className="text-xs text-[#F4F1EA]/70 font-sans">{featuredSection.sideCardDesc}</div>
              </div>
              <div className="text-[10px] font-mono bg-white/10 text-white px-3 py-1 rounded border border-white/15">
                {featuredSection.sideCardBadge}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

        {/* Blog Posts Grid */}
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-[#FAF8F5] rounded-lg p-6 sm:p-7 border border-[#0B0D12]/15 shadow-xs hover:shadow-md hover:border-[#0B0D12] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Card Cover Thumbnail */}
                {post.coverImage && (
                  <div 
                    onClick={() => setActiveArticle(post)}
                    className="h-44 -mx-6 -mt-6 mb-4 overflow-hidden bg-[#0B0D12]/5 cursor-pointer relative"
                  >
                    <img 
                      src={getStrapiMediaUrl(post.coverImage) || (typeof post.coverImage === 'string' ? post.coverImage : '')}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

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
                  {post.tags && post.tags.slice(0, 3).map((tag: any) => {
                    const tagText = typeof tag === 'string' ? tag : tag.name || '';
                    return (
                      <span key={tagText} className="px-2 py-0.5 rounded bg-white text-[#5A5E6E] text-caption font-mono border border-[#0B0D12]/10">
                        #{tagText}
                      </span>
                    );
                  })}
                </div>

              </div>

              {/* Author Footer & Read Button */}
              <div className="pt-6 mt-6 border-t border-[#0B0D12]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={post.author.avatar || spotlight.authorAvatarUrl} 
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
        </ScrollReveal>

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center bg-white rounded-lg border border-[#0B0D12]/15 p-8 space-y-3 shadow-xs">
            <Search className="w-10 h-10 text-[#5A5E6E] mx-auto" />
            <h3 className="text-h4 text-[#0B0D12]">No articles found</h3>
            <p className="text-xs text-[#5A5E6E] max-w-sm mx-auto font-sans">
              We couldn't find any blog posts matching your search. Try searching for another topic or reset filters.
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
          onWheel={(e) => {
            if (articleRef.current) {
              articleRef.current.scrollTop += e.deltaY;
            }
          }}
        >
          <div 
            ref={articleRef}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] rounded-lg max-w-3xl w-full my-8 p-6 sm:p-10 space-y-6 shadow-2xl relative border border-[#0B0D12]/20 max-h-[90vh] overflow-y-auto"
          >
            
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
                  src={activeArticle.author.avatar || spotlight.authorAvatarUrl} 
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

            {/* Cover Image (if provided) */}
            {activeArticle.coverImage && (
              <div className="rounded-xl overflow-hidden border border-[#0B0D12]/10 bg-[#0B0D12]/5 max-h-[360px] my-4 shadow-sm">
                <img
                  src={getStrapiMediaUrl(activeArticle.coverImage) || (typeof activeArticle.coverImage === 'string' ? activeArticle.coverImage : '')}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover max-h-[360px]"
                />
              </div>
            )}

            {/* Article Content Body via BlocksRenderer (Doc Editor) */}
            <div className="pt-2 pb-4">
              <BlocksRenderer content={activeArticle.content} />
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
