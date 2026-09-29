import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

interface ChipProps extends ComponentPropsWithoutRef<'span'> {
  icon?: ReactNode;
}

export function Chip({ icon, children, className, ...props }: ChipProps) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-1 font-medium text-xs',
        className
      )}
    >
      {icon}
      <span className="truncate">{children}</span>
    </span>
  );
}
