"use client";

import { useContext } from "react";
import { PlusIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldType, IField } from "@/interfaces";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field } from "./Field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DataMockerContext } from "@/providers";
import { formSchema } from "@/lib/schemas";

export interface PromptEditorForm {
  prompt: string;
  limit: number;
  fields: IField[];
}

export const PromptEditor = () => {
  const { generateMockData } = useContext(DataMockerContext);

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const addField = () => {
    const newField: IField = {
      id: Date.now().toString(),
      name: "",
      type: FieldType.String,
      description: "",
    };

    append(newField);
  };

  const removeField = (index: number) => {
    remove(index);
  };

  return (
    <Form {...form}>
      <form
        className="flex-1 flex flex-col gap-2"
        onSubmit={form.handleSubmit(generateMockData)}
      >
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
          <Field
            index={index}
            form={form}
            key={index}
            field={field as IField}
            onDelete={removeField}
          />
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

        <Button type="submit" className="w-full">
          Generate JSON
        </Button>
      </form>
    </Form>
  );
};
