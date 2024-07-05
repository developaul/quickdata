"use client";

import { FC, PropsWithChildren } from "react";

import { DataMockerContext } from "./context";
import { useGenerateData } from "@/hooks";

export const DataMockerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { generateMockData, loading, data } = useGenerateData({
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <DataMockerContext.Provider
      value={{
        generateMockData,
        loading,
        data,
      }}
    >
      {children}
    </DataMockerContext.Provider>
  );
};
