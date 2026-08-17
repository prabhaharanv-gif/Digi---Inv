import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

export default function S7_Gallery() {
  const { event } = useGuest()
  const gallery = event?.gallery || []
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const go = (i) => { setDir(i>idx?1:-1); setIdx((i+gallery.length)%gallery.length) }
  const variants = { enter:d=>({x:d>0?'100%':'-100%',opacity:0}), center:{x:0,opacity:1}, exit:d=>({x:d>0?'-100%':'100%',opacity:0}) }

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1.5rem 1.2rem' }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ textAlign:'center', marginBottom:'1rem', zIndex:2 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:'#4a2800', fontWeight:700, fontSize:'clamp(0.45rem,1.4vw,0.55rem)', letterSpacing:'5px' }}>✦ &nbsp; OUR MOMENTS &nbsp; ✦</div>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.8rem,5vw,2.8rem)', color:'#2c4a28', textShadow:'0 1px 8px rgba(44,74,40,0.1)' }}>Cherished Memories</div>
      </div>
      {/* Gold border frame */}
      <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:460, padding:2.5, background:'linear-gradient(135deg,#b8860b,#f9f0d0,#d4a843,#8b6508)', borderRadius:10, flexShrink:0 }}>
        <div style={{ borderRadius:8, overflow:'hidden', aspectRatio:'4/3', position:'relative' }}>
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div key={idx} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:0.4,ease:[0.25,0.46,0.45,0.94]}}
              style={{ position:'absolute', inset:0, background:gallery[idx]?.bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <div style={{ fontSize:'clamp(2.5rem,10vw,4rem)' }}>{gallery[idx]?.emoji}</div>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.5rem 1rem 0.8rem', background:'linear-gradient(0deg,rgba(44,74,40,0.55),transparent)', fontFamily:"'Cinzel',serif", fontSize:'clamp(0.55rem,1.8vw,0.68rem)', letterSpacing:'2px', color:'rgba(240,248,236,0.9)', textAlign:'center' }}>
                {gallery[idx]?.label}
              </div>
              <button onClick={()=>go(idx-1)} style={{ position:'absolute', left:'0.5rem', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.4)', border:'1px solid rgba(201,146,42,0.4)', color:'#2c4a28', width:32, height:32, borderRadius:'50%', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}>‹</button>
              <button onClick={()=>go(idx+1)} style={{ position:'absolute', right:'0.5rem', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.4)', border:'1px solid rgba(201,146,42,0.4)', color:'#2c4a28', width:32, height:32, borderRadius:'50%', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}>›</button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div style={{ display:'flex', gap:'0.55rem', marginTop:'0.8rem', zIndex:2 }}>
        {gallery.map((item,i) => (
          <button key={i} onClick={()=>go(i)} style={{ width:'clamp(44px,11vw,56px)', height:'clamp(44px,11vw,56px)', borderRadius:6, padding:i===idx?2:1, background:i===idx?'linear-gradient(135deg,#b8860b,#f9f0d0,#d4a843)':'rgba(255,255,255,0.4)', border:i===idx?'none':'1px solid rgba(201,146,42,0.25)', cursor:'pointer', transition:'all 0.2s' }}>
            <div style={{ width:'100%', height:'100%', borderRadius:4, background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>{item.emoji}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop:'0.5rem', fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'0.58rem', letterSpacing:'3px', color:'rgba(26,61,24,0.7)', zIndex:2 }}>{idx+1} / {gallery.length}</div>
    </div>
  )
}
