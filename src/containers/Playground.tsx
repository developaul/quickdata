import React from "react";

import { PromptEditor } from "@/components";

export const Playground = () => {
  return (
    <section className="flex flex-col gap-4 p-4">
      {/* Add: Descriptions and examples topics to start */}

      <div className="flex flex-col md:flex-row gap-4">
        {/* ADD: Code structure editor */}
        <PromptEditor />

        {/* ADD: Output viewer */}
      </div>
    </section>
  );
};
