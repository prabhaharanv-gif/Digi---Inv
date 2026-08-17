import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

const PETALS = ['🌸','🌺','🌹','🪷','💮','✿']

export default function S10_ThankYou() {
  const { guest, event } = useGuest()
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current; if(!c) return
    const els = []
    for(let i=0;i<30;i++) {
      const el = document.createElement('div')
      el.textContent = PETALS[Math.floor(Math.random()*PETALS.length)]
      const size = 0.8+Math.random()*0.9, delay=Math.random()*6, dur=5+Math.random()*5
      el.style.cssText = `position:absolute;left:${Math.random()*100}%;font-size:${size}rem;animation:petalFall ${dur}s ${delay}s linear infinite;opacity:0;pointer-events:none;user-select:none;`
      c.appendChild(el); els.push(el)
    }
    return () => els.forEach(e=>e.remove())
  }, [])

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#dff0d8 0%,#c8dbc0 40%,#b8d4b0 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <style>{`@keyframes petalFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}} @keyframes hb2{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}`}</style>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div ref={ref} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1 }} />
      <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[0.25,0.46,0.45,0.94]}}
        style={{ position:'relative', zIndex:2, textAlign:'center', padding:'2rem 1.5rem', maxWidth:460 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.78rem,2.2vw,0.95rem)', color:'#7aac72', letterSpacing:'2px', marginBottom:'0.5rem' }}>
          Thank you, with all our hearts
        </div>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2rem,8vw,4rem)', color:'#2c4a28', textShadow:'0 2px 12px rgba(44,74,40,0.15)', marginBottom:'0.3rem' }}>
          {guest?.name}
        </div>
        <GoldDiv />
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(1rem,3vw,1.25rem)', color:'#3d6b38', lineHeight:1.9 }}>
          We can't wait to celebrate<br/>this beautiful moment with you.
          <div style={{ fontSize:'0.82em', color:'rgba(74,110,68,0.6)', marginTop:'0.3rem' }}>Your presence means the world to us.</div>
        </div>
        <GoldDiv />
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.6rem,6vw,3rem)', color:'#2c4a28', textShadow:'0 1px 8px rgba(44,74,40,0.1)' }}>
          {event?.groomName} &nbsp;
          <span style={{ display:'inline-block', animation:'hb2 1.6s infinite' }}>💚</span>
          &nbsp; {event?.brideName}
        </div>
        <div style={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'clamp(0.6rem,1.8vw,0.7rem)', color:'rgba(74,110,68,0.45)', marginTop:'0.7rem', letterSpacing:'3px' }}>
          25 · 12 · 2026 &nbsp;·&nbsp; CHENNAI
        </div>
      </motion.div>
      <BotanicalLeft />
      <BotanicalRight />
    </div>
  )
}

function GoldDiv() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', margin:'0.9rem auto', maxWidth:200 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }} />
      <div style={{ width:5, height:5, border:'1.5px solid #c9922a', transform:'rotate(45deg)' }} />
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }} />
    </div>
  )
}
function BotanicalLeft() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, zIndex:1, width:'clamp(100px,28vw,160px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 160 220" style={{ width:'100%', overflow:'visible' }}>
        <ellipse cx="50" cy="160" rx="45" ry="18" fill="#7aac72" transform="rotate(-30,50,160)" opacity="0.8"/>
        <ellipse cx="70" cy="180" rx="50" ry="17" fill="#6a9e62" transform="rotate(-15,70,180)" opacity="0.7"/>
        <ellipse cx="30" cy="200" rx="42" ry="14" fill="#5e9458" transform="rotate(-45,30,200)" opacity="0.65"/>
        {[[55,148],[35,165],[75,160]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j)=><ellipse key={j} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6} rx="4" ry="2.5" transform={`rotate(${a})`} fill="white" opacity="0.9"/>)}
            <circle cx="0" cy="0" r="3" fill="#f5e4b0"/>
          </g>
        ))}
      </svg>
    </div>
  )
}
function BotanicalRight() {
  return (
    <div style={{ position:'absolute', bottom:0, right:0, zIndex:1, width:'clamp(100px,28vw,160px)', pointerEvents:'none' }}>
      <svg viewBox="0 0 160 220" style={{ width:'100%', overflow:'visible', transform:'scaleX(-1)' }}>
        <ellipse cx="50" cy="160" rx="45" ry="18" fill="#7aac72" transform="rotate(-30,50,160)" opacity="0.8"/>
        <ellipse cx="70" cy="180" rx="50" ry="17" fill="#6a9e62" transform="rotate(-15,70,180)" opacity="0.7"/>
        <ellipse cx="30" cy="200" rx="42" ry="14" fill="#5e9458" transform="rotate(-45,30,200)" opacity="0.65"/>
        {[[55,148],[35,165],[75,160]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,72,144,216,288].map((a,j)=><ellipse key={j} cx={Math.cos(a*Math.PI/180)*6} cy={Math.sin(a*Math.PI/180)*6} rx="4" ry="2.5" transform={`rotate(${a})`} fill="white" opacity="0.9"/>)}
            <circle cx="0" cy="0" r="3" fill="#f5e4b0"/>
          </g>
        ))}
      </svg>
    </div>
  )
}
