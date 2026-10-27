# Spoookify - Architecture

## Stack
| Layer | Choice | Reason |
|---|---|---|
| Monorepo | pnpm + turbo | Share types between API/mobile/CLI |
| API | Next.js (App Router) | TypeScript, easy API routes, shares types with mobile |
| Database | PostgreSQL + Drizzle ORM | Type-safe, migrations, good schema control |
| Auth | better-auth (email/password) | Simple MVP auth, session-based |
| Mobile | Expo (React Native) + expo-router + NativeWind + expo-av | Cross-platform, familiar React, audio playback |
| CLI | Go + bubbletea + beep/oto | Proper TUI, embedded player as requested |
| Styling (mobile) | NativeWind (Tailwind) | Fast UI development |

## Monorepo Layout
```
spoookify/
├── apps/
│   ├── api/      # Next.js API (serves mobile + CLI)
│   ├── mobile/   # Expo app
│   └── cli/      # Go + bubbletea CLI
├── packages/
│   ├── types/    # Shared TypeScript types
│   ├── db/       # Drizzle schema/migrations
│   └── config/   # Shared configs
└── replica/      # Recon/arch/design docs
```

## Database Schema

### users
```sql
users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### artists
```sql
artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);
```

### albums
```sql
albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE,
  release_date date,
  image_url text,
  created_at timestamptz DEFAULT now()
);
```

### tracks
```sql
tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE,
  album_id uuid REFERENCES albums(id) ON DELETE SET NULL,
  duration_ms integer NOT NULL,
  audio_url text NOT NULL, -- placeholder audio
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_tracks_artist ON tracks(artist_id);
CREATE INDEX idx_tracks_album ON tracks(album_id);
```

### playlists
```sql
playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX idx_playlists_user ON playlists(user_id);
```

### playlist_tracks
```sql
playlist_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE NOT NULL,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  position integer NOT NULL,
  added_at timestamptz DEFAULT now(),
  UNIQUE(playlist_id, track_id)
);
CREATE INDEX idx_playlist_tracks_playlist ON playlist_tracks(playlist_id, position);
```

### likes
```sql
likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, track_id)
);
CREATE INDEX idx_likes_user ON likes(user_id);
```

## API Endpoints (REST)

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Browse
- `GET /api/home` - Home feed
- `GET /api/search?q=...` - Search tracks/artists/albums/playlists

### Library
- `GET /api/library` - User's library
- `GET /api/library/liked` - Liked songs

### Playlists
- `GET /api/playlists` - User's playlists
- `POST /api/playlists` - Create playlist
- `GET /api/playlists/:id` - Playlist with tracks
- `PATCH /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist
- `POST /api/playlists/:id/tracks` - Add track
- `DELETE /api/playlists/:id/tracks/:trackId` - Remove track

### Tracks/Content
- `GET /api/tracks/:id` - Track details
- `GET /api/albums/:id` - Album with tracks
- `GET /api/artists/:id` - Artist with tracks/albums
- `POST /api/tracks/:id/like` - Like track
- `DELETE /api/tracks/:id/like` - Unlike track

## CLI Architecture (Go + bubbletea)
- API client to fetch data
- Embedded player using `gopxl/beep` + `oto` for audio streaming
- Views: Home, Search, Library, Playlist, NowPlaying
- Keybindings for navigation and playback
- Queue management

## Mobile Architecture (Expo)
- API client with auth token/cookie
- expo-av for playback
- expo-router for navigation
- NativeWind for styling
- Context for auth/player state

## Next Step
Next: `replica-design` - Create Spoookify design system (new brand, colors, typography, components)
