import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "./context";

// with including context approach for typed safe access to context props
export const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create(); // as you dont this to be instantiated multiple time in app, we can make it a singleton

// without using any context
// export const t = initTRPC.create(); // as you dont this to be instantiated multiple time in app, we can make it a singleton


// context is useful for handling auth, logging, etc
// trpc has middleware built in for handling auth, logging, etc very easily

// lets have a look at a example middleware for only authenticated users who are isAdmin
const isAdminMiddleware = t.middleware(({ ctx, next }) => {
    if(!ctx.isAdmin) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return next({
        // if we keep it blank our context will pass through with whatever is it that context pass through to next

        // we are now overwriting our context for our admin user
        ctx: {
            user: {
                name: "John Doe",
                email: "z8Y6I@example.com",
                id: "1234"
            }
        }
    })
})

// this procedure will be wrapped by isAdminMiddleware and will only be accessible to admin whereas t singleton will be accessible to all users
export const adminProcedure = t.procedure.use(isAdminMiddleware)