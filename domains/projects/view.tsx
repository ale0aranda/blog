'use client';

import { useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { Container } from '@/shared/ui/container';

import type { ProjectCategory } from './content/projects';
import { projects } from './content/projects';
import { ProjectCard } from './project-card';
import { ProjectFilters } from './project-filters';

export function ProjectsView() {
  const t = useTranslations('domains.projects');

  const [category, setCategory] = useState<ProjectCategory>('all');
  const [openId, setOpenId] = useState<string | null>('diagrama-de-venn');

  const visibleProjects = projects.filter((project) => {
    return category === 'all' || project.category === category;
  });

  return (
    <Container className="pb-32">
      <FadeIn
        animate="mount"
        y={6}
      >
        <header>
          <Link
            className="group inline-flex items-center gap-2 rounded-sm text-muted text-xs outline-offset-4 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-accent motion-reduce:transition-none"
            href="/"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              strokeWidth={1.5}
            />

            {t('back')}
          </Link>

          <h1 className="mt-6 mb-0 font-semibold text-2xl text-fg tracking-tight">{t('title')}</h1>

          <div className="mt-5">
            <ProjectFilters
              onChange={setCategory}
              selected={category}
            />
          </div>
        </header>

        <div className="mt-5 space-y-3">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              onToggle={() => {
                setOpenId((current) => (current === project.id ? null : project.id));
              }}
              open={openId === project.id}
              project={project}
            />
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <p
            className="py-12 text-center text-muted text-sm"
            role="status"
          >
            {t('empty')}
          </p>
        )}
      </FadeIn>
    </Container>
  );
}
