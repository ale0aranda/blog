import { useCallback, useState } from 'react';

import { copyToClipboard } from '../lib/clipboard';
import { useTimeout } from './use-timeout';

interface UseCopyFeedbackReturn {
  isCopied: boolean;
  copy(text: string): Promise<boolean>;
}

export function useCopyFeedback(resetDelay = 1500): UseCopyFeedbackReturn {
  const [isCopied, setIsCopied] = useState(false);
  const timer = useTimeout();

  const copy = useCallback(
    async (text: string) => {
      const copied = await copyToClipboard(text);

      if (!copied) return false;

      setIsCopied(true);

      timer.clear();
      timer.set(() => setIsCopied(false), resetDelay);

      return true;
    },
    [timer, resetDelay]
  );

  return {
    isCopied,
    copy
  };
}
