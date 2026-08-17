import React, { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const GuestContext = createContext(null)

const MOCK_EVENT = {
  groomName: 'Vijay',
  brideName: 'Sangeetha',
  date: '25 December 2026',
  dateISO: '2026-12-25T09:30:00',
  venue: 'Sri Lakshmi Mahal',
  venueAddress: 'Anna Salai, T. Nagar, Chennai — 600 002',
  venueMaps: 'https://maps.google.com/?q=Sri+Lakshmi+Mahal+T+Nagar+Chennai',
  families: [
    { name: 'Murugesan', role: "Groom's Father", emoji: '👴' },
    { name: 'Vasantha',  role: "Groom's Mother", emoji: '👵' },
    { name: 'Ramasamy',  role: "Bride's Father",  emoji: '👴' },
    { name: 'Kamala',    role: "Bride's Mother",   emoji: '👵' },
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
    { emoji: '👰🤵', label: 'The Couple · Pre-Wedding', bg: 'linear-gradient(135deg,#2a1005,#1a0a03)' },
    { emoji: '🌸',   label: 'Mehendi Evening',          bg: 'linear-gradient(135deg,#0a1a05,#031a0a)' },
    { emoji: '🪔',   label: 'Engagement Ceremony',      bg: 'linear-gradient(135deg,#1a0a1a,#0d030d)' },
    { emoji: '💐',   label: 'Family Portrait',           bg: 'linear-gradient(135deg,#1a1505,#0d0e03)' },
  ]
}

const MOCK_GUESTS = {
  demo:    'Dear Guest',
  anbu:    'Anbu',
  priya:   'Priya',
  ramesh:  'Ramesh',
  kavitha: 'Kavitha',
  suresh:  'Suresh',
  lakshmi: 'Lakshmi',
}

function capitalize(s) {
  if (!s) return 'Guest'
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export function GuestProvider({ children }) {
  const { token } = useParams()
  const [guest, setGuest] = useState(null)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      // Always start with mock data immediately so UI never waits
      const mockName = MOCK_GUESTS[token?.toLowerCase()] || capitalize(token)
      const mockGuest = { name: mockName, token }

      try {
        const res = await fetch(`/api/invite/${token}`, { signal: AbortSignal.timeout(3000) })
        if (!res.ok) throw new Error('not found')
        const data = await res.json()
        if (!cancelled) {
          setGuest(data.guest || mockGuest)
          setEvent(data.event || MOCK_EVENT)
        }
      } catch {
        // Server not running — use mock
        if (!cancelled) {
          setGuest(mockGuest)
          setEvent(MOCK_EVENT)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [token])

  return (
    <GuestContext.Provider value={{ guest, event, token, loading }}>
      {children}
    </GuestContext.Provider>
  )
}

export function useGuest() {
  return useContext(GuestContext)
}
