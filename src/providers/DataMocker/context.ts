"use client";

import { createContext } from "react";
import { z } from "zod";

import { formSchema } from "@/lib/schemas";

interface DataMockerContextArgs {
  generateMockData: (data: z.infer<typeof formSchema>) => Promise<void>;
  loading: boolean;
  data: any;
}

export const DataMockerContext = createContext<DataMockerContextArgs>(
  {} as DataMockerContextArgs
);
