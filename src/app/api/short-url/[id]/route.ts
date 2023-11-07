import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: any) => {
  const id = params.id;

  const url = await kv.get(id);

  if (!url) {
    return NextResponse.json({ status: 404, body: 'Not found' });
  }

  return NextResponse.redirect(`${url}`);
};
