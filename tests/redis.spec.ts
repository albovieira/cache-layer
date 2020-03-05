import { before, describe, it } from 'mocha';
import { expect } from 'chai';
import { Cache } from './dependencies';
import CacheContract from '../src/models/cache-contract';
import { ProvidersEnum } from '../src/models/provider';

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
      maxRetriesPerRequest: 0
    });
  });

  it('Should get from redis', async () => {
    const done = await client.add('teste', { name: 'guarda ai pf' });
    expect(done).to.be.equal(true);
    const result = await client.get('teste');
    expect(result).to.be.deep.equal({ name: 'guarda ai pf' });
  });

  it('Should persist on redis', async () => {
    const done = await client.add('teste', { name: 'guarda ai pf' });
    expect(done).to.be.equal(true);
  });

  it('Should check on redis', async () => {
    const done = await client.add('teste', { name: 'guarda ai pf' });
    expect(done).to.be.equal(true);
    const has = await client.has('teste');
    expect(has).to.be.equal(has);
  });

  it('Should delete on redis', async () => {
    const done = await client.add('teste', { name: 'guarda ai pf' });
    expect(done).to.be.equal(true);
    const deleted = await client.delete('teste');
    expect(deleted).to.be.equal(true);
  });

  it('Should keep in redis for the given time', async () => {
    const done = await client.add('hashKey', { name: 'Albo' }, 50);
    expect(done).to.be.equal(true);

    let result;
    const promise = new Promise(resolve => {
      setTimeout(async () => {
        result = await client.get('hashKey');
        resolve(result);
      }, 40);
    });
    result = await promise;
    expect(result).to.be.deep.equal({ name: 'Albo' });
  });

  it('Should add ttl by string format in redis', async () => {
    const done = await client.add('hashKey', { name: 'Albo' }, '400');
    expect(done).to.be.equal(true);

    let result;
    const promise = new Promise(resolve => {
      setTimeout(async () => {
        result = await client.get('hashKey');
        resolve(result);
      }, 300);
    });
    result = await promise;
    expect(result).to.be.deep.equal({ name: 'Albo' });
  });
});
