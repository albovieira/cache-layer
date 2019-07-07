export interface CacheContract {
    getItem(key: any): any;
    hasKey(key: any): any;
    save(key: any, object: any): any;
}
export declare class Cache {
    static create(options: any): any;
}
