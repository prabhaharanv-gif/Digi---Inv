import React from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

const INFO = [
  { label:'LANDMARK', val:'Near T. Nagar Bus Terminus' },
  { label:'PARKING',  val:'Valet parking at entrance' },
  { label:'CAPACITY', val:'1,200 guests' },
  { label:'CONTACT',  val:'+91 98765 43210' },
]

export default function S8_Venue() {
  const { event } = useGuest()
  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#dff0d8 0%,#c8dbc0 40%,#b8d4b0 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}}
        style={{ position:'relative', zIndex:2, textAlign:'center', padding:'1.5rem 1.5rem', width:'100%', maxWidth:480 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:'#c9922a', fontSize:'clamp(0.45rem,1.4vw,0.55rem)', letterSpacing:'5px' }}>✦ &nbsp; THE VENUE &nbsp; ✦</div>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2rem,6.5vw,3.5rem)', color:'#2c4a28', marginTop:'0.3rem', lineHeight:1.1, textShadow:'0 1px 8px rgba(44,74,40,0.1)' }}>
          {event?.venue}
        </div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.82rem,2.3vw,1rem)', color:'#4a6e44', marginTop:'0.5rem', lineHeight:1.7 }}>
          {event?.venueAddress}
        </div>
        <GoldDiv />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.65rem' }}>
          {INFO.map((item,i) => (
            <motion.div key={item.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.08,duration:0.5}}>
              <div style={{ background:'rgba(255,255,255,0.55)', backdropFilter:'blur(4px)', border:'1px solid rgba(201,146,42,0.22)', borderRadius:8, padding:'clamp(0.6rem,2vw,0.8rem)', boxShadow:'0 2px 10px rgba(44,74,40,0.06)' }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(0.45rem,1.4vw,0.55rem)', letterSpacing:'2px', color:'#c9922a', marginBottom:'0.2rem' }}>{item.label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(0.75rem,2.2vw,0.88rem)', color:'#2c4a28' }}>{item.val}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <a href={event?.venueMaps||'#'} target="_blank" rel="noreferrer" style={{
          display:'inline-flex', alignItems:'center', gap:'0.5rem', marginTop:'1.4rem',
          padding:'clamp(0.65rem,2vw,0.85rem) clamp(1.5rem,4vw,2rem)',
          background:'linear-gradient(135deg,#3d6b38,#5e9458)', color:'white',
          borderRadius:'50px', fontFamily:"'Cinzel',serif", fontSize:'clamp(0.55rem,1.8vw,0.65rem)', letterSpacing:'3px',
          boxShadow:'0 4px 16px rgba(61,107,56,0.35)',
        }}>
          📍 &nbsp; GET DIRECTIONS
        </a>
      </motion.div>
    </div>
  )
}
function GoldDiv() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', margin:'0.9rem auto', maxWidth:220 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }} />
      <div style={{ width:5, height:5, border:'1.5px solid #c9922a', transform:'rotate(45deg)' }} />
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }} />
    </div>
  )
}
