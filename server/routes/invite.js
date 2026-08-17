const express = require('express')
const router  = express.Router()
const db      = require('../db/mockDb')

// GET /api/invite/:token
// Returns guest + event data. Also marks the invite as opened.
router.get('/:token', (req, res) => {
  const { token } = req.params

  const guest = db.getGuestByToken(token)
  if (!guest) {
    // Unknown token — return generic guest so the invite still works
    return res.json({
      guest: { name: capitalize(token), token },
      event: db.EVENT,
    })
  }

  db.markOpened(token)

  const event = db.getEvent(guest.eventId)
  res.json({ guest: sanitizeGuest(guest), event })
})

function sanitizeGuest(g) {
  // Only expose what the guest needs — no RSVP history, no other guests
  return { id: g.id, name: g.name, relation: g.relation, token: g.token }
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : 'Guest'
}

module.exports = router
