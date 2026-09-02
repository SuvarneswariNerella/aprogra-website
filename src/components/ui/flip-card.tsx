import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Copy, Rocket, Zap, LucideIcon } from 'lucide-react';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
  tag?: string;
  number?: string;
  icon?: LucideIcon | React.ElementType;
  iconMediaUrl?: string;
  coverImageUrl?: string;
  actionText?: string;
  onActionClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export default function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  color = '#ff2e88',
  tag,
  number,
  icon: CustomIcon,
  iconMediaUrl,
  coverImageUrl,
  actionText = 'Start Building',
  onActionClick,
  className,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComponentToUse = CustomIcon || Rocket;

  return (
    <div
      style={{
        ['--primary' as string]: color ?? '#2563eb',
      } as React.CSSProperties}
      className={cn(
        'group relative h-[400px] w-full max-w-[340px] [perspective:2000px]',
        className
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="region"
      aria-label={`${title} - Hover or focus to flip`}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-white',
            'border border-[#0B0D12]/15',
            'shadow-md',
            'transition-all duration-700 flex flex-col justify-between',
            'group-hover:shadow-xl',
            'group-hover:border-primary/40',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Top image preview area */}
          <div className="relative w-full h-[220px] overflow-hidden bg-[#0B0D12]/5 shrink-0">
            {coverImageUrl ? (
              <img
                src={coverImageUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0B0D12]/5 to-[#0B0D12]/10">
                <IconComponentToUse className="w-12 h-12 text-[#0B0D12]/30" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Top header badge if number/tag present */}
            <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              {(number || tag) && (
                <span 
                  className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xs"
                >
                  {number || tag}
                </span>
              )}
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 backdrop-blur-md text-[#0B0D12] font-semibold">
                HOVER TO FLIP
              </span>
            </div>

            {/* Small icon badge in bottom left of image */}
            <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md overflow-hidden"
                style={{ backgroundColor: color }}
              >
                {iconMediaUrl ? (
                  <img src={iconMediaUrl} alt={title} className="w-4 h-4 object-contain" />
                ) : (
                  <IconComponentToUse className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </div>

          {/* Bottom content area */}
          <div className="p-5 flex-1 flex flex-col justify-between bg-white">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#0B0D12] tracking-tight leading-snug group-hover:text-[#FF4A1C] transition-colors truncate">
                {title}
              </h3>
              <p className="line-clamp-2 text-xs sm:text-sm text-[#5A5E6E] leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-[#0B0D12]/8 flex items-center justify-between text-xs font-mono text-[#5A5E6E]">
              <span className="text-[11px] font-semibold text-[#0B0D12]">
                {features.length} Deliverables Included
              </span>
              <span className="flex items-center gap-1 font-bold text-[#0B0D12] group-hover:translate-x-0.5 transition-transform" style={{ color }}>
                <span>Inspect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-5',
            'bg-white',
            'border border-[#0B0D12]/15',
            'shadow-md',
            'flex flex-col justify-between',
            'transition-all duration-700',
            'group-hover:shadow-xl',
            'group-hover:border-primary/40',
            !isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background subtle glow */}
          <div className="from-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex-1 space-y-4">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-xs overflow-hidden"
                  style={{ backgroundColor: color }}
                >
                  {iconMediaUrl ? (
                    <img src={iconMediaUrl} alt={title} className="h-4 w-4 object-contain" />
                  ) : (
                    <Code2 className="h-4 w-4 text-white" />
                  )}
                </div>
                <h3 className="text-h4 text-[#0B0D12] transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-2 text-xs sm:text-sm tracking-tight text-[#5A5E6E] transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                {description}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A5E6E] block font-semibold">
                CORE DELIVERABLES
              </span>
              {features.map((feature, index) => {
                const icons = [Copy, Code2, Rocket, Zap];
                const IconComp = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-xs text-[#0B0D12] transition-all duration-500"
                    style={{
                      transform: isFlipped
                        ? 'translateX(0)'
                        : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 80 + 150}ms`,
                    }}
                  >
                    <div 
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: `${color}18` }}
                    >
                      <IconComp className="h-3 w-3" style={{ color }} />
                    </div>
                    <span className="font-medium font-mono text-[11px] sm:text-xs truncate">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-[#0B0D12]/10 pt-3">
            <button
              type="button"
              onClick={onActionClick}
              className={cn(
                'group/start relative w-full',
                'flex items-center justify-between',
                'rounded-lg p-2.5',
                'transition-all duration-300',
                'bg-[#FAF8F5]',
                'hover:bg-[#F4F1EA]',
                'hover:scale-[1.02] hover:cursor-pointer',
                'border border-[#0B0D12]/10',
              )}
            >
              <span 
                className="text-xs sm:text-sm font-semibold transition-colors duration-300 font-mono uppercase tracking-wider"
                style={{ color }}
              >
                {actionText}
              </span>
              <div className="group/icon relative">
                <ArrowRight 
                  className="relative z-10 h-4 w-4 transition-all duration-300 group-hover/start:translate-x-1" 
                  style={{ color }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
