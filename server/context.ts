import { CreateExpressContextOptions } from "@trpc/server/adapters/express"

// as we are using express we could make it typed safe with express context options
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
    return {
        isAdmin: true,
        req,
        res
    }
}