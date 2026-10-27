# Spoookify - Replica Reconnaissance

**Date:** 2026-10-28  
**Target:** Spotify (open.spotify.com)  
**Goal:** Build Spoookify - Spotify replica with mobile app, CLI app (Go + bubbletea), shared API  
**Scope:** Web/mobile UX patterns for Home, Search, Library, Playlists, Player  

## Sources

| Source | URL | What it gives |
|---|---|---|
| Spotify Web Player (public) | https://open.spotify.com | Primary UX - screens, flows, components |
| Spotify Support | https://support.spotify.com | Feature docs, settings, library behavior |
| Spotify Marketing | https://www.spotify.com | Pricing, core features |
| App Store / Google Play | Public listings | Mobile screen hierarchy |

## Scope (In)
- Home
- Search
- Your Library (Playlists, Artists, Albums, Liked Songs)
- Playlist/Album/Artist views
- Now Playing Bar/Sheet
- Auth (inferred - email/password)
- Playlists CRUD
- Track playback controls
- Like/Unlike tracks
- Full library view

## Scope (Out)
- Podcasts & Audiobooks
- Spotify Wrapped
- Blend, Jam, DJ, AI features
- Radio/Stations
- Spotify Connect
- Social features (following, activity feed)
- Lyrics
- Marketplace/merch
- Offline mode

## Screen Inventory

| ID | Screen | Route/Path | Purpose | Key Components | States |
|---|---|---|---|---|---|
| S01 | Home | / | Personalized recommendations, recently played | Hero cards, shelves/carousels, track rows | loading, filled, empty |
| S02 | Search | /search | Search + browse categories | Search input, category grid, results list | default, typing, results, empty |
| S03 | Library | /collection | Library overview | Filter tabs, list/grid, create button | loading, filled, empty |
| S04 | Playlist View | /playlist/:id | Tracklist with metadata | Header, track table/list, controls | loading, filled |
| S05 | Album View | /album/:id | Album tracks | Header, track list, artist link | loading, filled |
| S06 | Artist View | /artist/:id | Artist page | Header, popular, discography | loading, filled |
| S07 | Liked Songs | /collection/tracks | Special playlist | Header, track list | loading, filled, empty |
| S08 | Now Playing Bar | Persistent | Mini player | Album art, track info, controls, progress | playing, paused |
| S09 | Now Playing Sheet | Expanded modal | Full player | Art, controls, seek, queue | playing, paused |
| S10 | Auth (Login/Signup) | Modal/Route | Authentication | Email/password form | login, signup, error |

## User Flows

| ID | Flow | Screens | Edge Cases |
|---|---|---|---|
| F01 | Browse Home | S01 | Slow load, no recommendations |
| F02 | Search for track | S02 -> results -> S08/S09 | No results, typos |
| F03 | View & play playlist | S03/S01 -> S04 -> click track -> S08/S09 | Empty playlist |
| F04 | Like/Unlike track | Any track row/S09 -> toggle | Already liked |
| F05 | Create playlist | S03 -> create modal -> S04 | Empty name |
| F06 | Manage playlist (add/remove) | S04 -> add tracks/search | Duplicates |
| F07 | Navigate library | S03 -> filter tabs -> S04/S05/S06/S07 | Empty library |

## Components

| Component | Purpose | Variants | Used On |
|---|---|---|---|
| TrackRow | Track in list | default, playing, liked | S01,S04,S05,S06,S07,S02 |
| PlaylistCard/AlbumCard/ArtistCard | Grid items | default | S01,S02,S03 |
| NowPlayingBar | Mini player | playing, paused | All (persistent) |
| NowPlayingSheet | Full player | expanded | Modal/overlay |
| Sidebar/BottomNav | Navigation | desktop/mobile | All |
| SearchBar | Search input | default, focused | S02 |
| SearchResults | Results list/grid | tracks, artists, albums, playlists | S02 |
| LibraryList | Library items | list/grid view | S03 |
| Button | Actions | primary, secondary, icon | All |
| Input | Form fields | text, password | S10 |
| ProgressBar/SeekBar | Playback progress | interactive | S08,S09 |

## Inferred Data Model

| Entity | Fields | Relationships | Evidence | Confidence |
|---|---|---|---|---|
| User | id, email, password_hash, created_at | has many playlists, has many likes | Auth UI | High |
| Track | id, title, duration_ms, artist_id, album_id, audio_url | belongs to Artist, Album | Track rows everywhere | High |
| Artist | id, name, image_url | has many tracks, albums | Artist pages | High |
| Album | id, title, artist_id, release_date, image_url | belongs to Artist, has many tracks | Album pages | High |
| Playlist | id, name, user_id, is_public, created_at, updated_at | belongs to User, has many tracks via PlaylistTrack | Playlist views, CRUD | High |
| PlaylistTrack | id, playlist_id, track_id, position, added_at | junction table | Track ordering in playlists | High |
| Like | id, user_id, track_id, created_at | User likes Track | Heart/like buttons | High |
| PlayHistory | id, user_id, track_id, played_at | Optional history | Recently played | Medium |

## Next Step
Next: `/replica-architect` - Design stack, database schema, API for mobile + CLI with shared backend.

