import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

export default function S1_Opening({ onNext }) {
  const { guest, event } = useGuest()

  const up = { hidden:{ opacity:0, y:22 }, show:{ opacity:1, y:0 } }

  return (
    <div style={{
      position:'relative', width:'100%', height:'100%', overflow:'hidden',
      background:'linear-gradient(170deg, #dff0d8 0%, #c8dbc0 30%, #b8d4b0 60%, #a8c8a0 100%)',
    }}>
      {/* ── Soft ambient light blobs ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-10%', left:'50%', transform:'translateX(-50%)', width:'80%', height:'55%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.55) 0%,transparent 70%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'45%', background:'linear-gradient(0deg,rgba(168,200,160,0.6) 0%,transparent 100%)' }} />
      </div>

      {/* ══════════ MUGHAL ARCH SVG ══════════ */}
      <MughalArch />

      {/* ══════════ BOTANICAL ELEMENTS ══════════ */}
      <BotanicalLeft />
      <BotanicalRight />
      <BottomFlora />

      {/* ══════════ CONTENT ══════════ */}
      <motion.div
        initial="hidden" animate="show"
        transition={{ staggerChildren: 0.3 }}
        style={{
          position:'absolute', inset:0, zIndex:20,
          display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', textAlign:'center',
          padding:'0 1.5rem',
          paddingTop:'clamp(3rem,12vw,6rem)',
        }}
      >
        {/* Eyebrow */}
        <motion.div variants={up} transition={{ duration:0.8 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(0.45rem,1.4vw,0.58rem)', letterSpacing:'5px', color:'#c9922a', marginBottom:'0.3rem' }}>
            ✦ &nbsp; AN AUSPICIOUS UNION &nbsp; ✦
          </div>
          <ThinGoldLine />
        </motion.div>

        {/* Groom name — calligraphy */}
        <motion.div variants={up} transition={{ duration:1 }} style={{ marginTop:'0.6rem' }}>
          <div style={{
            fontFamily:"'Great Vibes',cursive",
            fontSize:'clamp(2.8rem,9vw,6rem)',
            color:'#2c4a28',
            lineHeight:1, letterSpacing:'2px',
            textShadow:'0 2px 12px rgba(44,74,40,0.15)',
          }}>
            {event?.groomName}
          </div>
        </motion.div>

        {/* AND divider */}
        <motion.div variants={up} transition={{ duration:0.7 }} style={{ margin:'0.1rem 0' }}>
          <AndDivider />
        </motion.div>

        {/* Bride name — calligraphy */}
        <motion.div variants={up} transition={{ duration:1 }}>
          <div style={{
            fontFamily:"'Great Vibes',cursive",
            fontSize:'clamp(2.8rem,9vw,6rem)',
            color:'#2c4a28',
            lineHeight:1, letterSpacing:'2px',
            textShadow:'0 2px 12px rgba(44,74,40,0.15)',
          }}>
            {event?.brideName}
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={up} transition={{ duration:0.8 }} style={{ marginTop:'0.7rem' }}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300,
            fontSize:'clamp(0.85rem,2.5vw,1.15rem)', color:'#4a6e44', letterSpacing:'1px',
          }}>
            Are joyfully united in holy matrimony
          </div>
        </motion.div>

        {/* Guest greeting pill */}
        <motion.div variants={up} transition={{ duration:0.8 }} style={{ marginTop:'1.1rem' }}>
          <div style={{
            border:'1.5px solid rgba(201,146,42,0.4)',
            borderRadius:'60px', padding:'0.6rem 1.8rem',
            background:'rgba(255,255,255,0.45)',
            backdropFilter:'blur(6px)',
            boxShadow:'0 4px 20px rgba(201,146,42,0.12)',
          }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1rem,3vw,1.5rem)', color:'#3d6b38', fontWeight:400 }}>
              Dear &nbsp;
            </span>
            <span style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.3rem,4vw,2rem)', color:'#c9922a' }}>
              {guest?.name}
            </span>
            <span style={{ marginLeft:'0.3rem', fontSize:'1rem' }}>💚</span>
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.78rem,2vw,0.95rem)', color:'rgba(74,110,68,0.7)', marginTop:'0.5rem' }}>
            We would love to celebrate this beautiful moment with you
          </div>
        </motion.div>

        {/* Swipe hint */}
        <motion.div variants={up} transition={{ duration:0.8 }} style={{ marginTop:'1.5rem' }}>
          <SwipeHint onNext={onNext} />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ── MUGHAL ARCH ── */
