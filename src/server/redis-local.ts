import { createClient } from "redis";

const redisLocalClient = createClient();

redisLocalClient.on("error", (err) => {
    console.log(err);
});

await redisLocalClient.connect();

redisLocalClient.on("ready", () => {
    console.log("Redis client is ready");
});

export {redisLocalClient};