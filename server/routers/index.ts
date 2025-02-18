import { t } from "../trpc";
import { usersRouter } from "./users";

export const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        return "hi: server"
    }),
    logToServer: t.procedure.input(v => {
        if(typeof v === "string") {
            return v
        } else {
            throw new Error("Invalid input: expected string")
        }
    }).mutation(req => {
        console.log(`client says ${req.input}`);

        return true // just to let client know that this was successfully performed
    }),

    // we can nest procedures from other routers
    users: usersRouter
})

// we can also make use of merged routers so that we dont want to nest them within our root router
export const mergedRouter = t.mergeRouters(appRouter, usersRouter)