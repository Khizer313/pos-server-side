"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: 'redis://localhost:6379',
});
exports.redisClient = redisClient;
redisClient.on('error', (err) => console.error('Redis Client Error', err));
async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log('✅ Redis connected successfully');
    }
}
//# sourceMappingURL=redis.client.js.map