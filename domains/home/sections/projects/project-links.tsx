import { getProjectDetails } from '@/domains/projects/content/project-details';

export function getProjectLinks(projectId: string) {
  return getProjectDetails(projectId);
}
