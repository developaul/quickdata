import { GithubIcon } from "lucide-react";

import { ThemePicker } from "@/components";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="container px-3 flex items-center justify-end py-3 md:p-6 gap-2  ">
      <a
        href="https://github.com/developaul/quickdata"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link" size="icon">
          <GithubIcon />
        </Button>
      </a>

      <ThemePicker />
    </header>
  );
};
