"use client";

import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { PromptNestedForm } from "./provider";

interface PromptContextArgs {
  form: UseFormReturn<PromptNestedForm, any, undefined>;
  handleSubmit: (data: PromptNestedForm) => void;
}

export const PromptContext = createContext<PromptContextArgs>(
  {} as PromptContextArgs
);
