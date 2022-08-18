import { useEffect, useRef } from "react";

export const useClickOutside = (handler) => {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref && !ref?.current?.contains(event.target)) {
      handler?.();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return ref;
};
