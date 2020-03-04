import Memcached from 'memcached';
import ms from 'ms';
import CacheContract from './models/cache-contract';
import Options from './models/options';

export default class MemCachedProvider implements CacheContract {
  private client: Memcached;
  private defaultTTL: number;
  constructor(options: Options) {
    this.client = new Memcached('localhost:11211');
    if (options.ttl) {
      this.defaultTTL = this.getTTL(options.ttl);
    }
  }
  async get<T>(key: string): Promise<T> {
    const item = (await new Promise((resolve, reject) => {
      this.client.get(key, (err, info) => resolve(info));
    })) as string;
    return item ? JSON.parse(item) : null;
  }

  async has(key: string): Promise<boolean> {
    return true;
  }

  async delete<T>(key: string): Promise<T> {
    return '' as any;
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
