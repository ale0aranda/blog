import { NextResponse } from 'next/server';

import type { NowPlayingData } from '@/shared/ui/footer/now-playing.types';

export const runtime = 'nodejs';

type SpotifyToken = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
};

type SpotifyPlayback = {
  is_playing: boolean;
  currently_playing_type: string;
  item?: {
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  } | null;
};

let cachedToken: string | undefined;
let tokenExpiresAt = 0;
let rotatedRefreshToken: string | undefined;

function json(data: NowPlayingData) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=30'
    }
  });
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = rotatedRefreshToken ?? process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify environment variables.');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(8_000)
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Spotify token (${response.status}).`);
  }

  const data = (await response.json()) as SpotifyToken;

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1_000;

  if (data.refresh_token) {
    rotatedRefreshToken = data.refresh_token;
  }

  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000)
    });

    if (response.status === 204) {
      return json({ isPlaying: false });
    }

    if (!response.ok) {
      if (response.status === 401) {
        cachedToken = undefined;
        tokenExpiresAt = 0;
      }

      throw new Error(`Spotify returned ${response.status}.`);
    }

    const data = (await response.json()) as SpotifyPlayback;

    if (!data.is_playing || data.currently_playing_type !== 'track' || !data.item) {
      return json({ isPlaying: false });
    }

    return json({
      isPlaying: true,
      title: data.item.name,
      artist: data.item.artists.map((artist) => artist.name).join(', '),
      album: data.item.album.name,
      image: data.item.album.images[0]?.url ?? null,
      url: data.item.external_urls.spotify
    });
  } catch (_error) {
    return NextResponse.json(
      { isPlaying: false },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}
