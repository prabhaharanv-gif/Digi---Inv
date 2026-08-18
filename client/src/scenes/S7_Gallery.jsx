import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

/* ─── Illustrated scenes (unchanged) ──────────────────────────────────── */
const GALLERY_DEFAULTS = [
  {
    label: 'The Couple · Pre-Wedding',
    sublabel: 'A love story begins',
    color1: '#1a0a02', color2: '#4a2a0a', accent: '#d4a843',
    icon: (
      <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stars bg */}
        {[[15,12],[140,18],[30,85],[145,80],[80,8]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1.2" fill="#f9f0d0" opacity={.4+i*.08}/>
        ))}
        {/* Bride */}
        <ellipse cx="58" cy="28" rx="13" ry="15" fill="#d4a843" opacity=".9"/>
        {/* veil */}
        <path d="M45 24 Q35 50 40 80" stroke="#f9f0d0" strokeWidth="2" fill="none" opacity=".45"/>
        <path d="M71 24 Q80 50 76 80" stroke="#f9f0d0" strokeWidth="2" fill="none" opacity=".45"/>
        <rect x="45" y="42" width="26" height="38" rx="5" fill="#d4a843" opacity=".8"/>
        {/* flower bouquet */}
        <circle cx="52" cy="82" r="6" fill="#7ab648" opacity=".7"/>
        <circle cx="58" cy="78" r="5" fill="#c9922a" opacity=".8"/>
        <circle cx="64" cy="82" r="6" fill="#7ab648" opacity=".7"/>
        {/* Groom */}
        <ellipse cx="102" cy="28" rx="13" ry="15" fill="#f9f0d0" opacity=".9"/>
        <rect x="89" y="42" width="26" height="38" rx="5" fill="#3d2000" opacity=".85"/>
        {/* suit lapels */}
        <path d="M102 42 L96 56 L102 54 L108 56 L102 42Z" fill="#f9f0d0" opacity=".3"/>
        {/* bow tie */}
        <path d="M98 44 L102 48 L106 44 L102 46Z" fill="#d4a843" opacity=".9"/>
        {/* holding hands */}
        <path d="M71 65 Q87 70 89 65" stroke="#e8c870" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".9"/>
        {/* floating heart */}
        <path d="M80 14 C80 10 75 8 73 12 C71 8 66 10 66 14 C66 19 73 25 73 25 C73 25 80 19 80 14Z" fill="#c9922a" opacity=".7"/>
        {/* ground shadow */}
        <ellipse cx="80" cy="83" rx="28" ry="4" fill="#000" opacity=".15"/>
      </svg>
    ),
  },
  {
    label: 'Mehendi Evening',
    sublabel: 'Henna, music & joy',
    color1: '#021202', color2: '#0d2d0a', accent: '#7ab648',
    icon: (
      <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* moonlight glow */}
        <circle cx="130" cy="18" r="14" fill="#f9f0d0" opacity=".12"/>
        <circle cx="130" cy="18" r="9" fill="#f9f0d0" opacity=".2"/>
        {/* large mehendi hand */}
        <path d="M55 85 C48 75 42 58 46 42 C49 30 56 26 60 30 C63 26 70 25 72 30 C75 25 83 25 84 33 C88 26 95 29 93 40 C96 31 104 34 101 46 C98 58 88 73 80 82 Z" fill="#7ab648" opacity=".85"/>
        {/* mehendi details */}
        <circle cx="72" cy="45" r="5" stroke="#d4a843" strokeWidth="1.5" fill="none" opacity=".9"/>
        <path d="M60 50 Q66 43 72 50" stroke="#d4a843" strokeWidth="1.5" fill="none" opacity=".9"/>
        <path d="M62 60 Q70 53 78 60" stroke="#d4a843" strokeWidth="1.5" fill="none" opacity=".9"/>
        <path d="M68 38 Q72 33 76 38" stroke="#c9922a" strokeWidth="1.5" fill="none" opacity=".9"/>
        {/* flower cluster */}
        {[{cx:115,cy:35,r:10,c:'#d4a843'},{cx:125,cy:50,r:8,c:'#c9922a'},{cx:108,cy:52,r:7,c:'#7ab648'}].map((f,i)=>(
          <g key={i}>
            {[0,60,120,180,240,300].map(a=>(
              <ellipse key={a} cx={f.cx+Math.cos(a*Math.PI/180)*f.r} cy={f.cy+Math.sin(a*Math.PI/180)*f.r}
                rx={f.r*.55} ry={f.r*.35} fill={f.c} opacity=".6"
                transform={`rotate(${a},${f.cx+Math.cos(a*Math.PI/180)*f.r},${f.cy+Math.sin(a*Math.PI/180)*f.r})`}/>
            ))}
            <circle cx={f.cx} cy={f.cy} r={f.r*.4} fill={f.c} opacity=".95"/>
          </g>
        ))}
        {/* sparkles */}
        {[[35,20],[140,65],[25,70],[148,22]].map(([x,y],i)=>(
          <path key={i} d={`M${x} ${y-5} L${x+1.5} ${y-1} L${x+5} ${y} L${x+1.5} ${y+1} L${x} ${y+5} L${x-1.5} ${y+1} L${x-5} ${y} L${x-1.5} ${y-1}Z`} fill="#f9f0d0" opacity=".7"/>
        ))}
      </svg>
    ),
  },
  {
    label: 'Engagement Ceremony',
    sublabel: 'Rings & promises',
    color1: '#0d0518', color2: '#2a0d3d', accent: '#c9922a',
    icon: (
      <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* starfield */}
        {[[20,15],[140,12],[35,80],[145,75],[80,5],[60,90],[110,85]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1.5" fill="#f9f0d0" opacity={.3+i*.07}/>
        ))}
        {/* interlinked rings — big and dramatic */}
        <circle cx="65" cy="48" r="26" stroke="#d4a843" strokeWidth="5" fill="none" opacity=".9"
          style={{filter:'drop-shadow(0 0 8px rgba(212,168,67,0.6))'}}/>
        <circle cx="95" cy="48" r="26" stroke="#f9f0d0" strokeWidth="5" fill="none" opacity=".85"
          style={{filter:'drop-shadow(0 0 8px rgba(249,240,208,0.5))'}}/>
        {/* diamond gems */}
        <polygon points="65,24 69,32 65,40 61,32" fill="#f9a825" opacity=".95"/>
        <polygon points="65,24 69,32 65,40 61,32" stroke="#fff" strokeWidth=".8" fill="none" opacity=".5"/>
        <polygon points="95,24 99,32 95,40 91,32" fill="#e8e0ff" opacity=".95"/>
        <polygon points="95,24 99,32 95,40 91,32" stroke="#fff" strokeWidth=".8" fill="none" opacity=".5"/>
        {/* diya */}
        <ellipse cx="130" cy="72" rx="10" ry="5" fill="#8b6508" opacity=".7"/>
        <ellipse cx="130" cy="70" rx="7" ry="3.5" fill="#d4a843" opacity=".6"/>
        <path d="M130 66 C130 58 136 50 130 42 C124 50 130 58 130 66Z" fill="#f9a825" opacity=".9"
          style={{filter:'drop-shadow(0 0 6px rgba(249,168,37,0.8))'}}/>
        <path d="M130 66 C130 60 133 55 130 50 C127 55 130 60 130 66Z" fill="#fff" opacity=".6"/>
        {/* petal scatter */}
        {[[28,55],[32,65],[145,40],[150,55],[40,30]].map(([x,y],i)=>(
          <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill="#c9922a" opacity=".45"
            transform={`rotate(${i*35},${x},${y})`}/>
        ))}
      </svg>
    ),
  },
  {
    label: 'Family Portrait',
    sublabel: 'Bound by love & tradition',
    color1: '#0d0a02', color2: '#2d2408', accent: '#b8860b',
    icon: (
      <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* warm background glow */}
        <radialGradient id="fg" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#d4a843" stopOpacity=".15"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <rect width="160" height="100" fill="url(#fg)"/>
        {/* 5 people: grandpa, grandma, groom, bride, child */}
        {[
          {x:18, y:32, ry:9, h:35, fill:'#c9922a', staff:true},
          {x:40, y:30, ry:9, h:35, fill:'#f9f0d0'},
          {x:80, y:22, ry:11, h:42, fill:'#d4a843', center:true},
          {x:118, y:26, ry:10, h:40, fill:'#e8d5b0'},
          {x:142, y:35, ry:7,  h:28, fill:'#f9f0d0', child:true},
        ].map((p,i)=>(
          <g key={i}>
            <ellipse cx={p.x} cy={p.y} rx={p.ry*.9} ry={p.ry} fill={p.fill} opacity=".9"/>
            <rect x={p.x-p.ry*.75} y={p.y+p.ry} width={p.ry*1.5} height={p.h} rx="4" fill={p.fill} opacity=".78"/>
            {p.staff && <line x1={p.x-p.ry*1.2} y1={p.y+5} x2={p.x-p.ry*1.2} y2={p.y+p.ry+p.h} stroke={p.fill} strokeWidth="2" opacity=".6"/>}
            {p.center && <path d={`M${p.x-6} ${p.y+p.ry+4} L${p.x} ${p.y+p.ry+12} L${p.x+6} ${p.y+p.ry+4}`} stroke="#f9f0d0" strokeWidth="1.5" fill="none" opacity=".5"/>}
          </g>
        ))}
        {/* linked arms */}
        <path d="M27 58 Q34 62 40 60" stroke="#e8c870" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".7"/>
        <path d="M49 56 Q64 62 69 58" stroke="#e8c870" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".7"/>
        <path d="M91 56 Q105 62 108 58" stroke="#e8c870" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".7"/>
        <path d="M127 60 Q134 64 135 62" stroke="#e8c870" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".7"/>
        {/* kolam base */}
        <ellipse cx="80" cy="90" rx="55" ry="5" fill="#c9922a" opacity=".18"/>
        <path d="M30 90 Q80 82 130 90" stroke="#c9922a" strokeWidth=".8" fill="none" opacity=".4"/>
        {/* corner stars */}
        {[[10,10],[150,10],[10,90],[150,90]].map(([x,y],i)=>(
          <path key={i} d={`M${x} ${y-4} L${x+1} ${y-1} L${x+4} ${y} L${x+1} ${y+1} L${x} ${y+4} L${x-1} ${y+1} L${x-4} ${y} L${x-1} ${y-1}Z`}
            fill="#d4a843" opacity=".55"/>
        ))}
      </svg>
    ),
  },
]

