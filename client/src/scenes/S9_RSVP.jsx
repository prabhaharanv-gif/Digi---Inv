import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

export default function S9_RSVP({ onNext }) {
  const { guest, token } = useGuest()
  const [step, setStep] = useState('initial')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  async function submitRsvp(status,a=0,c=0) {
    setSubmitting(true)
    try { await fetch(`/api/rsvp/${token}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({status,adults:a,children:c})}) } catch {}
    setSubmitting(false)
  }
  async function handleNo() { await submitRsvp('no'); setStep('done-no') }
  async function handleConfirm() { await submitRsvp('yes',adults,children); setStep('done-yes'); setTimeout(()=>onNext(),2800) }

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden', position:'relative', background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.5) 0%,transparent 70%)', pointerEvents:'none' }} />
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}}
        style={{ position:'relative', zIndex:2, textAlign:'center', padding:'2rem 1.5rem', width:'100%', maxWidth:400 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:'#4a2000', fontWeight:700, fontSize:'clamp(0.45rem,1.4vw,0.55rem)', letterSpacing:'5px', marginBottom:'0.3rem' }}>✦ &nbsp; RSVP &nbsp; ✦</div>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2rem,7vw,3.5rem)', color:'#4a2000', lineHeight:1.1, textShadow:'0 1px 8px rgba(44,74,40,0.1)' }}>Will you join us?</div>
        <GoldDiv />
        <AnimatePresence mode="wait">
          {step==='initial' && (
            <motion.div key="init" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}} transition={{duration:0.3}}>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <GreenButton onClick={()=>setStep('count')}>YES, I'LL BE THERE 💚</GreenButton>
                <GhostButton onClick={handleNo}>SORRY, I CAN'T ATTEND</GhostButton>
              </div>
            </motion.div>
          )}
          {step==='count' && (
            <motion.div key="count" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}} transition={{duration:0.3}}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'#3d1a00', fontSize:'clamp(0.9rem,2.8vw,1.1rem)', marginBottom:'1.2rem' }}>How many are joining you?</div>
              {[['ADULTS',adults,setAdults,1],['CHILDREN',children,setChildren,0]].map(([lbl,val,set,min]) => (
                <div key={lbl} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.8rem 1.1rem', marginBottom:'0.75rem', border:'1px solid rgba(201,146,42,0.25)', borderRadius:8, background:'rgba(255,255,255,0.55)' }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(0.6rem,1.8vw,0.7rem)', letterSpacing:'2px', color:'#3d1a00' }}>{lbl}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'1.1rem' }}>
                    <CountBtn onClick={()=>set(Math.max(min,val-1))}>−</CountBtn>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, color:'#4a2000', minWidth:22, textAlign:'center', fontSize:'1rem' }}>{val}</span>
                    <CountBtn onClick={()=>set(val+1)}>+</CountBtn>
                  </div>
                </div>
              ))}
              <GreenButton onClick={handleConfirm} disabled={submitting}>{submitting?'CONFIRMING…':'CONFIRM MY ATTENDANCE'}</GreenButton>
            </motion.div>
          )}
          {step==='done-yes' && (
            <motion.div key="yes" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.6}}>
              <div style={{ fontSize:'2.5rem', margin:'0.5rem 0' }}>🎉</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(1rem,3vw,1.2rem)', color:'#3d1a00', lineHeight:1.8 }}>
                Wonderful! We're so excited to celebrate with you.
                <div style={{ fontFamily:"'Lato',sans-serif", fontStyle:'normal', fontWeight:300, fontSize:'0.75rem', color:'#5c2800', marginTop:'0.4rem' }}>{adults} adult{adults!==1?'s':''} · {children} child{children!==1?'ren':''}</div>
              </div>
            </motion.div>
          )}
          {step==='done-no' && (
            <motion.div key="no" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.6}}>
              <div style={{ fontSize:'2.5rem', margin:'0.5rem 0' }}>😢</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(1rem,3vw,1.2rem)', color:'#3d1a00', lineHeight:1.8 }}>
                We'll miss you dearly, {guest?.name}.
                <div style={{ fontSize:'0.85em', color:'#5c2800', marginTop:'0.4rem' }}>Thank you for letting us know.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <BottomLeaves />
    </div>
  )
}
function GreenButton({onClick,children,disabled}) {
  return <button onClick={onClick} disabled={disabled} style={{ width:'100%', padding:'clamp(0.75rem,2.5vw,1rem) 1.5rem', background:'linear-gradient(135deg,#5c2800,#8b4513,#c47020)', color:'white', borderRadius:'50px', fontFamily:"'Cinzel',serif", fontSize:'clamp(0.6rem,1.8vw,0.7rem)', letterSpacing:'3px', fontWeight:600, boxShadow:'0 4px 20px rgba(61,107,56,0.35)', border:'none', cursor:disabled?'not-allowed':'pointer', opacity:disabled?0.7:1, transition:'all 0.3s' }}>{children}</button>
}
function GhostButton({onClick,children}) {
  return <button onClick={onClick} style={{ width:'100%', padding:'clamp(0.75rem,2.5vw,1rem) 1.5rem', background:'transparent', color:'rgba(61,26,0,0.82)', border:'1px solid rgba(61,107,56,0.3)', borderRadius:'50px', fontFamily:"'Cinzel',serif", fontSize:'clamp(0.6rem,1.8vw,0.7rem)', letterSpacing:'3px', cursor:'pointer', transition:'all 0.3s' }}>{children}</button>
}
function CountBtn({onClick,children}) {
  return <button onClick={onClick} style={{ width:30, height:30, borderRadius:'50%', background:'rgba(201,146,42,0.12)', border:'1px solid rgba(201,146,42,0.4)', color:'#c9922a', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>{children}</button>
}
function GoldDiv() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', margin:'0.9rem auto 1.4rem', maxWidth:200 }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#c9922a)' }} />
      <div style={{ width:5, height:5, border:'1.5px solid #c9922a', transform:'rotate(45deg)' }} />
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#c9922a,transparent)' }} />
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
