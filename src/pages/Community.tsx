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
          {/* RIGHT COLUMN: Featured Hero Image Showcase               */}
          {/* ======================================================= */}
          <ScrollReveal className="lg:col-span-5" stagger={0.15}>
            <div 
              onClick={() => setActiveArticle(featuredPost || posts[0])}
              className="relative w-full h-[300px] sm:h-[360px] lg:h-[380px] rounded-2xl overflow-hidden border border-[#0B0D12]/15 shadow-xl group cursor-pointer bg-[#0B0D12]"
            >
              {/* Featured Hero Image with subtle hover zoom */}
              <img 
                src={getStrapiMediaUrl(featuredPost?.coverImage) || (typeof featuredPost?.coverImage === 'string' ? featuredPost?.coverImage : null) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                alt={featuredPost?.title || 'Featured Article'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-95"
              />

              {/* Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/95 via-[#0B0D12]/30 to-transparent pointer-events-none" />

              {/* Top Pill Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-semibold shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#FF4A1C]" />
                  <span>FEATURED DISPATCH</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF4A1C] text-white text-[10px] font-mono font-bold shadow-xs">
                  {featuredPost?.readTime || '6 MIN READ'}
                </span>
              </div>

              {/* Bottom Frosted Glass Card with Article Headline & Action */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 sm:p-4 rounded-xl bg-[#0B0D12]/80 backdrop-blur-md border border-white/15 text-white space-y-1.5 group-hover:bg-[#0B0D12]/90 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/70">
                  <span className="text-[#FF4A1C] font-bold uppercase">{featuredPost?.category || 'AI & AUTOMATION'}</span>
                  <span>•</span>
                  <span>{featuredPost?.date || 'AUG 2026'}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold font-display text-white line-clamp-2 leading-snug group-hover:text-[#FF4A1C] transition-colors">
                  {featuredPost?.title || spotlight.title}
                </h3>
                <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-white/90">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#FF4A1C]" />
                    <span className="truncate max-w-[140px]">{featuredPost?.author?.name || 'Alex Rivera'}</span>
                  </span>
                  <span className="text-[#FF4A1C] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-mono text-[11px]">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
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
            <div className="group bg-[#0B0D12] text-[#F4F1EA] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md relative overflow-hidden border border-[#0B0D12] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column: Article Details */}
              <div className="lg:col-span-7 space-y-4 relative z-10">
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

                <h2 
                  onClick={() => setActiveArticle(featuredPost || posts[0])}
                  className="text-h2 text-white group-hover:text-[#FF4A1C] transition-colors cursor-pointer"
                >
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

                <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
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

              {/* Right Column: Featured Blog Post Cover Image */}
              <div 
                onClick={() => setActiveArticle(featuredPost || posts[0])}
                className="lg:col-span-5 relative z-10 w-full h-[240px] sm:h-[280px] lg:h-[320px] rounded-xl overflow-hidden border border-white/15 bg-white/5 cursor-pointer group/img shadow-md"
              >
                <img 
                  src={getStrapiMediaUrl(featuredPost?.coverImage) || (typeof featuredPost?.coverImage === 'string' ? featuredPost?.coverImage : null) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'}
                  alt={featuredPost?.title || 'Featured Article'}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out brightness-90 group-hover/img:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold shadow-xs">
                  {featuredPost?.category || 'AI & AUTOMATION'}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg border border-white/15">
                  <span className="text-white/80 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF4A1C]" /> {featuredPost?.readTime || '6 min read'}
                  </span>
                  <span className="text-[#FF4A1C] font-bold flex items-center gap-1 group-hover/img:translate-x-1 transition-transform">
                    Explore Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
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
