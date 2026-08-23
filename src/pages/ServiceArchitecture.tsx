import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Layers, LayoutGrid, Zap, Code2, Cpu, PenTool, Cloud, HelpCircle, ImageIcon } from 'lucide-react';
import { architectureData } from '@/data/architectureContent';
import { useServiceDetail, getStrapiMediaUrl } from '@/lib/strapi';
import mermaid from 'mermaid';

const ICON_FALLBACKS: Record<string, React.ElementType> = {
  'web-app': Code2,
  'ai-agents': Cpu,
  'saas-product': Layers,
  'design-systems': PenTool,
  'cloud-devops': Cloud,
};

export default function ServiceArchitecture() {
  const { id } = useParams<{ id: string }>();
  const { service: strapiService, isLoading } = useServiceDetail(id);
  
  // Fallback to static architectureData for rock-solid backward compatibility
  const fallbackData = id ? architectureData[id] : null;
  const mermaidRef = useRef<HTMLDivElement>(null);

  const title = strapiService?.title || fallbackData?.title || '';
  const subtitle = strapiService?.subheading || fallbackData?.subtitle || '';
  const heroDescription = strapiService?.heroDescription || strapiService?.shortDescription || fallbackData?.heroDescription || '';
  const accentColor = strapiService?.accentColor || fallbackData?.accentColor || '#3B82F6';
  const technologies = (strapiService?.technologies && strapiService.technologies.length > 0)
    ? strapiService.technologies
    : fallbackData?.technologies || [];
  const architecturePoints = (strapiService?.architecturePoints && strapiService.architecturePoints.length > 0)
    ? strapiService.architecturePoints
    : fallbackData?.architecturePoints || [];
  const mermaidGraph = strapiService?.mermaidGraph || fallbackData?.mermaidGraph || '';
  const faqs = strapiService?.faqs || [];
  const cta = strapiService?.cta;
  const gallery = strapiService?.gallery || [];
  const serviceIconUrl = getStrapiMediaUrl(strapiService?.iconMedia);

  useEffect(() => {
    if (mermaidGraph && mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'base',
        themeVariables: {
          primaryColor: '#ffffff',
          primaryTextColor: '#0B0D12',
          primaryBorderColor: '#e5e7eb',
          lineColor: '#9ca3af',
          secondaryColor: '#f3f4f6',
          tertiaryColor: '#f9fafb',
          fontFamily: 'Inter, sans-serif'
        },
        securityLevel: 'loose',
      });
      mermaid.contentLoaded();
    }
  }, [mermaidGraph, strapiService]);

  if (!isLoading && !strapiService && !fallbackData) {
    return <Navigate to="/services" replace />;
  }

  const FallbackIcon = (id && ICON_FALLBACKS[id]) || fallbackData?.icon || Zap;

  return (
    <div className="w-full bg-[#FAF8F5] text-[#0B0D12] min-h-screen pt-24 pb-20 selection:bg-[#0B0D12] selection:text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-mono font-medium text-[#5A5E6E] mb-12">
          <Link to="/services" className="hover:text-[#0B0D12] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Services</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-[#0B0D12]/20" />
          <span className="text-[#0B0D12]">Architecture</span>
          {title && (
            <>
              <ChevronRight className="w-4 h-4 text-[#0B0D12]/20" />
              <span className="text-[#5A5E6E] truncate">{title}</span>
            </>
          )}
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start mb-20">
          <div className="space-y-6">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor, borderColor: `${accentColor}30` }}
            >
              {serviceIconUrl ? (
                <img 
                  src={serviceIconUrl} 
                  alt={title} 
                  className="w-4 h-4 object-contain" 
                />
              ) : (
                <FallbackIcon className="w-4 h-4" />
              )}
              <span>{title.toUpperCase()}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-[#5A5E6E] font-medium leading-relaxed max-w-xl">
              {subtitle}
            </p>
            
            <p className="text-base sm:text-lg text-[#0B0D12]/70 leading-relaxed max-w-xl border-l-4 pl-4" style={{ borderColor: accentColor }}>
              {heroDescription}
            </p>

            {cta && (
              <div className="pt-2">
                <Link
                  to={cta.url || '/contact'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B0D12] hover:bg-[#FF4A1C] text-white font-mono text-xs font-bold tracking-wide uppercase transition-all shadow-sm"
                >
                  <span>{cta.label || 'Start a Project Brief'}</span>
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#0B0D12]/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div 
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform duration-700 group-hover:scale-150" 
              style={{ backgroundColor: accentColor }} 
            />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest text-[#0B0D12]/40 pb-4 border-b border-[#0B0D12]/10">
                <LayoutGrid className="w-4 h-4" />
                <span>Technology Stack</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-sm font-bold text-[#0B0D12] uppercase tracking-wider">{tech.category}</h3>
                    <ul className="space-y-2">
                      {tech.items.map((item: any, itemIdx: number) => {
                        const itemName = typeof item === 'string' ? item : (item.name || item.item || '');
                        return (
                          <li key={itemIdx} className="flex items-center gap-2 text-sm text-[#5A5E6E]">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                            <span>{itemName}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ARCHITECTURE DIAGRAM SECTION */}
        {mermaidGraph && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display">System Architecture</h2>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0B0D12]/10 text-xs font-mono font-medium text-[#5A5E6E]">
                <Layers className="w-3.5 h-3.5" />
                <span>Flow Diagram</span>
              </div>
            </div>
            
            <div className="w-full bg-white rounded-3xl border border-[#0B0D12]/10 shadow-sm p-6 sm:p-12 overflow-x-auto overflow-y-hidden flex items-center justify-center min-h-[400px]">
              <div 
                ref={mermaidRef} 
                className="mermaid"
              >
                {mermaidGraph}
              </div>
            </div>
          </div>
        )}

        {/* ARCHITECTURE HIGHLIGHTS / CORE CAPABILITIES */}
        {architecturePoints.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display mb-8">Core Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {architecturePoints.map((point: any, idx: number) => {
                const PointIcon = point.icon || Zap;
                const pointIconUrl = getStrapiMediaUrl(point.iconMedia);
                return (
                  <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0B0D12]/10 shadow-sm hover:shadow-md transition-shadow group cursor-default">
                    <div 
                      className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-transform group-hover:-translate-y-1 overflow-hidden"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {pointIconUrl ? (
                        <img src={pointIconUrl} alt={point.title} className="w-6 h-6 object-contain" />
                      ) : typeof PointIcon === 'function' ? (
                        <PointIcon className="w-6 h-6" />
                      ) : (
                        <Zap className="w-6 h-6" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#0B0D12] mb-3">{point.title}</h3>
                    <p className="text-sm text-[#5A5E6E] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GALLERY SECTION (IF CONFIGURED) */}
        {gallery && gallery.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-[#FF4A1C]" />
                <span>Architecture Gallery</span>
              </h2>
              <span className="text-xs font-mono text-[#5A5E6E]">{gallery.length} verified artifacts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item: any, idx: number) => {
                const imgUrl = getStrapiMediaUrl(item);
                if (!imgUrl) return null;
                return (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-[#0B0D12]/10 shadow-2xs group">
                    <img 
                      src={imgUrl} 
                      alt={`${title} schematic ${idx + 1}`} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQS SECTION (IF CONFIGURED) */}
        {faqs && faqs.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display mb-8 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#FF4A1C]" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4 max-w-4xl">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-[#0B0D12]/10 shadow-2xs space-y-2">
                  <h3 className="text-base font-bold text-[#0B0D12]">{faq.question}</h3>
                  <p className="text-sm text-[#5A5E6E] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
