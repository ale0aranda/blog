'use client';

import { Code2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ContentItem } from '@/shared/types/content-item';

import { ProjectIcon } from './project-icon';
import { getProjectLinks } from './project-links';

interface ProjectItemProps {
  project: ContentItem;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const t = useTranslations('home.projects');
  const links = getProjectLinks(project.id);

  const descriptionKey = `descriptions.${project.id}`;
  const description = t.has(descriptionKey) ? t(descriptionKey) : project.description;

  return (
    <div className="group relative isolate flex items-center gap-3 rounded-xl py-2">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-2 inset-y-0 -z-10 rounded-xl bg-fg/5 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <a
        className="peer flex min-w-0 flex-1 items-center gap-3 rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-accent"
        href={links?.website ?? project.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ProjectIcon projectId={project.id} />

        <span className="min-w-0 flex-1">
          <span className="block font-medium text-fg text-sm tracking-tight transition-colors duration-200 group-focus-within:text-accent group-hover:text-accent motion-reduce:transition-none">
            {project.title}
          </span>

          {description && (
            <span className="mt-0.5 block text-muted text-xs leading-relaxed">{description}</span>
          )}
        </span>
      </a>

      {links && (
        <a
          aria-label={t('source', { project: project.title })}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted opacity-100 outline-offset-2 transition duration-200 hover:bg-bg hover:text-accent focus-visible:text-accent focus-visible:outline motion-reduce:transform-none motion-reduce:transition-none sm:translate-x-1 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-x-0 sm:group-focus-within:opacity-100"
          href={links.repository}
          rel="noopener noreferrer"
          target="_blank"
          title={t('source', { project: project.title })}
        >
          <Code2
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.5}
          />
        </a>
      )}
    </div>
  );
}
