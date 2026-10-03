import { Atom, Braces, Code2, FileCode2, Layers3, Orbit, Rocket, Wind } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

type ProjectTechnologyProps = {
  technology: string;
};

const visuals = {
  nextjs: {
    Icon: Orbit,
    className: 'bg-fg/5 text-fg/80'
  },
  react: {
    Icon: Atom,
    className: 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
  },
  typescript: {
    Icon: FileCode2,
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  javascript: {
    Icon: Braces,
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
  },
  astro: {
    Icon: Rocket,
    className: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
  },
  tailwindcss: {
    Icon: Wind,
    className: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400'
  },
  zustand: {
    Icon: Layers3,
    className: 'bg-stone-500/10 text-stone-600 dark:text-stone-400'
  },
  python: {
    Icon: Code2,
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  }
};

function normalizeTechnology(technology: string) {
  const normalized = technology.toLowerCase().replace(/[^a-z0-9]/g, '');

  return normalized === 'tailwind' ? 'tailwindcss' : normalized;
}

export function ProjectTechnology({ technology }: ProjectTechnologyProps) {
  const key = normalizeTechnology(technology);

  const visual = visuals[key as keyof typeof visuals] ?? {
    Icon: Code2,
    className: 'bg-surface text-muted'
  };

  const Icon = visual.Icon;

  return (
    <li
      className={cn(
        'inline-flex list-none items-center gap-1.5 rounded-md px-2 py-1.5',
        'font-medium text-xs leading-none',
        visual.className
      )}
    >
      <Icon
        aria-hidden="true"
        className="size-3"
        strokeWidth={1.6}
      />

      {technology}
    </li>
  );
}
