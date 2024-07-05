import { z } from "zod";

export const formSchema = z.object({
  prompt: z.string({ message: "Required" }),
  limit: z.coerce.number({ message: "Required" }).min(1),
  fields: z.array(
    z.object({
      name: z.string().trim().min(1, { message: "Required" }),
      type: z.enum(["string", "number", "boolean"], {
        message: "Required",
      }),
      description: z.string({ message: "Required" }).optional(),
    })
  ),
});
