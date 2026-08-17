/**
 * In-memory store — replace each function with real DB queries
 * when connecting PostgreSQL / Supabase.
 *
 * Pattern:  module.exports = { getGuest, saveRsvp, ... }
 * Swap the bodies for:  return await pool.query('SELECT ...', [...])
 */

const { v4: uuid } = require('uuid')

// ── Seed event ──────────────────────────────────────────────────────────────
const EVENT = {
  id: 'evt-001',
  groomName:    'Vijay',
  brideName:    'Sangeetha',
  date:         '25 December 2026',
  dateISO:      '2026-12-25T09:30:00',
  venue:        'Sri Lakshmi Mahal',
  venueAddress: 'Anna Salai, T. Nagar, Chennai — 600 002',
  venueMaps:    'https://maps.google.com/?q=Sri+Lakshmi+Mahal+T+Nagar+Chennai',
  families: [
    { name: 'Murugesan', role: "Groom's Father", emoji: '👴' },
    { name: 'Vasantha',  role: "Groom's Mother", emoji: '👵' },
    { name: 'Ramasamy',  role: "Bride's Father",  emoji: '👴' },
    { name: 'Kamala',    role: "Bride's Mother",   emoji: '👵' },
  ],
  programs: [
    { event: 'Engagement',       date: '20 Dec 2026', time: '6:00 PM', venue: 'Sri Lakshmi Mahal', desc: 'An intimate celebration of love and promise. Family and close friends welcome.' },
    { event: 'Mehendi Night',    date: '23 Dec 2026', time: '5:00 PM', venue: 'Sri Lakshmi Mahal', desc: 'A vibrant evening of music, henna, and celebration.' },
    { event: 'Wedding Ceremony', date: '25 Dec 2026', time: '9:30 AM', venue: 'Sri Lakshmi Mahal', desc: 'Traditional Tamil Brahmin wedding with Vedic rituals. Breakfast from 8:00 AM.' },
    { event: 'Reception',        date: '25 Dec 2026', time: '7:00 PM', venue: 'Sri Lakshmi Mahal', desc: 'Grand evening reception with dinner, music, and celebrations.' },
  ],
  menu: [
    { icon: '🥤', name: 'Welcome Drink',      desc: 'Rose Sherbat & Fresh Juices' },
    { icon: '🥗', name: 'Starters',           desc: 'Veg & Non-Veg Starters' },
    { icon: '🍛', name: 'Main Course',        desc: 'Sadhya with 30+ items' },
    { icon: '🍮', name: 'Traditional Sweets', desc: 'Payasam, Halwa & Laddoo' },
    { icon: '🍨', name: 'Desserts',           desc: 'Live Ice Cream Station' },
    { icon: '🌙', name: 'Dinner',             desc: 'Grand reception dinner spread' },
  ],
  gallery: [
    { emoji: '👰🤵', label: 'The Couple · Pre-Wedding', bg: 'linear-gradient(135deg,#2a1005,#1a0a03)' },
    { emoji: '🌸',   label: 'Mehendi Evening · December', bg: 'linear-gradient(135deg,#0a1a05,#031a0a)' },
    { emoji: '🪔',   label: 'Engagement Ceremony',        bg: 'linear-gradient(135deg,#1a0a1a,#0d030d)' },
    { emoji: '💐',   label: 'Family Portrait',             bg: 'linear-gradient(135deg,#1a1505,#0d0e03)' },
  ]
}

// ── Seed guests ──────────────────────────────────────────────────────────────
let GUESTS = [
  { id: uuid(), token: 'anbu',    name: 'Anbu',    relation: 'Friend',  eventId: 'evt-001', opened: false, openedAt: null, rsvp: 'pending', adults: 0, children: 0, respondedAt: null },
  { id: uuid(), token: 'priya',   name: 'Priya',   relation: 'Cousin',  eventId: 'evt-001', opened: false, openedAt: null, rsvp: 'pending', adults: 0, children: 0, respondedAt: null },
  { id: uuid(), token: 'ramesh',  name: 'Ramesh',  relation: 'Friend',  eventId: 'evt-001', opened: false, openedAt: null, rsvp: 'pending', adults: 0, children: 0, respondedAt: null },
  { id: uuid(), token: 'kavitha', name: 'Kavitha', relation: 'Sister',  eventId: 'evt-001', opened: false, openedAt: null, rsvp: 'pending', adults: 0, children: 0, respondedAt: null },
  { id: uuid(), token: 'suresh',  name: 'Suresh',  relation: 'Brother', eventId: 'evt-001', opened: false, openedAt: null, rsvp: 'pending', adults: 0, children: 0, respondedAt: null },
  { id: uuid(), token: 'demo',    name: 'Dear Guest', relation: 'Guest', eventId: 'evt-001', opened: false, openedAt: null, rsvp: 'pending', adults: 0, children: 0, respondedAt: null },
]

// ── API ───────────────────────────────────────────────────────────────────────
function getGuestByToken(token) {
  return GUESTS.find(g => g.token.toLowerCase() === token.toLowerCase())
}

function markOpened(token) {
  const g = getGuestByToken(token)
  if (g && !g.opened) { g.opened = true; g.openedAt = new Date().toISOString() }
}

function saveRsvp(token, { status, adults, children }) {
  const g = getGuestByToken(token)
  if (!g) return null
  g.rsvp = status
  g.adults = adults || 0
  g.children = children || 0
  g.respondedAt = new Date().toISOString()
  return g
}

function getAllGuests(eventId) {
  return GUESTS.filter(g => g.eventId === eventId)
}

function addGuest({ name, relation, eventId }) {
  const token = name.toLowerCase().replace(/\s+/g, '') + '-' + Math.random().toString(36).slice(2, 6)
  const guest = { id: uuid(), token, name, relation: relation || 'Guest', eventId, opened: false, openedAt: null, rsvp: 'pending', adults: 0, children: 0, respondedAt: null }
  GUESTS.push(guest)
  return guest
}

function deleteGuest(id) {
  GUESTS = GUESTS.filter(g => g.id !== id)
}

function getEvent(id) {
  if (id === 'evt-001' || !id) return EVENT
  return null
}

module.exports = { getGuestByToken, markOpened, saveRsvp, getAllGuests, addGuest, deleteGuest, getEvent, EVENT }
