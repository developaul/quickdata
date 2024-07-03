"use client";

import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  prompt: z.string({ message: "Prompt is required" }),
  limit: z.number().default(10),
  fields: z.array(
    z.object({
      id: z.string().default(Date.now().toString()),
      name: z.string({ message: "Name is required" }),
      type: z.enum(["String", "Number", "Boolean"], {
        message: "Type is required",
      }),
      description: z.string({ message: "Description is required" }),
    })
  ),
});

export const PromptEditor = () => {
  const form = useForm();
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

  console.log("🚀 ~ PromptEditor ~ fields:", fields);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Prompt</FormLabel>
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
                <FormLabel>Limit</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-24"
                    placeholder="10"
                    type="number"
                    min={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ADD: custom list of fields, probably we will need to change the structure */}
        {fields.map((field, index) => (
          <Field
            index={index}
            form={form}
            key={index}
            field={field as IField}
            onDelete={removeField}
          />
        ))}

        {/* ADD: button to add new field */}
        <Button type="button" className="w-full" onClick={addField}>
          <PlusIcon />
          Add Field
        </Button>

        {/* ADD: Submit button */}
        <Button type="submit" className="w-full">
          Generate JSON
        </Button>
      </form>
    </Form>
  );
};
