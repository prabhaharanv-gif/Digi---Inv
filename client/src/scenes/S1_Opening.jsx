import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

export default function S1_Opening({ onNext }) {
  const { guest, event } = useGuest()
  const up = { hidden:{ opacity:0, y:22 }, show:{ opacity:1, y:0 } }

  return (
    <div style={{
      position:'relative', width:'100%', height:'100%', overflow:'hidden',
      background:'linear-gradient(170deg, #cce5c2 0%, #a8c89e 30%, #8ab87e 60%, #72a864 100%)',
    }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-10%', left:'50%', transform:'translateX(-50%)', width:'80%', height:'55%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.6) 0%,transparent 70%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%', background:'linear-gradient(0deg,rgba(100,160,80,0.5) 0%,transparent 100%)' }} />
      </div>

      <MughalArch />
      <BotanicalLeft />
      <BotanicalRight />
      <BottomFlora />

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
        <motion.div variants={up} transition={{ duration:0.8 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(0.5rem,1.5vw,0.65rem)', letterSpacing:'5px', color:'#4a2800', fontWeight:700, marginBottom:'0.3rem', textShadow:'0 1px 3px rgba(255,255,255,0.5)' }}>
            ✦ &nbsp; AN AUSPICIOUS UNION &nbsp; ✦
          </div>
          <ThinGoldLine />
        </motion.div>

        <motion.div variants={up} transition={{ duration:1 }} style={{ marginTop:'0.5rem' }}>
          <div style={{
            fontFamily:"'Great Vibes',cursive",
            fontSize:'clamp(3rem,10vw,6.5rem)',
            color:'#1a3d18',
            lineHeight:1, letterSpacing:'2px',
            textShadow:'2px 2px 0px rgba(255,255,255,0.6), 0 4px 16px rgba(26,61,24,0.25)',
            fontWeight:400,
          }}>
            {event?.groomName}
          </div>
        </motion.div>

        <motion.div variants={up} transition={{ duration:0.7 }} style={{ margin:'0.1rem 0' }}>
          <AndDivider />
        </motion.div>

        <motion.div variants={up} transition={{ duration:1 }}>
          <div style={{
            fontFamily:"'Great Vibes',cursive",
            fontSize:'clamp(3rem,10vw,6.5rem)',
            color:'#1a3d18',
            lineHeight:1, letterSpacing:'2px',
            textShadow:'2px 2px 0px rgba(255,255,255,0.6), 0 4px 16px rgba(26,61,24,0.25)',
            fontWeight:400,
          }}>
            {event?.brideName}
          </div>
        </motion.div>

        <motion.div variants={up} transition={{ duration:0.8 }} style={{ marginTop:'0.6rem' }}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:600,
            fontSize:'clamp(0.95rem,2.8vw,1.3rem)', color:'#1e3d1a',
            letterSpacing:'1px',
            textShadow:'0 1px 4px rgba(255,255,255,0.7)',
          }}>
            Are joyfully united in holy matrimony
          </div>
        </motion.div>

        <motion.div variants={up} transition={{ duration:0.8 }} style={{ marginTop:'0.9rem' }}>
          <div style={{
            border:'2px solid rgba(74,40,0,0.45)',
            borderRadius:'60px', padding:'0.65rem 1.8rem',
            background:'rgba(255,255,255,0.6)',
            backdropFilter:'blur(8px)',
            boxShadow:'0 4px 20px rgba(74,40,0,0.12)',
          }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.1rem,3.5vw,1.6rem)', color:'#1a3d18', fontWeight:700 }}>
              Dear &nbsp;
            </span>
            <span style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.4rem,4.5vw,2.2rem)', color:'#6b3a00', fontWeight:400 }}>
              {guest?.name}
            </span>
            <span style={{ marginLeft:'0.3rem', fontSize:'1.1rem' }}>💚</span>
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:600, fontSize:'clamp(0.82rem,2.2vw,1rem)', color:'#1e3d1a', marginTop:'0.5rem', textShadow:'0 1px 3px rgba(255,255,255,0.6)' }}>
            We would love to celebrate this beautiful moment with you
          </div>
        </motion.div>

        <motion.div variants={up} transition={{ duration:0.8 }} style={{ marginTop:'1.4rem' }}>
          <SwipeHint onNext={onNext} />
        </motion.div>
      </motion.div>
    </div>
  )
}

