import {fetchRequestHandler} from "@trpc/server/adapters/fetch";

import {appRouter} from "@/server/_app";

const handler = (req: Request) => {
    return fetchRequestHandler({
        router: appRouter,
        createContext: () => ({}),
        req,
        endpoint: "/api/trpc",
    })
}

export {handler as GET, handler as POST};