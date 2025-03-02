import { fetchUser } from "@/fetchMethods/getUser";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export const GET = async (request: Request, response: NextResponse) => {
    const cachedUser = await redis.get("user-fe");
    
    if(cachedUser) {
        console.log("Returning cached user, no db lookup");
        return NextResponse.json({"msg": "Hello World!", "user": JSON.parse(cachedUser)})
    }

    // const { jsonUser } = await request.json();

    const jsonUser = await fetchUser()

    await redis.set("user-fe", JSON.stringify(jsonUser))

    console.log("Stored user in cache, one db lookup");

    return NextResponse.json({"msg": "Hello World!", "user": jsonUser})
}