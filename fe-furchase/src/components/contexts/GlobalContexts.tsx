"use client";
import { createContext, useContext } from "react";
import authHooks from "@/hooks/Auth.hooks";
import { globalProps } from "@/utils/interfaces/contextInterface";
import { profileHooks } from "@/hooks/Profiles.hooks";
import { addressHooks } from "@/hooks/Address.hooks";

const GlobalContext = createContext<globalProps | undefined>(undefined);

export const GlobalContexts = ({ children }: { children: React.ReactNode }) => {
  const auth = authHooks();
  const profiles = profileHooks();
  const address = addressHooks();

  return (
    <GlobalContext.Provider value={{ auth, profiles, address }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within GlobalContext.Provider");
  }
  return context;
};
