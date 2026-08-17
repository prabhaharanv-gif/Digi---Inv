import React from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

export default function S6_FoodMenu() {
  const { event } = useGuest()
  const menu = event?.menu || []
  return (
    <SceneBg>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}}
        style={{ position:'relative', zIndex:2, width:'100%', maxWidth:480, padding:'1.5rem 1.2rem' }}>
        <div style={{ textAlign:'center', marginBottom:'1.2rem' }}>
          <div style={{ fontFamily:"'Cinzel',serif", color:'#4a2800', fontWeight:700, fontSize:'clamp(0.45rem,1.4vw,0.55rem)', letterSpacing:'5px' }}>✦ &nbsp; CULINARY CELEBRATIONS &nbsp; ✦</div>
          <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.8rem,6vw,3rem)', color:'#2c4a28', textShadow:'0 1px 8px rgba(44,74,40,0.1)' }}>The Royal Feast</div>
          <GoldLine />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(0.6rem,2vw,0.9rem)' }}>
          {menu.map((item, i) => (
            <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.07,duration:0.5}} whileHover={{y:-3,transition:{duration:0.2}}}>
              <div style={{ background:'rgba(255,255,255,0.6)', backdropFilter:'blur(6px)', border:'1px solid rgba(201,146,42,0.2)', borderRadius:10, padding:'clamp(0.75rem,2.5vw,1rem) 0.8rem', textAlign:'center', boxShadow:'0 3px 12px rgba(44,74,40,0.07)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:'15%', right:'15%', height:2, background:'linear-gradient(90deg,transparent,#c9922a,transparent)' }} />
                <div style={{ fontSize:'clamp(1.2rem,4vw,1.5rem)', marginBottom:'0.35rem' }}>{item.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'clamp(0.52rem,1.6vw,0.62rem)', letterSpacing:'1.5px', color:'#2c4a28' }}>{item.name.toUpperCase()}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.7rem,2vw,0.8rem)', color:'#2c5228', marginTop:'0.2rem' }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <BottomLeaves />
    </SceneBg>
  )
}

function SceneBg({children}) {
  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)' }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', position:'relative', zIndex:2 }}>{children}</div>
    </div>
  )
}
function GoldLine() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', margin:'0.5rem auto 0', maxWidth:200 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }}/>
      <div style={{ width:4, height:4, border:'1.5px solid #c9922a', transform:'rotate(45deg)' }}/>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }}/>
    </div>
  )
}
function BottomLeaves() {
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:70, pointerEvents:'none', zIndex:1 }}>
      <svg viewBox="0 0 800 70" preserveAspectRatio="none" style={{ width:'100%', height:'100%' }}>
        <ellipse cx="100" cy="65" rx="90" ry="22" fill="#7aac72" opacity="0.45"/>
        <ellipse cx="700" cy="65" rx="90" ry="22" fill="#7aac72" opacity="0.45"/>
        <ellipse cx="400" cy="68" rx="130" ry="18" fill="#8ec485" opacity="0.3"/>
      </svg>
    </div>
  )
}
