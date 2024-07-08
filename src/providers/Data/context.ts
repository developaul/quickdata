"use client";

import { createContext } from "react";

interface DataContextArgs {
  data: any;
  loading: boolean;
}

export const DataContext = createContext<DataContextArgs>(
  {} as DataContextArgs
);
