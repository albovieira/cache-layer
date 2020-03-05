"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const ms_1 = __importDefault(require("ms"));
const OK = 'OK';
class RedisProvider {
    constructor(options) {
        if (options.ttl) {
            const ttlNormalize = this.getTTL(options.ttl);
            this.defaultTTL = ttlNormalize;
            options.ttl = ttlNormalize;
        }
        this.client = new ioredis_1.default(options.port, options.host, options);
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
        const saved = await this.client.setex(`${key}`, this.getTTL(ttl) || this.defaultTTL, JSON.stringify(data || {}));
        return saved === OK;
    }
    getTTL(ttl) {
        let seconds;
        if (typeof ttl === 'string') {
            seconds = ms_1.default(ttl) / 1000;
        }
        else {
            seconds = ttl / 1000;
        }
        return seconds <= 1 ? 1 : seconds;
    }
}
exports.default = RedisProvider;
//# sourceMappingURL=redis-provider.js.map