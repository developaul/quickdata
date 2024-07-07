import { z } from "zod";

const fieldSchema: any = z.lazy(() =>
  z.object({
    name: z.string().trim().min(1, { message: "Required" }),
    type: z.enum(
      [
        "string",
        "number",
        "boolean",
        "object",
        "array.string",
        "array.number",
        "array.boolean",
        "array.object",
      ],
      {
        message: "Required",
      }
    ),
    description: z.string({ message: "Required" }).optional(),
    fields: z.array(fieldSchema).optional(),
  })
);

export const formSchema = z.object({
  prompt: z.string().trim().min(1, { message: "Required" }),
  limit: z.coerce
    .number({ message: "Must be a number" })
    .min(1, { message: "Must be greater than 0" })
    .max(50, { message: "Must be less than 50" }),
  fields: z.array(fieldSchema),
});
