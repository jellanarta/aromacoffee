import { NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getSiteContent();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to load content' }, { status: 500 });
  }
}
