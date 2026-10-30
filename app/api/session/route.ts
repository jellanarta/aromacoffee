import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/session';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    const isValid = verifySessionToken(token);

    return NextResponse.json({
      authenticated: isValid,
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
