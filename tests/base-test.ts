import { expect } from 'chai';
import CacheContract from '../src/models/cache-contract';

async function shouldGet(client: CacheContract) {
  const done = await client.add('hashKey', { name: 'Albo' });
  expect(done).to.be.equal(true);
  const result = await client.get('hashKey');
  expect(result).to.be.deep.equal({ name: 'Albo' });
}

async function shouldPersist(client: CacheContract) {
  const done = await client.add('hashKey', { name: 'Albo' });
  expect(done).to.be.equal(true);
  const result = await client.get('hashKey');
  expect(result).to.be.deep.equal({ name: 'Albo' });
}

async function shouldCheck(client: CacheContract) {
  const done = await client.add('teste', { name: 'guarda ai pf' });
  expect(done).to.be.equal(true);
  const has = await client.has('teste');
  expect(has).to.be.equal(has);
}

async function shouldDelete(client: CacheContract) {
  const done = await client.add('teste', { name: 'guarda ai pf' });
  expect(done).to.be.equal(true);
  const deleted = await client.delete('teste');
  expect(deleted).to.be.equal(true);
}

async function shouldKeepForATime(client: CacheContract) {
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
}

async function shouldAddTTLByStringFormat(client: CacheContract) {
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
}

export {
  shouldGet,
  shouldCheck,
  shouldDelete,
  shouldAddTTLByStringFormat,
  shouldKeepForATime,
  shouldPersist
};
