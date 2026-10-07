'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

import { Code2, Globe2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { Project } from './content/projects';
import { ProjectChevron } from './project-chevron';
import { ProjectIcon } from './project-icon';
import { ProjectTechnology } from './project-technology';

type ProjectCardProps = {
  project: Project;
  open: boolean;
  onToggle: () => void;
};

const actionClass =
  'flex size-8 items-center justify-center rounded-lg text-muted outline-offset-4 transition-colors duration-200 hover:bg-surface hover:text-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-accent motion-reduce:transition-none';

export function ProjectCard({ project, open, onToggle }: ProjectCardProps) {
  const t = useTranslations('domains.projects');
  const panelId = useId();
  const headingId = useId();

  const [activation, setActivation] = useState(0);
  const titleKey = `items.${project.id}.title`;
  const descriptionKey = `items.${project.id}.description`;
  const summaryKey = `items.${project.id}.summary`;

  const title = t(titleKey);
  const description = t(descriptionKey);

  function toggleProject() {
    setActivation((current) => current + 1);
    onToggle();
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-bg">
      <h2
        className="m-0"
        id={headingId}
      >
        <button
          aria-controls={panelId}
          aria-expanded={open}
          className="group flex w-full items-center gap-3 p-4 text-left outline-none transition-colors duration-200 hover:bg-surface focus-visible:bg-surface focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset motion-reduce:transition-none"
          onClick={toggleProject}
          type="button"
        >
          <ProjectIcon projectId={project.id} />

          <span className="min-w-0 flex-1">
            <span className="block font-medium text-fg text-sm tracking-tight transition-colors group-hover:text-accent motion-reduce:transition-none">
              {title}
            </span>

            {description && (
              <span className="mt-1 block font-normal text-muted text-xs leading-relaxed">
                {description}
              </span>
            )}
          </span>

          <ProjectChevron
            activation={activation}
            open={open}
          />
        </button>
      </h2>

      <section
        aria-labelledby={headingId}
        hidden={!open}
        id={panelId}
      >
        <div className="px-4 pb-4">
          {project.image && (
            <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-border bg-surface">
              <Image
                alt={t('preview', { project: title })}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 90vw, 480px"
                src={project.image}
              />
            </div>
          )}

          {t.has(summaryKey) && (
            <p className="m-0 text-muted text-xs leading-relaxed">{t(summaryKey)}</p>
          )}

          <div className="mt-4 flex items-center justify-between gap-3">
            <ul
              aria-label={t('technologies')}
              className="m-0 flex min-w-0 flex-wrap gap-1.5 p-0"
            >
              {project.technologies.map((technology) => (
                <ProjectTechnology
                  key={technology}
                  technology={technology}
                />
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-1">
              <a
                aria-label={t('visitProject', { project: title })}
                className={actionClass}
                href={project.website}
                rel="noopener noreferrer"
                target="_blank"
                title={t('visitProject', { project: title })}
              >
                <Globe2
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.5}
                />
              </a>

              <a
                aria-label={t('source', { project: title })}
                className={actionClass}
                href={project.repository}
                rel="noopener noreferrer"
                target="_blank"
                title={t('source', { project: title })}
              >
                <Code2
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
