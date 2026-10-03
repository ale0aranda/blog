import type { ContentItem } from '@/shared/ui/content-list';

export const projects: ContentItem[] = [
  {
    id: 'escape-room',
    title: 'Python Escape Room',
    description: 'Learn Python, one puzzle at a time.',
    href: 'https://github.com/python-chile/escape-room',
    date: '2026-08-26',
    tags: ['Education'],
    type: 'project'
  },
  {
    id: 'diagrama-de-venn',
    title: 'Venn Designer',
    description: 'Explore sets and their intersections.',
    href: 'https://github.com/open-ucsh/diagrama-de-venn',
    date: '2026-08-23',
    tags: ['Web'],
    type: 'project'
  },
  {
    id: 'entidad-relacion',
    title: 'MER Designer',
    description: 'Give your database ideas a shape.',
    href: 'https://github.com/open-ucsh/entidad-relacion',
    date: '2026-08-07',
    tags: ['Web'],
    type: 'project'
  },
  {
    id: 'santana-labs',
    title: 'Santana Labs',
    description: 'A place for experiments and shared ideas.',
    href: 'https://github.com/santanahq/santanahq.github.io',
    date: '2026-08-06',
    tags: ['Research'],
    type: 'project'
  }
];
