'use client';

import { cn } from '@/shared/lib/cn';
import { Chip } from '@/shared/ui/chip';

import { BUILD_CHIP_CLASS, BUILD_ICONS } from './build-badge.constants';
import type { BuildInfo } from './build-badge.types';
import { shortBranchName } from './build-badge.utils';

interface BuildBadgeProps {
  build: BuildInfo;
}

const tooltipPosition = cn(
  'absolute left-1/2 top-full mt-2 -translate-x-1/2',
  'sm:left-full sm:top-1/2 sm:ml-2 sm:mt-0',
  'sm:translate-x-0 sm:-translate-y-1/2'
);

const tooltipClassName = cn(
  'z-50 flex w-max items-center gap-2',
  'pointer-events-none opacity-0 transition-all duration-200',
  'group-hover:pointer-events-auto group-hover:opacity-100',
  'group-focus-within:pointer-events-auto group-focus-within:opacity-100'
);

export function BuildBadge({ build }: BuildBadgeProps) {
  const VersionIcon = BUILD_ICONS.version;
  const CommitIcon = BUILD_ICONS.commit;
  const BranchIcon = BUILD_ICONS.branch;
  const DirtyIcon = BUILD_ICONS.dirty;

  return (
    <button
      type="button"
      aria-describedby="build-tooltip"
      className="group relative inline-flex cursor-default"
    >
      <Chip className={BUILD_CHIP_CLASS.version} icon={<VersionIcon className="size-3" />}>
        v{build.version}
      </Chip>

      <div id="build-tooltip" role="tooltip" className={cn(tooltipPosition, tooltipClassName)}>
        <Chip
          className={BUILD_CHIP_CLASS.commit}
          icon={<CommitIcon className="size-3" />}
          title={build.commit}
        >
          {build.commit.slice(0, 7)}
        </Chip>

        <Chip
          className={BUILD_CHIP_CLASS.branch}
          icon={<BranchIcon className="size-3" />}
          title={build.branch}
        >
          {shortBranchName(build.branch)}
        </Chip>

        {build.dirty && (
          <Chip className={BUILD_CHIP_CLASS.dirty} icon={<DirtyIcon className="size-3" />}>
            Dirty
          </Chip>
        )}
      </div>
    </button>
  );
}
