import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import type { DockPlacement } from './types';

interface DockTooltipProps {
  label: string;
  placement?: DockPlacement;
  children: ReactNode;
  disabled?: boolean;
}

export function DockTooltip({
  label,
  placement = 'top',
  children,
  disabled = false
}: DockTooltipProps) {
  return (
    <span className="group relative flex">
      {children}

      {!disabled && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute whitespace-nowrap rounded-lg',
            'border border-border bg-bg px-2.5 py-1.5',
            'font-mono text-muted text-xs shadow-sm',
            'invisible opacity-0 transition-opacity duration-150',
            'group-hover:visible group-hover:opacity-100',
            'group-focus-within:visible group-focus-within:opacity-100',
            'motion-reduce:transition-none',
            placement === 'left'
              ? 'top-1/2 right-full mr-3 -translate-y-1/2'
              : 'bottom-full left-1/2 mb-3 -translate-x-1/2'
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
