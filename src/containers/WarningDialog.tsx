"use client";

import { useContext, useState } from "react";
import {
  CodeSnippet,
  ExternalLink,
  FlagAccordion,
  IncompatibleBrowserAlert,
} from "@/components";
import { CheckBrowserContext } from "@/providers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const WarningDialog = () => {
  const { error } = useContext(CheckBrowserContext);

  const [selectedAccordionValue, setSelectedSelectedAccordionValue] = useState<
    string | undefined
  >();
  const openInstructions = () => setSelectedSelectedAccordionValue("item-4");
  const showSupportedBrowsers = () =>
    setSelectedSelectedAccordionValue("item-3");

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Next.js Chrome AI Quickdata
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="">
            This App (
            <ExternalLink href="https://github.com/developaul/quickdata">
              source
            </ExternalLink>
            ) uses Next.js and{" "}
            <ExternalLink href="https://sdk.vercel.ai/docs">
              Vercel AI SDK
            </ExternalLink>{" "}
            with the{" "}
            <ExternalLink href="https://github.com/jeasonstudio/chrome-ai">
              chrome-ai
            </ExternalLink>{" "}
            provider to call Chrome&apos;s{" "}
            <ExternalLink href="https://developer.chrome.com/docs/ai/built-in">
              built-in AI
            </ExternalLink>{" "}
            model (Gemini Nano).
          </p>
          <p>
            Gemini Nano&apos;s Prompt API is exposed on the browser&apos;s
            <CodeSnippet>window.ai</CodeSnippet>function. It can be easily
            called with Vercel AI SDK&apos;s unified API.
          </p>
        </DialogDescription>
        <div className="w-full pt-2 space-y-2">
          {error ? (
            <IncompatibleBrowserAlert
              openInstructions={openInstructions}
              showSupportedBrowsers={showSupportedBrowsers}
            />
          ) : null}
          <FlagAccordion
            value={selectedAccordionValue}
            setValue={setSelectedSelectedAccordionValue}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
