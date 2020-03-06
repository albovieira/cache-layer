# Cache Layer [![npm version](https://badge.fury.io/js/cache-layer.svg)](//npmjs.com/package/cache-layer)

> An abstraction for cache providers, it exposes a common interface for different ways to cache data

**It suports**

- Redis - [luin/ioredis](https://github.com/luin/ioredis)
- MemCached - [3rd-Eden/memcached](https://github.com/3rd-Eden/memcached)
- In memory - [ptarjan/node-cache](https://github.com/ptarjan/node-cache)

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![Dependency Status](http://img.shields.io/gemnasium/badges/badgerbadgerbadger.svg?style=flat-square)](https://gemnasium.com/badges/badgerbadgerbadger) [![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger) [![Code Climate](http://img.shields.io/codeclimate/github/badges/badgerbadgerbadger.svg?style=flat-square)](https://codeclimate.com/github/badges/badgerbadgerbadger)

## Sumary

- [Installation](#installation)
- [API](#api)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

---

## Installation

```shell
$ npm install cache-layer --save
```

## API

### get

- Retrieves a value for a given key

### put

- Store a value for a given key
- If time isn't passed in, it is stored forever

### del

- Delete value for a given key

### has

- Check if key exists on cache

## Usage

#### InMemory

```javascript
const client = Cache.create({
  provider: 'in-memory',
  ttl: 2000 // a defautt TTL (miliseconds)
});
```

#### MemCached

To use memcached you have to inform a server or it will set a localhost as default. So, to use it locally, you need to install memcached.
If you have a memcached server, just inform the host

```shell
sudo apt-get install memcached
```

```javascript
const client = Cache.create({
  host: 'localhost:11211' // if any host was informed, it will set localhost as default
  provider: 'memcached',
  ttl: 2000 // a defautt TTL (miliseconds)
});
```

##### Options

All available options to create `memcached` instance: https://raw.githubusercontent.com/3rd-Eden/memcached/master/README.md

#### Redis

```javascript
const client = Cache.create({
  provider: 'redis',
  host: 'redis.com.br',
  container: 'cache',
  port: 6379,
  ttl: 2000, // a defautt TTL (miliseconds)
  keyPrefix: 'cache:',
  lazyConnect: true,
  maxRetriesPerRequest: 0
});
```

The TTL is in ms, you can pass a default value, or add as a third parameter on `add` method.
The package implements [zeit/ms](https://github.com/zeit/ms), so is possible to use a string to define the TTL with zeit/ms format

```javascript
const done = await client.add('hashKey', { name: 'John' }, 1000);
const result = await client.get('hashKey');

const done = await client.add('hashKey', { name: 'John' }, '1s');
const result = await client.get('hashKey');

const done = await client.add('hashKey', { name: 'John' }, '1d');
const result = await client.get('hashKey');
```

##### Options

All available options to create `ioredis` instance: https://raw.githubusercontent.com/luin/ioredis/f4fe62f231b33b28fda1cb28b4f5690655007b80/API.md

## Features

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
