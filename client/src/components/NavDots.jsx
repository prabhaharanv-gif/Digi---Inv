import React from 'react'
export default function NavDots({ total, current, goTo }) {
  return (
    <div style={{
      position:'fixed', bottom:'1.2rem', left:'50%', transform:'translateX(-50%)',
      display:'flex', gap:'7px', alignItems:'center', zIndex:100,
      background:'rgba(255,255,255,0.75)', backdropFilter:'blur(10px)',
      padding:'8px 16px', borderRadius:'50px',
      border:'1.5px solid rgba(160,108,16,0.35)',
      boxShadow:'0 4px 16px rgba(26,61,24,0.18)',
    }}>
      {Array.from({length:total}).map((_,i) => (
        <button key={i} onClick={()=>goTo(i)} aria-label={`Scene ${i+1}`} style={{
          width: i===current ? 22 : 7, height:7, borderRadius:'4px',
          background: i===current ? 'linear-gradient(90deg,#6b3a00,#a06c10)' : 'rgba(26,61,24,0.3)',
          border:'none', cursor:'pointer',
          transition:'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)', padding:0,
          boxShadow: i===current ? '0 0 6px rgba(160,108,16,0.5)' : 'none',
        }}/>
      ))}
    </div>
  )
}
