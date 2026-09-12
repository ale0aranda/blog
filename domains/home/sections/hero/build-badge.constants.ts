import { AlertCircle, GitBranch, GitCommit, Tag } from 'lucide-react';

export const BUILD_CHIP_CLASS = {
  version: 'border-border bg-surface text-fg',
  commit: 'border-info/30 bg-info/10 text-info',
  branch: 'border-accent/30 bg-accent/10 text-accent',
  dirty: 'border-warning/30 bg-warning/10 text-warning'
} as const;

export const BUILD_ICONS = {
  version: Tag,
  commit: GitCommit,
  branch: GitBranch,
  dirty: AlertCircle
} as const;
