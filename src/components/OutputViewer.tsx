"use client";

import { useContext } from "react";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import { CodeBlock } from "@atlaskit/code";

import { DataMockerContext } from "@/providers";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const OutputViewer = () => {
  const { data: items } = useContext(DataMockerContext);

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(items, null, 2));
      toast.success("Response copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="flex-1">
      <div className="relative scrollbar-hide max-h-[400px] overflow-auto shadow-sm min-h-[350px] border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
        <div className="absolute right-3 top-3 flex items-center justify-end gap-2">
          <Badge variant={"outline"}>{items?.length ?? 0} items</Badge>
          <Button onClick={handleCopyClipboard} variant="outline" size="sm">
            <CopyIcon size={12} />
          </Button>
        </div>
        <CodeBlock
          language="json"
          showLineNumbers={false}
          text={JSON.stringify(items, null, 2)}
          highlight=""
        />
      </div>
    </div>
  );
};
