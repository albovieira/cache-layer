import * as MemoryCache from 'memory-cache';
import RedisOptions from './models/redis-options';
import CacheContract from './models/cache-contract';
import Options from './models/options';

export default class MemoryCacheProvider implements CacheContract {
  private client: MemoryCache;
  private ttl: number;
  constructor(options: Options) {
    this.client = MemoryCache;
    this.ttl = options.ttl;
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

  async add<T>(key: string, data: T, ttl?: number): Promise<boolean> {
    const saved = await this.client.put(
      `${key}`,
      JSON.stringify(data || {}),
      ttl || this.ttl
    );
    return !!saved;
  }
}
