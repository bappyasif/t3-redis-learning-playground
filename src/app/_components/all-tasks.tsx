"use client"

import { api } from "~/trpc/react";

export const AllTasks = () => {
    const {data, isLoading, error} = api.tasks.all.useQuery();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!data) return <div>No data</div>;
    
    return (
        <div>
            <h1>AllTasks</h1>
            <ul>
                {data.map((task) => (
                    <li key={task.id}>{task.text} - {task.userId} - {task.id}</li>
                ))}
            </ul>
        </div>
    );
};