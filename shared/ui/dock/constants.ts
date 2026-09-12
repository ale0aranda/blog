import { BookOpen, Ghost, Moon, Sun } from 'lucide-react';

import type { DockTheme, ThemeMeta } from './types';

export const THEME_META: Record<DockTheme, ThemeMeta> = {
  light: {
    label: 'Light',
    accent: '#2563eb',
    Icon: Sun
  },
  dark: {
    label: 'Dark',
    accent: '#60a5fa',
    Icon: Moon
  },
  dracula: {
    label: 'Dracula',
    accent: '#bd93f9',
    Icon: Ghost
  },
  sepia: {
    label: 'Sepia',
    accent: '#b45309',
    Icon: BookOpen
  }
};
