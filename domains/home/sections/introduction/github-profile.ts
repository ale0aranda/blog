import { z } from 'zod';

const USERNAME = 'ale0aranda';

const githubProfileSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  avatar_url: z.url(),
  followers: z.number(),
  public_repos: z.number()
});

const githubEventsSchema = z.array(
  z.object({
    type: z.string(),
    created_at: z.string().nullable(),
    repo: z.object({
      name: z.string()
    }),
    payload: z.object({
      head: z.string().optional(),
      ref: z.string().optional()
    })
  })
);

const githubCommitSchema = z.object({
  html_url: z.url(),
  commit: z.object({
    message: z.string()
  })
});

async function fetchGitHub(path: string, revalidate: number) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json'
    },
    next: {
      revalidate
    },
    signal: AbortSignal.timeout(8_000)
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getGitHubProfile() {
  try {
    const data = await fetchGitHub(`/users/${USERNAME}`, 3600);
    const result = githubProfileSchema.safeParse(data);

    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export async function getLatestGitHubCommit() {
  try {
    const data = await fetchGitHub(`/users/${USERNAME}/events/public?per_page=100`, 600);

    const result = githubEventsSchema.safeParse(data);

    if (!result.success) {
      return null;
    }

    const event = result.data.find(
      (item) =>
        item.type === 'PushEvent'
        && item.payload.head
        && item.payload.ref?.startsWith('refs/heads/')
    );

    if (!event?.payload.head || !event.created_at) {
      return null;
    }

    const commitData = await fetchGitHub(
      `/repos/${event.repo.name}/commits/${event.payload.head}`,
      3600
    );

    const commit = githubCommitSchema.safeParse(commitData);

    if (!commit.success) {
      return null;
    }

    return {
      message: commit.data.commit.message.split('\n')[0] ?? '',
      repository: event.repo.name,
      url: commit.data.html_url,
      pushedAt: event.created_at
    };
  } catch {
    return null;
  }
}
