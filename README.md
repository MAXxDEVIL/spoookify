# Spoookify

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)
![Go](https://img.shields.io/badge/go-%3E%3D1.23-blue.svg)

A Spotify-inspired music streaming application built with a modern monorepo architecture. Features a shared REST API consumed by both a React Native mobile app and a Go Bubbletea terminal CLI client.

> **Clean-Room Implementation:** Built by studying Spotify's UX patterns without copying any original assets, logos, or code. All branding and design has been reimagined as "Spoookify".

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Screenshots & Proof of Concept](#screenshots--proof-of-concept)
- [Testing](#testing)
- [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## About

Spoookify is a multi-platform music streaming client demonstrating unified architecture across web API, mobile, and terminal interfaces. The project follows a monorepo pattern with shared types and database schemas to ensure consistency across all platforms.

## Features

### Implemented ✅

- [x] **User Authentication** - Email/password signup, login, and session management
- [x] **Playlist Management** - Create and view playlists
- [x] **Library** - Liked songs collection
- [x] **Search** - Search across tracks, artists, albums, and playlists
- [x] **Home Feed** - Personalized content recommendations
- [x] **REST API** - Fully functional Next.js API with 8 endpoints
- [x] **Terminal CLI** - Interactive TUI built with Go Bubbletea
- [x] **Database Schema** - Complete Drizzle ORM schema for all entities
- [x] **Shared Types** - TypeScript interfaces shared across packages
- [x] **Custom Design System** - Unique indigo-themed UI (no Spotify branding)

### In Development 🚧

- [ ] **Playlist Track Management** - Add/remove tracks from playlists
- [ ] **Player Controls** - Play, pause, next, previous, seek
- [ ] **Now Playing UI** - Mini player and expanded player view
- [ ] **Album/Artist Details** - Full detail pages
- [ ] **Track Liking** - Like/unlike functionality
- [ ] **Mobile App UI** - Complete Expo React Native interface
- [ ] **CLI Player Integration** - Embedded audio player with beep/oto

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Monorepo** | [pnpm](https://pnpm.io/) + [Turborepo](https://turbo.build/) | pnpm 12.15.0 | Package management & build orchestration |
| **API** | [Next.js](https://nextjs.org/) | 15.3.3 | REST API server (App Router) |
| **Frontend Framework** | [React](https://react.dev/) | 19.0.0 | UI library |
| **Database ORM** | [Drizzle ORM](https://orm.drizzle.team/) | ^0.38.0 | Type-safe database queries |
| **Mobile** | [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/) | Latest | Cross-platform mobile app |
| **Styling (Mobile)** | [NativeWind](https://www.nativewind.dev/) | Latest | Tailwind CSS for React Native |
| **CLI** | [Go](https://go.dev/) | 1.24.2 | Terminal application |
| **TUI Framework** | [Bubbletea](https://github.com/charmbracelet/bubbletea) | v1.3.10 | Terminal UI framework |
| **TUI Components** | [Bubbles](https://github.com/charmbracelet/bubbles) | v1.0.0 | TUI components |
| **CLI Styling** | [Lipgloss](https://github.com/charmbracelet/lipgloss) | v1.1.0 | Terminal styling |
| **Audio (CLI)** | [beep](https://github.com/gopxl/beep) + [oto](https://github.com/hajimehoshi/oto) | Latest | Embedded audio playback |
| **Audio (Mobile)** | [expo-av](https://docs.expo.dev/versions/latest/sdk/av/) | Latest | Native audio playback |

## Architecture

### Monorepo Structure

```
spoookify/
├── apps/
│   ├── api/      # Next.js REST API (http://localhost:3000)
│   ├── mobile/   # Expo React Native app (iOS/Android)
│   └── cli/      # Go Bubbletea TUI
├── packages/
│   ├── types/    # Shared TypeScript interfaces
│   ├── db/       # Drizzle schema and database utilities
│   └── config/   # Shared configuration files
└── replica/      # Design research and documentation
```

### Data Flow

1. **Mobile/CLI Clients** → HTTP requests to REST API
2. **Next.js API** → Drizzle ORM queries
3. **PostgreSQL Database** → Data persistence
4. **Shared Packages** → Type safety across all TypeScript apps

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0.0
- [pnpm](https://pnpm.io/) >= 12.0.0
- [Go](https://go.dev/) >= 1.23.0
- [PostgreSQL](https://www.postgresql.org/) >= 14 (optional for full functionality)

## Installation

### Easy Installation (Recommended)

Install the prebuilt CLI binary with a single command - no build tools required!

#### Linux & macOS

```bash
curl -fsSL https://raw.githubusercontent.com/MAXxDEVIL/spoookify/main/install.sh | bash
```

#### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/MAXxDEVIL/spoookify/main/install.ps1 | iex
```

**What this does:**
- Downloads the prebuilt binary for your OS and architecture
- Installs to `~/.local/bin` (Linux/macOS) or `%USERPROFILE%\.spoookify\bin` (Windows)
- Makes it executable and adds to PATH
- No compilation or dependencies required

### Manual Installation (From Source)

#### 1. Clone Repository

```bash
git clone https://github.com/yourMAXxDEVIL/spoookify.git
cd spoookify
```

#### 2. Install Dependencies

```bash
pnpm install
```

#### 3. Environment Setup

Create environment files for the API:

```bash
# apps/api/.env.local
DATABASE_URL=postgresql://user:password@localhost:5432/spoookify
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### 4. Database Setup (Optional)

```bash
cd packages/db
# Generate and push migrations
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

## Usage

### Development Mode

Start all services with Turborepo:

```bash
pnpm dev
```

Or start individual services:

```bash
# API only (http://localhost:3000)
cd apps/api && pnpm dev

# CLI only
cd apps/cli && go run ./cmd/spoookify

# Mobile only
cd apps/mobile && npx expo start
```

### Production Build

```bash
# Build all apps
pnpm build

# Build CLI binary
cd apps/cli && go build -o spoookify ./cmd/spoookify
```

## API Reference

Base URL: `http://localhost:3000/api`

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "service": "spoookify-api"
}
```

### Authentication
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

```http
GET /auth/me
```

### Playlists
```http
GET /playlists
POST /playlists
Content-Type: application/json

{
  "name": "My Playlist"
}
```

### Library
```http
GET /library/liked
```

### Search & Browse
```http
GET /search?q=trackname
GET /home
```

## Project Structure

```
spoookify/
├── apps/
│   ├── api/                # Next.js API Server
│   │   ├── app/api/       # API route handlers
│   │   │   ├── auth/      # Authentication routes
│   │   │   ├── playlists/ # Playlist routes
│   │   │   ├── library/   # Library routes
│   │   │   ├── search/    # Search route
│   │   │   ├── home/      # Home route
│   │   │   └── health/    # Health check route
│   │   └── package.json
│   ├── cli/                # Go Terminal Client
│   │   ├── cmd/spoookify/ # Application entrypoint
│   │   ├── internal/      # Internal packages
│   │   ├── go.mod         # Go dependencies
│   │   └── spoookify      # Compiled binary (3.5MB)
│   └── mobile/             # Expo React Native App
├── packages/
│   ├── types/              # Shared TypeScript types
│   │   └── index.ts
│   ├── db/                 # Database schema
│   │   ├── schema.ts      # Drizzle schema definitions
│   │   └── index.ts
│   └── config/             # Shared configurations
├── replica/                # Design & Research Documentation
│   ├── recon.md           # UX reconnaissance
│   ├── features.csv       # Feature matrix
│   ├── architecture.md    # System architecture
│   ├── design/            # Design system (tokens.json, components.md)
│   ├── brand/             # Branding & rebrand documentation
│   ├── test-plan.md       # Testing strategy
│   ├── diff.md            # Parity analysis
│   ├── launch/            # Launch materials
│   └── deploy.md          # Deployment guide
├── docs/
│   └── screenshots/        # Proof of concept screenshots & test results
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## Screenshots & Proof of Concept

### CLI Interface
```text
Spoookify CLI

> Home
  Search
  Library
  Playlists
  Now Playing

Press q to quit
```

### API Health Check
```json
{
  "status": "ok",
  "service": "spoookify-api"
}
```

### Test Results
See [docs/screenshots/test-results.txt](docs/screenshots/test-results.txt) for full test execution proof.

### Build Verification
- ✅ **API**: Next.js production build completed successfully
- ✅ **CLI**: Go binary compiled successfully (3.5MB)
- ✅ **Dependencies**: All packages installed via pnpm workspace

## Testing

Comprehensive testing documentation available in [replica/test-plan.md](replica/test-plan.md).

### Manual API Testing

```bash
# Health check
curl http://localhost:3000/api/health

# User signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}'

# Get liked songs
curl http://localhost:3000/api/library/liked

# Search
curl "http://localhost:3000/api/search?q=test"

# Get playlists
curl http://localhost:3000/api/playlists
```

All endpoints have been tested and return expected responses with placeholder data and proper audio URLs.

## Development

### Available Scripts

```bash
pnpm dev      # Start all apps in development mode
pnpm build    # Build all apps for production
pnpm lint     # Lint all packages
```

### Adding Dependencies

```bash
# Add to API
pnpm add <package> --filter @spoookify/api

# Add to CLI (Go)
cd apps/cli && go get <package>

# Add to shared packages
pnpm add <package> --filter @spoookify/types
```

### Database Schema

The database schema is defined in [packages/db/schema.ts](packages/db/schema.ts) with the following tables:
- `users` - User accounts
- `artists` - Music artists
- `albums` - Music albums
- `tracks` - Individual tracks with audio URLs
- `playlists` - User playlists
- `playlist_tracks` - Playlist-track relationships (with ordering)
- `likes` - User track likes

## Roadmap

- [x] **v0.1.0** - Project scaffolding, API foundation, CLI skeleton
- [ ] **v0.2.0** - Complete API endpoints, database integration
- [ ] **v0.3.0** - Mobile app UI implementation
- [ ] **v0.4.0** - CLI full functionality with player
- [ ] **v0.5.0** - Audio playback integration
- [ ] **v1.0.0** - Production-ready release

See [replica/roadmap items](replica/) for detailed phase tracking.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spotify](https://open.spotify.com) - UX patterns and design inspiration (studied in clean-room manner)
- [Charm](https://charm.sh/) - Incredible TUI libraries (Bubbletea, Bubbles, Lipgloss)
- [Vercel](https://vercel.com/) - Next.js framework
- [Expo](https://expo.dev/) - React Native development platform
- [Drizzle Team](https://orm.drizzle.team/) - Type-safe ORM

---

**Version:** 0.1.0 | **Last Updated:** October 28, 2026 | **Status:** In Development

### Manual Download

Download binaries directly from [bin/](https://github.com/MAXxDEVIL/spoookify/tree/main/bin):
- `spoookify-linux-amd64` / `spoookify-linux-arm64`
- `spoookify-darwin-amd64` / `spoookify-darwin-arm64`
- `spoookify-windows-amd64.exe`

## Version

**Current Version:** 0.1.0


## Mobile App

The Spoookify mobile app is built with Expo and React Native, providing a native mobile experience.

### Download APK (Android)
Download and install the prebuilt APK directly on your Android device:

1. **Download** - Get the latest `spoookify-v0.1.0.apk` from [GitHub Releases](https://github.com/MAXxDEVIL/spoookify/releases)
2. **Allow Installation** - Enable "Install from unknown sources" in your Android settings for your browser/file manager
3. **Install** - Open the downloaded APK and follow the prompts to install
4. **Start API** - On your PC, run `cd apps/api && npx next dev -H 0.0.0.0 -p 3000` (must be on same WiFi network)
5. **Launch** - Open the Spoookify app on your device

### Features
- **Home Tab** - Browse recommended content and playlists
- **Search Tab** - Search for tracks, artists, albums, and playlists
- **Library Tab** - Access your playlists and liked songs
- **Dark Theme** - Spoookify's custom indigo color scheme
- **API Integration** - Connects to the shared Next.js API

### Running in Development (Expo Go)

1. **Start the API server on your network:**
```bash
cd apps/api
npx next dev -H 0.0.0.0 -p 3000
```

2. **Start Expo development server:**
```bash
cd apps/mobile
npx expo start --host lan
```

3. **Connect on your phone:**
- Install [Expo Go](https://expo.dev/go) on your iOS or Android device
- Scan the QR code shown in your terminal
- Make sure your phone and PC are on the same WiFi network

### Build APK Locally
```bash
cd apps/mobile
npx expo prebuild
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### Mobile App Structure
```
apps/mobile/
├── app/
│   ├── (tabs)/           # Tab navigation
│   │   ├── index.tsx     # Home screen
│   │   ├── search.tsx    # Search screen
│   │   └── library.tsx   # Library screen
│   └── _layout.tsx       # Root layout
├── components/           # Reusable UI components
│   ├── TrackRow.tsx
│   ├── PlaylistCard.tsx
│   └── NowPlayingBar.tsx
├── lib/
│   ├── api.ts           # API client
│   └── config.ts        # API configuration (LAN IP)
└── constants/
    └── Colors.ts        # Spoookify color palette
```

### Configuration
The mobile app connects to the API at `http://10.80.159.1:3000` in development mode. Update `lib/config.ts` if your PC's IP address changes.
