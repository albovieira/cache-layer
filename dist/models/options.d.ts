import { ProviderName } from './provider';
export interface Options {
    provider: ProviderName;
    ttl: number | string;
}
export interface RedisOptions extends Options {
    host: string;
    db: number;
    port: number;
    keyPrefix?: string;
    lazyConnect?: boolean;
    maxRetriesPerRequest?: number;
    family?: string;
    path?: string;
    keepAlive?: number;
    noDelay?: boolean;
    connectionName?: string;
    password?: string;
    dropBufferSupport?: boolean;
    enableReadyCheck?: boolean;
    enableOfflineQueue?: boolean;
    connectTimeout?: number;
    autoResubscribe?: boolean;
    autoResendUnfulfilledCommands?: boolean;
    tls?: Object;
    readOnly?: boolean;
    stringNumbers?: boolean;
    retryStrategy?: Function;
    reconnectOnError?: Function;
}
export interface MemCachedOptions extends Options {
    host: string;
    maxKeySize?: number;
    maxExpiration?: number;
    maxValue?: number;
    poolSize?: number;
    algorithm?: string;
    reconnect?: number;
    timeout?: number;
    retries?: number;
    failures?: number;
    retry?: number;
    remove?: boolean;
    keyCompression?: boolean;
    idle?: number;
}
//# sourceMappingURL=options.d.ts.map