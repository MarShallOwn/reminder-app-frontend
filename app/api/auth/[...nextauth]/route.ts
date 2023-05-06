import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
    },

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) return null;

                console.log(credentials)
                const user = { id: "1", name: "Admin", email: "admin@admin.com" };

                return user;
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              randomKey: token.randomKey,
            },
          };
        },
        jwt: ({ token, user }) => {
          if (user) {
            const u = user as unknown as any;
            return {
              ...token,
              id: u.id,
              randomKey: u.randomKey,
            };
          }
          return token;
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };