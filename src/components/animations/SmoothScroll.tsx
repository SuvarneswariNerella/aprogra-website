import ScrollSnapProvider from './ScrollSnapProvider';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <ScrollSnapProvider>{children}</ScrollSnapProvider>;
}

