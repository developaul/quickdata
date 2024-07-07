"use client";

import { Playground, WarningDialog } from "@/containers";
import { useCheckBrowser } from "@/hooks";

export default function Home() {
  const { showModal } = useCheckBrowser();

  return (
    <main className="container flex flex-col items-center justify-between">
      {/* ADD: description about the project */}
      <Playground />

      {showModal && <WarningDialog />}
    </main>
  );
}
