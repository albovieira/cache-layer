import { before, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Cache } from './dependencies';
import { ProvidersEnum } from '../src/models/provider';
import CacheContract from '../src/models/cache-contract';

describe('MemCached', () => {
  let client: CacheContract;
  before(() => {});

  beforeEach(() => {
    client = Cache.create({
      provider: ProvidersEnum.Memcached,
      ttl: 20000
    });
  });

  it('Should get from memCached', async () => {
    const done = await client.add('hashKey', { name: 'Albo' });
    expect(done).to.be.equal(true);
    const result = await client.get('hashKey');
    expect(result).to.be.deep.equal({ name: 'Albo' });
  });

  it('Should persist in memCached', async () => {
    const done = await client.add('hashKey', { name: 'Albo' });
    expect(done).to.be.equal(true);
    const result = await client.get('hashKey');
    expect(result).to.be.deep.equal({ name: 'Albo' });
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

  it('Should keep in memory for the given time', async () => {
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

  it('Should add ttl by string format in memCached', async () => {
    const done = await client.add('hashKey', { name: 'Albo' }, '2s');
    expect(done).to.be.equal(true);

    let result;
    const promise = new Promise(resolve => {
      setTimeout(async () => {
        result = await client.get('hashKey');
        resolve(result);
      }, 900);
    });
    result = await promise;
    expect(result).to.be.deep.equal({ name: 'Albo' });
  });
});
