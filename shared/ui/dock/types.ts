import type { LucideIcon } from 'lucide-react';

import type { THEMES } from '@/shared/providers/theme-provider';

export type DockTheme = (typeof THEMES)[number];

export type DockPlacement = 'top' | 'left';

export interface ThemeMeta {
  label: string;
  accent: string;
  Icon: LucideIcon;
}