/* ─── Thumbnail ─────────────────────────────────────────────────────────── */
function Thumb({ item, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.94 }}
      style={{
        position: 'relative',
        width: 'clamp(50px,11vw,68px)',
        height: 'clamp(50px,11vw,68px)',
        borderRadius: 8, padding: 0,
        background: `linear-gradient(135deg,${item.color1},${item.color2})`,
        border: active ? '2.5px solid #d4a843' : '2px solid rgba(201,146,42,0.2)',
        boxShadow: active
          ? '0 0 0 3px rgba(212,168,67,0.3), 0 4px 14px rgba(44,74,40,0.2)'
          : '0 2px 8px rgba(44,74,40,0.12)',
        cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:3 }}>
        {React.cloneElement(item.icon, { style:{ width:'100%', height:'100%', opacity:0.9 } })}
      </div>
      {active && (
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(212,168,67,0.15),transparent)', borderRadius:6 }}/>
      )}
    </motion.button>
  )
}

/* ─── Corner kolam ──────────────────────────────────────────────────────── */
function Corner({ flip }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
      style={{ position:'absolute',
        top: flip?.includes('y') ? 'auto' : 8,
        bottom: flip?.includes('y') ? 8 : 'auto',
        left: flip?.includes('x') ? 'auto' : 8,
        right: flip?.includes('x') ? 8 : 'auto',
        opacity: 0.6,
        transform: flip ? `scale(${flip.includes('x')?-1:1},${flip.includes('y')?-1:1})` : 'none',
      }}>
      <path d="M3 3 L3 14 M3 3 L14 3" stroke="#d4a843" strokeWidth="1.5"/>
      <circle cx="3" cy="3" r="2.5" fill="#d4a843" opacity=".5"/>
      <path d="M3 9 Q9 3 15 3" stroke="#d4a843" strokeWidth=".8" fill="none" opacity=".4"/>
      <path d="M3 14 Q9 8 18 8 Q24 8 24 3" stroke="#d4a843" strokeWidth=".6" fill="none" opacity=".25"/>
    </svg>
  )
}

