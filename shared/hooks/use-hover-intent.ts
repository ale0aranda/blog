import { useCallback, useState } from 'react';

import { useTimeout } from './use-timeout';

interface UseHoverIntentOptions {
  enterDelay?: number;
  leaveDelay?: number;
}

interface UseHoverIntentReturn {
  isActive: boolean;
  show: () => void;
  hide: () => void;
  forceShow: () => void;
}

export function useHoverIntent({
  enterDelay = 100,
  leaveDelay = 100
}: UseHoverIntentOptions = {}): UseHoverIntentReturn {
  const [isActive, setIsActive] = useState(false);

  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();

  const show = useCallback(() => {
    leaveTimer.clear();
    enterTimer.set(() => setIsActive(true), enterDelay);
  }, [enterDelay, enterTimer, leaveTimer]);

  const hide = useCallback(() => {
    enterTimer.clear();
    leaveTimer.set(() => setIsActive(false), leaveDelay);
  }, [leaveDelay, enterTimer, leaveTimer]);

  const forceShow = useCallback(() => {
    enterTimer.clear();
    leaveTimer.clear();
    setIsActive(true);
  }, [enterTimer, leaveTimer]);

  return {
    isActive,
    show,
    hide,
    forceShow
  };
}
