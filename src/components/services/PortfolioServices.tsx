import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue
} from 'motion/react';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'nova-commerce',
    name: 'Nova Commerce',
    category: 'Web App',
    categoryColor: 'bg-blue-50 text-blue-700 border-blue-200',
    result: '+180% growth in checkout conversion with 0.4s load speeds.',
    image: 'https://picsum.photos/seed/971401438/1200/800',
    tags: ['Next.js', 'Stripe', 'Tailwind']
  },
  {
    id: 'trackfleet',
    name: 'TrackFleet',
    category: 'Mobile App',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    result: 'Real-time telemetry tracking for 15,000+ active logistics vehicles.',
    image: 'https://picsum.photos/seed/2003684875/1200/800',
    tags: ['React Native', 'GPS', 'WebSockets']
  },
  {
    id: 'lumen-studio',
    name: 'Lumen Studio',
    category: 'Website',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    result: 'Aesthetically striking 3D web experience with 99.8% retention.',
    image: 'https://picsum.photos/seed/2052222832/1200/800',
    tags: ['Three.js', 'WebGL', 'Tailwind']
  },
  {
    id: 'askdesk-ai',
    name: 'AskDesk AI',
    category: 'Agentic AI',
    categoryColor: 'bg-pink-50 text-pink-700 border-pink-200',
    result: 'Automated 78% of tier-1 customer queries using Gemini agent workflows.',
    image: 'https://picsum.photos/seed/1866128676/1200/800',
    tags: ['Gemini 1.5', 'Python', 'FastAPI']
  },
  {
    id: 'sunrise-portal',
    name: 'Sunrise Portal',
    category: 'Web App',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    result: 'Unified 12 internal business tools into one lightning-fast web app.',
    image: 'https://picsum.photos/seed/132147825/1200/800',
    tags: ['React', 'GraphQL', 'Tailwind']
  },
  {
    id: 'vibe-social',
    name: 'Vibe Social',
    category: 'Mobile App',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    result: 'Scaled to 250,000 active creators with sub-100ms feed latency.',
    image: 'https://picsum.photos/seed/1208823114/1200/800',
    tags: ['Flutter', 'Firebase', 'CDN']
  }
];

interface CardProps {
  project: typeof PROJECTS[0];
  index: number;
  smoothVelocity: any;
  isMobile?: boolean;
}

function Project3DPlane({ project, index, smoothVelocity, isMobile = false }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse hover 3D tilt
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = -(e.clientY - rect.top - rect.height / 2) / 10;
    hoverX.set(x);
    hoverY.set(y);
  };

  const handleMouseLeave = () => {
    hoverX.set(0);
    hoverY.set(0);
  };

  // Wave ripple offsets driven by scroll velocity
  const planeSkew = useTransform(smoothVelocity, [-0.05, 0, 0.05], [-10, 0, 10]);
  const planeRotateY = useTransform(smoothVelocity, [-0.05, 0, 0.05], index % 2 === 0 ? [-12, 0, 12] : [12, 0, -12]);
  const planeY = useTransform(smoothVelocity, [-0.05, 0, 0.05], index % 2 === 0 ? [-8, 0, 8] : [8, 0, -8]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateY: isMobile ? 0 : planeRotateY,
        skewX: isMobile ? 0 : planeSkew,
        y: isMobile ? 0 : planeY,
      }}
      className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-purple-300 transition-shadow duration-300 group cursor-pointer"
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX: hoverY,
          rotateY: hoverX,
        }}
        className="w-full h-full flex flex-col justify-between"
      >
        {/* Project Thumbnail Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm ${project.categoryColor}`}>
              {project.category}
            </span>
          </div>

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <div className="w-9 h-9 rounded-full bg-white text-slate-900 shadow-md flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Project Meta Content */}
        <div className="p-5 sm:p-6 space-y-3 bg-white">
          <h3 className="text-xl sm:text-2xl font-bold font-space text-slate-900 group-hover:text-purple-600 transition-colors">
            {project.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">
            {project.result}
          </p>

          <div className="pt-3 flex flex-wrap gap-1.5 border-t border-slate-100">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileSwipeRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Check mobile viewport & measure exact track overflow distance
  useEffect(() => {
    setMounted(true);
    const updateSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile && trackRef.current && containerRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const distance = Math.max(0, trackWidth - containerWidth + 40);
        setScrollDistance(distance);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Scroll position & progress
  const { scrollYProgress } = useScroll({
    target: mounted && sectionRef.current ? sectionRef : undefined,
    offset: ["start start", "end end"]
  });

  // Calculate velocity from vertical scroll progress
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 300 });

  // Exact pixel translation tied directly to scroll distance - eliminates empty space
  const rawX = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollDistance}px`]);
  const smoothX = useSpring(rawX, { stiffness: 220, damping: 30 });

  const scrollLeftMobile = () => {
    if (mobileSwipeRef.current) {
      mobileSwipeRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRightMobile = () => {
    if (mobileSwipeRef.current) {
      mobileSwipeRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      style={{ height: isMobile ? 'auto' : `calc(100vh + ${scrollDistance}px)` }}
      className="relative w-full bg-[#F8FAFC] text-[#0D0F1C] border-b border-slate-200"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ================= DESKTOP STICKY 3D VELOCITY CAROUSEL ================= */}
      {!isMobile && (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="max-w-7xl mx-auto h-full px-8 lg:px-12 flex flex-col justify-center py-12 space-y-10">
            
            {/* SECTION HEADER */}
            <div className="flex items-end justify-between gap-6 shrink-0">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-200/80 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
                    OUR PORTFOLIO
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-space text-slate-900 tracking-tight leading-tight">
                  3D Velocity Showcase of Recent Work
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Scroll vertically to propel the 3D planes across screen. Notice the real-time velocity ripple and tilt!
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm inline-block">
                  💡 Scroll speed amplifies 3D wave physics
                </span>
              </div>
            </div>

            {/* 3D CAROUSEL PLANES CONTAINER */}
            <div ref={containerRef} className="w-full py-6 [perspective:1200px] overflow-hidden">
              <motion.div 
                ref={trackRef}
                style={{ x: smoothX, transformStyle: 'preserve-3d' }}
                className="flex gap-8 w-max"
              >
                {PROJECTS.map((project, index) => (
                  <Project3DPlane
                    key={project.id}
                    project={project}
                    index={index}
                    smoothVelocity={smoothVelocity}
                  />
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      )}

      {/* ================= MOBILE / TABLET NATIVE SWIPE CAROUSEL (NO STICKY POSITIONING) ================= */}
      {isMobile && (
        <div className="py-16 px-4 sm:px-6 space-y-8 relative z-10">
          
          {/* Mobile Header */}
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-200/80 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
                  OUR PORTFOLIO
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-space text-slate-900 tracking-tight">
                3D Showcase of Recent Work
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={scrollLeftMobile}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRightMobile}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Swipe Container */}
          <div 
            ref={mobileSwipeRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar px-2 snap-x"
          >
            {PROJECTS.map((project, index) => (
              <div key={project.id} className="snap-center">
                <Project3DPlane
                  project={project}
                  index={index}
                  smoothVelocity={smoothVelocity}
                  isMobile={true}
                />
              </div>
            ))}
          </div>

        </div>
      )}

    </section>
  );
}

