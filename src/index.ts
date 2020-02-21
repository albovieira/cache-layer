import CacheContract from './models/cache-contract';
import Provider from './models/provider';
import RedisProvider from './redis-provider';
import MemoryCacheProvider from './memory-cache-provider';

class Cache {
  static create(options): CacheContract {
    const providers: Provider[] = [
      { provider: 'redis', class: RedisProvider },
      { provider: 'in-memory', class: MemoryCacheProvider }
    ];

    const defaultProvider: Provider = {
      provider: 'in-memory',
      class: MemoryCacheProvider
    };

    const provider: Provider =
      providers.find(p => p.provider === options.provider) || defaultProvider;
    const client = new provider.class(options);
    return client;
  }
}

export { CacheContract, Cache };
