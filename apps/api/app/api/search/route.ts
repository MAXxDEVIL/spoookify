import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';
  const results = {
    tracks: q ? [{ id: '1', title: `Result for ${q}`, artist: { name: 'Artist' }, durationMs: 200000, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }] : [],
    artists: [],
    albums: [],
    playlists: []
  };
  return NextResponse.json(results);
}
