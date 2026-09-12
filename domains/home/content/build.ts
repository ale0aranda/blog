import { execSync } from 'node:child_process';

import pkg from '@/package.json';

import type { BuildInfo } from './build.types';

const UNKNOWN = 'unknown';

function exec(command: string): string | undefined {
  try {
    return execSync(command, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  } catch {
    return undefined;
  }
}

function resolveCommit(): string {
  return process.env.VERCEL_GIT_COMMIT_SHA ?? exec('git rev-parse HEAD') ?? UNKNOWN;
}

function resolveBranch(): string {
  return process.env.VERCEL_GIT_COMMIT_REF ?? exec('git rev-parse --abbrev-ref HEAD') ?? UNKNOWN;
}

function isDirty(): boolean {
  const status = exec('git status --porcelain');

  return status !== undefined && status.length > 0;
}

export const build: BuildInfo = {
  version: pkg.version,
  commit: resolveCommit(),
  branch: resolveBranch(),
  dirty: isDirty()
};
