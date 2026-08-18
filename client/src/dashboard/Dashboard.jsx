import React, { useState, useEffect, useRef } from 'react'
import { useGuest, API_BASE } from '../context/GuestContext'

const FONT_LINK = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; }
`

const T = {
  gold:'#B8912A', goldLight:'#F0C96A', goldBg:'#FBF5E6',
  goldBorder:'rgba(184,145,42,0.22)',
  dark:'#1A1209', text:'#1C1410', textMid:'#6B5B45', textLight:'#A89070',
  bg:'#FAF7F2', surface:'#FFFFFF', border:'#EDE8E0',
  green:'#2D6A4F', greenBg:'#D8F3E3',
  red:'#9B2335', redBg:'#FCE8EC',
  pendingBg:'#F0EDE8', pendingText:'#6B5B45',
  radius:'12px', radiusSm:'8px',
  shadow:'0 1px 3px rgba(0,0,0,0.07)',
  shadowCard:'0 2px 8px rgba(0,0,0,0.06)',
}
const FONT         = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const FONT_DISPLAY = "'DM Serif Display', Georgia, serif"

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

/* ── Small components ─────────────────────────────────────────────────── */
function Badge({ status }) {
  const map = {
    yes:     { bg:T.greenBg,   color:T.green,       label:'Attending' },
    no:      { bg:T.redBg,     color:T.red,         label:'Declined'  },
    pending: { bg:T.pendingBg, color:T.pendingText, label:'Pending'   },
    opened:  { bg:T.goldBg,    color:T.gold,        label:'Opened'    },
  }
  const s = map[status] || map.pending
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, background:s.bg, color:s.color,
      fontFamily:FONT, fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20 }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:s.color, flexShrink:0 }}/>
      {s.label}
    </span>
  )
}

function StatCard({ value, label, accent }) {
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius,
      padding:'18px 12px', textAlign:'center', boxShadow:T.shadowCard,
      borderTop:`3px solid ${accent||T.goldBorder}` }}>
      <div style={{ fontFamily:FONT, fontWeight:700, fontSize:26, color:T.text, lineHeight:1, marginBottom:5 }}>{value}</div>
      <div style={{ fontFamily:FONT, fontWeight:500, fontSize:10, color:T.textLight, letterSpacing:'0.8px', textTransform:'uppercase' }}>{label}</div>
    </div>
  )
}

function TabBtn({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:5, padding:'9px 14px',
      border:'none', cursor:'pointer', borderRadius:T.radiusSm,
      fontFamily:FONT, fontSize:12, fontWeight:active?600:500,
      background:active?T.dark:'transparent',
      color:active?T.goldLight:T.textMid, transition:'all 0.18s',
    }}><span style={{fontSize:13}}>{icon}</span>{label}</button>
  )
}

function TipsBox({ tips }) {
  return (
    <div style={{ background:T.goldBg, border:`1px solid ${T.goldBorder}`, borderRadius:T.radius, padding:'14px 16px', marginTop:14 }}>
      <div style={{ fontFamily:FONT, fontWeight:600, fontSize:11, letterSpacing:'0.8px',
        textTransform:'uppercase', color:T.gold, marginBottom:8 }}>Tips</div>
      {tips.map((t,i)=>(
        <div key={i} style={{ display:'flex', gap:8, marginBottom:5 }}>
          <span style={{ color:T.gold, flexShrink:0 }}>·</span>
          <span style={{ fontFamily:FONT, fontSize:12, color:T.textMid, lineHeight:1.6 }}>{t}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Upload Card — sends file to Railway server via fetch ──────────────── */
function UploadCard({ title, subtitle, accept, icon, mediaType,
  currentUrl, currentName, onUploaded, onRemoved, previewType }) {

  const inputRef = useRef()
  const [dragging, setDragging] = useState(false)
  const [hover,    setHover]    = useState(false)
  const [uploading,setUploading]= useState(false)
  const [progress, setProgress] = useState(0)
  const [error,    setError]    = useState(null)

  async function handleFile(file) {
    if (!file) return
    setError(null); setUploading(true); setProgress(5)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', mediaType)

      // Use XMLHttpRequest so we can track upload progress
      const result = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 90))
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject(new Error(`Server error: ${xhr.status} ${xhr.responseText}`))
          }
        })

        xhr.addEventListener('error', () => reject(new Error('Network error — check your connection')))

        xhr.open('POST', `${API_BASE}/api/media/upload?type=${mediaType}`)
        xhr.send(formData)
      })

      setProgress(100)
      setTimeout(() => { setUploading(false); setProgress(0) }, 600)

      // result.url is now a server URL — works on ALL devices
      onUploaded(result.url, result.name)

    } catch (e) {
      console.error('Upload failed:', e)
      setError(e.message || 'Upload failed. Please try again.')
      setUploading(false); setProgress(0)
    }
  }

  async function handleRemove() {
    try {
      await fetch(`${API_BASE}/api/media/${mediaType}`, { method: 'DELETE' })
      onRemoved()
    } catch (e) {
      console.error('Remove failed:', e)
    }
  }

  function onDrop(e) { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }

  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius,
      overflow:'hidden', marginBottom:14, boxShadow:T.shadowCard }}>

      {/* Header */}
      <div style={{ padding:'12px 16px', borderBottom:`1px solid ${T.border}`,
        display:'flex', alignItems:'center', gap:10, background:'linear-gradient(135deg,#FBF5E6,#FDF8F0)' }}>
        <div style={{ width:34, height:34, borderRadius:8, background:T.dark,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
          {icon}
        </div>
        <div>
          <div style={{ fontFamily:FONT, fontWeight:600, fontSize:13, color:T.text }}>{title}</div>
          <div style={{ fontFamily:FONT, fontSize:11, color:T.textLight, marginTop:1 }}>{subtitle}</div>
        </div>
      </div>

      <div style={{ padding:16 }}>

        {/* Error message */}
        {error && (
          <div style={{ background:T.redBg, border:`1px solid rgba(155,35,53,0.2)`, borderRadius:8,
            padding:'10px 12px', marginBottom:12,
            fontFamily:FONT, fontSize:12, color:T.red, lineHeight:1.5 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Current file preview */}
        {currentUrl && !uploading && (
          <div style={{ marginBottom:12, borderRadius:T.radiusSm, overflow:'hidden',
            border:`1px solid ${T.border}`, background:T.bg }}>
            {previewType==='audio' ? (
              <div style={{ padding:12 }}>
                <audio controls src={currentUrl} style={{ width:'100%', height:36 }}/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
                  <span style={{ fontFamily:FONT, fontSize:12, color:T.textMid }}>
                    🎵 {currentName || 'Uploaded music'} &nbsp;
                    <span style={{ fontSize:10, color:T.textLight }}>· Served from server</span>
                  </span>
                  <button onClick={handleRemove}
                    style={{ background:'none', border:'none', fontFamily:FONT, fontSize:12,
                      fontWeight:500, color:T.red, cursor:'pointer', padding:'2px 8px', borderRadius:4 }}>
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <video src={currentUrl} controls
                  style={{ width:'100%', maxHeight:180, display:'block', objectFit:'contain', background:'#111' }}/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px' }}>
                  <span style={{ fontFamily:FONT, fontSize:12, color:T.textMid }}>
                    🎬 {currentName || 'Uploaded video'} &nbsp;
                    <span style={{ fontSize:10, color:T.textLight }}>· Served from server ✓</span>
                  </span>
                  <button onClick={handleRemove}
                    style={{ background:'none', border:'none', fontFamily:FONT, fontSize:12,
                      fontWeight:500, color:T.red, cursor:'pointer', padding:'2px 8px', borderRadius:4 }}>
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upload progress */}
        {uploading && (
          <div style={{ marginBottom:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontFamily:FONT, fontSize:12, color:T.textMid }}>
                Uploading to server… {progress < 90 ? '(sending)' : '(processing)'}
              </span>
              <span style={{ fontFamily:FONT, fontSize:12, fontWeight:600, color:T.gold }}>{progress}%</span>
            </div>
            <div style={{ height:6, background:T.border, borderRadius:3, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${progress}%`, borderRadius:3,
                background:`linear-gradient(90deg,${T.gold},${T.goldLight})`,
                transition:'width 0.2s ease' }}/>
            </div>
            <div style={{ fontFamily:FONT, fontSize:11, color:T.textLight, marginTop:5 }}>
              ☁️ Uploading to cloud server — will be visible on all devices
            </div>
          </div>
        )}

        {/* Drop zone */}
        {!uploading && (
          <div
            onDragOver={e=>{e.preventDefault();setDragging(true)}}
            onDragLeave={()=>setDragging(false)}
            onDrop={onDrop}
            onClick={()=>inputRef.current?.click()}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
            style={{
              border:`2px dashed ${dragging||hover?T.gold:T.border}`,
              borderRadius:T.radiusSm, padding:'26px 16px', textAlign:'center',
              cursor:'pointer', transition:'all 0.18s',
              background: dragging ? T.goldBg : hover ? '#FDFAF4' : T.bg,
            }}>
            <div style={{ fontSize:26, marginBottom:8 }}>{currentUrl ? '🔄' : '⬆️'}</div>
            <div style={{ fontFamily:FONT, fontWeight:600, fontSize:13, color:T.text, marginBottom:3 }}>
              {currentUrl ? 'Replace file' : 'Drag & drop or click to upload'}
            </div>
            <div style={{ fontFamily:FONT, fontSize:11, color:T.textLight }}>
              {previewType==='video'
                ? 'MP4 or WebM · uploaded to server · visible on all devices'
                : 'MP3 or WAV · uploaded to server · visible on all devices'}
            </div>
          </div>
        )}

        <input ref={inputRef} type="file" accept={accept} style={{display:'none'}}
          onChange={e=>handleFile(e.target.files[0])}/>
      </div>
    </div>
  )
}

