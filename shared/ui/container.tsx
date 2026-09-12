import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-20', className)}
      {...props}
    >
      {children}
    </div>
  );
}
