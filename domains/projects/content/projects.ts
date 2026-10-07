export const projectCategories = ['all', 'education', 'tools', 'community'] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  date: string;
  tags: readonly string[];
  category: Exclude<ProjectCategory, 'all'>;
  website: string;
  repository: string;
  technologies: readonly string[];
  image?: string;
};

export const projects: Project[] = [
  {
    id: 'escape-room',
    date: '2026-08-26',
    tags: ['Education'],
    category: 'education',
    website: 'https://python-chile.github.io/escape-room/',
    repository: 'https://github.com/python-chile/escape-room',
    technologies: ['Astro', 'Tailwindcss'],
    image: '/projects/pythonchile-escape-room.png'
  },
  {
    id: 'diagrama-de-venn',
    date: '2026-08-23',
    tags: ['Web'],
    category: 'tools',
    website: 'https://ucsh-venn.vercel.app/',
    repository: 'https://github.com/open-ucsh/diagrama-de-venn',
    technologies: ['Next.js', 'Zustand'],
    image: '/projects/ucsh-venn.png'
  },
  {
    id: 'f0rma',
    date: '2026-09-01',
    tags: ['Web'],
    category: 'tools',
    website: 'https://f0rma.vercel.app',
    repository: 'https://github.com/ale0aranda/forma',
    technologies: ['Next.js', 'Tailwindcss']
  },
  {
    id: 'entidad-relacion',
    date: '2026-08-07',
    tags: ['Web'],
    category: 'tools',
    website: 'https://ucsh-modelador.vercel.app/',
    repository: 'https://github.com/open-ucsh/entidad-relacion',
    technologies: ['Next.js', 'Zustand'],
    image: '/projects/ucsh-modelador.png'
  },
  {
    id: 'santana-labs',
    date: '2026-08-06',
    tags: ['Research'],
    category: 'community',
    website: 'https://santanahq.github.io/',
    repository: 'https://github.com/santanahq/santanahq.github.io',
    technologies: ['Astro', 'Tailwindcss'],
    image: '/projects/santanahq.png'
  }
];

export function getProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}
