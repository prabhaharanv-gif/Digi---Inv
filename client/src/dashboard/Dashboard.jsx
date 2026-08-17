import React, { useState, useEffect } from 'react'

const MOCK_DATA = {
  event: {
    groomName: 'Vijay',
    brideName: 'Sangeetha',
    date: '25 December 2026',
    venue: 'Sri Lakshmi Mahal',
  },
  guests: [
    { id: '1', token: 'anbu',    name: 'Anbu',    relation: 'Friend',  opened: true,  rsvp: 'yes',     adults: 2, children: 0 },
    { id: '2', token: 'priya',   name: 'Priya',   relation: 'Cousin',  opened: true,  rsvp: 'yes',     adults: 2, children: 2 },
    { id: '3', token: 'ramesh',  name: 'Ramesh',  relation: 'Friend',  opened: true,  rsvp: 'no',      adults: 0, children: 0 },
    { id: '4', token: 'kavitha', name: 'Kavitha', relation: 'Sister',  opened: false, rsvp: 'pending', adults: 0, children: 0 },
    { id: '5', token: 'suresh',  name: 'Suresh',  relation: 'Brother', opened: true,  rsvp: 'pending', adults: 0, children: 0 },
  ],
}

export default function Dashboard({ onClose }) {
  const [guests, setGuests]   = useState(MOCK_DATA.guests)
  const [event]               = useState(MOCK_DATA.event)
  const [newName, setNewName] = useState('')
  const [newRel, setNewRel]   = useState('')
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')

  // Try loading from server
  useEffect(() => {
    fetch('/api/dashboard/evt-001')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => { if (d.guests) setGuests(d.guests) })
      .catch(() => {})
  }, [])

  const confirmed = guests.filter(g => g.rsvp === 'yes')
  const stats = {
    total:     guests.length,
    opened:    guests.filter(g => g.opened).length,
    confirmed: confirmed.length,
    declined:  guests.filter(g => g.rsvp === 'no').length,
    adults:    confirmed.reduce((s, g) => s + (g.adults || 0), 0),
    children:  confirmed.reduce((s, g) => s + (g.children || 0), 0),
  }

  const filtered = guests
    .filter(g => filter === 'all' || g.rsvp === filter)
    .filter(g => !search || g.name.toLowerCase().includes(search.toLowerCase()))

  function addGuest() {
    if (!newName.trim()) return
    const token = newName.toLowerCase().replace(/\s+/g, '') + Math.random().toString(36).slice(2, 6)
    const newG = { id: String(Date.now()), token, name: newName.trim(), relation: newRel.trim() || 'Guest', opened: false, rsvp: 'pending', adults: 0, children: 0 }
    setGuests(prev => [...prev, newG])
    setNewName(''); setNewRel('')
  }

  function deleteGuest(id) {
    setGuests(prev => prev.filter(g => g.id !== id))
  }

  function copyLink(g) {
    const url = `${window.location.origin}/i/${g.token}`
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied!\n' + url))
      .catch(() => prompt('Copy this link:', url))
  }

  // Styles
  const gold   = '#c9a84c'
  const dark   = '#2d1f0a'
  const mid    = '#5a3e1b'
  const cream  = '#faf6ee'

  function badgeStyle(status) {
    const map = {
      yes:     { background: '#d4edda', color: '#155724' },
      no:      { background: '#f8d7da', color: '#721c24' },
      pending: { background: '#e2e3e5', color: '#383d41' },
      opened:  { background: 'rgba(201,168,76,0.18)', color: '#7a5800' },
    }
    return {
      display: 'inline-block', fontSize: '0.6rem', letterSpacing: '0.5px',
      padding: '0.2rem 0.55rem', borderRadius: '50px',
      ...(map[status] || map.pending),
    }
  }

  return (
    <div style={{ background: cream, minHeight: '100vh', fontFamily: "'Lato',sans-serif" }}>

      {/* Sticky header */}
      <div style={{
        background: '#1a1209', padding: '0.9rem 1.2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ fontFamily: "'Cinzel',serif", color: gold, letterSpacing: '3px', fontSize: 'clamp(0.7rem,2.5vw,0.9rem)' }}>
          {event.groomName.toUpperCase()} ❤ {event.brideName.toUpperCase()}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent', border: `1px solid rgba(201,168,76,0.35)`,
            color: gold, padding: '0.35rem 0.9rem', borderRadius: '50px',
            fontSize: '0.68rem', letterSpacing: '1px', cursor: 'pointer',
            fontFamily: "'Cinzel',serif",
          }}
        >
          ← Invite
        </button>
      </div>

      <div style={{ padding: '1.2rem', maxWidth: 680, margin: '0 auto' }}>

        {/* Event banner */}
        <div style={{
          background: '#2d1f0a', borderRadius: 8, padding: '0.9rem 1.2rem',
          marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", color: gold, fontSize: '0.85rem', letterSpacing: '2px' }}>WEDDING</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: '0.2rem' }}>{event.date} · {event.venue}</div>
          </div>
          <div style={{ background: 'rgba(201,168,76,0.2)', color: gold, fontSize: '0.55rem', letterSpacing: '2px', padding: '0.25rem 0.6rem', borderRadius: '50px', fontFamily: "'Cinzel',serif" }}>
            LIVE
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.6rem', marginBottom: '1.4rem' }}>
          {[
            ['INVITED',   stats.total],
            ['OPENED',    stats.opened],
            ['CONFIRMED', stats.confirmed],
            ['DECLINED',  stats.declined],
            ['ADULTS',    stats.adults],
            ['EXPECTED',  stats.adults + stats.children],
          ].map(([label, val]) => (
            <div key={label} style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, padding: '0.8rem 0.5rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(1.2rem,4vw,1.6rem)', color: dark }}>{val}</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: '0.48rem', letterSpacing: '1.5px', color: gold, marginTop: '0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Section heading */}
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: '0.62rem', letterSpacing: '3px', color: dark, marginBottom: '0.8rem', paddingBottom: '0.5rem', borderBottom: `1px solid rgba(201,168,76,0.25)` }}>
          GUEST LIST
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
          <input
            style={{ flex: 1, minWidth: 120, padding: '0.55rem 0.75rem', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 6, fontSize: '0.83rem', background: '#fff', color: dark, outline: 'none', fontFamily: "'Lato',sans-serif" }}
            placeholder="Search guests…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {[['all','ALL'],['yes','GOING'],['no','DECLINED'],['pending','PENDING']].map(([f, l]) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '0.45rem 0.75rem', borderRadius: '50px', fontSize: '0.58rem',
              letterSpacing: '1px', cursor: 'pointer', fontFamily: "'Cinzel',serif",
              background: filter === f ? dark : 'transparent',
              color: filter === f ? gold : mid,
              border: filter === f ? `1px solid ${dark}` : '1px solid rgba(201,168,76,0.3)',
            }}>
              {l}
            </button>
          ))}
        </div>

        {/* Guest table */}
        <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid rgba(201,168,76,0.15)', background: '#fff', marginBottom: '1.2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 440 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.05)' }}>
                {['NAME','RELATION','OPENED','RSVP','A+C','LINK',''].map(h => (
                  <th key={h} style={{ fontFamily: "'Cinzel',serif", fontSize: '0.52rem', letterSpacing: '1.5px', color: gold, padding: '0.55rem 0.5rem', textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(g => (
                <tr key={g.id} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '0.6rem 0.5rem', fontWeight: 700, fontSize: '0.8rem', color: dark, whiteSpace: 'nowrap' }}>{g.name}</td>
                  <td style={{ padding: '0.6rem 0.5rem', fontSize: '0.76rem', color: mid }}>{g.relation}</td>
                  <td style={{ padding: '0.6rem 0.5rem' }}><span style={badgeStyle(g.opened ? 'opened' : 'pending')}>{g.opened ? '✓ Yes' : '—'}</span></td>
                  <td style={{ padding: '0.6rem 0.5rem' }}><span style={badgeStyle(g.rsvp)}>{g.rsvp === 'yes' ? 'Going' : g.rsvp === 'no' ? 'No' : 'Pending'}</span></td>
                  <td style={{ padding: '0.6rem 0.5rem', fontSize: '0.76rem', color: dark, textAlign: 'center' }}>{g.rsvp === 'yes' ? `${g.adults}+${g.children}` : '—'}</td>
                  <td style={{ padding: '0.6rem 0.5rem', fontSize: '0.62rem', color: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    onClick={() => copyLink(g)} title="Click to copy">
                    /i/{g.token}
                  </td>
                  <td style={{ padding: '0.6rem 0.4rem', whiteSpace: 'nowrap' }}>
                    <button onClick={() => copyLink(g)} title="Copy link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: '0 3px' }}>📋</button>
                    <button onClick={() => deleteGuest(g.id)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: '0 3px' }}>🗑</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '1.5rem', textAlign: 'center', color: '#aaa', fontSize: '0.82rem' }}>No guests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add guest */}
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: '0.62rem', letterSpacing: '2px', color: dark, marginBottom: '0.6rem' }}>
          ADD GUEST
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            style={{ flex: 2, minWidth: 120, padding: '0.55rem 0.75rem', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 6, fontSize: '0.83rem', background: '#fff', color: dark, outline: 'none', fontFamily: "'Lato',sans-serif" }}
            placeholder="Guest name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGuest()}
          />
          <input
            style={{ flex: 1, minWidth: 80, padding: '0.55rem 0.75rem', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 6, fontSize: '0.83rem', background: '#fff', color: dark, outline: 'none', fontFamily: "'Lato',sans-serif" }}
            placeholder="Relation"
            value={newRel}
            onChange={e => setNewRel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGuest()}
          />
          <button onClick={addGuest} style={{ padding: '0.55rem 1.1rem', background: dark, color: gold, border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: "'Cinzel',serif", fontSize: '0.62rem', letterSpacing: '2px' }}>
            ADD
          </button>
        </div>

        <div style={{ height: '2.5rem' }} />
      </div>
    </div>
  )
}
