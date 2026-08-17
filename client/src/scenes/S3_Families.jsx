import React from 'react'
import { motion } from 'framer-motion'
import { useGuest } from '../context/GuestContext'

// SVG illustrated human faces - AI-style portraits
function FatherAvatar({ turban = false }) {
  return (
    <svg viewBox="0 0 80 80" style={{ width:'100%', height:'100%' }}>
      {/* Background circle */}
      <circle cx="40" cy="40" r="38" fill="#f5e6d0"/>
      {/* Neck */}
      <rect x="32" y="55" width="16" height="14" rx="4" fill="#d4956a"/>
      {/* Shoulders */}
      <ellipse cx="40" cy="74" rx="28" ry="12" fill={turban ? '#7a3d8c' : '#2c5228'}/>
      {/* Face */}
      <ellipse cx="40" cy="38" rx="18" ry="20" fill="#d4956a"/>
      {/* Hair / Turban */}
      {turban ? (
        <g>
          <ellipse cx="40" cy="22" rx="20" ry="10" fill="#9b4db8"/>
          <rect x="20" y="18" width="40" height="8" rx="4" fill="#7a3d8c"/>
          <ellipse cx="40" cy="18" rx="18" ry="5" fill="#b85fd4"/>
          {/* Turban layers */}
          <path d="M22,20 Q40,10 58,20" fill="none" stroke="#9b4db8" strokeWidth="2.5"/>
          <path d="M24,16 Q40,8 56,16" fill="none" stroke="#b85fd4" strokeWidth="2"/>
          {/* Turban jewel */}
          <circle cx="40" cy="15" r="3" fill="#f5c842"/>
        </g>
      ) : (
        <ellipse cx="40" cy="20" rx="19" ry="10" fill="#2c1810"/>
      )}
      {/* Eyes */}
      <ellipse cx="33" cy="36" rx="3.5" ry="3" fill="white"/>
      <ellipse cx="47" cy="36" rx="3.5" ry="3" fill="white"/>
      <circle cx="33" cy="36" r="2" fill="#2c1810"/>
      <circle cx="47" cy="36" r="2" fill="#2c1810"/>
      <circle cx="34" cy="35" r="0.7" fill="white"/>
      <circle cx="48" cy="35" r="0.7" fill="white"/>
      {/* Eyebrows */}
      <path d="M29,32 Q33,30 37,32" fill="none" stroke="#2c1810" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M43,32 Q47,30 51,32" fill="none" stroke="#2c1810" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Nose */}
      <ellipse cx="40" cy="41" rx="2.5" ry="3" fill="#c4845a"/>
      {/* Smile */}
      <path d="M34,47 Q40,52 46,47" fill="none" stroke="#8b4513" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Mustache for elder */}
      <path d="M35,44 Q40,47 45,44" fill="#2c1810" stroke="none"/>
    </svg>
  )
}

function MotherAvatar({ bindi = true, sareeColor = '#c9470a' }) {
  return (
    <svg viewBox="0 0 80 80" style={{ width:'100%', height:'100%' }}>
      <circle cx="40" cy="40" r="38" fill="#f5e6d0"/>
      {/* Saree / blouse */}
      <ellipse cx="40" cy="74" rx="28" ry="12" fill={sareeColor}/>
      {/* Neck */}
      <rect x="33" y="55" width="14" height="13" rx="4" fill="#d4956a"/>
      {/* Gold necklace */}
      <path d="M30,60 Q40,65 50,60" fill="none" stroke="#c9922a" strokeWidth="2"/>
      {/* Face */}
      <ellipse cx="40" cy="37" rx="17" ry="19" fill="#e8a882"/>
      {/* Hair - bun */}
      <ellipse cx="40" cy="19" rx="18" ry="9" fill="#1a0f0a"/>
      <ellipse cx="40" cy="15" rx="8" ry="6" fill="#2c1810"/>
      {/* Hair parting */}
      <line x1="40" y1="19" x2="40" y2="24" stroke="#e8a882" strokeWidth="1.5"/>
      {/* Bindi */}
      {bindi && <circle cx="40" cy="29" r="2.5" fill="#c9470a"/>}
      {/* Eyes with kajal */}
      <ellipse cx="33" cy="35" rx="3.5" ry="2.8" fill="white"/>
      <ellipse cx="47" cy="35" rx="3.5" ry="2.8" fill="white"/>
      <circle cx="33" cy="35" r="2" fill="#2c1810"/>
      <circle cx="47" cy="35" r="2" fill="#2c1810"/>
      <circle cx="34" cy="34" r="0.7" fill="white"/>
      <circle cx="48" cy="34" r="0.7" fill="white"/>
      {/* Kajal lines */}
      <path d="M29,34 Q33,32 37,34" fill="none" stroke="#1a0f0a" strokeWidth="1.2"/>
      <path d="M43,34 Q47,32 51,34" fill="none" stroke="#1a0f0a" strokeWidth="1.2"/>
      {/* Eyebrows */}
      <path d="M29,31 Q33,29 37,31" fill="none" stroke="#1a0f0a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M43,31 Q47,29 51,31" fill="none" stroke="#1a0f0a" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Nose with nose ring */}
      <ellipse cx="40" cy="40" rx="2" ry="2.5" fill="#d4856a"/>
      <circle cx="43" cy="40" r="1.5" fill="none" stroke="#c9922a" strokeWidth="1"/>
      {/* Smile */}
      <path d="M35,46 Q40,51 45,46" fill="none" stroke="#8b4513" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Earrings */}
      <circle cx="23" cy="38" r="2.5" fill="#c9922a"/>
      <circle cx="57" cy="38" r="2.5" fill="#c9922a"/>
    </svg>
  )
}

