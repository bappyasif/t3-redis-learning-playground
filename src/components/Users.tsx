"use client";

import { trpc } from '@/app/_trpc/client';
import Link from 'next/link';
import React from 'react'

export function Users() {
    const { data, isLoading, isError, error } = trpc.users.getUsers.useQuery();
    if (isError) return <div>{error.message}</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            {data?.map((user: { id: number; name: string }) => (
                <Link key={user.id} href={`/users/${user.id}`}>{user.name} {user.id}</Link>
                // <div key={user.id}>{user.name} {user.id}</div>
            ))}
        </div>
    )
}
