import { adminProcedure, t } from "../trpc";
import { redisAndTrpcWithoutRedisRouter } from "./redis-and-trpc";
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
        // as per current implementation we wont be seeing any type safety within ctx!!
        // console.log(req.ctx, req.ctx.req, req.ctx.res)
        console.log(`client says ${req.input}`);

        return true // just to let client know that this was successfully performed
    }),

    // we can nest procedures from other routers
    users: usersRouter,

    // lets make use of admin only procedures
    secretData: adminProcedure.query(({ctx}) => {
        console.log(ctx.user, ctx.isAdmin)
        return "secret data for admin only riouters"
    }),

    // lets make use of trpc and redis
    trpc_and_redis: redisAndTrpcWithoutRedisRouter
})

// we can also make use of merged routers so that we dont want to nest them within our root router
// export const mergedRouter = t.mergeRouters(appRouter, usersRouter)