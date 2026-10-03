import type { ContentItem } from '@/shared/ui/content-list';

export const projects: ContentItem[] = [
  {
    id: 'escape-room',
    title: 'Python Escape Room',
    description: 'Learn programming by solving challenges.',
    href: 'https://github.com/python-chile/escape-room',
    date: '2026-08-26',
    tags: ['Education'],
    type: 'project'
  },
  {
    id: 'diagrama-de-venn',
    title: 'Venn Designer',
    description: 'Explore sets and their relationships.',
    href: 'https://github.com/open-ucsh/diagrama-de-venn',
    date: '2026-08-23',
    tags: ['Web'],
    type: 'project'
  },
  {
    id: 'entidad-relacion',
    title: 'MER Designer',
    description: 'Design entity-relationship and logical models.',
    href: 'https://github.com/open-ucsh/entidad-relacion',
    date: '2026-08-07',
    tags: ['Web'],
    type: 'project'
  },
  {
    id: 'santana-labs',
    title: 'Santana Labs',
    description: 'A space for experiments and shared ideas.',
    href: 'https://github.com/santanahq/santanahq.github.io',
    date: '2026-08-06',
    tags: ['Research'],
    type: 'project'
  }
];