function MughalArch() {
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'flex-start', justifyContent:'center', zIndex:10, pointerEvents:'none' }}>
      <svg viewBox="0 0 400 520" style={{ width:'min(100%,440px)', height:'auto', overflow:'visible' }} preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f9f0d0"/>
            <stop offset="30%"  stopColor="#e8c97a"/>
            <stop offset="60%"  stopColor="#c9922a"/>
            <stop offset="80%"  stopColor="#d4a843"/>
            <stop offset="100%" stopColor="#b8860b"/>
          </linearGradient>
          <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#f9f0d0"/>
            <stop offset="50%"  stopColor="#d4a843"/>
            <stop offset="100%" stopColor="#b8860b"/>
          </linearGradient>
          <filter id="archGlow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Main arch outline */}
        <g filter="url(#archGlow)" strokeWidth="2.5" fill="none">
          {/* Left pillar */}
          <line x1="60" y1="520" x2="60" y2="200" stroke="url(#goldGrad)" strokeWidth="2"/>
          {/* Right pillar */}
          <line x1="340" y1="520" x2="340" y2="200" stroke="url(#goldGrad2)" strokeWidth="2"/>
          {/* Arch curve */}
          <path d="M60,200 Q60,60 200,40 Q340,60 340,200" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none"/>
          {/* Inner arch */}
          <path d="M80,200 Q80,80 200,62 Q320,80 320,200" stroke="url(#goldGrad)" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.5"/>
        </g>

        {/* ── TOP CENTRE CROWN ornament ── */}
        <g transform="translate(200,38)" stroke="url(#goldGrad)" fill="none" strokeWidth="1.2">
          {/* Central lotus */}
          <circle cx="0" cy="0" r="14" strokeWidth="1.5"/>
          <circle cx="0" cy="0" r="8"  strokeWidth="1"/>
          <circle cx="0" cy="0" r="3"  fill="url(#goldGrad)" stroke="none"/>
          {/* Petals */}
          {[0,45,90,135,180,225,270,315].map((a,i) => {
            const r = a*Math.PI/180
            return <ellipse key={i} cx={Math.cos(r)*11} cy={Math.sin(r)*11} rx="4" ry="2.5" transform={`rotate(${a},${Math.cos(r)*11},${Math.sin(r)*11})`} fill="rgba(201,146,42,0.3)" stroke="url(#goldGrad)" strokeWidth="0.8"/>
          })}
          {/* Spires above */}
          <path d="M0,-14 L-4,-24 L0,-30 L4,-24 Z" fill="url(#goldGrad)" stroke="none"/>
          <path d="M-12,-10 L-16,-18 L-12,-22 L-8,-18 Z" fill="url(#goldGrad)" stroke="none" opacity="0.7"/>
          <path d="M12,-10 L8,-18 L12,-22 L16,-18 Z" fill="url(#goldGrad)" stroke="none" opacity="0.7"/>
          {/* Side fans */}
          {[-1,1].map(s => (
            <g key={s} transform={`scale(${s},1)`}>
              <path d="M15,0 Q25,-8 30,0 Q25,8 15,0" fill="rgba(201,146,42,0.25)" stroke="url(#goldGrad)" strokeWidth="0.8"/>
              <path d="M28,0 Q36,-6 40,0 Q36,6 28,0" fill="rgba(201,146,42,0.15)" stroke="url(#goldGrad)" strokeWidth="0.7"/>
            </g>
          ))}
        </g>

        {/* ── ARCH KEYSTONE ornaments ── */}
        {/* Left quarter arch jewel */}
        <g transform="translate(100,130)">
          <circle r="6" fill="rgba(201,146,42,0.2)" stroke="url(#goldGrad)" strokeWidth="1.2"/>
          <circle r="3" fill="url(#goldGrad)" stroke="none"/>
        </g>
        {/* Right quarter arch jewel */}
        <g transform="translate(300,130)">
          <circle r="6" fill="rgba(201,146,42,0.2)" stroke="url(#goldGrad)" strokeWidth="1.2"/>
          <circle r="3" fill="url(#goldGrad)" stroke="none"/>
        </g>

        {/* ── LEFT PILLAR DETAILS ── */}
        {[220, 270, 320, 370, 420, 470].map((y,i) => (
          <g key={i} transform={`translate(60,${y})`}>
            <rect x="-8" y="-8" width="16" height="16" rx="2" fill="rgba(201,146,42,0.18)" stroke="url(#goldGrad)" strokeWidth="0.8" transform="rotate(45)"/>
            <rect x="-4" y="-4" width="8"  height="8"  rx="1" fill="rgba(201,146,42,0.3)" stroke="none" transform="rotate(45)"/>
          </g>
        ))}

        {/* ── RIGHT PILLAR DETAILS ── */}
        {[220, 270, 320, 370, 420, 470].map((y,i) => (
          <g key={i} transform={`translate(340,${y})`}>
            <rect x="-8" y="-8" width="16" height="16" rx="2" fill="rgba(201,146,42,0.18)" stroke="url(#goldGrad2)" strokeWidth="0.8" transform="rotate(45)"/>
            <rect x="-4" y="-4" width="8"  height="8"  rx="1" fill="rgba(201,146,42,0.3)" stroke="none" transform="rotate(45)"/>
          </g>
        ))}

        {/* ── BOTTOM BASE ORNAMENT ── */}
        <g transform="translate(200,510)" stroke="url(#goldGrad)" strokeWidth="1" fill="none" opacity="0.5">
          <line x1="-120" y1="0" x2="120" y2="0"/>
          <line x1="-60"  y1="0" x2="-60" y2="-8"/>
          <line x1="60"   y1="0" x2="60"  y2="-8"/>
          <circle cx="0" cy="0" r="4" fill="rgba(201,146,42,0.3)" strokeWidth="0.8"/>
        </g>
      </svg>
    </div>
  )
}

