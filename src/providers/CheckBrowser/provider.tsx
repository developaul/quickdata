"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

import { CheckBrowserContext } from "./context";
import { checkEnv } from "@/lib/utils";

export const CheckBrowserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    console.log("close modal");
    setShowModal(false);
  };

  useEffect(() => {
    const checkBrowser = async () => {
      try {
        await checkEnv();
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error?.message);
        }
      }
    };
    checkBrowser();
  }, []);

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
