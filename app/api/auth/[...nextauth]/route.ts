import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { RefreshAccessTokenAPI, loginAPI } from "@/app/services";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        try {
          const res = await loginAPI({ email, password });

          const result = await res.json();

          console.log("data: ", result.response.data);

          if (result.response?.data?.tokens?.accessToken) {
            return result.response.data;
          }

          return null;
        } catch (err: unknown) {
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if(token) {
        session.user.id = token.id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.email = token.email;
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        }
      }

      // if still valid return the token
      if( Date.now() < token.tokens.accessTokenExpiry * 1000) {
        return token;
      }

      try {
      // if not valid then request another token
      //const newAccessToken = refresh
      const res = await RefreshAccessTokenAPI({token: token.tokens.refreshToken as string})

      const result = await res.json();

      return {
        ...token,
        accessToken: result.data.accessToken,
        accessTokenExpiry: result.data.accessTokenExpiry
      }
      } catch {
        return { ...token, error: "RefreshAccessTokenError" as const }
      }

    },
  },
};

type Tokens = {
  accessToken: string,
  refreshToken: string,
  accessTokenExpiry: number
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      firstname: string,
      lastname: string,
      email: string,
    }
    error?: "RefreshAccessTokenError"
  }

  interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    tokens: Tokens
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    tokens: Tokens,
    error?: "RefreshAccessTokenError"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
