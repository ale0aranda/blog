import { useTheme } from 'next-themes';

import { Command } from 'cmdk';
import { useTranslations } from 'next-intl';

import { THEMES } from '@/shared/providers/theme-provider';

import { CommandItemRow } from '../command-item';
import { THEME_META } from '../constants';
import { dockGroupClass } from '../styles';
import type { DockTheme } from '../types';
import { isCurrentValue } from '../utils';

interface CommandGroupThemeProps {
  execute: (action: () => void) => void;
}

export function CommandGroupTheme({ execute }: CommandGroupThemeProps) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('shared.dock');

  return (
    <Command.Group
      heading={t('groups.theme')}
      className={dockGroupClass}
    >
      {THEMES.map((item) => {
        const themeName = item as DockTheme;
        const meta = THEME_META[themeName];
        const active = isCurrentValue(theme, themeName);

        return (
          <CommandItemRow
            key={themeName}
            icon={
              <meta.Icon
                size={13}
                strokeWidth={1.8}
              />
            }
            label={meta.label}
            active={active}
            currentLabel={t('command.current')}
            onSelect={() => execute(() => setTheme(themeName))}
          />
        );
      })}
    </Command.Group>
  );
}
