import { useContext } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { clearAuthClear, toastOptions } from "@/helpers";

export const useLogout = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const logout = () => {
    clearAuthClear("emilistUser");
    clearAuthClear("authToken");
    clearAuthClear("sessionId");
    setCurrentUser(null);
    toast.success("Logout successful!", toastOptions);
  };
  return {
    logout,
  };
};
