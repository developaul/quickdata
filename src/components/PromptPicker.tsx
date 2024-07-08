import { useContext } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import { PromptType, PromptTypes } from "@/interfaces";
import { PromptContext } from "@/providers";

export const PromptPicker = () => {
  const { form } = useContext(PromptContext);

  const promptType = form.watch("promptType");

  const handleChangePromptType = (promptType: PromptType) => () => {
    form.setValue("promptType", promptType);
  };

  return (
    <Tabs value={promptType} className="w-[100px]">
      <TabsList onChange={console.log}>
        {PromptTypes.map(({ value, label, disabled }) => (
          <TabsTrigger
            key={value}
            value={value}
            disabled={disabled}
            onClick={handleChangePromptType(value)}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
