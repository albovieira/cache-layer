"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const dependencies_1 = require("./dependencies");
mocha_1.describe('Unit tests for Cache', () => {
    mocha_1.before(() => { });
    mocha_1.it('Should get from redis', async () => {
        const client = dependencies_1.Cache.create({
            provider: 'redis',
            host: 'localhost',
            container: 'test',
            port: 6379,
            ttl: 86400,
            db: 0,
            keyPrefix: 'test:',
            lazyConnect: true,
            maxRetriesPerRequest: 0
        });
        const done = await client.save('teste', { name: 'guarda ai pf' });
        chai_1.expect(done).to.be.equal(true);
        const result = await client.getItem('teste');
        chai_1.expect(result).to.be.deep.equal({ name: 'guarda ai pf' });
    });
    mocha_1.it('Should persist on redis', async () => {
        const client = dependencies_1.Cache.create({
            provider: 'redis',
            host: 'localhost',
            container: 'test',
            port: 6379,
            ttl: 86400,
            db: 0,
            keyPrefix: 'test:',
            lazyConnect: true,
            maxRetriesPerRequest: 0
        });
        const done = await client.save('teste', { name: 'guarda ai pf' });
        chai_1.expect(done).to.be.equal(true);
    });
    mocha_1.it('Should get from memory', async () => {
        const client = dependencies_1.Cache.create({
            provider: 'in-memory'
        });
        const done = await client.save('hashKey', { name: 'Albo' });
        chai_1.expect(done).to.be.equal(true);
        const result = await client.getItem('hashKey');
        chai_1.expect(result).to.be.deep.equal({ name: 'Albo' });
    });
    mocha_1.it('Should persist in memory', async () => {
        const client = dependencies_1.Cache.create({
            provider: 'in-memory'
        });
        const done = await client.save('hashKey', { name: 'Albo' });
        chai_1.expect(done).to.be.equal(true);
        const result = await client.getItem('hashKey');
        chai_1.expect(result).to.be.deep.equal({ name: 'Albo' });
    });
});
