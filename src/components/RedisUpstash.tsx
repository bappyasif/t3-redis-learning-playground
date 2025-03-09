"use client"

import { trpc } from "@/app/_trpc/client"

export const RedisUpstash = () => {
    const { data, isLoading, error } = trpc.redisUpstash.getUpstashUser.useQuery()
    console.log(data, "!!data!!")
    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <div className="flex flex-col items-center justify-center p-24">
            <h1>Redis Upstash</h1>
            {JSON.stringify(data)}
        </div>
    )
}