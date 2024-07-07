"use client";

import { FC, PropsWithChildren, useContext, useMemo, useState } from "react";

import { BrowserAIContext } from "../BrowserAI";
import { CloudAIContext } from "../CloudAI";
import { AIPickerContext } from "./context";
import { AIModel } from "@/interfaces";

export const AIPickerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: browserAIData, loading: browserAILoading } =
    useContext(BrowserAIContext);

  const { data: cloudAIData, loading: cloudAILoading } =
    useContext(CloudAIContext);

  const [model, setModel] = useState<AIModel>(AIModel.chromeAI);

  const handleChangeModel = (model: AIModel) => () => {
    setModel(model);
  };

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
    <AIPickerContext.Provider
      value={{ model, handleChangeModel, data, loading }}
    >
      {children}
    </AIPickerContext.Provider>
  );
};
