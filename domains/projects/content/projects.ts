import type { ContentItem } from '@/shared/ui/content-list';

export const projects: ContentItem[] = [
  {
    id: 'escape-room',
    title: 'Python Escape Room',
    description: 'Learn Python through themed rooms and progressively challenging puzzles.',
    href: 'https://github.com/python-chile/escape-room',
    date: '2026-08-26',
    tags: ['Education'],
    type: 'project'
  },
  {
    id: 'diagrama-de-venn',
    title: 'Venn Designer',
    description: 'A visual editor for exploring sets, intersections, and their relationships.',
    href: 'https://github.com/open-ucsh/diagrama-de-venn',
    date: '2026-08-23',
    tags: ['Web'],
    type: 'project'
  },
  {
    id: 'entidad-relacion',
    title: 'MER Designer',
    description:
      'Design entity–relationship diagrams with entities, attributes, and relationships.',
    href: 'https://github.com/open-ucsh/entidad-relacion',
    date: '2026-08-07',
    tags: ['Web'],
    type: 'project'
  },
  {
    id: 'santana-labs',
    title: 'Santana Labs',
    description: 'A home for public research, experiments, projects, and shared field notes.',
    href: 'https://github.com/santanahq/santanahq.github.io',
    date: '2026-08-06',
    tags: ['Research'],
    type: 'project'
  }
];
