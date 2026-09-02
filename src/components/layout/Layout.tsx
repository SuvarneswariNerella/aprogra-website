import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollSnapProvider from '../animations/ScrollSnapProvider';
import PageTransition from '../animations/PageTransition';
import Cursor from '../ui/Cursor';
import { AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DraftBanner from '../DraftBanner';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Disable native scroll restoration to force scroll to top on page reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Aggressively force scroll to top after a tiny delay to override browser restoration
    setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);
    
    (window as any).lenis = lenis;

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Scroll to top immediately on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return (
    <ScrollSnapProvider>
      <Cursor />
      <DraftBanner />
      <div className="min-h-screen flex flex-col relative selection:bg-[#FF4A1C] selection:text-white bg-[#F4F1EA]">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ScrollSnapProvider>
  );
}
