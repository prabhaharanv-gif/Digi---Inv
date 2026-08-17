import React, { useState, useRef } from 'react'
export default function MusicPlayer() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)
  function startAmbient(ctx) {
    [261.63,329.63,392,523.25].forEach((freq,i) => {
      const osc=ctx.createOscillator(), gain=ctx.createGain(), lfo=ctx.createOscillator(), lg=ctx.createGain()
      osc.type='sine'; osc.frequency.value=freq; lfo.type='sine'; lfo.frequency.value=0.09+i*0.03; lg.gain.value=0.005
      lfo.connect(lg); lg.connect(gain.gain); osc.connect(gain); gain.connect(ctx.destination)
      gain.gain.value=0.02-i*0.003; osc.start(); lfo.start()
    })
  }
  function toggle() {
    if(!ctxRef.current) { const ctx=new(window.AudioContext||window.webkitAudioContext)(); ctxRef.current=ctx; startAmbient(ctx); setOn(true); return }
    if(on){ctxRef.current.suspend();setOn(false)}else{ctxRef.current.resume();setOn(true)}
  }
  return (
    <button onClick={toggle} style={{
      position:'fixed', top:'1rem', right:'1rem', zIndex:200,
      background:'rgba(255,255,255,0.65)', backdropFilter:'blur(10px)',
      border:'1px solid rgba(201,146,42,0.3)',
      boxShadow:'0 4px 12px rgba(44,74,40,0.12)',
      color:'#3d6b38', padding:'0.4rem 0.85rem', borderRadius:'50px',
      fontSize:'0.62rem', letterSpacing:'2px', fontFamily:"'Cinzel',serif",
      display:'flex', alignItems:'center', gap:'5px',
    }}>
      {on?'♪':'♩'} &nbsp;MUSIC
    </button>
  )
}
