import { useState } from "react";
import { chromeai } from "chrome-ai";
import { CoreMessage, streamObject } from "ai";
import { z, ZodType } from "zod";

import { PromptEditorForm } from "@/providers";
import { FieldType, IField } from "@/interfaces";

interface OnGenerateArgs extends Pick<PromptEditorForm, "prompt" | "limit"> {
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
        const { data } = partialObject ?? {};

        setData((prevData: any) => {
          if (!partialObject) return prevData;

          return data as any;
        });
      }
    } catch (error) {
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  const convertFieldsToZodSchema = (fields: IField[]) => {
    const entries = fields.map(({ name, type, fields }) => {
      if (type === FieldType.Object && fields) {
        const schema = convertFieldsToZodSchema(fields);

        return [name, schema];
      }

      const zodType: ZodType = (z[type] as any)();

      const definition = zodType.optional();

      return [name, definition];
    });

    const fieldsSchema: any = Object.fromEntries(entries);

    return z.object(fieldsSchema);
  };

  const generateMockData = async ({
    fields,
    limit,
    prompt,
  }: PromptEditorForm) => {
    const schema = convertFieldsToZodSchema(fields);

    await onGenerate({ prompt, limit, schema });
  };

  return { generateMockData, loading, data };
};
