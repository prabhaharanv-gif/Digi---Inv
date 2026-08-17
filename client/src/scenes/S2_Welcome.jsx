import React from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'
import { useCountdown } from '../hooks/useCountdown'

export default function S2_Welcome() {
  const { event } = useGuest()
  const time = useCountdown(event?.dateISO || '2026-12-25T09:30:00')

  return (
    <SceneBg>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}}
        style={{ position:'relative', zIndex:2, textAlign:'center', padding:'2rem 1.5rem', width:'100%', maxWidth:520 }}>

        <GoldLabel>✦ &nbsp; WEDDING INVITATION &nbsp; ✦</GoldLabel>

        <div style={{ margin:'1.2rem 0 0.4rem' }}>
          <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2.2rem,8vw,4.5rem)', color:'#2c4a28', lineHeight:1.05, textShadow:'0 2px 10px rgba(44,74,40,0.12)' }}>
            {event?.groomName}
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'#c9922a', fontSize:'clamp(0.85rem,2vw,1.1rem)', margin:'0.1rem 0', letterSpacing:'2px' }}>and</div>
          <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2.2rem,8vw,4.5rem)', color:'#2c4a28', lineHeight:1.05, textShadow:'0 2px 10px rgba(44,74,40,0.12)' }}>
            {event?.brideName}
          </div>
        </div>

        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.9rem,2.5vw,1.1rem)', color:'#4a6e44', marginBottom:'0.3rem' }}>
          Are getting married
        </div>

        <GoldDivider />

        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(0.85rem,2.5vw,1.1rem)', color:'#3d6b38', letterSpacing:'2px', fontWeight:500 }}>
          {event?.date || '25 DECEMBER 2026'}
        </div>
        <div style={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'0.82rem', color:'#7aac72', marginTop:'0.2rem' }}>
          {event?.venue}, Chennai
        </div>

        {/* Countdown */}
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(0.6rem,2.5vw,1.4rem)', marginTop:'1.6rem' }}>
          {[['days','DAYS'],['hours','HRS'],['mins','MINS'],['secs','SECS']].map(([k,l]) => (
            <div key={k} style={{ textAlign:'center' }}>
              <div style={{
                fontFamily:"'Playfair Display',serif", fontWeight:700,
                fontSize:'clamp(1.4rem,5vw,2.2rem)', color:'#2c4a28',
                background:'rgba(255,255,255,0.55)',
                border:'1px solid rgba(201,146,42,0.3)',
                borderRadius:8, padding:'clamp(0.3rem,1vw,0.5rem) clamp(0.5rem,2vw,0.9rem)',
                minWidth:'clamp(48px,13vw,68px)',
                boxShadow:'0 2px 12px rgba(201,146,42,0.1)',
              }}>
                {time[k]}
              </div>
              <div style={{ fontFamily:"'Cinzel',serif", fontWeight:400, fontSize:'0.5rem', letterSpacing:'2px', color:'#c9922a', marginTop:'0.3rem' }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <BottomLeaves />
    </SceneBg>
  )
}

function SceneBg({ children }) {
  return (
    <div style={{
      width:'100%', height:'100%', overflow:'hidden', position:'relative',
      background:'linear-gradient(160deg,#dff0d8 0%,#c8dbc0 40%,#b8d4b0 100%)',
    }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', position:'relative', zIndex:2 }}>
        {children}
      </div>
    </div>
  )
}

function GoldLabel({ children }) {
  return <div style={{ fontFamily:"'Cinzel',serif", color:'#c9922a', fontSize:'clamp(0.45rem,1.4vw,0.58rem)', letterSpacing:'5px', marginBottom:'0.5rem' }}>{children}</div>
}

function GoldDivider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', margin:'0.9rem auto', maxWidth:240 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }} />
      <div style={{ width:5, height:5, border:'1.5px solid #c9922a', transform:'rotate(45deg)' }} />
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }} />
    </div>
  )
}

function BottomLeaves() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, pointerEvents:'none', zIndex:1 }}>
      <svg viewBox="0 0 800 80" preserveAspectRatio="none" style={{ width:'100%', height:'100%' }}>
        <ellipse cx="100" cy="75" rx="90" ry="25" fill="#7aac72" opacity="0.5"/>
        <ellipse cx="700" cy="75" rx="90" ry="25" fill="#7aac72" opacity="0.5"/>
        <ellipse cx="400" cy="78" rx="140" ry="20" fill="#8ec485" opacity="0.35"/>
      </svg>
    </div>
  )
}
