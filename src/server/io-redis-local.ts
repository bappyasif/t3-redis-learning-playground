import { Redis } from "ioredis"

const ioRedisLocalClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

ioRedisLocalClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

ioRedisLocalClient.on("connect", () => {
    console.log("Redis client connected");
});

export {ioRedisLocalClient};
