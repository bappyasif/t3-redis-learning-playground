import { redis } from "@/lib/redis";
import { publicProcedure, trpcRouter } from "../trpc";
import { fetchUser } from "@/fetchMethods/getUser";

export const userRouter = trpcRouter({
  getUser: publicProcedure.query( async() => {
    const cachedUser = await redis.get("user-trpc")
    
    if(cachedUser) {
      console.log("Returning cached user from trpc")
      return JSON.parse(cachedUser)
    }

    const jsonUser = await fetchUser()
    
    await redis.set("user-trpc", JSON.stringify(jsonUser))
    console.log("Stored user in cache from trpc")
    
    return jsonUser
  })
})