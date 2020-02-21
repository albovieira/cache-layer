"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryCache = __importStar(require("memory-cache"));
class MemoryCacheProvider {
    constructor(options) {
        this.client = MemoryCache;
        this.ttl = options.ttl;
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
        const saved = await this.client.put(`${key}`, JSON.stringify(data || {}), ttl || this.ttl);
        return !!saved;
    }
}
exports.default = MemoryCacheProvider;
