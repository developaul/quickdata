import { useState } from "react";
import { chromeai } from "chrome-ai";
import { CoreMessage, streamObject } from "ai";
import { z } from "zod";

import { PromptEditorForm } from "@/providers";

interface OnGenerateArgs extends PromptEditorForm {
  schema: z.ZodType;
}

interface UseGenerateDataArgs {
  onError?: (error: any) => void;
}

export const useGenerateData = ({ onError }: UseGenerateDataArgs) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const onGenerate = async ({ prompt, limit, schema }: OnGenerateArgs) => {
    try {
      setLoading(true);

      const systemMessage: CoreMessage = {
        role: "system",
        content: prompt,
      };

      const userMessage: CoreMessage = {
        role: "user",
        content: `generate ${limit} items`,
      };

      const messages = [systemMessage, userMessage];

      const { partialObjectStream } = await streamObject({
        model: chromeai("text"),
        schema: z.object({ data: z.array(schema) }),
        messages,
        temperature: 0,
      });

      for await (const partialObject of partialObjectStream) {
        const { data } = partialObject;
        setData((data as any) ?? []);
      }
    } catch (error) {
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = async ({
    fields,
    limit,
    prompt,
  }: PromptEditorForm) => {
    const entries = fields.map(({ name, type }) => {
      return [name, z[type]()];
    });

    const fieldsSchema = Object.fromEntries(entries);

    const schema = z.object(fieldsSchema);

    await onGenerate({ fields, prompt, limit, schema });
  };

  return { generateMockData, loading, data };
};
