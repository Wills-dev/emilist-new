"use client";

import { createContext, useEffect, useState } from "react";

import { readAuthCookie } from "@/helpers";

export const AuthContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AuthState = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const user = readAuthCookie("emilistUser");

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthState;
