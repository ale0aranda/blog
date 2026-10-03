'use client';

import { useId } from 'react';

import { projects } from '@/domains/projects/content/projects';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

import { ProjectItem } from './project-item';
import { ProjectsHeader } from './projects-header';

const PREVIEW_LIMIT = 3;

export function Projects() {
  const headingId = useId();

  return (
    <StaggerGroup
      aria-labelledby={headingId}
      as="section"
      className="mt-10"
    >
      <FadeIn
        as="div"
        className="mb-4"
      >
        <ProjectsHeader headingId={headingId} />
      </FadeIn>

      <ul className="m-0 list-none space-y-0.5 p-0">
        {projects.slice(0, PREVIEW_LIMIT).map((project) => (
          <FadeIn
            as="li"
            key={project.id}
          >
            <ProjectItem project={project} />
          </FadeIn>
        ))}
      </ul>
    </StaggerGroup>
  );
}
