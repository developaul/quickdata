"use client";

import { FC, PropsWithChildren } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";

import { CloudAIContext } from "./context";
import { PromptNestedForm } from "../Prompt";

export const CloudAIProvider: FC<PropsWithChildren> = ({ children }) => {
  const { object, submit, isLoading } = useObject({
    api: "/api/cloud",
    schema: z.object({ data: z.array(z.any()) }),
  });

  const data = (object?.data as any) ?? [];

  const onGenerate = async (args: PromptNestedForm) => {
    try {
      submit(args);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CloudAIContext.Provider value={{ onGenerate, loading: isLoading, data }}>
      {children}
    </CloudAIContext.Provider>
  );
};
