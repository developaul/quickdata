"use client";

import { FC, PropsWithChildren, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AIModel, AIPickerContext } from "../AIPicker";
import { FieldType, IField } from "@/interfaces";
import { BrowserAIContext } from "../BrowserAI";
import { formSchema } from "@/lib/schemas";
import { PromptContext } from "./context";

export interface PromptNestedForm {
  prompt: string;
  limit: number;
  fields: IField[];
}

export const PromptProvider: FC<PropsWithChildren> = ({ children }) => {
  const { model } = useContext(AIPickerContext);
  const { onGenerate: onGenerateChromeAI } = useContext(BrowserAIContext);

  const form = useForm<PromptNestedForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "Top science fiction books read in 2020",
      limit: 10,
      fields: [
        {
          id: Date.now().toString(),
          name: "name",
          type: FieldType.String,
        },
      ],
    },
  });

  const handleSubmit = (args: PromptNestedForm) => {
    switch (model) {
      case AIModel.chromeAI:
        onGenerateChromeAI(args);
        return;
    }

    console.error("Model not supported");
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
