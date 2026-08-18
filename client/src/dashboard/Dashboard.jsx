import React, { useState, useEffect, useRef } from 'react'
import { useGuest } from '../context/GuestContext'

/*
  Font strategy:
  - "DM Serif Display" → couple name / big emotional headline
  - "Inter" (400/500/600/700) → all UI: labels, tables, inputs, stats
  - Loaded via <style> tag injected once at mount so Dashboard is self-contained
*/

const FONT_LINK = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; }
`

/* ── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  gold:       '#B8912A',
  goldLight:  '#F0C96A',
  goldBg:     '#FBF5E6',
  goldBorder: 'rgba(184,145,42,0.22)',
  dark:       '#1A1209',
  text:       '#1C1410',
  textMid:    '#6B5B45',
  textLight:  '#A89070',
  bg:         '#FAF7F2',
  surface:    '#FFFFFF',
  border:     '#EDE8E0',
  green:      '#2D6A4F',
  greenBg:    '#D8F3E3',
  red:        '#9B2335',
  redBg:      '#FCE8EC',
  pendingBg:  '#F0EDE8',
  pendingText:'#6B5B45',
  radius:     '12px',
  radiusSm:   '8px',
  shadow:     '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
  shadowCard: '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
}

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const FONT_DISPLAY = "'DM Serif Display', Georgia, serif"

/* ── Helpers ───────────────────────────────────────────────────────────── */
const MOCK_DATA = {
  event: { groomName:'Vijay', brideName:'Sangeetha', date:'25 December 2026', venue:'Sri Lakshmi Mahal' },
  guests: [
    { id:'1', token:'anbu',    name:'Anbu',    relation:'Friend',  opened:true,  rsvp:'yes',     adults:2, children:0 },
    { id:'2', token:'priya',   name:'Priya',   relation:'Cousin',  opened:true,  rsvp:'yes',     adults:2, children:2 },
    { id:'3', token:'ramesh',  name:'Ramesh',  relation:'Friend',  opened:true,  rsvp:'no',      adults:0, children:0 },
    { id:'4', token:'kavitha', name:'Kavitha', relation:'Sister',  opened:false, rsvp:'pending', adults:0, children:0 },
    { id:'5', token:'suresh',  name:'Suresh',  relation:'Brother', opened:true,  rsvp:'pending', adults:0, children:0 },
  ],
}

function Badge({ status }) {
  const map = {
    yes:     { bg:T.greenBg,   color:T.green,       label:'Attending' },
    no:      { bg:T.redBg,     color:T.red,         label:'Declined'  },
    pending: { bg:T.pendingBg, color:T.pendingText, label:'Pending'   },
    opened:  { bg:T.goldBg,    color:T.gold,        label:'Opened'    },
  }
  const s = map[status] || map.pending
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4,
      background:s.bg, color:s.color,
      fontFamily:FONT, fontSize:11, fontWeight:600, letterSpacing:'0.3px',
      padding:'3px 10px', borderRadius:20 }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:s.color, display:'inline-block', flexShrink:0 }}/>
      {s.label}
    </span>
  )
}

function StatCard({ value, label, accent }) {
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius,
      padding:'20px 16px', textAlign:'center', boxShadow:T.shadowCard,
      borderTop:`3px solid ${accent || T.goldBorder}` }}>
      <div style={{ fontFamily:FONT, fontWeight:700, fontSize:28, color:T.text, lineHeight:1, marginBottom:6 }}>
        {value}
      </div>
      <div style={{ fontFamily:FONT, fontWeight:500, fontSize:11, color:T.textLight,
        letterSpacing:'0.8px', textTransform:'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

function TabBtn({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:6,
      padding:'9px 18px', border:'none', cursor:'pointer', borderRadius:T.radiusSm,
      fontFamily:FONT, fontSize:13, fontWeight:active ? 600 : 500,
      background: active ? T.dark : 'transparent',
      color: active ? T.goldLight : T.textMid,
      transition:'all 0.18s',
      letterSpacing:'0.1px',
    }}>
      <span style={{ fontSize:14 }}>{icon}</span>
      {label}
    </button>
  )
}

/* ── Upload Card ───────────────────────────────────────────────────────── */
function UploadCard({ title, subtitle, accept, icon, currentUrl, currentName, onFile, onClear, previewType }) {
  const inputRef = useRef()
  const [dragging, setDragging] = useState(false)
  const [hover, setHover] = useState(false)

  function handleFile(file) {
    if (!file) return
    /* Convert to base64 data URI so the URL stays valid across re-renders
       and doesn't get revoked like objectURLs do */
    const reader = new FileReader()
    reader.onload = (e) => onFile(e.target.result, file.name)
    reader.readAsDataURL(file)
  }

  function onDrop(e) {
    e.preventDefault(); setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius,
      overflow:'hidden', marginBottom:16, boxShadow:T.shadowCard }}>

      {/* Card header */}
      <div style={{ padding:'14px 18px', borderBottom:`1px solid ${T.border}`,
        display:'flex', alignItems:'center', gap:10,
        background:'linear-gradient(135deg,#FBF5E6,#FDF8F0)' }}>
        <div style={{ width:34, height:34, borderRadius:8, background:T.dark,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
          {icon}
        </div>
        <div>
          <div style={{ fontFamily:FONT, fontWeight:600, fontSize:13, color:T.text }}>{title}</div>
          <div style={{ fontFamily:FONT, fontWeight:400, fontSize:12, color:T.textLight, marginTop:1 }}>{subtitle}</div>
        </div>
      </div>

      <div style={{ padding:18 }}>
        {/* Preview */}
        {currentUrl && (
          <div style={{ marginBottom:14, borderRadius:T.radiusSm, overflow:'hidden',
            border:`1px solid ${T.border}`, background:T.bg }}>
            {previewType === 'audio' ? (
              <div style={{ padding:12 }}>
                <audio controls src={currentUrl} style={{ width:'100%', height:36 }}/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
                  <span style={{ fontFamily:FONT, fontSize:12, color:T.textMid, display:'flex', alignItems:'center', gap:5 }}>
                    <span>🎵</span> {currentName || 'Custom music'}
                  </span>
                  <button onClick={onClear} style={{ background:'none', border:'none',
                    fontFamily:FONT, fontSize:12, fontWeight:500, color:T.red, cursor:'pointer',
                    padding:'2px 6px', borderRadius:4 }}>
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <video src={currentUrl} controls
                  style={{ width:'100%', maxHeight:160, display:'block', objectFit:'contain', background:'#111' }}/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px' }}>
                  <span style={{ fontFamily:FONT, fontSize:12, color:T.textMid, display:'flex', alignItems:'center', gap:5 }}>
                    <span>🎬</span> {currentName || 'Custom video'}
                  </span>
                  <button onClick={onClear} style={{ background:'none', border:'none',
                    fontFamily:FONT, fontSize:12, fontWeight:500, color:T.red, cursor:'pointer',
                    padding:'2px 6px', borderRadius:4 }}>
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drop zone */}
        <div
          onDragOver={e=>{e.preventDefault();setDragging(true)}}
          onDragLeave={()=>setDragging(false)}
          onDrop={onDrop}
          onClick={()=>inputRef.current?.click()}
          onMouseEnter={()=>setHover(true)}
          onMouseLeave={()=>setHover(false)}
          style={{
            border:`2px dashed ${dragging||hover ? T.gold : T.border}`,
            borderRadius:T.radiusSm, padding:'28px 20px', textAlign:'center', cursor:'pointer',
            background: dragging ? T.goldBg : hover ? '#FDFAF4' : T.bg,
            transition:'all 0.18s',
          }}>
          <div style={{ fontSize:24, marginBottom:8 }}>{currentUrl ? '🔄' : '⬆️'}</div>
          <div style={{ fontFamily:FONT, fontWeight:600, fontSize:13, color:T.text, marginBottom:4 }}>
            {currentUrl ? 'Replace file' : 'Drag & drop or click to upload'}
          </div>
          <div style={{ fontFamily:FONT, fontSize:12, color:T.textLight }}>
            {accept.split(',').slice(0,3).join(' · ')}
          </div>
        </div>
        <input ref={inputRef} type="file" accept={accept} style={{display:'none'}}
          onChange={e=>handleFile(e.target.files[0])}/>
      </div>
    </div>
  )
}

/* ── Tips box ──────────────────────────────────────────────────────────── */
function TipsBox({ tips }) {
  return (
    <div style={{ background:T.goldBg, border:`1px solid ${T.goldBorder}`, borderRadius:T.radius, padding:'14px 16px' }}>
      <div style={{ fontFamily:FONT, fontWeight:600, fontSize:11, letterSpacing:'0.8px',
        textTransform:'uppercase', color:T.gold, marginBottom:10 }}>Tips</div>
      {tips.map((t,i)=>(
        <div key={i} style={{ display:'flex', gap:8, marginBottom:6 }}>
          <span style={{ color:T.gold, fontSize:13, flexShrink:0, marginTop:1 }}>·</span>
          <span style={{ fontFamily:FONT, fontSize:12.5, color:T.textMid, lineHeight:1.6 }}>{t}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Main Dashboard ───────────────────────────────────────────────────── */
export default function Dashboard({ onClose }) {
  const { updateMedia, mediaConfig } = useGuest()
  const [guests, setGuests] = useState(MOCK_DATA.guests)
  const [event]             = useState(MOCK_DATA.event)
  const [newName, setNewName] = useState('')
  const [newRel, setNewRel]   = useState('')
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [tab, setTab]         = useState('guests')

  const [musicUrl,  setMusicUrl]  = useState(mediaConfig?.musicUrl  || null)
  const [musicName, setMusicName] = useState(mediaConfig?.musicName || null)
  const [videoUrl,  setVideoUrl]  = useState(mediaConfig?.videoUrl  || null)
  const [videoName, setVideoName] = useState(mediaConfig?.videoName || null)

  useEffect(() => {
    fetch('/api/dashboard/evt-001')
      .then(r=>{ if(!r.ok) throw new Error(); return r.json() })
      .then(d=>{ if(d.guests) setGuests(d.guests) })
      .catch(()=>{})
  }, [])

  function applyMusic(url, name) { setMusicUrl(url); setMusicName(name); updateMedia({ musicUrl:url, musicName:name }) }
  function clearMusic()          { setMusicUrl(null); setMusicName(null); updateMedia({ musicUrl:null, musicName:null }) }
  function applyVideo(url, name) { setVideoUrl(url); setVideoName(name); updateMedia({ videoUrl:url, videoName:name }) }
  function clearVideo()          { setVideoUrl(null); setVideoName(null); updateMedia({ videoUrl:null, videoName:null }) }

  const confirmed = guests.filter(g=>g.rsvp==='yes')
  const stats = {
    total:     guests.length,
    opened:    guests.filter(g=>g.opened).length,
    confirmed: confirmed.length,
    declined:  guests.filter(g=>g.rsvp==='no').length,
    adults:    confirmed.reduce((s,g)=>s+(g.adults||0),0),
    children:  confirmed.reduce((s,g)=>s+(g.children||0),0),
  }

  const filtered = guests
    .filter(g=>filter==='all'||g.rsvp===filter)
    .filter(g=>!search||g.name.toLowerCase().includes(search.toLowerCase()))

  function addGuest() {
    if (!newName.trim()) return
    const token = newName.toLowerCase().replace(/\s+/g,'')+Math.random().toString(36).slice(2,6)
    setGuests(p=>[...p,{id:String(Date.now()),token,name:newName.trim(),relation:newRel.trim()||'Guest',
      opened:false,rsvp:'pending',adults:0,children:0}])
    setNewName(''); setNewRel('')
  }
  function deleteGuest(id) { setGuests(p=>p.filter(g=>g.id!==id)) }
  function copyLink(g) {
    const url=`${window.location.origin}/i/${g.token}`
    navigator.clipboard.writeText(url).then(()=>alert('Copied!\n'+url)).catch(()=>prompt('Copy:',url))
  }

  const inputStyle = {
    fontFamily:FONT, fontSize:13, color:T.text, background:T.surface,
    border:`1px solid ${T.border}`, borderRadius:T.radiusSm,
    padding:'10px 14px', outline:'none', transition:'border-color 0.18s',
    width:'100%',
  }
  const filterBtns = [['all','All'],['yes','Attending'],['no','Declined'],['pending','Pending']]

  return (
    <div style={{ background:T.bg, minHeight:'100vh', fontFamily:FONT }}>

      {/* Inject fonts */}
      <style>{FONT_LINK}</style>

      {/* ── Top nav bar ── */}
      <div style={{ background:T.dark, position:'sticky', top:0, zIndex:100,
        borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth:700, margin:'0 auto', padding:'0 20px',
          display:'flex', alignItems:'center', justifyContent:'space-between', height:56 }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
            {/* DM Serif Display for the couple name */}
            <span style={{ fontFamily:FONT_DISPLAY, fontSize:18, color:'#F0C96A', letterSpacing:'0.3px' }}>
              {event.groomName}
            </span>
            <span style={{ fontFamily:FONT_DISPLAY, fontStyle:'italic', fontSize:14, color:'rgba(240,201,106,0.55)' }}>
              &amp;
            </span>
            <span style={{ fontFamily:FONT_DISPLAY, fontSize:18, color:'#F0C96A', letterSpacing:'0.3px' }}>
              {event.brideName}
            </span>
            <span style={{ fontFamily:FONT, fontWeight:500, fontSize:11, color:'rgba(255,255,255,0.25)',
              letterSpacing:'1.5px', textTransform:'uppercase', marginLeft:6 }}>
              Host Panel
            </span>
          </div>
          <button onClick={onClose} style={{
            fontFamily:FONT, fontWeight:500, fontSize:12, letterSpacing:'0.2px',
            color:'rgba(240,201,106,0.8)', background:'rgba(240,201,106,0.08)',
            border:'1px solid rgba(240,201,106,0.2)', borderRadius:20,
            padding:'6px 16px', cursor:'pointer', display:'flex', alignItems:'center', gap:5,
            transition:'all 0.18s',
          }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(240,201,106,0.15)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(240,201,106,0.08)'}}>
            ← Back to Invite
          </button>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'24px 20px' }}>

        {/* ── Event banner ── */}
        <div style={{ background:T.dark, borderRadius:T.radius, padding:'18px 22px',
          marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center',
          boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}>
          <div>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:22, color:'#F0C96A', marginBottom:3 }}>
              Wedding Celebration
            </div>
            <div style={{ fontFamily:FONT, fontWeight:400, fontSize:13, color:'rgba(255,255,255,0.45)' }}>
              {event.date} &nbsp;·&nbsp; {event.venue}
            </div>
          </div>
          <div style={{ background:'rgba(240,201,106,0.15)', border:'1px solid rgba(240,201,106,0.3)',
            color:'#F0C96A', fontFamily:FONT, fontWeight:600, fontSize:10,
            letterSpacing:'1.5px', textTransform:'uppercase', padding:'5px 12px', borderRadius:20,
            display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80',
              boxShadow:'0 0 6px rgba(74,222,128,0.8)', display:'inline-block' }}/>
            Live
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:22 }}>
          <StatCard value={stats.total}             label="Invited"   accent={T.gold}/>
          <StatCard value={stats.opened}            label="Opened"    accent='#B8912A'/>
          <StatCard value={stats.confirmed}         label="Confirmed" accent={T.green}/>
          <StatCard value={stats.declined}          label="Declined"  accent={T.red}/>
          <StatCard value={stats.adults}            label="Adults"    accent='#6B5B45'/>
          <StatCard value={stats.adults+stats.children} label="Expected" accent='#2D6A4F'/>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display:'flex', gap:4, marginBottom:20,
          background:T.surface, padding:4, borderRadius:T.radius,
          border:`1px solid ${T.border}`, boxShadow:T.shadow }}>
          <TabBtn label="Guests"          icon="👥" active={tab==='guests'} onClick={()=>setTab('guests')}/>
          <TabBtn label="Background Music" icon="🎵" active={tab==='music'}  onClick={()=>setTab('music')}/>
          <TabBtn label="Video Message"   icon="🎬" active={tab==='video'}  onClick={()=>setTab('video')}/>
        </div>

        {/* ════════════════════ GUESTS TAB ════════════════════ */}
        {tab === 'guests' && (
          <>
            {/* Section label */}
            <div style={{ fontFamily:FONT, fontWeight:600, fontSize:11, letterSpacing:'1px',
              textTransform:'uppercase', color:T.textLight, marginBottom:12 }}>
              Guest List &nbsp;<span style={{ color:T.border }}>·</span>&nbsp;
              <span style={{ color:T.gold }}>{filtered.length} shown</span>
            </div>

            {/* Search + filters */}
            <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap', alignItems:'center' }}>
              <div style={{ flex:1, minWidth:180, position:'relative' }}>
                <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)',
                  fontSize:13, color:T.textLight, pointerEvents:'none' }}>🔍</span>
                <input style={{ ...inputStyle, paddingLeft:34 }}
                  placeholder="Search guests…" value={search} onChange={e=>setSearch(e.target.value)}/>
              </div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                {filterBtns.map(([f,l])=>(
                  <button key={f} onClick={()=>setFilter(f)} style={{
                    fontFamily:FONT, fontSize:12, fontWeight:filter===f?600:500,
                    padding:'7px 14px', borderRadius:20, cursor:'pointer',
                    background: filter===f ? T.dark : T.surface,
                    color: filter===f ? T.goldLight : T.textMid,
                    border: filter===f ? `1px solid ${T.dark}` : `1px solid ${T.border}`,
                    transition:'all 0.15s',
                  }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ background:T.surface, borderRadius:T.radius, border:`1px solid ${T.border}`,
              overflow:'hidden', marginBottom:20, boxShadow:T.shadowCard }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:460 }}>
                  <thead>
                    <tr style={{ background:'#F8F4EE' }}>
                      {[['Name','130px'],['Relation','100px'],['Opened','80px'],['RSVP','110px'],['A+C','52px'],['Link','90px'],['','60px']].map(([h,w])=>(
                        <th key={h} style={{ fontFamily:FONT, fontWeight:600, fontSize:11,
                          letterSpacing:'0.6px', textTransform:'uppercase',
                          color:T.textLight, padding:'11px 12px', textAlign:'left',
                          whiteSpace:'nowrap', width:w, borderBottom:`1px solid ${T.border}` }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((g,ri)=>(
                      <tr key={g.id} style={{ borderBottom:`1px solid ${T.border}`,
                        background: ri%2===1 ? '#FDFAF7' : T.surface }}>
                        <td style={{ padding:'11px 12px', fontFamily:FONT, fontWeight:600,
                          fontSize:14, color:T.text, whiteSpace:'nowrap' }}>{g.name}</td>
                        <td style={{ padding:'11px 12px', fontFamily:FONT, fontSize:13, color:T.textMid }}>{g.relation}</td>
                        <td style={{ padding:'11px 12px' }}>
                          {g.opened
                            ? <Badge status="opened"/>
                            : <span style={{ fontFamily:FONT, fontSize:12, color:T.textLight }}>—</span>}
                        </td>
                        <td style={{ padding:'11px 12px' }}><Badge status={g.rsvp}/></td>
                        <td style={{ padding:'11px 12px', fontFamily:FONT, fontSize:13,
                          color:T.text, textAlign:'center' }}>
                          {g.rsvp==='yes' ? `${g.adults}+${g.children}` : '—'}
                        </td>
                        <td style={{ padding:'11px 12px', fontFamily:'monospace', fontSize:11.5,
                          color:T.textLight, cursor:'pointer', whiteSpace:'nowrap' }}
                          onClick={()=>copyLink(g)} title="Click to copy">
                          /i/{g.token}
                        </td>
                        <td style={{ padding:'11px 12px', whiteSpace:'nowrap' }}>
                          <button onClick={()=>copyLink(g)} title="Copy link"
                            style={{ background:'none', border:`1px solid ${T.border}`, cursor:'pointer',
                              fontSize:12, padding:'4px 8px', borderRadius:6, color:T.textMid,
                              fontFamily:FONT, marginRight:4, transition:'all 0.15s' }}
                            onMouseEnter={e=>e.currentTarget.style.borderColor=T.gold}
                            onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                            Copy
                          </button>
                          <button onClick={()=>deleteGuest(g.id)} title="Delete"
                            style={{ background:'none', border:`1px solid ${T.border}`, cursor:'pointer',
                              fontSize:12, padding:'4px 8px', borderRadius:6, color:T.red,
                              fontFamily:FONT, transition:'all 0.15s' }}
                            onMouseEnter={e=>e.currentTarget.style.background=T.redBg}
                            onMouseLeave={e=>e.currentTarget.style.background='none'}>
                            Del
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length===0 && (
                      <tr><td colSpan={7} style={{ padding:'32px', textAlign:'center',
                        fontFamily:FONT, fontSize:13, color:T.textLight }}>
                        No guests match your filter
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add guest */}
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius,
              padding:'18px 18px', boxShadow:T.shadowCard }}>
              <div style={{ fontFamily:FONT, fontWeight:600, fontSize:13, color:T.text, marginBottom:12 }}>
                Add Guest
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <input style={{ ...inputStyle, flex:2, minWidth:140 }}
                  placeholder="Full name" value={newName} onChange={e=>setNewName(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&addGuest()}
                  onFocus={e=>e.target.style.borderColor=T.gold}
                  onBlur={e=>e.target.style.borderColor=T.border}/>
                <input style={{ ...inputStyle, flex:1, minWidth:100 }}
                  placeholder="Relation (e.g. Friend)" value={newRel} onChange={e=>setNewRel(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&addGuest()}
                  onFocus={e=>e.target.style.borderColor=T.gold}
                  onBlur={e=>e.target.style.borderColor=T.border}/>
                <button onClick={addGuest} style={{
                  fontFamily:FONT, fontWeight:600, fontSize:13,
                  padding:'10px 22px', background:T.dark, color:T.goldLight,
                  border:'none', borderRadius:T.radiusSm, cursor:'pointer',
                  letterSpacing:'0.2px', transition:'opacity 0.15s', flexShrink:0,
                }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                  + Add
                </button>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════ MUSIC TAB ════════════════════ */}
        {tab === 'music' && (
          <div>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:22, color:T.text, marginBottom:4 }}>
              Background Music
            </div>
            <div style={{ fontFamily:FONT, fontSize:13, color:T.textMid, marginBottom:20, lineHeight:1.7 }}>
              Upload your own track to replace the default Indian instrumental.
              Guests control it with the 🎶 button on the invite.
            </div>
            <UploadCard
              title="Upload Music File"
              subtitle="Plays in the background throughout the invite"
              accept="audio/mp3,audio/mpeg,audio/wav,audio/ogg,audio/*"
              icon="🎵" previewType="audio"
              currentUrl={musicUrl} currentName={musicName}
              onFile={applyMusic} onClear={clearMusic}
            />
            <TipsBox tips={[
              'MP3, WAV, and OGG formats are supported.',
              'Keep file size under 10 MB for fast loading.',
              'The music loops automatically.',
              'Changes apply instantly — switch back to the invite to hear it.',
            ]}/>
          </div>
        )}

        {/* ════════════════════ VIDEO TAB ════════════════════ */}
        {tab === 'video' && (
          <div>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:22, color:T.text, marginBottom:4 }}>
              Video Message
            </div>
            <div style={{ fontFamily:FONT, fontSize:13, color:T.textMid, marginBottom:20, lineHeight:1.7 }}>
              Upload a special video — a couple's message, highlights reel, or family video.
              It plays on the <strong style={{ color:T.text }}>3rd invite screen</strong> (Families & Blessings).
            </div>
            <UploadCard
              title="Upload Video File"
              subtitle="Shown on the Families screen of the invite"
              accept="video/mp4,video/webm,video/ogg,video/*"
              icon="🎬" previewType="video"
              currentUrl={videoUrl} currentName={videoName}
              onFile={applyVideo} onClear={clearVideo}
            />
            <TipsBox tips={[
              'MP4 and WebM work best across all browsers.',
              'Keep video under 50 MB for smooth playback.',
              '16 : 9 landscape orientation looks best on screen.',
              'Guests can play, pause, and adjust volume.',
              'A placeholder appears if no video is uploaded.',
            ]}/>
          </div>
        )}

        <div style={{ height:40 }}/>
      </div>
    </div>
  )
}
