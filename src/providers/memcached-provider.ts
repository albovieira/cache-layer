import Memcached from 'memcached';
import ms from 'ms';
import CacheContract from '../models/cache-contract';
import { MemCachedOptions } from '../models/options';

export default class MemCachedProvider implements CacheContract {
  private client: Memcached;
  private defaultTTL: number;

  constructor(options: MemCachedOptions) {
    if (options.ttl) {
      const ttlNormalize = this.getTTL(options.ttl);
      this.defaultTTL = ttlNormalize;
      options.ttl = ttlNormalize;
    }
    this.client = new Memcached(options.host || 'localhost', options);
  }

  async get<T>(key: string): Promise<T> {
    const value = (await new Promise((resolve, reject) => {
      this.client.get(key, (err, info) => {
        if (err) {
          reject(err);
        }
        resolve(info);
      });
    })) as string;
    return value ? JSON.parse(value) : null;
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return !!value;
  }

  async delete(key: string): Promise<boolean> {
    const deleted = await new Promise((resolve, reject) => {
      this.client.del(`${key}`, (err, info) => {
        if (err) {
          reject(err);
        }
        resolve(info);
      });
    });
    return !!deleted;
  }

  async add<T>(key: string, data: T, ttl?: number | string): Promise<boolean> {
    const saved = await new Promise((resolve, reject) => {
      this.client.set(
        `${key}`,
        JSON.stringify(data || {}),
        this.getTTL(ttl) || this.defaultTTL,
        (err, info) => {
          if (err) {
            reject(err);
          }
          resolve(info);
        }
      );
    });

    return !!saved;
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
