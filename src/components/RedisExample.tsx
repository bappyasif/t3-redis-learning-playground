"use client"

import { trpc } from "@/app/_trpc/client"

export const RedisExample = () => {
    const { data, isLoading, error } = trpc.redisExample.getRcUsers.useQuery()

    console.log(data, "!!data!!")

    if (error) return <div>{error.message}</div>

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <h1>Redis Example</h1>
            {JSON.stringify(data)}
        </div>
    )
}