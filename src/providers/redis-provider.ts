import Redis from 'ioredis';
import ms from 'ms';
import CacheContract from '../models/cache-contract';
import { RedisOptions } from '../models/options';

const OK = 'OK';
const NOT_OK = 'NOT_OK';

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
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async has(key: string): Promise<boolean> {
    return this.client.exists(key);
  }

  async delete(key: string): Promise<boolean> {
    const deleted = await this.client.del(key);
    return deleted > 0;
  }

  async add<T>(key: string, data: T, ttl?: string | number): Promise<boolean> {
    const expireAt = this.getTTL(ttl) || this.defaultTTL;
    let saved = NOT_OK;
    if (expireAt) {
      saved = await this.client.setex(
        `${key}`,
        this.getTTL(ttl) || this.defaultTTL,
        JSON.stringify(data || {})
      );
    } else {
      saved = await this.client.set(`${key}`, JSON.stringify(data || {}));
    }
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
