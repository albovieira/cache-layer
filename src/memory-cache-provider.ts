import * as MemoryCache from 'memory-cache';
import ms from 'ms';
import CacheContract from './models/cache-contract';
import Options from './models/options';

export default class MemoryCacheProvider implements CacheContract {
  private client: MemoryCache;
  private defaultTTL: number;
  constructor(options: Options) {
    this.client = MemoryCache;
    if (options.ttl) {
      this.defaultTTL = this.getTTL(options.ttl);
    }
  }
  async get<T>(key: string): Promise<T> {
    const item = await this.client.get(key);
    return item ? JSON.parse(item) : null;
  }

  async has(key: string): Promise<boolean> {
    return !!this.client.get(key);
  }

  async delete<T>(key: string): Promise<T> {
    return this.client.del(key);
  }

  async add<T>(key: string, data: T, ttl?: number | string): Promise<boolean> {
    const saved = await this.client.put(
      `${key}`,
      JSON.stringify(data || {}),
      this.getTTL(ttl) || this.defaultTTL
    );
    return !!saved;
  }

  private getTTL(ttl: number | string) {
    if (typeof ttl === 'string') {
      return ms(ttl);
    }
    return ttl;
  }
}
