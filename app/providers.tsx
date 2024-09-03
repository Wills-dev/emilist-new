"use  client";

import AuthState from "@/utils/AuthState";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthState>{children}</AuthState>;
};
