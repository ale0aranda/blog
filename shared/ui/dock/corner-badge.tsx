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
        'absolute -top-1 -right-1 flex h-3.5 min-w-3.5',
        'items-center justify-center rounded-full',
        'bg-bg px-0.5 font-medium font-mono text-xs',
        'text-muted uppercase leading-none',
        'ring-2 ring-surface',
        className
      )}
    >
      {children}
    </span>
  );
}