/* ── Main Dashboard ───────────────────────────────────────────────────── */
export default function Dashboard({ onClose }) {
  const { updateMedia, mediaConfig } = useGuest()
  const [guests,  setGuests]  = useState(MOCK_DATA.guests)
  const [event]               = useState(MOCK_DATA.event)
  const [newName, setNewName] = useState('')
  const [newRel,  setNewRel]  = useState('')
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('all')
  const [tab,     setTab]     = useState('guests')

  useEffect(() => {
    fetch(`${API_BASE}/api/dashboard/evt-001`)
      .then(r=>{ if(!r.ok) throw new Error(); return r.json() })
      .then(d=>{ if(d.guests) setGuests(d.guests) })
      .catch(()=>{})
  }, [])

  function handleMediaUploaded(type, url, name) {
    if (type==='video') updateMedia({ videoUrl:url, videoName:name })
    else               updateMedia({ musicUrl:url, musicName:name })
  }
  function handleMediaRemoved(type) {
    if (type==='video') updateMedia({ videoUrl:null, videoName:null })
    else               updateMedia({ musicUrl:null, musicName:null })
  }

  const confirmed = guests.filter(g=>g.rsvp==='yes')
  const stats = {
    total:    guests.length,
    opened:   guests.filter(g=>g.opened).length,
    confirmed:confirmed.length,
    declined: guests.filter(g=>g.rsvp==='no').length,
    adults:   confirmed.reduce((s,g)=>s+(g.adults||0),0),
    children: confirmed.reduce((s,g)=>s+(g.children||0),0),
  }

  const filtered = guests
    .filter(g=>filter==='all'||g.rsvp===filter)
    .filter(g=>!search||g.name.toLowerCase().includes(search.toLowerCase()))

  function addGuest() {
    if (!newName.trim()) return
    const token = newName.toLowerCase().replace(/\s+/g,'')+Math.random().toString(36).slice(2,6)
    setGuests(p=>[...p,{id:String(Date.now()),token,name:newName.trim(),
      relation:newRel.trim()||'Guest',opened:false,rsvp:'pending',adults:0,children:0}])
    setNewName(''); setNewRel('')
  }
  function deleteGuest(id) { setGuests(p=>p.filter(g=>g.id!==id)) }
  function copyLink(g) {
    const url=`${window.location.origin}/i/${g.token}`
    navigator.clipboard.writeText(url).then(()=>alert('Copied!\n'+url)).catch(()=>prompt('Copy:',url))
  }

  const inp = {
    fontFamily:FONT, fontSize:13, color:T.text, background:T.surface,
    border:`1px solid ${T.border}`, borderRadius:T.radiusSm,
    padding:'10px 14px', outline:'none', width:'100%', transition:'border-color 0.18s',
  }

  return (
    <div style={{ background:T.bg, minHeight:'100vh', fontFamily:FONT }}>
      <style>{FONT_LINK}</style>

      {/* Nav */}
      <div style={{ background:T.dark, position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:700, margin:'0 auto', padding:'0 16px',
          display:'flex', alignItems:'center', justifyContent:'space-between', height:54 }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <span style={{ fontFamily:FONT_DISPLAY, fontSize:17, color:'#F0C96A' }}>{event.groomName}</span>
            <span style={{ fontFamily:FONT_DISPLAY, fontStyle:'italic', fontSize:13, color:'rgba(240,201,106,0.45)' }}>&amp;</span>
            <span style={{ fontFamily:FONT_DISPLAY, fontSize:17, color:'#F0C96A' }}>{event.brideName}</span>
            <span style={{ fontFamily:FONT, fontSize:10, color:'rgba(255,255,255,0.22)',
              letterSpacing:'1.5px', textTransform:'uppercase', marginLeft:4 }}>Host Panel</span>
          </div>
          <button onClick={onClose} style={{
            fontFamily:FONT, fontSize:11, fontWeight:500, color:'rgba(240,201,106,0.8)',
            background:'rgba(240,201,106,0.08)', border:'1px solid rgba(240,201,106,0.2)',
            borderRadius:20, padding:'5px 14px', cursor:'pointer' }}>← Back</button>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'20px 16px' }}>

        {/* Event banner */}
        <div style={{ background:T.dark, borderRadius:T.radius, padding:'16px 20px', marginBottom:16,
          display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:20, color:'#F0C96A', marginBottom:2 }}>Wedding Celebration</div>
            <div style={{ fontFamily:FONT, fontSize:12, color:'rgba(255,255,255,0.4)' }}>{event.date} · {event.venue}</div>
          </div>
          <div style={{ background:'rgba(240,201,106,0.15)', color:'#F0C96A', fontFamily:FONT,
            fontWeight:600, fontSize:10, letterSpacing:'1.5px', textTransform:'uppercase',
            padding:'4px 10px', borderRadius:20, display:'flex', alignItems:'center', gap:4 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#4ade80',
              boxShadow:'0 0 5px rgba(74,222,128,0.8)' }}/>Live
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:18 }}>
          <StatCard value={stats.total}              label="Invited"   accent={T.gold}/>
          <StatCard value={stats.opened}             label="Opened"    accent='#B8912A'/>
          <StatCard value={stats.confirmed}          label="Confirmed" accent={T.green}/>
          <StatCard value={stats.declined}           label="Declined"  accent={T.red}/>
          <StatCard value={stats.adults}             label="Adults"    accent='#6B5B45'/>
          <StatCard value={stats.adults+stats.children} label="Expected" accent='#2D6A4F'/>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:3, marginBottom:18, background:T.surface,
          padding:4, borderRadius:T.radius, border:`1px solid ${T.border}` }}>
          <TabBtn label="Guests"  icon="👥" active={tab==='guests'} onClick={()=>setTab('guests')}/>
          <TabBtn label="Music"   icon="🎵" active={tab==='music'}  onClick={()=>setTab('music')}/>
          <TabBtn label="Video"   icon="🎬" active={tab==='video'}  onClick={()=>setTab('video')}/>
        </div>

        {/* ── Guests ── */}
        {tab==='guests' && (
          <>
            <div style={{ fontFamily:FONT, fontWeight:600, fontSize:11, letterSpacing:'0.8px',
              textTransform:'uppercase', color:T.textLight, marginBottom:10 }}>
              Guest List &nbsp;·&nbsp; <span style={{color:T.gold}}>{filtered.length} shown</span>
            </div>
            <div style={{ display:'flex', gap:6, marginBottom:10, flexWrap:'wrap', alignItems:'center' }}>
              <div style={{ flex:1, minWidth:160, position:'relative' }}>
                <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)',
                  color:T.textLight, pointerEvents:'none', fontSize:12 }}>🔍</span>
                <input style={{ ...inp, paddingLeft:32 }}
                  placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}/>
              </div>
              {[['all','All'],['yes','Going'],['no','No'],['pending','Pending']].map(([f,l])=>(
                <button key={f} onClick={()=>setFilter(f)} style={{
                  fontFamily:FONT, fontSize:11, fontWeight:filter===f?600:400,
                  padding:'6px 12px', borderRadius:20, cursor:'pointer',
                  background:filter===f?T.dark:T.surface, color:filter===f?T.goldLight:T.textMid,
                  border:filter===f?`1px solid ${T.dark}`:`1px solid ${T.border}` }}>{l}</button>
              ))}
            </div>
            <div style={{ background:T.surface, borderRadius:T.radius, border:`1px solid ${T.border}`,
              overflow:'hidden', marginBottom:16, boxShadow:T.shadowCard }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:420 }}>
                  <thead>
                    <tr style={{ background:'#F8F4EE' }}>
                      {['Name','Relation','Opened','RSVP','A+C','Link',''].map(h=>(
                        <th key={h} style={{ fontFamily:FONT, fontWeight:600, fontSize:10,
                          letterSpacing:'0.5px', textTransform:'uppercase', color:T.textLight,
                          padding:'10px 10px', textAlign:'left', borderBottom:`1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((g,ri)=>(
                      <tr key={g.id} style={{ borderBottom:`1px solid ${T.border}`,
                        background:ri%2?'#FDFAF7':T.surface }}>
                        <td style={{ padding:'10px 10px', fontFamily:FONT, fontWeight:600,
                          fontSize:13, color:T.text }}>{g.name}</td>
                        <td style={{ padding:'10px 10px', fontFamily:FONT, fontSize:12, color:T.textMid }}>{g.relation}</td>
                        <td style={{ padding:'10px 10px' }}>
                          {g.opened?<Badge status="opened"/>
                            :<span style={{fontFamily:FONT,fontSize:12,color:T.textLight}}>—</span>}
                        </td>
                        <td style={{ padding:'10px 10px' }}><Badge status={g.rsvp}/></td>
                        <td style={{ padding:'10px 10px', fontFamily:FONT, fontSize:12, color:T.text, textAlign:'center' }}>
                          {g.rsvp==='yes'?`${g.adults}+${g.children}`:'—'}
                        </td>
                        <td style={{ padding:'10px 10px', fontFamily:'monospace', fontSize:11,
                          color:T.textLight, cursor:'pointer', whiteSpace:'nowrap' }}
                          onClick={()=>copyLink(g)}>/i/{g.token}</td>
                        <td style={{ padding:'10px 10px', whiteSpace:'nowrap' }}>
                          <button onClick={()=>copyLink(g)}
                            style={{ background:'none', border:`1px solid ${T.border}`, cursor:'pointer',
                              fontSize:11, padding:'3px 7px', borderRadius:5, color:T.textMid,
                              fontFamily:FONT, marginRight:3 }}>Copy</button>
                          <button onClick={()=>deleteGuest(g.id)}
                            style={{ background:'none', border:`1px solid ${T.border}`, cursor:'pointer',
                              fontSize:11, padding:'3px 7px', borderRadius:5, color:T.red, fontFamily:FONT }}>Del</button>
                        </td>
                      </tr>
                    ))}
                    {!filtered.length&&(
                      <tr><td colSpan={7} style={{ padding:'28px', textAlign:'center',
                        fontFamily:FONT, fontSize:12, color:T.textLight }}>No guests found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, padding:16 }}>
              <div style={{ fontFamily:FONT, fontWeight:600, fontSize:12, color:T.text, marginBottom:10 }}>Add Guest</div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <input style={{ ...inp, flex:2, minWidth:120 }} placeholder="Full name"
                  value={newName} onChange={e=>setNewName(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&addGuest()}
                  onFocus={e=>e.target.style.borderColor=T.gold}
                  onBlur={e=>e.target.style.borderColor=T.border}/>
                <input style={{ ...inp, flex:1, minWidth:90 }} placeholder="Relation"
                  value={newRel} onChange={e=>setNewRel(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&addGuest()}
                  onFocus={e=>e.target.style.borderColor=T.gold}
                  onBlur={e=>e.target.style.borderColor=T.border}/>
                <button onClick={addGuest} style={{
                  fontFamily:FONT, fontWeight:600, fontSize:12, padding:'10px 18px',
                  background:T.dark, color:T.goldLight, border:'none', borderRadius:T.radiusSm, cursor:'pointer' }}>+ Add</button>
              </div>
            </div>
          </>
        )}

        {/* ── Music ── */}
        {tab==='music' && (
          <div>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:20, color:T.text, marginBottom:3 }}>Background Music</div>
            <div style={{ fontFamily:FONT, fontSize:12, color:T.textMid, marginBottom:16, lineHeight:1.7 }}>
              Upload music — stored on the server so it plays on every device automatically.
            </div>
            <UploadCard
              title="Upload Music" subtitle="Loops throughout the invite on all devices"
              accept="audio/mp3,audio/mpeg,audio/wav,audio/ogg,audio/*"
              icon="🎵" previewType="audio" mediaType="music"
              currentUrl={mediaConfig?.musicUrl} currentName={mediaConfig?.musicName}
              onUploaded={(url,name)=>handleMediaUploaded('music',url,name)}
              onRemoved={()=>handleMediaRemoved('music')}
            />
            <TipsBox tips={[
              'MP3 and WAV formats work on all browsers.',
              'Uploaded to the server — plays on mobile, desktop, any device.',
              'Music loops automatically when guests tap 🎶.',
              'Changes take effect immediately — no refresh needed.',
            ]}/>
          </div>
        )}

        {/* ── Video ── */}
        {tab==='video' && (
          <div>
            <div style={{ fontFamily:FONT_DISPLAY, fontSize:20, color:T.text, marginBottom:3 }}>Video Message</div>
            <div style={{ fontFamily:FONT, fontSize:12, color:T.textMid, marginBottom:16, lineHeight:1.7 }}>
              Upload once from PC → plays on all mobile phones automatically.
              Appears on the <strong style={{color:T.text}}>3rd screen</strong> in 9:16 portrait, auto-plays on swipe.
            </div>
            <UploadCard
              title="Upload Video" subtitle="Auto-plays on Scene 3 on all devices"
              accept="video/mp4,video/webm,video/ogg,video/*"
              icon="🎬" previewType="video" mediaType="video"
              currentUrl={mediaConfig?.videoUrl} currentName={mediaConfig?.videoName}
              onUploaded={(url,name)=>handleMediaUploaded('video',url,name)}
              onRemoved={()=>handleMediaRemoved('video')}
            />
            <TipsBox tips={[
              'Upload from PC once — guests on mobile see it instantly.',
              'MP4 (H.264) works on iPhone Safari, Android Chrome, and all browsers.',
              'Portrait 9:16 videos look best (phone-recorded videos work perfectly).',
              'Video auto-plays muted on swipe. Guests tap 🔊 for sound.',
              'Large files may take a minute to upload — wait for 100% before closing.',
            ]}/>
          </div>
        )}

        <div style={{height:36}}/>
      </div>
    </div>
  )
}

