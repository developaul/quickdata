import React, { FC } from "react";

import { FieldType, FieldTypes, IField } from "@/interfaces";

import { Label } from "./ui/label";
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface FieldProps {
  field: IField;
  form: UseFormReturn<any, any>;
  index: number;
  onDelete: (index: number) => void;
}

export const Field: FC<FieldProps> = ({ field, onDelete, form, index }) => {
  const { id, name, type, description } = field;

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div className="flex gap-2">
      <FormField
        control={form.control}
        name={`fields.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`fields.${index}.type`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[150px]">
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
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`fields.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button onClick={handleDelete}>
        <Trash2 />
      </Button>
    </div>
  );
};
