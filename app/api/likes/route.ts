import { randomUUID } from 'node:crypto';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { Redis } from '@upstash/redis';

import { getPostBySlug } from '@/domains/writing/lib/posts';

export const runtime = 'nodejs';

const COOKIE_NAME = 'portfolio-reader';

const READ_SCRIPT = `
  return {
    redis.call("SCARD", KEYS[1]),
    redis.call("SISMEMBER", KEYS[1], ARGV[1])
  }
`;

const UPDATE_SCRIPT = `
  if ARGV[2] == "true" then
    redis.call("SADD", KEYS[1], ARGV[1])
  else
    redis.call("SREM", KEYS[1], ARGV[1])
  end

  return {
    redis.call("SCARD", KEYS[1]),
    redis.call("SISMEMBER", KEYS[1], ARGV[1])
  }
`;

function getPostKey(request: NextRequest): string | undefined {
  const slug = request.nextUrl.searchParams.get('slug');
  const locale = request.nextUrl.searchParams.get('locale');

  if (!slug || !locale || !/^[a-zA-Z0-9_-]{1,120}$/.test(slug) || !['es', 'en'].includes(locale)) {
    return undefined;
  }

  try {
    const post = getPostBySlug(locale, slug);

    if (post.frontmatter.draft) {
      return undefined;
    }

    return `portfolio:likes:${slug}`;
  } catch {
    return undefined;
  }
}

function getReaderId(request: NextRequest): string | undefined {
  const value = request.cookies.get(COOKIE_NAME)?.value;

  if (
    !value
    || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  ) {
    return undefined;
  }

  return value;
}

function resultResponse(result: [number, number]) {
  return NextResponse.json(
    {
      count: result[0],
      liked: result[1] === 1
    },
    {
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  );
}

export async function GET(request: NextRequest) {
  const key = getPostKey(request);

  if (!key) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  try {
    const existingReaderId = getReaderId(request);
    const readerId = existingReaderId ?? randomUUID();
    const redis = Redis.fromEnv();

    const result = await redis.eval<[number, number]>(READ_SCRIPT, [key], [readerId]);

    const response = resultResponse(result);

    if (!existingReaderId) {
      response.cookies.set(COOKIE_NAME, readerId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Likes unavailable' },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  const key = getPostKey(request);

  if (!key) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const readerId = getReaderId(request);

  if (!readerId) {
    return NextResponse.json({ error: 'Reload the page before liking' }, { status: 409 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (
    typeof body !== 'object'
    || body === null
    || !('liked' in body)
    || typeof body.liked !== 'boolean'
  ) {
    return NextResponse.json({ error: 'Invalid like value' }, { status: 400 });
  }

  try {
    const redis = Redis.fromEnv();

    const result = await redis.eval<[number, number]>(
      UPDATE_SCRIPT,
      [key],
      [readerId, String(body.liked)]
    );

    return resultResponse(result);
  } catch {
    return NextResponse.json(
      { error: 'Likes unavailable' },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}
