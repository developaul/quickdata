"use client";

import { useContext } from "react";
import { PlusIcon } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field } from "./Field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { PromptContext } from "@/providers";

export const PromptEditor = () => {
  const { form, fields, addField } = useContext(PromptContext);

  return (
    <>
      <div className="flex gap-2">
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

      {fields.map((field, index) => (
        <Field index={index} key={field.id} />
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addField}
      >
        <PlusIcon />
        Add Field
      </Button>
    </>
  );
};
