import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useServicesStore, CHAPTERS_DATA } from '@/store/servicesStore';

import ThreeInfinityCanvas from './ThreeInfinityCanvas';
import ServicesNavigationDots from './ServicesNavigationDots';
import ServicesOpeningIntro from './ServicesOpeningIntro';
import ChapterSection from './ChapterSection';
import ServicesClosingConvergence from './ServicesClosingConvergence';
import ServicesReducedMotionFallback from './ServicesReducedMotionFallback';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const { 
    currentChapter, 
    setCurrentChapter, 
    setScrollProgress, 
    setChapterProgress, 
    setMousePosition 
  } = useServicesStore();

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Mouse Parallax Tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition(normalizedX, normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setMousePosition]);

  // GSAP & Lenis Scroll-Driven Timeline
  useEffect(() => {
    if (isReducedMotion) return;

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Master ScrollTrigger on the entire story container
    const totalScenes = 7; // Ch 0 to Ch 6
    const scenes = [0, 1, 2, 3, 4, 5, 6];

    scenes.forEach((sceneIndex) => {
      const sceneElem = document.getElementById(`chapter-scene-${sceneIndex}`);
      if (!sceneElem) return;

      ScrollTrigger.create({
        trigger: sceneElem,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setCurrentChapter(sceneIndex),
        onEnterBack: () => setCurrentChapter(sceneIndex),
        onUpdate: (self) => {
          if (self.isActive) {
            setChapterProgress(self.progress);
          }
        }
      });
    });

    // Overall Progress
    const mainTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isReducedMotion, setCurrentChapter, setScrollProgress, setChapterProgress]);

  if (isReducedMotion) {
    return <ServicesReducedMotionFallback />;
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#070913] text-white selection:bg-[#FF4A1C] selection:text-white"
    >
      {/* 1. LAYER 1: Parallax Subtle Dotted Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* 2. LAYER 2: Sticky 3D WebGL Infinity Canvas (Midground 3D Motif) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
        <ThreeInfinityCanvas />
      </div>

      {/* 3. LAYER 3: Fixed Story Progression Navigator */}
      <ServicesNavigationDots />

      {/* 4. LAYER 4: Foreground Scroll-Driven Chapter Narrative */}
      <div ref={storyTrackRef} className="relative z-20">
        
        {/* CHAPTER 00: OPENING GENESIS */}
        <ServicesOpeningIntro 
          onScrollDown={() => {
            const ch1 = document.getElementById('chapter-scene-1');
            ch1?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* CHAPTERS 01-05: CORE SERVICES */}
        {CHAPTERS_DATA.map((chapter) => (
          <ChapterSection 
            key={chapter.id}
            chapter={chapter}
            isActive={currentChapter === chapter.id}
          />
        ))}

        {/* CHAPTER 06: CONVERGENCE OUTRO */}
        <ServicesClosingConvergence />

      </div>
    </div>
  );
}
