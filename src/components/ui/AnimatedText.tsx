import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  once?: boolean;
}

export default function AnimatedText({ text, className, el = 'p', once = true }: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const Tag = el;

  useEffect(() => {
    const elNode = textRef.current;
    if (!elNode) return;

    // Split text into words (simple split for demo, could use SplitText in production)
    const words = text.split(' ');
    elNode.innerHTML = '';
    
    words.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'inline-block opacity-0 translate-y-4';
      span.innerHTML = word + '&nbsp;';
      elNode.appendChild(span);
    });

    const ctx = gsap.context(() => {
      gsap.to(elNode.children, {
        scrollTrigger: {
          trigger: elNode,
          start: 'top 95%',
          once: once,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
      });
    }, elNode);

    return () => ctx.revert();
  }, [text, once]);

  return (
    <Tag ref={textRef as any} className={cn('overflow-hidden', className)}>
      {text}
    </Tag>
  );
}
