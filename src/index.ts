import Options from './models/options';
import Provider from './models/provider';
import RedisProvider from './redis-provider';
import MemoryCacheProvider from './memory-cache-provider';

export interface CacheContract {
  getItem(key);
  hasKey(key);
  save(key, object);
}

export class Cache {
  static create(options) {
    const providers: Provider[] = [
      { provider: 'redis', class: RedisProvider },
      { provider: 'in-memory', class: MemoryCacheProvider }
    ];

    const defaultProvider: Provider = {
      provider: 'redis',
      class: RedisProvider
    };

    const provider: Provider =
      providers.find(p => p.provider === options.provider) || defaultProvider;
    const client = new provider.class(options);
    return client;
  }
}
