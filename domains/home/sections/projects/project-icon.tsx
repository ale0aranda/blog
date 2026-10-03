import { FlaskConical, GitBranch, Puzzle, Shapes } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

interface ProjectIconProps {
  projectId: string;
}

const visuals = {
  'escape-room': {
    Icon: Puzzle,
    className: 'bg-amber-500/10 text-amber-600'
  },
  'diagrama-de-venn': {
    Icon: Shapes,
    className: 'bg-violet-500/10 text-violet-400'
  },
  'entidad-relacion': {
    Icon: GitBranch,
    className: 'bg-emerald-500/10 text-emerald-600'
  },
  'santana-labs': {
    Icon: FlaskConical,
    className: 'bg-fg/5 text-muted'
  }
};

export function ProjectIcon({ projectId }: ProjectIconProps) {
  const visual = visuals[projectId as keyof typeof visuals] ?? visuals['santana-labs'];

  const Icon = visual.Icon;

  return (
    <span
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-xl',
        visual.className
      )}
    >
      {projectId === 'diagrama-de-venn' ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <circle
            cx="9"
            cy="12"
            r="6"
          />

          <circle
            cx="15"
            cy="12"
            r="6"
            fill="currentColor"
            fillOpacity="0.12"
          />
        </svg>
      ) : (
        <Icon
          aria-hidden="true"
          className="size-4.5"
          strokeWidth={1.5}
        />
      )}
    </span>
  );
}
