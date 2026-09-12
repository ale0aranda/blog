import { AlignJustify, List } from 'lucide-react';

import type { ViewMode } from './types';

export const VIEW_MODE_OPTIONS = [
  {
    value: 'default',
    icon: List,
    messageKey: 'view.list'
  },
  {
    value: 'compact',
    icon: AlignJustify,
    messageKey: 'view.compact'
  }
] as const satisfies ReadonlyArray<{
  value: ViewMode;
  icon: typeof List;
  messageKey: string;
}>;
