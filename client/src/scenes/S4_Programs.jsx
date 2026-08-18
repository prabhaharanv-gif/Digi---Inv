import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

const COLORS = ['#c9922a','#8b4513','#5c3000','#d4a843']

export default function S4_Programs() {
  const { event } = useGuest()
  const programs = event?.programs || []
  const [open, setOpen] = useState(null)

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}}
        style={{ position:'relative', zIndex:2, width:'100%', maxWidth:460, padding:'1.5rem 1.5rem' }}>

        <div style={{ textAlign:'center', marginBottom:'1.5rem' }}>
          <div style={{ fontFamily:"'Cinzel',serif", color:'#4a2000', fontWeight:700, fontSize:'clamp(0.45rem,1.4vw,0.55rem)', letterSpacing:'5px' }}>
            ✦ &nbsp; CELEBRATIONS &nbsp; ✦
          </div>
          <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.8rem,6vw,3rem)', color:'#4a2000', marginTop:'0.2rem', textShadow:'0 1px 8px rgba(44,74,40,0.1)' }}>
            Wedding Programs
          </div>
          <GoldLine />
        </div>

        {programs.map((p, i) => (
          <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.1,duration:0.5}}
            style={{ display:'flex', alignItems:'stretch' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginRight:'1rem', flexShrink:0 }}>
              <button onClick={() => setOpen(open===i?null:i)} style={{
                width:14, height:14, borderRadius:'50%', padding:0,
                background: open===i ? COLORS[i%4] : 'white',
                border:`2px solid ${COLORS[i%4]}`,
                boxShadow: open===i ? `0 0 10px ${COLORS[i%4]}88` : '0 2px 6px rgba(44,74,40,0.15)',
                flexShrink:0, marginTop:4, cursor:'pointer', transition:'all 0.3s',
              }}/>
              {i < programs.length-1 && <div style={{ width:1, flex:1, minHeight:28, background:`linear-gradient(180deg,${COLORS[i%4]}60,${COLORS[(i+1)%4]}40)` }}/>}
            </div>
            <div style={{ paddingBottom:'1.3rem', flex:1, cursor:'pointer' }} onClick={() => setOpen(open===i?null:i)}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'clamp(0.78rem,2.2vw,0.92rem)', color:'#4a2000', letterSpacing:'1px' }}>
                {p.event}
              </div>
              <div style={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'0.72rem', color:COLORS[i%4], marginTop:'0.1rem' }}>
                {p.date} &nbsp;·&nbsp; {p.time}
              </div>
              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:0.3}} style={{overflow:'hidden'}}>
                    <div style={{ margin:'0.5rem 0 0', padding:'0.7rem 1rem', background:'rgba(255,255,255,0.55)', border:`1px solid ${COLORS[i%4]}44`, borderRadius:8,
                      fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(0.8rem,2.2vw,0.92rem)', color:'#3d1a00', lineHeight:1.6 }}>
                      <span style={{ fontFamily:"'Cinzel',serif", fontStyle:'normal', fontSize:'0.6rem', color:'#c9922a', letterSpacing:'1px' }}>{p.venue}</span><br/>
                      {p.desc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        <div style={{ textAlign:'center', fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'0.6rem', color:'rgba(61,26,0,0.78)', letterSpacing:'2px' }}>
          TAP ANY EVENT FOR DETAILS
        </div>
      </motion.div>
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
