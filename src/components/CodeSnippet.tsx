import { FC, PropsWithChildren } from "react";

export const CodeSnippet: FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className="text-sm mx-1 bg-secondary text-secondary-foreground p-1 rounded-md font-mono">
      {children}
    </span>
  );
};
