import { publicProcedure, router } from "../trpc";
import { redisUpstashClient } from "../redis-upstash";

export const redisUpstashRouter = router({
    getUpstashUser: publicProcedure.query(async () => {
        const user = await fetch("https://jsonplaceholder.typicode.com/users/1")
        if (user.ok) {
            const cachedUser = await redisUpstashClient.get("user-upstash")
            if(!cachedUser) {
                const userData = await user.json()
                await redisUpstashClient.set("user-upstash", JSON.stringify(userData), { ex: 60 }) // 60 seconds expiration
                console.log("Fetched users from API")
                return userData
            } else {
                console.log("Fetched users from cache")
                // return JSON.parse(cachedUsers)
                return cachedUser
            }
        } else {
            return "could not fetch users"
        }
    })
})