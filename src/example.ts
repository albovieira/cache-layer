import { Cache } from './index';
import { ProvidersEnum } from './models/provider';

async function main() {
  const client = Cache.create({
    provider: ProvidersEnum.Memcached,
    ttl: 600000
  });

  const add = await client.add('test', { name: 'Albo' });
  console.log('add:', add);

  const addWithTTL = await client.add('testTTL', { name: 'AlboTTL' }, '2s');
  console.log('addWithTTL:', addWithTTL);

  const promise = new Promise(resolve => {
    setTimeout(async () => {
      resolve(true);
    }, 900);
  });
  await promise;

  const hasAdd = await client.has('test');
  console.log('hasAdd', hasAdd);
  const hasAddWithTTL = await client.has('testTTL');
  console.log('hasAddWithTTL', hasAddWithTTL);

  const valueRecovered = await client.get('test');
  console.log('get: ', valueRecovered);

  const valueRecoveredWithTTL = await client.get('testTTL');
  console.log('getWithTTL: ', valueRecoveredWithTTL);
}

main();
