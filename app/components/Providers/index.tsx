"use client";

import { store } from "@/app/redux/store";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return <Provider store={store}><SessionProvider>{children}</SessionProvider></Provider>;
};

export default Providers;