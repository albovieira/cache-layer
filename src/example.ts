import { Cache } from './index';
import { ProvidersEnum } from './models/provider';

async function main() {
  const client = Cache.create({
    provider: ProvidersEnum.Memcached,
    ttl: 1000
  });

  const test = await client.add('test', { name: 'Albo' });
  console.log('insertedResykt:', test);
  const valueRecovered = await client.get('test');
  console.log('value recorevered: ', valueRecovered);
}

main();
