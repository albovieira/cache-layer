import { before, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Cache } from './dependencies';
import CacheContract from '../src/models/cache-contract';
import { ProvidersEnum } from '../src/models/provider';
import {
  shouldGet,
  shouldPersist,
  shouldCheck,
  shouldDelete,
  shouldKeepForATime,
  shouldAddTTLByStringFormat,
} from './base-test';
import { RedisOptions } from '../src';

describe('Redis', () => {
  let client: CacheContract;
  before(() => {});

  beforeEach(() => {
    client = Cache.create({
      provider: ProvidersEnum.Redis,
      host: 'localhost',
      container: 'test',
      port: 6379,
      ttl: 20000,
      db: 0,
      keyPrefix: 'test:',
      lazyConnect: true,
      maxRetriesPerRequest: 0,
    } as RedisOptions);
  });

  it('Should get', async () => {
    shouldGet(client);
  });

  it('Should persist', async () => {
    shouldPersist(client);
  });

  it('Should check if key exist', async () => {
    shouldCheck(client);
  });

  it('Should delete', async () => {
    shouldDelete(client);
  });

  it('Should keep for a given time', async () => {
    shouldKeepForATime(client);
  });

  it('Should add ttl by string format', async () => {
    shouldAddTTLByStringFormat(client);
  });
});
