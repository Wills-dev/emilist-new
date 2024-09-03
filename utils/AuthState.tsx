"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

const AuthState = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>("");
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const getUser = async () => {
    const sessionId = localStorage.getItem("sessionId");

    // try {
    //   const data = await axiosInstance.get(`/user?session_id=${sessionId}`);
    //   console.log("current user logged in");
    //   setCurrentUser(data.data);
    //   setUserLoading(false);
    // } catch (error) {
    //   setUserLoading(false);
    //   setCurrentUser(null);
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    //   console.log("current user not logged in", error);
    // }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
      setUserLoading(false);
      getUser();
    } else {
      getUser();
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthState;
