import { initTRPC } from "@trpc/server";

export const t = initTRPC.create(); // as you dont this to be instantiated multiple time in app, we can make it a singleton