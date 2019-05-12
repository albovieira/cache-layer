import { before, describe, it } from 'mocha';
import { expect } from 'chai';
import { Cache } from './dependencies';

describe('Unit tests for Cache', () => {
  before(() => {});

  it('Should persist on redis', async () => {
    const client = Cache.create({
      provider: 'redis',
      host: 'redis-hmg.com.br',
      container: 'test',
      port: 6379,
      ttl: 86400,
      db: 0,
      keyPrefix: 'test:',
      lazyConnect: true,
      maxRetriesPerRequest: 0
    });
    const done = await client.save('teste', { name: 'guarda ai pf' });
    expect(done).to.be.equal(true);
  });

  it('Should get from redis', async () => {
    const client = Cache.create({
      provider: 'redis',
      host: 'redis-hmg.com.br',
      container: 'test',
      port: 6379,
      ttl: 86400,
      db: 0,
      keyPrefix: 'test:',
      lazyConnect: true,
      maxRetriesPerRequest: 0
    });
    const done = await client.save('teste', { name: 'guarda ai pf' });
    expect(done).to.be.equal(true);
    const result = await client.getItem('teste');
    expect(result).to.be.deep.equal({ name: 'guarda ai pf' });
  });
});
