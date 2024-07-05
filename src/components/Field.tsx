import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { FieldTypes, IField } from "@/interfaces";

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
import { Button } from "./ui/button";

interface FieldProps {
  field: IField;
  form: UseFormReturn<any, any>;
  index: number;
  onDelete: (index: number) => void;
}

export const Field: FC<FieldProps> = ({ onDelete, form, index }) => {
  const showLabel = index === 0;

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div className="flex gap-2 items-end">
      <FormField
        control={form.control}
        name={`fields.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex-1">
            {showLabel && <FormLabel>Name</FormLabel>}
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
          <FormItem className="flex-1">
            {showLabel && <FormLabel>Type</FormLabel>}
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
            <FormMessage />
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
            <FormMessage />
          </FormItem>
        )}
      />

      <Button size="icon" variant="outline" onClick={handleDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
};
