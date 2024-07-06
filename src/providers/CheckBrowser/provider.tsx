"use client";

import { FC, PropsWithChildren } from "react";

import { CheckBrowserContext } from "./context";
import { useCheckBrowser } from "@/hooks";

export const CheckBrowserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { error, showModal, openModal, closeModal } = useCheckBrowser();

  return (
    <CheckBrowserContext.Provider
      value={{
        error,
        showModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CheckBrowserContext.Provider>
  );
};
