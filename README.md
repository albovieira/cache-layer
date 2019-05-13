# cache-layer

This package creates a cache provider instance.

Install with:

```
npm install cache-layer
```

# Usage

```
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
    const done = await client.save('hashKey', { name: 'Albo' });
    const result = await client.getItem('hashKey');
```
