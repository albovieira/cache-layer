export default interface CacheContract {
    get(key: string): any;
    has(key: string): any;
    delete(key: string): any;
    add<T>(key: string, object: T, ttl?: number): any;
}
