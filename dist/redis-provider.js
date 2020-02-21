"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const OK = 'OK';
class RedisProvider {
    constructor(options) {
        this.client = new ioredis_1.default(options.port, options.host, {
            db: options.db || 0,
            keyPrefix: options.keyPrefix,
            lazyConnect: options.lazyConnect,
            maxRetriesPerRequest: options.maxRetriesPerRequest
        });
        this.ttl = options.ttl;
    }
    async get(key) {
        const item = await this.client.get(key);
        return item ? JSON.parse(item) : null;
    }
    async has(key) {
        return this.client.exists(key);
    }
    async delete(key) {
        return this.client.del(key);
    }
    async add(key, data, ttl) {
        const saved = await this.client.setex(`${key}`, (ttl || this.ttl) * 1000, JSON.stringify(data || {}));
        return saved === OK;
    }
}
exports.default = RedisProvider;
