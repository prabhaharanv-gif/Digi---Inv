const express = require('express')
const router  = express.Router()
const db      = require('../db/mockDb')

// POST /api/rsvp/:token
// Body: { status: 'yes'|'no', adults: 2, children: 1 }
router.post('/:token', (req, res) => {
  const { token } = req.params
  const { status, adults = 0, children = 0 } = req.body

  if (!['yes', 'no'].includes(status)) {
    return res.status(400).json({ error: 'status must be yes or no' })
  }

  const guest = db.saveRsvp(token, { status, adults: Number(adults), children: Number(children) })

  if (!guest) {
    return res.status(404).json({ error: 'Guest not found' })
  }

  console.log(`✅ RSVP: ${guest.name} → ${status} (${adults} adults, ${children} children)`)
  res.json({ success: true, guest: { name: guest.name, status, adults, children } })
})

module.exports = router
