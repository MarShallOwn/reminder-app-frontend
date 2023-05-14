import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
  },
  {
    callbacks: {
      authorized: ({ token }) => !!(token && token?.error === undefined)
    },
  }
)
export const config = {
  matcher: ["/profile"],
  //matcher: ["/((?!register|api|login).*)"],
};