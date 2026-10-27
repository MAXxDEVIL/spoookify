import { NextResponse } from 'next/server';

const mockLiked = [
  { id: '1', title: 'Sample Track 1', artist: { name: 'Artist One' }, durationMs: 180000, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', liked: true },
  { id: '2', title: 'Sample Track 2', artist: { name: 'Artist Two' }, durationMs: 210000, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', liked: true },
];

export async function GET() {
  return NextResponse.json({ tracks: mockLiked });
}
