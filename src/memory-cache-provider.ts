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
  async getItem(key) {
    const item = await this.client.get(key);
    return item ? JSON.parse(item) : null;
  }

  async hasKey(key) {
    return !!this.client.get(key);
  }

  async deleteKey(key) {
    return this.client.del(key);
  }

  async save(key, object, ttl = null) {
    const saved = await this.client.put(
      `${key}`,
      JSON.stringify(object || {}),
      ttl || this.ttl
    );
    return !!saved;
  }
}
