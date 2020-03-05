import CacheContract from './models/cache-contract';
import Options from './models/options';
export default class MemoryCacheProvider implements CacheContract {
    private client;
    private defaultTTL;
    constructor(options: Options);
    get<T>(key: string): Promise<T>;
    has(key: string): Promise<boolean>;
    delete<T>(key: string): Promise<T>;
    add<T>(key: string, data: T, ttl?: number | string): Promise<boolean>;
    private getTTL;
}
