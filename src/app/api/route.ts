import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export const GET = async (request: Request, response: NextResponse) => {
    const cachedUser = await redis.get("user");
    
    if(cachedUser) {
        console.log("Returning cached user, no db lookup");
        return NextResponse.json({"msg": "Hello World!", "user": JSON.parse(cachedUser)})
    }

    const fetchUser = await fetch("https://jsonplaceholder.typicode.com/users/1")

    const jsonUser = await fetchUser.json()

    await redis.set("user", JSON.stringify(jsonUser))

    console.log("Stored user in cache, one db lookup");

    // await redis.set("hello", "world");
    // if(redis.status) {
    //     await redis.set("hello", "world");
    // }
    
    return NextResponse.json({"msg": "Hello World!", "user": jsonUser})
};