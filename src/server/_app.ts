import { router } from "./trpc";
import { exampleRouter } from "./routers/example";
import { usersRouter } from "./routers/users";
import { redisExampleRouter } from "./routers/redis-example";
import { ioredisExampleRouter } from "./routers/ioredis-example";
import { redisUpstashRouter } from "./routers/redis-upstash";

export const appRouter = router({
    example: exampleRouter,
    users: usersRouter,
    redisExample: redisExampleRouter,
    ioredisExample: ioredisExampleRouter,
    redisUpstash: redisUpstashRouter
});

export type AppRouter = typeof appRouter;