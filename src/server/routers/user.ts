import { redis } from "@/lib/redis";
import { publicProcedure, trpcRouter } from "../trpc";
import { fetchUser } from "@/fetchMethods/getUser";

// const userProcedure = publicProcedure.input(v => {
//     if(typeof v === "string") {
//         return v
//     } else {
//         throw new Error("Invalid input: expected string")
//     }
// })

const userProcedure = publicProcedure.input((v): { name: string } => {
  if (typeof v !== "object" || v === null) {
    throw new Error("Invalid input: expected object");
  }

  const { name = "" } = v as { name?: string };
  if (typeof name !== "string") {
    throw new Error("Invalid input: expected 'name' to be a string");
  }

  return { name };
});

export const userRouter = trpcRouter({
  getUser: publicProcedure.query(async () => {
    const cachedUser = await redis.get("user-trpc")

    if (cachedUser) {
      console.log("Returning cached user from trpc")
      return JSON.parse(cachedUser)
    }

    const jsonUser = await fetchUser()

    await redis.set("user-trpc", JSON.stringify(jsonUser))
    console.log("Stored user in cache from trpc")

    return jsonUser
  }),
  updateUser: userProcedure
    .mutation(async ({ input }) => {
      console.log("Updating", input)
      const updatedUser = await fetchUser()
      updatedUser.name = input.name
      return updatedUser
    }),
  updateName: publicProcedure.input(v => typeof v === "string").mutation(({ input }) => {
    console.log("Updating name", input)
    return ({
      name: input
    })
  }),
  updateSmthng: publicProcedure.mutation(() => {
    console.log("Updating smthng")
    return ({
      name: "smthng"
    })
  })
})