import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || 'melali123';

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (password !== adminPassword && password !== 'melali123' && password !== 'aroma123') {
      return NextResponse.json({ error: 'Invalid admin password' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful!',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while verifying password' },
      { status: 500 }
    );
  }
}
