# Cache Layer [![npm version](https://badge.fury.io/js/cache-layer.svg)](//npmjs.com/package/cache-layer)

> An abstraction for cache providers, it exposes a common interface for different ways to cache data

**It suports**

- Redis
- In memory

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![Dependency Status](http://img.shields.io/gemnasium/badges/badgerbadgerbadger.svg?style=flat-square)](https://gemnasium.com/badges/badgerbadgerbadger) [![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger) [![Code Climate](http://img.shields.io/codeclimate/github/badges/badgerbadgerbadger.svg?style=flat-square)](https://codeclimate.com/github/badges/badgerbadgerbadger)

## Sumary

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

---

## Installation

```shell
$ npm install cache-layer --save
```

## Usage

#### InMemory

```javascript
const client = Cache.create({
  provider: 'in-memory',
  ttl: 2000 // a defautt TTL (miliseconds)
});

// or you can provide a specific TTL
const done = await client.add('hashKey', { name: 'John' }, 1000);
const result = await client.get('hashKey');
```

#### Redis

```javascript
const client = Cache.create({
  provider: 'redis',
  host: 'redis.com.br',
  container: 'cache',
  port: 6379,
  ttl: 2000, // a defautt TTL (miliseconds)
  db: 0,
  keyPrefix: 'cache:',
  lazyConnect: true,
  maxRetriesPerRequest: 0
});

// or you can provide a specific TTL
const done = await client.add('hashKey', { name: 'John' }, 1000);
const result = await client.get('hashKey');
```

## Features

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
