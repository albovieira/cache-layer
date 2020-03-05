export default interface CacheContract {
  get<T>(key: string): Promise<T>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<boolean>;
  add<T>(key: string, object: T, ttl?: number | string): Promise<boolean>;
}
