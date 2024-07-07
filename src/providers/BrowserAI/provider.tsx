"use client";

import { FC, PropsWithChildren, useState } from "react";
import { streamObject } from "ai";
import { chromeai } from "chrome-ai";

import { BrowserAIContext } from "./context";
import { PromptNestedForm } from "../Prompt";
import { getPrompt } from "@/lib/prompt";

export const BrowserAIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const onGenerate = async (args: PromptNestedForm) => {
    try {
      const { schema, messages } = getPrompt(args);

      const { partialObjectStream } = await streamObject({
        model: chromeai("text"),
        schema,
        messages,
        temperature: 0,
      });

      for await (const partialObject of partialObjectStream) {
        const { data } = partialObject ?? {};

        setData((prevData: any) => {
          if (!partialObject) return prevData;

          return data as any;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserAIContext.Provider value={{ onGenerate, loading, data }}>
      {children}
    </BrowserAIContext.Provider>
  );
};
