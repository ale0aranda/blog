import { useCallback, useEffect, useRef } from 'react';

interface UseTimeoutReturn {
  set: (callback: () => void, delay: number) => void;
  clear: () => void;
}

export function useTimeout(): UseTimeoutReturn {
  const timeoutRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timeoutRef.current === null) {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const set = useCallback(
    (callback: () => void, delay: number) => {
      clear();

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        callback();
      }, delay);
    },
    [clear]
  );

  useEffect(() => clear, [clear]);

  return {
    set,
    clear
  };
}
