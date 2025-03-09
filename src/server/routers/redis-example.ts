import { redisLocalClient } from "../redis-local";
import { publicProcedure, router } from "../trpc";

export const redisExampleRouter = router({
    getRcUsers: publicProcedure.query(async () => {
        const users = await fetch("https://jsonplaceholder.typicode.com/users")
        if (users.ok) {
            const cachedUsers = await redisLocalClient.get("users")
            if(!cachedUsers) {
                await redisLocalClient.set("users", JSON.stringify(await users.json()))
                await redisLocalClient.expire("users", 60) // 60 seconds
                console.log("Fetched users from API")
                return users.json()
            } else {
                console.log("Fetched users from cache")
                return JSON.parse(cachedUsers)
            }
        } else {
            return "could not fetch users"
        }
    })
})