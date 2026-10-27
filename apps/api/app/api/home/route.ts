import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    recentlyPlayed: [],
    madeForYou: [
      { id: 'p1', name: 'Daily Mix 1', type: 'playlist' },
      { id: 'p2', name: 'Chill Hits', type: 'playlist' }
    ]
  });
}
