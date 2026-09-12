import type { Social } from '../../content/social-links';

export interface SocialLinkProps {
  social: Social & {
    label: string;
  };
}
