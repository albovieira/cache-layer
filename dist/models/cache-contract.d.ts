export default interface CacheContract {
    getItem(key: string): any;
    hasKey(key: string): any;
    deleteKey(key: string): any;
    save<T>(key: string, object: T, ttl: number | null): any;
}
