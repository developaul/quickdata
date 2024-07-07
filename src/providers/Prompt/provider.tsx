"use client";

import { FC, PropsWithChildren } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldType, IField } from "@/interfaces";
import { formSchema } from "@/lib/schemas";
import { PromptContext } from "./context";

export interface PromptEditorForm {
  prompt: string;
  limit: number;
  fields: IField[];
}

export const PromptProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<PromptEditorForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "Top science fiction books read in 2020",
      limit: 10,
      fields: [
        {
          id: Date.now().toString(),
          name: "name",
          type: FieldType.String,
          description: "name of the book",
        },
      ],
    },
  });

  return (
    <PromptContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
