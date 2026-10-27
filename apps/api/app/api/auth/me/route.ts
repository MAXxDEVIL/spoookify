import { NextResponse } from 'next/server';

export async function GET() {
  // MVP: no auth check
  return NextResponse.json({ user: null });
}
