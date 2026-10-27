import { pgTable, uuid, varchar, text, timestamp, boolean, integer, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const artists = pgTable('artists', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const albums = pgTable('albums', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  artistId: uuid('artist_id').references(() => artists.id, { onDelete: 'cascade' }),
  releaseDate: timestamp('release_date'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const tracks = pgTable('tracks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  artistId: uuid('artist_id').references(() => artists.id, { onDelete: 'cascade' }),
  albumId: uuid('album_id').references(() => albums.id, { onDelete: 'set null' }),
  durationMs: integer('duration_ms').notNull(),
  audioUrl: text('audio_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const playlists = pgTable('playlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const playlistTracks = pgTable('playlist_tracks', {
  id: uuid('id').primaryKey().defaultRandom(),
  playlistId: uuid('playlist_id').references(() => playlists.id, { onDelete: 'cascade' }).notNull(),
  trackId: uuid('track_id').references(() => tracks.id, { onDelete: 'cascade' }).notNull(),
  position: integer('position').notNull(),
  addedAt: timestamp('added_at', { withTimezone: true }).defaultNow(),
}, (t) => ({
  unq: unique().on(t.playlistId, t.trackId),
}));

export const likes = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  trackId: uuid('track_id').references(() => tracks.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (t) => ({
  unq: unique().on(t.userId, t.trackId),
}));

export const usersRelations = relations(users, ({ many }) => ({
  playlists: many(playlists),
  likes: many(likes),
}));

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  user: one(users, { fields: [playlists.userId], references: [users.id] }),
  tracks: many(playlistTracks),
}));

export const playlistTracksRelations = relations(playlistTracks, ({ one }) => ({
  playlist: one(playlists, { fields: [playlistTracks.playlistId], references: [playlists.id] }),
  track: one(tracks, { fields: [playlistTracks.trackId], references: [tracks.id] }),
}));
