"use client";

import { FC, PropsWithChildren, useContext, useMemo } from "react";

import { BrowserAIContext } from "../BrowserAI";
import { CloudAIContext } from "../CloudAI";
import { DataContext } from "./context";
import { PromptContext } from "../Prompt";
import { AIModel } from "@/interfaces";

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: browserAIData, loading: browserAILoading } =
    useContext(BrowserAIContext);

  const { data: cloudAIData, loading: cloudAILoading } =
    useContext(CloudAIContext);

  const { form } = useContext(PromptContext);

  const model = form.watch("model");

  const data = useMemo(() => {
    if (model === AIModel.chromeAI) return browserAIData;
    if (model === AIModel.Gpt4o) return cloudAIData;
    // Add other data states here ...
    return [];
  }, [browserAIData, cloudAIData, model]);

  const loading = useMemo(() => {
    if (model === AIModel.chromeAI) return browserAILoading;
    if (model === AIModel.Gpt4o) return cloudAILoading;
    // Add other loading states here ...
    return false;
  }, [browserAILoading, cloudAILoading, model]);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
};
