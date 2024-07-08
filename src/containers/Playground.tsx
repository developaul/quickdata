"use client";
import { useContext } from "react";

import { AIPicker, OutputViewer, PromptEditor } from "@/components";
import { PromptContext } from "@/providers";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export const Playground = () => {
  const { form, handleSubmit } = useContext(PromptContext);

  return (
    <section className="flex flex-col gap-4 w-full">
      {/* Add: Descriptions and examples topics to start */}

      <div className="flex flex-col md:flex-row gap-4">
        <Form {...form}>
          <form
            className="flex-1 flex flex-col gap-2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <AIPicker />

            <PromptEditor />

            <Button type="submit" className="w-full mt-4">
              Generate JSON
            </Button>
          </form>
        </Form>

        <OutputViewer />
      </div>
    </section>
  );
};
