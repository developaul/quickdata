import { useFieldArray, useFormContext } from "react-hook-form";

import { FieldType, IField } from "@/interfaces";

export const useFieldsForm = (prefix: string = "") => {
  const { control, register } = useFormContext<IField>();

  const nameInputPath = `${prefix}name` as "name";
  const typeInputPath = `${prefix}type` as "type";
  const fieldsArrayInputPath = `${prefix}fields` as "fields";

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldsArrayInputPath,
  });

  const addField = () => {
    const newField: IField = {
      id: Date.now().toString(),
      name: "",
      type: FieldType.String,
      fields: [],
    };

    append(newField);
  };

  const removeField = (fieldIndex: number) => () => {
    remove(fieldIndex);
  };

  return {
    fields,
    addField,
    removeField,
    register,
    paths: {
      nameInputPath,
      typeInputPath,
      friendsArrayInputPath: fieldsArrayInputPath,
    },
  };
};
