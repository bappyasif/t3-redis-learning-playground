import { publicProcedure, router } from "../trpc";
import { ioRedisLocalClient } from "../io-redis-local";

// import {Redis} from "ioredis"

// const ioRedisLocalClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export const ioredisExampleRouter = router({
    getUsersIorc: publicProcedure.query(async () => {
        const users = await fetch("https://jsonplaceholder.typicode.com/users")
        if (users.ok) {
            const cachedUsers = await ioRedisLocalClient.get("users-iorc")
            if(!cachedUsers) {
                const usersData = await users.json()
                await ioRedisLocalClient.set("users-iorc", JSON.stringify(usersData))
                await ioRedisLocalClient.expire("users-iorc", 60) // 60 seconds
                console.log("Fetched users from API")
                return usersData
            } else {
                console.log("Fetched users from cache")
                return JSON.parse(cachedUsers)
            }
        } else {
            return "could not fetch users"
        }
    })
})