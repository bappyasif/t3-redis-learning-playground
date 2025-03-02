// import Redis from "ioredis";

// const client = new Redis(process.env.REDIS_URL);
// client.set('foo', 'bar').then(() => console.log("Connected to Redis"));

import {Redis} from "ioredis";

const getRedisUrl = () => {
    if(!process.env.REDIS_URL) {
        throw new Error("REDIS_URL is not defined");
    }
    return process.env.REDIS_URL;
}

export const redis = new Redis(getRedisUrl());

// redis.on("connect", () => {
//     console.log("Connected to Redis", redis.status);
// })

// redis.on("error", (error: Error) => {
//     console.log("Error connecting to Redis", error, process.env.REDIS_URL);
// })