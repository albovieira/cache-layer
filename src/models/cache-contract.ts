export default interface CacheContract {
  getItem(key);
  hasKey(key);
  deleteKey(key);
  save(key, object, ttl);
}
