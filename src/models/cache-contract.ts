export default interface CacheContract {
  getItem(key);
  hasKey(key);
  save(key, object);
}
