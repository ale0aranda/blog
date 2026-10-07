declare namespace NodeJS {
  interface ProcessEnv {
    readonly VERCEL_GIT_COMMIT_SHA?: string;
    readonly VERCEL_GIT_COMMIT_REF?: string;
    readonly SPOTIFY_CLIENT_ID?: string;
    readonly SPOTIFY_CLIENT_SECRET?: string;
    readonly SPOTIFY_REFRESH_TOKEN?: string;
  }
}
