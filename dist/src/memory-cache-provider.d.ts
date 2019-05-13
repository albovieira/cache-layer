import CacheContract from './models/cache-contract';
import Options from './models/options';
export default class MemoryCacheProvider implements CacheContract {
    private client;
    private ttl;
    constructor(options: Options);
    getItem(key: any): Promise<any>;
    hasKey(key: any): Promise<boolean>;
    deleteKey(key: any): Promise<any>;
    save(key: any, object: any, ttl?: any): Promise<boolean>;
}
