import React from 'react'
export default function NavDots({ total, current, goTo }) {
  return (
    <div style={{
      position:'fixed', bottom:'1.2rem', left:'50%', transform:'translateX(-50%)',
      display:'flex', gap:'7px', alignItems:'center', zIndex:100,
      background:'rgba(255,255,255,0.65)', backdropFilter:'blur(10px)',
      padding:'8px 16px', borderRadius:'50px',
      border:'1px solid rgba(201,146,42,0.25)',
      boxShadow:'0 4px 16px rgba(44,74,40,0.12)',
    }}>
      {Array.from({length:total}).map((_,i) => (
        <button key={i} onClick={()=>goTo(i)} aria-label={`Scene ${i+1}`} style={{
          width: i===current ? 20 : 6, height:6, borderRadius:'3px',
          background: i===current ? 'linear-gradient(90deg,#c9922a,#d4a843)' : 'rgba(61,107,56,0.25)',
          border:'none', cursor:'pointer', transition:'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)', padding:0,
          boxShadow: i===current ? '0 0 6px rgba(201,146,42,0.4)' : 'none',
        }}/>
      ))}
    </div>
  )
}
