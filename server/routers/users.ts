import { t } from "../trpc";
import { z } from "zod";

// as this way of validation becomes very tideonous, we can make use of input validator library such as zod
// const userProcedure = t.procedure.input(v => {
//     if(typeof v === "string") {
//         return v
//     } else {
//         throw new Error("Invalid input: expected string")
//     }
// })

// this is exactly equivalent to above code but is more readable and less error prone
// const userProcedure = t.procedure.input(z.string())

// not making use of query input param
// export const usersRouter = t.router({
//     getUser: userProcedure.query(() => {
//         return {
//             id: 1,
//             name: "John Doe"
//         }
//     })
// })

// lets consider our input validator is expecting an object with userId
const userProcedure = t.procedure.input(z.object({
    userId: z.string()
}))

export const usersRouter = t.router({
    getUser: userProcedure.query(({ input }) => {
        return {
            id: input.userId, // this will be validated by zod as per defined in userProcedure
            name: "John Doe"
        }
    }),

    // as we are aggregating on userProcedure input validator, it will concat with waht was already been defined there, for example userId
    updateUser: userProcedure.input(z.object({ name: z.string() })).mutation((req) => {
        // now that we have included typed safe context in middleware and in trpc instantiation, we can access it here
        console.log(req.ctx.isAdmin)
        console.log(`User ${req.input.userId} updated to ${req.input.name}`)
        return {
            id: req.input.userId,
            name: req.input.name
        }
    }),

    // with output schema defined
    updateUserDefinedOutput: userProcedure
        .input(z.object({ name: z.string() }))
        .output(z.object({ id: z.string(), name: z.string() }))
        .mutation((req) => {
            console.log(`User ${req.input.userId} updated to ${req.input.name}`)

            // basically whatever is defined in output schema will be returned to client back, and whatever is not defined in output schema will not be returned

            // also we cant sent back data without meeting output schema
            return {
                // id2: req.input.userId, // this will fail as it is not part of output schema
                id: req.input.userId,
                name: req.input.name,
                password: "password" // password is not going to be passed back to client, because we have defined output where password is not included
            }
        })
})