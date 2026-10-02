'use client';

import { useEffect, useState } from 'react';

let visitRequest: Promise<number | null> | null = null;

function registerVisit(): Promise<number | null> {
  if (!visitRequest) {
    visitRequest = fetch('/api/visits', {
      method: 'POST',
      cache: 'no-store'
    })
      .then(async (response) => {
        if (!response.ok) return null;

        const data: unknown = await response.json();

        if (
          typeof data !== 'object'
          || data === null
          || !('count' in data)
          || typeof data.count !== 'number'
          || !Number.isSafeInteger(data.count)
          || data.count < 0
        ) {
          return null;
        }

        return data.count;
      })
      .catch(() => null);
  }

  return visitRequest;
}

const formatter = new Intl.NumberFormat('en');

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    void registerVisit().then((value) => {
      if (active) {
        setCount(value);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (count === null) return null;

  return (
    <p className="whitespace-nowrap text-muted text-sm tracking-tight">
      <span className="tabular-nums">{formatter.format(count)}</span> visits
    </p>
  );
}
