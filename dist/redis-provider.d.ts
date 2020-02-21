import RedisOptions from './models/redis-options';
import CacheContract from './models/cache-contract';
export default class RedisProvider implements CacheContract {
    private client;
    private ttl;
    constructor(options: RedisOptions);
    getItem(key: string): Promise<any>;
    hasKey(key: string): Promise<any>;
    deleteKey(key: string): Promise<any>;
    save<T>(key: string, data: T, ttl: number | null): Promise<boolean>;
}
