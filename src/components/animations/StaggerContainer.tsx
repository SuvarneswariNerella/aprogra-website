import React from 'react';
import useStaggerReveal, { StaggerRevealOptions } from '@/hooks/useStaggerReveal';
import { cn } from '@/lib/utils';

interface StaggerContainerProps extends StaggerRevealOptions {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function StaggerContainer({
  children,
  className,
  as: Component = 'div',
  selector,
  stagger,
  y,
  x,
  duration,
  delay,
  start,
  ease,
  once,
  ...rest
}: StaggerContainerProps) {
  const containerRef = useStaggerReveal<HTMLDivElement>({
    selector,
    stagger,
    y,
    x,
    duration,
    delay,
    start,
    ease,
    once,
  });

  const Tag = Component as any;

  return (
    <Tag ref={containerRef} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
