"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_provider_1 = __importDefault(require("./redis-provider"));
const memory_cache_provider_1 = __importDefault(require("./memory-cache-provider"));
class Cache {
    static create(options) {
        const providers = [
            { provider: 'redis', class: redis_provider_1.default },
            { provider: 'in-memory', class: memory_cache_provider_1.default }
        ];
        const defaultProvider = {
            provider: 'redis',
            class: redis_provider_1.default
        };
        const provider = providers.find(p => p.provider === options.provider) || defaultProvider;
        const client = new provider.class(options);
        return client;
    }
}
exports.Cache = Cache;
