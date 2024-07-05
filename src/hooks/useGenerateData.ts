import { useState } from "react";
import { chromeai } from "chrome-ai";
import { streamObject } from "ai";
import { z } from "zod";

import { formSchema } from "@/lib/schemas";
import { jsonDataPrompt, jsonDataPromptDataHelper } from "@/lib/prompt";
import { IField } from "@/interfaces";

interface StreamObjectArgs {
  fields: any[];
  schema: z.ZodType;
  prompt: string;
  limit: number;
}

interface UseGenerateDataArgs {
  onError?: (error: any) => void;
}

export const useGenerateData = ({ onError }: UseGenerateDataArgs) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  console.log("🚀 ~ useGenerateData ~ data:", data);

  const generateData = async ({
    fields,
    prompt,
    limit,
    schema,
  }: StreamObjectArgs) => {
    try {
      setLoading(true);

      // const dataFormatPrompty = jsonDataPromptDataHelper(fields);
      // const content = jsonDataPrompt({ prompt, limit, dataFormatPrompty });
      // console.log("🚀 ~ generateData ~ content:", content);

      const { partialObjectStream } = await streamObject({
        model: chromeai("text"),
        schema: z.object({ data: z.array(schema) }),
        // messages: [
        //   {
        //     role: "system",
        //     content,
        //   },
        // ],
        prompt: `Generate 10 items following the schema the topic is ${prompt}`,
        temperature: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
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
  }: z.infer<typeof formSchema>) => {
    console.log("🚀 ~ entries ~ fields:", fields);

    const entries = fields.map(({ name, type }) => {
      return [name, z[type]()];
    });

    const fieldsSchema = Object.fromEntries(entries);

    const schema = z.object(fieldsSchema);

    await generateData({ fields, prompt, limit, schema });
  };

  return { generateMockData, loading, data };
};
