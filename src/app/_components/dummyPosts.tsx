"use client";

import Link from "next/link";
import { api } from "~/trpc/react";

export const DummyPosts = () => {
    const [posts, rests] = api.dummyPosts?.allPosts.useSuspenseQuery();

    // const {data: posts, error} = api.dummyPosts.allPosts.useQuery();

    if (!posts) return null;

    if (rests?.error) return <div>{rests?.error.message}</div>;

    if(rests?.isLoading) return <div>Loading...</div>;

    console.log(posts?.length);
    console.log(rests, "?!?!", rests?.data?.length);

    return (
        <div className="flex flex-col gap-4">
            {posts?.map((post) => (
                <Link key={post.id} href={`/dummy-posts/${post.id}`} className="text-2xl hover:underline">
                    {post.title}
                </Link>
            ))}
        </div>
    );
};