"use client";

import { useContext } from "react";

import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { PromptPicker } from "./PromptPicker";
import { PromptContext } from "@/providers";
import { PromptType } from "@/interfaces";
import { CodeEditor } from "./CodeEditor";
import { FieldList } from "./FieldList";

export const PromptEditor = () => {
  const { form } = useContext(PromptContext);

  const promptType = form.watch("promptType");

  return (
    <>
      <div className="flex gap-2 mb-4">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Prompt*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Top science fiction books read in 2020"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limit*</FormLabel>
              <FormControl>
                <Input
                  className="max-w-24"
                  placeholder="10"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <PromptPicker />

      {promptType === PromptType.Form && <FieldList />}

      {promptType === PromptType.TypeScript && <CodeEditor />}
    </>
  );
};
