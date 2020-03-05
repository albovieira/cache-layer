import Options from './options';
export default interface RedisOptions extends Options {
    host: string;
    db: string;
    port: number;
    keyPrefix?: string;
    lazyConnect?: string;
    maxRetriesPerRequest?: number;
    family: string;
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
