import { FC } from "react";
import { PlusIcon, Trash2 } from "lucide-react";
import clsx from "clsx";

import { useFieldsForm } from "@/hooks";
import { Field } from "./Field";
import { Button } from "./ui/button";

interface Props {
  prefix?: string;
}

export const FieldList: FC<Props> = ({ prefix = "" }) => {
  const { fields, removeField, addField, register, paths } =
    useFieldsForm(prefix);

  const isRoot = prefix.length === 0;

  return (
    <div
      className={clsx("flex flex-col w-full", {
        ["gap-1"]: !isRoot,
        ["gap-2"]: isRoot,
      })}
    >
      {!isRoot && (
        <Field
          prefix={prefix}
          paths={paths}
          onAddField={addField}
          register={register}
        />
      )}

      {fields.map((field, index) => (
        <div className="flex-1 flex gap-2" key={field.id}>
          <Button
            className="min-w-10"
            type="button"
            size="icon"
            variant="outline"
            onClick={removeField(index)}
          >
            <Trash2 size={16} />
          </Button>

          <FieldList prefix={`${prefix}fields.${index}.`} />
        </div>
      ))}

      {isRoot && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addField}
        >
          <PlusIcon />
          Add Field
        </Button>
      )}
    </div>
  );
};
