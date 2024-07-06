"use client";

import { createContext } from "react";

import { PromptEditorForm } from "@/providers";

interface DataMockerContextArgs {
  generateMockData: (data: PromptEditorForm) => Promise<void>;
  loading: boolean;
  data: any;
}

export const DataMockerContext = createContext<DataMockerContextArgs>(
  {} as DataMockerContextArgs
);
