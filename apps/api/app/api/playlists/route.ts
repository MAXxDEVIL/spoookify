import { NextRequest, NextResponse } from 'next/server';

const mockPlaylists = [
  { id: '1', name: 'My Playlist #1', userId: '1', isPublic: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

export async function GET() {
  return NextResponse.json({ playlists: mockPlaylists });
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 });
    }
    const playlist = { id: Date.now().toString(), name, userId: '1', isPublic: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return NextResponse.json({ playlist }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
