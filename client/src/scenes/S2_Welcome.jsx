import React from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'
import { useCountdown } from '../hooks/useCountdown'

/* ── Animated countdown digit ────────────────────────────────────────── */
function CountDigit({ value, label }) {
  return (
    <div style={{ textAlign:'center' }}>
      <motion.div
        key={value}
        initial={{ y: -20, opacity:0, scale:0.8 }}
        animate={{ y: 0,   opacity:1, scale:1 }}
        transition={{ type:'spring', stiffness:300, damping:20 }}
        style={{
          fontFamily:"'Playfair Display',serif", fontWeight:700,
          fontSize:'clamp(1.4rem,5vw,2.2rem)', color:'#4a2000',
          background:'rgba(255,255,255,0.65)',
          border:'1px solid rgba(201,146,42,0.35)',
          borderRadius:10, padding:'clamp(0.3rem,1vw,0.5rem) clamp(0.5rem,2vw,0.9rem)',
          minWidth:'clamp(48px,13vw,68px)',
          boxShadow:'0 4px 16px rgba(201,146,42,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
          backdropFilter:'blur(6px)',
          position:'relative', overflow:'hidden',
        }}
      >
        {/* Shine sweep */}
        <motion.div
          animate={{ x:['-100%','200%'] }}
          transition={{ duration:2.5, repeat:Infinity, ease:'linear', repeatDelay:1 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.4) 50%,transparent 65%)', pointerEvents:'none' }}
        />
        {value}
      </motion.div>
      <div style={{ fontFamily:"'Cinzel',serif", fontWeight:400, fontSize:'0.5rem',
        letterSpacing:'2px', color:'#c9922a', marginTop:'0.35rem' }}>
        {label}
      </div>
    </div>
  )
}

/* ── Main ────────────────────────────────────────────────────────────── */
export default function S2_Welcome() {
  const { event } = useGuest()
  const time = useCountdown(event?.dateISO || '2026-12-25T09:30:00')

  const container = { hidden:{}, show:{ transition:{ staggerChildren:0.18 } } }
  const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative',
      background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)' }}>

      {/* Ambient glow */}
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)',
        width:'70%', height:'50%', borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }}/>

      {/* Animated side petals */}
      {[{side:'left',x:-60},{side:'right',x:60}].map(({side,x})=>(
        <motion.div key={side} initial={{x,opacity:0}} animate={{x:0,opacity:0.6}} transition={{duration:1.5,ease:[0.22,1,0.36,1]}}
          style={{ position:'absolute', top:'20%', [side]:'-1rem', width:'clamp(60px,15vw,100px)', pointerEvents:'none', zIndex:1 }}>
          <svg viewBox="0 0 60 120" style={{ width:'100%', transform:side==='right'?'scaleX(-1)':'none' }}>
            <path d="M50,10 Q60,60 50,110 Q30,90 10,60 Q30,30 50,10Z" fill="#4a8c40" opacity=".7"/>
            <path d="M50,10 Q50,60 50,110" stroke="#3d7835" strokeWidth=".8" fill="none" opacity=".5"/>
            <ellipse cx="35" cy="45" rx="8" ry="4" fill="white" opacity=".4" transform="rotate(-30,35,45)"/>
            <ellipse cx="30" cy="70" rx="8" ry="4" fill="white" opacity=".4" transform="rotate(-20,30,70)"/>
          </svg>
        </motion.div>
      ))}

      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', position:'relative', zIndex:2 }}>
        <motion.div variants={container} initial="hidden" animate="show"
          style={{ textAlign:'center', padding:'2rem 1.5rem', width:'100%', maxWidth:520 }}>

          <motion.div variants={fadeUp}>
            <div style={{ fontFamily:"'Cinzel',serif", color:'#4a2000', fontWeight:700,
              fontSize:'clamp(0.45rem,1.4vw,0.58rem)', letterSpacing:'5px', marginBottom:'0.5rem' }}>
              ✦ &nbsp; WEDDING INVITATION &nbsp; ✦
            </div>
          </motion.div>

          <motion.div variants={fadeUp} style={{ margin:'1rem 0 0.4rem' }}>
            <motion.div animate={{ y:[0,-4,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2.2rem,8vw,4.5rem)',
                color:'#4a2000', lineHeight:1.05, textShadow:'0 2px 10px rgba(44,74,40,0.12)' }}>
              {event?.groomName}
            </motion.div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'#c9922a',
              fontSize:'clamp(0.85rem,2vw,1.1rem)', margin:'0.1rem 0', letterSpacing:'2px' }}>and</div>
            <motion.div animate={{ y:[0,-4,0] }} transition={{ duration:4, delay:0.5, repeat:Infinity, ease:'easeInOut' }}
              style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2.2rem,8vw,4.5rem)',
                color:'#4a2000', lineHeight:1.05, textShadow:'0 2px 10px rgba(44,74,40,0.12)' }}>
              {event?.brideName}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic',
              fontSize:'clamp(0.9rem,2.5vw,1.1rem)', color:'#3d1a00', marginBottom:'0.3rem' }}>
              Are getting married
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', margin:'0.8rem auto', maxWidth:240 }}>
              <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }}/>
              <motion.div animate={{ rotate:360 }} transition={{ duration:8, repeat:Infinity, ease:'linear' }}
                style={{ width:6, height:6, border:'1.5px solid #c9922a' }}/>
              <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }}/>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:'clamp(0.85rem,2.5vw,1.1rem)', color:'#3d1a00', letterSpacing:'2px' }}>
              {event?.date || '25 DECEMBER 2026'}
            </div>
            <div style={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:'0.82rem',
              color:'#5c2800', marginTop:'0.2rem' }}>
              {event?.venue}, Chennai
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={fadeUp}
            style={{ display:'flex', justifyContent:'center', gap:'clamp(0.6rem,2.5vw,1.4rem)', marginTop:'1.6rem' }}>
            {[['days','DAYS'],['hours','HRS'],['mins','MINS'],['secs','SECS']].map(([k,l])=>(
              <CountDigit key={k} value={time[k]} label={l}/>
            ))}
          </motion.div>

          {/* Gold diya icon */}
          <motion.div variants={fadeUp} style={{ marginTop:'1rem' }}>
            <motion.div animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}
              style={{ fontSize:'1.4rem' }}>🪔</motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom leaves */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, pointerEvents:'none', zIndex:1 }}>
        <svg viewBox="0 0 800 80" preserveAspectRatio="none" style={{ width:'100%', height:'100%' }}>
          <ellipse cx="100" cy="75" rx="90" ry="25" fill="#7aac72" opacity="0.5"/>
          <ellipse cx="700" cy="75" rx="90" ry="25" fill="#7aac72" opacity="0.5"/>
          <ellipse cx="400" cy="78" rx="140" ry="20" fill="#8ec485" opacity="0.35"/>
        </svg>
      </div>
    </div>
  )
}
