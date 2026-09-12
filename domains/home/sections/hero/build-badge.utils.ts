export function shortBranchName(branch: string): string {
  return branch.split('/').at(-1) ?? branch;
}
