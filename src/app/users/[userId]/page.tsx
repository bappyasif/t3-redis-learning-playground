"use client"

import { trpc } from '@/app/_trpc/client';
import React from 'react'
import { MutateUser } from './_components/MutateUser';
import { useParams } from 'next/navigation';

// {params}: {params: {userId: string}} // nextjs 15 has a way to get the params for a client component
export default function page() {
    // const router = useRouter()
    // const { userId } = router.query
    const { userId } = useParams();
    const { data, isLoading, isError, error } = trpc.users.getUser.useQuery({ id: userId as string });
    if (isError) return <div>{error.message}</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <h1>User {userId}</h1>
            <div>
                <p>Name: {data?.name}</p>
                <MutateUser userId={userId as string} />
            </div>
        </div>
    )
}
