import React, { FC, useContext } from "react";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

import { FieldTypes } from "@/interfaces";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Button } from "./ui/button";
import { PromptContext } from "@/providers";

interface FieldProps {
  index: number;
}

export const Field: FC<FieldProps> = ({ index }) => {
  const { removeField, form } = useContext(PromptContext);

  const showLabel = index === 0;

  const handleDelete = () => {
    removeField(index);
  };

  return (
    <div className="flex gap-2 items-end">
      <FormField
        control={form.control}
        name={`fields.${index}.name`}
        render={({ field, formState }) => {
          const hasError = (formState.errors as any).fields?.[index]?.name;
          return (
            <FormItem className="flex-1">
              {showLabel && <FormLabel>Name*</FormLabel>}
              <FormControl
                className={clsx({
                  ["border-red-500 focus-visible:outline-red-500"]: hasError,
                })}
              >
                <Input placeholder="name" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name={`fields.${index}.type`}
        render={({ field }) => (
          <FormItem className="flex-1">
            {showLabel && <FormLabel>Type*</FormLabel>}
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types</SelectLabel>
                    {FieldTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`fields.${index}.description`}
        render={({ field }) => (
          <FormItem className="flex-1">
            {showLabel && <FormLabel>Description</FormLabel>}
            <FormControl>
              <Input placeholder="description" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <Button size="icon" variant="outline" onClick={handleDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
};