/* ── BOTANICAL LEFT ── */
function BotanicalLeft() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, zIndex:15, width:'clamp(130px,35vw,200px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 200 280" style={{ width:'100%', overflow:'visible' }}>
        {/* Large leaves */}
        <ellipse cx="60" cy="200" rx="55" ry="22" fill="#7aac72" transform="rotate(-30,60,200)" opacity="0.9"/>
        <ellipse cx="50" cy="200" rx="48" ry="18" fill="#8ec485" transform="rotate(-30,50,200)" opacity="0.7"/>
        <ellipse cx="90" cy="220" rx="60" ry="20" fill="#6a9e62" transform="rotate(-15,90,220)" opacity="0.85"/>
        <ellipse cx="30" cy="240" rx="52" ry="16" fill="#5e9458" transform="rotate(-40,30,240)" opacity="0.75"/>
        {/* Thin stems */}
        <path d="M80,280 Q60,230 40,190" fill="none" stroke="#5e9458" strokeWidth="1.5" opacity="0.6"/>
        <path d="M100,280 Q70,240 50,200" fill="none" stroke="#7aac72" strokeWidth="1.2" opacity="0.5"/>
        {/* Gold accent leaves */}
        <ellipse cx="110" cy="210" rx="30" ry="10" fill="#e8c97a" transform="rotate(-20,110,210)" opacity="0.55"/>
        <ellipse cx="40" cy="260" rx="35" ry="11" fill="#d4a843" transform="rotate(-50,40,260)" opacity="0.4"/>
        {/* Small white flowers */}
        {[[70,185],[50,205],[90,195]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j) => <ellipse key={j} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7} rx="4.5" ry="3" transform={`rotate(${a})`} fill="white" opacity="0.9"/>)}
            <circle cx="0" cy="0" r="3.5" fill="#f5e4b0"/>
          </g>
        ))}
        {/* Petal scatter */}
        <circle cx="130" cy="230" r="5" fill="white" opacity="0.6"/>
        <circle cx="20"  cy="220" r="4" fill="white" opacity="0.5"/>
      </svg>
    </div>
  )
}

