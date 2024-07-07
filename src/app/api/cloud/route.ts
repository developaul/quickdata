import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";

import { formSchema } from "@/lib/schemas";
import { getPrompt } from "@/lib/prompt";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Validate the request body
  const body = await req.json();

  const { success: successSchema, data, error } = formSchema.safeParse(body);

  if (!successSchema) {
    return Response.json(
      {
        success: false,
        message: "Invalid request body.",
        data: error.format(),
      },
      { status: 400 }
    );
  }

  // Controller for the generation
  const model = openai("gpt-4o");

  const { messages, schema } = getPrompt(data);

  const result = await streamObject({
    model,
    schema,
    messages,
    temperature: 0,
  });

  return result.toTextStreamResponse();
}
