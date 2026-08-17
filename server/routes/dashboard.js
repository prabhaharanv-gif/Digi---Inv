const express = require('express')
const router  = express.Router()
const db      = require('../db/mockDb')

// GET /api/dashboard/:eventId
router.get('/:eventId', (req, res) => {
  const { eventId } = req.params
  const event   = db.getEvent(eventId)
  const guests  = db.getAllGuests(eventId)

  if (!event) return res.status(404).json({ error: 'Event not found' })

  const confirmed = guests.filter(g => g.rsvp === 'yes')

  res.json({
    event,
    guests,
    stats: {
      total:     guests.length,
      opened:    guests.filter(g => g.opened).length,
      confirmed: confirmed.length,
      declined:  guests.filter(g => g.rsvp === 'no').length,
      pending:   guests.filter(g => g.rsvp === 'pending').length,
      adults:    confirmed.reduce((s, g) => s + g.adults,   0),
      children:  confirmed.reduce((s, g) => s + g.children, 0),
    }
  })
})

module.exports = router
