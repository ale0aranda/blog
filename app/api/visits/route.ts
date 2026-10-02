import { NextResponse } from 'next/server';

import { Redis } from '@upstash/redis';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');

  if (origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  try {
    const redis = Redis.fromEnv();
    const count = await redis.incr('portfolio:visits');

    return NextResponse.json({ count }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Visits unavailable' }, { status: 503 });
  }
}
