import React from "react";

import { OutputViewer, PromptEditor } from "@/components";

export const Playground = () => {
  return (
    <section className="flex flex-col gap-4 p-4 max-w-4xl w-full">
      {/* Add: Descriptions and examples topics to start */}

      <div className="flex flex-col md:flex-row gap-4">
        <PromptEditor />

        <OutputViewer />
      </div>
    </section>
  );
};
