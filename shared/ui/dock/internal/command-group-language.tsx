import { Command } from 'cmdk';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useLocaleSwitcher } from '@/shared/hooks/use-locale-switcher';

import { CommandItemRow } from '../command-item';
import { dockGroupClass } from '../styles';
import { isCurrentValue } from '../utils';

interface CommandGroupLanguageProps {
  execute: (action: () => void) => void;
}

export function CommandGroupLanguage({ execute }: CommandGroupLanguageProps) {
  const { currentLocale, availableLocales, switchLocale } = useLocaleSwitcher();

  const t = useTranslations('shared.dock');

  return (
    <Command.Group
      heading={t('groups.language')}
      className={dockGroupClass}
    >
      {availableLocales.map((item) => {
        const active = isCurrentValue(currentLocale, item);

        return (
          <CommandItemRow
            key={item}
            icon={<Languages size={13} />}
            label={item.toUpperCase()}
            active={active}
            currentLabel={t('command.current')}
            onSelect={() => execute(() => switchLocale(item))}
          />
        );
      })}
    </Command.Group>
  );
}
