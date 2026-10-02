import { z } from 'zod';

const githubProfileSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  avatar_url: z.string().url(),
  followers: z.number(),
  public_repos: z.number()
});

export async function getGitHubProfile() {
  try {
    const response = await fetch('https://api.github.com/users/ale0aranda', {
      headers: {
        Accept: 'application/vnd.github+json'
      },
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      return null;
    }

    const result = githubProfileSchema.safeParse(await response.json());

    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
