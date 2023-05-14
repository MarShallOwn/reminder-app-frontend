"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const CheckAuthenticated = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }

    if (session === null) {
      if (pathname !== "/login") {
        router.replace("/login");
      }
    } else if (session !== undefined) {
      if (pathname === "/login") {
        router.replace("/");
      }
    }
  }, [session]);

  return null;
};

export default CheckAuthenticated;
