import { useEffect, useState } from "react";

import { checkEnv } from "@/lib/utils";

export const useCheckBrowser = () => {
  const [error, setError] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const checkBrowser = async () => {
      try {
        await checkEnv();
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error?.message);
          setShowModal(true);
        }
      }
    };
    checkBrowser();
  }, []);

  return {
    error,
    showModal,
    openModal,
    closeModal,
  };
};
