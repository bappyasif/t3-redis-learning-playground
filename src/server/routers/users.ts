import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
    getUsers: publicProcedure.query(async () => {
        const users = await fetch("https://jsonplaceholder.typicode.com/users")
        if (users.ok) {
            return users.json()
        } else {
            return "could not fetch users"
        }
    }),
    getUser: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        if (!input.id) {
            return "id is required"
        }
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${input.id}`)
        if (user.ok) {
            return user.json()
        } else {
            return "could not fetch user"
        }
    }),
    mutateUser: publicProcedure.input(z.object({ id: z.string(), name: z.string() })).mutation(async ({ input }) => {
        if (!input.id) {
            return "id is required"
        }
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${input.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: input.name })
        })
        if (user.ok) {
            console.log(user.status, user.statusText)
            return user.json()
        } else {
            return "could not update user"
        }
    }),
})