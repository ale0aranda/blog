import { FlaskConical, GitBranch, PanelsTopLeft, Puzzle, Shapes } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

type ProjectIconProps = {
  projectId: string;
};

const visuals = {
  'escape-room': {
    Icon: Puzzle,
    className: 'bg-amber-500/10 text-amber-600'
  },
  'diagrama-de-venn': {
    Icon: Shapes,
    className: 'bg-accent/10 text-accent'
  },
  'entidad-relacion': {
    Icon: GitBranch,
    className: 'bg-emerald-500/10 text-emerald-600'
  },
  'santana-labs': {
    Icon: FlaskConical,
    className: 'bg-fg/5 text-muted'
  },
  f0rma: {
    Icon: PanelsTopLeft,
    className: 'bg-sky-500/10 text-sky-600'
  }
};

export function ProjectIcon({ projectId }: ProjectIconProps) {
  const visual = visuals[projectId as keyof typeof visuals] ?? visuals['santana-labs'];

  const Icon = visual.Icon;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-xl',
        visual.className
      )}
    >
      {projectId === 'diagrama-de-venn' ? (
        <svg
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          viewBox="0 0 24 24"
        >
          <title>Venn diagram</title>
          <circle
            cx="9"
            cy="12"
            r="6"
          />
          <circle
            cx="15"
            cy="12"
            fill="currentColor"
            fillOpacity="0.12"
            r="6"
          />
        </svg>
      ) : (
        <Icon
          className="size-5"
          strokeWidth={1.5}
        />
      )}
    </span>
  );
}