function MughalArch() {
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'flex-start', justifyContent:'center', zIndex:10, pointerEvents:'none' }}>
      <svg viewBox="0 0 400 520" style={{ width:'min(100%,440px)', height:'auto', overflow:'visible' }} preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f9f0d0"/>
            <stop offset="30%"  stopColor="#e8c97a"/>
            <stop offset="60%"  stopColor="#a06c10"/>
            <stop offset="100%" stopColor="#b8860b"/>
          </linearGradient>
          <filter id="archGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g filter="url(#archGlow)" strokeWidth="2.5" fill="none">
          <line x1="60" y1="520" x2="60" y2="200" stroke="url(#goldGrad)" strokeWidth="2.2"/>
          <line x1="340" y1="520" x2="340" y2="200" stroke="url(#goldGrad)" strokeWidth="2.2"/>
          <path d="M60,200 Q60,60 200,40 Q340,60 340,200" stroke="url(#goldGrad)" strokeWidth="2.8" fill="none"/>
          <path d="M80,200 Q80,80 200,62 Q320,80 320,200" stroke="url(#goldGrad)" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.6"/>
        </g>
        <g transform="translate(200,38)" stroke="url(#goldGrad)" fill="none" strokeWidth="1.5">
          <circle cx="0" cy="0" r="14" strokeWidth="2"/>
          <circle cx="0" cy="0" r="8"  strokeWidth="1.2"/>
          <circle cx="0" cy="0" r="3"  fill="url(#goldGrad)" stroke="none"/>
          {[0,45,90,135,180,225,270,315].map((a,i) => {
            const r = a*Math.PI/180
            return <ellipse key={i} cx={Math.cos(r)*11} cy={Math.sin(r)*11} rx="4" ry="2.5" transform={`rotate(${a},${Math.cos(r)*11},${Math.sin(r)*11})`} fill="rgba(160,108,16,0.35)" stroke="url(#goldGrad)" strokeWidth="0.8"/>
          })}
          <path d="M0,-14 L-4,-24 L0,-30 L4,-24 Z" fill="url(#goldGrad)" stroke="none"/>
          <path d="M-12,-10 L-16,-18 L-12,-22 L-8,-18 Z" fill="url(#goldGrad)" stroke="none" opacity="0.8"/>
          <path d="M12,-10 L8,-18 L12,-22 L16,-18 Z" fill="url(#goldGrad)" stroke="none" opacity="0.8"/>
          {[-1,1].map(s => (
            <g key={s} transform={`scale(${s},1)`}>
              <path d="M15,0 Q25,-8 30,0 Q25,8 15,0" fill="rgba(160,108,16,0.3)" stroke="url(#goldGrad)" strokeWidth="0.9"/>
              <path d="M28,0 Q36,-6 40,0 Q36,6 28,0" fill="rgba(160,108,16,0.2)" stroke="url(#goldGrad)" strokeWidth="0.7"/>
            </g>
          ))}
        </g>
        {[220, 270, 320, 370, 420, 470].map((y,i) => (
          <g key={i} transform={`translate(60,${y})`}>
            <rect x="-8" y="-8" width="16" height="16" rx="2" fill="rgba(160,108,16,0.22)" stroke="url(#goldGrad)" strokeWidth="1" transform="rotate(45)"/>
          </g>
        ))}
        {[220, 270, 320, 370, 420, 470].map((y,i) => (
          <g key={i} transform={`translate(340,${y})`}>
            <rect x="-8" y="-8" width="16" height="16" rx="2" fill="rgba(160,108,16,0.22)" stroke="url(#goldGrad)" strokeWidth="1" transform="rotate(45)"/>
          </g>
        ))}
      </svg>
    </div>
  )
}

function BotanicalLeft() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, zIndex:15, width:'clamp(130px,35vw,200px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 200 280" style={{ width:'100%', overflow:'visible' }}>
        <ellipse cx="60" cy="200" rx="55" ry="22" fill="#4a8c40" transform="rotate(-30,60,200)" opacity="0.95"/>
        <ellipse cx="50" cy="200" rx="48" ry="18" fill="#5ea052" transform="rotate(-30,50,200)" opacity="0.8"/>
        <ellipse cx="90" cy="220" rx="60" ry="20" fill="#3d7835" transform="rotate(-15,90,220)" opacity="0.9"/>
        <ellipse cx="30" cy="240" rx="52" ry="16" fill="#336830" transform="rotate(-40,30,240)" opacity="0.8"/>
        <ellipse cx="110" cy="210" rx="30" ry="10" fill="#c9922a" transform="rotate(-20,110,210)" opacity="0.6"/>
        <ellipse cx="40" cy="260" rx="35" ry="11" fill="#b8860b" transform="rotate(-50,40,260)" opacity="0.5"/>
        {[[70,185],[50,205],[90,195]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j) => <ellipse key={j} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7} rx="4.5" ry="3" transform={`rotate(${a})`} fill="white" opacity="0.95"/>)}
            <circle cx="0" cy="0" r="3.5" fill="#f5e4b0"/>
          </g>
        ))}
      </svg>
    </div>
  )
}

