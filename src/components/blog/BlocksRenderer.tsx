import React, { useState } from 'react';
import { getStrapiMediaUrl } from '@/lib/strapi';
import { Copy, Check, ExternalLink, Quote } from 'lucide-react';

interface TextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkChild {
  type: 'link';
  url: string;
  children: TextChild[];
}

type InlineNode = TextChild | LinkChild;

interface BlockNode {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code' | 'image';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: 'ordered' | 'unordered';
  image?: {
    url?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
  };
  children?: (BlockNode | InlineNode)[];
}

interface BlocksRendererProps {
  content: BlockNode[] | string | any;
  className?: string;
}

/**
 * Helper to render inline text nodes with rich formatting (bold, italic, links, code)
 */
function renderInlineText(node: InlineNode, idx: number): React.ReactNode {
  if (node.type === 'link') {
    return (
      <a
        key={idx}
        href={node.url}
        target={node.url.startsWith('http') ? '_blank' : undefined}
        rel={node.url.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-[#FF4A1C] hover:text-[#0B0D12] underline underline-offset-2 font-medium inline-flex items-center gap-0.5 transition-colors"
      >
        {node.children ? node.children.map((c, cIdx) => renderInlineText(c, cIdx)) : node.url}
        {node.url.startsWith('http') && <ExternalLink className="w-3 h-3 inline-block ml-0.5 opacity-70" />}
      </a>
    );
  }

  if (node.type === 'text') {
    let element: React.ReactNode = node.text;

    if (node.code) {
      element = (
        <code key={idx} className="px-1.5 py-0.5 mx-0.5 rounded bg-[#0B0D12]/8 text-[#0B0D12] font-mono text-xs border border-[#0B0D12]/10">
          {element}
        </code>
      );
    }
    if (node.bold) {
      element = <strong key={idx} className="font-bold text-[#0B0D12]">{element}</strong>;
    }
    if (node.italic) {
      element = <em key={idx} className="italic">{element}</em>;
    }
    if (node.underline) {
      element = <u key={idx} className="underline underline-offset-2">{element}</u>;
    }
    if (node.strikethrough) {
      element = <s key={idx} className="line-through opacity-75">{element}</s>;
    }

    return <React.Fragment key={idx}>{element}</React.Fragment>;
  }

  return null;
}

/**
 * Code Block with Copy Button
 */
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden border border-[#0B0D12]/20 bg-[#0B0D12] text-[#F4F1EA] shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1A1D24] border-b border-white/10 text-xs font-mono text-white/60">
        <span>Code Snippet</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Single Block Node Renderer
 */
function renderBlock(block: BlockNode, index: number): React.ReactNode {
  switch (block.type) {
    case 'heading': {
      const headingText = block.children ? block.children.map((c, i) => renderInlineText(c as InlineNode, i)) : '';
      switch (block.level) {
        case 1:
          return (
            <h1 key={index} className="text-2xl sm:text-3xl font-bold text-[#0B0D12] mt-8 mb-4 tracking-tight">
              {headingText}
            </h1>
          );
        case 2:
          return (
            <h2 key={index} className="text-xl sm:text-2xl font-bold text-[#0B0D12] mt-8 mb-3 tracking-tight border-b border-[#0B0D12]/10 pb-2">
              {headingText}
            </h2>
          );
        case 3:
          return (
            <h3 key={index} className="text-lg sm:text-xl font-bold text-[#0B0D12] mt-6 mb-2 tracking-tight">
              {headingText}
            </h3>
          );
        case 4:
          return (
            <h4 key={index} className="text-base sm:text-lg font-semibold text-[#0B0D12] mt-4 mb-2">
              {headingText}
            </h4>
          );
        case 5:
        case 6:
          return (
            <h5 key={index} className="text-sm sm:text-base font-semibold text-[#0B0D12] mt-3 mb-1">
              {headingText}
            </h5>
          );
        default:
          return <h2 key={index} className="text-xl font-bold text-[#0B0D12] mt-6 mb-3">{headingText}</h2>;
      }
    }

    case 'paragraph': {
      // Check if paragraph is empty (just a line break)
      const hasContent = block.children && block.children.some((c: any) => c.text && c.text.trim().length > 0);
      if (!hasContent) {
        return <div key={index} className="h-3" />;
      }
      return (
        <p key={index} className="text-[#0B0D12]/85 text-sm sm:text-base leading-relaxed my-3">
          {block.children?.map((c, i) => renderInlineText(c as InlineNode, i))}
        </p>
      );
    }

    case 'quote': {
      return (
        <blockquote key={index} className="my-6 p-4 sm:p-5 rounded-r-lg bg-white border-l-4 border-[#FF4A1C] shadow-xs space-y-2">
          <Quote className="w-5 h-5 text-[#FF4A1C]/60 mb-1" />
          <div className="text-sm sm:text-base italic text-[#0B0D12] font-serif leading-relaxed">
            {block.children?.map((c, i) => renderInlineText(c as InlineNode, i))}
          </div>
        </blockquote>
      );
    }

    case 'list': {
      const isOrdered = block.format === 'ordered';
      const ListTag = isOrdered ? 'ol' : 'ul';
      return (
        <ListTag
          key={index}
          className={`my-4 pl-6 space-y-2 text-sm sm:text-base text-[#0B0D12]/90 ${
            isOrdered ? 'list-decimal' : 'list-disc marker:text-[#FF4A1C]'
          }`}
        >
          {block.children?.map((item: any, i: number) => (
            <li key={i} className="leading-relaxed pl-1">
              {item.children?.map((c: any, cIdx: number) => renderInlineText(c, cIdx))}
            </li>
          ))}
        </ListTag>
      );
    }

    case 'code': {
      const rawCode = block.children?.map((c: any) => c.text || '').join('\n') || '';
      return <CodeBlock key={index} code={rawCode} />;
    }

    case 'image': {
      const imgObj = block.image || (block as any);
      const imageUrl =
        getStrapiMediaUrl(imgObj) ||
        imgObj.url ||
        (typeof block.image === 'string' ? block.image : '') ||
        '';
      if (!imageUrl) return null;

      const caption = block.image?.caption || (block as any).caption || '';
      const altText = block.image?.alternativeText || (block as any).alternativeText || caption || 'Article illustration';

      return (
        <figure key={index} className="my-8 space-y-2">
          <div className="overflow-hidden rounded-xl border border-[#0B0D12]/10 bg-[#0B0D12]/5 shadow-sm">
            <img
              src={imageUrl}
              alt={altText}
              className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-500"
              loading="lazy"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-xs text-[#5A5E6E] font-mono italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}

/**
 * Universal BlocksRenderer
 * Accepts Strapi Blocks AST array, raw string / HTML / Markdown, or legacy object formats.
 */
export default function BlocksRenderer({ content, className = '' }: BlocksRendererProps) {
  if (!content) {
    return <div className="text-[#5A5E6E] italic text-sm">No content available.</div>;
  }

  // 1. If it's a Strapi Blocks AST array
  if (Array.isArray(content)) {
    return (
      <article className={`prose-content space-y-1 font-sans ${className}`}>
        {content.map((block, idx) => renderBlock(block, idx))}
      </article>
    );
  }

  // 2. If it's a raw string / markdown
  if (typeof content === 'string') {
    const paragraphs = content.split('\n\n');
    return (
      <article className={`space-y-4 font-sans text-sm sm:text-base leading-relaxed text-[#0B0D12]/85 ${className}`}>
        {paragraphs.map((p, idx) => {
          const trimmed = p.trim();
          if (trimmed.startsWith('# ')) {
            return <h1 key={idx} className="text-2xl font-bold text-[#0B0D12] mt-6 mb-2">{trimmed.replace('# ', '')}</h1>;
          }
          if (trimmed.startsWith('## ')) {
            return <h2 key={idx} className="text-xl font-bold text-[#0B0D12] mt-5 mb-2">{trimmed.replace('## ', '')}</h2>;
          }
          if (trimmed.startsWith('### ')) {
            return <h3 key={idx} className="text-lg font-semibold text-[#0B0D12] mt-4 mb-1">{trimmed.replace('### ', '')}</h3>;
          }
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const items = trimmed.split('\n').map(i => i.replace(/^[-*]\s+/, ''));
            return (
              <ul key={idx} className="list-disc pl-6 space-y-1 marker:text-[#FF4A1C]">
                {items.map((it, iIdx) => <li key={iIdx}>{it}</li>)}
              </ul>
            );
          }
          return <p key={idx}>{trimmed}</p>;
        })}
      </article>
    );
  }

  // 3. Fallback for legacy structured object { introduction, keyPoints, ... }
  return (
    <div className={`space-y-4 ${className}`}>
      {content.introduction && (
        <p className="text-base text-[#0B0D12] bg-white p-4 rounded-lg border-l-4 border-[#FF4A1C]">
          {content.introduction}
        </p>
      )}
      {Array.isArray(content.keyPoints) && content.keyPoints.length > 0 && (
        <ul className="list-disc pl-6 space-y-1 marker:text-[#FF4A1C]">
          {content.keyPoints.map((pt: string, idx: number) => <li key={idx}>{pt}</li>)}
        </ul>
      )}
      {content.codeSnippet && <CodeBlock code={content.codeSnippet} />}
      {content.conclusion && <p className="text-sm text-[#5A5E6E]">{content.conclusion}</p>}
    </div>
  );
}
