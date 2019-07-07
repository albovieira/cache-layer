import RedisOptions from './models/redis-options';
import CacheContract from './models/cache-contract';
export default class RedisProvider implements CacheContract {
    private client;
    private ttl;
    constructor(options: RedisOptions);
    getItem(key: any): Promise<any>;
    hasKey(key: any): Promise<any>;
    deleteKey(key: any): Promise<any>;
    save(key: any, object: any, ttl?: any): Promise<boolean>;
}