/* ─── Main ──────────────────────────────────────────────────────────────── */
export default function S7_Gallery() {
  const { event } = useGuest()
  const raw = event?.gallery || []
  const gallery = GALLERY_DEFAULTS.map((d, i) => ({ ...d, label: raw[i]?.label || d.label }))

  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const go = (i) => {
    const n = (i + gallery.length) % gallery.length
    setDir(n > idx ? 1 : -1); setIdx(n)
  }

  const variants = {
    enter:  (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  const cur = gallery[idx]

  return (
    <div style={{
      width:'100%', height:'100%', overflow:'hidden', position:'relative',
      background:'linear-gradient(160deg,#d6ead0 0%,#b8d4b0 45%,#9ec49a 100%)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'clamp(0.6rem,2vh,1.2rem) clamp(1rem,4vw,2rem)',
      gap:'clamp(0.4rem,1.5vh,0.75rem)',
    }}>

      {/* ambient light */}
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)',
        width:'80%', height:'50%', borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(255,255,255,0.4) 0%,transparent 70%)',
        pointerEvents:'none' }}/>

      {/* ── Heading ── */}
      <div style={{ textAlign:'center', zIndex:2 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:'#3d2000', fontWeight:700,
          fontSize:'clamp(0.4rem,1.2vw,0.5rem)', letterSpacing:'5px', opacity:.75, marginBottom:'0.2rem' }}>
          ✦ &nbsp;OUR MOMENTS&nbsp; ✦
        </div>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(1.7rem,4.5vw,2.8rem)',
          color:'#3d2000', textShadow:'0 2px 12px rgba(44,74,40,0.15)', lineHeight:1 }}>
          Cherished Memories
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          TV / FLAT-SCREEN UNIT
      ══════════════════════════════════════════════ */}
      <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:560, flexShrink:0 }}>

        {/* ── Outer TV body (dark bezel) ── */}
        <div style={{
          background:'linear-gradient(170deg,#2a2a2a 0%,#111 60%,#1a1a1a 100%)',
          borderRadius: '18px 18px 14px 14px',
          padding: '10px 10px 14px 10px',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.07)',
            '0 2px 0 rgba(255,255,255,0.04)',
            '0 20px 60px rgba(0,0,0,0.55)',
            '0 8px 24px rgba(0,0,0,0.4)',
            // Gold accent glow (subtle – matches invite palette)
            '0 0 40px rgba(212,168,67,0.08)',
          ].join(','),
        }}>

          {/* ── Thin gold accent stripe at top of bezel ── */}
          <div style={{
            position:'absolute', top:0, left:'15%', right:'15%', height:'2px',
            background:'linear-gradient(90deg,transparent,#d4a843 30%,#f9f0d0 50%,#d4a843 70%,transparent)',
            borderRadius:'0 0 4px 4px', opacity:.55,
          }}/>

          {/* ── Brand badge (top-center of bezel, above screen) ── */}
          <div style={{
            textAlign:'center', marginBottom:8,
            fontFamily:"'Cinzel',serif", fontSize:'0.35rem',
            letterSpacing:'4px', color:'rgba(255,255,255,0.25)', fontWeight:700,
          }}>
            ✦ VIJAY ❤ SANGEETHA ✦
          </div>

          {/* ── Screen ── */}
          <div style={{
            position:'relative', borderRadius:'6px', overflow:'hidden',
            aspectRatio:'16/9',
            // Inner screen bezel (slight inset shadow = depth)
            boxShadow:'inset 0 0 0 1px rgba(0,0,0,0.8), inset 0 2px 8px rgba(0,0,0,0.6)',
            // Screen glow matching current card color
            filter:`drop-shadow(0 0 18px ${cur.accent}22)`,
          }}>

            {/* Screen glare overlay */}
            <div style={{
              position:'absolute', inset:0, zIndex:10, pointerEvents:'none',
              background:'linear-gradient(140deg,rgba(255,255,255,0.07) 0%,transparent 50%)',
              borderRadius:6,
            }}/>
            {/* Subtle scanline texture */}
            <div style={{
              position:'absolute', inset:0, zIndex:10, pointerEvents:'none', borderRadius:6,
              backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)',
            }}/>

            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.div
                key={idx} custom={dir} variants={variants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration:0.4, ease:[0.25,0.46,0.45,0.94] }}
                style={{
                  position:'absolute', inset:0,
                  background:`linear-gradient(160deg,${cur.color1} 0%,${cur.color2} 100%)`,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                }}
              >
                {/* Corner kolam */}
                <Corner/>
                <Corner flip={['x']}/>
                <Corner flip={['y']}/>
                <Corner flip={['x','y']}/>

                {/* Illustrated scene */}
                <motion.div
                  initial={{ scale:0.88, opacity:0 }}
                  animate={{ scale:1, opacity:1 }}
                  transition={{ delay:0.1, duration:0.32, ease:'easeOut' }}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center',
                    width:'100%', paddingBottom:'3.5rem' }}
                >
                  {React.cloneElement(cur.icon, {
                    style:{ width:'72%', maxWidth:320, filter:'drop-shadow(0 6px 20px rgba(0,0,0,0.5))' }
                  })}
                </motion.div>

                {/* Caption */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  padding:'2.5rem 1.5rem 0.9rem',
                  background:'linear-gradient(0deg,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.25) 65%,transparent 100%)',
                }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(0.52rem,1.7vw,0.7rem)',
                    fontWeight:700, letterSpacing:'2.5px', color:'#f9f0d0', textAlign:'center',
                    textShadow:'0 1px 6px rgba(0,0,0,0.5)' }}>
                    {cur.label}
                  </div>
                  <div style={{ fontFamily:"'Lato',sans-serif", fontWeight:300,
                    fontSize:'clamp(0.4rem,1.2vw,0.54rem)', letterSpacing:'3px',
                    color:'rgba(249,240,208,0.6)', textAlign:'center', marginTop:'0.2rem' }}>
                    {cur.sublabel}
                  </div>
                </div>

                {/* Nav arrows */}
                {[{side:'left', action:()=>go(idx-1), icon:'‹'}, {side:'right', action:()=>go(idx+1), icon:'›'}].map(b=>(
                  <button key={b.side} onClick={b.action} style={{
                    position:'absolute', [b.side]:'0.8rem', top:'45%', transform:'translateY(-50%)',
                    width:34, height:34, borderRadius:'50%',
                    background:'rgba(0,0,0,0.38)', backdropFilter:'blur(8px)',
                    border:'1px solid rgba(249,240,208,0.25)',
                    color:'#f9f0d0', fontSize:'1.3rem', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'background 0.2s, border-color 0.2s',
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(212,168,67,0.35)';e.currentTarget.style.borderColor='rgba(212,168,67,0.6)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(0,0,0,0.38)';e.currentTarget.style.borderColor='rgba(249,240,208,0.25)'}}
                  >{b.icon}</button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Bottom bezel: power LED + subtle speaker dots ── */}
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'center',
            gap:'0.6rem', marginTop:10, position:'relative',
          }}>
            {/* Speaker grille left */}
            <div style={{ display:'flex', gap:3, opacity:.35 }}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{ width:2, height:8, borderRadius:2, background:'#888' }}/>
              ))}
            </div>
            {/* Power LED */}
            <div style={{
              width:7, height:7, borderRadius:'50%',
              background:'radial-gradient(circle,#4ade80,#16a34a)',
              boxShadow:'0 0 6px rgba(74,222,128,0.8)',
            }}/>
            {/* Speaker grille right */}
            <div style={{ display:'flex', gap:3, opacity:.35 }}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{ width:2, height:8, borderRadius:2, background:'#888' }}/>
              ))}
            </div>
          </div>
        </div>

        {/* ── TV Neck / Stand ── */}
        <div style={{
          margin:'0 auto', width:40, height:16,
          background:'linear-gradient(180deg,#222 0%,#333 100%)',
          boxShadow:'0 2px 6px rgba(0,0,0,0.4)',
          position:'relative', zIndex:1,
        }}/>
        {/* Stand base */}
        <div style={{
          margin:'0 auto', width:130, height:10,
          background:'linear-gradient(180deg,#2a2a2a 0%,#1a1a1a 100%)',
          borderRadius:'0 0 8px 8px',
          boxShadow:'0 4px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}/>
        {/* Stand shadow on floor */}
        <div style={{
          margin:'3px auto 0', width:110, height:5,
          background:'radial-gradient(ellipse,rgba(0,0,0,0.2) 0%,transparent 80%)',
        }}/>
      </div>

      {/* ── Thumbnail strip ── */}
      <div style={{ display:'flex', gap:'clamp(0.45rem,1.8vw,0.75rem)', zIndex:2, alignItems:'center' }}>
        {gallery.map((item,i) => (
          <Thumb key={i} item={item} active={i===idx} onClick={()=>go(i)} />
        ))}
      </div>

      {/* ── Progress pill-dots ── */}
      <div style={{ display:'flex', gap:'0.4rem', zIndex:2, alignItems:'center' }}>
        {gallery.map((_,i) => (
          <motion.div key={i} onClick={()=>go(i)}
            animate={{ width: i===idx ? 22 : 7, opacity: i===idx ? 1 : 0.38 }}
            transition={{ duration:0.3 }}
            style={{
              height:7, borderRadius:4, cursor:'pointer',
              background: i===idx ? 'linear-gradient(90deg,#b8860b,#d4a843)' : 'rgba(61,32,0,0.45)',
            }}
          />
        ))}
      </div>

    </div>
  )
}
