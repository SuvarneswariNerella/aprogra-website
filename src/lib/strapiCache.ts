import { useState, useEffect } from 'react';

// ============================================================================
// CLIENT-SIDE SWR CACHE & PREFETCH ENGINE
// ============================================================================

const CACHE_PREFIX = 'aprogra_cms_cache_';
const memoryCache = new Map<string, any>();
const inFlightRequests = new Map<string, Promise<any>>();
const cacheSubscribers = new Map<string, Set<(data: any) => void>>();

export function getCachedData<T>(key: string, fallback?: T): { data: T | undefined; isCached: boolean } {
  // 1. Check in-memory cache
  if (memoryCache.has(key)) {
    return { data: memoryCache.get(key) as T, isCached: true };
  }

  // 2. Check localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(CACHE_PREFIX + key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed !== null && parsed !== undefined) {
          memoryCache.set(key, parsed);
          return { data: parsed as T, isCached: true };
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. storage disabled / quota exceeded)
    }
  }

  return { data: fallback, isCached: false };
}

export function setCachedData<T>(key: string, data: T): void {
  if (data === null || data === undefined) return;
  
  memoryCache.set(key, data);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
    } catch {
      // Ignore localStorage quota errors
    }
  }

  // Broadcast to all active subscribers for this key
  const subs = cacheSubscribers.get(key);
  if (subs) {
    subs.forEach((cb) => {
      try {
        cb(data);
      } catch (err) {
        console.warn(`[CacheSubscriber] Error notifying subscriber for key "${key}":`, err);
      }
    });
  }
}

export function subscribeToCache<T>(key: string, callback: (data: T) => void): () => void {
  if (!cacheSubscribers.has(key)) {
    cacheSubscribers.set(key, new Set());
  }
  const subs = cacheSubscribers.get(key)!;
  subs.add(callback);

  return () => {
    subs.delete(callback);
    if (subs.size === 0) {
      cacheSubscribers.delete(key);
    }
  };
}

export function clearStrapiCache(): void {
  memoryCache.clear();
  inFlightRequests.clear();
  if (typeof window !== 'undefined') {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(CACHE_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {}
  }
}

/**
 * Deduplicated fetcher with automatic caching
 */
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  fallbackData?: T
): Promise<T> {
  // If request is already in-flight, return the shared promise
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key)!;
  }

  const promise = (async () => {
    try {
      const data = await fetcher();
      if (data !== undefined && data !== null) {
        setCachedData(key, data);
        return data;
      }
      if (fallbackData !== undefined) return fallbackData;
      return data;
    } catch (err) {
      // If error occurs, check if we have any cached data first before falling back
      const cached = getCachedData<T>(key);
      if (cached.isCached && cached.data !== undefined) {
        return cached.data;
      }
      if (fallbackData !== undefined) return fallbackData;
      throw err;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, promise);
  return promise;
}

/**
 * Core SWR hook for seamless Strapi querying with 0ms loading lag and zero placeholder flicker
 */
export function useStrapiQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  fallback: T,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
  }
): { data: T; isLoading: boolean; error: Error | null; refetch: () => Promise<T> } {
  const enabled = options?.enabled ?? true;

  // Initialize state synchronously with cached data if available (0ms render!)
  const initialCache = getCachedData<T>(key, fallback);
  const [data, setData] = useState<T>(initialCache.data !== undefined ? initialCache.data : fallback);
  const [isLoading, setIsLoading] = useState<boolean>(!initialCache.isCached && enabled);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to cache updates (from background prefetch or other components)
  useEffect(() => {
    const unsubscribe = subscribeToCache<T>(key, (newData) => {
      setData((prev) => {
        try {
          if (JSON.stringify(prev) === JSON.stringify(newData)) return prev;
        } catch {}
        return newData;
      });
      setIsLoading(false);
      options?.onSuccess?.(newData);
    });
    return unsubscribe;
  }, [key]);

  // Stale-While-Revalidate: Silently revalidate in background on mount
  useEffect(() => {
    if (!enabled) return;
    let isMounted = true;

    fetchWithCache(key, fetcher, fallback)
      .then((freshData) => {
        if (!isMounted) return;
        setData((prev) => {
          try {
            if (JSON.stringify(prev) === JSON.stringify(freshData)) return prev;
          } catch {}
          return freshData;
        });
        setIsLoading(false);
        options?.onSuccess?.(freshData);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [key, enabled]);

  const refetch = async (): Promise<T> => {
    setIsLoading(true);
    try {
      inFlightRequests.delete(key);
      const fresh = await fetcher();
      if (fresh !== undefined && fresh !== null) {
        setCachedData(key, fresh);
        setData(fresh);
        options?.onSuccess?.(fresh);
        return fresh;
      }
      return data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
}
