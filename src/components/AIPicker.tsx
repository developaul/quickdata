import { useContext } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import { PromptContext } from "@/providers";
import { AIModel, AIModels } from "@/interfaces";

export const AIPicker = () => {
  const { form } = useContext(PromptContext);

  const model = form.watch("model");

  const handleChangeModel = (model: AIModel) => () => {
    form.setValue("model", model);
  };

  return (
    <Tabs value={model} className="w-[200px]">
      <TabsList onChange={console.log}>
        {AIModels.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            onClick={handleChangeModel(value)}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
