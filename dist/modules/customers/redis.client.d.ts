declare const redisClient: any;
declare function connectRedis(): Promise<void>;
export { redisClient, connectRedis };
