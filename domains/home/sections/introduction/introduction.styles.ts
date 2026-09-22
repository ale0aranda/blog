export const introductionStyles = {
  link:
    'group relative inline-flex items-center gap-1.5 rounded-sm px-1 py-0.5 -mx-1 '
    + 'text-fg/75 transition-colors duration-300 hover:text-fg',

  underline:
    'pointer-events-none absolute inset-x-1 -bottom-px h-px origin-left scale-x-0 '
    + 'bg-fg transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] '
    + 'group-hover:scale-x-100',

  icon:
    'size-4 shrink-0 transition-transform duration-300 ease-out ' + 'group-hover:-translate-y-px',

  paragraph: 'flex flex-wrap items-center gap-x-1.5 gap-y-2 text-fg/75'
} as const;
