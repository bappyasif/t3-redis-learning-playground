const express = require('express')

var cors = require('cors')

import {initTRPC} from "@trpc/server";

import {createExpressMiddleware} from "@trpc/server/adapters/express";

const t = initTRPC.create();

const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        return "hi: server"
    }),
    logToServer: t.procedure.input(v => {
        if(typeof v === "string") {
            return v
        } else {
            throw new Error("Invalid input: expected string")
        }
    }).mutation(req => {
        console.log(`client says ${req.input}`);

        return true // just to let client know that this was successfully performed
    })
})

const app = express()

app.use(cors({origin: "http://localhost:5173"}))

app.use("/trpc", createExpressMiddleware({
    router: appRouter
}))

const port = 3001

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export type AppRouter = typeof appRouter