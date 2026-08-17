# 🪔 Vijay & Sangeetha — Interactive Digital Invitation Platform

A cinematic, mobile-first wedding invitation experience.

---

## Quick Start (2 terminals)

### Terminal 1 — Client
```bash
cd client
npm install
npm run dev
```
Opens at → **http://localhost:5173**

### Terminal 2 — Server
```bash
cd server
npm install
npm run dev
```
Runs at → **http://localhost:3001**

---

## Guest Invite URLs

| URL | Sees |
|-----|------|
| `http://localhost:5173/i/demo`    | Default greeting |
| `http://localhost:5173/i/anbu`    | "Hi, Anbu ❤" |
| `http://localhost:5173/i/priya`   | "Hi, Priya ❤" |
| `http://localhost:5173/i/ramesh`  | "Hi, Ramesh ❤" |
| `http://localhost:5173/i/kavitha` | "Hi, Kavitha ❤" |
| `http://localhost:5173/i/suresh`  | "Hi, Suresh ❤" |
| `http://localhost:5173/i/ANYNAME` | "Hi, Anyname ❤" |

> Any token not in the database still works — guest name is derived from the URL.

---

## Host Dashboard
```
http://localhost:5173/dashboard
```
- Live guest stats
- RSVP tracking
- Copy invite links
- Add / delete guests

---

## Navigation Controls

| Device | Action | Effect |
|--------|--------|--------|
| Mobile | Swipe left | Next scene |
| Mobile | Swipe right | Previous scene |
| Desktop | Mouse wheel | Scroll between scenes |
| Any | Arrow keys ← → | Previous / Next |
| Any | Nav dots (bottom) | Jump to any scene |
| Any | ▲▼ (side arrows) | Previous / Next |

---

## Scenes

| # | Scene | Features |
|---|-------|---------|
| 1 | Cinematic Opening | Starfield canvas, personalized greeting |
| 2 | Welcome | Live countdown timer to wedding day |
| 3 | Our Families | 4 family members with avatars |
| 4 | Programs | Tap-to-expand timeline |
| 5 | Traditional Card | Tamil + English, ornate design |
| 6 | Food Menu | 6-item wedding feast grid |
| 7 | Gallery | Swipeable photo gallery |
| 8 | Venue | Info grid + Google Maps |
| 9 | RSVP | Full Yes/No flow with guest count |
| 10 | Thank You | Falling petal animation |

---

## Project Structure

```
invite-platform/
├── client/                      ← React + Vite
│   └── src/
│       ├── scenes/              ← S1_Opening … S10_ThankYou
│       ├── components/          ← SceneEngine, NavDots, MusicPlayer
│       ├── hooks/               ← useSwipe, useCountdown
│       ├── context/             ← GuestContext (fetches from API)
│       └── dashboard/           ← Host Dashboard
│
├── server/                      ← Node.js + Express
│   ├── routes/                  ← invite, rsvp, guests, events, dashboard
│   └── db/
│       ├── mockDb.js            ← In-memory store (swap for PostgreSQL)
│       └── schema.sql           ← Ready for Supabase / Railway Postgres
│
└── README.md
```

---

## Adding a New Guest

**Via dashboard UI:**
Open `/dashboard` → type name + relation → click ADD

**Via API:**
```bash
curl -X POST http://localhost:3001/api/guests \
  -H "Content-Type: application/json" \
  -d '{"name":"Meena","relation":"Aunt"}'
```
Returns the invite token and link.

---

## Connecting PostgreSQL (Production)

1. Set `DATABASE_URL` in `server/.env`
2. Run `server/db/schema.sql` on your database
3. In `server/db/mockDb.js`, replace each function body with `pool.query(...)` calls

---

## Deploy

| Part | Platform | Notes |
|------|----------|-------|
| Client | Vercel | `vercel --prod` from `/client` |
| Server | Railway | Set root to `/server`, add env vars |
| DB | Supabase | Free tier, run schema.sql |

---

## Mobile Testing

```bash
# Find your local IP
ipconfig   # Windows
ifconfig   # Mac/Linux

# Open on phone (same WiFi):
http://192.168.x.x:5173/i/anbu
```
