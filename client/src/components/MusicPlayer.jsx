import React, { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)
  const nodesRef = useRef([])

  function buildMusic(ctx) {
    const master = ctx.createGain()
    master.gain.value = 0.55  // much louder
    master.connect(ctx.destination)

    // ── Tanpura drone (Indian base) ──
    const droneFreqs = [130.81, 196, 261.63, 392]
    droneFreqs.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.value = 0.12 - i * 0.02
      osc.connect(gain)
      gain.connect(master)
      osc.start()
      nodesRef.current.push(osc, gain)
    })

    // ── Melody: pentatonic scale (Sa Re Ga Pa Dha) ──
    // Notes in Hz: C4 D4 E4 G4 A4 C5 D5 E5
    const melody = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25]
    const pattern = [0,2,4,5,4,2,0,1,3,5,4,3,2,0,4,5,3,2,1,0]

    let noteIdx = 0
    function playNote() {
      if (!ctxRef.current) return
      const osc  = ctx.createOscillator()
      const env  = ctx.createGain()
      const now  = ctx.currentTime
      const freq = melody[pattern[noteIdx % pattern.length]]
      noteIdx++

      osc.type = 'sine'
      osc.frequency.value = freq

      // Gentle attack-sustain-release
      env.gain.setValueAtTime(0, now)
      env.gain.linearRampToValueAtTime(0.18, now + 0.08)
      env.gain.linearRampToValueAtTime(0.14, now + 0.3)
      env.gain.linearRampToValueAtTime(0,    now + 0.9)

      osc.connect(env)
      env.connect(master)
      osc.start(now)
      osc.stop(now + 0.95)

      nodesRef.current.push(osc, env)

      // Schedule next note (varied rhythm)
      const intervals = [0.55, 0.65, 0.55, 0.8, 0.55, 0.65, 0.9, 0.55]
      const next = intervals[noteIdx % intervals.length]
      setTimeout(playNote, next * 1000)
    }

    // ── Soft tabla beats ──
    function playBeat() {
      if (!ctxRef.current) return
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04))
      }
      const src  = ctx.createBufferSource()
      const filt = ctx.createBiquadFilter()
      const env  = ctx.createGain()
      filt.type = 'bandpass'
      filt.frequency.value = 180
      filt.Q.value = 2
      env.gain.setValueAtTime(0.22, ctx.currentTime)
      env.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15)
      src.buffer = buf
      src.connect(filt)
      filt.connect(env)
      env.connect(master)
      src.start()
      nodesRef.current.push(src, filt, env)
      setTimeout(playBeat, 720)
    }

    // ── Harmonium pad ──
    const padFreqs = [261.63, 329.63, 392, 493.88]
    padFreqs.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq
      gain.gain.value = 0.06
      osc.connect(gain)
      gain.connect(master)
      osc.start()
      nodesRef.current.push(osc, gain)
    })

    setTimeout(playNote, 400)
    setTimeout(playBeat, 800)
    nodesRef.current.push(master)
  }

  function toggle() {
    if (!ctxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctxRef.current = ctx
      buildMusic(ctx)
      setOn(true)
      return
    }
    if (on) {
      ctxRef.current.suspend()
      setOn(false)
    } else {
      ctxRef.current.resume()
      setOn(true)
    }
  }

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed', top: '1rem', right: '1rem', zIndex: 200,
        background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(10px)',
        border: '1.5px solid rgba(201,146,42,0.45)',
        boxShadow: '0 4px 12px rgba(44,74,40,0.15)',
        color: '#2c4a28', padding: '0.45rem 0.9rem', borderRadius: '50px',
        fontSize: '0.68rem', letterSpacing: '2px', fontFamily: "'Cinzel',serif",
        fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: '6px',
      }}
    >
      <span style={{ fontSize: '0.9rem' }}>{on ? '🎵' : '🎶'}</span>
      {on ? 'MUSIC ON' : 'MUSIC OFF'}
    </button>
  )
}
