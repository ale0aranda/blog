import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface CornerBadgeProps {
  children: ReactNode;
  className?: string;
}

export function CornerBadge({ children, className }: CornerBadgeProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute -right-1 -top-1 flex h-3.5 min-w-3.5',
        'items-center justify-center rounded-full',
        'bg-bg px-0.5 font-mono text-xs font-medium',
        'uppercase leading-none text-muted',
        'ring-2 ring-surface',
        className
      )}
    >
      {children}
    </span>
  );
}
