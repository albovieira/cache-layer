import CacheContract from './models/cache-contract';
import { Provider, ProvidersEnum } from './models/provider';
import RedisProvider from './providers/redis-provider';
import InMemoryCacheProvider from './providers/in-memory-provider';
import MemCachedProvider from './providers/memcached-provider';

export class Cache {
  static create(options): CacheContract {
    const providers: Provider[] = [
      { provider: ProvidersEnum.Redis, class: RedisProvider },
      { provider: ProvidersEnum.InMemory, class: InMemoryCacheProvider },
      { provider: ProvidersEnum.Memcached, class: MemCachedProvider }
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
