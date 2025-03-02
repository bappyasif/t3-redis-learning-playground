import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/server/index"

const handler = (req: Request) => {
    try {
        return fetchRequestHandler({
            req,
            router: appRouter,
            createContext: () => ({}),
            endpoint: "/api/trpc",
            onError: ({ error }) => {
                console.error('tRPC error:', error)
                return {
                    message: error.message,
                    code: error.code,
                    // data: error.data
                }
            }
        })
    } catch (error) {
        console.error('Error in tRPC handler:', error)
        return new Response('Internal Server Error', { status: 500 })
    }
}

export { handler as GET, handler as POST }