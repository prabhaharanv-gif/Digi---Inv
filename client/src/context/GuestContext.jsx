import React, { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const GuestContext = createContext(null)

/* ── Media store: persists base64 data URIs in sessionStorage ────────────
   We use base64 (not objectURL) so the URL survives React re-renders and
   component remounts without going stale.
─────────────────────────────────────────────────────────────────────────── */
function getMedia() {
  try { return JSON.parse(sessionStorage.getItem('weddingMedia') || '{}') } catch { return {} }
}
function saveMedia(data) {
  try { sessionStorage.setItem('weddingMedia', JSON.stringify(data)) } catch (e) {
    // If sessionStorage is full (large video), just keep in memory
    console.warn('sessionStorage quota exceeded, media will not persist across refresh', e)
  }
}

const MOCK_EVENT = {
  groomName: 'Vijay', brideName: 'Sangeetha',
  date: '25 December 2026', dateISO: '2026-12-25T09:30:00',
  venue: 'Sri Lakshmi Mahal', venueAddress: 'Anna Salai, T. Nagar, Chennai — 600 002',
  venueMaps: 'https://maps.google.com/?q=Sri+Lakshmi+Mahal+T+Nagar+Chennai',
  families: [
    { name: 'Murugesan', role: "Groom's Father" },
    { name: 'Vasantha',  role: "Groom's Mother" },
    { name: 'Ramasamy',  role: "Bride's Father"  },
    { name: 'Kamala',    role: "Bride's Mother"   },
  ],
  programs: [
    { event: 'Engagement',       date: '20 Dec 2026', time: '6:00 PM', venue: 'Sri Lakshmi Mahal', desc: 'An intimate celebration of love and promise.' },
    { event: 'Mehendi Night',    date: '23 Dec 2026', time: '5:00 PM', venue: 'Sri Lakshmi Mahal', desc: 'A vibrant evening of music, henna, and celebration.' },
    { event: 'Wedding Ceremony', date: '25 Dec 2026', time: '9:30 AM', venue: 'Sri Lakshmi Mahal', desc: 'Traditional Tamil Brahmin wedding. Breakfast from 8:00 AM.' },
    { event: 'Reception',        date: '25 Dec 2026', time: '7:00 PM', venue: 'Sri Lakshmi Mahal', desc: 'Grand evening reception with dinner and celebrations.' },
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
    { label: 'The Couple · Pre-Wedding', bg: 'linear-gradient(135deg,#2a1005,#1a0a03)' },
    { label: 'Mehendi Evening',          bg: 'linear-gradient(135deg,#0a1a05,#031a0a)' },
    { label: 'Engagement Ceremony',      bg: 'linear-gradient(135deg,#1a0a1a,#0d030d)' },
    { label: 'Family Portrait',          bg: 'linear-gradient(135deg,#1a1505,#0d0e03)' },
  ]
}

const MOCK_GUESTS = {
  demo: 'Dear Guest', anbu: 'Anbu', priya: 'Priya',
  ramesh: 'Ramesh', kavitha: 'Kavitha', suresh: 'Suresh', lakshmi: 'Lakshmi',
}

function capitalize(s) {
  if (!s) return 'Guest'
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export function GuestProvider({ children }) {
  const { token } = useParams()
  const [guest,   setGuest]   = useState(null)
  const [event,   setEvent]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [mediaConfig, setMediaConfigState] = useState(getMedia)

  /* Listen for media updates fired by Dashboard in same tab */
  useEffect(() => {
    const handler = () => setMediaConfigState(getMedia())
    window.addEventListener('weddingMediaUpdate', handler)
    return () => window.removeEventListener('weddingMediaUpdate', handler)
  }, [])

  function updateMedia(updates) {
    const next = { ...getMedia(), ...updates }
    saveMedia(next)
    setMediaConfigState(next)
    window.dispatchEvent(new Event('weddingMediaUpdate'))
  }

  useEffect(() => {
    let cancelled = false
    async function load() {
      const mockName  = MOCK_GUESTS[token?.toLowerCase()] || capitalize(token)
      const mockGuest = { name: mockName, token }
      try {
        const res  = await fetch(`/api/invite/${token}`, { signal: AbortSignal.timeout(3000) })
        if (!res.ok) throw new Error('not found')
        const data = await res.json()
        if (!cancelled) {
          setGuest(data.guest || mockGuest)
          setEvent(data.event || MOCK_EVENT)
        }
      } catch {
        if (!cancelled) { setGuest(mockGuest); setEvent(MOCK_EVENT) }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [token])

  return (
    <GuestContext.Provider value={{ guest, event, token, loading, mediaConfig, updateMedia }}>
      {children}
    </GuestContext.Provider>
  )
}

export function useGuest() { return useContext(GuestContext) }
