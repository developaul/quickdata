"use client";
import React, { FC } from "react";
import { CodeBlock } from "@atlaskit/code";

import { Badge } from "./ui/badge";

interface OutputViewerProps {
  items: any[];
}

export const OutputViewer: FC<OutputViewerProps> = ({ items = [] }) => {
  return (
    <div className="flex-1">
      <div className="relative scrollbar-hide max-h-[400px] overflow-auto shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
        <div className="absolute right-3 top-3 flex items-center justify-end">
          <Badge variant={"outline"}>{items.length} items</Badge>
        </div>
        <CodeBlock
          language="json"
          showLineNumbers={false}
          text={JSON.stringify(items, null, 2)}
        />
      </div>
    </div>
  );
};
