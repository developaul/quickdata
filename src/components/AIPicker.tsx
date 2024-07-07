import { useContext } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import { AIPickerContext } from "@/providers";
import { AIModels } from "@/interfaces";

export const AIPicker = () => {
  const { model, handleChangeModel } = useContext(AIPickerContext);

  return (
    <Tabs value={model} className="w-[400px]">
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
