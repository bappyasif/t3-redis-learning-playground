import { createTRPCProxyClient, createWSClient, httpBatchLink, httpLink, loggerLink, splitLink, wsLink } from "@trpc/client"

import { AppRouter } from "../../server/index.ts"

const wsClient = createWSClient({
    url: "ws://localhost:3001/trpc"
})

const client = createTRPCProxyClient<AppRouter>({
    links: [
        loggerLink(), // this will log all requests in console in color coded way

        // split link helps us to decide which link to use based on some condition
        splitLink({
            condition: op => {
                return op.type === "subscription"
            },
            true: wsLink({
                client: wsClient
                // client: createWSClient({
                //     url: "ws://localhost:3001/trpc"
                // })
            }),
            false: httpBatchLink({
                url: "http://localhost:3001/trpc",
                // we can send headers here, e.g. auth token
                headers: {
                    "custom-header": "custom-header-value"
                }
            }),
        }),

        // lets define ws link
        // wsLink({
        //     client: createWSClient({
        //         url: "ws://localhost:3001/trpc"
        //     })
        // }), 
        // httpBatchLink({
        //     url: "http://localhost:3001/trpc",
        //     // we can send headers here, e.g. auth token
        //     headers: {
        //         "custom-header": "custom-header-value"
        //     }
        // }),
        // we can also use others link in here as well which will be executed in order

        // this wont batch multiple requests in a single call rather it will send one request at a time
        // httpLink({
        //     url: "http://localhost:3001/trpc",
        // })


    ]
})

const main = async () => {
    /**
     * as we used httpBatchLink, we can multiple requests at once and it will be batched, as in count as one call and returned values will be sent back in an array of results
     * 
     * 
     * e.g lets call this multiple times and will see that in network tab we will see only one request with response back from server with their responses
     * 
     * ```ts
     * await client.sayHi.query()
     * await client.sayHi.query()
     * await client.sayHi.query()
     * await client.sayHi.query()
     * ```
     */
    const result = await client.sayHi.query()
    console.log(result);

    // type safety is now included thanks to trpc client
    const mutationResult = await client.logToServer.mutate("hiiii")
    console.log(mutationResult);

    // this will fail as type is not string
    // await client.logToServer.mutate(2)

    // this will fail as procedure is not defined or does not exist
    // await client.log.mutate("hiiii")

    // making use of nested routers defined in server side
    // const user = await client.users.getUser.query() // this wont work as we are not giving it a string typed param

    // this will fail now as we have changed our userProcedure in server which is expecting it to be an opbject with userId as string
    // const user = await client.users.getUser.query("John Doe") // this will work as we are giving it a string typed param as defined at userProcedure in server
    // console.log(user);

    const user = await client.users.getUser.query({ userId: "1234" }) // this will work as we are giving it an object with userId as string as defined in userProcedure in server
    console.log(user);

    // making use of mutate procedure from nested users router
    const updatedUser = await client.users.updateUser.mutate({ userId: "12341234", name: "John Doe" }) // you will see in procedure definition that it is expecting an object with name but we will also have to include userId as this aggregated on top of userProcedure
    console.log(updatedUser);

    const updatedUserDefinedOutput = await client.users.updateUserDefinedOutput.mutate({ name: "John Doe", userId: "12341234" })
    console.log(updatedUserDefinedOutput);

    // right now just making use of nested routers defined in server side

    // unless we uncomment codes from server side, following scenarios will fail

    // if we were to making use of merged routers defined in server side
    // const mergedResult = await client.getUser.query() // as you can see its no longer nested within root router
    // console.log(mergedResult);

    // making use of admin only procedures
    const secretData = await client.secretData.query() // this will throw unauthorized error as isAdmin is false, which we have defined in server (ideally it will be true after authentication by user)
    console.log(secretData);

    // to see ws calls in action we need to subscribe to onUpdate procedure
    await client.users.onUpdate.subscribe(undefined, {
        onData: data => {
            console.log(data, "updated!!");
        }
    })

    // now if needed we can also close our entire subscription
    wsClient.close()
    
}

// to see ws calls in action
// on each click event we are triggering a mutation which will trigger onUpdate subscription
// by doing that we can see ws calls and if we open up another tab within browser, we can see same thing happening, meaning ws calls are persistent throughout all tabs/browsers, thats what is so coll about ws
document.addEventListener("click", async () => {
    // await client.users.updateUserDefinedOutput.mutate({ name: "John Doe", userId: "12341234" })

    // ws example of subscription with connection
    const connection = await client.users.onUpdate.subscribe(undefined, {
        onData: data => {
            console.log(data, "updated!!");
        }
    })

    // after we are done with our subscription, we can unsubscribe
    connection.unsubscribe()
})

main()
// console.log("hello world");