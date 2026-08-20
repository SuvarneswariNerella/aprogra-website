import React from 'react';

export interface ScrollSnapProviderProps {
  children: React.ReactNode;
}

/**
 * ScrollSnapProvider wrapper.
 * Section snapping and forced scrolling to next section have been removed 
 * for clean, natural, unrestricted site-wide scrolling.
 */
export default function ScrollSnapProvider({ children }: ScrollSnapProviderProps) {
  return <>{children}</>;
}

export const ScrollSnapManager = ScrollSnapProvider;
