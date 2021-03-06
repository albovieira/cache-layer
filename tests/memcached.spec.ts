import { before, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Cache } from './dependencies';
import { ProvidersEnum } from '../src/models/provider';
import CacheContract from '../src/models/cache-contract';
import {
  shouldGet,
  shouldPersist,
  shouldCheck,
  shouldDelete,
  shouldKeepForATime,
  shouldAddTTLByStringFormat
} from './base-test';

describe('MemCached', () => {
  let client: CacheContract;
  before(() => {});

  beforeEach(() => {
    client = Cache.create({
      provider: ProvidersEnum.Memcached,
      ttl: 20000
    });
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
