import React from 'react';
import { 
  Infinity, 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowUp, 
  ShieldCheck, 
  Globe2, 
  Cpu,
  Instagram,
  Youtube,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobalConfig, FooterColumnItem, FooterLinkItem, SocialLinkItem } from '@/lib/strapi';

export default function Footer() {
  const { footer } = useGlobalConfig();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayMode = footer.displayMode || 'logo_and_text';
  const showLogo = displayMode === 'logo_and_text' || displayMode === 'logo_only';
  const showText = displayMode === 'logo_and_text' || displayMode === 'text_only';

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5" />;
      case 'twitter':
      case 'x':
        return <Twitter className="w-3.5 h-3.5" />;
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5" />;
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5" />;
      case 'discord':
        return <MessageSquare className="w-3.5 h-3.5" />;
      default:
        return <Mail className="w-3.5 h-3.5" />;
    }
  };

  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'green':
      case 'emerald':
        return 'bg-emerald-100 text-emerald-700';
      case 'dark':
      case 'black':
        return 'bg-[#0B0D12] text-white';
      case 'blue':
        return 'bg-blue-100 text-blue-700';
      case 'purple':
        return 'bg-purple-100 text-purple-700';
      case 'orange':
      default:
        return 'bg-[#FF4A1C]/10 text-[#FF4A1C]';
    }
  };

  const columns = footer.columns || [];
  const socialLinks = footer.socialLinks || [];
  const legalLinks = footer.legalLinks || [];

  return (
    <footer 
      id="main-footer"
      className="bg-[#FAF8F5] border-t border-[#0B0D12]/10 text-[#0B0D12] pt-10 pb-6 sm:pt-12 sm:pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Decorative subtle top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#0B0D12]/15 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Directory Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-10 py-8 sm:py-10 border-b border-[#0B0D12]/10">
          
          {/* Brand & Overview Column (Span 4 on large screens) */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              {showLogo && (
                footer.logoUrl ? (
                  <img 
                    src={footer.logoUrl} 
                    alt={footer.brandTitle || 'Logo'} 
                    className="h-8 w-auto object-contain max-w-[140px]"
                  />
                ) : (
                  <div className="p-1.5 rounded-md bg-[#0B0D12] text-white transition-colors duration-200 group-hover:bg-[#FF4A1C] shadow-xs">
                    <Infinity className="w-4 h-4 text-white" />
                  </div>
                )
              )}
              {showText && (
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-[#0B0D12]">
                    {footer.brandTitle || 'Aprogra'}
                  </span>
                  {footer.brandSubtitle && (
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#5A5E6E] -mt-1">
                      {footer.brandSubtitle}
                    </span>
                  )}
                </div>
              )}
            </Link>

            <p className="text-xs sm:text-sm text-[#5A5E6E] leading-relaxed max-w-sm">
              {footer.description}
            </p>

            {/* Live Operational Status & Badges */}
            <div className="space-y-2 pt-0.5">
              {footer.statusText && (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#0B0D12]/10 text-[11px] font-medium text-[#0B0D12] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-semibold">{footer.statusText}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-[11px] text-[#5A5E6E]">
                {footer.badge1_text && (
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{footer.badge1_text}</span>
                  </span>
                )}
                {footer.badge1_text && footer.badge2_text && <span>•</span>}
                {footer.badge2_text && (
                  <span className="inline-flex items-center gap-1">
                    <Globe2 className="w-3.5 h-3.5 text-[#0B0D12]" />
                    <span>{footer.badge2_text}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Dynamic Sortable Footer Columns */}
          {columns.map((col: FooterColumnItem, colIndex: number) => {
            const isLast = colIndex === columns.length - 1;
            // Calculate column span based on total columns
            const spanClass = isLast ? 'lg:col-span-2' : 'lg:col-span-3';

            return (
              <div key={`footer-col-${col.id || col.title || colIndex}-${colIndex}`} className={`${spanClass} space-y-3`}>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0B0D12] flex items-center gap-1.5">
                  {colIndex === 0 && <Cpu className="w-3 h-3 text-[#FF4A1C]" />}
                  <span>{col.title}</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5A5E6E]">
                  {(col.links || []).map((link: FooterLinkItem, linkIndex: number) => {
                    const isExternal = link.isExternal || link.url.startsWith('http://') || link.url.startsWith('https://');

                    if (isExternal) {
                      return (
                        <li key={`col-${colIndex}-link-${link.id || link.label || link.url}-${linkIndex}`}>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-[#FF4A1C] transition-colors inline-flex items-center justify-between w-full group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                            {link.badge ? (
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getBadgeStyle(link.badgeColor)}`}>
                                {link.badge}
                              </span>
                            ) : (
                              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF4A1C]" />
                            )}
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={`col-${colIndex}-link-${link.id || link.label || link.url}-${linkIndex}`}>
                        <Link 
                          to={link.url} 
                          className="hover:text-[#FF4A1C] transition-colors inline-flex items-center justify-between w-full group"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                          {link.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getBadgeStyle(link.badgeColor)}`}>
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* If this is the last column (e.g. Company), show Social Links under it */}
                {isLast && socialLinks.length > 0 && (
                  <div className="pt-2">
                    <span className="block text-[11px] font-semibold text-[#0B0D12] mb-2">Follow Engineering</span>
                    <div className="flex items-center gap-1.5">
                      {socialLinks.map((s: SocialLinkItem, sIndex: number) => (
                        <a 
                          key={`social-${s.id || s.platform || s.url}-${sIndex}`}
                          href={s.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label={s.label || s.platform}
                          title={s.label || s.platform}
                          className="w-7 h-7 rounded-md bg-white border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center hover:bg-[#0B0D12] hover:text-white hover:border-[#0B0D12] transition-all shadow-2xs"
                        >
                          {getSocialIcon(s.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>
        
        {/* Bottom Legal, Global Locations & Back To Top */}
        <div className="pt-5 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#5A5E6E]">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-1.5 gap-x-4 sm:gap-x-5">
            <p>{footer.copyrightText || `© ${new Date().getFullYear()} Aprogra Technologies Inc. All rights reserved.`}</p>
            {legalLinks.length > 0 && <span className="hidden sm:inline text-[#0B0D12]/20">•</span>}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-medium">
              {legalLinks.map((l: FooterLinkItem, lIdx: number) => {
                const isExt = l.isExternal || l.url.startsWith('http://') || l.url.startsWith('https://');
                if (isExt) {
                  return (
                    <a key={`legal-ext-${l.id || l.label || l.url}-${lIdx}`} href={l.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#0B0D12] transition-colors">
                      {l.label}
                    </a>
                  );
                }
                return (
                  <Link key={`legal-int-${l.id || l.label || l.url}-${lIdx}`} to={l.url} className="hover:text-[#0B0D12] transition-colors">
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] sm:text-[11px] text-[#5A5E6E]">Enterprise High-Availability</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#0B0D12]/15 text-[11px] font-semibold text-[#0B0D12] hover:bg-[#0B0D12] hover:text-white hover:border-[#0B0D12] transition-all shadow-2xs cursor-pointer group"
              aria-label="Back to top"
            >
              <span>{footer.backToTopText || 'Back to top'}</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
