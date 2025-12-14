import { useCallback, useRef } from "react";

type DebouncedFunction<Args extends unknown[]> = (...args: Args) => void;
type TTimeout = ReturnType<typeof setTimeout> | undefined;

export const useDebounce = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number = 1500
): DebouncedFunction<Args> => {
  const timer = useRef<TTimeout>(null);

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
