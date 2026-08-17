import React from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

export default function S3_Families() {
  const { event } = useGuest()
  const families = event?.families || []

  return (
    <SceneBg>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}}
        style={{ position:'relative', zIndex:2, textAlign:'center', padding:'1.5rem 1.2rem', width:'100%', maxWidth:480 }}>

        <GoldLabel>✦ &nbsp; WITH THE BLESSINGS OF OUR FAMILIES &nbsp; ✦</GoldLabel>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2rem,6vw,3.2rem)', color:'#2c4a28', margin:'0.3rem 0 1.2rem', textShadow:'0 1px 8px rgba(44,74,40,0.1)' }}>
          Our Families
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(0.8rem,2vw,1.2rem)', marginTop:'0.5rem' }}>
          {families.map((f, i) => (
            <motion.div key={i} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.12,duration:0.6}}>
              <div style={{
                background:'rgba(255,255,255,0.55)', backdropFilter:'blur(6px)',
                border:'1px solid rgba(201,146,42,0.25)', borderRadius:12,
                padding:'clamp(0.9rem,3vw,1.2rem) 0.8rem', textAlign:'center',
                boxShadow:'0 4px 16px rgba(44,74,40,0.08)',
                position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,transparent,#c9922a,transparent)' }} />
                <div style={{ fontSize:'clamp(1.4rem,5vw,2rem)', marginBottom:'0.5rem' }}>{f.emoji}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:500, fontSize:'clamp(0.65rem,2vw,0.8rem)', color:'#2c4a28', letterSpacing:'1px' }}>
                  {f.name}
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.62rem,1.8vw,0.72rem)', color:'#7aac72', marginTop:'0.2rem' }}>
                  {f.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <GoldDivider />
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.78rem,2.2vw,0.92rem)', color:'#4a6e44', lineHeight:1.7 }}>
          Son of {families[0]?.name} & {families[1]?.name}
          &nbsp;·&nbsp; Daughter of {families[2]?.name} & {families[3]?.name}
        </div>
      </motion.div>
      <CornerFlora />
    </SceneBg>
  )
}

function SceneBg({children}) {
  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#dff0d8 0%,#c8dbc0 40%,#b8d4b0 100%)' }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', position:'relative', zIndex:2 }}>{children}</div>
    </div>
  )
}
function GoldLabel({children}) {
  return <div style={{ fontFamily:"'Cinzel',serif", color:'#c9922a', fontSize:'clamp(0.4rem,1.3vw,0.52rem)', letterSpacing:'4px', marginBottom:'0.3rem' }}>{children}</div>
}
function GoldDivider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', margin:'0.9rem auto', maxWidth:220 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }} />
      <div style={{ width:5, height:5, border:'1.5px solid #c9922a', transform:'rotate(45deg)' }} />
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }} />
    </div>
  )
}
function CornerFlora() {
  return (
    <>
      <div style={{ position:'absolute', top:0, left:0, width:80, height:80, pointerEvents:'none', zIndex:1 }}>
        <svg viewBox="0 0 80 80" style={{ width:'100%' }}>
          <ellipse cx="10" cy="60" rx="40" ry="14" fill="#8ec485" transform="rotate(-40,10,60)" opacity="0.6"/>
          <ellipse cx="20" cy="20" rx="30" ry="10" fill="#7aac72" transform="rotate(-60,20,20)" opacity="0.5"/>
        </svg>
      </div>
      <div style={{ position:'absolute', top:0, right:0, width:80, height:80, pointerEvents:'none', zIndex:1 }}>
        <svg viewBox="0 0 80 80" style={{ width:'100%', transform:'scaleX(-1)' }}>
          <ellipse cx="10" cy="60" rx="40" ry="14" fill="#8ec485" transform="rotate(-40,10,60)" opacity="0.6"/>
          <ellipse cx="20" cy="20" rx="30" ry="10" fill="#7aac72" transform="rotate(-60,20,20)" opacity="0.5"/>
        </svg>
      </div>
    </>
  )
}
