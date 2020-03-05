import CacheContract from './models/cache-contract';
import { Options, MemCachedOptions, RedisOptions } from './models/options';
declare class Cache {
    static create(options: any): CacheContract;
}
export { CacheContract, Cache, RedisOptions, Options, MemCachedOptions };
