"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const CheckAuthenticated = () => {
    const {data: session, status} = useSession();

    console.log("check authentication session: ",session)

    useEffect(() => {
      if (session?.error === "RefreshAccessTokenError") {
        signOut({callbackUrl: "/login"});
      }
    }, [session]);

    return <></>
}

export default CheckAuthenticated;