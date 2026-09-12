import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import type { DockPlacement } from './types';

interface DockTooltipProps {
  label: string;
  placement?: DockPlacement;
  children: ReactNode;
}

export function DockTooltip({ label, placement = 'top', children }: DockTooltipProps) {
  return (
    <span className="group relative flex">
      {children}

      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute whitespace-nowrap rounded-md',
          'bg-fg px-2 py-1 font-mono text-xs tracking-wide text-bg',
          'opacity-0 transition-[opacity,transform]',
          'duration-150 ease-out',
          'group-hover:opacity-100',
          placement === 'left'
            ? ['right-full top-1/2 mr-2.5', '-translate-y-1/2', 'group-hover:-translate-x-0.5']
            : ['bottom-full left-1/2 mb-2.5', '-translate-x-1/2', 'group-hover:-translate-y-0.5']
        )}
      >
        {label}
      </span>
    </span>
  );
}
