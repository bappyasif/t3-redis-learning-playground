import { userRouter } from "./routers/user";
import { trpcRouter } from "./trpc";

export const appRouter = trpcRouter({
  user: userRouter
})

export type AppRouter = typeof appRouter;