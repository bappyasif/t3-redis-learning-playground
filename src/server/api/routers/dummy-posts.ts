import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { redis } from "~/redis/redis-instance";


export const dummyPostsRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),
    allPosts: publicProcedure
        .output(
            z.array(
                z.object({
                    id: z.number(),
                    title: z.string(),
                    body: z.string(),
                })
            )
        )
        .query(async () => {
            const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
            return posts.json();
        }),
    postById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input }) => {
            const post = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${input.id}`
            );
            return post.json();
        }),
    cachedPost: publicProcedure.input(z.object({ id: z.string() }))
        .output(z.object({
            id: z.number(),
            title: z.string(),
            body: z.string(),
            userId: z.number(),
        }))
        .query(async ({ input }) => {
            const cachedPost = await redis.get(`dummy-post-${input.id}`);

            // console.log(cachedPost, "cachedPost", input.id);

            if (cachedPost) {
                console.log("Returning cached post");
                return cachedPost;
            }
            console.log("Fetching new post");

            const resp = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${input.id}`
            );

            const post = await resp.json();

            redis.setex(`dummy-post-${input.id}`, 60, JSON.stringify(post));

            return post;

        }),
    updatePostById: publicProcedure
        .input(z.object({ id: z.number(), title: z.string() }))
        .mutation(async ({ input }) => {
            const post = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${input.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        title: input.title,
                    }),
                }
            );
            return post.json();
        }),
    // .query(async ({ input }) => {
    //     const cachedPost = await redis.get(`dummy-post-${input.id}`);

    //     console.log(cachedPost, "cachedPost", input.id);

    //     if (cachedPost) {
    //         console.log("Returning cached post");
    //         return cachedPost;
    //     }
    //     console.log("Fetching new post");

    //     const resp = await fetch(
    //         `https://jsonplaceholder.typicode.com/posts/${input.id}`
    //         // "https://jsonplaceholder.typicode.com/posts/1"
    //     );

    //     const post = await resp.json();

    //     redis.setex(`dummy-post-${input.id}`, 60, JSON.stringify(post));

    //     return resp;
    // }),
    // cachedPost: publicProcedure.input(z.object({ id: z.string() }))
    //     .output(z.object({
    //         id: z.number(),
    //         title: z.string(),
    //         body: z.string(),
    //         userId: z.number(),
    //     }))
    //     .query(async ({ input }) => {
    //         const cachedPost = await redis.get(`dummy-post-${input.id}`);

    //         console.log(cachedPost, "cachedPost", input.id);

    //         if (cachedPost) {
    //             console.log("Returning cached post");
    //             return cachedPost;

    //             // return JSON.parse(cachedPost);
    //         }
    //         console.log("Fetching new post");

    //         const resp = await fetch(
    //             // `https://jsonplaceholder.typicode.com/posts/${input.id}`
    //             "https://jsonplaceholder.typicode.com/posts/1"
    //         );

    //         const post = await resp.json();

    //         console.log(post, "resp!!");

    //         // redis.set(`post-${input.id}`, post.json());
    //         // redis.setex(`dummy-post-${input.id}`, 60, JSON.stringify(resp.json()));
    //         redis.setex(`dummy-post-${input.id}`, 60, JSON.stringify(post));
    //         // return post.json();
    //         return resp;
    //     }),
});