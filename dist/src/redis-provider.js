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
    async getItem(key) {
        const item = await this.client.get(key);
        return item ? JSON.parse(item) : null;
    }
    async hasKey(key) {
        return this.client.exists(key);
    }
    async save(key, object) {
        const saved = await this.client.setex(`${key}`, this.ttl, JSON.stringify(object || {}));
        return saved === OK;
    }
}
exports.default = RedisProvider;
