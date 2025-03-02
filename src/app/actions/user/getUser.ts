"use server"

import { fetchUser } from "@/fetchMethods/getUser"
import { redis } from "@/lib/redis"

export const getUser = async () => {
    const cachedUser = await redis.get("user")
    
    if(cachedUser) {
        console.log("Returning cached user from server action")
        return JSON.parse(cachedUser)
    }

    // const fetchUser = await fetch("https://jsonplaceholder.typicode.com/users/1")
    // const jsonUser = await fetchUser.json()

    const jsonUser = await fetchUser()
    
    await redis.set("user", JSON.stringify(jsonUser))
    console.log("Stored user in cache from server action")
    
    return jsonUser
}
