export interface Social {
  id: string;
  href: string;
  external?: boolean;
  copyValue?: string;
}

export const SOCIAL_LINKS: readonly Social[] = [
  {
    id: 'email',
    href: 'mailto:alejandro.arancibia.aranda@gmail.com',
    copyValue: 'alejandro.arancibia.aranda@gmail.com'
  },
  { id: 'github', href: 'https://github.com/alejaranda', external: true },
  { id: '𝕏', href: 'https://x.com/alejaranda', external: true }
];
