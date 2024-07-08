"use client";

import { FC, PropsWithChildren, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldType, IField, AIModel, PromptType } from "@/interfaces";
import { CheckBrowserContext } from "../CheckBrowser";
import { BrowserAIContext } from "../BrowserAI";
import { AIPickerContext } from "../AIPicker";
import { CloudAIContext } from "../CloudAI";
import { formSchema } from "@/lib/schemas";
import { PromptContext } from "./context";

export interface PromptNestedForm {
  prompt: string;
  limit: number;
  fields: IField[];
  promptType: PromptType;
}

export const PromptProvider: FC<PropsWithChildren> = ({ children }) => {
  const { model } = useContext(AIPickerContext);
  const { onGenerate: onGenerateChromeAI } = useContext(BrowserAIContext);
  const { onGenerate: onGenerateCloudAI } = useContext(CloudAIContext);
  const { openModal, error } = useContext(CheckBrowserContext);

  const form = useForm<PromptNestedForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "Top science fiction books read in 2020",
      limit: 10,
      promptType: PromptType.Form,
      fields: [
        {
          id: Date.now().toString(),
          name: "title",
          type: FieldType.String,
        },
      ],
    },
  });

  const handleSubmit = (args: PromptNestedForm) => {
    switch (model) {
      case AIModel.chromeAI:
        if (error) {
          openModal();

          return;
        }

        onGenerateChromeAI(args);
        return;
      case AIModel.Gpt4o:
        onGenerateCloudAI(args);
        return;
    }

    console.error("AI Model not supported");
  };

  return (
    <PromptContext.Provider
      value={{
        form,
        handleSubmit,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