/* ── BOTANICAL RIGHT ── */
function BotanicalRight() {
  return (
    <div style={{ position:'absolute', bottom:0, right:0, zIndex:15, width:'clamp(130px,35vw,200px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 200 280" style={{ width:'100%', overflow:'visible', transform:'scaleX(-1)' }}>
        <ellipse cx="60" cy="200" rx="55" ry="22" fill="#7aac72" transform="rotate(-30,60,200)" opacity="0.9"/>
        <ellipse cx="50" cy="200" rx="48" ry="18" fill="#8ec485" transform="rotate(-30,50,200)" opacity="0.7"/>
        <ellipse cx="90" cy="220" rx="60" ry="20" fill="#6a9e62" transform="rotate(-15,90,220)" opacity="0.85"/>
        <ellipse cx="30" cy="240" rx="52" ry="16" fill="#5e9458" transform="rotate(-40,30,240)" opacity="0.75"/>
        <path d="M80,280 Q60,230 40,190" fill="none" stroke="#5e9458" strokeWidth="1.5" opacity="0.6"/>
        <ellipse cx="110" cy="210" rx="30" ry="10" fill="#e8c97a" transform="rotate(-20,110,210)" opacity="0.55"/>
        <ellipse cx="40"  cy="260" rx="35" ry="11" fill="#d4a843" transform="rotate(-50,40,260)" opacity="0.4"/>
        {[[70,185],[50,205],[90,195]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j) => <ellipse key={j} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7} rx="4.5" ry="3" transform={`rotate(${a})`} fill="white" opacity="0.9"/>)}
            <circle cx="0" cy="0" r="3.5" fill="#f5e4b0"/>
          </g>
        ))}
        <circle cx="130" cy="230" r="5" fill="white" opacity="0.6"/>
        <circle cx="20"  cy="220" r="4" fill="white" opacity="0.5"/>
      </svg>
    </div>
  )
}

/* ── BOTTOM CENTRE FLORA ── */
function BottomFlora() {
  return (
    <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', zIndex:14, width:'clamp(160px,50vw,280px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 280 120" style={{ width:'100%', overflow:'visible' }}>
        {/* Centre leaves spread */}
        <ellipse cx="140" cy="90" rx="70" ry="20" fill="#8ec485" opacity="0.6"/>
        <ellipse cx="140" cy="100" rx="90" ry="18" fill="#7aac72" opacity="0.4"/>
        {/* Scattered blooms */}
        {[[90,75],[140,65],[190,75],[115,85],[165,82]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j) => <ellipse key={j} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6} rx="4" ry="2.5" transform={`rotate(${a})`} fill="white" opacity="0.85"/>)}
            <circle cx="0" cy="0" r="3" fill="#f5e4b0"/>
          </g>
        ))}
        <ellipse cx="75"  cy="95" rx="22" ry="8" fill="#d4a843" transform="rotate(-15,75,95)"  opacity="0.45"/>
        <ellipse cx="205" cy="95" rx="22" ry="8" fill="#d4a843" transform="rotate(15,205,95)"  opacity="0.45"/>
      </svg>
    </div>
  )
}

function ThinGoldLine() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', margin:'0.3rem auto', maxWidth:260 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }} />
      <div style={{ width:4, height:4, background:'#c9922a', borderRadius:'50%' }} />
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }} />
    </div>
  )
}

function AndDivider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'1rem', justifyContent:'center', margin:'0.2rem 0' }}>
      <div style={{ width:35, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }} />
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'#c9922a', fontSize:'clamp(0.85rem,2vw,1.1rem)', letterSpacing:'2px' }}>and</span>
      <div style={{ width:35, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }} />
    </div>
  )
}

function SwipeHint({ onNext }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem', cursor:'pointer', opacity:0.75 }} onClick={onNext}>
      <div style={{ width:26, height:42, borderRadius:13, border:'1.5px solid rgba(201,146,42,0.5)', position:'relative', overflow:'hidden' }}>
        <motion.div animate={{ y:[5,26], opacity:[1,0] }} transition={{ duration:1.3, repeat:Infinity, ease:'easeIn' }}
          style={{ position:'absolute', width:5, height:5, borderRadius:'50%', background:'#c9922a', left:'50%', marginLeft:-2.5, top:5 }} />
      </div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.48rem', letterSpacing:'4px', color:'rgba(61,107,56,0.6)' }}>SWIPE TO BEGIN</div>
    </div>
  )
}
