import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? "world"}!`,
        timestamp: new Date().toISOString(),
      };
    }),
  // Add more procedures here
  helloMutate: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .mutation(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? "world"}!`,
        timestamp: new Date().toISOString(),
      };
    }),
});
