interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // time to live in milliseconds
}

class CacheManager {
  private cache = new Map<string, CacheItem<unknown>>();

  set<T>(key: string, data: T, ttlMinutes: number = 30): void {
    const ttl = ttlMinutes * 60 * 1000; // convert to milliseconds
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) return null;

    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  // Remove expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Singleton instance
export const cache = new CacheManager();

// Browser localStorage cache for persistence
export class LocalStorageCache {
  private static prefix = 'awesome-hub-cache:';

  static set<T>(key: string, data: T, ttlMinutes: number = 60): void {
    if (typeof window === 'undefined') return;

    const item = {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000,
    };

    try {
      localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(`${this.prefix}${key}`);
      if (!stored) return null;

      const item: CacheItem<T> = JSON.parse(stored);

      // Check if expired
      if (Date.now() - item.timestamp > item.ttl) {
        this.remove(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }

  static has(key: string): boolean {
    return this.get(key) !== null;
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  static clear(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Clean up expired items
  static cleanup(): void {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    const now = Date.now();

    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const item = JSON.parse(stored);
            if (now - item.timestamp > item.ttl) {
              localStorage.removeItem(key);
            }
          }
        } catch {
          // Remove corrupted items
          localStorage.removeItem(key);
        }
      }
    });
  }
}

// Utility function for cache-first data fetching
export async function cacheFirst<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlMinutes: number = 30,
  useLocalStorage: boolean = true
): Promise<T> {
  // Try memory cache first
  let cached = cache.get<T>(key);
  if (cached) return cached;

  // Try localStorage cache
  if (useLocalStorage) {
    cached = LocalStorageCache.get<T>(key);
    if (cached) {
      // Also store in memory cache for faster access
      cache.set(key, cached, ttlMinutes);
      return cached;
    }
  }

  // Fetch fresh data
  const data = await fetchFn();

  // Cache the result
  cache.set(key, data, ttlMinutes);
  if (useLocalStorage) {
    LocalStorageCache.set(key, data, ttlMinutes);
  }

  return data;
}
