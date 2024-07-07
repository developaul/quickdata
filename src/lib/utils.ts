import { FieldType, IField } from "@/interfaces";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, ZodTypeAny } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkEnv() {
  function getChromeVersion() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : 0;
  }

  const version = getChromeVersion();
  if (version < 127) {
    throw new Error(
      "Your browser is not supported. Please update to 127 version or greater."
    );
  }

  if (!("ai" in globalThis)) {
    throw new Error(
      "Prompt API is not available, check your configuration in chrome://flags/#prompt-api-for-gemini-nano"
    );
  }

  // @ts-expect-error
  const state = await ai?.canCreateGenericSession();
  if (state !== "readily") {
    throw new Error(
      "Built-in AI is not ready, check your configuration in chrome://flags/#optimization-guide-on-device-model"
    );
  }
}

const getEntryZodSchema = ({
  name,
  type,
  fields,
}: IField): [string, ZodTypeAny] => {
  switch (type) {
    case FieldType.String:
      return [name, z.string()];
    case FieldType.Number:
      return [name, z.number()];
    case FieldType.Boolean:
      return [name, z.boolean()];
    case FieldType.Object:
      const objectSchema = getZodSchema(fields);
      return [name, objectSchema];
    case FieldType.ArrayString:
      return [name, z.array(z.string())];
    case FieldType.ArrayNumber:
      return [name, z.array(z.number())];
    case FieldType.ArrayBoolean:
      return [name, z.array(z.boolean())];
    case FieldType.ArrayObject:
      const arraySchema = getZodSchema(fields);
      return [name, z.array(arraySchema)];
    default:
      return [name, z.string()];
  }
};

export const getZodSchema = (fields: IField[]): ZodTypeAny => {
  if (!fields.length) return z.object({});

  const entries = fields.map(getEntryZodSchema);

  const fieldsSchema = Object.fromEntries(entries);

  return z.object(fieldsSchema);
};
