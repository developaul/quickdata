"use client";

import { createContext } from "react";
import { AIModel } from "./provider";

interface AIPickerContextArgs {
  model: AIModel;
  handleChangeModel: (model: AIModel) => void;
  data: any;
  loading: boolean;
}

export const AIPickerContext = createContext<AIPickerContextArgs>(
  {} as AIPickerContextArgs
);
