import { before, describe, it } from 'mocha';
import { expect } from 'chai';
import { Cache } from './dependencies';
import { ProvidersEnum } from '../src/models/provider';

describe('MemCached', () => {
  before(() => {});

  it.only('Should get from memory', async () => {
    const client = Cache.create({
      provider: ProvidersEnum.Memcached,
      ttl: 20000
    });
    const done = await client.add('hashKey', { name: 'Albo' });
    expect(done).to.be.equal(true);
    const result = await client.get('hashKey');
    expect(result).to.be.deep.equal({ name: 'Albo' });
  });

  it('Should persist in memory', async () => {
    const client = Cache.create({
      provider: 'in-memory'
    });
    const done = await client.add('hashKey', { name: 'Albo' });
    expect(done).to.be.equal(true);
    const result = await client.get('hashKey');
    expect(result).to.be.deep.equal({ name: 'Albo' });
  });

  it('Should keep in memory for the given time', async () => {
    const client = Cache.create({
      provider: 'in-memory'
    });

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
    const client = Cache.create({
      provider: 'in-memory'
    });

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
