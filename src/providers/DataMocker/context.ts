"use client";

import { createContext } from "react";

import { PromptEditorForm } from "@/components";

interface DataMockerContextArgs {
  generateMockData: (data: PromptEditorForm) => Promise<void>;
  loading: boolean;
  data: any;
}

export const DataMockerContext = createContext<DataMockerContextArgs>(
  {} as DataMockerContextArgs
);
