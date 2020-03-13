export interface Provider {
  provider: ProviderName;
  class?: any;
}

export enum ProvidersEnum {
  Redis = 'redis',
  Memcached = 'memcached',
  InMemory = 'redis'
}
export type ProviderName = 'redis' | 'memcached' | 'in-memory';
