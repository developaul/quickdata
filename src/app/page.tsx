"use client";

import { useContext } from "react";
import { Playground, WarningDialog } from "@/containers";
import { CheckBrowserContext } from "@/providers";

export default function Home() {
  const { showModal } = useContext(CheckBrowserContext);

  return (
    <main className="container flex flex-col items-center justify-between">
      {/* ADD: description about the project */}
      <Playground />

      {showModal && <WarningDialog />}
    </main>
  );
}
