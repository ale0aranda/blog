import type { ReactNode } from 'react';

import { Command } from 'cmdk';

import { dockItemClass, dockItemIconClass } from './styles';

interface CommandItemRowProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  currentLabel?: string;
  onSelect: () => void;
}

export function CommandItemRow({
  icon,
  label,
  active = false,
  currentLabel,
  onSelect
}: CommandItemRowProps) {
  return (
    <Command.Item disabled={active} onSelect={onSelect} className={dockItemClass}>
      <span className={dockItemIconClass}>{icon}</span>

      <span className="flex-1">{label}</span>

      {active && currentLabel ? (
        <span className="font-mono text-xs text-muted">{currentLabel}</span>
      ) : null}
    </Command.Item>
  );
}
