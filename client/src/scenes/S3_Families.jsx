import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

/* ── Floating gold petals ──────────────────────────────────────────────── */
const PETAL_DATA = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x:    Math.random() * 100,
  drift: (Math.random() - 0.5) * 18,
  delay: Math.random() * 5,
  dur:   4.5 + Math.random() * 3.5,
  size:  5 + Math.random() * 7,
  color: ['#d4a843','#c9922a','#f9f0d0','#8b6508','#e8c870','#b8860b'][i % 6],
}))

function FloatingPetals() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:3 }}>
      {PETAL_DATA.map(p => (
        <motion.div
          key={p.id}
          animate={{
            y: ['-5%', '108%'],
            x: [`${p.x}%`, `${p.x + p.drift}%`],
            rotate: [0, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: p.size, height: p.size,
            borderRadius: '50% 20% 50% 20%',
            background: p.color, opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

/* ── Corner kolam motif ────────────────────────────────────────────────── */
function Corner({ flip }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
      style={{
        position: 'absolute',
        top:    flip?.includes('y') ? 'auto' : 6,
        bottom: flip?.includes('y') ? 6 : 'auto',
        left:   flip?.includes('x') ? 'auto' : 6,
        right:  flip?.includes('x') ? 6 : 'auto',
        opacity: 0.55,
        transform: `scale(${flip?.includes('x') ? -1 : 1},${flip?.includes('y') ? -1 : 1})`,
      }}>
      <path d="M3 3 L3 12 M3 3 L12 3" stroke="#d4a843" strokeWidth="1.5"/>
      <circle cx="3" cy="3" r="2" fill="#d4a843" opacity=".5"/>
      <path d="M3 8 Q8 3 13 3" stroke="#d4a843" strokeWidth=".7" fill="none" opacity=".4"/>
    </svg>
  )
}

/* ── Main video player — 9:16 portrait ─────────────────────────────────── */
function VideoPlayer({ url, autoPlay }) {
  const vidRef  = useRef(null)
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted,    setMuted]    = useState(true)   // start muted so autoplay works on all browsers
  const [errored,  setErrored]  = useState(false)

  /* Auto-play when this component mounts (scene swiped in) */
  useEffect(() => {
    const v = vidRef.current
    if (!v) return

    const onTime  = () => setProgress(v.duration ? v.currentTime / v.duration : 0)
    const onEnded = () => { setPlaying(false); setProgress(0) }
    const onErr   = () => setErrored(true)

    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnded)
    v.addEventListener('error', onErr)

    if (autoPlay) {
      v.muted = true
      v.play()
        .then(() => { setPlaying(true); setMuted(true) })
        .catch(() => {})
    }

    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnded)
      v.removeEventListener('error', onErr)
      v.pause()
    }
  }, [url, autoPlay])

  function togglePlay() {
    const v = vidRef.current; if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else         { v.play().catch(()=>{}); setPlaying(true) }
  }

  function toggleMute() {
    const v = vidRef.current; if (!v) return
    v.muted = !v.muted; setMuted(v.muted)
  }

  function seek(e) {
    const v = vidRef.current; if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct  = (e.clientX - rect.left) / rect.width
    v.currentTime = pct * v.duration
  }

  if (errored) {
    return (
      <div style={{ aspectRatio:'9/16', borderRadius:16, background:'#0a0602',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap:'0.6rem', color:'rgba(249,240,208,0.5)' }}>
        <div style={{ fontSize:'2rem' }}>⚠️</div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.55rem', letterSpacing:'3px', textAlign:'center' }}>
          VIDEO UNAVAILABLE
        </div>
        <div style={{ fontFamily:"'Lato',sans-serif", fontSize:'0.6rem', textAlign:'center',
          maxWidth:'70%', opacity:0.6 }}>
          Please re-upload the video from the Host panel
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'relative',
      /* 9:16 portrait ratio */
      width: '100%',
      maxWidth: 'min(54vh, 88%)',   /* cap width so tall phones don't overflow */
      margin: '0 auto',
      aspectRatio: '9 / 16',
      borderRadius: 16,
      overflow: 'hidden',
      background: '#040201',
      boxShadow: '0 12px 48px rgba(0,0,0,0.55), 0 0 0 2px rgba(212,168,67,0.25)',
    }}>

      {/* Corner decorations */}
      <Corner/>
      <Corner flip={['x']}/>
      <Corner flip={['y']}/>
      <Corner flip={['x','y']}/>

      {/* Video element */}
      <video
        ref={vidRef}
        src={url}
        playsInline
        muted={muted}
        preload="auto"
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
      />

      {/* Tap-to-toggle overlay (full area, semi-transparent) */}
      <div onClick={togglePlay} style={{ position:'absolute', inset:0, cursor:'pointer', zIndex:5 }}/>

      {/* Big play/pause indicator (fades out) */}
      {!playing && (
        <motion.div
          initial={{ opacity:0, scale:0.7 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale:0.7 }}
          style={{
            position:'absolute', inset:0, zIndex:6,
            display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(0,0,0,0.28)', pointerEvents:'none',
          }}>
          <div style={{
            width:64, height:64, borderRadius:'50%',
            background:'linear-gradient(135deg,#d4a843,#8b6508)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 0 32px rgba(212,168,67,0.65)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </motion.div>
      )}

      {/* Bottom controls bar */}
      <div style={{
        position: 'absolute', bottom:0, left:0, right:0, zIndex:7,
        background: 'linear-gradient(0deg,rgba(0,0,0,0.75) 0%,transparent 100%)',
        padding: '2rem 0.85rem 0.75rem',
        display: 'flex', alignItems: 'center', gap:'0.55rem',
      }}>
        {/* Play / pause */}
        <button onClick={e=>{ e.stopPropagation(); togglePlay() }} style={{
          background:'none', border:'none', color:'#f9f0d0',
          fontSize:'1rem', cursor:'pointer', padding:'0 2px', flexShrink:0,
        }}>
          {playing ? '⏸' : '▶'}
        </button>

        {/* Progress bar — clickable */}
        <div onClick={e=>{ e.stopPropagation(); seek(e) }}
          style={{ flex:1, height:3, background:'rgba(255,255,255,0.22)', borderRadius:2, cursor:'pointer', overflow:'hidden' }}>
          <div style={{
            height:'100%', width:`${progress * 100}%`,
            background:'linear-gradient(90deg,#d4a843,#f9f0d0)',
            borderRadius:2, transition:'width 0.1s linear',
          }}/>
        </div>

        {/* Mute / unmute */}
        <button onClick={e=>{ e.stopPropagation(); toggleMute() }} style={{
          background:'none', border:'none', color:'#f9f0d0',
          fontSize:'0.9rem', cursor:'pointer', padding:'0 2px', flexShrink:0,
        }}>
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Muted notice (auto-play browsers require muted) */}
      {muted && playing && (
        <motion.div
          initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
          exit={{ opacity:0 }}
          style={{
            position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', zIndex:8,
            background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)',
            borderRadius:20, padding:'4px 12px',
            fontFamily:"'Lato',sans-serif", fontSize:'0.6rem',
            color:'rgba(249,240,208,0.8)', letterSpacing:'1px', whiteSpace:'nowrap',
          }}>
          Tap 🔊 for sound
        </motion.div>
      )}
    </div>
  )
}

