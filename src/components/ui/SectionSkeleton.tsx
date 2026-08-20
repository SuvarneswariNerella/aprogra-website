import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface SectionSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'hero' | 'grid' | 'full';
  aspectRatio?: string;
}

export function SectionSkeleton({
  variant = 'card',
  aspectRatio = 'aspect-video',
  className,
  ...props
}: SectionSkeletonProps) {
  if (variant === 'hero') {
    return (
      <div
        className={cn(
          'w-full min-h-[60vh] rounded-2xl bg-navy-light/40 border border-white/5 p-8 flex flex-col justify-end relative overflow-hidden animate-pulse',
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        <div className="h-6 w-32 bg-white/10 rounded-full mb-4" />
        <div className="h-12 w-3/4 bg-white/10 rounded-lg mb-4" />
        <div className="h-4 w-1/2 bg-white/5 rounded-md" />
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6 w-full', className)} {...props}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-navy-light/30 border border-white/5 p-6 flex flex-col gap-4 relative overflow-hidden animate-pulse"
          >
            <div className="h-40 w-full bg-white/5 rounded-lg" />
            <div className="h-6 w-3/4 bg-white/10 rounded-md" />
            <div className="h-4 w-full bg-white/5 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full rounded-xl bg-navy-light/30 border border-white/5 relative overflow-hidden animate-pulse',
        aspectRatio,
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
      <div className="p-6 flex flex-col gap-3 justify-end h-full">
        <div className="h-5 w-1/3 bg-white/10 rounded-md" />
        <div className="h-4 w-2/3 bg-white/5 rounded-md" />
      </div>
    </div>
  );
}

export interface AssetSkeletonLoaderProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
}

/**
 * Image / Media asset loader with built-in shimmer skeleton to prevent layout shift during section snapping
 */
export function AssetSkeletonLoader({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = 'aspect-video',
}: AssetSkeletonLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-navy-light/40 border border-white/10', aspectRatio, containerClassName)}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-navy-light/60 animate-pulse">
          <div className="w-10 h-10 rounded-full border-2 border-electric/30 border-t-electric animate-spin mb-2" />
          <div className="h-3 w-24 bg-white/10 rounded-full" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </div>
  );
}
