"use client";

import { trpc } from "@/app/_trpc/client";

export const HelloMutate = () => {
    const { mutate, isPending, error, data, isError } = trpc.example.helloMutate.useMutation();

    const handleClick = () => {
        mutate({name: "ab"});
    }

    return (
        <div>
            <h1>hello mutate</h1>
            <button onClick={handleClick} disabled={isPending}>
                {isPending ? "Pending..." : "Click me"}
            </button>
            {isError && <p>{error.message}</p>}
            {data && <p>{data.greeting} {data.timestamp}</p>}
        </div>
    );
}