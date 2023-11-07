import { createHash } from 'node:crypto';

import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { url } = (await req.json()) as any;

  if (!url) {
    return NextResponse.json({ status: 400, body: 'Invalid request' });
  }

  const key = createHash('sha256')
    .update(url)
    .digest('base64')
    .replaceAll(/[^\da-z]/g, '')
    .slice(-6);

  const item = await kv.get(key);
  const redirectUrl = `${process.env.URL}/${key}`;

  if (item) {
    return NextResponse.json({ url: redirectUrl });
  } else {
    await kv.set(key, url);
  }

  return NextResponse.json({ url: redirectUrl });
};
