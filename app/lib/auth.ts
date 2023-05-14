import { NextAuthOptions } from "next-auth";
import { RefreshAccessTokenAPI, loginAPI } from "../services";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt" as const,
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
  
            if (result.response?.data?.tokens?.accessToken) {
              return result.response.data;
            }
  
            throw new Error("invalid credentials")
          } catch (err: unknown) {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if(token) {
          session.error = token.error;
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
            error: undefined
          }
        }
  
        // if still valid return the token
        if( Date.now() < token.tokens.accessTokenExpiry * 1000) {
          return token;
        }
  
        try {
        // if not valid then request another token
        const res = await RefreshAccessTokenAPI({token: token.tokens.refreshToken as string})
  
        const result = await res.json();
  
        if(result.statusCode === 403) {
          throw new Error;
        }
  
        return {
          ...token,
          accessToken: result.response.data.accessToken,
          accessTokenExpiry: result.response.data.accessTokenExpiry,
          error: undefined
        }
        } catch(err) {
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      },
    },
  };