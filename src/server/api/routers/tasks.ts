import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tasksRouters = createTRPCRouter({
    all: publicProcedure.query(({ ctx }) => {
        // we are getting access to db as we have included it in trpc context definition in trpc.ts
        // console.log(ctx.db.task.findMany(), "db");

        return ctx.db.task.findMany();
        // return [{
        //     id: "1",
        //     text: "Task 1",
        //     userId: "1",
        //     updatedAt: new Date(),
        //     createdAt: new Date(),
        // }]
    }),
    createTask: publicProcedure
    .input(z.object({ text: z.string(), userId: z.string() }))
    .output(z.object({ id: z.string(), text: z.string(), userId: z.string(), updatedAt: z.date(), createdAt: z.date() }))
    .mutation(({ ctx, input }) => {
        return ctx.db.task.create({
            data: {
                text: input.text,
                userId: input.userId,
            },
        });
    }),
});