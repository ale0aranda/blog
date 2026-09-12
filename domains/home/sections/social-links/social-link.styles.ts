import { cn } from '@/shared/lib/cn';

export const socialLinkClass = cn(
  '-mx-1 inline-flex items-center rounded-md px-1',
  'text-sm text-muted',
  'underline decoration-border underline-offset-4',
  'transition-colors duration-200',
  'hover:text-fg hover:decoration-fg',
  'active:opacity-70'
);

export const socialActionClass = cn(
  'flex h-8 min-w-20 items-center justify-center gap-1.5 px-3',
  'text-xs tracking-tight',
  'transition-colors duration-150'
);
