"use client"

import { trpc } from "@/app/_trpc/client"

export const IoredisExample = () => {
    const { data, isLoading, error } = trpc.ioredisExample.getUsersIorc.useQuery(undefined, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 60000, // Match Redis cache time (60 seconds)
    })

    console.log(data, "!!data!!")

    if (error) return <div>{error.message}</div>

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <h1>Ioredis Example</h1>
            {JSON.stringify(data)}
        </div>
    )
}