/* ── Placeholder when no video uploaded ────────────────────────────────── */
function VideoPlaceholder() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
      style={{
        width:'100%', maxWidth:'min(54vh,88%)', margin:'0 auto',
        aspectRatio:'9/16', borderRadius:16,
        background:'linear-gradient(160deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))',
        border:'2px dashed rgba(201,146,42,0.4)', backdropFilter:'blur(8px)',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap:'0.7rem',
      }}>
      <div style={{ fontSize:'3rem', opacity:0.45 }}>🎬</div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.58rem', letterSpacing:'3px',
        color:'rgba(61,26,0,0.5)', textAlign:'center' }}>
        VIDEO COMING SOON
      </div>
      <div style={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'0.65rem',
        color:'rgba(61,26,0,0.38)', textAlign:'center', maxWidth:'60%', lineHeight:1.6 }}>
        Upload a video from the Host panel to display here
      </div>
    </motion.div>
  )
}

/* ── Main Scene ─────────────────────────────────────────────────────────── */
export default function S3_Families() {
  const { event, mediaConfig } = useGuest()
  const videoUrl = mediaConfig?.videoUrl || null

  const container = {
    hidden: {},
    show:   { transition:{ staggerChildren:0.14 } },
  }
  const fadeUp = {
    hidden: { opacity:0, y:30 },
    show:   { opacity:1, y:0, transition:{ duration:0.65, ease:[0.22,1,0.36,1] } },
  }

  return (
    <div style={{
      width:'100%', height:'100%', overflow:'hidden', position:'relative',
      background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>

      {/* Ambient glow top */}
      <div style={{
        position:'absolute', top:'-10%', left:'50%', transform:'translateX(-50%)',
        width:'80%', height:'55%', borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(255,255,255,0.55) 0%,transparent 70%)',
        pointerEvents:'none',
      }}/>

      {/* Ambient glow bottom */}
      <div style={{
        position:'absolute', bottom:'-5%', left:'50%', transform:'translateX(-50%)',
        width:'60%', height:'30%', borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(160,108,16,0.15) 0%,transparent 70%)',
        pointerEvents:'none',
      }}/>

      <FloatingPetals/>

      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{
          position:'relative', zIndex:4, textAlign:'center',
          padding:'1rem 1.2rem', width:'100%', maxWidth:480,
          display:'flex', flexDirection:'column', alignItems:'center', gap:'0.8rem',
        }}>

        {/* ── Heading ── */}
        <motion.div variants={fadeUp} style={{ width:'100%' }}>
          <div style={{
            fontFamily:"'Cinzel',serif", color:'#4a2000',
            fontSize:'clamp(0.4rem,1.2vw,0.52rem)', letterSpacing:'4px', fontWeight:700, opacity:0.8,
          }}>
            ✦ &nbsp;WITH THE BLESSINGS OF OUR FAMILIES&nbsp; ✦
          </div>
          <div style={{
            fontFamily:"'Great Vibes',cursive",
            fontSize:'clamp(1.8rem,5.5vw,2.8rem)',
            color:'#3d1a00', textShadow:'1px 1px 0 rgba(255,255,255,0.5)',
            lineHeight:1.1, marginTop:'0.15rem',
          }}>
            Our Families
          </div>
        </motion.div>

        {/* ── Gold divider ── */}
        <motion.div variants={fadeUp}
          style={{ display:'flex', alignItems:'center', gap:'0.5rem', width:'60%', maxWidth:160 }}>
          <div style={{ flex:1, height:'1.5px', background:'linear-gradient(90deg,transparent,#a06c10)' }}/>
          <div style={{ width:5, height:5, border:'2px solid #a06c10', transform:'rotate(45deg)' }}/>
          <div style={{ flex:1, height:'1.5px', background:'linear-gradient(90deg,#a06c10,transparent)' }}/>
        </motion.div>

        {/* ── 9:16 Video ── */}
        <motion.div variants={fadeUp} style={{ width:'100%' }}>
          {videoUrl
            ? <VideoPlayer url={videoUrl} autoPlay={true}/>
            : <VideoPlaceholder/>
          }
        </motion.div>

        {/* ── Tagline below video ── */}
        <motion.div variants={fadeUp}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:600,
            fontSize:'clamp(0.72rem,2vw,0.9rem)', color:'#3d1a00', lineHeight:1.75,
          }}>
            {event?.groomName} &amp; {event?.brideName}
          </div>
          <div style={{
            fontFamily:"'Lato',sans-serif", fontWeight:300,
            fontSize:'clamp(0.6rem,1.6vw,0.72rem)', color:'rgba(61,26,0,0.6)',
            letterSpacing:'1px', marginTop:'0.2rem',
          }}>
            United in love, blessed by family
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}
