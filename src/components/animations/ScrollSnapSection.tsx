import React from 'react';
import { cn } from '@/lib/utils';

export interface ScrollSnapSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

export default function ScrollSnapSection({
  children,
  className,
  id,
  as: Component = 'section',
  ...props
}: ScrollSnapSectionProps) {
  const Tag = Component as any;

  return (
    <Tag
      id={id}
      className={cn(
        'w-full flex flex-col justify-center relative overflow-hidden py-12 md:py-20',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
