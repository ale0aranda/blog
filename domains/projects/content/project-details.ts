export const projectCategories = ['all', 'education', 'tools', 'community'] as const;

export type ProjectCategory = (typeof projectCategories)[number];

type ProjectDetails = {
  category: Exclude<ProjectCategory, 'all'>;
  website: string;
  repository: string;
  technologies: readonly string[];
  image?: string;
};

const details: Record<string, ProjectDetails> = {
  'escape-room': {
    category: 'education',
    website: 'https://python-chile.github.io/escape-room/',
    repository: 'https://github.com/python-chile/escape-room',
    technologies: ['Astro', 'Tailwindcss'],
    image: '/projects/pythonchile-escape-room.png'
  },
  'diagrama-de-venn': {
    category: 'tools',
    website: 'https://ucsh-venn.vercel.app/',
    repository: 'https://github.com/open-ucsh/diagrama-de-venn',
    technologies: ['Next.js', 'Zustand'],
    image: '/projects/ucsh-venn.png'
  },
  'entidad-relacion': {
    category: 'tools',
    website: 'https://ucsh-modelador.vercel.app/',
    repository: 'https://github.com/open-ucsh/entidad-relacion',
    technologies: ['Next.js', 'Zustand'],
    image: '/projects/ucsh-modelador.png'
  },
  'santana-labs': {
    category: 'community',
    website: 'https://santanahq.github.io/',
    repository: 'https://github.com/santanahq/santanahq.github.io',
    technologies: ['Astro', 'Tailwindcss'],
    image: '/projects/santanahq.png'
  }
};

export function getProjectDetails(projectId: string) {
  return details[projectId];
}
