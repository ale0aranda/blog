import { Command } from 'cmdk';
import { FolderKanban, Home, Newspaper } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';

import { CommandItemRow } from '../command-item';
import { dockGroupClass } from '../styles';

interface CommandGroupNavigationProps {
  execute: (action: () => void) => void;
}

export function CommandGroupNavigation({ execute }: CommandGroupNavigationProps) {
  const router = useRouter();
  const t = useTranslations('shared.dock');

  return (
    <Command.Group
      heading={t('groups.navigation')}
      className={dockGroupClass}
    >
      <CommandItemRow
        icon={<Home size={13} />}
        label={t('actions.home')}
        onSelect={() => execute(() => router.push('/'))}
      />

      <CommandItemRow
        icon={<FolderKanban size={13} />}
        label={t('actions.projects')}
        onSelect={() => execute(() => router.push('/projects'))}
      />

      <CommandItemRow
        icon={<Newspaper size={13} />}
        label={t('actions.writing')}
        onSelect={() => execute(() => router.push('/writing'))}
      />
    </Command.Group>
  );
}
