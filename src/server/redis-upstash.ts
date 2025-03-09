import { Redis } from "@upstash/redis"

const redisUpstashClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export {redisUpstashClient};