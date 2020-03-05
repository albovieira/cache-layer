export interface Provider {
    provider: ProviderName;
    class?: any;
}
export declare enum ProvidersEnum {
    Redis = "redis",
    Memcached = "memcached",
    InMemory = "redis"
}
declare type ProviderName = 'redis' | 'memcached' | 'in-memory';
export {};
