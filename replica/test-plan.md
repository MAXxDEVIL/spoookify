# Spoookify Test Plan

## API Tests
- [ ] GET /api/health returns {status: 'ok'}
- [ ] POST /api/auth/signup with email/password returns user
- [ ] POST /api/auth/login returns user
- [ ] GET /api/auth/me returns null or user
- [ ] GET /api/playlists returns playlists array
- [ ] POST /api/playlists creates playlist
- [ ] GET /api/library/liked returns tracks with audioUrl
- [ ] GET /api/search?q=test returns results
- [ ] GET /api/home returns content

## CLI Tests
- [ ] CLI binary runs and shows menu
- [ ] Navigation with arrows/j/k works
- [ ] Quit with q/ctrl+c works

## Integration Tests
- [ ] API serves placeholder audio URLs
- [ ] All core features from features.csv are implemented