function BotanicalRight() {
  return (
    <div style={{ position:'absolute', bottom:0, right:0, zIndex:15, width:'clamp(130px,35vw,200px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 200 280" style={{ width:'100%', overflow:'visible', transform:'scaleX(-1)' }}>
        <ellipse cx="60" cy="200" rx="55" ry="22" fill="#4a8c40" transform="rotate(-30,60,200)" opacity="0.95"/>
        <ellipse cx="50" cy="200" rx="48" ry="18" fill="#5ea052" transform="rotate(-30,50,200)" opacity="0.8"/>
        <ellipse cx="90" cy="220" rx="60" ry="20" fill="#3d7835" transform="rotate(-15,90,220)" opacity="0.9"/>
        <ellipse cx="30" cy="240" rx="52" ry="16" fill="#336830" transform="rotate(-40,30,240)" opacity="0.8"/>
        <ellipse cx="110" cy="210" rx="30" ry="10" fill="#c9922a" transform="rotate(-20,110,210)" opacity="0.6"/>
        {[[70,185],[50,205],[90,195]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j) => <ellipse key={j} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7} rx="4.5" ry="3" transform={`rotate(${a})`} fill="white" opacity="0.95"/>)}
            <circle cx="0" cy="0" r="3.5" fill="#f5e4b0"/>
          </g>
        ))}
      </svg>
    </div>
  )
}

function BottomFlora() {
  return (
    <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', zIndex:14, width:'clamp(160px,50vw,280px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 280 120" style={{ width:'100%', overflow:'visible' }}>
        <ellipse cx="140" cy="90" rx="70" ry="20" fill="#5ea052" opacity="0.7"/>
        <ellipse cx="140" cy="100" rx="90" ry="18" fill="#4a8c40" opacity="0.5"/>
        {[[90,75],[140,65],[190,75],[115,85],[165,82]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j) => <ellipse key={j} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6} rx="4" ry="2.5" transform={`rotate(${a})`} fill="white" opacity="0.9"/>)}
            <circle cx="0" cy="0" r="3" fill="#f5e4b0"/>
          </g>
        ))}
      </svg>
    </div>
  )
}

function ThinGoldLine() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', margin:'0.3rem auto', maxWidth:280 }}>
      <div style={{ flex:1, height:'1.5px', background:'linear-gradient(90deg,transparent,#a06c10)' }} />
      <div style={{ width:5, height:5, background:'#a06c10', borderRadius:'50%', boxShadow:'0 0 4px #a06c10' }} />
      <div style={{ flex:1, height:'1.5px', background:'linear-gradient(90deg,#a06c10,transparent)' }} />
    </div>
  )
}

function AndDivider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'1rem', justifyContent:'center', margin:'0.2rem 0' }}>
      <div style={{ width:40, height:'1.5px', background:'linear-gradient(90deg,transparent,#a06c10)' }} />
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'#4a2800', fontSize:'clamp(0.95rem,2.5vw,1.2rem)', letterSpacing:'2px', fontWeight:700 }}>and</span>
      <div style={{ width:40, height:'1.5px', background:'linear-gradient(90deg,#a06c10,transparent)' }} />
    </div>
  )
}

function SwipeHint({ onNext }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem', cursor:'pointer' }} onClick={onNext}>
      <div style={{ width:28, height:44, borderRadius:14, border:'2px solid rgba(74,40,0,0.5)', position:'relative', overflow:'hidden', background:'rgba(255,255,255,0.3)' }}>
        <motion.div animate={{ y:[5,28], opacity:[1,0] }} transition={{ duration:1.3, repeat:Infinity, ease:'easeIn' }}
          style={{ position:'absolute', width:6, height:6, borderRadius:'50%', background:'#4a2800', left:'50%', marginLeft:-3, top:5 }} />
      </div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.52rem', letterSpacing:'4px', color:'#1e3d1a', fontWeight:700 }}>SWIPE TO BEGIN</div>
    </div>
  )
}
