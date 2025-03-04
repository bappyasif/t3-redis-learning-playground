import { router } from "./trpc";
import { exampleRouter } from "./routers/example";
import { usersRouter } from "./routers/users";

export const appRouter = router({
    example: exampleRouter,
    users: usersRouter
});

export type AppRouter = typeof appRouter;