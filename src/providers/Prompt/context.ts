"use client";

import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { PromptEditorForm } from "./provider";
import { IField } from "@/interfaces";

interface PromptContextArgs {
  form: UseFormReturn<PromptEditorForm, any, undefined>;
}

export const PromptContext = createContext<PromptContextArgs>(
  {} as PromptContextArgs
);
