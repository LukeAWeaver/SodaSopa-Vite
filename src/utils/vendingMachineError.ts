import { useState, useEffect } from "react";

const useVendingMachineError = (duration: number = 2000) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const triggerVendingMachineError = (message: string = "") => {
    setErrorMessage(message);
    setIsError(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isError) {
      timeoutId = setTimeout(() => {
        setIsError(false);
      }, duration);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isError, duration]);

  return { isError, errorMessage, triggerVendingMachineError };
};

export default useVendingMachineError;
