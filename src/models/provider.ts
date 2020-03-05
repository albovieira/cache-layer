export interface Provider {
  provider: ProviderName;
  class?: any;
}

export enum ProvidersEnum {
  Redis = 'redis',
  Memcached = 'memcached',
  InMemory = 'redis'
}
type ProviderName = 'redis' | 'memcached' | 'in-memory';
