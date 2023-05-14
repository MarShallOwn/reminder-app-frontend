import NextAuth from "next-auth";
import { nextAuthOptions } from "@/app/lib/auth";

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

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
