import React from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

export default function S5_Traditional() {
  const { event } = useGuest()
  const f = event?.families || []

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />

      <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.8}}
        style={{ position:'relative', zIndex:2, width:'calc(100% - 2rem)', maxWidth:400 }}>

        {/* Gold gradient border frame */}
        <div style={{ padding:2.5, background:'linear-gradient(135deg,#b8860b,#f9f0d0,#d4a843,#8b6508,#e8c97a)', borderRadius:10 }}>
          <div style={{
            background:'linear-gradient(160deg,#f0f8ec 0%,#e4f4de 50%,#d8efd2 100%)',
            borderRadius:8, padding:'clamp(1.2rem,4vw,1.8rem) clamp(1rem,3vw,1.5rem)',
            textAlign:'center', position:'relative', overflow:'hidden',
          }}>
            {/* Arch watermark */}
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.06, pointerEvents:'none' }}>
              <svg viewBox="0 0 200 260" style={{ height:'100%' }}>
                <path d="M30,260 L30,120 Q30,20 100,10 Q170,20 170,120 L170,260" fill="none" stroke="#c9922a" strokeWidth="1.5"/>
                <path d="M50,260 L50,130 Q50,40 100,30 Q150,40 150,130 L150,260" fill="none" stroke="#c9922a" strokeWidth="1"/>
              </svg>
            </div>
            {/* Inner border */}
            <div style={{ position:'absolute', inset:12, border:'1px solid rgba(201,146,42,0.25)', borderRadius:4, pointerEvents:'none' }} />

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.5rem,5vw,2rem)', color:'#c9922a', marginBottom:'0.3rem' }}>ॐ</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1rem,3.5vw,1.3rem)', color:'#4a2000', letterSpacing:'2px', marginBottom:'0.8rem' }}>
                அன்புடையீர்
              </div>
              <GoldDivider />
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300, fontSize:'clamp(0.72rem,2.2vw,0.85rem)', color:'#3d1a00', lineHeight:1.85, margin:'0.6rem 0' }}>
                With hearts full of gratitude, we seek your divine blessings and loving presence at the sacred union of
              </div>
              <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.2rem,4vw,1.8rem)', color:'#4a2000', margin:'0.4rem 0', textShadow:'0 1px 6px rgba(44,74,40,0.1)' }}>
                {event?.groomName} &amp; {event?.brideName}
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.68rem,2vw,0.8rem)', color:'#5c2800', lineHeight:1.8 }}>
                Son of Thiru. {f[0]?.name} &amp; Thirumathi. {f[1]?.name}<br/>
                with the beloved daughter of<br/>
                Thiru. {f[2]?.name} &amp; Thirumathi. {f[3]?.name}
              </div>
              <GoldDivider />
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'clamp(0.62rem,1.8vw,0.75rem)', color:'#c9922a', letterSpacing:'2px', margin:'0.5rem 0 0.3rem', fontWeight:500 }}>
                25 DECEMBER 2026 · 9:30 AM
              </div>
              <div style={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'clamp(0.62rem,1.8vw,0.72rem)', color:'#5c2800', lineHeight:1.6 }}>
                {event?.venue}<br/>{event?.venueAddress}
              </div>
              <GoldDivider />
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.65rem,1.8vw,0.75rem)', color:'rgba(61,26,0,0.85)' }}>
                Your presence is our greatest blessing
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function GoldDivider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', margin:'0.65rem auto', maxWidth:180 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,rgba(201,146,42,0.5))' }} />
      <div style={{ width:4, height:4, background:'#c9922a', borderRadius:'50%' }} />
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,rgba(201,146,42,0.5),transparent)' }} />
    </div>
  )
}
