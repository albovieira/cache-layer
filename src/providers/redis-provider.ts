import Redis from 'ioredis';
import ms from 'ms';
import CacheContract from '../models/cache-contract';
import { RedisOptions } from '../models/options';

const OK = 'OK';

export default class RedisProvider implements CacheContract {
  private client: Redis;
  private defaultTTL: number;
  constructor(options: RedisOptions) {
    if (options.ttl) {
      const ttlNormalize = this.getTTL(options.ttl);
      this.defaultTTL = ttlNormalize;
      options.ttl = ttlNormalize;
    }
    this.client = new Redis(options.port, options.host, options);
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

  async add<T>(key: string, data: T, ttl?: string | number): Promise<boolean> {
    const saved = await this.client.setex(
      `${key}`,
      this.getTTL(ttl) || this.defaultTTL,
      JSON.stringify(data || {})
    );
    return saved === OK;
  }

  private getTTL(ttl: number | string): number {
    let seconds;
    if (typeof ttl === 'string') {
      seconds = ms(ttl) / 1000;
    } else {
      seconds = ttl / 1000;
    }
    return seconds <= 1 ? 1 : seconds;
  }
}
