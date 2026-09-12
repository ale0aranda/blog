export const contentListStyles = {
  list: 'divide-y divide-border',

  item: [
    'group',
    '-mx-3',
    'flex',
    'items-center',
    'gap-3.5',
    'rounded-lg',
    'px-3',
    'py-3',
    'transition-colors',
    'duration-200',
    'hover:bg-surface'
  ].join(' '),

  compactItem: [
    'group',
    '-mx-3',
    'flex',
    'items-center',
    'gap-3',
    'rounded-lg',
    'px-3',
    'py-2.5',
    'transition-colors',
    'duration-200',
    'hover:bg-surface'
  ].join(' '),

  title: ['truncate', 'text-base', 'font-medium', 'text-fg'].join(' '),

  description: ['mt-0.5', 'truncate', 'text-sm', 'text-muted'].join(' '),

  metadata: [
    'shrink-0',
    'whitespace-nowrap',
    'font-mono',
    'text-xs',
    'tabular-nums',
    'text-muted'
  ].join(' '),

  tag: [
    'rounded-full',
    'border',
    'border-accent/20',
    'bg-accent/10',
    'px-2',
    'py-0.5',
    'text-xs',
    'font-medium',
    'leading-none',
    'text-accent'
  ].join(' ')
} as const;
