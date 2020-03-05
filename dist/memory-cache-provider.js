"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryCache = __importStar(require("memory-cache"));
const ms_1 = __importDefault(require("ms"));
class MemoryCacheProvider {
    constructor(options) {
        this.client = MemoryCache;
        if (options.ttl) {
            this.defaultTTL = this.getTTL(options.ttl);
        }
    }
    async get(key) {
        const item = await this.client.get(key);
        return item ? JSON.parse(item) : null;
    }
    async has(key) {
        return !!this.client.get(key);
    }
    async delete(key) {
        return this.client.del(key);
    }
    async add(key, data, ttl) {
        const saved = await this.client.put(`${key}`, JSON.stringify(data || {}), this.getTTL(ttl) || this.defaultTTL);
        return !!saved;
    }
    getTTL(ttl) {
        if (typeof ttl === 'string') {
            return ms_1.default(ttl);
        }
        return ttl;
    }
}
exports.default = MemoryCacheProvider;
//# sourceMappingURL=memory-cache-provider.js.map