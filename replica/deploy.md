# Spoookify - Deployment Guide

## Prerequisites
- Node.js 20+
- pnpm
- Go 1.23+
- PostgreSQL (optional for full DB)

## Development Setup

### 1. Install dependencies
```bash
pnpm install
```

### 2. Start API
```bash
cd apps/api
pnpm dev
# API runs on http://localhost:3000
```

### 3. Run CLI
```bash
cd apps/cli
go run ./cmd/spoookify
# Or use compiled binary: ./spoookify
```

### 4. Mobile (Expo)
```bash
cd apps/mobile
npx expo start
```

## Environment Variables
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/spoookify
NEXTAUTH_SECRET=your-secret
API_URL=http://localhost:3000
```

## Production
- API: Deploy to Vercel/Railway
- CLI: Build binary `go build -o spoookify ./cmd/spoookify`
- Mobile: Build with EAS
