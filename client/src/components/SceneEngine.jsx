import React, { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'
import { useSwipe } from '../hooks/useSwipe'

import S1_Opening     from '../scenes/S1_Opening'
import S2_Welcome     from '../scenes/S2_Welcome'
import S3_Families    from '../scenes/S3_Families'
import S4_Programs    from '../scenes/S4_Programs'
import S5_Traditional from '../scenes/S5_Traditional'
import S6_FoodMenu    from '../scenes/S6_FoodMenu'
import S7_Gallery     from '../scenes/S7_Gallery'
import S8_Venue       from '../scenes/S8_Venue'
import S9_RSVP        from '../scenes/S9_RSVP'
import S10_ThankYou   from '../scenes/S10_ThankYou'
import NavDots        from './NavDots'
import MusicPlayer    from './MusicPlayer'
import Dashboard      from '../dashboard/Dashboard'

const SCENES = [
  S1_Opening, S2_Welcome, S3_Families, S4_Programs, S5_Traditional,
  S6_FoodMenu, S7_Gallery, S8_Venue, S9_RSVP, S10_ThankYou,
]

const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

const slideTransition = {
  x: { type: 'spring', stiffness: 280, damping: 30 },
  opacity: { duration: 0.2 },
}

export default function SceneEngine() {
  const { loading } = useGuest()
  const [current, setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const [dashOpen, setDashOpen] = useState(false)
  const wheelTimer = useRef(null)

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= SCENES.length) return
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useSwipe({ onNext: next, onPrev: prev })

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (dashOpen) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, dashOpen])

  // Mouse wheel navigation
  useEffect(() => {
    const handler = (e) => {
      if (dashOpen) return
      clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => {
        if (e.deltaY > 30)       next()
        else if (e.deltaY < -30) prev()
      }, 60)
    }
    window.addEventListener('wheel', handler, { passive: true })
    return () => window.removeEventListener('wheel', handler)
  }, [next, prev, dashOpen])

  if (loading) return <LoadingScreen />

  const SceneComponent = SCENES[current]

  return (
    <>
      {/* ── Invitation view ── */}
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ position: 'absolute', inset: 0, willChange: 'transform' }}
          >
            <SceneComponent onNext={next} onPrev={prev} goTo={goTo} />
          </motion.div>
        </AnimatePresence>

        <NavDots total={SCENES.length} current={current} goTo={goTo} />
        <MusicPlayer />

        {/* HOST button */}
        <button
          onClick={() => setDashOpen(true)}
          style={{
            position: 'fixed', top: '1rem', left: '1rem', zIndex: 200,
            background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(201,146,42,0.3)',
            boxShadow: '0 4px 12px rgba(44,74,40,0.12)',
            color: '#3d6b38', padding: '0.4rem 0.85rem', borderRadius: '50px',
            fontSize: '0.62rem', letterSpacing: '2px', cursor: 'pointer',
            fontFamily: "'Cinzel',serif",
          }}
        >
          ⊞ HOST
        </button>
      </div>

      {/* ── Dashboard overlay — rendered outside the clipped container ── */}
      {dashOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Dashboard onClose={() => setDashOpen(false)} />
        </div>
      )}
    </>
  )
}

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'radial-gradient(ellipse at 50% 40%, #1c1106 0%, #0a0602 50%, #020100 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '1.8rem',
    }}>
      <div style={{
        fontFamily: "'Cinzel Decorative',serif", fontWeight: 700,
        fontSize: 'clamp(0.9rem,3vw,1.2rem)', letterSpacing: '4px',
        background: 'linear-gradient(180deg,#f9f0d0,#d4a843)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        filter: 'drop-shadow(0 0 12px rgba(212,168,67,0.4))',
      }}>
        VIJAY ❤ SANGEETHA
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7,
            background: 'linear-gradient(135deg,#f9f0d0,#d4a843)',
            transform: 'rotate(45deg)',
            animation: `ldpulse 1.4s ${i * 0.22}s ease-in-out infinite`,
          }} />
        ))}
      </div>
      <style>{`
        @keyframes ldpulse {
          0%, 100% { opacity: 0.2; transform: rotate(45deg) scale(0.7); }
          50%       { opacity: 1;   transform: rotate(45deg) scale(1); box-shadow: 0 0 8px rgba(212,168,67,0.6); }
        }
      `}</style>
    </div>
  )
}
