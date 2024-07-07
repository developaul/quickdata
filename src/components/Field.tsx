import React, { FC, useContext } from "react";
import { PlusIcon } from "lucide-react";

import { FieldType, FieldTypes } from "@/interfaces";

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
import { UseFormRegister } from "react-hook-form";

interface FieldProps {
  paths: Record<string, string>;
  prefix: string;
  register: UseFormRegister<any>;
  onAddField: () => void;
}

export const Field: FC<FieldProps> = ({
  onAddField,
  paths,
  prefix = "",
  register,
}) => {
  const { form } = useContext(PromptContext);

  const { nameInputPath, typeInputPath, descriptionInputPath } = paths;

  const isRoot = prefix.length === 0;

  const nameRegister = register(nameInputPath);
  const typeRegister = register(typeInputPath);
  const descriptionRegister = register(descriptionInputPath);

  const typeValue = form.watch(typeRegister.name as any);

  const disabledAddField = typeValue !== FieldType.Object;

  return (
    <div className="flex gap-2 items-end">
      <FormField
        control={form.control}
        name={nameRegister.name as any}
        render={({ field }) => {
          return (
            <FormItem className="flex-1">
              {isRoot && <FormLabel>Name*</FormLabel>}
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name={typeRegister.name as any}
        render={({ field }) => (
          <FormItem className="flex-1">
            {isRoot && <FormLabel>Type*</FormLabel>}
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
        name={descriptionRegister.name as any}
        render={({ field }) => {
          return (
            <FormItem className="flex-1">
              {isRoot && <FormLabel>Description*</FormLabel>}
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      {!isRoot && (
        <Button
          disabled={disabledAddField}
          className="min-w-10"
          type="button"
          size="icon"
          variant="outline"
          onClick={onAddField}
        >
          <PlusIcon size={16} />
        </Button>
      )}
    </div>
  );
};
