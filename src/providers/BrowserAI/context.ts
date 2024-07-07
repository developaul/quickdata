"use client";

import { createContext } from "react";

import { PromptNestedForm } from "../Prompt";

interface BrowserAIContextArgs {
  onGenerate: (args: PromptNestedForm) => Promise<void>;
  loading: boolean;
  data: any;
}

export const BrowserAIContext = createContext<BrowserAIContextArgs>(
  {} as BrowserAIContextArgs
);
