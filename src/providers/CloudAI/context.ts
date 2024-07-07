"use client";

import { createContext } from "react";

import { PromptNestedForm } from "../Prompt";

interface CloudAIContextArgs {
  onGenerate: (args: PromptNestedForm) => Promise<void>;
  loading: boolean;
  data: any;
}

export const CloudAIContext = createContext<CloudAIContextArgs>(
  {} as CloudAIContextArgs
);
