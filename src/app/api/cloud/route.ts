import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

import { RATE_LIMIT_REQUESTS, RATE_LIMIT_TIME } from "@/lib/constants";
import { formSchema } from "@/lib/schemas";
import { getPrompt } from "@/lib/prompt";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Rate limit requests
  const ip = req.headers.get("x-forwarded-for");
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_REQUESTS, RATE_LIMIT_TIME),
  });

  const {
    success: successRateLimit,
    limit,
    reset,
    remaining,
  } = await ratelimit.limit(`ratelimit_quickdata_${ip}`);

  if (!successRateLimit) {
    return Response.json(
      {
        success: false,
        message: "You have reached your request limit for the day.",
        data: { limit, remaining, reset },
      },
      { status: 429 }
    );
  }

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
