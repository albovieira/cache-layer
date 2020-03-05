"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = require("./models/provider");
const redis_provider_1 = __importDefault(require("./redis-provider"));
const in_memory_provider_1 = __importDefault(require("./in-memory-provider"));
const memcached_provider_1 = __importDefault(require("./memcached-provider"));
class Cache {
    static create(options) {
        const providers = [
            { provider: provider_1.ProvidersEnum.Redis, class: redis_provider_1.default },
            { provider: provider_1.ProvidersEnum.InMemory, class: in_memory_provider_1.default },
            { provider: provider_1.ProvidersEnum.Memcached, class: memcached_provider_1.default }
        ];
        const defaultProvider = {
            provider: provider_1.ProvidersEnum.InMemory,
            class: in_memory_provider_1.default
        };
        const provider = providers.find(p => p.provider === options.provider) || defaultProvider;
        const client = new provider.class(options);
        return client;
    }
}
exports.Cache = Cache;
//# sourceMappingURL=index.js.map