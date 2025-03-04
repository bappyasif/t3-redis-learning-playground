"use client"

import { trpc } from '@/app/_trpc/client';
import React from 'react'

export const MutateUser = ({userId}: {userId: string}) => {
    const { mutate, isError, error } = trpc.users.mutateUser.useMutation()

    if (isError) return <div>{error.message}</div>

    // basic mutate example usecase
    // const handleClick = () => {
    //     mutate({ id: userId, name: "ab" })
    // }

    // advanced mutate example usecase, where onSuccess is a function that refetches the data to see updated data
    const { data, refetch } = trpc.users.getUser.useQuery({ id: userId })
    
    const handleClick = () => {
        mutate({ id: userId, name: "ab" }, {
            onSuccess: (respo) => {
                console.log(respo, "respo")
                refetch()
            }
        })
    }

    return (
        <div>
            <button onClick={handleClick}>Mutate User</button>
        </div>
    )
}