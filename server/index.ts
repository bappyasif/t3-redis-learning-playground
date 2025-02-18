import {createExpressMiddleware} from "@trpc/server/adapters/express";

import { appRouter, mergedRouter } from "./routers";

const express = require('express')

var cors = require('cors')

const app = express()

app.use(cors({origin: "http://localhost:5173"}))

app.use("/trpc", createExpressMiddleware({
    // router: appRouter,

    // making use of merged router
    router: mergedRouter
}))

const port = 3001

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// export type AppRouter = typeof appRouter

export type AppRouter = typeof mergedRouter