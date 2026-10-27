# Spoookify Design Components

## Core Components

### TrackRow
- Layout: [artwork] [title/artist] [album] [duration] [like button]
- States: default, hover, playing (accent color), active
- Height: 56px
- Mobile: simplified (hide album)

### PlaylistCard / AlbumCard / ArtistCard
- Aspect ratio: 1:1 for albums/playlists, circular for artists
- Size: 180x180 (desktop), 150x150 (mobile)
- Shadow on hover
- Text below: title, subtitle

### NowPlayingBar
- Height: 90px (desktop), 64px (mobile)
- Layout: track info | controls | volume/progress
- Fixed bottom
- Background: elevated color

### NowPlayingSheet
- Full screen overlay/modal
- Large artwork
- Centered controls
- Progress bar with time
- Queue button

### Sidebar (Desktop) / BottomNav (Mobile)
- Desktop: 240px width, vertical nav
- Mobile: bottom tab bar with icons
- Items: Home, Search, Library, Create Playlist

### SearchBar
- Rounded full
- Icon + input
- Background: secondary

### Button
- Variants: primary (accent), secondary (surface), ghost, icon
- Sizes: sm, md, lg
- Border radius: full for pill buttons

### Input
- Background: secondary
- Border: border color
- Focus: accent border
- Padding: md

## Spacing Scale
Following 4pt grid (0.25rem base): xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px)

## Typography
- Headings: 24-36px, bold
- Body: 14-16px, normal
- Small: 12-14px
- UI labels: 14px, medium/semibold
