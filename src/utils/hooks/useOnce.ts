import { useRef } from "react";

export const useOnce = (callback: () => void) => {
  const calledRef = useRef(false);

  if (!calledRef.current) {
    callback();
    calledRef.current = true;
  }
};
