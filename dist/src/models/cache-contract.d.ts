export default interface CacheContract {
    getItem(key: any): any;
    hasKey(key: any): any;
    deleteKey(key: any): any;
    save(key: any, object: any, ttl: any): any;
}
