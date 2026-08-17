-- ============================================================
-- Invite Platform — PostgreSQL Schema
-- Run once on your Supabase / Railway Postgres instance
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Events
CREATE TABLE IF NOT EXISTS events (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          VARCHAR(100) UNIQUE,
  type          VARCHAR(50) DEFAULT 'wedding',
  groom_name    VARCHAR(100) NOT NULL,
  bride_name    VARCHAR(100) NOT NULL,
  date          VARCHAR(50),
  date_iso      TIMESTAMP,
  venue         VARCHAR(200),
  venue_address TEXT,
  venue_maps    TEXT,
  data          JSONB,          -- programs, menu, gallery, families
  theme         VARCHAR(50) DEFAULT 'royal-indian',
  published     BOOLEAN DEFAULT false,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Guests
CREATE TABLE IF NOT EXISTS guests (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id      UUID REFERENCES events(id) ON DELETE CASCADE,
  name          VARCHAR(100) NOT NULL,
  relation      VARCHAR(100),
  token         VARCHAR(80) UNIQUE NOT NULL,
  opened        BOOLEAN DEFAULT false,
  opened_at     TIMESTAMP,
  rsvp          VARCHAR(20) DEFAULT 'pending',  -- pending | yes | no
  adults        INT DEFAULT 0,
  children      INT DEFAULT 0,
  responded_at  TIMESTAMP,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- RSVP log (audit trail)
CREATE TABLE IF NOT EXISTS rsvp_log (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id      UUID REFERENCES guests(id) ON DELETE CASCADE,
  status        VARCHAR(20),
  adults        INT,
  children      INT,
  ip_address    VARCHAR(60),
  submitted_at  TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_guests_token    ON guests(token);
CREATE INDEX IF NOT EXISTS idx_guests_event_id ON guests(event_id);
CREATE INDEX IF NOT EXISTS idx_guests_rsvp     ON guests(rsvp);
