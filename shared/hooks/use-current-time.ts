'use client';

import { useEffect, useState } from 'react';

type UseCurrentTimeOptions = {
  timeZone: string;
  updateIntervalMs?: number;
};

export function useCurrentTime({ timeZone, updateIntervalMs = 1000 }: UseCurrentTimeOptions) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, [updateIntervalMs]);

  if (!time) return null;

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return {
    formatted: formatter.format(time),
    iso: time.toISOString()
  };
}
