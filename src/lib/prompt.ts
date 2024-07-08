import { CoreMessage } from "ai";
import { z } from "zod";

import { PromptNestedForm } from "@/providers";
import { getZodSchema } from "./utils";

export const getPrompt = ({
  fields,
  limit,
  prompt,
}: Pick<PromptNestedForm, "fields" | "limit" | "prompt">) => {
  const schema = getZodSchema(fields);

  const systemMessage: CoreMessage = {
    role: "system",
    content: prompt,
  };

  const userMessage: CoreMessage = {
    role: "user",
    content: `generate ${limit} items`,
  };

  const messages = [systemMessage, userMessage];

  return {
    schema: z.object({ data: z.array(schema) }),
    messages,
  };
};
