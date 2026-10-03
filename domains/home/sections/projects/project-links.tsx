type ProjectLinks = {
  website: string;
  repository: string;
};

const links: Record<string, ProjectLinks> = {
  'escape-room': {
    website: 'https://python-chile.github.io/escape-room/',
    repository: 'https://github.com/python-chile/escape-room'
  },
  'diagrama-de-venn': {
    website: 'https://ucsh-venn.vercel.app/',
    repository: 'https://github.com/open-ucsh/diagrama-de-venn'
  },
  'entidad-relacion': {
    website: 'https://ucsh-modelador.vercel.app/',
    repository: 'https://github.com/open-ucsh/entidad-relacion'
  },
  'santana-labs': {
    website: 'https://santanahq.github.io/',
    repository: 'https://github.com/santanahq/santanahq.github.io'
  }
};

export function getProjectLinks(projectId: string) {
  return links[projectId];
}
