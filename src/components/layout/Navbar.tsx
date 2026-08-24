import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Infinity, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGlobalConfig } from '@/lib/strapi';

export default function Navbar() {
  const location = useLocation();
  const { header } = useGlobalConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = header.navLinks || [];
  const displayMode = header.displayMode || 'logo_and_text';
  const showLogo = displayMode === 'logo_and_text' || displayMode === 'logo_only';
  const showText = displayMode === 'logo_and_text' || displayMode === 'text_only';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200 px-6 md:px-12 h-16 md:h-20 flex items-center',
        scrolled || mobileMenuOpen
          ? 'bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#0B0D12]/10 shadow-xs'
          : 'bg-[#F4F1EA]/60 backdrop-blur-xs border-b border-transparent'
      )}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo Link */}
        <Link to="/" className="flex items-center gap-2.5 group">
          {showLogo && (
            header.logoUrl ? (
              <img 
                src={header.logoUrl} 
                alt={header.siteTitle || 'Logo'} 
                className="h-7 w-auto object-contain max-w-[140px] transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <div className="p-1 rounded bg-[#0B0D12] text-white transition-transform duration-200 group-hover:bg-[#FF4A1C]">
                <Infinity className="w-5 h-5 text-white transition-colors duration-200" />
              </div>
            )
          )}
          {showText && (
            <span className="text-lg font-bold tracking-tight text-[#0B0D12]">
              {header.siteTitle || 'Aprogra'}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isExternal = link.isExternal || link.url.startsWith('http://') || link.url.startsWith('https://');
            const isActive = !isExternal && (location.pathname === link.url || (link.url !== '/' && location.pathname.startsWith(link.url)));

            if (isExternal) {
              return (
                <a
                  key={link.url + link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nav transition-colors relative py-1 text-[#5A5E6E] hover:text-[#FF4A1C]"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.url + link.label}
                to={link.url}
                className={cn(
                  'text-nav transition-colors relative py-1 hover:text-[#FF4A1C]',
                  isActive ? 'text-[#0B0D12] font-bold' : 'text-[#5A5E6E]'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4A1C]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded text-[#0B0D12] hover:bg-[#0B0D12]/5 transition-colors cursor-pointer border border-[#0B0D12]/10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF4A1C]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 px-6 py-4 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#0B0D12]/15 shadow-xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isExternal = link.isExternal || link.url.startsWith('http://') || link.url.startsWith('https://');
            const isActive = !isExternal && (location.pathname === link.url || (link.url !== '/' && location.pathname.startsWith(link.url)));

            if (isExternal) {
              return (
                <a
                  key={link.url + link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between text-[#0B0D12] hover:bg-[#0B0D12]/5"
                >
                  <span>{link.label}</span>
                </a>
              );
            }

            return (
              <Link
                key={link.url + link.label}
                to={link.url}
                className={cn(
                  'px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between',
                  isActive
                    ? 'bg-[#0B0D12] text-white'
                    : 'text-[#0B0D12] hover:bg-[#0B0D12]/5'
                )}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C]" />}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
