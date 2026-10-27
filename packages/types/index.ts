export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artist?: Artist;
  imageUrl?: string;
  releaseDate?: string;
}

export interface Track {
  id: string;
  title: string;
  artistId: string;
  artist?: Artist;
  albumId?: string;
  album?: Album;
  durationMs: number;
  audioUrl: string;
  liked?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  tracks?: Track[];
}

export interface AuthResponse {
  user: User;
  token?: string;
}
