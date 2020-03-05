import CacheContract from './models/cache-contract';
import { Provider, ProvidersEnum } from './models/provider';
import { Options, MemCachedOptions, RedisOptions } from './models/options';
import RedisProvider from './providers/redis-provider';
import InMemoryCacheProvider from './providers/in-memory-provider';
import MemCachedProvider from './providers/memcached-provider';

class Cache {
  static create(options): CacheContract {
    const providers: Provider[] = [
      { provider: ProvidersEnum.Redis, class: RedisProvider },
      { provider: ProvidersEnum.Memcached, class: MemCachedProvider },
      { provider: ProvidersEnum.InMemory, class: InMemoryCacheProvider }
    ];

    const defaultProvider: Provider = {
      provider: ProvidersEnum.InMemory,
      class: InMemoryCacheProvider
    };

    const provider: Provider =
      providers.find(p => p.provider === options.provider) || defaultProvider;
    const client = new provider.class(options);
    return client;
  }
}

export { CacheContract, Cache, RedisOptions, Options, MemCachedOptions };
