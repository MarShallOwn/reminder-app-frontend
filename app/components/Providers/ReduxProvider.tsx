"use client";

import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ReduxProvider = ({ children }: Props) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default ReduxProvider;
