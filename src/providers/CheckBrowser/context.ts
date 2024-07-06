"use client";

import { createContext } from "react";

interface CheckBrowserContextArgs {
  error?: any;
  showModal: boolean;

  openModal: () => void;
  closeModal: () => void;
}

export const CheckBrowserContext = createContext<CheckBrowserContextArgs>(
  {} as CheckBrowserContextArgs
);
