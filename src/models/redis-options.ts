import Options from './options';

export default interface RedisOptions extends Options {
  host: string;
  db: string;
  keyPrefix: string;
  lazyConnect: string;
  maxRetriesPerRequest: number;
  port: number;
}
