export default interface CacheContract {
  get(key: string);
  has(key: string);
  delete(key: string);
  add<T>(key: string, object: T, ttl?: number);
}
