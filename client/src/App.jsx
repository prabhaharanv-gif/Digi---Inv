import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import InvitationView from './components/InvitationView'

export default function App() {
  return (
    <Routes>
      <Route path="/i/:token" element={<InvitationView />} />
      {/* Redirect root and /dashboard to demo invite */}
      <Route path="/" element={<Navigate to="/i/demo" replace />} />
      <Route path="/dashboard" element={<Navigate to="/i/demo" replace />} />
      <Route path="*" element={<Navigate to="/i/demo" replace />} />
    </Routes>
  )
}