export default function S3_Families() {
  const { event } = useGuest()
  const families = event?.families || []

  const avatars = [
    <FatherAvatar turban={true} />,
    <MotherAvatar sareeColor="#c9470a" />,
    <FatherAvatar turban={false} />,
    <MotherAvatar sareeColor="#1a5c8c" bindi={true} />,
  ]

  return (
    <div style={{
      width:'100%', height:'100%', overflow:'hidden', position:'relative',
      background:'linear-gradient(160deg,#cce5c2 0%,#a8c89e 40%,#8ab87e 100%)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <div style={{ position:'absolute', top:'-5%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.55) 0%,transparent 70%)', pointerEvents:'none' }} />

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}}
        style={{ position:'relative', zIndex:2, textAlign:'center', padding:'1.5rem 1.2rem', width:'100%', maxWidth:480 }}>

        <div style={{ fontFamily:"'Cinzel',serif", color:'#4a2800', fontSize:'clamp(0.48rem,1.5vw,0.58rem)', letterSpacing:'4px', marginBottom:'0.3rem', fontWeight:700 }}>
          ✦ &nbsp; WITH THE BLESSINGS OF OUR FAMILIES &nbsp; ✦
        </div>
        <div style={{ fontFamily:"'Great Vibes',cursive", fontSize:'clamp(2rem,6vw,3.2rem)', color:'#1a3d18', margin:'0.2rem 0 1rem', textShadow:'1px 1px 0 rgba(255,255,255,0.5)' }}>
          Our Families
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(0.8rem,2vw,1.2rem)' }}>
          {families.map((f, i) => (
            <motion.div key={i} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.12,duration:0.6}}>
              <div style={{
                background:'rgba(255,255,255,0.65)', backdropFilter:'blur(8px)',
                border:'2px solid rgba(160,108,16,0.35)', borderRadius:14,
                padding:'clamp(0.9rem,3vw,1.2rem) 0.8rem', textAlign:'center',
                boxShadow:'0 4px 20px rgba(26,61,24,0.12)',
                position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,transparent,#a06c10,transparent)' }} />
                {/* Human avatar illustration */}
                <div style={{
                  width:'clamp(56px,15vw,72px)', height:'clamp(56px,15vw,72px)',
                  borderRadius:'50%', margin:'0 auto 0.7rem',
                  border:'2.5px solid rgba(160,108,16,0.5)',
                  overflow:'hidden',
                  boxShadow:'0 3px 12px rgba(0,0,0,0.15)',
                }}>
                  {avatars[i]}
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'clamp(0.7rem,2.2vw,0.85rem)', color:'#1a3d18', letterSpacing:'0.5px' }}>
                  {f.name}
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:600, fontSize:'clamp(0.65rem,1.9vw,0.75rem)', color:'#4a6e20', marginTop:'0.2rem' }}>
                  {f.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <GoldDivider />
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:600, fontSize:'clamp(0.8rem,2.3vw,0.95rem)', color:'#1a3d18', lineHeight:1.7 }}>
          Son of {families[0]?.name} & {families[1]?.name}
          &nbsp;·&nbsp; Daughter of {families[2]?.name} & {families[3]?.name}
        </div>
      </motion.div>
    </div>
  )
}

function GoldDivider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', margin:'0.8rem auto', maxWidth:220 }}>
      <div style={{ flex:1, height:'1.5px', background:'linear-gradient(90deg,transparent,#a06c10)' }} />
      <div style={{ width:5, height:5, border:'2px solid #a06c10', transform:'rotate(45deg)' }} />
      <div style={{ flex:1, height:'1.5px', background:'linear-gradient(90deg,#a06c10,transparent)' }} />
    </div>
  )
}
