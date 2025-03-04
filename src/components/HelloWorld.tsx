"use client";

import { trpc } from '@/app/_trpc/client';

export function HelloWorld() {
  const { data, isLoading } = trpc.example.hello.useQuery({ name: 'tRPC' });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data?.greeting}</h1>
      <p>Server time: {data?.timestamp}</p>
    </div>
  );
}
