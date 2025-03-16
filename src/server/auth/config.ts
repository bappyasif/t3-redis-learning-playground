import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { redirect } from "next/dist/server/api-utils";
import GoogleProvider from "next-auth/providers/google";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    // DiscordProvider,
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        redirect_uri: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com/api/auth/callback/google' : 'http://localhost:3000/api/auth/callback/google'
      }
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   // redirect_uri: 'http://localhost:3000/api/auth/callback/github',
    //   authorization: {
    //     redirect_uri: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com/api/auth/callback/github' : 'http://localhost:3000/api/auth/callback/github'

    //   }
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   authorization: {
    //     url: 'https://github.com/login/oauth/authorize',
    //     params: {
    //       scope: 'read:user',
    //     },
    //     redirect_uri: 'http://localhost:3000/api/auth/callback/github',
    //     callbackUrl: 'http://localhost:3000/api/auth/callback/github',
    //     // url: "https://github.com/login/oauth/authorize",
    //   },
    //   token: 'https://github.com/login/oauth/access_token',
    // }),
    // redirect: {
    //   callbackUrl: '/api/auth/callback/github',
    //   url: 'http://localhost:3000',
    // },
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   authorization: {
    //     url: 'https://github.com/login/oauth/authorize',
    //     params: {
    //       scope: 'read:user',
    //     },
    //   },
    //   // token: 'https://github.com/login/oauth/access_token',
    //   redirectProxyUrl: 'http://localhost:3000/api/auth/callback/github',
    //   // redirect_uri: 'http://localhost:3000/api/auth/callback/github',
    // }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  
} satisfies NextAuthConfig;

// export const authConfig: NextAuthConfig = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       authorization: {
//         url: 'https://github.com/login/oauth/authorize',
//         params: {
//           scope: 'read:user',
//         },
//         redirect_uri: 'http://localhost:3000/api/auth/callback/github',
//       },
//       token: 'https://github.com/login/oauth/access_token',
//     }),
//   ],
//   adapter: PrismaAdapter(db),
//   callbacks: {
//     session: ({ session, user }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: user.id,
//       },
//     }),
//   },
//   pages: {
//     signIn: '/auth/signin',
//     signOut: '/auth/signout',
//     error: '/auth/error',
//   },
//   redirect: {
//     callbackUrl: '/api/auth/callback/github',
//     url: 'http://localhost:3000',
//   },
// };
