import CacheContract from './models/cache-contract';
import Options from './models/options';
export default class MemoryCacheProvider implements CacheContract {
    private client;
    private ttl;
    constructor(options: Options);
    getItem(key: string): Promise<any>;
    hasKey(key: string): Promise<boolean>;
    deleteKey(key: string): Promise<any>;
    save<T>(key: string, data: T, ttl: number | null): Promise<boolean>;
}
