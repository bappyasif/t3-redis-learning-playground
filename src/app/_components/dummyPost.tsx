"use client";

import { api } from "~/trpc/react";

export const DummyPost = ({ id }: { id: string }) => {
    if (!id) return null;

    const { data, error, isLoading } = api.dummyPosts.cachedPost.useQuery({ id: id });

    const utils = api.useUtils();

    const { mutate, isPending } = api.dummyPosts.updatePostById.useMutation({
        onSuccess: (data) => {
            console.log(data, "updated post");
            utils.dummyPosts.cachedPost.invalidate();
        },
    });


    if (!data?.id) return null;

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>{error.message}</div>;

    console.log(data, id);

    return (
        <div>
            <div>{data.id}</div>
            <div>{data.title}</div>
            <div>{data.body}</div>

            <button disabled={isPending} onClick={() => mutate({ id: data.id, title: "Updated title" })}>Update</button>
        </div>
    );
};