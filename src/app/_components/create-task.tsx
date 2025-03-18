"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { signIn } from 'next-auth/react'

export const CreateTask = () => {
    const { status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (status === "unauthenticated") {
        return <div>Please sign in to create tasks.</div>;
    }

    return (
        <div>
            <h1>CreateTask</h1>
            {
                status !== "authenticated" ? (
                    <div>
                        <button onClick={() => signIn()}>Sign in</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => signOut()}>Sign out</button>
                    </div>
                )
            }
            <TaskForm />
        </div>
    );
};

const TaskForm = () => {
    const [task, setTask] = useState("");

    const {status, data} = useSession();

    // const {} = api.tasks.all.useQuery();
    const { mutate } = api.tasks.createTask.useMutation();

    const utils = api.useUtils();

    const handleTaskCreate = () => {
        console.log(task, data);
        // mutate({ text: task, userId: "1" });
        if (data?.user?.id) {
            mutate({ text: task, userId: data.user.id }, {
                onSuccess: () => {
                    utils.tasks.all.invalidate();
                    console.log("Task created - invalidate list");
                },
            });
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleTaskCreate();
        setTask("");
    };

    // if (status === "loading") {
    //     return <div>Loading...</div>;
    // }

    // if (status === "unauthenticated") {
    //     return <div>Please sign in to create tasks.</div>;
    // }

    return (
        <div>
            <h1>TaskForm</h1>
            
            <form action="" method="post" onSubmit={handleSubmit}>
                <input type="text" className="w-full text-black" value={task} onChange={(e) => setTask(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};