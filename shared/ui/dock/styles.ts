import { cn } from '@/shared/lib/cn';

export const dockButtonClass = cn(
  'relative flex size-9 shrink-0 items-center justify-center rounded-full',
  'text-fg transition-all duration-200 ease-out',
  'hover:scale-105 hover:bg-bg/80',
  'active:scale-95',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-accent',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-surface'
);

export const dockItemClass = cn(
  'group flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-fg',
  'transition-colors duration-150',
  'aria-selected:bg-accent/10',
  'aria-selected:text-accent',
  'data-[disabled=true]:opacity-40'
);

export const dockItemIconClass = cn(
  'flex size-6 shrink-0 items-center justify-center rounded-lg',
  'bg-bg text-muted transition-colors duration-150',
  'group-aria-selected:bg-accent/15',
  'group-aria-selected:text-accent'
);

export const dockGroupClass = cn(
  'px-2 py-2',
  '[&_[cmdk-group-heading]]:px-2',
  '[&_[cmdk-group-heading]]:pb-2',
  '[&_[cmdk-group-heading]]:pt-2',
  '[&_[cmdk-group-heading]]:font-mono',
  '[&_[cmdk-group-heading]]:text-xs',
  '[&_[cmdk-group-heading]]:uppercase',
  '[&_[cmdk-group-heading]]:tracking-wider',
  '[&_[cmdk-group-heading]]:text-muted'
);

export const dockSeparatorClass = 'my-1 h-px bg-border';

export const dockMenuClass = cn('rounded-2xl border border-border bg-surface', 'shadow-xl');

export const dockKbdClass = cn('rounded bg-bg px-1.5 py-0.5', 'font-mono text-xs text-muted');
