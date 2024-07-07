"use client";

import { FC, PropsWithChildren, useContext, useMemo, useState } from "react";

import { AIPickerContext } from "./context";
import { BrowserAIContext } from "../BrowserAI";

export enum AIModel {
  Gpt4o = "gpt-4o",
  chromeAI = "chrome-ai",
}

export const AIPickerProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: browserAIData, loading: browserAILoading } =
    useContext(BrowserAIContext);

  const [model, setModel] = useState<AIModel>(AIModel.chromeAI);

  const handleChangeModel = (model: AIModel) => {
    setModel(model);
  };

  const data = useMemo(() => {
    if (model === AIModel.chromeAI) return browserAIData;
    // Add other data states here ...
    return [];
  }, [browserAIData, model]);

  const loading = useMemo(() => {
    if (model === AIModel.chromeAI) return browserAILoading;
    // Add other loading states here ...
    return false;
  }, [browserAILoading, model]);

  return (
    <AIPickerContext.Provider
      value={{ model, handleChangeModel, data, loading }}
    >
      {children}
    </AIPickerContext.Provider>
  );
};
