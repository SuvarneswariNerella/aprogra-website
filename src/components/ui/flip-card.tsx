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
        'group relative h-[380px] w-full max-w-[340px] [perspective:2000px]',
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
            'transition-all duration-700',
            'group-hover:shadow-xl',
            'group-hover:border-primary/40',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Top header badge if number/tag present */}
          {(number || tag) && (
            <div className="absolute top-4 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
              <span 
                className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#0B0D12]/10 shadow-2xs"
                style={{ color }}
              >
                {number || tag}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A5E6E]">
                HOVER TO FLIP
              </span>
            </div>
          )}

          {/* Background subtle warm glow */}
          <div className="from-primary/5 absolute inset-0 bg-gradient-to-br via-transparent to-transparent pointer-events-none" />

          {/* Animated code blocks */}
          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <div className="relative flex h-[110px] w-[220px] flex-col items-center justify-center gap-2">
              {/* Code blocks animation */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-3 w-full rounded-sm',
                    'from-primary/20 via-primary/30 to-primary/20 bg-gradient-to-r',
                    'animate-[slideIn_2s_ease-in-out_infinite]',
                    'opacity-0',
                  )}
                  style={{
                    width: `${60 + ((i * 13) % 40)}%`,
                    animationDelay: `${i * 0.2}s`,
                    marginLeft: `${((i * 17) % 25)}%`,
                  }}
                />
              ))}

              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    'h-13 w-13 rounded-2xl',
                    'from-primary via-primary/90 to-primary/80 bg-gradient-to-br',
                    'flex items-center justify-center',
                    'shadow-primary/25 shadow-lg',
                    'animate-pulse',
                    'transition-all duration-500 group-hover:scale-110 group-hover:rotate-12',
                  )}
                  style={{
                    backgroundColor: color,
                  }}
                >
                  <IconComponentToUse className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-5 bg-gradient-to-t from-white via-white/90 to-transparent">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-h4 text-[#0B0D12] transition-all duration-500 ease-out group-hover:translate-y-[-4px] truncate">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-[#5A5E6E] transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative shrink-0">
                <div
                  className={cn(
                    'absolute inset-[-8px] rounded-lg transition-opacity duration-300',
                    'from-primary/20 via-primary/10 bg-gradient-to-br to-transparent',
                    'opacity-0 group-hover/icon:opacity-100',
                  )}
                />
                <Zap 
                  className="relative z-10 h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12" 
                  style={{ color }}
                />
              </div>
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-xs"
                  style={{ backgroundColor: color }}
                >
                  <Code2 className="h-4 w-4 text-white" />
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
