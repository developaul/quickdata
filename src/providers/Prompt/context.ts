"use client";

import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { PromptEditorForm } from "./provider";
import { IField } from "@/interfaces";

interface PromptContextArgs {
  form: UseFormReturn<PromptEditorForm, any, undefined>;
  fields: IField[];
  addField: () => void;
  removeField: (index: number) => void;
}

export const PromptContext = createContext<PromptContextArgs>(
  {} as PromptContextArgs
);
