import Redis from 'ioredis';
import RedisOptions from './models/redis-options';
import CacheContract from './models/cache-contract';

const OK = 'OK';

export default class RedisProvider implements CacheContract {
  private client: Redis;
  private ttl: number;
  constructor(options: RedisOptions) {
    this.client = new Redis(options.port, options.host, {
      db: options.db || 0,
      keyPrefix: options.keyPrefix,
      lazyConnect: options.lazyConnect,
      maxRetriesPerRequest: options.maxRetriesPerRequest
    });
    this.ttl = options.ttl;
  }
  async get<T>(key: string): Promise<T> {
    const item = await this.client.get(key);
    return item ? JSON.parse(item) : null;
  }

  async has(key: string): Promise<boolean> {
    return this.client.exists(key);
  }

  async delete<T>(key: string): Promise<T> {
    return this.client.del(key);
  }

  async add<T>(key: string, data: T, ttl?: number): Promise<boolean> {
    const saved = await this.client.setex(
      `${key}`,
      (ttl || this.ttl) * 1000,
      JSON.stringify(data || {})
    );
    return saved === OK;
  }
}
