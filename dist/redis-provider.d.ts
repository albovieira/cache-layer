import RedisOptions from './models/redis-options';
import CacheContract from './models/cache-contract';
export default class RedisProvider implements CacheContract {
    private client;
    private ttl;
    constructor(options: RedisOptions);
    get<T>(key: string): Promise<T>;
    has(key: string): Promise<boolean>;
    delete<T>(key: string): Promise<T>;
    add<T>(key: string, data: T, ttl?: number): Promise<boolean>;
}
