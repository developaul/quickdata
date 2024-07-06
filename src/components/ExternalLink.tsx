import { FC, PropsWithChildren } from "react";
import Link from "next/link";

interface Props extends PropsWithChildren {
  href: string;
}

export const ExternalLink: FC<Props> = ({ href, children }) => {
  return (
    <Link target="_blank" href={href} className="underline hover:opacity-70">
      {children}
    </Link>
  );
};
