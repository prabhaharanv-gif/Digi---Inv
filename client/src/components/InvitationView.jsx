import React from 'react'
import { GuestProvider } from '../context/GuestContext'
import SceneEngine from './SceneEngine'

export default function InvitationView() {
  return (
    <GuestProvider>
      <SceneEngine />
    </GuestProvider>
  )
}
