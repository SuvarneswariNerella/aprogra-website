import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { AboutStorySlide, DEFAULT_ABOUT_PAGE_DATA } from '@/lib/strapi';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxStackProps {
  storySlides?: AboutStorySlide[];
}

export default function ParallaxStack({
  storySlides = DEFAULT_ABOUT_PAGE_DATA.storySlides,
}: ParallaxStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slides = storySlides && storySlides.length > 0
    ? storySlides
    : DEFAULT_ABOUT_PAGE_DATA.storySlides;

  const totalSlides = slides.length;
  // Calculate container height: 100vh per slide (e.g. 3 slides = 300vh)
  const containerHeight = totalSlides <= 1 ? '100vh' : `${totalSlides * 100}vh`;

  // GSAP Single Pinned Timeline Configuration
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || totalSlides <= 1) return;

    // Reset slideRefs length
    slideRefs.current = slideRefs.current.slice(0, totalSlides);

    const ctx = gsap.context(() => {
      // 1. Initial state: ensure all slides after slide 0 start below the viewport
      for (let i = 1; i < totalSlides; i++) {
        const slideEl = slideRefs.current[i];
        if (slideEl) {
          gsap.set(slideEl, { yPercent: 100 });
        }
      }

      // 2. Create single unified timeline pinned on the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: false,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 3. Sequentially animate each slide sliding up and holding
      for (let i = 1; i < totalSlides; i++) {
        const slideEl = slideRefs.current[i];
        if (!slideEl) continue;

        tl.to(slideEl, {
          yPercent: 0,
          ease: 'none',
          duration: 1,
        });

        // Hold pause between slides if not the last one
        if (i < totalSlides - 1) {
          tl.to({}, { duration: 0.4 });
        }
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [slides, totalSlides]);

  return (
    <section 
      ref={containerRef} 
      style={{ height: containerHeight }}
      className="relative w-full bg-[#F4F1EA] m-0 mt-0 mb-0 p-0 overflow-hidden"
    >
      {/* Sticky Viewport Frame */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen min-h-[100vh] w-full overflow-hidden m-0 p-0"
      >
        {slides.map((slide, index) => {
          const isImageLeft = index % 2 === 0; // 0 (1st) -> Left, 1 (2nd) -> Right, 2 (3rd) -> Left, 3 (4th) -> Right, 4 (5th) -> Left...
          const isDark = index % 2 === 1;      // Alternating dark & light theme
          const orderFormatted = slide.orderNumber || (index + 1 < 10 ? `0${index + 1}` : `${index + 1}`);

          const bgClass = isDark ? 'bg-[#0B0D12] text-[#FAF8F5]' : 'bg-[#FAF8F5] text-[#0B0D12]';
          const borderClass = isDark ? 'border-white/10' : 'border-[#0B0D12]/10';
          const textMutedClass = isDark ? 'text-[#FAF8F5]/70' : 'text-[#0B0D12]/70';
          const numberColor = isDark ? 'text-white/[0.03]' : 'text-[#0B0D12]/[0.04]';

          // Visual section (Image or Geometric Graphic)
          const visualSection = (
            <div 
              className={`w-full lg:w-1/2 h-56 sm:h-64 lg:h-full relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 ${
                isImageLeft ? 'lg:border-r' : 'lg:border-l'
              } ${borderClass} ${isDark ? 'bg-[#131722]' : 'bg-[#F4F1EA]'} ${
                !isImageLeft ? 'order-1 lg:order-2' : ''
              }`}
            >
              {/* Giant Decorative Watermark Number */}
              <span className={`absolute bottom-[-20px] ${isImageLeft ? 'left-[-20px]' : 'right-[-20px]'} font-display font-extrabold text-[160px] sm:text-[180px] lg:text-[220px] leading-none ${numberColor} select-none pointer-events-none z-0`}>
                {orderFormatted}
              </span>

              {slide.imageUrl ? (
                /* High-Res Photography with Ambient Overlay */
                <div className="relative w-full h-full group overflow-hidden z-10">
                  <img 
                    src={slide.imageUrl}
                    alt={slide.headline}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0B0D12]/80' : 'from-[#0B0D12]/40'} via-transparent to-transparent pointer-events-none`} />
                </div>
              ) : (
                /* Fallback Geometric / Architectural Shapes */
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center z-10">
                  <div className={`absolute w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full border ${borderClass} ${isDark ? 'bg-white/[0.02]' : 'bg-[#0B0D12]/[0.02]'}`} />
                  <div className="absolute w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border border-[#FF4A1C]/30 bg-[#FF4A1C]/[0.04] translate-x-6 -translate-y-4" />
                  <div className="absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-[#FF4A1C] flex items-center justify-center shadow-lg shadow-[#FF4A1C]/30">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white" />
                  </div>
                </div>
              )}
            </div>
          );

          // Content / Text section
          const textSection = (
            <ScrollReveal 
              className={`w-full lg:w-1/2 h-full p-6 sm:p-10 lg:p-16 flex flex-col justify-center space-y-5 lg:space-y-6 overflow-y-auto ${
                !isImageLeft ? 'order-2 lg:order-1' : ''
              }`}
            >
              {slide.badge && (
                <span className="text-badge text-[#FF4A1C]">
                  {slide.badge}
                </span>
              )}

              <h2 className={`text-h2 ${isDark ? 'text-[#FAF8F5]' : 'text-[#0B0D12]'}`}>
                {slide.headline}
              </h2>

              <p className={`text-body-lg ${textMutedClass}`}>
                {slide.description}
              </p>

              {/* Callout Quote (e.g. for Mission) */}
              {slide.quote && (
                <div className="mt-4 sm:mt-6 pl-4 sm:pl-6 border-l-2 border-[#FF4A1C] py-2">
                  <p className={`text-h3 leading-snug font-normal ${isDark ? 'text-[#FAF8F5]' : 'text-[#0B0D12]'}`}>
                    {slide.quote}
                  </p>
                </div>
              )}

              {/* Bullet / Capability Highlights */}
              {slide.highlights && slide.highlights.length > 0 && (
                <div className="space-y-3.5 pt-1">
                  {slide.highlights.map((row, rIdx) => (
                    <div 
                      key={row.id || rIdx} 
                      className={`pl-4 sm:pl-5 border-l-2 ${isDark ? 'border-white/60' : 'border-[#0B0D12]'} py-1 space-y-0.5`}
                    >
                      <div className={`text-h4 ${isDark ? 'text-white' : 'text-[#0B0D12]'}`}>
                        {row.title}
                      </div>
                      <div className={`text-caption ${textMutedClass}`}>
                        {row.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollReveal>
          );

          return (
            <div 
              key={slide.id || index}
              ref={(el) => { slideRefs.current[index] = el; }}
              style={{
                minHeight: '100vh',
                zIndex: (index + 1) * 10,
              }}
              className={`sticky-wrapper absolute inset-0 w-full h-[100vh] min-h-screen ${bgClass} flex flex-col lg:flex-row overflow-hidden shadow-2xl ${
                index > 0 ? `border-t ${borderClass}` : ''
              }`}
            >
              {isImageLeft ? (
                <>
                  {visualSection}
                  {textSection}
                </>
              ) : (
                <>
                  {textSection}
                  {visualSection}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}



