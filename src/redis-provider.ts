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
  async getItem(key) {
    const item = await this.client.get(key);
    return item ? JSON.parse(item) : null;
  }

  async hasKey(key) {
    return this.client.exists(key);
  }

  async save(key, object) {
    const saved = await this.client.setex(
      `${key}`,
      this.ttl,
      JSON.stringify(object || {})
    );
    return saved === OK;
  }
}
