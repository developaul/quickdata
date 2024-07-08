"use client";

import { FC, PropsWithChildren, useContext, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";

import { PromptNestedForm } from "../Prompt";
import { CloudAIContext } from "./context";
import { errorContext } from "../Error";

export const CloudAIProvider: FC<PropsWithChildren> = ({ children }) => {
  const { handleShowRateLimitError } = useContext(errorContext);

  const { object, submit, isLoading, error } = useObject({
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

  useEffect(() => {
    if (!error) return;

    handleShowRateLimitError((error as any)?.message ?? "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <CloudAIContext.Provider value={{ onGenerate, loading: isLoading, data }}>
      {children}
    </CloudAIContext.Provider>
  );
};
