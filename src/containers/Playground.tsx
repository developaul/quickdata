"use client";
import { useContext } from "react";

import { OutputViewer, PromptEditor } from "@/components";
import { DataMockerContext, PromptContext } from "@/providers";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export const Playground = () => {
  const { form } = useContext(PromptContext);
  const { generateMockData } = useContext(DataMockerContext);

  return (
    <section className="flex flex-col gap-4 w-full">
      {/* Add: Descriptions and examples topics to start */}

      <div className="flex flex-col md:flex-row gap-4">
        <Form {...form}>
          <form
            className="flex-1 flex flex-col gap-2"
            onSubmit={form.handleSubmit(generateMockData)}
          >
            <PromptEditor />

            {/* ADD code editor */}

            <Button type="submit" className="w-full">
              Generate JSON
            </Button>
          </form>
        </Form>

        <OutputViewer />
      </div>
    </section>
  );
};
