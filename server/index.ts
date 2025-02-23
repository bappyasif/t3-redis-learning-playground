import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler, WSSHandlerOptions } from "@trpc/server/adapters/ws"
import ws from "ws"

import {
  appRouter
  // , mergedRouter 
} from "./routers";
import { createContext } from "./context";
import { redisWithoutTrpcRouter } from "./routers/redis-w-o-trpc";

const express = require('express')

var cors = require('cors')

const app = express()

app.use(cors({ origin: "http://localhost:5173" }))

app.use("/trpc", createExpressMiddleware({
  router: appRouter,

  // if we were to making use of merged router
  // router: mergedRouter



  // use of context within middleware

  // if we dont define it then we wont be getting access (e.g. undefined) to context anywhere within our routers procedures

  // if we define like this we'll get context in our procedures but it wont be typed safe!!

  // createContext: ({ req, res }) => (
  //     {
  //         req,
  //         res
  //     }
  // ),

  // now with typed safe context we can get access to typed safe props from context
  createContext: createContext
}))

const port = 3001

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

// only making use of router without trpc to see redis in action
app.use(redisWithoutTrpcRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// not making use of ws now, to ommit error either take out ":ecpress types" from dependency or edit context.ts file
// const server = app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// applyWSSHandler({
//   wss: new ws.Server({ server }),
//   router: appRouter,
//   createContext
// })

export type AppRouter = typeof appRouter

// if we were to make use of merged router
// export type AppRouter = typeof mergedRouter