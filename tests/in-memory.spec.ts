import { before, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Cache } from './dependencies';
import CacheContract from '../src/models/cache-contract';
import { ProvidersEnum } from '../src/models/provider';

describe('InMemory', () => {
  let client: CacheContract;
  before(() => {});

  beforeEach(() => {
    client = Cache.create({
      provider: ProvidersEnum.InMemory,
      ttl: 20000
    });
  });

  it('Should get from memory', async () => {
    const done = await client.add('hashKey', { name: 'Albo' });
    expect(done).to.be.equal(true);
    const result = await client.get('hashKey');
    expect(result).to.be.deep.equal({ name: 'Albo' });
  });

  it('Should persist in memory', async () => {
    const done = await client.add('hashKey', { name: 'Albo' });
    expect(done).to.be.equal(true);
    const result = await client.get('hashKey');
    expect(result).to.be.deep.equal({ name: 'Albo' });
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

  it('Should add ttl by string format in memorycache', async () => {
    const done = await client.add('hashKey', { name: 'Albo' }, '1s');
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
